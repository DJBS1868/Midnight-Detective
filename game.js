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
    scene: 'marlowe', plate: ['ROOM', '814'], feel: 'Rain hisses on the fire escape. The suite smells of gin and cold cigar smoke.'
  },
  {
    name: 'The Starlight Lounge', room: 'Rear office', address: 'The Starlight Lounge, rear office',
    scene: 'starlight', plate: ['OFFICE', 'REAR'], feel: 'Velvet walls, a dead neon moon, and a carpet that has seen better nights.'
  },
  {
    name: 'Pier 9', room: "Harbormaster's office", address: "Pier 9, harbormaster's office",
    scene: 'pier9', plate: ['PIER', '9'], feel: 'The river slaps the pilings. Somewhere a foghorn answers.'
  },
  {
    name: 'The Alcazar Arms', room: 'Room 302', address: 'The Alcazar Arms, Room 302',
    scene: 'alcazar', plate: ['ROOM', '302'], feel: 'One bulb burns in the hall. The rest of the floor is a rumor.'
  },
  {
    name: 'The Blue Dahlia Diner', room: 'Booth 3', address: 'The Blue Dahlia Diner, Booth 3',
    scene: 'diner', plate: ['BOOTH', '3'], feel: 'Coffee has gone cold in every cup. The jukebox keeps playing to nobody.'
  },
  {
    name: 'The Orpheum Theatre', room: 'Dressing Room 2', address: 'The Orpheum Theatre, dressing room 2',
    scene: 'orpheum', plate: ['DRESSING', '2'], feel: 'Greasepaint and dust. A single bulb burns over the mirror.'
  },
  {
    name: 'Halcyon Warehouse', room: 'Bay 7', address: 'Halcyon Warehouse, Bay 7',
    scene: 'warehouse', plate: ['BAY', '7'], feel: 'The loading door hangs half-open. Rain ticks on a thousand crates.'
  },
  {
    name: 'The Midnight Limited', room: 'Sleeper Car 4', address: 'The Midnight Limited, sleeper car 4',
    scene: 'train', plate: ['CAR', '4'], feel: 'The train sways at a dead stop. Outside, the platform lights drown in rain.'
  },
  {
    name: 'Radio KNOX', room: 'Studio B', address: 'Radio KNOX, Studio B',
    scene: 'radio', plate: ['STUDIO', 'B'], feel: 'A dead microphone hums. The ON AIR sign still burns red.'
  },
  {
    name: 'The Golden Calf Pawnshop', room: 'Shop 12', address: 'The Golden Calf Pawnshop, Shop 12',
    scene: 'pawnshop', plate: ['SHOP', '12'], feel: "Every shelf holds somebody else's luck. The counter glass is fogged with prints."
  },
  {
    name: 'The Sable Boathouse', room: 'Slip 3', address: 'The Sable Boathouse, Slip 3',
    scene: 'boathouse', plate: ['SLIP', '3'], feel: 'Black water licks the pilings. A loose rope knocks against the dock.'
  },
  {
    name: 'The Vieux Carré', room: 'Casino Room 6', address: 'The Vieux Carré, casino room 6',
    scene: 'casino', plate: ['ROOM', '6'], feel: 'Brass glitters under cigarette smoke. The wheel has stopped on a losing number.'
  },
  {
    name: 'The Chapel of St. Jude', room: 'Vestry', address: 'The Chapel of St. Jude, vestry',
    scene: 'chapel', plate: ['VESTRY', 'ST. JUDE'], feel: 'Candle smoke and old stone. Somewhere a door creaks on its hinges.'
  },
  {
    name: 'Ninth Street Garage', room: 'Unit 5', address: 'Ninth Street Garage, Unit 5',
    scene: 'garage', plate: ['UNIT', '5'], feel: 'Oil, cold iron, and rain through a broken pane. A radio plays next door.'
  },
  {
    name: 'The Cactus Flower Greenhouse', room: 'House 2', address: 'The Cactus Flower Greenhouse, House 2',
    scene: 'greenhouse', plate: ['HOUSE', '2'], feel: 'Wet leaves and warm earth. The glass roof ticks under the rain.'
  },
  {
    name: 'Fairview Mortuary', room: 'Room 4', address: 'Fairview Mortuary, Room 4',
    scene: 'mortuary', plate: ['ROOM', '4'], feel: 'Lysol cannot cover the smell of cold steel. The drains are still wet.'
  },
  {
    name: 'The Commodore Suite', room: 'Suite 1802', address: 'The Commodore Suite, Suite 1802',
    scene: 'commodore', plate: ['SUITE', '1802'], feel: 'The city glitters forty floors below. The ice in the bucket has not melted.'
  },
  {
    name: 'Rialto Alley', room: 'Alley 7', address: 'Rialto Alley, Alley 7',
    scene: 'rialto', plate: ['ALLEY', '7'], feel: 'A neon sign bleeds pink across the wet bricks. The rain never lands clean.'
  },
  {
    name: 'The Hall of Antiquities', room: 'Gallery 3', address: 'The Hall of Antiquities, Gallery 3',
    scene: 'gallery', plate: ['GALLERY', '3'], feel: 'Marble, dust, and the hush of things too old to touch. A rope barrier hangs loose.'
  },
  {
    name: 'The Blue Note Barbershop', room: 'Chair 2', address: 'The Blue Note Barbershop, Chair 2',
    scene: 'barbershop', plate: ['CHAIR', '2'], feel: 'Shaving soap and bay rum. The pole outside turns without a sound.'
  },
  {
    name: 'The Steam Laundry', room: 'Basement', address: 'The Steam Laundry, basement',
    scene: 'laundry', plate: ['BASEMENT', 'STEAM'], feel: 'Steam clings to the ceiling. A drum turns somewhere in the dark.'
  },
  {
    name: 'The Ironworks Gym', room: 'Back room', address: 'The Ironworks Gym, back room',
    scene: 'gym', plate: ['IRONWORKS', 'GYM'], feel: 'Sweat, liniment, and chalk dust. A heavy bag hangs perfectly still.'
  },
  {
    name: 'The Carnegie Library', room: 'Wing 2', address: 'The Carnegie Library, Wing 2',
    scene: 'library', plate: ['WING', '2'], feel: 'Dust floats in the reading lamps. Every book seems to be listening.'
  },
  {
    name: 'The Palace Cinema', room: 'Projection Booth', address: 'The Palace Cinema, projection booth',
    scene: 'cinema', plate: ['PROJECTION', 'BOOTH'], feel: 'Celluloid and hot dust. The projector is still running on an empty reel.'
  }
];

let previousLocation = null;

const TIPS = [
  "Body's at {address}. Door was locked from the inside.",
  "Sorry to wake you. {victim} is dead at {address}. Rain's washing the scene clean.",
  'Get down to {address}, detective. Coroner puts time of death at 1:45.',
  'Body at {address}. Your kind of weather—and your kind of mess.'
];

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const stationOf = (loc, key) => getStationMeta(loc, key);

const GUN_OPENERS = {
  desk: '{place}: {trace}.',
  window: '{place}: {trace}.',
  coat: '{place}: {trace}.',
  safe: '{place}: {trace}.'
};

const GUN_CLOSERS = [
  'Only {killer} leaves that signature.',
  "That's {killer}'s calling card.",
  'It belongs to {killer}, and nobody else.',
  'Only {killer} could have left it.'
];

const WEAPON_LINES = {
  desk: 'The {weapon} lies {place}, wiped clean. The killer knew where it was kept.',
  window: 'The {weapon} rests {place}, wiped clean. Whoever came that way came prepared.',
  coat: 'The {weapon} is rolled up {place}, wiped clean. This was planned, not passion.',
  safe: 'The {weapon} is stashed {place}, wiped clean. The killer knew the combination.'
};

const ALIBI_LINES = {
  desk: 'A betting slip found {place} puts {name} here at 1:35. That is not the story {name} told.',
  window: 'A cab receipt {place} is timed 1:35 and made out to {name}. The alibi does not hold.',
  coat: "A pawn ticket {place} is stamped 1:35 and carries {name}'s initials. The alibi does not hold.",
  safe: 'A betting slip {place} is stamped 1:35—the exact minute {name} claims to have been elsewhere.'
};

function makeCase() {
  const options = previousLocation ? LOCATIONS.filter((l) => l.name !== previousLocation) : LOCATIONS;
  const location = pick(options);
  previousLocation = location.name;
  const placeFor = (key) => stationOf(location, key).place;
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
    text: GUN_OPENERS[gunObject]
      .replaceAll('{place}', cap(placeFor(gunObject)))
      .replace('{trace}', killer.trace) + ' ' + gunCloser
  };

  const redObject = shuffledObjects[1];
  clues[redObject] = {
    object: redObject,
    type: 'red',
    text: `${cap(placeFor(redObject))}: ${redSuspect.trace}. It carries ${redSuspect.name}'s signature—maybe too neatly.`
  };

  const weaponObject = shuffledObjects[2];
  clues[weaponObject] = {
    object: weaponObject,
    type: 'weapon',
    text: WEAPON_LINES[weaponObject]
      .replaceAll('{place}', placeFor(weaponObject))
      .replace('{weapon}', weapon)
  };

  const alibiObject = shuffledObjects[3];
  clues[alibiObject] = {
    object: alibiObject,
    type: 'alibi',
    text: ALIBI_LINES[alibiObject]
      .replaceAll('{place}', placeFor(alibiObject))
      .replaceAll('{name}', alibiSuspect.name)
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
/* ================= STATE + RENDERING ================= */
const state = {
  caseData: null,
  found: new Set(),
  currentObject: null,
  selected: null,
  failure: null,
  screen: 'office',
  busy: false,
  call: { answered: false, index: 0, done: false, lines: [] }
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
  $('#scenePlace').textContent = c.location.name;
  $('#sceneVictim').textContent = `${c.victim.name} · ${c.victim.role}`;
  $('#sceneBrief').textContent = c.location.feel;
  $('#boardVictim').textContent = c.victim.name;
  $('#boardVictimRole').textContent = c.victim.role;
  $('#boardWeapon').textContent = `a ${c.weapon}`;
  $('#accuseVictim').textContent = c.victim.name;
  $('#accuseScene').textContent = c.location.name;
}

function renderCase() {
  const c = state.caseData;
  setCaseChrome();
  $('#sceneCanvas').innerHTML = renderScene(c.location);
  $$('.hotspot').forEach((btn) => {
    const key = btn.dataset.object;
    const pt = getStationPoint(c.location, key);
    const meta = stationOf(c.location, key);
    btn.style.left = `${pt.x}%`;
    btn.style.top = `${pt.y}%`;
    btn.dataset.side = pt.y > 56 ? 'top' : 'bottom';
    btn.querySelector('.tag').textContent = meta.label;
    btn.setAttribute('aria-label', `Inspect ${meta.name}`);
  });
  $('#clueProgress').textContent = '0 OF 4 CLUES LOGGED';
  renderSceneState();
  renderBoard();
}

function renderSceneState() {
  const c = state.caseData;
  $$('.hotspot').forEach((btn) => {
    const key = btn.dataset.object;
    const found = state.found.has(key);
    const meta = stationOf(c.location, key);
    btn.classList.toggle('found', found);
    btn.querySelector('.tag').textContent = found ? `${meta.label} ✓` : meta.label;
    btn.setAttribute('aria-label', `${found ? 'Review' : 'Inspect'} ${meta.name}`);
  });
  $('#clueProgress').textContent = `${state.found.size} OF 4 CLUES LOGGED`;
}

function renderZoom() {
  const c = state.caseData;
  const key = state.currentObject || 'desk';
  const obj = OBJECTS[key];
  const meta = stationOf(c.location, key);
  const clue = c.clues[key];

  // Fill the copy first: a longer clue grows the sheet and shortens the
  // camera bay, so the crop must be measured against the final layout.
  $('#zoomArt').dataset.object = key;
  $('#zoomExhibit').textContent = `EXHIBIT ${obj.exhibit} · ${meta.label}`;
  $('#zoomPlate').textContent = `PLATE ${obj.plate}`;
  $('#zoomClueNo').textContent = `CLUE ${OBJECT_ORDER.indexOf(key) + 1} / 04`;
  $('#zoomObject').textContent = meta.label;
  $('#clueText').textContent = clue.text;
  $('#clueSheet').classList.toggle('is-gun', clue.type === 'gun');
  $('#zoomFound').textContent = `${state.found.size} / 4`;
  $('#zoomArt').setAttribute('aria-label', `Close-up of ${meta.name}`);

  const bay = $('#zoomCanvas').getBoundingClientRect();
  const stage = $('#sceneCanvas').getBoundingClientRect();
  const ratio = bay.width > 0 && bay.height > 0 ? bay.width / bay.height : 0.62;
  const closeup = renderCloseup(c.location, key, ratio);
  $('#zoomCanvas').innerHTML = closeup.svg;
  const zoom = stage.width > 0
    ? (bay.width / closeup.frame.w) / (stage.width / 400)
    : 400 / closeup.frame.w;
  const mag = Math.max(1.2, Math.min(19, zoom));
  state.zoomMeta = {
    ...closeup,
    ratio,
    zoom: mag,
    stageWidth: stage.width,
    bayWidth: bay.width,
    bayHeight: bay.height
  };
  $('#zoomMag').textContent = `MAGNIFIED · ${mag >= 10 ? Math.round(mag) : mag.toFixed(1)}X`;
}

function renderBoard() {
  const c = state.caseData;
  if (!c) return;
  $('#boardClueCount').textContent = `${state.found.size} / 4`;
  const tilts = [-0.45, 0.3, -0.18, 0.5];
  const clueHTML = OBJECT_ORDER.map((key, i) => {
    const obj = OBJECTS[key];
    const meta = stationOf(c.location, key);
    const clue = c.clues[key];
    const found = state.found.has(key);
    if (!found) {
      return `<div class="clue-row locked" style="--i:${i};--tilt:${tilts[i]}deg">
        <span class="num">0${i + 1}</span>
        <div class="clue-body">
          <div class="clue-meta-mini"><b>${meta.label}</b><span>SEALED</span></div>
          <div class="clue-txt">NOT YET LOGGED</div>
        </div>
      </div>`;
    }
    return `<div class="clue-row ${clue.type === 'gun' ? 'is-gun' : ''}" style="--i:${i};--tilt:${tilts[i]}deg">
      <span class="num">0${i + 1}</span>
      <div class="clue-body">
        <div class="clue-meta-mini"><b>${meta.label}</b><span>CLUE 0${i + 1}</span><span class="gun-flag">SMOKING GUN</span></div>
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

let roomInTimer = 0;

function replayRoomIn() {
  const art = $('#sceneArt');
  art.classList.remove('room-enter');
  void art.offsetWidth;
  art.classList.add('room-enter');
  clearTimeout(roomInTimer);
  roomInTimer = setTimeout(() => art.classList.remove('room-enter'), 900);
}

function showScreen(name, opts = {}) {
  if (name !== 'zoom' && !opts.keepTransit) cancelZoomTransit();
  state.screen = name;
  app.dataset.scene = name;
  Object.entries(screenMap).forEach(([key, id]) => {
    document.getElementById(id).classList.toggle('is-active', key === name);
  });
  if (name === 'scene') {
    renderSceneState();
    if (!opts.skipRoomIn) replayRoomIn();
  }
  if (name === 'board') { renderBoard(); requestAnimationFrame(drawBoardStrings); }
  if (name === 'accuse') renderAccuse();
  if (name === 'zoom') renderZoom();
  if (name === 'office') Sfx.startRing();
  else Sfx.stopRing();
  window.scrollTo(0, 0);
}

let zoomTransit = null;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function cancelZoomTransit() {
  if (!zoomTransit) return;
  const { timer, cleanup, mode } = zoomTransit;
  if (timer) clearTimeout(timer);
  if (cleanup) clearTimeout(cleanup);
  zoomTransit = null;
  const transit = $('#zoomTransit');
  const frame = $('#zoomTransitFrame');
  transit.classList.remove('is-on');
  frame.getAnimations().forEach((a) => a.cancel());
  $('.zoom-transit-veil')?.getAnimations().forEach((a) => a.cancel());
  frame.innerHTML = '';
  frame.style.transform = '';
  frame.style.transformOrigin = '';
  frame.style.left = '';
  frame.style.top = '';
  frame.style.width = '';
  frame.style.height = '';
  frame.style.opacity = '';
  $('.zoom-transit-veil').style.opacity = '0';
  $('#screen-zoom').classList.remove('is-transit');
  if (mode === 'out') {
    const zoomScreen = $('#screen-zoom');
    zoomScreen.getAnimations().forEach((a) => a.cancel());
    zoomScreen.classList.remove('is-leaving');
    $('#screen-scene').classList.remove('is-instant');
    if (state.screen === 'zoom') $('#screen-scene').classList.remove('is-active');
  }
}

function beginZoomIn(key, snapshot) {
  const meta = state.zoomMeta;
  if (!meta || !snapshot || prefersReducedMotion() || !snapshot.box.width) {
    $('#screen-zoom').classList.remove('is-transit');
    return;
  }
  const device = $('.device').getBoundingClientRect();
  const bay = $('#zoomCanvas').getBoundingClientRect();
  if (!bay.width || !bay.height) {
    $('#screen-zoom').classList.remove('is-transit');
    return;
  }

  const transit = $('#zoomTransit');
  const frame = $('#zoomTransitFrame');
  const veil = $('.zoom-transit-veil');
  const left = snapshot.box.left - device.left;
  const top = snapshot.box.top - device.top;
  frame.innerHTML = snapshot.room;
  frame.style.left = `${left}px`;
  frame.style.top = `${top}px`;
  frame.style.width = `${snapshot.box.width}px`;
  frame.style.height = `${snapshot.box.height}px`;

  // Land on the exact station rect the close-up camera uses. Measuring the
  // same object on both copies absorbs SVG slice rounding, so the last
  // frame of the push-in and the still close-up are the same picture.
  const frameBox = frame.getBoundingClientRect();
  const roomStation = frame.querySelector(`[data-station="${key}"]`);
  const bayStation = $('#zoomCanvas').querySelector(`[data-station="${key}"]`);
  const roomRect = roomStation?.getBoundingClientRect();
  const bayRect = bayStation?.getBoundingClientRect();
  let originX;
  let originY;
  let scale;
  let tx;
  let ty;

  if (roomRect && bayRect && roomRect.width > 1 && bayRect.width > 1) {
    originX = roomRect.left - frameBox.left + roomRect.width / 2;
    originY = roomRect.top - frameBox.top + roomRect.height / 2;
    scale = bayRect.width / roomRect.width;
    tx = (bayRect.left - device.left + bayRect.width / 2) - (left + originX);
    ty = (bayRect.top - device.top + bayRect.height / 2) - (top + originY);
  } else {
    const roomW = frame.clientWidth || snapshot.box.width;
    originX = (meta.frame.cx / 400) * roomW;
    originY = (meta.frame.cy / 500) * frame.clientHeight;
    scale = Math.max(1.2, (bay.width / meta.frame.w) / (roomW / 400));
    tx = (bay.left - device.left + bay.width / 2) - (left + originX);
    ty = (bay.top - device.top + bay.height / 2) - (top + originY);
  }

  frame.style.transformOrigin = `${originX}px ${originY}px`;
  frame.style.transform = 'translate(0px, 0px) scale(1)';
  transit.classList.add('is-on');
  veil.style.opacity = '0';

  const token = Symbol('zoom');
  zoomTransit = { token, timer: 0, cleanup: 0, mode: 'in' };
  const ease = 'cubic-bezier(.3,.16,.12,1)';
  frame.animate([
    { transform: 'translate(0px, 0px) scale(1)' },
    { transform: `translate(${tx}px, ${ty}px) scale(${scale})` }
  ], { duration: 700, easing: ease, fill: 'forwards' });
  veil.animate([
    { opacity: 0 },
    { opacity: 0.32, offset: 0.55 },
    { opacity: 0.55 }
  ], { duration: 700, easing: 'ease-in', fill: 'forwards' });

  const finish = () => {
    if (!zoomTransit || zoomTransit.token !== token) return;
    $('#screen-zoom').classList.remove('is-transit');
    frame.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: 'ease-out', fill: 'forwards' });
    veil.animate([{ opacity: 0.55 }, { opacity: 0 }], { duration: 280, easing: 'ease-out', fill: 'forwards' });
    zoomTransit.cleanup = setTimeout(() => {
      if (!zoomTransit || zoomTransit.token !== token) return;
      transit.classList.remove('is-on');
      frame.getAnimations().forEach((a) => a.cancel());
      frame.innerHTML = '';
      frame.style.transform = '';
      frame.style.transformOrigin = '';
      frame.style.left = '';
      frame.style.top = '';
      frame.style.width = '';
      frame.style.height = '';
      frame.style.opacity = '';
      veil.getAnimations().forEach((a) => a.cancel());
      veil.style.opacity = '0';
      zoomTransit = null;
      cameraFlash(0.45);
    }, 270);
  };
  zoomTransit.timer = setTimeout(finish, 700);
}

/* Reverse the camera: the same room copy pulls back out of the object and
   settles over the live scene, which is then revealed underneath. */
function beginZoomOut() {
  const key = state.currentObject;
  const meta = state.zoomMeta;
  if (!key || !meta || prefersReducedMotion()) return false;
  if (zoomTransit) {
    if (zoomTransit.mode === 'out') return true;
    cancelZoomTransit();
  }

  // A finished push-in leaves fill-forwards animations on the shared frame.
  // Clear them before measuring, or the clone is read at the old zoom level.
  const staleFrame = $('#zoomTransitFrame');
  const staleVeil = $('.zoom-transit-veil');
  staleFrame.getAnimations().forEach((a) => a.cancel());
  staleVeil.getAnimations().forEach((a) => a.cancel());
  staleFrame.style.opacity = '';
  staleVeil.style.opacity = '0';

  // Let the scene exist behind the close-up so its real layout can be
  // measured at the current viewport, without playing its entry animation.
  const sceneScreen = $('#screen-scene');
  sceneScreen.classList.add('is-instant', 'is-active');

  const bay = $('#zoomCanvas').getBoundingClientRect();
  const stage = $('#sceneCanvas').getBoundingClientRect();
  if (!bay.width || !bay.height || !stage.width || !stage.height) {
    if (state.screen === 'zoom') sceneScreen.classList.remove('is-active', 'is-instant');
    return false;
  }

  const device = $('.device').getBoundingClientRect();
  const transit = $('#zoomTransit');
  const frame = $('#zoomTransitFrame');
  const veil = $('.zoom-transit-veil');
  const zoomScreen = $('#screen-zoom');
  zoomScreen.classList.add('is-leaving');
  zoomScreen.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: 200, easing: 'ease-out', fill: 'forwards' });
  const left = stage.left - device.left;
  const top = stage.top - device.top;
  frame.innerHTML = $('#sceneCanvas').innerHTML;
  frame.style.left = `${left}px`;
  frame.style.top = `${top}px`;
  frame.style.width = `${stage.width}px`;
  frame.style.height = `${stage.height}px`;

  const frameBox = frame.getBoundingClientRect();
  const roomStation = frame.querySelector(`[data-station="${key}"]`);
  const bayStation = $('#zoomCanvas').querySelector(`[data-station="${key}"]`);
  const roomRect = roomStation?.getBoundingClientRect();
  const bayRect = bayStation?.getBoundingClientRect();
  let originX;
  let originY;
  let scale;
  let tx;
  let ty;

  if (roomRect && bayRect && roomRect.width > 1 && bayRect.width > 1) {
    originX = roomRect.left - frameBox.left + roomRect.width / 2;
    originY = roomRect.top - frameBox.top + roomRect.height / 2;
    scale = bayRect.width / roomRect.width;
    tx = (bayRect.left - device.left + bayRect.width / 2) - (left + originX);
    ty = (bayRect.top - device.top + bayRect.height / 2) - (top + originY);
  } else {
    const roomW = frame.clientWidth || stage.width;
    originX = (meta.frame.cx / 400) * roomW;
    originY = (meta.frame.cy / 500) * frame.clientHeight;
    scale = Math.max(1.2, (bay.width / meta.frame.w) / (roomW / 400));
    tx = (bay.left - device.left + bay.width / 2) - (left + originX);
    ty = (bay.top - device.top + bay.height / 2) - (top + originY);
  }

  const startTransform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  frame.style.transformOrigin = `${originX}px ${originY}px`;
  frame.style.transform = startTransform;
  frame.style.opacity = '0';
  veil.style.opacity = '0';
  transit.classList.add('is-on');

  const token = Symbol('zoom-out');
  zoomTransit = { token, timer: 0, cleanup: 0, mode: 'out' };
  const total = 800;
  frame.animate([
    { transform: startTransform, offset: 0 },
    { transform: startTransform, offset: 0.24 },
    { transform: 'translate(0px, 0px) scale(1)', offset: 1 }
  ], { duration: total, easing: 'cubic-bezier(.3,.16,.12,1)', fill: 'forwards' });
  frame.animate([
    { opacity: 0, offset: 0 },
    { opacity: 1, offset: 0.24 },
    { opacity: 1, offset: 1 }
  ], { duration: total, easing: 'ease-out', fill: 'forwards' });
  veil.animate([
    { opacity: 0, offset: 0 },
    { opacity: 0.42, offset: 0.12 },
    { opacity: 0.42, offset: 0.5 },
    { opacity: 0, offset: 1 }
  ], { duration: total, easing: 'ease-in-out', fill: 'forwards' });

  const finish = () => {
    if (!zoomTransit || zoomTransit.token !== token) return;
    // The room copy is back at full size. Swap in the live scene while the
    // overlay still covers it, then dissolve the copy away.
    showScreen('scene', { keepTransit: true, skipRoomIn: true });
    frame.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
    zoomTransit.cleanup = setTimeout(() => {
      if (!zoomTransit || zoomTransit.token !== token) return;
      transit.classList.remove('is-on');
      frame.getAnimations().forEach((a) => a.cancel());
      frame.innerHTML = '';
      frame.style.transform = '';
      frame.style.transformOrigin = '';
      frame.style.left = '';
      frame.style.top = '';
      frame.style.width = '';
      frame.style.height = '';
      frame.style.opacity = '';
      veil.style.opacity = '0';
      sceneScreen.classList.remove('is-instant');
      zoomScreen.getAnimations().forEach((a) => a.cancel());
      zoomScreen.classList.remove('is-leaving');
      zoomTransit = null;
    }, 240);
  };
  zoomTransit.timer = setTimeout(finish, total);
  return true;
}

function openObject(key) {
  if (state.busy || (zoomTransit && zoomTransit.mode === 'out')) return;
  state.currentObject = key;
  const isNew = !state.found.has(key);
  state.found.add(key);
  const snapshot = {
    room: $('#sceneCanvas').innerHTML,
    box: $('#sceneCanvas').getBoundingClientRect()
  };
  const zoomScreen = $('#screen-zoom');
  if (zoomScreen.classList.contains('is-leaving')) {
    zoomScreen.getAnimations().forEach((a) => a.cancel());
    zoomScreen.classList.remove('is-leaving');
  }
  zoomScreen.classList.add('is-transit');
  showScreen('zoom');
  beginZoomIn(key, snapshot);
  if (isNew) {
    Sfx.clue();
    announce(`Clue logged: ${state.caseData.clues[key].text}`);
  }
}

function goScene() {
  if (state.screen === 'zoom' && beginZoomOut()) return;
  renderSceneState();
  showScreen('scene');
}

function goBoard() {
  renderBoard();
  showScreen('board');
}

function buildCallLines(c) {
  return [
    'That you, detective? Miller, Third Precinct. You picked up on the fourth ring.',
    c.tip,
    "Coroner's already on his way. Get here before the uniforms ruin my scene."
  ];
}

function resetCall() {
  state.call = { answered: false, index: 0, done: false, lines: buildCallLines(state.caseData) };
  const office = $('#screen-office');
  office.classList.remove('is-answered', 'call-done');
  office.classList.add('is-ringing');
  $('#callStatus').textContent = 'INCOMING';
  $('#callStep').textContent = '';
  $('#callLine').textContent = '';
  $('#btnCallNext').hidden = true;
  $('#btnSceneLabel').textContent = 'ANSWER THE PHONE';
  $('#btnGoScene').disabled = true;
  $('#phoneZone').setAttribute('aria-label', 'Answer the ringing telephone');
  $('#phoneHint').textContent = 'TAP TO ANSWER';
  $('#officeKicker').textContent = '2:00 A.M. · THE CALL';
  $('#officeClock').textContent = '02:00';
  $('#officeSub').textContent = 'The phone has been screaming for a minute. You pick up on the fourth ring.';
}

function renderCallLine() {
  const call = state.call;
  const line = call.lines[call.index];
  const lineEl = $('#callLine');
  lineEl.textContent = line;
  lineEl.classList.remove('line-in');
  void lineEl.offsetWidth;
  lineEl.classList.add('line-in');
  $('#callStep').textContent = `LINE ${call.index + 1} / ${call.lines.length}`;
  const next = $('#btnCallNext');
  next.hidden = false;
  next.innerHTML = call.index === call.lines.length - 1
    ? 'TAKE THE ADDRESS <span>→</span>'
    : 'NEXT <span>→</span>';
}

function answerPhone() {
  if (state.call.answered) return;
  state.call.answered = true;
  const office = $('#screen-office');
  office.classList.remove('is-ringing');
  office.classList.add('is-answered');
  Sfx.stopRing();
  Sfx.pickup();
  $('#callStatus').textContent = 'CONNECTED';
  $('#officeKicker').textContent = '2:02 A.M. · LINE 3';
  $('#officeClock').textContent = '02:02';
  $('#officeSub').textContent = 'Miller sounds like he has been awake for a week.';
  $('#phoneZone').setAttribute('aria-label', 'Telephone connected. Tap to continue the call.');
  $('#btnSceneLabel').textContent = 'FINISH THE CALL';
  renderCallLine();
  announce('Sgt. Miller: ' + state.call.lines[0]);
}

function finishCall() {
  state.call.done = true;
  const office = $('#screen-office');
  office.classList.add('call-done');
  $('#callStatus').textContent = 'LINE SECURED';
  $('#btnCallNext').hidden = true;
  $('#btnGoScene').disabled = false;
  $('#btnSceneLabel').textContent = 'HEAD TO THE CRIME SCENE';
  $('#phoneZone').setAttribute('aria-label', 'Telephone hung up');
  $('#officeKicker').textContent = '2:05 A.M. · THE ADDRESS';
  $('#officeClock').textContent = '02:05';
  $('#officeSub').textContent = 'The line goes dead. The rain is already waiting outside.';
  Sfx.tick();
  announce(`Miller gave the address: ${state.caseData.location.address}. Head to the crime scene.`);
}

function advanceCall() {
  if (!state.call.answered || state.call.done) return;
  if (state.call.index < state.call.lines.length - 1) {
    state.call.index += 1;
    renderCallLine();
    announce('Sgt. Miller: ' + state.call.lines[state.call.index]);
    Sfx.tick();
    return;
  }
  finishCall();
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
  resetCall();
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
$('#phoneZone').addEventListener('click', () => {
  if (!state.call.answered) answerPhone();
  else if (!state.call.done) advanceCall();
});
$('#btnCallNext').addEventListener('click', advanceCall);
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
    if (!this.enabled || !this.ctx || state.screen !== 'office' || state.call.answered || this.ringTimer) return;
    this.ringBurst(0);
    this.ringTimer = setInterval(() => {
      if (!this.enabled || state.screen !== 'office' || state.call.answered) { this.stopRing(); return; }
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
    const bell = ctx.createGain();
    bell.gain.setValueAtTime(0.0001, t);
    bell.gain.exponentialRampToValueAtTime(0.055, t + 0.035);
    bell.gain.setValueAtTime(0.052, t + 0.66);
    bell.gain.exponentialRampToValueAtTime(0.0001, t + 1.06);
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 1450;
    band.Q.value = 0.7;
    bell.connect(band).connect(this.master);
    [[1046, 0.62, 'triangle'], [1470, 0.27, 'sine'], [2190, 0.11, 'sine']].forEach(([freq, amp, type]) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq * 1.007, t);
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.34);
      const partial = ctx.createGain();
      partial.gain.value = amp;
      osc.connect(partial).connect(bell);
      osc.start(t);
      osc.stop(t + 1.08);
    });
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 19;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.014;
    lfo.connect(lfoDepth).connect(bell.gain);
    lfo.start(t);
    lfo.stop(t + 1.07);
    const clickBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.07), ctx.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    for (let i = 0; i < clickData.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * (1 - i / clickData.length);
    }
    const click = ctx.createBufferSource();
    click.buffer = clickBuffer;
    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = 'bandpass';
    clickFilter.frequency.value = 2400;
    clickFilter.Q.value = 1.1;
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.014, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.065);
    click.connect(clickFilter).connect(clickGain).connect(this.master);
    click.start(t);
    click.stop(t + 0.08);
  },
  pickup() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const thunk = ctx.createOscillator();
    thunk.type = 'triangle';
    thunk.frequency.setValueAtTime(190, t);
    thunk.frequency.exponentialRampToValueAtTime(92, t + 0.11);
    const thunkGain = ctx.createGain();
    thunkGain.gain.setValueAtTime(0.0001, t);
    thunkGain.gain.linearRampToValueAtTime(0.03, t + 0.008);
    thunkGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    thunk.connect(thunkGain).connect(this.master);
    thunk.start(t);
    thunk.stop(t + 0.17);
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.24), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.55;
    const staticSrc = ctx.createBufferSource();
    staticSrc.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1250;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.012, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    staticSrc.connect(filter).connect(gain).connect(this.master);
    staticSrc.start(t + 0.02);
    staticSrc.stop(t + 0.25);
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
  answerPhone,
  advanceCall,
  accuseIndex: (i) => { selectSuspect(i); doAccuse(); },
  Sfx
};
