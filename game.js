/* ============================================================
   MIDNIGHT DETECTIVE
   A randomized noir murder mystery for vertical screens.
   ============================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rnd(arr.length)];
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const take = (arr, n) => shuffle(arr).slice(0, n);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const OBJECT_ORDER = ['desk', 'window', 'coat', 'safe'];
const OBJECTS = {
  desk: { name: 'The desk', short: 'DESK', exhibit: 'A', plate: '01', place: 'Under the desk', tag: 'the desk' },
  window: { name: 'The window', short: 'WINDOW', exhibit: 'B', plate: '02', place: 'On the window latch', tag: 'the window' },
  coat: { name: 'The coat', short: 'COAT', exhibit: 'C', plate: '03', place: "In the coat's lining", tag: 'the coat' },
  safe: { name: 'The safe', short: 'SAFE', exhibit: 'D', plate: '04', place: "Inside the safe's dial", tag: 'the safe' }
};

const SUSPECT_POOL = [
  { name: 'Vera Lane', portrait: 'cloche', trace: 'a trace of gardenia perfume' },
  { name: 'Miles Calloway', portrait: 'fedora', trace: 'a black pearl cufflink' },
  { name: 'Iris Voss', portrait: 'veil', trace: 'a red lipstick smudge' },
  { name: 'Sonny Delacroix', portrait: 'fedora', trace: 'a half-smoked Gauloise' },
  { name: 'Ruthie Kane', portrait: 'cloche', trace: 'a scarlet silk thread' },
  { name: 'Elliot Graves', portrait: 'bald', trace: 'silver polish from a tipped cane' },
  { name: 'Lana Moreau', portrait: 'veil', trace: 'green dust from a jade ring' },
  { name: 'Frankie Sabini', portrait: 'rough', trace: 'lighter fluid from a brass lighter' },
  { name: 'Vivian Cross', portrait: 'cloche', trace: 'a scratch from a diamond tie pin' },
  { name: 'Walter Pike', portrait: 'bald', trace: 'a cracked watch crystal' },
  { name: 'Clara Boone', portrait: 'cloche', trace: 'a scrap of crocodile leather' },
  { name: 'Desmond Shaw', portrait: 'fedora', trace: 'a smear of bay rum cologne' }
];

const VICTIMS = [
  { name: 'Arthur Vale', role: 'nightclub owner' },
  { name: 'Delia Marsh', role: 'heiress' },
  { name: 'Hollis Grey', role: 'city councilman' },
  { name: 'Rosa Bell', role: 'jazz singer' },
  { name: 'Chester Wynn', role: 'shipping magnate' },
  { name: 'Mae Carver', role: 'gossip columnist' },
  { name: 'Julian Frost', role: 'defense attorney' },
  { name: 'Nora Quinn', role: 'hotel manager' },
  { name: 'Eddie Rourke', role: 'union bagman' },
  { name: 'Lillian Price', role: 'studio actress' }
];

const WEAPONS = [
  'brass letter opener', 'snub-nosed .38', 'bronze statuette', 'boning knife',
  'length of piano wire', 'cut-glass decanter', 'lead-filled blackjack',
  'straight razor', 'brass candlestick', 'claw hammer'
];

const ROLES = [
  'Torch singer', 'Club manager', 'The widow', 'Business partner', 'Private secretary',
  'Crime reporter', 'Bartender', 'Bookkeeper', 'Boxing promoter', 'Hotel owner',
  'Piano player', 'Estate lawyer', 'Photographer', 'Chauffeur', 'Night clerk', 'Ward politician'
];

const MOTIVES = [
  'The victim held the mortgage on the club.',
  'A year of quiet blackmail ended tonight.',
  'The will skipped them and everyone knew it.',
  'The victim was about to talk to the police.',
  'An old affair turned sour in the spring.',
  'The victim stole the only thing that mattered.',
  'A debt came due at midnight.',
  'The victim was cutting them out of the business.',
  'A forged signature was about to surface.',
  'They knew who really burned the warehouse.',
  'The victim was leaving and taking the money.',
  'A partnership was about to dissolve—badly.'
];

const ALIBIS = [
  'Says the rain kept everyone at the Starlight until two.',
  'Claims a late card game in the back room.',
  'Swears the elevator boy can vouch for the whole hour.',
  'Says a long-distance call kept them on the line.',
  'Insists the doorman saw them leave at 1:10.',
  'Was supposedly asleep in the room next door.',
  'Says they were nursing a whiskey at the bar.',
  'Claims a flat tire kept them on the road.',
  'Says the night manager signed them out at 1:20.',
  'Was allegedly in the kitchen, flirting with the cook.',
  'Says the rain soaked them on the walk back at 1:30.',
  'Claims they were on the phone with the precinct.'
];

const LOCATIONS = [
  {
    name: 'The Marlowe Hotel', room: 'Room 814', address: 'The Marlowe Hotel, Room 814',
    place: 'hotel', feel: 'Rain hisses on the fire escape. The suite smells of gin and cold cigar smoke.'
  },
  {
    name: 'The Starlight Lounge', room: 'Back office', address: 'The Starlight Lounge, rear office',
    place: 'club', feel: 'Velvet walls, a dead neon moon, and a carpet that has seen better nights.'
  },
  {
    name: 'Pier 9', room: "Harbormaster's office", address: "Pier 9, harbormaster's office",
    place: 'dock', feel: 'The river slaps the pilings. Somewhere a foghorn answers.'
  },
  {
    name: 'The Alcazar Arms', room: 'Room 302', address: 'The Alcazar Arms, Room 302',
    place: 'hotel', feel: 'One bulb burns in the hall. The rest of the floor is a rumor.'
  }
];

const TIPS = [
  "Body's at {address}. Door was locked from the inside.",
  "Sorry to wake you. {victim} is dead at {address}. Rain's washing the scene clean.",
  'Get down to {address}, detective. Coroner puts time of death at 1:45.',
  'Body at {address}. Your kind of weather—and your kind of mess.'
];

const GUN_OPENERS = {
  desk: 'Under the desk: {trace}.',
  window: 'Snagged on the window latch: {trace}.',
  coat: "In the coat's lining: {trace}.",
  safe: "Inside the safe's dial: {trace}."
};

const GUN_CLOSERS = [
  'Only {killer} leaves that signature.',
  "That's {killer}'s calling card.",
  'It belongs to {killer}, and nobody else.',
  'Only {killer} could have left it.'
];

const RED_PLACES = {
  desk: 'Under the desk',
  window: 'On the sill',
  coat: 'In the coat',
  safe: 'Inside the safe'
};

const WEAPON_LINES = {
  desk: 'The {weapon} lies in the desk drawer, wiped clean. The killer knew where it was kept.',
  window: 'The {weapon} rests on the sill, wiped clean. Whoever came through that window came prepared.',
  coat: 'The {weapon} is rolled in the coat, wiped clean. This was planned, not a crime of passion.',
  safe: 'The {weapon} is stashed in the safe, wiped clean. The killer knew the combination.'
};

const ALIBI_LINES = {
  desk: "A betting slip in the desk puts {name} here at 1:35. That's not the story {name} told.",
  window: "A cab receipt on the sill is timed 1:35 and made out to {name}. The alibi doesn't hold.",
  coat: "A pawn ticket in the coat is stamped 1:35 and carries {name}'s initials. The alibi doesn't hold.",
  safe: "The safe's timer jammed at 1:35—the exact minute {name} claims to have been elsewhere."
};

function makeCase() {
  const location = pick(LOCATIONS);
  const victim = pick(VICTIMS);
  const weapon = pick(WEAPONS);
  const chosen = take(SUSPECT_POOL, 3);
  const roles = take(ROLES, 3);
  const motives = take(MOTIVES, 3);
  const alibis = take(ALIBIS, 3);
  const suspects = chosen.map((s, i) => ({
    ...s,
    role: roles[i],
    motive: motives[i],
    alibi: alibis[i]
  }));
  const killerIndex = rnd(3);
  const killer = suspects[killerIndex];
  const innocentIndices = [0, 1, 2].filter((i) => i !== killerIndex);
  const redSuspectIndex = pick(innocentIndices);
  const redSuspect = suspects[redSuspectIndex];
  const alibiSuspectIndex = rnd(3);
  const alibiSuspect = suspects[alibiSuspectIndex];

  const shuffledObjects = shuffle(OBJECT_ORDER);
  const types = ['gun', 'red', 'weapon', 'alibi'];
  const clues = {};

  const gunObject = shuffledObjects[0];
  const gunCloser = pick(GUN_CLOSERS).replaceAll('{killer}', killer.name);
  clues[gunObject] = {
    object: gunObject,
    type: 'gun',
    text: GUN_OPENERS[gunObject].replace('{trace}', killer.trace) + ' ' + gunCloser
  };

  const redObject = shuffledObjects[1];
  clues[redObject] = {
    object: redObject,
    type: 'red',
    text: `${RED_PLACES[redObject]}: ${redSuspect.trace}. It carries ${redSuspect.name}'s signature—maybe too neatly.`
  };

  const weaponObject = shuffledObjects[2];
  clues[weaponObject] = {
    object: weaponObject,
    type: 'weapon',
    text: WEAPON_LINES[weaponObject].replace('{weapon}', weapon)
  };

  const alibiObject = shuffledObjects[3];
  clues[alibiObject] = {
    object: alibiObject,
    type: 'alibi',
    text: ALIBI_LINES[alibiObject].replaceAll('{name}', alibiSuspect.name)
  };

  const tip = pick(TIPS)
    .replaceAll('{address}', location.address)
    .replaceAll('{victim}', victim.name);

  return {
    id: String(1000 + rnd(9000)),
    location,
    victim,
    weapon,
    suspects,
    killerIndex,
    redSuspectIndex,
    alibiSuspectIndex,
    redSuspect,
    clues,
    tip,
    openedAt: Date.now()
  };
}
/* ================= CLOSE-UP ART ================= */
const CLOSEUPS = {};

CLOSEUPS.desk = `
<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A rain-lit close-up of the dead man's desk">
  <defs>
    <linearGradient id="dk-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#171009"/><stop offset=".65" stop-color="#0d0906"/><stop offset="1" stop-color="#080605"/>
    </linearGradient>
    <linearGradient id="dk-wood" x1="0" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="#6a4528"/><stop offset=".35" stop-color="#482d19"/><stop offset=".75" stop-color="#2b1a0f"/><stop offset="1" stop-color="#160e08"/>
    </linearGradient>
    <radialGradient id="dk-lamp" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ffce84" stop-opacity=".5"/>
      <stop offset=".35" stop-color="#d3944e" stop-opacity=".2"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="dk-vig" cx=".5" cy=".46" r=".7">
      <stop offset=".4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
    </radialGradient>
    <filter id="dk-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="dk-soft2"><feGaussianBlur stdDeviation="2.5"/></filter>
  </defs>
  <rect width="400" height="500" fill="url(#dk-wall)"/>
  <g stroke="#3a2a1a" stroke-width=".6" opacity=".18">
    <line x1="24" y1="0" x2="24" y2="184"/><line x1="72" y1="0" x2="72" y2="184"/><line x1="120" y1="0" x2="120" y2="184"/>
    <line x1="168" y1="0" x2="168" y2="184"/><line x1="216" y1="0" x2="216" y2="184"/><line x1="264" y1="0" x2="264" y2="184"/>
    <line x1="312" y1="0" x2="312" y2="184"/><line x1="360" y1="0" x2="360" y2="184"/>
  </g>
  <path d="M-20 166 L420 138 L420 520 L-20 520Z" fill="url(#dk-wood)"/>
  <path d="M-20 168 L420 140" stroke="#d5a96b" stroke-opacity=".35" stroke-width="1.6"/>
  <path d="M-20 174 L420 146" stroke="#0b0603" stroke-opacity=".7" stroke-width="2"/>
  <ellipse cx="300" cy="212" rx="180" ry="150" fill="url(#dk-lamp)"/>
  <g stroke="#1a0f07" stroke-width="1" opacity=".5" fill="none">
    <path d="M-10 225c70-12 150-12 232-2s130 15 190 11"/>
    <path d="M-10 262c58-9 143-8 222 0s148 13 195 9"/>
    <path d="M-8 313c71-7 142-7 217 0s142 10 208 7"/>
    <path d="M-8 374c58-6 139-6 214-1s149 10 202 6"/>
    <path d="M-8 446c75-8 158-6 234 1s137 9 181 5"/>
    <path d="M43 178c8 74 5 162-3 290M130 170c7 61 3 148-2 300M222 162c6 80 3 161-1 238M310 154c4 64 6 160 2 300"/>
  </g>
  <g opacity=".6" fill="#efd8a8">
    <circle cx="292" cy="180" r="1"/><circle cx="312" cy="197" r=".7"/><circle cx="261" cy="214" r=".8"/>
    <circle cx="341" cy="228" r=".6"/><circle cx="278" cy="249" r=".7"/>
  </g>

  <!-- lamp, top right -->
  <g transform="translate(316 88)">
    <ellipse cx="0" cy="16" rx="112" ry="84" fill="#ffcd82" opacity=".13" filter="url(#dk-soft)"/>
    <path d="M-58 3C-50-24 50-24 58 3L42 15H-42Z" fill="#25271b" stroke="#81734e" stroke-width="1.2"/>
    <path d="M-47 6C-38-13 38-13 47 6Z" fill="#43462b" opacity=".9"/>
    <path d="M-44 16h88" stroke="#caa66a" stroke-width="3" opacity=".6"/>
    <rect x="-3" y="16" width="6" height="52" fill="#17120c"/>
    <ellipse cx="0" cy="68" rx="31" ry="7" fill="#0c0906"/>
  </g>

  <!-- report and papers -->
  <g transform="translate(60 224) rotate(-8)">
    <rect x="6" y="8" width="154" height="186" fill="#000" opacity=".35" filter="url(#dk-soft2)"/>
    <rect width="154" height="186" fill="#cdbc98"/>
    <rect x="8" y="9" width="138" height="168" fill="none" stroke="#8d7755" stroke-opacity=".4"/>
    <text x="13" y="27" font-family="'Special Elite','Courier New',monospace" font-size="9" letter-spacing="2" fill="#4c3a22">CASE FILE</text>
    <text x="13" y="42" font-family="'Special Elite','Courier New',monospace" font-size="7.5" fill="#5d482c">3:05 A.M. / HOMICIDE</text>
    <g stroke="#4d3c25" stroke-width=".8" opacity=".55">
      <line x1="13" y1="57" x2="139" y2="57"/><line x1="13" y1="67" x2="132" y2="67"/>
      <line x1="13" y1="77" x2="141" y2="77"/><line x1="13" y1="87" x2="124" y2="87"/>
      <line x1="13" y1="97" x2="137" y2="97"/><line x1="13" y1="107" x2="117" y2="107"/>
      <line x1="13" y1="117" x2="142" y2="117"/><line x1="13" y1="127" x2="130" y2="127"/>
      <line x1="13" y1="137" x2="139" y2="137"/><line x1="13" y1="147" x2="105" y2="147"/>
      <line x1="13" y1="157" x2="136" y2="157"/>
    </g>
    <path d="M100 170c17-5 34-4 46 5-15 5-36 6-54 2Z" fill="#6f2923" opacity=".25"/>
    <path d="M154 186l-13-11-1 21Z" fill="#b6a27d"/>
  </g>
  <g transform="translate(38 227) rotate(5)" opacity=".7">
    <rect width="82" height="108" fill="#b7a580"/>
    <g stroke="#57452d" stroke-width=".7" opacity=".5"><line x1="9" y1="17" x2="72" y2="17"/><line x1="9" y1="26" x2="66" y2="26"/><line x1="9" y1="35" x2="73" y2="35"/><line x1="9" y1="44" x2="55" y2="44"/></g>
  </g>

  <!-- ashtray -->
  <g transform="translate(294 334) rotate(-4)">
    <ellipse cx="8" cy="18" rx="54" ry="25" fill="#000" opacity=".5" filter="url(#dk-soft2)"/>
    <ellipse rx="50" ry="27" fill="#2c261d" stroke="#746448" stroke-width="1.4"/>
    <ellipse rx="36" ry="17" fill="#0b0907"/>
    <ellipse rx="36" ry="17" fill="none" stroke="#9c8459" stroke-opacity=".35"/>
    <ellipse cx="17" cy="-4" rx="6" ry="2.1" fill="#d2c19d" transform="rotate(-17 17 -4)"/>
    <circle cx="22" cy="-5" r="1.8" fill="#e06a39" opacity=".9"/>
    <path d="M10-6c-16 4-22 14-13 23 2 3-1 7-4 10" stroke="#cfc3ab" stroke-width="2.2" fill="none" opacity=".22" filter="url(#dk-soft2)"/>
    <path d="M14-9c-22 6-30 22-17 37 6 8 1 14-5 21" stroke="#d6cbb4" stroke-width="1.3" fill="none" opacity=".16"/>
    <ellipse cx="-20" cy="2" rx="8" ry="3" fill="#5c4a32" opacity=".65" transform="rotate(13 -20 2)"/>
  </g>

  <!-- whiskey glass -->
  <g transform="translate(104 422)">
    <ellipse cx="3" cy="25" rx="29" ry="8" fill="#000" opacity=".45"/>
    <path d="M-22-17h44l-5 38c-1 5-6 7-17 7s-16-2-17-7Z" fill="#7c5d30" opacity=".24" stroke="#c9b489" stroke-opacity=".36" stroke-width="1"/>
    <path d="M-19 3h38l-3 17c-1 4-8 6-16 6s-15-2-16-6Z" fill="#9e6f2e" opacity=".45"/>
    <ellipse cy="-17" rx="22" ry="5" fill="#d0bc91" opacity=".15"/>
    <ellipse cy="-16" rx="18" ry="2.6" fill="#deb36f" opacity=".28"/>
    <path d="M-16-14c3 2 28 2 32 0" stroke="#f5e5bc" stroke-opacity=".34" stroke-width="1"/>
  </g>

  <!-- ink bottle, pen, loose matchbook -->
  <g transform="translate(243 424) rotate(8)">
    <rect x="-15" y="-17" width="30" height="32" rx="3" fill="#101417" stroke="#4b5b60" stroke-width="1"/>
    <rect x="-10" y="-22" width="20" height="8" rx="2" fill="#252b2e" stroke="#596a6f"/>
    <path d="M-15-3h30" stroke="#c8a76b" stroke-opacity=".22"/>
    <path d="M20-11l22-19" stroke="#b9a47c" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>
  </g>
  <g transform="translate(329 416) rotate(-13)">
    <rect width="52" height="30" rx="2" fill="#5f2a24" stroke="#8d5646" stroke-width="1"/>
    <rect x="5" y="5" width="42" height="20" fill="none" stroke="#c29b73" stroke-opacity=".35"/>
    <text x="26" y="17" text-anchor="middle" font-family="'Oswald',sans-serif" font-size="6" letter-spacing="1.5" fill="#dcc29d" opacity=".7">STARLIGHT</text>
  </g>

  <!-- blood smear at edge -->
  <path d="M343 270c17 2 30 13 33 30 3 17-10 33-21 43-6 6-17 8-22 2-4-6 6-14 8-25 2-12-9-19-10-30-1-12 4-21 12-20Z" fill="#4f1515" opacity=".55" filter="url(#dk-soft2)"/>
  <path d="M367 314c12 2 20 10 19 20" stroke="#671d1c" stroke-width="3" fill="none" opacity=".3"/>
  <g fill="#e8d7ad">
    <circle cx="200" cy="192" r=".8" opacity=".4"/><circle cx="352" cy="194" r=".6" opacity=".3"/><circle cx="237" cy="267" r=".7" opacity=".35"/>
  </g>
  <rect width="400" height="500" fill="url(#dk-vig)"/>
</svg>`;
CLOSEUPS.window = `
<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A close-up of the shattered window and the rainy street beyond">
  <defs>
    <linearGradient id="wn-night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b1d28"/><stop offset=".55" stop-color="#162831"/><stop offset="1" stop-color="#2d2824"/>
    </linearGradient>
    <linearGradient id="wn-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4d4030"/><stop offset=".4" stop-color="#221b14"/><stop offset="1" stop-color="#0a0806"/>
    </linearGradient>
    <linearGradient id="wn-sill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3b3228"/><stop offset=".35" stop-color="#1c1712"/><stop offset="1" stop-color="#090706"/>
    </linearGradient>
    <radialGradient id="wn-neon" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#ff6c81" stop-opacity=".45"/><stop offset="1" stop-color="#ff4768" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="wn-vig" cx=".5" cy=".48" r=".72">
      <stop offset=".38" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/>
    </radialGradient>
    <filter id="wn-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="wn-blur"><feGaussianBlur stdDeviation="2.2"/></filter>
    <filter id="wn-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>

  <rect width="400" height="500" fill="#06090b"/>
  <rect x="22" y="16" width="356" height="408" fill="url(#wn-night)"/>

  <!-- outside: skyline -->
  <g fill="#091217">
    <rect x="18" y="176" width="52" height="250"/><rect x="58" y="126" width="38" height="300"/>
    <rect x="95" y="208" width="46" height="220"/><rect x="132" y="158" width="32" height="270"/>
    <rect x="164" y="198" width="55" height="230"/><rect x="218" y="142" width="38" height="290"/>
    <rect x="252" y="186" width="53" height="243"/><rect x="303" y="156" width="40" height="273"/>
    <rect x="339" y="204" width="48" height="222"/>
  </g>
  <g fill="#d7ad67" opacity=".48">
    <rect x="28" y="195" width="4" height="6"/><rect x="38" y="213" width="4" height="6"/><rect x="49" y="195" width="4" height="6"/>
    <rect x="67" y="146" width="3" height="5"/><rect x="76" y="166" width="3" height="5"/><rect x="67" y="190" width="3" height="5"/>
    <rect x="104" y="224" width="4" height="6"/><rect x="115" y="240" width="4" height="6"/><rect x="126" y="224" width="4" height="6"/>
    <rect x="172" y="216" width="4" height="6"/><rect x="184" y="232" width="4" height="6"/><rect x="198" y="216" width="4" height="6"/>
    <rect x="226" y="162" width="3" height="5"/><rect x="236" y="180" width="3" height="5"/><rect x="226" y="204" width="3" height="5"/>
    <rect x="262" y="204" width="4" height="6"/><rect x="274" y="220" width="4" height="6"/><rect x="288" y="204" width="4" height="6"/>
    <rect x="311" y="176" width="3" height="5"/><rect x="322" y="196" width="3" height="5"/><rect x="346" y="222" width="4" height="6"/>
  </g>
  <g fill="#86c3c4" opacity=".28"><rect x="44" y="238" width="3" height="4"/><rect x="140" y="238" width="3" height="4"/><rect x="268" y="248" width="3" height="4"/></g>

  <!-- neon across the street -->
  <g transform="translate(88 158) rotate(-90)" filter="url(#wn-glow)">
    <rect x="-30" y="-14" width="60" height="28" fill="none" stroke="#ee6a80" stroke-width="1" opacity=".6"/>
    <text x="0" y="4" text-anchor="middle" font-family="'Oswald',sans-serif" font-size="14" letter-spacing="3" fill="#ff7189" opacity=".85">BAR</text>
  </g>
  <ellipse cx="92" cy="236" rx="100" ry="130" fill="url(#wn-neon)"/>

  <!-- rain outside -->
  <g stroke="#b9d5dc" stroke-width=".9" opacity=".36">
    <line x1="40" y1="40" x2="20" y2="112"/><line x1="83" y1="34" x2="61" y2="114"/><line x1="128" y1="32" x2="104" y2="120"/>
    <line x1="174" y1="38" x2="149" y2="124"/><line x1="221" y1="30" x2="196" y2="118"/><line x1="268" y1="40" x2="241" y2="128"/>
    <line x1="317" y1="32" x2="289" y2="122"/><line x1="358" y1="44" x2="331" y2="126"/>
    <line x1="58" y1="132" x2="34" y2="226"/><line x1="104" y1="146" x2="78" y2="246"/><line x1="152" y1="132" x2="124" y2="232"/>
    <line x1="202" y1="142" x2="174" y2="240"/><line x1="251" y1="132" x2="223" y2="234"/><line x1="301" y1="140" x2="272" y2="242"/>
    <line x1="352" y1="132" x2="322" y2="238"/>
    <line x1="66" y1="258" x2="38" y2="354"/><line x1="118" y1="268" x2="89" y2="368"/><line x1="169" y1="254" x2="140" y2="354"/>
    <line x1="220" y1="266" x2="191" y2="370"/><line x1="272" y1="256" x2="242" y2="360"/><line x1="323" y1="270" x2="294" y2="374"/>
    <line x1="52" y1="378" x2="24" y2="428"/><line x1="140" y1="382" x2="111" y2="438"/><line x1="230" y1="380" x2="201" y2="440"/><line x1="320" y1="382" x2="292" y2="438"/>
  </g>

  <!-- glass surface tint and reflections -->
  <rect x="22" y="16" width="356" height="408" fill="#a9cfd8" opacity=".035"/>
  <path d="M32 16h58L22 214V92Z" fill="#d6ecf2" opacity=".055"/>
  <path d="M352 16h26v158L303 16Z" fill="#d6ecf2" opacity=".04"/>

  <!-- frame -->
  <rect x="14" y="8" width="372" height="424" fill="none" stroke="url(#wn-frame)" stroke-width="18"/>
  <rect x="22" y="16" width="356" height="408" fill="none" stroke="#0a0807" stroke-width="2"/>
  <rect x="193" y="16" width="14" height="408" fill="url(#wn-frame)" stroke="#0a0807" stroke-width="1"/>
  <rect x="22" y="242" width="356" height="13" fill="url(#wn-frame)" stroke="#0a0807" stroke-width="1"/>
  <rect x="22" y="16" width="356" height="408" fill="none" stroke="#a18761" stroke-opacity=".18" stroke-width="1"/>

  <!-- impact and cracks -->
  <g transform="translate(262 162)">
    <circle r="9" fill="#0a0e10" stroke="#d7e7e8" stroke-opacity=".4" stroke-width="1"/>
    <circle r="2.5" fill="#020303"/>
    <g stroke="#d7e7e8" stroke-opacity=".65" stroke-width="1" fill="none">
      <path d="M-8-4L-79-64M-9 1L-116-10M-6 7L-62 96M2 9L17 122M8 4L96 41M7-5L72-68M-3-9L-30-119"/>
      <path d="M-79-64l-26-12M-79-64l-6-31M-116-10l-38 14M-62 96l-19 35M-62 96l20 23M17 122l-19 36M96 41l35-5M96 41l25 25M72-68l11-30"/>
      <path d="M-45-20l-39 34M-36 48l-49 2M53 20l57 3M20-32l38-44"/>
    </g>
    <path d="M-28-35L-46-52l-17 9-3 24Z" fill="#d6e7e9" opacity=".08"/>
  </g>
  <!-- missing shard and loose glass -->
  <path d="M276 130l49-51 13 64-24 17Z" fill="#0a171d" opacity=".75"/>
  <path d="M276 130l49-51 13 64" fill="none" stroke="#d6e6e8" stroke-opacity=".38" stroke-width="1"/>
  <g fill="#d7e6e7" opacity=".35">
    <path d="M322 132l9 13-11 3Z"/><path d="M301 173l7 17-12-5Z"/><path d="M245 219l4 13-8-3Z"/>
  </g>
  <g stroke="#cfe3e6" stroke-opacity=".3" stroke-width=".8">
    <line x1="40" y1="300" x2="60" y2="337"/><line x1="150" y1="280" x2="163" y2="316"/><line x1="330" y1="290" x2="348" y2="330"/>
  </g>
  <g fill="#d5e8eb" opacity=".3">
    <ellipse cx="82" cy="214" rx="2" ry="4" transform="rotate(-17 82 214)"/>
    <ellipse cx="176" cy="300" rx="1.6" ry="3.6" transform="rotate(-13 176 300)"/>
    <ellipse cx="314" cy="260" rx="2.4" ry="5" transform="rotate(-19 314 260)"/>
    <ellipse cx="356" cy="352" rx="1.8" ry="4" transform="rotate(-16 356 352)"/>
    <ellipse cx="124" cy="376" rx="2" ry="4.4" transform="rotate(-14 124 376)"/>
  </g>

  <!-- curtains -->
  <path d="M22 16c31 64 16 180 2 264 24 9 39 2 48-19 9-49 11-168-1-245Z" fill="#151417" opacity=".93"/>
  <path d="M30 30c19 61 11 148 1 218M47 34c12 58 10 146 1 205" stroke="#4a4142" stroke-opacity=".22" stroke-width="2" fill="none"/>
  <path d="M356 16c-22 72-13 169-1 248 20 3 29-8 27-30-1-42 6-108-1-218Z" fill="#111013" opacity=".9"/>
  <path d="M364 42c-11 62-7 135-1 190" stroke="#4a4142" stroke-opacity=".16" stroke-width="2" fill="none"/>

  <!-- sill and interior -->
  <rect x="0" y="424" width="400" height="76" fill="url(#wn-sill)"/>
  <rect x="8" y="430" width="384" height="8" fill="#725a3a" opacity=".28"/>
  <path d="M14 424h372v10H14Z" fill="#a0855b" opacity=".16"/>
  <ellipse cx="245" cy="462" rx="75" ry="14" fill="#7aa4ad" opacity=".12"/>
  <ellipse cx="245" cy="461" rx="55" ry="8" fill="#b7d5da" opacity=".11"/>
  <path d="M206 447c5 4 2 8 7 11M226 452c4 3 1 6 5 9M267 449c4 4 1 7 5 10" stroke="#d4e5e7" stroke-opacity=".24" stroke-width=".8" fill="none"/>
  <g transform="translate(214 430)">
    <rect width="30" height="12" rx="2" fill="#3a342a" stroke="#8d7a57" stroke-width="1"/>
    <path d="M5 2l8 4-4 5M22 2l-7 4 4 5" stroke="#cfae74" stroke-width="1" fill="none" opacity=".7"/>
    <path d="M30 4l14 2-3 8-12-2Z" fill="#2b2720" stroke="#8d7a57" stroke-width=".8"/>
  </g>
  <path d="M0 436h400M0 468h400M0 492h400" stroke="#000" stroke-opacity=".3"/>
  <g fill="#c8b592" opacity=".35">
    <path d="M320 444l9 8-5 9-9-7Z"/><path d="M337 462l6 6-4 6-6-6Z"/>
  </g>
  <rect width="400" height="500" fill="url(#wn-vig)"/>
</svg>`;
CLOSEUPS.coat = `
<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A close-up of the dead man's trench coat hanging in the dark">
  <defs>
    <linearGradient id="ct-wall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17140f"/><stop offset=".55" stop-color="#0b0a08"/><stop offset="1" stop-color="#050404"/>
    </linearGradient>
    <linearGradient id="ct-coat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7a6b53"/><stop offset=".22" stop-color="#4a4032"/><stop offset=".62" stop-color="#241f19"/><stop offset="1" stop-color="#0c0a08"/>
    </linearGradient>
    <linearGradient id="ct-coat2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3c352a"/><stop offset=".6" stop-color="#1a1712"/><stop offset="1" stop-color="#090807"/>
    </linearGradient>
    <linearGradient id="ct-light" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffdca0" stop-opacity=".22"/><stop offset="1" stop-color="#ffdca0" stop-opacity="0"/>
    </linearGradient>
    <pattern id="ct-check" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="#1d1610"/>
      <path d="M0 0h9v9H0Zm9 9h9v9H9Z" fill="#5e2c2a" opacity=".5"/>
      <path d="M0 0v18M0 0h18" stroke="#9d8050" stroke-opacity=".18" stroke-width=".8"/>
    </pattern>
    <radialGradient id="ct-vig" cx=".46" cy=".46" r=".72">
      <stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".74"/>
    </radialGradient>
    <filter id="ct-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="ct-blur2"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>

  <rect width="400" height="500" fill="url(#ct-wall)"/>
  <g stroke="#3c3327" stroke-width=".7" opacity=".18">
    <line x1="32" y1="0" x2="32" y2="500"/><line x1="96" y1="0" x2="96" y2="500"/><line x1="160" y1="0" x2="160" y2="500"/>
    <line x1="224" y1="0" x2="224" y2="500"/><line x1="288" y1="0" x2="288" y2="500"/><line x1="352" y1="0" x2="352" y2="500"/>
  </g>
  <rect x="-40" y="0" width="210" height="500" fill="url(#ct-light)"/>
  <ellipse cx="90" cy="250" rx="190" ry="260" fill="#ffce86" opacity=".05" filter="url(#ct-blur)"/>
  <path d="M175 0l-38 500h168L270 0Z" fill="#ffd69a" opacity=".025"/>
  <ellipse cx="208" cy="470" rx="148" ry="22" fill="#000" opacity=".45" filter="url(#ct-blur)"/>

  <!-- hanger -->
  <path d="M200 28v25" stroke="#8e7a56" stroke-width="3" fill="none"/>
  <path d="M200 54l8-15c0-7-15-8-15-1 0 3 4 4 5 2" stroke="#a08a63" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M200 53L94 140M200 53l106 87" stroke="#6f5e42" stroke-width="4" stroke-linecap="round"/>
  <path d="M94 140l-6 22M306 140l6 22" stroke="#6f5e42" stroke-width="3"/>

  <!-- coat silhouette -->
  <path d="M105 154c32-13 62-18 95-18 34 0 65 5 97 18l-11 148-8 183c-20 8-37 11-51 10l-7-111-10-2-8 113c-18 1-35-2-53-9l-8-182Z" fill="url(#ct-coat)" stroke="#0a0806" stroke-width="1.5"/>
  <path d="M140 154c19 27 41 41 65 41 25 0 47-14 65-42" fill="none" stroke="#9d8a6b" stroke-opacity=".28" stroke-width="1.4"/>
  <path d="M141 156c15 48 12 107 8 201l27 31-1-174c-11-23-23-42-34-58Z" fill="#0c0a08" opacity=".6"/>
  <path d="M263 157c-13 54-11 130-8 202l-24 30 1-172c11-23 21-42 31-60Z" fill="#070605" opacity=".65"/>

  <!-- collar and lapels -->
  <path d="M138 148c13-18 34-27 62-27 29 0 51 9 65 28l-25 62-41-35-39 35Z" fill="url(#ct-coat2)" stroke="#0a0806" stroke-width="1.2"/>
  <path d="M140 150l-16 33 45 28-22-48Z" fill="#312b22" stroke="#0a0806" stroke-width="1"/>
  <path d="M260 150l17 33-46 28 22-48Z" fill="#28231c" stroke="#0a0806" stroke-width="1"/>
  <path d="M141 153l-3 27 27 14-10-28Z" fill="#1b1712"/>
  <path d="M262 153l3 27-28 14 12-28Z" fill="#171410"/>
  <path d="M148 152c25 9 52 9 104 0" stroke="#c2b08b" stroke-opacity=".18" stroke-width="1.2"/>
  <path d="M168 188l33 30 31-30" fill="url(#ct-check)" stroke="#0b0907" stroke-width="1"/>
  <path d="M200 212v66" stroke="#0a0806" stroke-width="2"/>
  <path d="M199 216v72" stroke="#b4a17e" stroke-opacity=".12" stroke-width="1"/>

  <!-- sleeve on left -->
  <path d="M108 154c-23 8-38 22-44 41l-12 80c-2 12 6 18 18 19 10 1 16-4 17-14l9-66 30-34Z" fill="url(#ct-coat2)" stroke="#090705" stroke-width="1.2"/>
  <path d="M54 268c8 7 21 10 34 8l-4 21c-11 4-22 2-30-3Z" fill="#14110d" stroke="#0b0907"/>
  <path d="M60 278c5 3 13 4 21 3" stroke="#877656" stroke-opacity=".26" stroke-width="1"/>

  <!-- fold lines -->
  <g stroke="#0a0806" stroke-width="1" fill="none" opacity=".55">
    <path d="M127 226c-9 59-8 128-7 186M155 246c-8 49-7 104-5 154M174 240c-4 53-2 105 1 154"/>
    <path d="M236 233c8 57 10 122 10 182M259 238c7 48 6 102 3 155M283 224c7 57 8 119 7 176"/>
  </g>
  <g stroke="#af9a73" stroke-width=".8" fill="none" opacity=".1">
    <path d="M132 224c-6 58-5 129-4 190M243 231c8 60 9 122 8 183M292 217c7 54 8 117 7 172"/>
  </g>

  <!-- belt -->
  <path d="M113 320c30 9 58 13 86 13 31 0 60-4 89-13l-2 31c-27 9-57 13-87 13-29 0-57-4-84-12Z" fill="#1d1913" stroke="#0c0a08" stroke-width="1.4"/>
  <path d="M114 324c57 17 115 17 170 0" stroke="#a28e69" stroke-opacity=".22" stroke-width="1.3"/>
  <path d="M117 340c57 16 113 16 168 0" stroke="#000" stroke-opacity=".35"/>
  <rect x="179" y="323" width="43" height="28" rx="3" fill="none" stroke="#b49a67" stroke-width="2.2"/>
  <path d="M188 336h25" stroke="#c9b383" stroke-width="2" opacity=".55"/>
  <circle cx="200" cy="336" r="3" fill="#0c0906" stroke="#a88d5a" stroke-width="1"/>

  <!-- pockets and buttons -->
  <path d="M72 360c22-5 44-5 64 0l-3 37c-20 5-40 4-58-1Z" fill="#16130f" stroke="#0b0907" stroke-width="1"/>
  <path d="M74 362c20-4 41-4 60 0" stroke="#a38e69" stroke-opacity=".22" stroke-width="1"/>
  <path d="M267 359c21-5 43-5 64 0l-2 36c-19 5-40 4-60-1Z" fill="#15120e" stroke="#0b0907" stroke-width="1"/>
  <path d="M269 361c20-4 41-4 60 0" stroke="#a38e69" stroke-opacity=".2" stroke-width="1"/>
  <g fill="#15120e" stroke="#a08a61" stroke-width="1.4">
    <circle cx="203" cy="262" r="6"/><circle cx="203" cy="302" r="6"/><circle cx="203" cy="412" r="6"/>
  </g>
  <g fill="#c7ad77" opacity=".24"><circle cx="201" cy="260" r="1.5"/><circle cx="201" cy="300" r="1.5"/><circle cx="201" cy="410" r="1.5"/></g>

  <!-- torn pocket thread -->
  <path d="M268 380c-7 8-10 18-8 30" stroke="#0a0807" stroke-width="2.4" fill="none"/>
  <g stroke="#9e8a66" stroke-width=".8" opacity=".6" fill="none">
    <path d="M269 379c7 5 8 13 4 18M265 384c-6 7-5 16 0 21M272 388c2 6 1 12-2 16"/>
  </g>

  <!-- rain and stains -->
  <g fill="#bcdae0" opacity=".27">
    <ellipse cx="96" cy="213" rx="1.8" ry="4" transform="rotate(-12 96 213)"/>
    <ellipse cx="286" cy="204" rx="1.5" ry="3.6" transform="rotate(-14 286 204)"/>
    <ellipse cx="255" cy="284" rx="1.2" ry="3" transform="rotate(-11 255 284)"/>
    <ellipse cx="130" cy="305" rx="1.5" ry="3.4" transform="rotate(-15 130 305)"/>
    <ellipse cx="316" cy="346" rx="1.3" ry="3" transform="rotate(-13 316 346)"/>
  </g>
  <path d="M238 179c18 6 28 21 25 39-2 14-11 24-22 27-7 2-14-2-14-10 0-9 9-13 10-25 1-12-5-22 1-31Z" fill="#4d1414" opacity=".55" filter="url(#ct-blur2)"/>
  <path d="M229 205c8-4 19-2 24 6" stroke="#6d2220" stroke-width="2" fill="none" opacity=".4"/>
  <path d="M155 431c22 9 56 12 86 5" stroke="#0b0907" stroke-width="2" fill="none" opacity=".55"/>

  <!-- evidence tag -->
  <path d="M214 300c24 18 37 39 36 63" stroke="#b3a17f" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>
  <g transform="translate(238 358) rotate(7)">
    <rect x="0" y="0" width="61" height="35" fill="#d6c7a7" stroke="#95805d" stroke-width="1"/>
    <circle cx="7" cy="7" r="2.5" fill="none" stroke="#6a5638"/>
    <text x="12" y="16" font-family="'Oswald',sans-serif" font-size="6" letter-spacing="1" fill="#4a3923">EVIDENCE</text>
    <text x="12" y="26" font-family="'Oswald',sans-serif" font-size="6" letter-spacing="1" fill="#4a3923">COAT / 03</text>
  </g>

  <rect width="400" height="500" fill="url(#ct-vig)"/>
</svg>`;
CLOSEUPS.safe = `
<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A close-up of the open wall safe and its combination dial">
  <defs>
    <linearGradient id="sf-wall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#11181b"/><stop offset=".6" stop-color="#080b0c"/><stop offset="1" stop-color="#040505"/>
    </linearGradient>
    <linearGradient id="sf-steel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8a9290"/><stop offset=".18" stop-color="#4f5756"/><stop offset=".55" stop-color="#252c2c"/><stop offset=".82" stop-color="#3e4645"/><stop offset="1" stop-color="#111616"/>
    </linearGradient>
    <linearGradient id="sf-door" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#727b79"/><stop offset=".2" stop-color="#424a49"/><stop offset=".58" stop-color="#1e2424"/><stop offset=".9" stop-color="#424a49"/><stop offset="1" stop-color="#121717"/>
    </linearGradient>
    <radialGradient id="sf-cold" cx=".35" cy=".18" r=".75">
      <stop offset="0" stop-color="#a9d7db" stop-opacity=".2"/><stop offset=".5" stop-color="#4b757c" stop-opacity=".07"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sf-vig" cx=".5" cy=".48" r=".72">
      <stop offset=".36" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".76"/>
    </radialGradient>
    <filter id="sf-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="sf-soft2"><feGaussianBlur stdDeviation="1.8"/></filter>
  </defs>

  <rect width="400" height="500" fill="url(#sf-wall)"/>
  <g stroke="#2a3437" stroke-width=".8" opacity=".16">
    <line x1="0" y1="82" x2="400" y2="82"/><line x1="0" y1="164" x2="400" y2="164"/><line x1="0" y1="246" x2="400" y2="246"/>
    <line x1="0" y1="328" x2="400" y2="328"/><line x1="0" y1="410" x2="400" y2="410"/>
    <line x1="78" y1="0" x2="78" y2="500"/><line x1="156" y1="0" x2="156" y2="500"/><line x1="234" y1="0" x2="234" y2="500"/><line x1="312" y1="0" x2="312" y2="500"/>
  </g>
  <ellipse cx="180" cy="130" rx="230" ry="210" fill="url(#sf-cold)"/>
  <path d="M30 40L150 0 70 500 0 500Z" fill="#b9e2e5" opacity=".025"/>

  <!-- safe body -->
  <rect x="44" y="58" width="316" height="388" rx="7" fill="#000" opacity=".55" filter="url(#sf-blur)"/>
  <rect x="38" y="50" width="324" height="390" rx="6" fill="url(#sf-steel)" stroke="#0a0d0d" stroke-width="2"/>
  <rect x="46" y="58" width="308" height="374" rx="3" fill="none" stroke="#b6c1bd" stroke-opacity=".17" stroke-width="1.2"/>
  <rect x="56" y="68" width="288" height="354" fill="#080b0c"/>
  <rect x="64" y="76" width="272" height="338" fill="#111617" stroke="#5d6866" stroke-opacity=".35" stroke-width="1.2"/>

  <!-- interior -->
  <rect x="72" y="84" width="248" height="322" fill="#0a0d0e"/>
  <g stroke="#323c3b" stroke-width="1.2" opacity=".55">
    <line x1="76" y1="184" x2="318" y2="184"/><line x1="76" y1="288" x2="318" y2="288"/>
    <line x1="76" y1="376" x2="318" y2="376"/>
  </g>
  <g>
    <ellipse cx="172" cy="180" rx="76" ry="5" fill="#000" opacity=".55"/>
    <g transform="translate(108 126)">
      <rect x="0" y="0" width="72" height="52" rx="2" fill="#2e3b33" stroke="#526755" stroke-width="1"/>
      <rect x="7" y="-7" width="58" height="59" rx="2" fill="#314136" stroke="#526755" stroke-width="1"/>
      <g stroke="#90a285" stroke-opacity=".32" stroke-width=".7"><line x1="10" y1="34" x2="61" y2="34"/><line x1="10" y1="41" x2="57" y2="41"/></g>
      <text x="36" y="22" text-anchor="middle" font-family="'Special Elite','Courier New',monospace" font-size="8" fill="#d9cfaf" opacity=".65">MAY 1947</text>
    </g>
    <g transform="translate(198 133) rotate(-3)">
      <rect width="98" height="45" rx="1" fill="#c1af8b" stroke="#736043" stroke-width="1"/>
      <text x="8" y="16" font-family="'Special Elite','Courier New',monospace" font-size="7" letter-spacing="1" fill="#55432c">LEDGER / B</text>
      <g stroke="#6e5a3c" stroke-width=".6" opacity=".6"><line x1="8" y1="26" x2="88" y2="26"/><line x1="8" y1="33" x2="80" y2="33"/><line x1="8" y1="40" x2="87" y2="40"/></g>
      <path d="M0 0v45" stroke="#8f7b57" stroke-width="2" opacity=".5"/>
    </g>
    <g transform="translate(112 236) rotate(2)">
      <rect x="0" y="0" width="120" height="46" rx="2" fill="#16351f" stroke="#3f6e4b" stroke-width="1"/>
      <text x="60" y="26" text-anchor="middle" font-family="'Oswald',sans-serif" font-size="11" letter-spacing="3" fill="#a8c7a7" opacity=".65">BONDS</text>
      <rect x="9" y="9" width="102" height="28" fill="none" stroke="#5b8b65" stroke-opacity=".4"/>
    </g>
    <g transform="translate(240 224)">
      <rect x="0" y="6" width="50" height="30" fill="#293f31" stroke="#54715c" stroke-width="1" transform="rotate(5)"/>
      <rect x="4" y="0" width="50" height="30" fill="#31503b" stroke="#54715c" stroke-width="1"/>
      <text x="29" y="20" text-anchor="middle" font-family="'Special Elite','Courier New',monospace" font-size="7" fill="#b9c6a9" opacity=".55">CASH</text>
    </g>
    <g transform="translate(118 320)">
      <rect x="0" y="0" width="80" height="54" fill="#35271b" stroke="#6d5438" stroke-width="1"/>
      <rect x="6" y="6" width="68" height="42" fill="#16120e"/>
      <ellipse cx="40" cy="27" rx="13" ry="16" fill="#c7b18b" opacity=".22"/>
      <circle cx="40" cy="20" r="7" fill="#b19c78" opacity=".25"/>
      <path d="M31 44c5-10 13-10 18 0" fill="#b19c78" opacity=".22"/>
      <path d="M0 0l4 54" stroke="#8a6a44" stroke-opacity=".4"/>
    </g>
    <g transform="translate(221 315) rotate(-4)">
      <rect width="58" height="58" fill="#37221e" stroke="#755047" stroke-width="1"/>
      <rect x="7" y="7" width="44" height="44" fill="#14100e"/>
      <text x="29" y="33" text-anchor="middle" font-family="'Oswald',sans-serif" font-size="8" letter-spacing="2" fill="#b78f77" opacity=".45">IOU</text>
    </g>
  </g>
  <g fill="#a9d8dd" opacity=".1">
    <circle cx="107" cy="101" r="1"/><circle cx="203" cy="99" r=".8"/><circle cx="301" cy="197" r=".7"/><circle cx="157" cy="249" r=".8"/><circle cx="287" cy="364" r=".7"/>
  </g>

  <!-- door, swung open to the right -->
  <g>
    <path d="M322 64L446 34v430l-124-31Z" fill="#000" opacity=".5" filter="url(#sf-blur)"/>
    <path d="M316 58L440 28v436l-124-34Z" fill="url(#sf-door)" stroke="#0a0d0d" stroke-width="2"/>
    <path d="M326 68L429 43v404l-103-29Z" fill="none" stroke="#bcc7c3" stroke-opacity=".14" stroke-width="1"/>
    <path d="M334 78L419 57v376l-85-25Z" fill="#0d1112" opacity=".28"/>
    <g stroke="#111616" stroke-width="2" fill="none" opacity=".65">
      <path d="M338 103c9 19 6 40-5 58M400 92c-8 34-5 79 3 115M348 308c9 14 8 33-1 49M392 338c-6 16-5 35 2 52"/>
    </g>
    <g fill="#aab8b3" opacity=".16">
      <circle cx="336" cy="86" r="4"/><circle cx="336" cy="417" r="4"/><circle cx="424" cy="60" r="4"/><circle cx="424" cy="448" r="4"/>
    </g>

    <!-- dial -->
    <g transform="translate(373 247)">
      <circle r="55" fill="#141919" stroke="#8a9995" stroke-width="2.5"/>
      <circle r="48" fill="#202626" stroke="#4e5a58" stroke-width="1"/>
      <circle r="39" fill="none" stroke="#bac5c0" stroke-opacity=".18"/>
      <g stroke="#c2cdc8" stroke-width=".9" opacity=".6">
        <line x1="0" y1="-43" x2="0" y2="-36"/><line x1="0" y1="43" x2="0" y2="36"/>
        <line x1="-43" y1="0" x2="-36" y2="0"/><line x1="43" y1="0" x2="36" y2="0"/>
        <line x1="-30" y1="-30" x2="-25" y2="-25"/><line x1="30" y1="-30" x2="25" y2="-25"/>
        <line x1="-30" y1="30" x2="-25" y2="25"/><line x1="30" y1="30" x2="25" y2="25"/>
      </g>
      <g fill="#b7c3be" font-family="'Oswald',sans-serif" font-size="5.5" opacity=".45" text-anchor="middle">
        <text x="0" y="-44">90</text><text x="44" y="2">45</text><text x="0" y="48">10</text><text x="-44" y="2">25</text>
      </g>
      <circle r="20" fill="#252c2c" stroke="#8a9793" stroke-width="2"/>
      <circle r="7" fill="#0b0e0e" stroke="#b6c1bd" stroke-width="1"/>
      <path d="M0-19v5M0 19v-5M-19 0h5M19 0h-5" stroke="#d2dad5" stroke-width="1.2" opacity=".5"/>
      <path d="M3 3L19 24" stroke="#8b9b95" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    </g>
    <!-- handle -->
    <g transform="translate(374 352)">
      <circle r="23" fill="#1c2222" stroke="#8d9a95" stroke-width="1.4"/>
      <path d="M-16 0H16M0-16V16" stroke="#abb8b2" stroke-width="5" stroke-linecap="round" opacity=".48"/>
      <circle r="8" fill="#2f3838" stroke="#b8c3bd" stroke-width="1"/>
    </g>
    <path d="M317 91c14-1 27-4 38-7" stroke="#fff" stroke-opacity=".15" stroke-width="1"/>
  </g>

  <!-- dust and scratches -->
  <g fill="#d5dfd8" opacity=".13">
    <circle cx="73" cy="118" r=".8"/><circle cx="298" cy="156" r=".7"/><circle cx="356" cy="415" r=".8"/><circle cx="236" cy="444" r=".6"/>
  </g>
  <g stroke="#dce6e0" stroke-opacity=".16" stroke-width=".7" fill="none">
    <path d="M58 86c34 2 81 1 119-1M89 416c42 1 80-1 118-4M330 110c10 40 9 87 2 129M406 141c-8 42-6 84 2 125"/>
  </g>
  <path d="M70 405c22 7 49 8 73 2" stroke="#020303" stroke-opacity=".6" stroke-width="3" fill="none"/>
  <ellipse cx="358" cy="442" rx="78" ry="10" fill="#000" opacity=".35" filter="url(#sf-blur)"/>
  <rect width="400" height="500" fill="url(#sf-vig)"/>
</svg>`;
/* ================= STATE + RENDERING ================= */
const state = {
  caseData: null,
  found: new Set(),
  currentObject: null,
  selected: null,
  failure: null,
  screen: 'office',
  busy: false
};
const app = $('#app');

function gunObjectKey() {
  return Object.values(state.caseData.clues).find((c) => c.type === 'gun').object;
}
function hasSmokingGun() {
  return state.found.has(gunObjectKey());
}

function announce(msg) {
  const el = $('#liveRegion');
  if (el) el.textContent = msg;
}

function cameraFlash(strength = 1) {
  const flash = $('#flash');
  flash.style.opacity = '';
  flash.classList.remove('on');
  void flash.offsetWidth;
  flash.style.setProperty('--flash-strength', strength);
  flash.classList.add('on');
}

function setCaseChrome() {
  const c = state.caseData;
  const num = `#${c.id}`;
  const ids = {
    officeCaseNo: num, sceneCaseNo: `CASE ${num}`, boardCaseNo: num,
    accuseCaseNo: num, endCaseNo: `CASE ${num} · 3:12 A.M.`
  };
  Object.entries(ids).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
  $('#officeAddress').textContent = c.location.address;
  $('#millerLine').textContent = `“${c.tip}”`;
  $('#scenePlace').textContent = c.location.name;
  $('#sceneVictim').textContent = `${c.victim.name} · ${c.victim.role}`;
  $('#sceneBrief').textContent = c.location.feel;
  $('#boardVictim').textContent = c.victim.name;
  $('#boardVictimRole').textContent = c.victim.role;
  $('#boardWeapon').textContent = `a ${c.weapon}`;
  $('#accuseVictim').textContent = c.victim.name;
  $('#accuseScene').textContent = c.location.name;
  $('#sceneArt').dataset.place = c.location.place;
}

function renderCase() {
  setCaseChrome();
  $$('.hotspot').forEach((btn) => {
    btn.classList.remove('found');
    btn.querySelector('.tag').textContent = OBJECTS[btn.dataset.object].short;
  });
  $('#clueProgress').textContent = '0 OF 4 CLUES LOGGED';
  renderBoard();
}

function renderSceneState() {
  $$('.hotspot').forEach((btn) => {
    const key = btn.dataset.object;
    const found = state.found.has(key);
    btn.classList.toggle('found', found);
    btn.querySelector('.tag').textContent = found ? `${OBJECTS[key].short} ✓` : OBJECTS[key].short;
    btn.setAttribute('aria-label', `${found ? 'Review' : 'Inspect'} ${OBJECTS[key].name.toLowerCase()}`);
  });
  $('#clueProgress').textContent = `${state.found.size} OF 4 CLUES LOGGED`;
}

function renderZoom() {
  const c = state.caseData;
  const key = state.currentObject || 'desk';
  const obj = OBJECTS[key];
  const clue = c.clues[key];
  $('#zoomCanvas').innerHTML = CLOSEUPS[key];
  $('#zoomArt').dataset.object = key;
  $('#zoomExhibit').textContent = `EXHIBIT ${obj.exhibit} · ${obj.short}`;
  $('#zoomPlate').textContent = `PLATE ${obj.plate}`;
  $('#zoomClueNo').textContent = `CLUE ${OBJECT_ORDER.indexOf(key) + 1} / 04`;
  $('#zoomObject').textContent = obj.short;
  $('#clueText').textContent = clue.text;
  $('#clueSheet').classList.toggle('is-gun', clue.type === 'gun');
  $('#zoomFound').textContent = `${state.found.size} / 4`;
  $('#zoomArt').setAttribute('aria-label', `Close-up of ${obj.name.toLowerCase()}`);
}

function renderBoard() {
  const c = state.caseData;
  if (!c) return;
  $('#boardClueCount').textContent = `${state.found.size} / 4`;
  const tilts = [-0.45, 0.3, -0.18, 0.5];
  const clueHTML = OBJECT_ORDER.map((key, i) => {
    const obj = OBJECTS[key];
    const clue = c.clues[key];
    const found = state.found.has(key);
    if (!found) {
      return `<div class="clue-row locked" style="--i:${i};--tilt:${tilts[i]}deg">
        <span class="num">0${i + 1}</span>
        <div class="clue-body">
          <div class="clue-meta-mini"><b>${obj.short}</b><span>SEALED</span></div>
          <div class="clue-txt">NOT YET LOGGED</div>
        </div>
      </div>`;
    }
    return `<div class="clue-row ${clue.type === 'gun' ? 'is-gun' : ''}" style="--i:${i};--tilt:${tilts[i]}deg">
      <span class="num">0${i + 1}</span>
      <div class="clue-body">
        <div class="clue-meta-mini"><b>${obj.short}</b><span>CLUE 0${i + 1}</span><span class="gun-flag">SMOKING GUN</span></div>
        <div class="clue-txt">${esc(clue.text)}</div>
      </div>
    </div>`;
  }).join('');
  $('#clueList').innerHTML = clueHTML;

  const susHTML = c.suspects.map((s, i) => `
    <div class="suspect-row" style="--i:${i}">
      <div class="mugshot"><svg viewBox="0 0 60 76" aria-hidden="true"><use href="#p-${s.portrait}"></use></svg></div>
      <div class="sus-content">
        <div class="sus-top"><span class="sus-name">${esc(s.name)}</span><span class="sus-role">${esc(s.role)}</span></div>
        <div class="sus-line"><b>MOTIVE</b><span>${esc(s.motive)}</span></div>
        <div class="sus-line"><b>ALIBI</b><span>${esc(s.alibi)}</span></div>
      </div>
    </div>`).join('');
  $('#suspectList').innerHTML = susHTML;
  requestAnimationFrame(drawBoardStrings);
  setTimeout(() => { if (state.screen === 'board') drawBoardStrings(); }, 480);
}

function drawBoardStrings() {
  const svg = $('#boardStrings');
  if (!svg || !state.caseData) return;
  const body = $('.board-body');
  const clueRows = $$('.clue-row');
  const suspectRows = $$('.suspect-row');
  if (!body || !clueRows.length || !suspectRows.length) return;
  const base = body.getBoundingClientRect();
  if (!base.width || !base.height) return;
  svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
  const gunKey = gunObjectKey();
  const redKey = Object.values(state.caseData.clues).find((c) => c.type === 'red').object;
  const alibiKey = Object.values(state.caseData.clues).find((c) => c.type === 'alibi').object;
  const links = [];
  if (state.found.has(gunKey)) links.push({ key: gunKey, suspect: state.caseData.killerIndex, kind: 'gun' });
  if (state.found.has(redKey)) links.push({ key: redKey, suspect: state.caseData.redSuspectIndex, kind: 'red' });
  if (state.found.has(alibiKey)) links.push({ key: alibiKey, suspect: state.caseData.alibiSuspectIndex, kind: 'alibi' });
  let html = '';
  links.forEach(({ key, suspect, kind }) => {
    const clueRow = clueRows[OBJECT_ORDER.indexOf(key)];
    const suspectRow = suspectRows[suspect];
    if (!clueRow || !suspectRow) return;
    const a = clueRow.getBoundingClientRect();
    const b = suspectRow.getBoundingClientRect();
    const sx = a.right - base.left - 12;
    const sy = a.top - base.top + 7;
    const ex = b.left - base.left + 13;
    const ey = b.top - base.top + 11;
    const sag = Math.min(70, Math.abs(ey - sy) * 0.35 + 14);
    const stroke = kind === 'gun' ? '#b4503f' : 'rgba(164,72,57,.78)';
    const width = kind === 'gun' ? 1.9 : 1.25;
    html += `<path d="M${sx} ${sy} C${sx + 38} ${sy + sag}, ${ex - 38} ${ey - sag * 0.4}, ${ex} ${ey}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" opacity="${kind === 'gun' ? '.95' : '.75'}"/>`;
    html += `<circle cx="${sx}" cy="${sy}" r="${kind === 'gun' ? 2.6 : 2}" fill="#7c241f" stroke="#d9cbb1" stroke-width=".7"/>`;
    html += `<circle cx="${ex}" cy="${ey}" r="${kind === 'gun' ? 2.6 : 2}" fill="#7c241f" stroke="#d9cbb1" stroke-width=".7"/>`;
  });
  svg.innerHTML = html;
}

function renderAccuse() {
  const c = state.caseData;
  state.selected = null;
  $('#accuseList').innerHTML = c.suspects.map((s, i) => `
    <button class="accuse-row" type="button" data-index="${i}" style="--i:${i}" aria-pressed="false">
      <div class="mugshot"><svg viewBox="0 0 60 76" aria-hidden="true"><use href="#p-${s.portrait}"></use></svg></div>
      <div class="accuse-info">
        <div class="accuse-top"><span class="accuse-name">${esc(s.name)}</span><span class="accuse-role">${esc(s.role)}</span></div>
        <div class="accuse-lines">
          <div class="accuse-line"><b>MOTIVE</b><span>${esc(s.motive)}</span></div>
          <div class="accuse-line"><b>ALIBI</b><span>${esc(s.alibi)}</span></div>
        </div>
      </div>
      <span class="accuse-pick" aria-hidden="true"></span>
    </button>`).join('');
  const warning = $('#gunWarning');
  if (hasSmokingGun()) {
    warning.classList.add('safe');
    warning.innerHTML = '<span>✓</span> SMOKING GUN IN HAND — MAKE IT STICK.';
  } else {
    warning.classList.remove('safe');
    warning.innerHTML = '<span>!</span> NO SMOKING GUN YET — THIS WILL GO COLD.';
  }
  const btn = $('#btnMakeAccusation');
  btn.disabled = true;
  btn.textContent = 'SELECT A SUSPECT';
}

function selectSuspect(index) {
  state.selected = index;
  $$('.accuse-row').forEach((row) => {
    const on = Number(row.dataset.index) === index;
    row.classList.toggle('selected', on);
    row.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const s = state.caseData.suspects[index];
  const btn = $('#btnMakeAccusation');
  btn.disabled = false;
  btn.textContent = `ACCUSE ${s.name.toUpperCase()}`;
  Sfx.tick();
}

function openConfirm() {
  if (state.selected == null) return;
  const s = state.caseData.suspects[state.selected];
  $('#confirmName').textContent = `${s.name}?`;
  $('#confirmOverlay').classList.add('open');
  $('#btnDoAccuse').focus({ preventScroll: true });
}
function closeConfirm() {
  $('#confirmOverlay').classList.remove('open');
}

function doAccuse() {
  const c = state.caseData;
  if (state.selected == null) return;
  closeConfirm();
  const correct = state.selected === c.killerIndex;
  const gun = hasSmokingGun();
  state.failure = null;
  if (!correct) state.failure = 'wrong';
  else if (!gun) state.failure = 'no-gun';
  const win = correct && gun;
  state.busy = true;
  $('#btnMakeAccusation').disabled = true;
  setTimeout(() => {
    state.busy = false;
    showEnd(win);
  }, 420);
}

function showEnd(win) {
  const c = state.caseData;
  const killer = c.suspects[c.killerIndex];
  const gunClue = c.clues[gunObjectKey()];
  const end = $('#screen-end');
  end.classList.toggle('is-win', win);
  end.classList.toggle('is-loss', !win);
  $('#endStamp').textContent = win ? 'CASE CLOSED' : 'CASE COLD';
  $('#endHeadline').textContent = win ? 'The bracelets clicked.' : 'The killer walked.';
  if (win) {
    $('#endCopy').textContent = `${killer.name} didn't say a word on the ride downtown. The city can sleep—for one night.`;
    $('#endKillerLabel').textContent = 'ARRESTED';
    $('#endWeather').textContent = 'RAIN · CASE CLOSED';
  } else if (state.failure === 'no-gun') {
    $('#endCopy').textContent = `You had the right name and empty hands. ${killer.name} walked before the ink was dry.`;
    $('#endKillerLabel').textContent = 'TRUE KILLER';
    $('#endWeather').textContent = 'RAIN · NO WITNESSES';
  } else {
    $('#endCopy').textContent = `The wrong name bought ${killer.name} a clean getaway. By dawn, the trail was rain.`;
    $('#endKillerLabel').textContent = 'TRUE KILLER';
    $('#endWeather').textContent = 'RAIN · NO WITNESSES';
  }
  $('#endKiller').textContent = killer.name;
  $('#endVictim').textContent = `${c.victim.name} — ${c.victim.role}`;
  $('#endWeapon').textContent = `a ${c.weapon}`;
  $('#endNail').innerHTML = `<b>THE NAIL</b> ${esc(gunClue.text)}`;
  $('#endPortraitUse').setAttribute('href', `#p-${killer.portrait}`);
  $('#vfName').textContent = killer.name;
  $('#vfTag').textContent = win ? 'BOOKING PHOTO' : 'LAST KNOWN';
  $('#vfNote').textContent = win ? 'Homicide · 3:12 A.M.' : 'Whereabouts unknown';
  $('#vfStamp').textContent = win ? 'ARRESTED' : 'AT LARGE';
  $('#verdictFigure').classList.toggle('is-missing', !win);
  announce(win ? `Case closed. ${killer.name} is under arrest.` : `Case cold. The killer was ${killer.name}.`);
  showScreen('end');
  if (win) {
    cameraFlash(1.2);
    Sfx.sting(true);
  } else {
    Sfx.sting(false);
  }
}

/* ================= SCREEN FLOW ================= */
const screenMap = {
  office: 'screen-office', scene: 'screen-scene', zoom: 'screen-zoom',
  board: 'screen-board', accuse: 'screen-accuse', end: 'screen-end'
};

function showScreen(name) {
  state.screen = name;
  app.dataset.scene = name;
  Object.entries(screenMap).forEach(([key, id]) => {
    document.getElementById(id).classList.toggle('is-active', key === name);
  });
  if (name === 'scene') renderSceneState();
  if (name === 'board') { renderBoard(); requestAnimationFrame(drawBoardStrings); }
  if (name === 'accuse') renderAccuse();
  if (name === 'zoom') renderZoom();
  if (name === 'office') Sfx.startRing();
  else Sfx.stopRing();
  window.scrollTo(0, 0);
}

function openObject(key) {
  if (state.busy) return;
  state.currentObject = key;
  const isNew = !state.found.has(key);
  state.found.add(key);
  renderZoom();
  showScreen('zoom');
  if (isNew) {
    cameraFlash(0.7);
    Sfx.clue();
    announce(`Clue logged: ${state.caseData.clues[key].text}`);
  }
}

function goScene() {
  renderSceneState();
  showScreen('scene');
}

function goBoard() {
  renderBoard();
  showScreen('board');
}

function startCase() {
  closeConfirm();
  state.caseData = makeCase();
  state.found = new Set();
  state.currentObject = null;
  state.selected = null;
  state.failure = null;
  state.busy = false;
  renderCase();
  renderSceneState();
  showScreen('office');
  announce(`New case ${state.caseData.id}: ${state.caseData.victim.name} is dead at ${state.caseData.location.address}.`);
}

/* ================= EVENTS ================= */
$$('.hotspot').forEach((btn) => {
  btn.addEventListener('click', () => openObject(btn.dataset.object));
});
$$('[data-open-board]').forEach((btn) => {
  btn.addEventListener('click', goBoard);
});
$('#btnGoScene').addEventListener('click', () => { goScene(); Sfx.tick(); });
$('#btnZoomOut').addEventListener('click', goScene);
$('#btnZoomOutTop').addEventListener('click', goScene);
$('#btnBoardBack').addEventListener('click', goScene);
$('#btnBackScene').addEventListener('click', goScene);
$('#btnAccuse').addEventListener('click', () => { renderAccuse(); showScreen('accuse'); });
$('#btnAccuseBack').addEventListener('click', goBoard);
$('#accuseList').addEventListener('click', (e) => {
  const row = e.target.closest('.accuse-row');
  if (row) selectSuspect(Number(row.dataset.index));
});
$('#btnMakeAccusation').addEventListener('click', openConfirm);
$('#btnCancelAccuse').addEventListener('click', closeConfirm);
$('#btnDoAccuse').addEventListener('click', doAccuse);
$('#confirmOverlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeConfirm(); });
$('#btnNewCase').addEventListener('click', startCase);
$('#soundToggle').addEventListener('click', () => Sfx.toggle());

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if ($('#confirmOverlay').classList.contains('open')) { closeConfirm(); return; }
  if (state.screen === 'zoom') goScene();
  else if (state.screen === 'accuse') goBoard();
  else if (state.screen === 'board') goScene();
});

window.addEventListener('resize', () => { if (state.screen === 'board') drawBoardStrings(); });
/* ================= SOUND (OPTIONAL, USER ENABLED) ================= */
const Sfx = {
  ctx: null, master: null, enabled: false, rainNode: null, rainGain: null, ringTimer: null,
  init() {
    if (this.ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    this.buildRain();
    return true;
  },
  buildRain() {
    const ctx = this.ctx;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const low = ctx.createBiquadFilter();
    low.type = 'lowpass';
    low.frequency.value = 1050;
    low.Q.value = 0.3;
    const high = ctx.createBiquadFilter();
    high.type = 'highpass';
    high.frequency.value = 180;
    const gain = ctx.createGain();
    gain.gain.value = 0.055;
    src.connect(low).connect(high).connect(gain).connect(this.master);
    src.start();
    this.rainNode = src;
    this.rainGain = gain;
  },
  async toggle() {
    if (!this.init()) return;
    if (this.ctx.state === 'suspended') await this.ctx.resume().catch(() => {});
    this.enabled = !this.enabled;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.enabled ? 0.72 : 0, now, 0.12);
    const btn = $('#soundToggle');
    btn.setAttribute('aria-pressed', String(this.enabled));
    btn.innerHTML = `SOUND <b>${this.enabled ? 'ON' : 'OFF'}</b>`;
    if (this.enabled) this.startRing();
    else this.stopRing();
  },
  startRing() {
    if (!this.enabled || !this.ctx || state.screen !== 'office' || this.ringTimer) return;
    this.ringBurst(0);
    this.ringTimer = setInterval(() => {
      if (!this.enabled || state.screen !== 'office') { this.stopRing(); return; }
      this.ringBurst(0);
    }, 3400);
  },
  stopRing() {
    if (this.ringTimer) clearInterval(this.ringTimer);
    this.ringTimer = null;
  },
  ringBurst(delay) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    [420, 480].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.028, t + 0.018);
      gain.gain.setValueAtTime(0.028, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
      osc.connect(gain).connect(this.master);
      osc.start(t);
      osc.stop(t + 0.44);
    });
  },
  tick() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 1400;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.018, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
    osc.connect(gain).connect(this.master);
    osc.start(t); osc.stop(t + 0.04);
  },
  clue() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    [784, 1175].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.032, t + i * 0.08 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 0.34);
      osc.connect(gain).connect(this.master);
      osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.36);
    });
  },
  sting(win) {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const notes = win ? [110, 164.81, 220, 277.18] : [92.5, 98, 138.59];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = win ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(win ? 0.045 : 0.035, t + 0.05 + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + (win ? 1.9 : 2.4));
      osc.connect(gain).connect(this.master);
      osc.start(t); osc.stop(t + 2.5);
    });
  }
};

/* ================= BOOT ================= */
startCase();
document.fonts && document.fonts.ready.then(() => document.documentElement.classList.add('fonts-ready'));

window.__midnight = {
  state,
  makeCase,
  startCase,
  openObject,
  goScene,
  goBoard,
  showScreen,
  showEnd,
  accuseIndex: (i) => { selectSuspect(i); doAccuse(); },
  Sfx
};
