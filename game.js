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

const pad2 = (n) => String(n).padStart(2, '0');
const exhibitLetter = (i) => String.fromCharCode(65 + i);

const SUSPECT_POOL = [
  { name: 'Vera Lane', portrait: 'cloche', trace: 'a trace of gardenia perfume', desc: "5'5\" · slight · black bob · gardenia perfume" },
  { name: 'Miles Calloway', portrait: 'fedora', trace: 'a black pearl cufflink', desc: "6'0\" · broad · grey temples · a crooked nose" },
  { name: 'Iris Voss', portrait: 'veil', trace: 'a red lipstick smudge', desc: "5'7\" · willowy · red hair · beauty mark at the lip" },
  { name: 'Sonny Delacroix', portrait: 'fedora', trace: 'a half-smoked Gauloise', desc: "5'11\" · lean · slicked hair · cut knuckle" },
  { name: 'Ruthie Kane', portrait: 'cloche', trace: 'a scarlet silk thread', desc: "5'4\" · compact · copper curls · chipped tooth" },
  { name: 'Elliot Graves', portrait: 'bald', trace: 'silver polish from a tipped cane', desc: "6'1\" · heavy · bald crown · silver tooth" },
  { name: 'Lana Moreau', portrait: 'veil', trace: 'green dust from a jade ring', desc: "5'8\" · narrow · dark wave · jade ring" },
  { name: 'Frankie Sabini', portrait: 'rough', trace: 'lighter fluid from a brass lighter', desc: "5'9\" · thick-necked · black hair · burn scar" },
  { name: 'Vivian Cross', portrait: 'cloche', trace: 'a scratch from a diamond tie pin', desc: "5'6\" · tailored · dark hair · diamond tie pin" },
  { name: 'Walter Pike', portrait: 'bald', trace: 'a cracked watch crystal', desc: "5'10\" · paunchy · balding · cracked watch" },
  { name: 'Clara Boone', portrait: 'cloche', trace: 'a scrap of crocodile leather', desc: "5'5\" · straight-backed · ash hair · crocodile valise" },
  { name: 'Desmond Shaw', portrait: 'fedora', trace: 'a smear of bay rum cologne', desc: "6'0\" · spare · salt-and-pepper · bay rum cologne" }
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

const GUN_OPENERS = '{place}: {trace}.';

const GUN_CLOSERS = [
  'Only {killer} leaves that signature.',
  "That's {killer}'s calling card.",
  'It belongs to {killer}, and nobody else.',
  'Only {killer} could have left it.'
];

const WEAPON_LINES = {
  surface: 'The {weapon} was wiped clean. A trace {place} and fresh dust say it was moved tonight. The killer knew where it was kept.',
  opening: 'The {weapon} was wiped clean. A trace {place} says it came through this way. Whoever did it came prepared.',
  garment: 'The {weapon} was wiped clean. A trace {place} says it was carried close. This was planned, not passion.',
  container: 'The {weapon} was wiped clean. A trace {place} says it was stashed here. The killer knew where it was kept.',
  trinket: 'The {weapon} was wiped clean. A trace {place} says it was set down here. No panic in that.'
};

const ALIBI_LINES = {
  surface: 'A betting slip found {place} puts {name} here at 1:35. That is not the story {name} told.',
  opening: 'A cab receipt caught {place} is timed 1:35 and made out to {name}. The alibi does not hold.',
  garment: "A pawn ticket caught {place} is stamped 1:35 and carries {name}'s initials. The alibi does not hold.",
  container: 'A betting slip found {place} is stamped 1:35—the exact minute {name} claims to have been elsewhere.',
  trinket: "A betting slip tucked at {object} is stamped 1:35; a corner caught {place} carries {name}'s print. {name} claims to have been elsewhere."
};

const NOTE_LINES = [
  '{place}: a dead match and a ring of dust. Nobody troubled to stage it.',
  '{place}: the glass is dry. Whoever drank here left before the rain.',
  '{place}: a torn ticket stub, rain-soaked and blank on both sides.',
  '{place}: clean. Gloved hands, or a careful one.',
  '{place}: nothing but ash and a faint smell of gardenia.',
  '{place}: the dust is disturbed, then smoothed again. Somebody thought about it.',
  '{place}: a hairline scratch in the finish. Recent, but it tells you nothing.',
  '{place}: the ashtray has been emptied in a hurry.',
  '{place}: a matchbook from the Starlight. Half the city carries one.',
  '{place}: cold metal and no prints. The rain got here first.',
  '{place}: a folded bill with no message. A bribe, or a tip.',
  '{place}: the room keeps its secrets. This one is just furniture.'
];

/* ---------- close-up search ---------- */

/* False leads and household debris. Every object gets one real clue and
   three or four of these, drawn fresh for each case. They never change
   the solution; they only make the room feel lived in. */
const SEARCH_FLAVOR = {
  surface: [
    'A dead match and a ring of dust. Nobody troubled to stage this.',
    'Clean. Gloved hands, or a careful one.',
    'A grocery list in an unfamiliar hand. Eggs, cigarettes, nothing else.',
    'A bent paperclip, two buttons, and a tram ticket punched at midnight.',
    'The finish is scratched fresh. Something heavy was moved in a hurry.',
    'A cold cigar stub, hours old and the wrong brand for this room.',
    'A smear of face powder. The wrong shade for the victim.',
    'An old pawn ticket for a wedding ring. Sentimental, not useful.',
    'Dust, lint, and one black thread. The city is made of them.',
    'A racing form folded to yesterday\'s losers. Nobody won here tonight.',
    'A ring of dried liquor. Whoever drank here did not finish it.',
    'A telephone number pencilled on a scrap, no name attached. Dead end.'
  ],
  opening: [
    'The catch is oiled. Somebody wanted this to open quietly.',
    'A thread caught on the edge, black wool. Half the city owns a black coat.',
    'Rain grit, already dry. The weather has been shut out a while.',
    'A child\'s marble, wedged where it fell years ago.',
    'A smudge of grease, wiped on the outside only.',
    'A strip of paint peeled back. Old, not forced.',
    'A matchbook wedged in the gap. Blank inside.',
    'Cold air off the glass. Nothing but the weather.',
    'A hook of cheap brass, bent out of shape. It could have been the wind.',
    'A flyer for a missing dog, curled and damp. The city loses everything.'
  ],
  garment: [
    'The lining is torn and mended with black thread. Old damage.',
    'A bus transfer, stamped two days ago.',
    'A button missing. The thread is still clean.',
    'Cigarette ash in the fold, cold and grey.',
    'A laundry mark, half rubbed out. No name left.',
    'The cloth smells of cheap pomade and rain.',
    'A pin, the kind a tailor leaves behind.',
    'A peppermint and lint. Nothing with a name on it.',
    'A loose thread, snagged at shoulder height.',
    'The cloth is damp through one patch and dry everywhere else.',
    'A dented cigarette case. Empty, and not the victim\'s brand.'
  ],
  container: [
    'A roll of singles, counted twice and short by five. Petty cash, not a payoff.',
    'A clean patch in the grime. Something was taken out recently.',
    'Fresh tool marks around the fitting. Somebody knew the mechanism.',
    'Old receipts, a rubber band, and a key that fits nothing in this room.',
    'The mechanism turns easily. Whoever owns this place trusts the wrong people.',
    'A hotel sewing kit and a spare button. Nothing with a name on it.',
    'The metal is oiled. It does not squeak.',
    'A blank envelope, sealed and empty.',
    'A bottle cap, a pencil stub, and a face-down photograph. The photograph is gone.',
    'Scuff marks below, where something heavy was dragged out.',
    'A petty-cash book with the last page torn out. The carbon is blank.'
  ],
  trinket: [
    'A fingerprint, too smudged to lift.',
    'Nothing but dust and a thin scratch.',
    'Wiped clean. Even the maker\'s mark is gone.',
    'A dark, short hair caught on it. Useless without a match.',
    'It smells faintly of tobacco and rain.',
    'The edge is chipped. Older than tonight.',
    'A film of powder. The wrong shade for the victim.',
    'Nothing but city grime.',
    'A dust ring around it. It was moved recently.',
    'A price sticker, cheap and not from here.'
  ]
};

/* What the player feels before the sheet writes it down. The clue is
   revealed as a physical token in the macro view; this line only hints
   that something is there. */
const REVEAL_LINES = [
  '{place}: something hidden, deliberately out of sight.',
  '{place}: your fingers catch an edge. It does not belong to the room.',
  '{place}: a shape in the dust, tucked where nobody would look.'
];

/* The object reacts to the search. The macro art is one station group,
   so these are broad physical beats rather than true part animation. */
function probeActionFor(label) {
  const s = String(label || '').toUpperCase();
  if (/(DRAWER|TRAY|TILL|POCKET|LINING|SLEEVE|CUFF|HEM|HOOD|COLLAR|SHELF|PAGE)/.test(s)) return 'open';
  if (/(TABLETOP|BAR TOP|COUNTER|BENCH|FELT|GLASS|PANE|MIRROR|LABEL|LENS|CHART|FACE|BACK|RIM|EDGE)/.test(s)) return 'wipe';
  if (/(CORD|STRAP|STRING|RAIL|THRESHOLD|STEP|TRANSOM|SLAT|BARS|DOOR)/.test(s)) return 'pull';
  if (/(DIAL|LOCK|HINGE|LATCH|HANDLE|KNOB|CLASP|STRIKER|PRIMER|CHAIN|RING|FOB|TEETH|SPINE)/.test(s)) return 'turn';
  return 'lift';
}

const PROBE_CLASSES = ['probe-open', 'probe-lift', 'probe-turn', 'probe-pull', 'probe-wipe'];

/* One small silhouette per clue family, so the thing taken out of the
   drawer reads as paper, brass, steel or a ticket before the text does. */
const FIND_ICONS = {
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v3h3M9 10h6M9 13h6M9 16h3"/></svg>',
  gun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="8" y="4" width="6" height="12" rx="1.2"/><path d="M10 16h8l-1.4 3H10z"/><path d="M9 7h4"/></svg>',
  weapon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 19l11.5-13 4.5 3.6L9.5 21z"/><path d="M14 5l4.5 3.6"/></svg>',
  alibi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 7h16v10H4z"/><path d="M9 7v10M15 7v10"/><path d="M11 10h.01M13 10h.01M11 13h.01M13 13h.01"/></svg>',
  red: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M9 11V7l3-3 3 3v4"/><rect x="8" y="11" width="8" height="9" rx="1"/><path d="M8 14h8"/></svg>'
};

function revealLineFor(plan, meta) {
  const spot = plan?.spots?.[plan.clueSpot];
  if (!spot) return 'Something is hidden here, deliberately out of sight.';
  return pick(REVEAL_LINES).replaceAll('{place}', cap(spotPhrase(spot.label, meta)));
}

/* Natural hiding-place phrases for every search spot. The clue prose is
   built from the spot the clue actually hides in, so a line never says
   "in the drawer" while the player found it under the hatband. */
const SPOT_PLACE_PHRASES = {
  TABLETOP: 'on the tabletop', DRAWER: 'in the drawer', UNDERSIDE: 'under {object}',
  'LETTER TRAY': 'in the letter tray', 'BAR TOP': 'on the bar top', RAIL: 'under the rail',
  'SPILL TRAY': 'in the spill tray', 'UNDER THE BAR': 'under the bar', CHART: 'under the chart',
  RULER: 'under the ruler', BOOTH: 'in the booth', NAPKINS: 'under the napkins',
  MIRROR: 'behind the mirror', 'POWDER TRAY': 'in the powder tray', BENCH: 'on the bench',
  VISE: 'under the vise', 'TOOL DRAWER': 'in the tool drawer', LAMP: 'under the lamp',
  'CONSOLE TOP': 'on the console top', DIAL: 'behind the dial', COUNTER: 'on the counter',
  TILL: 'in the till', SHELF: 'on the shelf', FELT: 'under the felt',
  'CHIP TRAY': 'in the chip tray', 'ALTAR CLOTH': 'under the altar cloth',
  CANDLE: 'under the candle', POTS: 'among the pots', EDGE: 'along the edge',
  TABLE: 'under the table', 'BOOK REST': 'under the book rest', 'CRATE TOP': 'on the crate top',
  SLATS: 'between the slats', STENCIL: 'under the stencil', HINGE: 'by the hinge',
  LEG: 'under the leg', BASIN: 'in the basin', PITCHER: 'under the pitcher',
  REELS: 'behind the reels', SILL: 'on the windowsill', PANE: 'on the pane',
  GLASS: 'on the glass', CURTAIN: 'behind the curtain', LATCH: 'on the latch',
  'NEON TUBE': 'behind the neon tube', CORD: 'along the cord',
  'FIRE ESCAPE': 'on the fire escape', 'DOOR HANDLE': 'on the door handle',
  STEP: 'on the step', TRANSOM: 'in the transom', 'KICK PLATE': 'under the kick plate',
  RIM: 'along the rim', BARS: 'between the bars', ARCH: 'under the arch',
  LEAD: 'along the lead', SHADE: 'behind the shade', FRAME: 'on the frame',
  DISPLAY: 'in the display', HANDLE: 'under the handle', PEEPHOLE: 'through the peephole',
  THRESHOLD: 'under the threshold', KNOB: 'behind the knob', LOCK: 'behind the lock',
  POCKET: 'in the pocket', LINING: 'in the lining', COLLAR: 'under the collar',
  SLEEVE: 'in the sleeve', CUFF: 'in the cuff', HEM: 'in the hem', TAG: 'under the tag',
  HOOD: 'in the hood', STRINGS: 'under the apron strings', EMBROIDERY: 'under the embroidery',
  'BREAST POCKET': 'in the breast pocket', BADGE: 'under the badge', DOOR: 'behind the door',
  LID: 'under the lid', TRAY: 'in the tray', BASE: 'beneath {object}', VENT: 'behind the vent',
  SLOT: 'in the slot', COVER: 'under the cover', LABEL: 'under the label',
  LEDGER: 'in the ledger', HANDSET: 'under the handset', BOWL: 'in the bowl',
  LIP: 'at the rim of the glass', FACE: 'on the watch face', BACK: 'on the back',
  CHAIN: 'on the watch chain', PAGES: 'between the pages', SPINE: 'along the spine',
  RING: 'on the keyring', FOB: 'under the key fob',
  TEETH: 'among the keys', CAP: 'under the cap', TUBE: 'inside the tube',
  PRIMER: 'against the primer', STRIKER: 'on the striker', FOLD: 'in the fold', MARGIN: 'on the margin',
  INSIDE: 'inside {object}', BAND: 'under the hatband', CROWN: 'inside the crown',
  BRIM: 'under the brim', LENS: 'on the lens', STRAP: 'under the strap',
  CANOPY: 'in the umbrella folds', FERRULE: 'at the umbrella tip', FRINGE: 'in the fringe',
  FINGERS: 'between the glove fingers', PALM: 'in the palm', CLASP: 'by the clasp',
  BENEATH: 'beneath {object}', TOP: 'on top of {object}'
};

function spotPhrase(label, meta) {
  const phrase = SPOT_PLACE_PHRASES[label] || `near ${meta.name}`;
  return phrase.replaceAll('{object}', meta.name);
}

function searchSpotSet(loc, key) {
  const spec = SCENES[loc.scene] || {};
  const st = spec.stations?.[key];
  const meta = stationOf(loc, key);
  const type = st?.t || key;
  const kind = meta.kind || 'trinket';
  const points = SEARCH_SPOT_POINTS[kind] || SEARCH_SPOT_POINTS.surface;
  const labels = SEARCH_SPOT_LABELS[type] || SEARCH_SPOT_FALLBACK[kind] || SEARCH_SPOT_FALLBACK.surface;
  const count = Math.min(labels.length, points.length);
  return { kind, labels: labels.slice(0, count), points: points.slice(0, count) };
}

/* One plan per object per case: the clue hides in a random spot and
   every other spot gets its own random piece of debris. Because the
   plan lives on the case, stepping out to the board and back never
   reshuffles a room the player has already searched. */
function buildSearchPlan(loc, key) {
  const { kind, labels, points } = searchSpotSet(loc, key);
  const meta = stationOf(loc, key);
  const pool = SEARCH_FLAVOR[kind] || SEARCH_FLAVOR.surface;
  const clueSpot = rnd(labels.length);
  const flavors = take(pool, labels.length - 1);
  let flavorAt = 0;
  const spots = labels.map((label, i) => ({
    label,
    u: points[i].u,
    v: points[i].v,
    side: points[i].side,
    text: i === clueSpot
      ? null
      : `${cap(spotPhrase(label, meta))}: ${flavors[flavorAt++]}`
  }));
  return { clueSpot, spots, revealed: false, revealLine: '' };
}

function getSearchPlan(key) {
  const c = state.caseData;
  if (!c) return null;
  if (!c.searches) c.searches = {};
  if (!c.searches[key]) c.searches[key] = buildSearchPlan(c.location, key);
  return c.searches[key];
}

function searchedSpots(key) {
  if (!state.searched.has(key)) state.searched.set(key, new Set());
  return state.searched.get(key);
}

/* ---------- object count + loose evidence ---------- */

const OBJECT_COUNTS = [3, 4, 5, 6, 7, 8];
const objectCountHistory = new Map(); // scene name -> { used:Set<number>, last:number }

function chooseObjectCount(sceneName) {
  const prev = objectCountHistory.get(sceneName) || { used: new Set(), last: null };
  let options = OBJECT_COUNTS.filter((n) => !prev.used.has(n));
  if (!options.length) {
    // A full cycle has been played. Start over, still avoiding the count
    // that was on screen immediately before.
    prev.used.clear();
    options = OBJECT_COUNTS.filter((n) => n !== prev.last);
  }
  const count = pick(options);
  prev.used.add(count);
  prev.last = count;
  objectCountHistory.set(sceneName, prev);
  return count;
}

const EXTRA_SLOTS = [
  { anchor: 'desk', dx: -56, dy: -14, s: 0.7 },
  { anchor: 'desk', dx: 56, dy: 10, s: 0.7 },
  { anchor: 'window', dx: 18, dy: 52, s: 0.66 },
  { anchor: 'coat', dx: 44, dy: 46, s: 0.68 },
  { anchor: 'safe', dx: -52, dy: 26, s: 0.68 }
];

const sceneExtraCache = new Map();

const hashSeed = (seed) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

function shuffledWithSeed(arr, seed) {
  let h = hashSeed(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const coreStation = (stations, key) => stations[key] || { x: 200, y: 280 };

/* Each location gets five possible loose objects spread across the desk,
   the sill, the coat and the safe. They are added to the scene's station
   table once, so close-ups and camera moves can find them by key. */
function ensureSceneExtras(loc) {
  if (sceneExtraCache.has(loc.scene)) return sceneExtraCache.get(loc.scene);
  const scene = SCENES[loc.scene] || {};
  const stations = scene.stations || (scene.stations = {});
  const types = shuffledWithSeed(EXTRA_ITEM_POOL, loc.scene).slice(0, EXTRA_SLOTS.length);
  const extras = [];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  EXTRA_SLOTS.forEach((slot, i) => {
    const anchor = coreStation(stations, slot.anchor);
    // Keep loose evidence and its label inside the room. If the preferred
    // side of the anchor would run off the edge, flip it to the other side.
    let x = anchor.x + slot.dx;
    if (x < 32 || x > 368) x = anchor.x - Math.sign(slot.dx || 1) * Math.abs(slot.dx);
    const st = {
      t: types[i],
      x: clamp(x, 32, 368),
      y: clamp(anchor.y + slot.dy, 38, 460),
      s: slot.s,
      r: i % 2 ? -2.5 : 2
    };
    stations[types[i]] = st;
    extras.push({ key: types[i], ...st });
  });
  sceneExtraCache.set(loc.scene, extras);
  return extras;
}

function sceneObjectPool(loc) {
  ensureSceneExtras(loc);
  const stations = SCENES[loc.scene]?.stations || {};
  return Object.entries(stations).map(([key, st]) => ({
    key,
    t: st.t,
    x: st.x,
    y: st.y,
    s: st.s,
    r: st.r
  }));
}

/* ---------- clue assembly ---------- */

function buildClues(location, objects, ctx, searches) {
  const { victim, weapon, killer, redSuspect, alibiSuspect } = ctx;
  const count = objects.length;
  const specials = count >= 4
    ? ['gun', 'red', 'weapon', 'alibi']
    : ['gun', ...take(['red', 'weapon', 'alibi'], count - 1)];
  const noteFill = Array.from({ length: Math.max(0, count - specials.length) }, () => 'note');
  const types = shuffle(specials.concat(noteFill));
  const order = shuffle(objects.map((_, i) => i));
  const notes = shuffle(NOTE_LINES.slice());
  let noteAt = 0;
  const clues = {};

  order.forEach((objIndex, slot) => {
    const obj = objects[objIndex];
    const meta = stationOf(location, obj.key);
    const kind = meta.kind || 'surface';
    const plan = searches?.[obj.key];
    const hidden = plan?.spots?.[plan.clueSpot];
    const place = hidden ? spotPhrase(hidden.label, meta) : meta.place;
    const type = types[slot];
    if (type === 'gun') {
      const closer = pick(GUN_CLOSERS).replaceAll('{killer}', killer.name);
      clues[obj.key] = {
        object: obj.key,
        type,
        text: `${GUN_OPENERS.replaceAll('{place}', cap(place)).replace('{trace}', killer.trace)} ${closer}`
      };
    } else if (type === 'red') {
      clues[obj.key] = {
        object: obj.key,
        type,
        text: `${cap(place)}: ${redSuspect.trace}. It carries ${redSuspect.name}'s signature—maybe too neatly.`
      };
    } else if (type === 'weapon') {
      clues[obj.key] = {
        object: obj.key,
        type,
        text: (WEAPON_LINES[kind] || WEAPON_LINES.surface)
          .replaceAll('{place}', place)
          .replace('{weapon}', weapon)
      };
    } else if (type === 'alibi') {
      clues[obj.key] = {
        object: obj.key,
        type,
        text: (ALIBI_LINES[kind] || ALIBI_LINES.surface)
          .replaceAll('{place}', place)
          .replaceAll('{object}', meta.name)
          .replaceAll('{name}', alibiSuspect.name)
      };
    } else {
      clues[obj.key] = {
        object: obj.key,
        type: 'note',
        text: (notes[noteAt++ % notes.length] || NOTE_LINES[0]).replaceAll('{place}', cap(place))
      };
    }
  });
  return clues;
}

function makeCase() {
  const options = previousLocation ? LOCATIONS.filter((l) => l.name !== previousLocation) : LOCATIONS;
  const location = pick(options);
  previousLocation = location.name;
  ensureSceneExtras(location);
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

  const pool = sceneObjectPool(location);
  const count = chooseObjectCount(location.scene);
  const objects = take(pool, count).map((o, index) => ({ ...o, index }));
  const searches = {};
  objects.forEach((o) => { searches[o.key] = buildSearchPlan(location, o.key); });
  const clues = buildClues(location, objects, { victim, weapon, killer, redSuspect, alibiSuspect }, searches);

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
    objects,
    searches,
    clues,
    tip,
    openedAt: Date.now()
  };
}
/* ================= STATE + RENDERING ================= */
const state = {
  caseData: null,
  found: new Set(),
  searched: new Map(),
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
  fitSceneTitle();
}

// Long venue names ("The Cactus Flower Greenhouse") would otherwise be
// ellipsized in the scene header. Shrink just that heading until the full
// Miller address is readable; everything else keeps its normal scale.
function fitSceneTitle() {
  const el = $('#scenePlace');
  if (!el) return;
  el.style.fontSize = '';
  const avail = el.clientWidth;
  const needed = el.scrollWidth;
  if (!avail || needed <= avail + 1) return;
  const base = parseFloat(getComputedStyle(el).fontSize) || 18;
  const size = Math.max(13, Math.floor(base * (avail / needed) * 0.96 * 10) / 10);
  el.style.fontSize = `${size}px`;
}

function renderCase() {
  const c = state.caseData;
  setCaseChrome();
  $('#sceneCanvas').innerHTML = renderScene(c.location, c.objects);
  const art = $('#sceneArt');
  art.querySelectorAll('.hotspot').forEach((n) => n.remove());
  c.objects.forEach((o) => {
    const key = o.key;
    const pt = getStationPoint(c.location, key);
    const meta = stationOf(c.location, key);
    const btn = document.createElement('button');
    btn.className = 'hotspot';
    btn.type = 'button';
    btn.dataset.object = key;
    btn.dataset.side = pt.y > 56 ? 'top' : 'bottom';
    btn.style.left = `${pt.x}%`;
    btn.style.top = `${pt.y}%`;
    btn.setAttribute('aria-label', `Inspect ${meta.name}`);
    btn.innerHTML = '<span class="ring"></span><span class="dot"></span><span class="tag"></span>';
    btn.querySelector('.tag').textContent = meta.label;
    btn.addEventListener('click', () => openObject(key));
    art.appendChild(btn);
  });
  $('#clueProgress').textContent = `0 OF ${c.objects.length} DETAILS LOGGED`;
  renderSceneState();
  renderBoard();
}

/* Place each detail label where it does not cover another label or leave
   the room. Tries below, above, left and right, then picks the cheapest
   spot, so a busy eight-detail scene stays readable on a 320px screen. */
function layoutHotspotTags() {
  const art = $('#sceneArt');
  if (!art) return;
  const btns = $$('#sceneArt .hotspot');
  if (!btns.length) return;
  const bounds = art.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  art.classList.add('is-laying-out');
  const dots = btns.map((b) => b.getBoundingClientRect());
  // Only the visible marker matters, not the full 46px tap target. Tags
  // commonly sit just inside a neighbouring button without covering it.
  const dotCores = dots.map((d) => ({
    left: d.left + d.width / 2 - 15,
    right: d.left + d.width / 2 + 15,
    top: d.top + d.height / 2 - 15,
    bottom: d.top + d.height / 2 + 15
  }));
  const placed = [];
  const overlapArea = (a, b) => {
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return w > 0 && h > 0 ? w * h : 0;
  };
  const candidates = [
    ['bottom', '', ''],
    ['top', '', ''],
    ['left', 'left', ''],
    ['right', 'right', ''],
    ['left', 'left', 'up'],
    ['right', 'right', 'up'],
    ['left', 'left', 'down'],
    ['right', 'right', 'down']
  ];
  btns.forEach((btn, i) => {
    let best = null;
    for (const [side, align, vshift] of candidates) {
      btn.dataset.side = side;
      if (align) btn.dataset.align = align;
      else delete btn.dataset.align;
      if (vshift) btn.dataset.vshift = vshift;
      else delete btn.dataset.vshift;
      const tag = btn.querySelector('.tag').getBoundingClientRect();
      let score = 0;
      if (tag.left < bounds.left + 2) score += (bounds.left + 2 - tag.left) * 60;
      if (tag.right > bounds.right - 2) score += (tag.right - bounds.right + 2) * 60;
      if (tag.top < bounds.top + 2) score += (bounds.top + 2 - tag.top) * 60;
      if (tag.bottom > bounds.bottom - 2) score += (tag.bottom - bounds.bottom + 2) * 60;
      placed.forEach((r) => { score += overlapArea(tag, r) * 4; });
      dots.forEach((d, j) => { if (j !== i) score += overlapArea(tag, dotCores[j]) * 8; });
      if (!best || score < best.score) best = { score, side, align, vshift };
    }
    btn.dataset.side = best.side;
    if (best.align) btn.dataset.align = best.align;
    else delete btn.dataset.align;
    if (best.vshift) btn.dataset.vshift = best.vshift;
    else delete btn.dataset.vshift;
    placed.push(btn.querySelector('.tag').getBoundingClientRect());
  });
  art.classList.remove('is-laying-out');
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
  $('#clueProgress').textContent = `${state.found.size} OF ${c.objects.length} DETAILS LOGGED`;
}

function renderZoom() {
  const c = state.caseData;
  const key = state.currentObject || c.objects[0].key;
  const idx = Math.max(0, c.objects.findIndex((o) => o.key === key));
  const meta = stationOf(c.location, key);
  const clue = c.clues[key];
  const plan = getSearchPlan(key);
  const searched = searchedSpots(key);
  const found = state.found.has(key);
  const revealed = !found && !!plan.revealed;
  if (revealed && !plan.revealLine) plan.revealLine = revealLineFor(plan, meta);

  // Fill the copy first: the sheet grows with the text and shortens the
  // camera bay, so the crop must be measured against the final layout.
  $('#zoomArt').dataset.object = key;
  $('#zoomExhibit').textContent = `EXHIBIT ${exhibitLetter(idx)} · ${meta.label}`;
  $('#zoomPlate').textContent = `PLATE ${pad2(idx + 1)}`;
  $('#zoomClueNo').textContent = `DETAIL ${pad2(idx + 1)} / ${pad2(c.objects.length)}`;
  $('#zoomObject').textContent = meta.label;
  $('#clueText').textContent = found
    ? clue.text
    : revealed
      ? plan.revealLine
      : `Work ${meta.name}. ${plan.spots.length} marked spots — tap one to search.`;
  $('#clueSheet').classList.toggle('is-gun', found && clue.type === 'gun');
  $('#clueSheet').classList.toggle('is-searching', !found && !revealed);
  $('#clueSheet').classList.toggle('is-revealed', revealed);
  const status = $('#zoomStatus');
  status.classList.toggle('ok', found);
  status.classList.toggle('find', revealed);
  status.textContent = found
    ? '✓ LOGGED TO EVIDENCE BOARD'
    : revealed
      ? 'CLUE FOUND · TAP TO TAKE'
      : (searched.size
        ? `${searched.size}/${plan.spots.length} SPOTS · CLUE STILL HIDDEN`
        : `TAP A GLINT · ${plan.spots.length} SPOTS TO SEARCH`);
  $('#zoomFound').textContent = `${state.found.size} / ${c.objects.length}`;
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
  renderSearchSpots(key, plan, closeup.frame);
  renderFindToken(key, plan, closeup.frame);
}

/* Overlay the search points on the macro view. The close-up SVG uses a
   viewBox crop with xMidYMid slice, so the same crop math the camera
   uses also places the buttons exactly over the object. */
/* Map a normalized search point through the same crop the close-up SVG
   uses, so pips, findings and labels stay locked to the object. */
function spotPixel(plan, index, frame, layerBox, bayBox) {
  const spot = plan.spots[index];
  if (!spot) return null;
  const scale = Math.max(bayBox.width / frame.w, bayBox.height / frame.h);
  const offsetX = bayBox.left - layerBox.left + (bayBox.width - frame.w * scale) / 2;
  const offsetY = bayBox.top - layerBox.top + (bayBox.height - frame.h * scale) / 2;
  const px = frame.box.x + spot.u * frame.box.w;
  const py = frame.box.y + spot.v * frame.box.h;
  return { x: offsetX + (px - frame.x) * scale, y: offsetY + (py - frame.y) * scale };
}

function placeSearchSpots(plan, frame) {
  const layer = $('#zoomSpots');
  if (!layer) return;
  const layerBox = layer.getBoundingClientRect();
  const bayBox = $('#zoomCanvas').getBoundingClientRect();
  if (!layerBox.width || !layerBox.height || !bayBox.width || !bayBox.height) return;
  $$('.search-spot', layer).forEach((btn, i) => {
    const pos = spotPixel(plan, i, frame, layerBox, bayBox);
    if (!pos) return;
    btn.style.left = `${clamp(pos.x, 23, layerBox.width - 23)}px`;
    btn.style.top = `${clamp(pos.y, 23, layerBox.height - 23)}px`;
  });
  requestAnimationFrame(() => requestAnimationFrame(layoutSearchSpots));
}

/* The physical clue token sits over the spot that hid it. It is the
   only thing that writes to the board; searching alone never does. */
function renderFindToken(key, plan, frame) {
  const layer = $('#zoomFinds');
  if (!layer) return;
  layer.innerHTML = '';
  if (!plan?.revealed || state.found.has(key)) return;
  const spot = plan.spots[plan.clueSpot];
  if (!spot) return;
  const meta = stationOf(state.caseData.location, key);
  const clue = state.caseData.clues[key];
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'clue-find';
  btn.dataset.spot = String(plan.clueSpot);
  btn.innerHTML = `<span class="find-halo"></span><span class="find-card">${FIND_ICONS[clue.type] || FIND_ICONS.note}</span><span class="find-tag">TAKE</span>`;
  btn.setAttribute('aria-label', `Take the clue hidden ${spotPhrase(spot.label, meta)}`);
  btn.addEventListener('click', () => collectClue(key));
  layer.appendChild(btn);
  placeFindToken(plan, frame);
}

function placeFindToken(plan, frame) {
  const layer = $('#zoomFinds');
  const token = layer && $('.clue-find', layer);
  if (!token) return;
  const layerBox = layer.getBoundingClientRect();
  const bayBox = $('#zoomCanvas').getBoundingClientRect();
  if (!layerBox.width || !layerBox.height || !bayBox.width || !bayBox.height) return;
  const pos = spotPixel(plan, plan.clueSpot, frame, layerBox, bayBox);
  if (!pos) return;
  const x = clamp(pos.x, 33, layerBox.width - 33);
  const y = clamp(pos.y, 31, layerBox.height - 31);
  token.style.left = `${x}px`;
  token.style.top = `${y}px`;
  token.dataset.tag = y > layerBox.height - 44 ? 'top' : 'bottom';
}

function renderSearchSpots(key, plan, frame) {
  const layer = $('#zoomSpots');
  if (!layer) return;
  layer.innerHTML = '';
  const searched = searchedSpots(key);
  const found = state.found.has(key);
  const meta = stationOf(state.caseData.location, key);
  plan.spots.forEach((spot, i) => {
    const done = searched.has(i);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'search-spot';
    btn.dataset.spot = String(i);
    btn.dataset.side = spot.side || 'bottom';
    if (done) btn.dataset.searched = 'true';
    if (found && i === plan.clueSpot) btn.classList.add('is-clue');
    if (!found && plan.revealed && i === plan.clueSpot) btn.classList.add('has-find');
    btn.innerHTML = `<span class="glint"></span><span class="spot-tag">${spot.label}</span>`;
    btn.setAttribute(
      'aria-label',
      `${done ? 'Review' : 'Search'} ${spot.label.toLowerCase()} on ${meta.name}`
    );
    layer.appendChild(btn);
  });
  placeSearchSpots(plan, frame);
  placeFindToken(plan, frame);
}

/* Choose a side for every spot label. The pips stay where the object
   geometry puts them; only the little labels move, so eight-detail
   scenes and tiny 320px bays both stay readable. */
function layoutSearchSpots() {
  const layer = $('#zoomSpots');
  if (!layer || state.screen !== 'zoom') return;
  const btns = $$('.search-spot', layer);
  if (!btns.length) return;
  const bounds = layer.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  layer.classList.add('is-laying-out');
  const pips = btns.map((b) => b.getBoundingClientRect());
  const placed = [];
  const overlap = (a, b) => {
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return w > 0 && h > 0 ? w * h : 0;
  };
  const sides = ['bottom', 'top', 'right', 'left'];
  btns.forEach((btn, i) => {
    const preferred = btn.dataset.side;
    const order = [preferred, ...sides.filter((s) => s !== preferred)];
    let best = null;
    for (const side of order) {
      btn.dataset.side = side;
      const tag = btn.querySelector('.spot-tag').getBoundingClientRect();
      let score = sides.indexOf(side) * 2;
      if (tag.left < bounds.left + 2) score += (bounds.left + 2 - tag.left) * 80;
      if (tag.right > bounds.right - 2) score += (tag.right - bounds.right + 2) * 80;
      if (tag.top < bounds.top + 2) score += (bounds.top + 2 - tag.top) * 80;
      if (tag.bottom > bounds.bottom - 2) score += (tag.bottom - bounds.bottom + 2) * 80;
      placed.forEach((r) => { score += overlap(tag, r) * 7; });
      pips.forEach((d, j) => { if (j !== i) score += overlap(tag, d) * 2; });
      if (!best || score < best.score) best = { score, side };
    }
    btn.dataset.side = best.side;
    placed.push(btn.querySelector('.spot-tag').getBoundingClientRect());
  });
  layer.classList.remove('is-laying-out');
}

function showSpotResult(index) {
  const key = state.currentObject;
  const plan = getSearchPlan(key);
  const spot = plan?.spots[index];
  if (!spot) return;
  const clue = state.caseData.clues[key];
  const found = state.found.has(key);
  const revealed = !found && !!plan.revealed;
  const searched = searchedSpots(key);
  const meta = stationOf(state.caseData.location, key);
  if (revealed && !plan.revealLine) plan.revealLine = revealLineFor(plan, meta);
  const sheet = $('#clueSheet');
  sheet.classList.toggle('is-searching', !found && !revealed);
  sheet.classList.toggle('is-revealed', revealed);
  sheet.classList.toggle('is-gun', found && clue.type === 'gun');
  // Searching only turns something up. The clue text and the board entry
  // wait until the player picks the finding out of the object.
  $('#clueText').textContent = found ? clue.text : revealed ? plan.revealLine : spot.text;
  const left = plan.spots.length - searched.size;
  const status = $('#zoomStatus');
  status.classList.toggle('ok', found);
  status.classList.toggle('find', revealed);
  status.textContent = found
    ? '✓ LOGGED TO EVIDENCE BOARD'
    : revealed
      ? 'CLUE FOUND · TAP TO TAKE'
      : `SEARCHING ${spot.label} · ${left} ${left === 1 ? 'SPOT' : 'SPOTS'} LEFT`;
  $('#zoomFound').textContent = `${state.found.size} / ${state.caseData.objects.length}`;
  // The result text can add or lose a line, which resizes the camera bay.
  // Re-place the pips and the finding against the new bay on the next frame.
  const activeKey = key;
  requestAnimationFrame(() => {
    if (state.screen !== 'zoom' || state.currentObject !== activeKey) return;
    if (state.zoomMeta?.frame) {
      placeSearchSpots(plan, state.zoomMeta.frame);
      placeFindToken(plan, state.zoomMeta.frame);
    }
  });
}

let probeTimer = 0;

/* Search feedback: a ring at the point, and a physical beat from the
   object itself. The finding token is the only thing that logs a clue. */
function probeSpot(key, index) {
  const plan = getSearchPlan(key);
  const spot = plan?.spots[index];
  if (!spot) return;
  const station = $(`#zoomCanvas .closeup-svg [data-station="${key}"]`);
  if (station) {
    station.classList.remove(...PROBE_CLASSES);
    void station.getBoundingClientRect();
    station.classList.add(`probe-${probeActionFor(spot.label)}`);
    clearTimeout(probeTimer);
    probeTimer = setTimeout(() => station.classList.remove(...PROBE_CLASSES), 680);
  }
  const layer = $('#zoomSpots');
  const frame = state.zoomMeta?.frame;
  if (!layer || !frame) return;
  const layerBox = layer.getBoundingClientRect();
  const bayBox = $('#zoomCanvas').getBoundingClientRect();
  const pos = spotPixel(plan, index, frame, layerBox, bayBox);
  if (!pos) return;
  const ripple = document.createElement('span');
  ripple.className = 'probe-ripple';
  ripple.style.left = `${clamp(pos.x, 25, layerBox.width - 25)}px`;
  ripple.style.top = `${clamp(pos.y, 25, layerBox.height - 25)}px`;
  layer.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

function collectClue(key) {
  if (state.screen !== 'zoom' || state.currentObject !== key) return;
  const plan = getSearchPlan(key);
  if (!plan?.revealed || state.found.has(key)) return;
  const clue = state.caseData.clues[key];
  state.found.add(key);
  renderSceneState();
  const spotBtn = $(`#zoomSpots .search-spot[data-spot="${plan.clueSpot}"]`);
  if (spotBtn) {
    spotBtn.classList.remove('has-find');
    spotBtn.classList.add('is-clue');
    spotBtn.focus({ preventScroll: true });
  }
  const token = $('#zoomFinds .clue-find');
  if (token) {
    token.classList.add('is-taken');
    setTimeout(() => token.remove(), 300);
  }
  Sfx.clue();
  cameraFlash(0.5);
  showSpotResult(plan.clueSpot);
  announce(`Clue logged: ${clue.text}`);
}

function searchSpot(index) {
  if (state.screen !== 'zoom' || state.currentObject == null) return;
  const key = state.currentObject;
  const plan = getSearchPlan(key);
  const spot = plan?.spots[index];
  if (!spot) return;
  const searched = searchedSpots(key);
  const firstLook = !searched.has(index);
  searched.add(index);
  const btn = $(`#zoomSpots .search-spot[data-spot="${index}"]`);
  if (btn) btn.dataset.searched = 'true';
  const found = state.found.has(key);
  const isClue = index === plan.clueSpot;

  if (isClue) {
    // A found clue can be reviewed. A newly found one is first revealed
    // in the object; only the next tap on the finding logs it.
    if (found) {
      btn?.classList.add('is-clue');
      Sfx.tick();
      showSpotResult(index);
      return;
    }
    if (plan.revealed) {
      collectClue(key);
      return;
    }
    plan.revealed = true;
    plan.revealLine = revealLineFor(plan, stationOf(state.caseData.location, key));
    btn?.classList.add('has-find');
    Sfx.discover();
    renderFindToken(key, plan, state.zoomMeta.frame);
    probeSpot(key, index);
    showSpotResult(index);
    announce(`Something is hidden here. Tap the finding to take the clue.`);
    requestAnimationFrame(() => {
      const token = $('#zoomFinds .clue-find');
      if (token) token.focus({ preventScroll: true });
    });
    return;
  }

  Sfx.tick();
  probeSpot(key, index);
  if (firstLook) {
    announce(
      found
        ? `${spot.label}: nothing new. The logged clue stands.`
        : `${spot.label}: ${spot.text}`
    );
  }
  showSpotResult(index);
}

function renderBoard() {
  const c = state.caseData;
  if (!c) return;
  const total = c.objects.length;
  $('#screen-board').dataset.clues = String(total);
  $('#boardClueCount').textContent = `${state.found.size} / ${total}`;
  const tilts = [-0.45, 0.3, -0.18, 0.5, -0.3, 0.22, -0.12, 0.38];
  const clueHTML = c.objects.map((o, i) => {
    const meta = stationOf(c.location, o.key);
    const clue = c.clues[o.key];
    const found = state.found.has(o.key);
    if (!found) {
      return `<div class="clue-row locked" style="--i:${i};--tilt:${tilts[i % tilts.length]}deg">
        <span class="num">${pad2(i + 1)}</span>
        <div class="clue-body">
          <div class="clue-meta-mini"><b>${meta.label}</b><span>SEALED</span></div>
          <div class="clue-txt">NOT YET LOGGED</div>
        </div>
      </div>`;
    }
    return `<div class="clue-row ${clue.type === 'gun' ? 'is-gun' : ''}" style="--i:${i};--tilt:${tilts[i % tilts.length]}deg">
      <span class="num">${pad2(i + 1)}</span>
      <div class="clue-body">
        <div class="clue-meta-mini"><b>${meta.label}</b><span>DETAIL ${pad2(i + 1)}</span><span class="gun-flag">SMOKING GUN</span></div>
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
  const clueKeyOfType = (type) => Object.values(state.caseData.clues).find((c) => c.type === type)?.object;
  const redKey = clueKeyOfType('red');
  const alibiKey = clueKeyOfType('alibi');
  const links = [];
  if (gunKey && state.found.has(gunKey)) links.push({ key: gunKey, suspect: state.caseData.killerIndex, kind: 'gun' });
  if (redKey && state.found.has(redKey)) links.push({ key: redKey, suspect: state.caseData.redSuspectIndex, kind: 'red' });
  if (alibiKey && state.found.has(alibiKey)) links.push({ key: alibiKey, suspect: state.caseData.alibiSuspectIndex, kind: 'alibi' });
  let html = '';
  links.forEach(({ key, suspect, kind }) => {
    const clueRow = clueRows[state.caseData.objects.findIndex((o) => o.key === key)];
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
  const count = c.suspects.length;
  if (state.selected == null || state.selected >= count) state.selected = 0;
  $('#accuseTotal').textContent = pad2(count);
  $('#accuseSubjectTotal').textContent = pad2(count);
  $('#accuseBookingNo').textContent = `#${c.id}-${pad2(state.selected + 1)}`;
  const warning = $('#gunWarning');
  if (hasSmokingGun()) {
    warning.classList.add('safe');
    warning.innerHTML = '<span>✓</span> SMOKING GUN IN HAND — MAKE IT STICK.';
  } else {
    warning.classList.remove('safe');
    warning.innerHTML = '<span>!</span> NO SMOKING GUN YET — THIS WILL GO COLD.';
  }
  showSuspect(state.selected);
}

/* The lineup shows one full booking file at a time. Browsing with the
   arrows also selects the face currently on screen, so the button always
   says exactly who will be arrested. */
function showSuspect(index, direction = 0) {
  const c = state.caseData;
  if (!c) return;
  const count = c.suspects.length;
  const at = ((index % count) + count) % count;
  state.selected = at;
  const s = c.suspects[at];
  $('#accusePortraitUse').setAttribute('href', `#p-${s.portrait}`);
  $('#accuseIndex').textContent = pad2(at + 1);
  $('#accuseSubjectNo').textContent = pad2(at + 1);
  $('#accuseBookingNo').textContent = `#${c.id}-${pad2(at + 1)}`;
  $('#accuseName').textContent = s.name;
  $('#accuseRole').textContent = s.role;
  $('#accuseDesc').textContent = s.desc || s.role;
  $('#accuseMotive').textContent = s.motive;
  $('#accuseAlibi').textContent = s.alibi;
  const btn = $('#btnMakeAccusation');
  btn.disabled = false;
  btn.textContent = `ACCUSE ${s.name.toUpperCase()}`;
  const file = $('#bookingFile');
  file.classList.remove('swap-next', 'swap-prev');
  if (direction) {
    void file.offsetWidth;
    file.classList.add(direction > 0 ? 'swap-next' : 'swap-prev');
  }
}

function selectSuspect(index, direction = 0, silent = false) {
  showSuspect(index, direction);
  if (!silent) Sfx.tick();
}

function stepSuspect(direction) {
  if (state.screen !== 'accuse' || !state.caseData) return;
  selectSuspect(state.selected + direction, direction);
}

let confirmReturnFocus = null;

function openConfirm() {
  if (state.selected == null) return;
  const s = state.caseData.suspects[state.selected];
  confirmReturnFocus = document.activeElement;
  $('#confirmName').textContent = `${s.name}?`;
  $('#confirmOverlay').classList.add('open');
  // The dialog is visibility:hidden until its opening transition starts, so
  // focus has to wait one tick or the element is not focusable yet.
  setTimeout(() => {
    if ($('#confirmOverlay').classList.contains('open')) $('#btnDoAccuse').focus({ preventScroll: true });
  }, 40);
}
function closeConfirm(restoreFocus = true) {
  $('#confirmOverlay').classList.remove('open');
  if (restoreFocus && confirmReturnFocus && document.contains(confirmReturnFocus)) {
    confirmReturnFocus.focus({ preventScroll: true });
  }
  confirmReturnFocus = null;
}

function doAccuse() {
  const c = state.caseData;
  if (state.selected == null) return;
  closeConfirm(false);
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
    requestAnimationFrame(() => requestAnimationFrame(layoutHotspotTags));
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
  const meta = stationOf(state.caseData.location, key);
  announce(
    state.found.has(key)
      ? `Reviewing ${meta.name}. Its clue is already logged.`
      : `Close-up of ${meta.name}. Search the marked spots for a clue.`
  );
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
  closeConfirm(false);
  state.caseData = makeCase();
  state.found = new Set();
  state.searched = new Map();
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
$('#zoomSpots').addEventListener('click', (e) => {
  const btn = e.target.closest('.search-spot');
  if (btn) searchSpot(Number(btn.dataset.spot));
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
$('#btnPrevSuspect').addEventListener('click', () => stepSuspect(-1));
$('#btnNextSuspect').addEventListener('click', () => stepSuspect(1));
// A horizontal drag across the booking file browses the lineup on touch.
let lineupSwipe = null;
$('#bookingFile').addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse') return;
  lineupSwipe = { x: e.clientX, y: e.clientY, id: e.pointerId };
});
$('#bookingFile').addEventListener('pointerup', (e) => {
  if (!lineupSwipe || lineupSwipe.id !== e.pointerId) return;
  const dx = e.clientX - lineupSwipe.x;
  const dy = e.clientY - lineupSwipe.y;
  lineupSwipe = null;
  if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
  stepSuspect(dx < 0 ? 1 : -1);
});
$('#bookingFile').addEventListener('pointercancel', () => { lineupSwipe = null; });
$('#btnMakeAccusation').addEventListener('click', openConfirm);
$('#btnCancelAccuse').addEventListener('click', closeConfirm);
$('#btnDoAccuse').addEventListener('click', doAccuse);
$('#confirmOverlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeConfirm(); });
$('#confirmOverlay').addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const items = [$('#btnDoAccuse'), $('#btnCancelAccuse')];
  const at = items.indexOf(document.activeElement);
  e.preventDefault();
  const next = e.shiftKey
    ? items[at <= 0 ? items.length - 1 : at - 1]
    : items[at === items.length - 1 || at < 0 ? 0 : at + 1];
  next.focus();
});
$('#btnNewCase').addEventListener('click', startCase);
$('#soundToggle').addEventListener('click', () => Sfx.toggle());

document.addEventListener('keydown', (e) => {
  if (
    state.screen === 'accuse' &&
    !$('#confirmOverlay').classList.contains('open') &&
    (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
  ) {
    e.preventDefault();
    stepSuspect(e.key === 'ArrowRight' ? 1 : -1);
    return;
  }
  if (e.key !== 'Escape') return;
  if ($('#confirmOverlay').classList.contains('open')) { closeConfirm(); return; }
  if (state.screen === 'zoom') goScene();
  else if (state.screen === 'accuse') goBoard();
  else if (state.screen === 'board') goScene();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    Sfx.stopRing();
  } else if (state.screen === 'office' && !state.call.answered) {
    Sfx.startRing();
  }
});
window.addEventListener('resize', () => {
  fitSceneTitle();
  if (state.screen === 'scene') layoutHotspotTags();
  if (state.screen === 'zoom') renderZoom();
  if (state.screen === 'board') drawBoardStrings();
});
if (document.fonts?.ready) document.fonts.ready.then(() => {
  if (state.screen === 'scene') layoutHotspotTags();
  if (state.screen === 'zoom') layoutSearchSpots();
});
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
  discover() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.16);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.026, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    osc.connect(gain).connect(this.master);
    osc.start(t); osc.stop(t + 0.34);
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
  searchSpot,
  collectClue,
  getSearchPlan,
  accuseIndex: (i) => { selectSuspect(i); doAccuse(); },
  Sfx
};
