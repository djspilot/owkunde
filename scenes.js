// Fatima's dag — licht vertakt verhaal
// Geen goed/fout — alleen gevolgen.
// Subtiele "wist je dat"-tooltips koppelen scenes aan OW-kunde leerdoelen.

window.SCENES = {
  start: {
    id: "start",
    time: "07:42",
    chapter: "I. De ochtendlijst",
    body: [
      "Ik trek mijn jas uit, hang hem over de stoel. Het is nog stil op de gang. Buiten regent het al niet meer, maar de straat staat hier en daar nog blank. Mijn computer kreunt zich wakker.",
      "Vierendertig nieuwe meldingen. Ik scroll. Omgevallen bomen. Wateroverlast. Een lantaarnpaal die op een auto ligt. De koffie is nog niet eens klaar."
    ],
    prompt: "Waar begin je?",
    learn: {
      tag: "Organisatiekennis",
      text: "Het Klantcontactcentrum is voor veel Rotterdammers het eerste gezicht van OW. Wat hier gebeurt, bepaalt hoe de keten verder loopt."
    },
    choices: [
      { label: "De lantaarnpaal op de auto. Dat klinkt het zwaarst.", to: "lantaarnpaal" },
      { label: "Eerst alles op categorie sorteren. Overzicht eerst.", to: "sorteren" },
      { label: "Bellen met de buitendienst — die zijn vast al onderweg.", to: "buitendienst_belt" }
    ]
  },

  lantaarnpaal: {
    id: "lantaarnpaal",
    time: "07:55",
    chapter: "I. De ochtendlijst",
    body: [
      "Ik zet de melding door naar de aannemer. Twee minuten later klikt er nog een melding binnen — zelfde straat, omgevallen boom, zes huisnummers verderop.",
      "Ik koppel ze. Eén ploeg, één rit. Anders sturen we straks twee ploegen langs elkaar heen.",
      "De aannemer belt zelf terug: 'Goed dat je dit aan elkaar plakte. Scheelt ons een uur.'"
    ],
    learn: {
      tag: "Ketenbewustzijn",
      text: "OW werkt als matrixorganisatie: één locatie kan tegelijk Stedelijk Beheer, Gebiedsbeheer én Uitvoering raken. Koppelen voorkomt dubbel werk."
    },
    next: "kralingen"
  },

  sorteren: {
    id: "sorteren",
    time: "08:10",
    chapter: "I. De ochtendlijst",
    body: [
      "Ik maak vier kolommen. Gevaar. Hinder. Schade. Overig. Het kost me twintig minuten.",
      "Als ik klaar ben, staat de lantaarnpaal nog steeds op die auto. De aannemer belt: 'Hadden jullie die niet gezien?'",
      "Ik leg uit dat ik aan het sorteren was. Stilte aan de andere kant."
    ],
    learn: {
      tag: "Prioritering",
      text: "Bij OW gaat directe veiligheid altijd voor proces. De systemen helpen, maar de inschatting blijft mensenwerk."
    },
    next: "kralingen"
  },

  buitendienst_belt: {
    id: "buitendienst_belt",
    time: "07:58",
    chapter: "I. De ochtendlijst",
    body: [
      "De buitendienst begint om acht uur. Ik krijg de wachtdienst. 'We weten van niets,' zegt de stem. 'Wat heb je voor ons?'",
      "Ik lees de meldingen voor. Hij noteert. We doen het samen — ik zet door, hij verdeelt over de ploegen.",
      "Het werkt. Maar het kost mij wel een half uur extra dat ik straks niet heb."
    ],
    learn: {
      tag: "Samenwerking in de keten",
      text: "Buitendienst en klantcontact werken parallel, niet seriëel. Wie belt wie, wanneer — daar zit veel onuitgesproken kennis."
    },
    next: "kralingen"
  },

  kralingen: {
    id: "kralingen",
    time: "09:15",
    chapter: "II. Kralingen aan de lijn",
    body: [
      "De telefoon. Een man uit Kralingen. Zijn straat staat blank. Hij is boos. Niet een beetje boos.",
      "Achter zijn stem hoor ik water. Echt water. Een emmer die wordt leeggegooid, denk ik.",
      "Hij zegt dat hij gisteren al gebeld heeft. Dat niemand luistert. Dat hij belastinggeld betaalt."
    ],
    prompt: "Wat doe je?",
    choices: [
      { label: "Eerst luisteren. Echt luisteren. Daarna pas iets doen.", to: "luisteren" },
      { label: "Beloven dat er vandaag iemand komt kijken.", to: "beloven" },
      { label: "Uitleggen dat wateroverlast bij een ander loket hoort.", to: "doorsturen" }
    ]
  },

  luisteren: {
    id: "luisteren",
    time: "09:24",
    chapter: "II. Kralingen aan de lijn",
    body: [
      "Ik laat hem uitpraten. Negen minuten. Ik onderbreek niet.",
      "Als hij stopt, zeg ik: 'Ik begrijp dat dit heel vervelend is. Ik ga dit nu direct voor u uitzetten.'",
      "Hij ademt uit. 'Nou. Bedankt.' Hij hangt op zonder te schreeuwen."
    ],
    learn: {
      tag: "Bestuurlijke context",
      text: "Voor een bewoner is de gemeente één gezicht. Of de melding nu bij Stadsbeheer of Stadsontwikkeling hoort — jij bent op dat moment Rotterdam."
    },
    next: "groenbeheer"
  },

  beloven: {
    id: "beloven",
    time: "09:22",
    chapter: "II. Kralingen aan de lijn",
    body: [
      "'Vandaag nog komt er iemand kijken,' zeg ik. Hij hangt tevreden op.",
      "Twee uur later belt zijn buurvrouw. Of ze ook zo'n bezoek krijgt. En om kwart over vier belt hij weer. Hij is bozer dan vanochtend.",
      "Niemand is geweest. Wateroverlast valt onder een gebiedsteam dat vandaag al overvol zit. Mijn belofte was niet aan mij om te doen."
    ],
    learn: {
      tag: "Mandaat en rolverdeling",
      text: "Beloften aan bewoners zijn organisatiebreed. Wat jij toezegt, moet een collega in een ander team kunnen waarmaken."
    },
    next: "groenbeheer"
  },

  doorsturen: {
    id: "doorsturen",
    time: "09:21",
    chapter: "II. Kralingen aan de lijn",
    body: [
      "'Voor wateroverlast moet u eigenlijk bij—' Hij onderbreekt me. Hij is twintig jaar bewoner. Hij weet wat afschuiven is.",
      "Ik probeer het anders, maar het is te laat. Hij hangt op met 'Ja ja.' Een uur later staat zijn klacht over mij in het systeem.",
      "Mijn teamleider komt langs. Niet boos. Wel een gesprek."
    ],
    learn: {
      tag: "Eén loket-gedachte",
      text: "OW probeert bewoners niet rond te sturen. 'Warm doorverbinden' is meer dan een term — het is beleid."
    },
    next: "groenbeheer"
  },

  groenbeheer: {
    id: "groenbeheer",
    time: "11:30",
    chapter: "III. De drie namen",
    body: [
      "Een melding over een omgewaaide tak in Bospolder. Ik moet doorzetten naar groenbeheer. Het systeem geeft me drie namen.",
      "Eén staat bovenaan. Eén staat als 'wijkkenner Delfshaven' gemarkeerd. Eén is teamleider en is in vergadering."
    ],
    prompt: "Naar wie stuur je het?",
    learn: {
      tag: "Gebiedskennis",
      text: "Gebiedsbeheer is georganiseerd per wijk. Wijkkennis is geen luxe — het bepaalt of een aannemer het juiste pad kiest."
    },
    choices: [
      { label: "De eerste op de lijst. Snelheid eerst.", to: "eerste_naam" },
      { label: "De wijkkenner. Die kent Bospolder.", to: "wijkkenner" },
      { label: "Wachten op de teamleider. Geen risico.", to: "teamleider" }
    ]
  },

  eerste_naam: {
    id: "eerste_naam",
    time: "11:42",
    chapter: "III. De drie namen",
    body: [
      "Doorgezet. Tien minuten later belt de collega terug. 'Bospolder is niet mijn wijk. Ik kan kijken, maar ik moet eerst de straat opzoeken.'",
      "Hij doet het toch. Maar hij verliest een half uur aan iets wat de wijkkenner blind had geweten."
    ],
    learn: {
      tag: "Onzichtbare kennis",
      text: "Veel OW-kennis zit in mensen, niet in systemen. Daarom is overdracht nu zo belangrijk: 19% stroomt de komende jaren uit."
    },
    next: "lunch"
  },

  wijkkenner: {
    id: "wijkkenner",
    time: "11:35",
    chapter: "III. De drie namen",
    body: [
      "Ik stuur het naar de wijkkenner. Binnen vijf minuten reactie: 'Weet welke tak. Staat al op de lijst van vanmiddag.'",
      "Hij voegt eraan toe: 'Bedankt dat je mij pakte. Schoolingang vlak naast die boom — kinderen lopen daar straks uit.'",
      "Dat had ik niet gezien. Hij wel."
    ],
    learn: {
      tag: "Gebiedskennis in actie",
      text: "Een wijkkenner ziet context die niet in de melding staat. School-uitloop, marktdagen, evenementen — dat soort dingen."
    },
    next: "lunch"
  },

  teamleider: {
    id: "teamleider",
    time: "12:05",
    chapter: "III. De drie namen",
    body: [
      "Ik wacht. De teamleider is pas na twaalven uit zijn vergadering. Hij verdeelt het in dertig seconden.",
      "'Naar de wijkkenner. Altijd. Dat had je zelf kunnen doen.'",
      "Hij klinkt niet boos. Eerder een beetje verbaasd."
    ],
    learn: {
      tag: "Mandaat",
      text: "Bij OW worden veel beslissingen op uitvoerend niveau genomen. Niet alles hoeft langs de leidinggevende — dat kost juist tempo."
    },
    next: "lunch"
  },

  lunch: {
    id: "lunch",
    time: "13:00",
    chapter: "IV. Lunch",
    body: [
      "Ik loop naar buiten met mijn boterham. Het is opgeklaard. Op het parkeerterrein staat een bestelbus van de buitendienst.",
      "Een collega zwaait. Ik ken hem alleen van een naam achter een melding. Hij komt naar me toe.",
      "'Was jij degene die die lantaarnpaal vanochtend zo snel had doorgezet?' Ik knik.",
      "'Scheelde ons een uur werk. Dankjewel.' Hij loopt door, naar zijn bus.",
      "Ik blijf even staan met mijn boterham."
    ],
    pause: true,
    learn: {
      tag: "De keten is mensen",
      text: "OW telt zo'n 1080 medewerkers verdeeld over drie 'bollen'. De meeste collega's zie je nooit — tot je ze ineens op de parkeerplaats tegenkomt."
    },
    next: "middag"
  },

  middag: {
    id: "middag",
    time: "14:20",
    chapter: "V. Een politiek telefoontje",
    body: [
      "De woordvoerder van de wethouder belt. Een raadslid heeft vragen gesteld over de afhandeling van stormschade. Hij wil cijfers.",
      "Hoeveel meldingen vandaag? Hoeveel afgehandeld? Gemiddelde reactietijd?",
      "Ik kan de cijfers van vanochtend opzoeken. Maar ze zijn ruw — niet gecheckt, niet geduid."
    ],
    prompt: "Wat doe je?",
    choices: [
      { label: "Cijfers direct doorgeven. Hij heeft haast.", to: "cijfers_direct" },
      { label: "Eerst even afstemmen met je teamleider.", to: "afstemmen" }
    ]
  },

  cijfers_direct: {
    id: "cijfers_direct",
    time: "14:35",
    chapter: "V. Een politiek telefoontje",
    body: [
      "Ik geef de cijfers. Hij is blij. Een uur later staan ze in een persbericht.",
      "Het getal van afgehandelde meldingen klopt half — sommige stonden op 'doorgezet' maar nog niet uitgevoerd. De volgende ochtend staat dat in de krant.",
      "Mijn teamleider zegt niets over verwijt. Wel: 'Bestuurlijke vragen lopen via mij. Niet omdat jij het niet weet, maar omdat één getal in de krant anders weegt dan tien getallen in een spreadsheet.'"
    ],
    learn: {
      tag: "Bestuurlijke context",
      text: "Wat OW doet, is politiek. Een verkeerd getal kan een raadsdebat worden. Daarom lopen externe vragen via vaste routes."
    },
    next: "einddag"
  },

  afstemmen: {
    id: "afstemmen",
    time: "14:28",
    chapter: "V. Een politiek telefoontje",
    body: [
      "Ik bel mijn teamleider. Hij is blij dat ik het vraag. 'Stuur hem naar mij door. Ik bel hem zelf.'",
      "Tien minuten later loopt hij langs mijn bureau. 'Goed dat je dit niet alleen pakte. Cijfers naar buiten zijn nooit alleen cijfers.'"
    ],
    learn: {
      tag: "Bestuurlijke routing",
      text: "OW ligt in het bestuurlijke speelveld van een grote stad. Externe communicatie loopt via vaste lijnen — niet uit wantrouwen, maar uit zorgvuldigheid."
    },
    next: "einddag"
  },

  einddag: {
    id: "einddag",
    time: "16:48",
    chapter: "VI. Afsluiten",
    body: [
      "Mijn computer staat op slaapstand. Tweeënveertig meldingen vandaag. Ik weet niet meer welke welke was.",
      "De boze man uit Kralingen heeft niet meer gebeld. De lantaarnpaal staat niet meer op de auto. Ergens in Bospolder is een tak weggehaald voor de school uitging.",
      "Ik trek mijn jas aan. Morgen weer."
    ],
    pause: true,
    next: "reflect"
  },

  reflect: {
    id: "reflect",
    time: "Reflectie",
    chapter: "Aan het einde van de dag",
    reflectScreen: true
  }
};
