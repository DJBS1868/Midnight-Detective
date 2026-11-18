/* ============================================================
   MIDNIGHT DETECTIVE — LOOSE EVIDENCE
   Small, scene-agnostic objects that can be set on a desk, a
   windowsill, the floor or beside the furniture. Each one is a
   real station, so the camera can inspect it like anything else.
   ============================================================ */

Object.assign(STATIONS, {
  ashtray: {
    label: 'ASHTRAY', name: 'the ashtray', place: 'in the ashtray', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="6" rx="21" ry="6" fill="#000" opacity=".42" filter="url(#rs-blur2)"/>
      <ellipse cx="0" cy="1" rx="17" ry="7.5" fill="var(--metal)" stroke="#121614" stroke-width="1"/>
      <ellipse cx="0" cy="-1" rx="11.5" ry="4.8" fill="#0c0c0b"/>
      <path d="M-9 -2l5-2" stroke="#d9cfb8" stroke-width="1.8" opacity=".55" stroke-linecap="round"/>
      <path d="M-6 -4l3-1" stroke="#8a7f6b" stroke-width="1.2" opacity=".5"/>
      <path d="M7 0l6 1" stroke="#d9cfb8" stroke-width="1.6" opacity=".45" stroke-linecap="round"/>
      <path d="M10 0l2-1" stroke="#c2573c" stroke-width="1.4" opacity=".55"/>
    `)
  },

  tumbler: {
    label: 'GLASS', name: 'the whiskey glass', place: 'under the whiskey glass', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="12" rx="12" ry="4" fill="#000" opacity=".36" filter="url(#rs-blur2)"/>
      <path d="M-7 -12h14l-1.6 23h-10.8Z" fill="#c7d6d3" opacity=".16" stroke="#d9e4e1" stroke-width=".8"/>
      <path d="M-6.2 -2h12.4l-.8 11.4h-10.8Z" fill="var(--accent)" opacity=".48"/>
      <path d="M-5 -10h9" stroke="#fff" stroke-width="1" opacity=".32"/>
      <path d="M5 -9l-1.4 18" stroke="#fff" stroke-width=".7" opacity=".22"/>
      <ellipse cx="0" cy="11.2" rx="5.2" ry="1.4" fill="#fff" opacity=".12"/>
    `)
  },

  telephone: {
    label: 'PHONE', name: 'the telephone', place: 'under the telephone', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="12" rx="20" ry="6" fill="#000" opacity=".4" filter="url(#rs-blur2)"/>
      <path d="M-15 2h30l-3 9h-24Z" fill="#171310" stroke="#3d3226" stroke-width="1"/>
      <rect x="-13" y="-7" width="26" height="13" rx="3" fill="#1e1914" stroke="#4a3d2c" stroke-width=".9"/>
      <circle cx="0" cy="0" r="5.6" fill="#0d0b09" stroke="var(--metal-hi)" stroke-width=".8" opacity=".8"/>
      <g fill="#b9a88a" opacity=".5">
        <circle cx="-2.6" cy="-1.8" r=".8"/><circle cx=".3" cy="-2.2" r=".8"/><circle cx="2.6" cy="-1.5" r=".8"/>
        <circle cx="-2.8" cy="1" r=".8"/><circle cx="0" cy="1.4" r=".8"/><circle cx="2.8" cy="1.1" r=".8"/>
      </g>
      <path d="M-19 -12c0-4 7-6 12-4l14 1c5-2 11 0 11 4s-6 5-11 3l-14-1c-5 2-12 1-12-3Z" fill="#241d16" stroke="#56472f" stroke-width="1"/>
      <path d="M-14 -11c3-2 8-1 10 0M4 -10c3-1 8-2 11 0" stroke="#8d7752" stroke-width=".8" opacity=".55"/>
      <path d="M18 2c4 5 1 9-3 9s-4-5-1-6" fill="none" stroke="#4f4433" stroke-width="1.2" opacity=".7"/>
    `)
  },

  matchbook: {
    label: 'MATCHES', name: 'the matchbook', place: 'inside the matchbook', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="6" rx="13" ry="3.4" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <rect x="-9" y="-6" width="18" height="12" rx="1" fill="#7a2a22" stroke="#2a0f0c" stroke-width=".8"/>
      <rect x="-9" y="-6" width="18" height="3" fill="#d8c39b" opacity=".82"/>
      <path d="M-5 -3.6v7M0 -3.6v7M5 -3.6v7" stroke="#f0d9a5" stroke-width=".8" opacity=".6"/>
      <path d="M-4 1l8 0" stroke="#f0d9a5" stroke-width=".7" opacity=".5"/>
      <path d="M5 -5l3-3" stroke="#d8c39b" stroke-width="1.2" opacity=".7"/>
      <path d="M8 -8l1.4-.4" stroke="#c2573c" stroke-width="1.4" opacity=".8"/>
    `)
  },

  cigaretteCase: {
    label: 'CIGARETTES', name: 'the cigarette case', place: 'inside the cigarette case', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="7" rx="15" ry="3.6" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <rect x="-12" y="-7" width="24" height="14" rx="2" fill="url(#rs-brass)" stroke="#3d2c12" stroke-width=".8"/>
      <path d="M-12 0h24" stroke="#3d2c12" stroke-width=".7" opacity=".6"/>
      <path d="M-8 -4h16" stroke="#fff5cf" stroke-width=".6" opacity=".3"/>
      <g transform="translate(0 2.6)"><path d="M-4 -2h8v1.6h-8Z" fill="#2a2118" opacity=".5"/><circle cx="0" cy="-.4" r="1.6" fill="none" stroke="#2a2118" stroke-width=".6" opacity=".6"/></g>
    `)
  },

  pocketWatch: {
    label: 'WATCH', name: 'the pocket watch', place: 'beneath the pocket watch', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="9" rx="13" ry="3.4" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <path d="M8 -10c6 2 10 8 9 14" fill="none" stroke="url(#rs-brass)" stroke-width="1.2" opacity=".8"/>
      <circle cx="0" cy="0" r="10.5" fill="url(#rs-brass)" stroke="#3b2a12" stroke-width="1"/>
      <circle cx="0" cy="0" r="8" fill="#e6dcc0" stroke="#5c4a2c" stroke-width=".7"/>
      <g stroke="#3b2f1d" stroke-width=".7" opacity=".75"><path d="M0 -6v2M0 6v-2M-6 0h2M6 0h-2"/></g>
      <path d="M0 0l3 -3M0 0l-1 4" stroke="#2a2118" stroke-width=".8" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="1" fill="#2a2118"/>
      <path d="M0 -10.5v-2.4M-1.6 -13h3.2" stroke="url(#rs-brass)" stroke-width="1.4"/>
    `)
  },

  ledger: {
    label: 'LEDGER', name: 'the ledger', place: 'in the ledger', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="7" rx="18" ry="4" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <rect x="-15" y="-9" width="30" height="17" rx="1.5" fill="#2c1e14" stroke="#120c08" stroke-width=".9"/>
      <rect x="-13" y="-7.4" width="26" height="14" fill="#cbbd9d"/>
      <path d="M0 -7.4v14" stroke="#8b7a58" stroke-width=".8"/>
      <g stroke="#6b5c42" stroke-width=".55" opacity=".8">
        <path d="M-10 -4h7M-10 -1h7M-10 2h7M-10 5h6"/>
        <path d="M3 -4h7M3 -1h7M3 2h7M3 5h6"/>
      </g>
      <path d="M-15 -9h30" stroke="#6b5232" stroke-width="1.4" opacity=".7"/>
      <path d="M-13 7.6h26" stroke="#0d0906" stroke-width="1" opacity=".4"/>
    `)
  },

  keyring: {
    label: 'KEYS', name: 'the key ring', place: 'on the key ring', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="8" rx="14" ry="3.4" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <circle cx="0" cy="-4" r="6.4" fill="none" stroke="url(#rs-brass)" stroke-width="1.8"/>
      <g stroke="url(#rs-steel)" stroke-width="1.5" fill="none" stroke-linecap="round">
        <path d="M-5 1l-4 9M-3 2l-1 10M5 1l5 8"/>
      </g>
      <g fill="url(#rs-brass)">
        <path d="M-9 10l2.4 0 .6 2.4-2.4.5Z"/>
        <path d="M-4 12l2 0 .4 2-2 .4Z"/>
        <path d="M10 9l2 1-.6 2-2-.6Z"/>
      </g>
      <path d="M-3 -7c2-1.6 5-1.4 6 .4" stroke="#fff5cf" stroke-width=".6" opacity=".4" fill="none"/>
    `)
  },

  lipstick: {
    label: 'LIPSTICK', name: 'the lipstick', place: 'under the lipstick', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="11" rx="9" ry="2.8" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <rect x="-5" y="-2" width="10" height="13" rx="1.6" fill="url(#rs-brass)" stroke="#3b2a12" stroke-width=".7"/>
      <path d="M-4 -2v-4h8v4" fill="#2b211a" stroke="#0f0b08" stroke-width=".7"/>
      <path d="M-3.4 -6h6.8l-.8 -6.6c-.4-1.8-4.8-1.8-5.2 0Z" fill="#9c2f39" stroke="#4a1015" stroke-width=".6"/>
      <path d="M-2.6 -9.6c1.2-1 3.6-1 4.8 0" stroke="#d46a72" stroke-width=".7" opacity=".6" fill="none"/>
      <path d="M-4.4 4h8.8" stroke="#fff5cf" stroke-width=".5" opacity=".35"/>
    `)
  },

  shellCasing: {
    label: 'CASING', name: 'the spent casing', place: 'beside the spent casing', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="9" rx="9" ry="2.6" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <g transform="rotate(-18)">
        <rect x="-3.4" y="-10" width="6.8" height="18" rx="1" fill="url(#rs-brass)" stroke="#3d2c12" stroke-width=".7"/>
        <rect x="-3.4" y="6.4" width="6.8" height="3.2" rx="1" fill="#8a6a32" stroke="#3d2c12" stroke-width=".6"/>
        <path d="M-1.4 -8.4v12" stroke="#fff5cf" stroke-width=".6" opacity=".45"/>
        <circle cx="0" cy="8" r="1.1" fill="#2b2010" opacity=".7"/>
      </g>
    `)
  },

  foldedNote: {
    label: 'NOTE', name: 'the folded note', place: 'inside the folded note', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="7" rx="14" ry="3.2" fill="#000" opacity=".3" filter="url(#rs-blur2)"/>
      <path d="M-12 -7l9-1 12 3-3 12-9 1-9-3Z" fill="#d8ccb0" stroke="#8b7c60" stroke-width=".7"/>
      <path d="M-9 -5l14 2M-10 -1l14 2M-11 3l13 2" stroke="#6b5c44" stroke-width=".6" opacity=".6"/>
      <path d="M-12 -7l5 5-2 9" fill="none" stroke="#a99a7a" stroke-width=".6" opacity=".8"/>
      <path d="M3 -9l6 8" stroke="#f2e8cf" stroke-width=".7" opacity=".5"/>
    `)
  },

  bottle: {
    label: 'BOTTLE', name: 'the whiskey bottle', place: 'behind the whiskey bottle', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="14" rx="11" ry="3.4" fill="#000" opacity=".38" filter="url(#rs-blur2)"/>
      <path d="M-6 6v-11c0-3 2-3 2-6v-3h8v3c0 3 2 3 2 6v11Z" fill="#3a2a18" stroke="#17100a" stroke-width=".8" opacity=".9"/>
      <path d="M-4 6v-10c0-2 1.4-2.4 1.6-4" fill="none" stroke="#8a6a3a" stroke-width=".7" opacity=".55"/>
      <rect x="-6" y="-2" width="12" height="7" fill="#d8c9a6" opacity=".8"/>
      <path d="M-4 0h8M-4 2.6h8" stroke="#5c4a30" stroke-width=".6" opacity=".7"/>
      <path d="M-3.2 -12h6.4" stroke="#b9a17a" stroke-width="1" opacity=".4"/>
    `)
  },

  glove: {
    label: 'GLOVE', name: 'the kid glove', place: 'inside the kid glove', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="10" rx="13" ry="3.2" fill="#000" opacity=".3" filter="url(#rs-blur2)"/>
      <path d="M-7 9c-2-4-3-10-1-14 1-2 3-2 4 0l1 4 1-8c0-2 3-2 3 0l1 8 2-6c1-2 3-1 3 1l-1 8c1 2 2 5 1 8-2 4-10 4-14-1Z" fill="#2a2018" stroke="#100c08" stroke-width=".8"/>
      <path d="M-4 2c2 3 6 4 9 2" fill="none" stroke="#5c4a36" stroke-width=".7" opacity=".6"/>
      <path d="M-5 8c3 2 8 2 11 0" stroke="#6b5540" stroke-width=".6" opacity=".5" fill="none"/>
    `)
  },

  purse: {
    label: 'PURSE', name: 'the evening purse', place: 'inside the evening purse', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="8" rx="18" ry="4" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <path d="M-16 -1c0-5 6-8 16-8s16 3 16 8l-3 7c-4 3-22 3-26 0Z" fill="#35121c" stroke="#15070a" stroke-width=".9"/>
      <path d="M-16 -1c5-4 27-4 32 0" fill="none" stroke="#7a3146" stroke-width="1" opacity=".6"/>
      <circle cx="0" cy="0" r="2.6" fill="url(#rs-brass)" stroke="#3d2c12" stroke-width=".6"/>
      <path d="M-12 3c7 2 17 2 24 0" stroke="#8f4058" stroke-width=".6" opacity=".45" fill="none"/>
      <path d="M-9 -6c4-4 14-4 18 0" fill="none" stroke="#5c2434" stroke-width="1" opacity=".8"/>
    `)
  },

  hat: {
    label: 'HAT', name: 'the felt hat', place: 'under the felt hat', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="8" rx="24" ry="5" fill="#000" opacity=".36" filter="url(#rs-blur2)"/>
      <ellipse cx="0" cy="3" rx="23" ry="7" fill="#1c1712" stroke="#0b0806" stroke-width=".8"/>
      <path d="M-13 3c0-10 4-16 13-16s13 6 13 16Z" fill="#241d16" stroke="#0b0806" stroke-width=".8"/>
      <path d="M-12 0c8-2 16-2 24 0" stroke="#4a3a2a" stroke-width="1.2" opacity=".7"/>
      <path d="M-7 -5c1-5 4-7 7-7" stroke="#5c4a36" stroke-width=".7" opacity=".5" fill="none"/>
      <path d="M-15 4c10 2 20 2 30 0" stroke="#3d2f22" stroke-width=".7" opacity=".5" fill="none"/>
    `)
  },

  camera: {
    label: 'CAMERA', name: 'the press camera', place: 'under the press camera', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="10" rx="19" ry="4.4" fill="#000" opacity=".36" filter="url(#rs-blur2)"/>
      <rect x="-17" y="-6" width="34" height="16" rx="2" fill="#171513" stroke="#050505" stroke-width=".9"/>
      <rect x="-17" y="-10" width="12" height="5" rx="1" fill="#24201b" stroke="#0a0908" stroke-width=".7"/>
      <circle cx="4" cy="2" r="7" fill="#0c0d0d" stroke="url(#rs-steel)" stroke-width="1.4"/>
      <circle cx="4" cy="2" r="3.6" fill="#1b2a2e" stroke="#7d8f92" stroke-width=".7"/>
      <circle cx="4" cy="2" r="1.4" fill="#9fc3c9" opacity=".55"/>
      <path d="M-13 -2h5M-13 1h4" stroke="#8b8172" stroke-width=".7" opacity=".5"/>
      <rect x="11" y="-8" width="4" height="4" rx=".8" fill="#3d3830"/>
      <path d="M-17 6h34" stroke="#000" stroke-width=".8" opacity=".4"/>
    `)
  },

  umbrella: {
    label: 'UMBRELLA', name: 'the wet umbrella', place: 'by the wet umbrella', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="16" rx="15" ry="3.4" fill="#000" opacity=".36" filter="url(#rs-blur2)"/>
      <path d="M-2 -15c3 0 4 2 4 5v20" fill="none" stroke="#2b241d" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M2 8c0 4-5 5-6 1" fill="none" stroke="#8a6a3a" stroke-width="2" stroke-linecap="round"/>
      <path d="M-2 -15c-2 3-2 7-4 10M-2 -15c2 3 4 5 5 9" fill="none" stroke="#4a3d2c" stroke-width=".8"/>
      <path d="M-8 -3c4-3 8-3 12 0M-7 2c4-2 8-2 12 0" stroke="#5c4a36" stroke-width=".7" opacity=".55" fill="none"/>
      <circle cx="-2" cy="-16" r="1.4" fill="url(#rs-brass)"/>
    `)
  },

  scarf: {
    label: 'SCARF', name: 'the silk scarf', place: 'in the silk scarf', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="7" rx="18" ry="3.4" fill="#000" opacity=".3" filter="url(#rs-blur2)"/>
      <path d="M-18 -4c6-5 10 2 16-1s10 2 18-1c-2 6-8 5-13 8s-10 0-14 2c-4-1-6-4-7-8Z" fill="#5c1d2a" stroke="#210a10" stroke-width=".7"/>
      <path d="M-12 -2c4 2 8 0 12 1s7-1 10 0" stroke="#a24a5c" stroke-width=".7" opacity=".55" fill="none"/>
      <path d="M-17 -3l-3 6M15 -3l3 5" stroke="#7a2c3c" stroke-width="1" opacity=".6"/>
    `)
  },

  compact: {
    label: 'COMPACT', name: 'the powder compact', place: 'inside the powder compact', kind: 'trinket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="6" rx="14" ry="3.4" fill="#000" opacity=".34" filter="url(#rs-blur2)"/>
      <circle cx="0" cy="0" r="12" fill="url(#rs-brass)" stroke="#3b2a12" stroke-width=".9"/>
      <circle cx="0" cy="0" r="9" fill="#e7d9c0" stroke="#7a5f34" stroke-width=".6"/>
      <circle cx="0" cy="0" r="4" fill="#d8c6a8" opacity=".7"/>
      <path d="M-7 -3c2-3 5-4 8-4" stroke="#fff5cf" stroke-width=".7" opacity=".5" fill="none"/>
      <path d="M0 -12v-2M-1.4 -13.4h2.8" stroke="url(#rs-brass)" stroke-width="1"/>
    `)
  }
});

/* Trinket types available as loose evidence. The scene generator
   shuffles this list per location and assigns the first five to the
   floor, sill and desk slots. */
const EXTRA_ITEM_POOL = [
  'ashtray', 'tumbler', 'telephone', 'matchbook', 'cigaretteCase',
  'pocketWatch', 'ledger', 'keyring', 'lipstick', 'shellCasing',
  'foldedNote', 'bottle', 'glove', 'purse', 'hat', 'camera',
  'umbrella', 'scarf', 'compact'
];

/* Every station belongs to one of four physical families. The clue
   sentences use this so a line written for a desk never appears on a
   hanging coat. */
const STATION_KIND_MAP = {};
[
  ['surface', ['writingDesk', 'barTop', 'chartTable', 'dinerTable', 'vanityTable', 'workbench', 'trainTable', 'console', 'glassCounter', 'cardTable', 'altarTable', 'pottingBench', 'metalTable', 'readingTable', 'crateTable', 'foldingTable', 'washstand', 'projectorBench']],
  ['opening', ['rainWindow', 'neonWindow', 'cityWindow', 'storefront', 'porthole', 'barredWindow', 'highWindow', 'frostedWindow', 'stainedGlass', 'archedWindow', 'trainWindow', 'studioGlass', 'boothWindow', 'shopWindow', 'glassPanel', 'stageDoor', 'backDoor', 'rollDoor']],
  ['garment', ['coatChair', 'coatHook', 'coatRack', 'costumeRack', 'oilskins', 'apron', 'stole', 'uniform', 'vestment', 'smock', 'labCoat', 'coveralls', 'guard']],
  ['container', ['wallSafe', 'floorSafe', 'strongbox', 'register', 'locker', 'cashBox', 'cage', 'trunk', 'poorBox', 'displayCase', 'cabinet', 'cardCatalog', 'filmCabinet', 'till']]
].forEach(([kind, keys]) => keys.forEach((key) => { STATION_KIND_MAP[key] = kind; }));

Object.entries(STATION_KIND_MAP).forEach(([key, kind]) => {
  if (STATIONS[key]) STATIONS[key].kind = kind;
});
