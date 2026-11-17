/* ============================================================
   MIDNIGHT DETECTIVE — SCENE CORE
   Room shell, palettes, signage, body outline and renderer.
   ============================================================ */

const sceneG = (x, y, s = 1, r = 0, inner = '') =>
  `<g transform="translate(${x} ${y})${r ? ` rotate(${r})` : ''}${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
const sceneVars = (pal) => Object.entries(pal)
  .map(([k, v]) => `--${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:${v}`)
  .join(';');

/* ---------- palettes ---------- */
const SCENE_PALETTES = {
  hotel:     { floor: '#241b13', floorLine: '#3a2c1e', wall: '#19110c', wallHi: '#4a3522', rug: '#2c1c18', rugLine: '#5c3a30', wood: '#432d1c', woodHi: '#7a5330', metal: '#4a4c48', metalHi: '#a3a294', accent: '#cfa564', blood: '#541a1c', chalk: '#e6dcc7' },
  club:      { floor: '#26141a', floorLine: '#3d2230', wall: '#1a0e13', wallHi: '#4a2634', rug: '#341725', rugLine: '#71394f', wood: '#3c2129', woodHi: '#6e3c4d', metal: '#4a4249', metalHi: '#a08c98', accent: '#dc8f9f', blood: '#58151b', chalk: '#e8dac7' },
  pier:      { floor: '#1a2429', floorLine: '#2c3c42', wall: '#111a1e', wallHi: '#32474f', rug: '#1f3036', rugLine: '#3e5b64', wood: '#343b38', woodHi: '#68736a', metal: '#425256', metalHi: '#9bb0b2', accent: '#93bcc3', blood: '#471416', chalk: '#dfe0d1' },
  diner:     { floor: '#2b211b', floorLine: '#463329', wall: '#241a15', wallHi: '#5c4433', rug: '#7a2a24', rugLine: '#b85b45', wood: '#5b3a25', woodHi: '#95663f', metal: '#8e9692', metalHi: '#d8d2bf', accent: '#e2b267', blood: '#5c1b1c', chalk: '#f0e5cc' },
  theater:   { floor: '#241512', floorLine: '#3e2420', wall: '#1c0e0d', wallHi: '#56271f', rug: '#3a1617', rugLine: '#7d2f2d', wood: '#3f2419', woodHi: '#77512f', metal: '#6b5b45', metalHi: '#d3b98a', accent: '#e0b975', blood: '#5c1719', chalk: '#efe2c8' },
  warehouse: { floor: '#22252a', floorLine: '#343941', wall: '#15181d', wallHi: '#39404a', rug: '#2a3138', rugLine: '#4c5964', wood: '#43362a', woodHi: '#78634a', metal: '#48535a', metalHi: '#9dadaf', accent: '#c9a45f', blood: '#4c1718', chalk: '#dcd8c8' },
  train:     { floor: '#1d241d', floorLine: '#313d2d', wall: '#121711', wallHi: '#3a5035', rug: '#2b2118', rugLine: '#59452d', wood: '#45301f', woodHi: '#7c5836', metal: '#725d3d', metalHi: '#d8bd85', accent: '#d9b56e', blood: '#4d1718', chalk: '#e5ddc4' },
  radio:     { floor: '#241c16', floorLine: '#3b2d24', wall: '#18120e', wallHi: '#4d3a2c', rug: '#2c2019', rugLine: '#55402f', wood: '#4a3221', woodHi: '#85603a', metal: '#44474a', metalHi: '#b9b7a9', accent: '#d5a95f', blood: '#4f191a', chalk: '#e8ddc5' },
  pawn:      { floor: '#29231d', floorLine: '#40372c', wall: '#1a150f', wallHi: '#4a3d2b', rug: '#33251c', rugLine: '#67503a', wood: '#4f3722', woodHi: '#886240', metal: '#585441', metalHi: '#bbae86', accent: '#d9b25f', blood: '#511a1b', chalk: '#e7dcc3' },
  boathouse: { floor: '#1e2829', floorLine: '#31403f', wall: '#121a1a', wallHi: '#334b48', rug: '#243635', rugLine: '#45625d', wood: '#463b2b', woodHi: '#7f6a4c', metal: '#425352', metalHi: '#a6b8b2', accent: '#9fc5b9', blood: '#471719', chalk: '#dee1d0' },
  casino:    { floor: '#2b1718', floorLine: '#45262a', wall: '#1b0e10', wallHi: '#55272c', rug: '#3d161d', rugLine: '#81333d', wood: '#4a2920', woodHi: '#8b5535', metal: '#665243', metalHi: '#d0b47d', accent: '#e0b866', blood: '#5b1719', chalk: '#ecdec4' },
  chapel:    { floor: '#232529', floorLine: '#383c42', wall: '#15181c', wallHi: '#3f4751', rug: '#3a1a1e', rugLine: '#6e3038', wood: '#43322a', woodHi: '#7e5e48', metal: '#5d5a52', metalHi: '#c0b69f', accent: '#d8b775', blood: '#481718', chalk: '#e4ddc9' },
  garage:    { floor: '#24252a', floorLine: '#383a41', wall: '#15161a', wallHi: '#3b3e46', rug: '#2b2c31', rugLine: '#4a4c54', wood: '#483626', woodHi: '#7f6241', metal: '#495057', metalHi: '#a7b0b2', accent: '#d3a054', blood: '#4c1718', chalk: '#dcd8c7' },
  greenhouse:{ floor: '#1e2822', floorLine: '#314137', wall: '#121a15', wallHi: '#3d5947', rug: '#23332a', rugLine: '#426451', wood: '#4b3b29', woodHi: '#836a48', metal: '#4d5a50', metalHi: '#b8c7b0', accent: '#b8c97b', blood: '#491718', chalk: '#e3e5d1' },
  mortuary:  { floor: '#262b2b', floorLine: '#3a4242', wall: '#171c1c', wallHi: '#415151', rug: '#2a3736', rugLine: '#48615f', wood: '#3f392d', woodHi: '#77725c', metal: '#5b6868', metalHi: '#c4d2cd', accent: '#a9c3b6', blood: '#4c171a', chalk: '#e2e6d9' },
  penthouse: { floor: '#1d2129', floorLine: '#303846', wall: '#12151b', wallHi: '#374254', rug: '#2a2028', rugLine: '#594052', wood: '#4b2f24', woodHi: '#8a5e3e', metal: '#6c5e44', metalHi: '#dbc48c', accent: '#e2c07c', blood: '#4e171a', chalk: '#e8e1cb' },
  alley:     { floor: '#262029', floorLine: '#3b3140', wall: '#211619', wallHi: '#553029', rug: '#2c2430', rugLine: '#4c3a4c', wood: '#453225', woodHi: '#7c5a3c', metal: '#4b5053', metalHi: '#a5adaa', accent: '#c9a05c', blood: '#4f1719', chalk: '#ded8c8' },
  museum:    { floor: '#282724', floorLine: '#3f3e39', wall: '#1a1916', wallHi: '#4d4a3f', rug: '#2c2823', rugLine: '#5c5548', wood: '#4c3926', woodHi: '#8a6c46', metal: '#5b5a51', metalHi: '#cbc5ae', accent: '#d5bb7d', blood: '#4d181a', chalk: '#e9e2ce' },
  barbershop:{ floor: '#232a2a', floorLine: '#384343', wall: '#151d1d', wallHi: '#3a5350', rug: '#272f2e', rugLine: '#4a625e', wood: '#4b3523', woodHi: '#86633d', metal: '#59696a', metalHi: '#d0d9d2', accent: '#d9b96f', blood: '#4c1819', chalk: '#e4e6d8' },
  laundry:   { floor: '#24292c', floorLine: '#384046', wall: '#161b1e', wallHi: '#3d4b53', rug: '#2b3134', rugLine: '#4d5d63', wood: '#463a2b', woodHi: '#7c6b50', metal: '#58666c', metalHi: '#c3d0d1', accent: '#b8c8bf', blood: '#4c181a', chalk: '#e0e5dc' },
  gym:       { floor: '#2a211c', floorLine: '#403128', wall: '#1b1411', wallHi: '#4f3628', rug: '#33231e', rugLine: '#674538', wood: '#4c3325', woodHi: '#866143', metal: '#55504a', metalHi: '#bab0a0', accent: '#d2a45f', blood: '#50191a', chalk: '#e3dcc8' },
  library:   { floor: '#231d18', floorLine: '#3a3025', wall: '#17120e', wallHi: '#463629', rug: '#2b211a', rugLine: '#5a4432', wood: '#4b331f', woodHi: '#84603a', metal: '#575042', metalHi: '#bdac8d', accent: '#ccad6f', blood: '#4d181a', chalk: '#e5ddc7' },
  flophouse: { floor: '#22201a', floorLine: '#38342a', wall: '#181610', wallHi: '#45402c', rug: '#2a281f', rugLine: '#514b38', wood: '#43341f', woodHi: '#78623e', metal: '#56564a', metalHi: '#b0ae97', accent: '#c5a35f', blood: '#4c1819', chalk: '#e1dcc7' },
  cinema:    { floor: '#251317', floorLine: '#3d2128', wall: '#190c10', wallHi: '#51232c', rug: '#3b121b', rugLine: '#7a2c39', wood: '#40241c', woodHi: '#7a4932', metal: '#5b4b41', metalHi: '#ccb089', accent: '#d9ae67', blood: '#561619', chalk: '#e9dcc5' }
};

/* ---------- shared defs ---------- */
const SCENE_DEFS = `
<defs>
  <filter id="rs-blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="rs-blur2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="rs-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <radialGradient id="rs-vignette" cx=".5" cy=".47" r=".74">
    <stop offset=".42" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/>
  </radialGradient>
  <radialGradient id="rs-night" cx=".5" cy=".12" r=".9">
    <stop offset="0" stop-color="#2a4852"/><stop offset=".45" stop-color="#13252c"/><stop offset="1" stop-color="#050b0e"/>
  </radialGradient>
  <linearGradient id="rs-brass" x1=".1" y1="0" x2=".9" y2="1">
    <stop offset="0" stop-color="#f0d9a5"/><stop offset=".32" stop-color="#c29c5f"/><stop offset=".62" stop-color="#6f5227"/><stop offset=".84" stop-color="#d5b577"/><stop offset="1" stop-color="#4a3518"/>
  </linearGradient>
  <linearGradient id="rs-steel" x1=".1" y1="0" x2=".9" y2="1">
    <stop offset="0" stop-color="#b7c0bc"/><stop offset=".36" stop-color="#6d7979"/><stop offset=".7" stop-color="#333c3d"/><stop offset="1" stop-color="#151b1c"/>
  </linearGradient>
  <radialGradient id="rs-bulb" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#fff3c4" stop-opacity=".95"/><stop offset=".45" stop-color="#ffcf7d" stop-opacity=".55"/><stop offset="1" stop-color="#e08a2e" stop-opacity="0"/>
  </radialGradient>
  <pattern id="rs-p-wood" width="88" height="24" patternUnits="userSpaceOnUse">
    <rect width="88" height="24" fill="var(--floor)"/>
    <path d="M0 .5H88M0 23.5H88" stroke="var(--floor-line)" stroke-width="1"/>
    <path d="M44 0V24" stroke="var(--floor-line)" stroke-width=".7" opacity=".55"/>
    <path d="M7 7h29M53 17h24M12 18h18" stroke="var(--floor-line)" stroke-width=".6" opacity=".4"/>
  </pattern>
  <pattern id="rs-p-deck" width="64" height="20" patternUnits="userSpaceOnUse">
    <rect width="64" height="20" fill="var(--floor)"/>
    <path d="M0 .5H64M0 19.5H64M0 10H64" stroke="var(--floor-line)" stroke-width="1"/>
    <path d="M20 0v20M48 0v20" stroke="var(--floor-line)" stroke-width=".6" opacity=".5"/>
  </pattern>
  <pattern id="rs-p-tile" width="42" height="42" patternUnits="userSpaceOnUse">
    <rect width="42" height="42" fill="var(--floor)"/>
    <rect width="42" height="42" fill="none" stroke="var(--floor-line)" stroke-width="1"/>
    <path d="M0 21h42M21 0v42" stroke="var(--floor-line)" stroke-width=".5" opacity=".35"/>
  </pattern>
  <pattern id="rs-p-checker" width="64" height="64" patternUnits="userSpaceOnUse">
    <rect width="64" height="64" fill="var(--floor)"/>
    <rect width="32" height="32" fill="var(--floor-line)" opacity=".55"/>
    <rect x="32" y="32" width="32" height="32" fill="var(--floor-line)" opacity=".55"/>
    <path d="M0 32h64M32 0v64" stroke="var(--wall)" stroke-width="1" opacity=".5"/>
  </pattern>
  <pattern id="rs-p-hex" width="52" height="46" patternUnits="userSpaceOnUse">
    <rect width="52" height="46" fill="var(--floor)"/>
    <path d="M13 1h26l13 11v22L39 45H13L0 34V12Z" fill="none" stroke="var(--floor-line)" stroke-width="1.2"/>
    <path d="M13 1v44M39 1v44" stroke="var(--floor-line)" stroke-width=".6" opacity=".35"/>
  </pattern>
  <pattern id="rs-p-stone" width="76" height="56" patternUnits="userSpaceOnUse">
    <rect width="76" height="56" fill="var(--floor)"/>
    <path d="M0 .5H76M0 28.5H76M0 55.5H76M0 28v28M38 0v28M62 28v28" stroke="var(--floor-line)" stroke-width="1" opacity=".85"/>
    <path d="M9 8c9 2 17 1 25-1M45 37c7 2 14 1 21-1" stroke="var(--floor-line)" stroke-width=".6" opacity=".4"/>
  </pattern>
  <pattern id="rs-p-brick" width="58" height="30" patternUnits="userSpaceOnUse">
    <rect width="58" height="30" fill="var(--floor)"/>
    <path d="M0 .5H58M0 15H58M0 29.5H58M0 15v15M29 0v15M14 15v15M44 15v15" stroke="var(--floor-line)" stroke-width="1" opacity=".7"/>
  </pattern>
  <pattern id="rs-p-concrete" width="110" height="96" patternUnits="userSpaceOnUse">
    <rect width="110" height="96" fill="var(--floor)"/>
    <path d="M9 22c17 4 34 3 51-2M62 61c14 3 29 2 41-2M24 78c7 2 14 2 21 0" stroke="var(--floor-line)" stroke-width=".7" opacity=".45"/>
    <circle cx="76" cy="24" r="1.1" fill="var(--floor-line)" opacity=".5"/><circle cx="18" cy="54" r="1.4" fill="var(--floor-line)" opacity=".4"/>
    <circle cx="91" cy="77" r=".9" fill="var(--floor-line)" opacity=".5"/>
  </pattern>
  <pattern id="rs-p-carpet" width="58" height="58" patternUnits="userSpaceOnUse">
    <rect width="58" height="58" fill="var(--floor)"/>
    <path d="M29 5l24 24-24 24L5 29Z" fill="none" stroke="var(--floor-line)" stroke-width="1" opacity=".6"/>
    <path d="M29 17l12 12-12 12-12-12Z" fill="var(--floor-line)" opacity=".22"/>
    <circle cx="29" cy="29" r="2" fill="var(--floor-line)" opacity=".5"/>
  </pattern>
  <pattern id="rs-p-marble" width="120" height="110" patternUnits="userSpaceOnUse">
    <rect width="120" height="110" fill="var(--floor)"/>
    <path d="M-6 37c26-11 45 7 72 1s38-18 60-12M-4 83c22-8 44 0 66-7s40-2 62 4M33-4c-6 18 8 29 4 47" stroke="var(--floor-line)" stroke-width="1" fill="none" opacity=".5"/>
    <path d="M14 105c14-7 30-4 44-9" stroke="var(--floor-line)" stroke-width=".6" fill="none" opacity=".35"/>
  </pattern>
  <pattern id="rs-p-lino" width="70" height="70" patternUnits="userSpaceOnUse">
    <rect width="70" height="70" fill="var(--floor)"/>
    <path d="M0 35h70M35 0v70" stroke="var(--floor-line)" stroke-width=".7" opacity=".5"/>
    <circle cx="17" cy="17" r="1" fill="var(--floor-line)" opacity=".4"/><circle cx="53" cy="52" r="1.2" fill="var(--floor-line)" opacity=".35"/>
  </pattern>
  <pattern id="rs-w-paper" width="26" height="26" patternUnits="userSpaceOnUse">
    <path d="M13 0v26" stroke="var(--wall-hi)" stroke-width="2.4" opacity=".28"/>
    <path d="M6 7l3 3-3 3-3-3zM20 17l3 3-3 3-3-3z" fill="var(--wall-hi)" opacity=".18"/>
  </pattern>
  <pattern id="rs-w-panel" width="64" height="22" patternUnits="userSpaceOnUse">
    <path d="M2 2h60v18H2Z" fill="none" stroke="var(--wall-hi)" stroke-width="1.2" opacity=".5"/>
    <path d="M8 6h48v10H8Z" fill="none" stroke="var(--wall-hi)" stroke-width=".6" opacity=".35"/>
  </pattern>
  <pattern id="rs-w-tile" width="28" height="20" patternUnits="userSpaceOnUse">
    <path d="M0 .5h28M0 19.5h28M0 0v20M28 0v20" stroke="var(--wall-hi)" stroke-width="1" opacity=".45"/>
  </pattern>
  <pattern id="rs-w-brick" width="46" height="22" patternUnits="userSpaceOnUse">
    <path d="M0 .5h46M0 21.5h46M0 11h12M23 0v11M23 11h23M0 11h0" stroke="var(--wall-hi)" stroke-width="1" opacity=".4"/>
    <path d="M34 11v11" stroke="var(--wall-hi)" stroke-width="1" opacity=".3"/>
  </pattern>
  <pattern id="rs-w-stone" width="74" height="30" patternUnits="userSpaceOnUse">
    <path d="M0 .5h74M0 29.5h74M0 15h30M36 0v15M52 15v15M26 0v15" stroke="var(--wall-hi)" stroke-width="1.2" opacity=".35"/>
  </pattern>
  <pattern id="rs-w-metal" width="17" height="22" patternUnits="userSpaceOnUse">
    <path d="M8.5 0v22" stroke="var(--wall-hi)" stroke-width="2" opacity=".22"/>
    <path d="M8.5 0v22" stroke="#000" stroke-width="1" opacity=".25"/>
  </pattern>
  <pattern id="rs-w-curtain" width="30" height="22" patternUnits="userSpaceOnUse">
    <path d="M3 0c4 6 4 16 0 22M12 0c5 6 5 16 0 22M21 0c4 6 4 16 0 22M30 0c3 6 3 16 0 22" stroke="var(--wall-hi)" stroke-width="3" fill="none" opacity=".35"/>
  </pattern>
  <pattern id="rs-w-books" width="20" height="22" patternUnits="userSpaceOnUse">
    <rect x="1" y="3" width="4" height="19" fill="var(--wall-hi)" opacity=".38"/>
    <rect x="6" y="5" width="3" height="17" fill="var(--accent)" opacity=".22"/>
    <rect x="10" y="2" width="5" height="20" fill="var(--wall-hi)" opacity=".3"/>
    <rect x="16" y="6" width="3" height="16" fill="var(--wall-hi)" opacity=".24"/>
    <path d="M0 2h20" stroke="var(--wall-hi)" stroke-width="1.4" opacity=".4"/>
  </pattern>
  <pattern id="rs-w-pipes" width="72" height="22" patternUnits="userSpaceOnUse">
    <path d="M0 7h72M0 15h72" stroke="var(--wall-hi)" stroke-width="4" opacity=".3"/>
    <path d="M18 0v22M54 0v22" stroke="var(--metal-hi)" stroke-width="2" opacity=".18"/>
  </pattern>
  <pattern id="rs-w-plaster" width="58" height="34" patternUnits="userSpaceOnUse">
    <path d="M4 6c8 5 5 12 13 15s10 8 4 13M39 2c-5 7 2 11 1 18s6 9 12 9" stroke="var(--wall-hi)" stroke-width=".8" fill="none" opacity=".3"/>
    <circle cx="30" cy="24" r="4" fill="var(--wall-hi)" opacity=".08"/>
  </pattern>
</defs>`;

/* ---------- room floor + walls ---------- */
const SCENE_FLOORS = {
  wood: 'rs-p-wood', deck: 'rs-p-deck', tile: 'rs-p-tile', checker: 'rs-p-checker',
  hex: 'rs-p-hex', stone: 'rs-p-stone', brick: 'rs-p-brick', concrete: 'rs-p-concrete',
  carpet: 'rs-p-carpet', marble: 'rs-p-marble', lino: 'rs-p-lino'
};
const SCENE_WALLS = {
  paper: 'rs-w-paper', panel: 'rs-w-panel', tile: 'rs-w-tile', brick: 'rs-w-brick',
  stone: 'rs-w-stone', metal: 'rs-w-metal', curtain: 'rs-w-curtain', books: 'rs-w-books',
  pipes: 'rs-w-pipes', plaster: 'rs-w-plaster'
};

function sceneWalls(scene) {
  const wallFill = `var(--wall)`;
  const pat = SCENE_WALLS[scene.wall] || 'rs-w-panel';
  const door = scene.door || { x: 156, w: 88, style: 'wood' };
  const dx = door.x, dw = door.w;
  const bands = `
    <rect x="0" y="0" width="400" height="23" fill="${wallFill}"/>
    <rect x="0" y="0" width="21" height="500" fill="${wallFill}"/>
    <rect x="379" y="0" width="21" height="500" fill="${wallFill}"/>
    <rect x="0" y="477" width="${dx}" height="23" fill="${wallFill}"/>
    <rect x="${dx + dw}" y="477" width="${400 - dx - dw}" height="23" fill="${wallFill}"/>
    <rect x="0" y="0" width="400" height="23" fill="url(#${pat})"/>
    <rect x="0" y="0" width="21" height="500" fill="url(#${pat})"/>
    <rect x="379" y="0" width="21" height="500" fill="url(#${pat})"/>
    <rect x="0" y="477" width="${dx}" height="23" fill="url(#${pat})"/>
    <rect x="${dx + dw}" y="477" width="${400 - dx - dw}" height="23" fill="url(#${pat})"/>
    <g fill="var(--wall-hi)" opacity=".5">
      <rect x="21" y="20" width="358" height="3"/>
      <rect x="18" y="23" width="3" height="454"/>
      <rect x="379" y="23" width="3" height="454"/>
      <rect x="21" y="474" width="${dx - 21}" height="3"/>
      <rect x="${dx + dw}" y="474" width="${379 - dx - dw}" height="3"/>
    </g>
    <g fill="#000" opacity=".35">
      <rect x="0" y="23" width="400" height="4"/>
      <rect x="21" y="0" width="4" height="500"/>
      <rect x="375" y="0" width="4" height="500"/>
    </g>`;
  const doorArt = () => {
    if (door.style === 'none') {
      return `<rect x="${dx}" y="477" width="${dw}" height="23" fill="var(--wall)"/><rect x="${dx}" y="477" width="${dw}" height="23" fill="url(#${pat})"/>`;
    }
    const metal = door.style === 'metal';
    const fill = metal ? 'var(--metal)' : 'var(--wood)';
    const leaf = `<polygon points="${dx + 5},477 ${dx + 19},438 ${dx + dw - 18},440 ${dx + dw - 5},477" fill="${fill}" stroke="#120c09" stroke-width="1.3"/>
      <polygon points="${dx + 13},470 ${dx + 22},445 ${dx + dw - 21},447 ${dx + dw - 13},470" fill="#000" opacity=".22"/>
      <path d="M${dx + 18} 474 L${dx + 27} 450" stroke="var(--wall-hi)" stroke-width="1" opacity=".35"/>
      <circle cx="${dx + dw - 22}" cy="460" r="2.4" fill="var(--metal-hi)" opacity=".8"/>`;
    return `<rect x="${dx}" y="477" width="${dw}" height="23" fill="#070809"/>
      <ellipse cx="${dx + dw / 2}" cy="481" rx="${dw * .45}" ry="9" fill="#d9b477" opacity=".07"/>
      ${leaf}`;
  };
  return bands + doorArt();
}

/* ---------- body outline ---------- */
function sceneBody(b) {
  const [x, y, r = 0, s = 1] = b;
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
    <ellipse cx="0" cy="22" rx="58" ry="38" fill="var(--blood)" opacity=".62" filter="url(#rs-blur2)"/>
    <ellipse cx="-9" cy="14" rx="30" ry="22" fill="var(--blood)" opacity=".55" filter="url(#rs-blur2)"/>
    <path d="M-8 4c-15 4-27 12-32 21 8-1 17-5 24-10-4 8-5 16-2 23 5-7 8-13 11-19 5 8 8 16 9 25 6-9 6-19 3-28 8 4 13 9 17 16 2-8-2-18-8-25-10-7-23-9-34-5Z" fill="var(--blood)" opacity=".45"/>
    <g fill="none" stroke="var(--chalk)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="7 4" opacity=".65">
      <circle cx="0" cy="-44" r="15"/>
      <path d="M0 -29c1 19 0 35-2 48M-2 -10l-36-20 17-7M-2 -11l35-21 14 10M-2 19l-24 44 14 9M-2 19l24 43-15 10M-2 19l-2 44"/>
      <path d="M-14 -52c4-4 9-5 14-5s10 1 14 5"/>
    </g>
    <g fill="#241011" opacity=".4">
      <ellipse cx="42" cy="66" rx="12" ry="4.5" transform="rotate(16 42 66)"/>
      <ellipse cx="56" cy="56" rx="11" ry="4.5" transform="rotate(16 56 56)"/>
    </g>
    <ellipse cx="-2" cy="24" rx="64" ry="48" fill="none" stroke="var(--blood)" stroke-width="1" opacity=".12"/>
  </g>`;
}

/* ---------- in-world signage ---------- */
function signFont(main) {
  const len = String(main).length;
  return len > 7 ? 11 : len > 5 ? 13 : len > 3 ? 16 : 20;
}

const SCENE_SIGNS = {
  enamel({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-48" y="-18" width="96" height="36" rx="2" fill="#0b0a08" opacity=".5" filter="url(#rs-blur2)"/>
      <rect x="-46" y="-17" width="92" height="34" rx="2" fill="#e4dcc7" stroke="#2a2319" stroke-width="2"/>
      <rect x="-41" y="-12" width="82" height="24" rx="1" fill="none" stroke="#2a2319" stroke-width="1"/>
      <text y="-6" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.6" letter-spacing="1.4" fill="#4a4133">${top}</text>
      <text y="9" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main)}" font-weight="700" letter-spacing="1.4" fill="#1d1912">${main}</text>
      <circle cx="-40" cy="-12" r="1.2" fill="#7b7263"/><circle cx="40" cy="12" r="1.2" fill="#7b7263"/>
    </g>`;
  },
  brass({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-48" y="-18" width="96" height="36" rx="1" fill="#000" opacity=".55" filter="url(#rs-blur2)"/>
      <rect x="-46" y="-17" width="92" height="34" fill="url(#rs-brass)" stroke="#332310" stroke-width="1.4"/>
      <rect x="-41" y="-12" width="82" height="24" fill="none" stroke="#3a2913" stroke-width=".8" opacity=".7"/>
      <text y="-5" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.6" letter-spacing="1.4" fill="#241a0d" opacity=".85">${top}</text>
      <text y="10" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main)}" font-weight="600" letter-spacing="1.5" fill="#1c1308">${main}</text>
      <circle cx="-42" cy="-13" r="1.5" fill="#2c1e0e"/><circle cx="42" cy="13" r="1.5" fill="#2c1e0e"/>
    </g>`;
  },
  painted({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})" opacity=".82">
      <text y="-8" text-anchor="middle" font-family="Oswald, sans-serif" font-size="6" letter-spacing="2" fill="var(--chalk)" opacity=".6">${top}</text>
      <text y="16" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main) + 8}" font-weight="700" letter-spacing="3" fill="var(--chalk)" opacity=".7">${main}</text>
      <path d="M-40 20c26 3 54 2 80-1" stroke="var(--chalk)" stroke-width="1" opacity=".25"/>
    </g>`;
  },
  stencil({ x, y, top, main, rot = 0 }) {
    const fs = signFont(main) + 3;
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-52" y="-18" width="104" height="36" fill="#131312" opacity=".28"/>
      <text y="-6" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.8" letter-spacing="1.7" fill="#d9c48c" opacity=".68">${top}</text>
      <text y="13" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${fs}" font-weight="700" letter-spacing="2.4" fill="#d7b96f" opacity=".85">${main}</text>
      <path d="M-55 17h110" stroke="#d7b96f" stroke-width="1.2" opacity=".35" stroke-dasharray="9 3"/>
      <path d="M-44 -15l4 30M38 -13l-3 27" stroke="#161412" stroke-width="1.5" opacity=".4"/>
    </g>`;
  },
  neon({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <ellipse cx="0" cy="0" rx="58" ry="28" fill="#b3466d" opacity=".11" filter="url(#rs-blur)"/>
      <rect x="-46" y="-18" width="92" height="36" rx="4" fill="#0a0709" stroke="#432532" stroke-width="1.5"/>
      <text y="-6" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.6" letter-spacing="1.4" fill="#c98fa4" opacity=".85">${top}</text>
      <text y="11" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main)}" font-weight="600" letter-spacing="1.5" fill="#ffb7c8" filter="url(#rs-glow)">${main}</text>
      <path d="M-38 -15v30M38 -15v30" stroke="#7c3b50" stroke-width="1.4" opacity=".6"/>
    </g>`;
  },
  hanging({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <path d="M-32 -52l-6 26M32 -52l6 26" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".55"/>
      <rect x="-50" y="-22" width="100" height="44" rx="3" fill="#0b0906" opacity=".45" filter="url(#rs-blur2)"/>
      <rect x="-48" y="-21" width="96" height="42" rx="2" fill="var(--wood)" stroke="#22160c" stroke-width="1.6"/>
      <rect x="-42" y="-16" width="84" height="32" fill="none" stroke="var(--wood-hi)" stroke-width="1" opacity=".5"/>
      <text y="-6" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.4" letter-spacing="1.4" fill="var(--chalk)" opacity=".6">${top}</text>
      <text y="12" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main)}" font-weight="600" letter-spacing="1.6" fill="var(--accent)">${main}</text>
      <circle cx="-40" cy="-13" r="1.3" fill="var(--metal-hi)" opacity=".6"/><circle cx="40" cy="13" r="1.3" fill="var(--metal-hi)" opacity=".6"/>
    </g>`;
  },
  marquee({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-50" y="-20" width="100" height="40" rx="3" fill="#0a0807" stroke="#d8b06a" stroke-width="1.4"/>
      <g fill="#ffdda0">
        <circle cx="-44" cy="-14" r="1.5"/><circle cx="-22" cy="-14" r="1.5"/><circle cx="0" cy="-14" r="1.5"/><circle cx="22" cy="-14" r="1.5"/><circle cx="44" cy="-14" r="1.5"/>
        <circle cx="-44" cy="14" r="1.5"/><circle cx="-22" cy="14" r="1.5"/><circle cx="0" cy="14" r="1.5"/><circle cx="22" cy="14" r="1.5"/><circle cx="44" cy="14" r="1.5"/>
      </g>
      <text y="-4" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.4" letter-spacing="1.5" fill="#d7b87a">${top}</text>
      <text y="11" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main)}" font-weight="600" letter-spacing="1.8" fill="#f3dcae">${main}</text>
    </g>`;
  },
  tent({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <path d="M-38 8h76l8 20H-46Z" fill="#0a0806" opacity=".4" filter="url(#rs-blur2)"/>
      <path d="M-36 0h72v22H-36Z" fill="#e6dcc5" stroke="#2a2319" stroke-width="1"/>
      <path d="M-36 0h72l-10-8H-26Z" fill="#f1e8d2" stroke="#2a2319" stroke-width="1"/>
      <text y="8" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5" letter-spacing="1" fill="#6a5e4b">${top}</text>
      <text y="18" text-anchor="middle" font-family="Oswald, sans-serif" font-size="10" font-weight="700" letter-spacing="1.2" fill="#221d15">${main}</text>
    </g>`;
  },
  stone({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-50" y="-19" width="100" height="38" rx="1" fill="#0c0d0d" opacity=".4" filter="url(#rs-blur2)"/>
      <rect x="-49" y="-18" width="98" height="36" fill="var(--wall-hi)" opacity=".35" stroke="#0e1010" stroke-width="1"/>
      <text y="-6" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.4" letter-spacing="1.5" fill="var(--chalk)" opacity=".6">${top}</text>
      <text y="11" text-anchor="middle" font-family="Oswald, sans-serif" font-size="${signFont(main)}" font-weight="600" letter-spacing="2" fill="var(--chalk)" opacity=".8">${main}</text>
    </g>`;
  },
  air({ x, y, top, main, rot = 0 }) {
    return `<g transform="translate(${x} ${y}) rotate(${rot})">
      <rect x="-42" y="-20" width="84" height="22" rx="2" fill="#1b0e0d" stroke="#803a36" stroke-width="1.4"/>
      <text y="-6" text-anchor="middle" font-family="Oswald, sans-serif" font-size="8" letter-spacing="2.6" fill="#e78072" filter="url(#rs-glow)">ON AIR</text>
      <text y="16" text-anchor="middle" font-family="Oswald, sans-serif" font-size="5.6" letter-spacing="1.6" fill="var(--chalk)" opacity=".72">${top} ${main}</text>
    </g>`;
  }
};

/* ---------- renderer ---------- */
function renderScene(loc) {
  const scene = (typeof SCENES !== 'undefined' && SCENES[loc.scene]) || {};
  const pal = SCENE_PALETTES[scene.palette || loc.scene] || SCENE_PALETTES.hotel;
  const floor = SCENE_FLOORS[scene.floor] || SCENE_FLOORS.wood;
  const lights = (scene.lights || []).map(([x, y, rx, ry, color]) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${color}" opacity=".26" filter="url(#rs-blur)"/>`).join('');
  const wallProps = (scene.wallProps || []).map(drawSceneProp).join('');
  const props = (scene.props || []).map(drawSceneProp).join('');
  const stationLayer = Object.entries(scene.stations || {})
    .map(([key, st]) => {
      const def = STATIONS[st.t];
      return def ? `<g data-station="${key}">${def.draw(st, key)}</g>` : '';
    }).join('');
  const sign = scene.sign
    ? (SCENE_SIGNS[scene.sign.style] || SCENE_SIGNS.enamel)({
        ...scene.sign,
        top: loc.plate?.[0] || loc.room || '',
        main: loc.plate?.[1] || ''
      })
    : '';
  const foreground = (scene.foreground || []).map(drawSceneProp).join('');

  return `<svg class="room-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="${sceneVars(pal)}">
    ${SCENE_DEFS}
    <rect width="400" height="500" fill="url(#${floor})"/>
    ${lights}
    ${sceneWalls(scene)}
    ${wallProps}
    ${props}
    ${sceneBody(scene.body || [200, 275, 0])}
    ${stationLayer}
    ${foreground}
    ${sign}
    <rect width="400" height="500" fill="url(#rs-vignette)" pointer-events="none"/>
  </svg>`;
}

function drawSceneProp(p) {
  if (!p || !p.p) return '';
  const fn = PROPS[p.p];
  return fn ? fn(p) : '';
}

function getStationMeta(loc, key) {
  const scene = (typeof SCENES !== 'undefined' && SCENES[loc.scene]) || {};
  const st = scene.stations?.[key];
  const def = st && STATIONS[st.t];
  return def || STATIONS[key] || { label: key.toUpperCase(), name: `the ${key}`, place: `near the ${key}` };
}

function getStationPoint(loc, key) {
  const scene = (typeof SCENES !== 'undefined' && SCENES[loc.scene]) || {};
  const st = scene.stations?.[key];
  return st ? { x: (st.x / 400) * 100, y: (st.y / 500) * 100 } : { x: 50, y: 50 };
}
