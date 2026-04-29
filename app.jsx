// Hoofdcomponent — bouwt op SCENES uit scenes.js
const { useState, useEffect, useRef } = React;

const CHARACTERS = [
  { id: "fatima", num: "I", name: "Fatima", role: "Klantcontactmedewerker — Stedelijk Beheer", ready: true },
  { id: "joris", num: "II", name: "Joris", role: "Wijkbeheerder Groen — Gebiedsbeheer", ready: false },
  { id: "esther", num: "III", name: "Esther", role: "Werkvoorbereider — Uitvoering Werken", ready: false }
];

function LearnPopover({ tag, text }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="learn" ref={ref}>
      <button className="learn-toggle" onClick={() => setOpen(!open)}>
        wist je dat
      </button>
      {open && (
        <div className="learn-popover">
          <span className="tag">{tag}</span>
          {text}
        </div>
      )}
    </div>
  );
}

function Scene({ scene, onChoice, onContinue }) {
  return (
    <div className="page fade-in" key={scene.id}>
      <div className="page-header">
        <div className="left">
          <span>{new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}</span>
          <span>·</span>
          <span>Fatima</span>
        </div>
        <span>OW-kunde · Hoofdstuk {scene.chapter?.split(".")[0]}</span>
      </div>

      <div className="chapter">{scene.chapter}</div>
      <h1 className="time">{scene.time}</h1>

      <div className="body">
        {scene.body && scene.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {scene.learn && <LearnPopover tag={scene.learn.tag} text={scene.learn.text} />}

      {scene.prompt && (
        <>
          <div className="prompt">{scene.prompt}</div>
          <div className="choices">
            {scene.choices.map((c, i) => (
              <button key={i} className="choice" onClick={() => onChoice(c.to)}>
                <span className="marker">{String.fromCharCode(65 + i)}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {scene.next && !scene.prompt && (
        <div className="continue">
          <button onClick={() => onContinue(scene.next)}>
            {scene.pause ? "verder met de dag" : "lees verder"}
            <span className="arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

function ReflectScreen({ onRestart }) {
  const questions = [
    "Wat wist je niet over het werk van Fatima dat je nu wel weet?",
    "Op welk moment in de keten is Fatima het meest afhankelijk van een ander?",
    "Wat neem jij mee naar je eigen rol bij OW?"
  ];
  const [answers, setAnswers] = useState(["", "", ""]);

  return (
    <div className="reflect-page page fade-in">
      <div className="page-header">
        <div className="left"><span>Slot</span><span>·</span><span>Fatima</span></div>
        <span>Reflectie</span>
      </div>

      <div className="chapter">Aan het einde van de dag</div>
      <h2>Drie vragen — alleen voor jezelf.</h2>
      <p className="lede">Niets wordt opgeslagen. Niets wordt verzonden. Schrijf voor jezelf.</p>

      {questions.map((q, i) => (
        <div className="reflect-q" key={i}>
          <div className="reflect-q-num">{String(i + 1).padStart(2, "0")}</div>
          <div className="reflect-q-text">{q}</div>
          <textarea
            placeholder="Schrijf hier..."
            value={answers[i]}
            onChange={(e) => {
              const next = [...answers];
              next[i] = e.target.value;
              setAnswers(next);
            }}
            rows={2}
            onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
          />
        </div>
      ))}

      <div className="reflect-actions">
        <button className="btn-secondary" onClick={onRestart}>opnieuw beginnen</button>
      </div>
    </div>
  );
}

function Cover({ onStart }) {
  return (
    <div className="cover fade-in">
      <p className="cover-title">OW-kunde · Verhalenreeks</p>
      <h1>Een dag in <em>het leven van</em></h1>
      <p className="cover-sub">Drie collega's. Drie bollen van OW. Eén dag per persoon. Lees mee, kies mee, en zie wat ervan komt.</p>

      <div className="characters">
        {CHARACTERS.map((c) => (
          <div
            key={c.id}
            className={`character ${c.ready ? "" : "disabled"}`}
            onClick={() => c.ready && onStart(c.id)}
          >
            <span className="character-num">— {c.num}</span>
            <div>
              <h3 className="character-name">{c.name}</h3>
              <div className="character-role">{c.role}</div>
            </div>
            <span className={`character-status ${c.ready ? "ready" : ""}`}>
              {c.ready ? "lees nu →" : "binnenkort"}
            </span>
          </div>
        ))}
      </div>

      <div className="cover-footer">
        <span>Pilot 2026 / 2027</span>
        <span>Directie OW</span>
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "theme": "light",
    "fontSize": 19
  }/*EDITMODE-END*/);

  const [sceneId, setSceneId] = useState(null); // null = cover

  useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme;
    document.documentElement.style.setProperty("--app-font-size", tweaks.fontSize + "px");
  }, [tweaks.theme, tweaks.fontSize]);

  const scene = sceneId ? SCENES[sceneId] : null;

  // progress dots — chapters
  const chapterIds = ["start", "kralingen", "groenbeheer", "lunch", "middag", "einddag"];
  const visitedChapter = (() => {
    if (!scene) return -1;
    // map current scene to its chapter index
    const map = {
      start: 0, lantaarnpaal: 0, sorteren: 0, buitendienst_belt: 0,
      kralingen: 1, luisteren: 1, beloven: 1, doorsturen: 1,
      groenbeheer: 2, eerste_naam: 2, wijkkenner: 2, teamleider: 2,
      lunch: 3,
      middag: 4, cijfers_direct: 4, afstemmen: 4,
      einddag: 5,
      reflect: 6
    };
    return map[scene.id] ?? -1;
  })();

  return (
    <>
      {sceneId && (
        <div className="progress">
          <span>Fatima</span>
          {chapterIds.map((_, i) => (
            <span key={i} className={`dot ${i <= visitedChapter ? "active" : ""}`}></span>
          ))}
        </div>
      )}

      <div className="app">
        {!scene && <Cover onStart={() => setSceneId("start")} />}
        {scene && !scene.reflectScreen && (
          <div className="book">
            <Scene
              scene={scene}
              onChoice={(to) => setSceneId(to)}
              onContinue={(to) => setSceneId(to)}
            />
          </div>
        )}
        {scene && scene.reflectScreen && (
          <div className="book">
            <ReflectScreen onRestart={() => setSceneId(null)} />
          </div>
        )}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Verschijning">
          <TweakRadio
            label="Thema"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[{ value: "light", label: "Licht" }, { value: "dark", label: "Donker" }]}
          />
          <TweakSlider
            label="Lettergrootte"
            min={15}
            max={24}
            step={1}
            value={tweaks.fontSize}
            onChange={(v) => setTweak("fontSize", v)}
            suffix="px"
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
