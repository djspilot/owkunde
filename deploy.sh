#!/bin/bash
# Deploy OW-kunde to owkunde.stadsbeheer.tech
# Usage: ./deploy.sh
#
# This script:
# 1. Pushes to GitHub (triggers Coolify auto-deploy)
# 2. Waits for Coolify to deploy
# 3. Finds new container IP
# 4. Updates nginx subdomain proxy
# 5. Verifies deployment

set -euo pipefail

SUBDOMAIN="owkunde"
DOMAIN="${DOMAIN:-stadsbeheer.tech}"
FULL_DOMAIN="${SUBDOMAIN}.${DOMAIN}"
WAIT_TIME="${WAIT_TIME:-60}"
SBCLI_DEFAULT="/Users/ds/Documents/persoonlijk/local/_System/Scripts/deploy/sbcli"
if [[ -x "${SBCLI_DEFAULT}" ]]; then
    SBCLI_BIN="${SBCLI:-${SBCLI_DEFAULT}}"
else
    SBCLI_BIN="${SBCLI:-sbcli}"
fi

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${GREEN}[deploy-owkunde]${NC} $1" >&2; }
warn() { echo -e "${YELLOW}[warn]${NC} $1" >&2; }
error() { echo -e "${RED}[error]${NC} $1" >&2; }
info() { echo -e "${BLUE}[info]${NC} $1" >&2; }

remote_exec() {
    "${SBCLI_BIN}" "$1"
}

is_valid_ipv4() {
    local ip="$1"
    [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || return 1
    IFS='.' read -r o1 o2 o3 o4 <<<"$ip"
    for octet in "$o1" "$o2" "$o3" "$o4"; do
        ((octet >= 0 && octet <= 255)) || return 1
    done
    return 0
}

check_deps() {
    if ! command -v "${SBCLI_BIN}" &>/dev/null; then
        error "sbcli is required"
        info "Tip: export SBCLI=/pad/naar/sbcli"
        exit 1
    fi
}

git_push() {
    log "Pushen naar GitHub..."
    cd "$(dirname "$0")"
    git add -A
    if git diff --staged --quiet; then
        warn "Geen wijzigingen om te pushen"
    else
        git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')" 2>/dev/null || true
        git push origin master 2>/dev/null || git push origin main 2>/dev/null
        log "Gepusht naar GitHub - Coolify zal automatisch deployen"
    fi
}

wait_for_deploy() {
    log "Wachten op Coolify deploy (${WAIT_TIME}s)..."
    sleep "$WAIT_TIME"
}

find_container_ip() {
    log "Zoeken naar nieuwe container..."

    local container ip
    container="$(remote_exec "docker ps --format '{{.Names}}' | grep -i '${SUBDOMAIN}' | head -1" 2>/dev/null | tr -d '\n')"

    if [[ -z "$container" ]]; then
        container="$(remote_exec "docker ps --format '{{.Names}}' | grep -v '^coolify' | tail -1" 2>/dev/null | tr -d '\n')"
    fi

    if [[ -z "$container" ]]; then
        echo ""
        return 0
    fi

    log "Container: ${container}"
    ip="$(remote_exec "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${container}" 2>/dev/null | tr -d '\n')"
    if ! is_valid_ipv4 "$ip"; then
        warn "Ongeldige container IP ontvangen: '${ip}'"
        echo ""
        return 0
    fi

    echo "$ip"
}

update_nginx() {
    local IP="$1"

    if [[ -z "$IP" ]]; then
        error "Container IP kon niet gevonden worden"
        exit 1
    fi

    log "Updaten nginx: ${FULL_DOMAIN} → ${IP}"

    if remote_exec "test -f /etc/nginx/sites-enabled/${FULL_DOMAIN}" 2>/dev/null; then
        remote_exec "sed -i -E 's|proxy_pass http://[0-9.]+:[0-9]+;|proxy_pass http://${IP}:80;|g' /etc/nginx/sites-enabled/${FULL_DOMAIN}" 2>/dev/null
    else
        log "Nieuwe nginx config aanmaken..."
        remote_exec "cat > /etc/nginx/sites-enabled/${FULL_DOMAIN} << EOF
server {
    listen 80;
    server_name ${FULL_DOMAIN};

    location / {
        proxy_pass http://${IP}:80;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/${FULL_DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${FULL_DOMAIN}/privkey.pem;
}
EOF"
    fi

    remote_exec "nginx -t && nginx -s reload" 2>&1 | grep -E "(syntax is ok|reload)"
}

run_verify() {
    log "Deploy verifiëren..."

    local i code
    for ((i = 1; i <= 12; i++)); do
        code="$(curl -s -o /dev/null -w '%{http_code}' "https://${FULL_DOMAIN}" 2>/dev/null || true)"
        if [[ "${code}" == "200" ]]; then
            log "Publiek HTTPS: 200 OK"
            return 0
        fi
        warn "Poging ${i}/12 faalt (status ${code}), opnieuw over 5s..."
        sleep 5
    done

    error "Verificatie niet geslaagd na 12 pogingen"
    return 1
}

main() {
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}  Deploy: ${FULL_DOMAIN}${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo ""

    check_deps

    echo ""
    log "=== Stap 1: GitHub Push ==="
    git_push

    echo ""
    log "=== Stap 2: Wachten op Deploy ==="
    wait_for_deploy

    echo ""
    log "=== Stap 3: Container IP Vinden ==="
    IP=$(find_container_ip)

    echo ""
    log "=== Stap 4: Nginx Updaten ==="
    update_nginx "$IP"

    echo ""
    log "=== Stap 5: Verificatie ==="
    run_verify

    echo ""
    echo -e "${GREEN}======================================${NC}"
    echo -e "${GREEN}  Klaar!${NC}"
    echo -e "${GREEN}======================================${NC}"
    echo ""
    log "Check: https://${FULL_DOMAIN}"
}

main "$@"
