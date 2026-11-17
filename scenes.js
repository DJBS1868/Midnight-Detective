/* ============================================================
   MIDNIGHT DETECTIVE — SCENE LAYOUTS
   Each location gets its own room, furniture, lighting and sign.
   ============================================================ */

const SCENES = {
  /* 01 — The Marlowe Hotel, Room 814 */
  marlowe: {
    palette: 'hotel', floor: 'carpet', wall: 'paper', door: { x: 150, w: 92, style: 'wood' },
    lights: [[128, 338, 155, 122, '#ffb765'], [292, 150, 120, 100, '#e0a45a'], [205, 70, 130, 90, '#3d5a68']],
    wallProps: [{ p: 'shelves', x: 336, y: 140, kind: 'bottles' }],
    props: [
      { p: 'rug', x: 202, y: 278, w: 270, h: 170 },
      { p: 'bed', x: 182, y: 170 },
      { p: 'dresser', x: 58, y: 300 },
      { p: 'stand', x: 300, y: 158 },
      { p: 'chair', x: 248, y: 228, r: -6 }
    ],
    body: [205, 292, 8, 0.78],
    stations: {
      desk: { t: 'writingDesk', x: 116, y: 382, s: 0.92 },
      window: { t: 'rainWindow', x: 272, y: 64, s: 0.92 },
      coat: { t: 'coatChair', x: 66, y: 172 },
      safe: { t: 'wallSafe', x: 334, y: 286 }
    },
    sign: { style: 'enamel', x: 108, y: 56, rot: -1.5 }
  },

  /* 02 — The Starlight Lounge, rear office */
  starlight: {
    palette: 'club', floor: 'carpet', wall: 'curtain', door: { x: 214, w: 86, style: 'wood' },
    lights: [[200, 100, 165, 112, '#e07a95'], [322, 296, 132, 112, '#c9778a'], [80, 380, 120, 92, '#b06a88']],
    wallProps: [{ p: 'neon', x: 200, y: 78, kind: 'moon' }],
    props: [
      { p: 'rug', x: 200, y: 270, w: 276, h: 182 },
      { p: 'couch', x: 192, y: 152 },
      { p: 'jukebox', x: 54, y: 180, r: -4 },
      { p: 'stools', x: 282, y: 336, n: 3, gap: 34 }
    ],
    body: [200, 288, -6, 0.78],
    stations: {
      desk: { t: 'barTop', x: 282, y: 380, s: 0.9 },
      window: { t: 'neonWindow', x: 124, y: 64, s: 0.92 },
      coat: { t: 'coatRack', x: 334, y: 178 },
      safe: { t: 'floorSafe', x: 66, y: 286 }
    },
    sign: { style: 'neon', x: 286, y: 58, rot: 1 }
  },

  /* 03 — Pier 9, harbormaster's office */
  pier9: {
    palette: 'pier', floor: 'deck', wall: 'metal', door: { x: 138, w: 96, style: 'metal' },
    lights: [[150, 350, 142, 112, '#7fb0b8'], [300, 240, 132, 122, '#6d97a0'], [80, 100, 100, 90, '#4d7a86']],
    wallProps: [{ p: 'ringBuoy', x: 344, y: 78 }],
    props: [
      { p: 'water', x: 392, y: 250, w: 72, h: 240 },
      { p: 'crates', x: 58, y: 292, s: 0.95 },
      { p: 'barrel', x: 310, y: 388 },
      { p: 'boat', x: 258, y: 438 },
      { p: 'rope', x: 206, y: 342, s: 0.8, r: 14 },
      { p: 'puddle', x: 154, y: 332 }
    ],
    body: [205, 286, 10, 0.76],
    stations: {
      desk: { t: 'chartTable', x: 120, y: 370, s: 0.94 },
      window: { t: 'porthole', x: 270, y: 62, s: 0.95 },
      coat: { t: 'oilskins', x: 66, y: 180 },
      safe: { t: 'strongbox', x: 330, y: 300 }
    },
    sign: { style: 'stencil', x: 112, y: 60, rot: -2 }
  },

  /* 04 — The Alcazar Arms, Room 302 */
  alcazar: {
    palette: 'flophouse', floor: 'wood', wall: 'plaster', door: { x: 158, w: 84, style: 'wood' },
    lights: [[92, 260, 112, 100, '#c99055'], [252, 150, 112, 92, '#6a7a72'], [290, 340, 122, 100, '#b07a45']],
    wallProps: [],
    props: [
      { p: 'cot', x: 62, y: 152, r: 2 },
      { p: 'dresser', x: 198, y: 162 },
      { p: 'stand', x: 255, y: 248 },
      { p: 'chair', x: 240, y: 222, r: 8 },
      { p: 'rug', x: 205, y: 278, w: 232, h: 142 }
    ],
    body: [200, 290, 5, 0.78],
    stations: {
      desk: { t: 'washstand', x: 282, y: 380, s: 0.94 },
      window: { t: 'highWindow', x: 126, y: 62, s: 0.92 },
      coat: { t: 'coatHook', x: 334, y: 180 },
      safe: { t: 'wallSafe', x: 66, y: 282 }
    },
    sign: { style: 'enamel', x: 282, y: 60, rot: 1.5 }
  },

  /* 05 — The Blue Dahlia Diner, Booth 3 */
  diner: {
    palette: 'diner', floor: 'checker', wall: 'tile', door: { x: 160, w: 90, style: 'metal' },
    lights: [[120, 360, 152, 122, '#f0c070'], [62, 190, 100, 100, '#e0a55a'], [300, 120, 120, 90, '#7a8a78']],
    wallProps: [],
    props: [
      { p: 'counter', x: 200, y: 140 },
      { p: 'stools', x: 200, y: 178, n: 3, gap: 56 },
      { p: 'booth', x: 66, y: 292 },
      { p: 'jukebox', x: 336, y: 170, r: 3 },
      { p: 'trash', x: 54, y: 430 }
    ],
    body: [205, 282, 4, 0.78],
    stations: {
      desk: { t: 'dinerTable', x: 126, y: 380, s: 0.94 },
      window: { t: 'storefront', x: 272, y: 64, s: 0.92 },
      coat: { t: 'apron', x: 66, y: 164 },
      safe: { t: 'register', x: 334, y: 300 }
    },
    sign: { style: 'hanging', x: 106, y: 58, rot: -1 }
  },

  /* 06 — The Orpheum Theatre, Dressing Room 2 */
  orpheum: {
    palette: 'theater', floor: 'wood', wall: 'curtain', door: { x: 236, w: 90, style: 'wood' },
    lights: [[140, 330, 142, 122, '#e0a35a'], [70, 180, 112, 112, '#c98a4a'], [282, 180, 100, 100, '#7d4a3a']],
    wallProps: [{ p: 'neon', x: 200, y: 78, kind: 'star' }],
    props: [
      { p: 'screen', x: 200, y: 194 },
      { p: 'chair', x: 244, y: 232, r: -10 },
      { p: 'rug', x: 205, y: 292, w: 238, h: 150 },
      { p: 'stand', x: 336, y: 196 }
    ],
    body: [200, 290, 8, 0.76],
    stations: {
      desk: { t: 'vanityTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'stageDoor', x: 292, y: 104, s: 0.95 },
      coat: { t: 'costumeRack', x: 64, y: 210 },
      safe: { t: 'cashBox', x: 336, y: 300 }
    },
    sign: { style: 'marquee', x: 96, y: 58, rot: -1.5 }
  },

  /* 07 — Halcyon Warehouse, Bay 7 */
  warehouse: {
    palette: 'warehouse', floor: 'concrete', wall: 'metal', door: { x: 206, w: 108, style: 'metal' },
    lights: [[110, 340, 142, 112, '#d9b06a'], [250, 120, 100, 90, '#5d7880'], [300, 300, 112, 100, '#8a9a90']],
    wallProps: [{ p: 'toolWall', x: 148, y: 128, s: 0.8 }],
    props: [
      { p: 'crates', x: 58, y: 300 },
      { p: 'barrel', x: 300, y: 200 },
      { p: 'rope', x: 232, y: 350, s: 0.8, r: -18 },
      { p: 'drums', x: 302, y: 390, r: 6 }
    ],
    body: [205, 286, 12, 0.76],
    stations: {
      desk: { t: 'crateTable', x: 120, y: 380, s: 0.94 },
      window: { t: 'rollDoor', x: 268, y: 90, s: 0.9 },
      coat: { t: 'coveralls', x: 64, y: 200 },
      safe: { t: 'locker', x: 334, y: 306 }
    },
    sign: { style: 'stencil', x: 100, y: 60, rot: -1.5 }
  },

  /* 08 — The Midnight Limited, Sleeper Car 4 */
  train: {
    palette: 'train', floor: 'carpet', wall: 'panel', door: { x: 148, w: 88, style: 'metal' },
    lights: [[120, 350, 142, 112, '#e0b06a'], [270, 100, 112, 92, '#3f5f4a'], [70, 220, 90, 90, '#c99055']],
    wallProps: [{ p: 'rail', x: 200, y: 88, w: 300 }],
    props: [
      { p: 'cot', x: 206, y: 178, r: -1 },
      { p: 'chair', x: 280, y: 236, r: 8 },
      { p: 'rug', x: 205, y: 300, w: 230, h: 130 }
    ],
    body: [205, 290, 0, 0.74],
    stations: {
      desk: { t: 'trainTable', x: 120, y: 370, s: 0.94 },
      window: { t: 'trainWindow', x: 272, y: 70, s: 0.92 },
      coat: { t: 'coatHook', x: 64, y: 180 },
      safe: { t: 'trunk', x: 334, y: 306 }
    },
    sign: { style: 'brass', x: 110, y: 58, rot: -1 }
  },

  /* 09 — Radio KNOX, Studio B */
  radio: {
    palette: 'radio', floor: 'lino', wall: 'panel', door: { x: 156, w: 86, style: 'wood' },
    lights: [[130, 340, 152, 122, '#d9a95e'], [280, 120, 110, 92, '#5a7a6a'], [60, 240, 92, 92, '#b07a45']],
    wallProps: [{ p: 'shelves', x: 170, y: 116, kind: 'records' }],
    props: [
      { p: 'rug', x: 205, y: 288, w: 252, h: 162 },
      { p: 'rack', x: 200, y: 190 },
      { p: 'mic', x: 303, y: 180, r: 8 },
      { p: 'chair', x: 250, y: 232, r: -8 }
    ],
    body: [202, 288, 6, 0.76],
    stations: {
      desk: { t: 'console', x: 126, y: 380, s: 0.94 },
      window: { t: 'studioGlass', x: 272, y: 64, s: 0.92 },
      coat: { t: 'coatRack', x: 66, y: 190 },
      safe: { t: 'cabinet', x: 334, y: 306 }
    },
    sign: { style: 'air', x: 108, y: 58, rot: -1 }
  },

  /* 10 — The Golden Calf Pawnshop, Shop 12 */
  pawnshop: {
    palette: 'pawn', floor: 'wood', wall: 'brick', door: { x: 150, w: 90, style: 'metal' },
    lights: [[120, 350, 142, 112, '#d9ae62'], [280, 130, 100, 90, '#6a7a60'], [60, 220, 92, 92, '#b08a4a']],
    wallProps: [
      { p: 'shelves', x: 120, y: 120, kind: 'pawn' },
      { p: 'shelves', x: 334, y: 160, kind: 'records' }
    ],
    props: [
      { p: 'stand', x: 200, y: 190 },
      { p: 'chair', x: 250, y: 228, r: 7 },
      { p: 'rug', x: 205, y: 292, w: 242, h: 152 }
    ],
    body: [202, 288, 4, 0.76],
    stations: {
      desk: { t: 'glassCounter', x: 120, y: 378, s: 0.94 },
      window: { t: 'barredWindow', x: 272, y: 70, s: 0.92 },
      coat: { t: 'coatChair', x: 66, y: 186 },
      safe: { t: 'wallSafe', x: 334, y: 300 }
    },
    sign: { style: 'hanging', x: 108, y: 60, rot: 1 }
  },

  /* 11 — The Sable Boathouse, Slip 3 */
  boathouse: {
    palette: 'boathouse', floor: 'deck', wall: 'metal', door: { x: 144, w: 94, style: 'metal' },
    lights: [[140, 340, 142, 112, '#7fb0b8'], [300, 180, 132, 112, '#5d8a90'], [70, 120, 92, 82, '#3f6a72']],
    wallProps: [{ p: 'ringBuoy', x: 344, y: 92 }],
    props: [
      { p: 'boat', x: 250, y: 436 },
      { p: 'puddle', x: 250, y: 340 },
      { p: 'barrel', x: 302, y: 216 },
      { p: 'rope', x: 300, y: 160, s: 0.7, r: -24 }
    ],
    body: [205, 288, 10, 0.76],
    stations: {
      desk: { t: 'workbench', x: 126, y: 378, s: 0.94 },
      window: { t: 'porthole', x: 272, y: 64, s: 0.95 },
      coat: { t: 'oilskins', x: 64, y: 190 },
      safe: { t: 'strongbox', x: 334, y: 304 }
    },
    sign: { style: 'painted', x: 110, y: 58, rot: -2 }
  },

  /* 12 — The Vieux Carré, Casino Room 6 */
  casino: {
    palette: 'casino', floor: 'carpet', wall: 'paper', door: { x: 154, w: 92, style: 'wood' },
    lights: [[205, 150, 182, 132, '#e0b05a'], [80, 300, 100, 90, '#b05050'], [320, 170, 112, 92, '#c98070']],
    wallProps: [],
    props: [
      { p: 'rug', x: 205, y: 286, w: 254, h: 176 },
      { p: 'chandelier', x: 150, y: 78 },
      { p: 'slotMachine', x: 54, y: 330, r: -3 }
    ],
    body: [205, 288, 8, 0.76],
    stations: {
      desk: { t: 'cardTable', x: 120, y: 380, s: 0.96 },
      window: { t: 'neonWindow', x: 272, y: 64, s: 0.92 },
      coat: { t: 'stole', x: 64, y: 186 },
      safe: { t: 'cage', x: 334, y: 300 }
    },
    sign: { style: 'brass', x: 330, y: 120, rot: 1 }
  },

  /* 13 — The Chapel of St. Jude, Vestry */
  chapel: {
    palette: 'chapel', floor: 'stone', wall: 'stone', door: { x: 150, w: 88, style: 'wood' },
    lights: [[205, 120, 152, 122, '#c9a86a'], [100, 340, 130, 112, '#8a6a4a'], [300, 300, 112, 92, '#5a6a72']],
    wallProps: [{ p: 'cross', x: 200, y: 82 }],
    props: [
      { p: 'pews', x: 200, y: 180 },
      { p: 'statue', x: 330, y: 180 },
      { p: 'rug', x: 202, y: 296, w: 176, h: 136 }
    ],
    body: [205, 286, 2, 0.76],
    stations: {
      desk: { t: 'altarTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'stainedGlass', x: 272, y: 66, s: 0.92 },
      coat: { t: 'vestment', x: 64, y: 186 },
      safe: { t: 'poorBox', x: 334, y: 304 }
    },
    sign: { style: 'stone', x: 110, y: 58, rot: -1 }
  },

  /* 14 — Ninth Street Garage, Unit 5 */
  garage: {
    palette: 'garage', floor: 'concrete', wall: 'brick', door: { x: 204, w: 112, style: 'metal' },
    lights: [[130, 340, 142, 112, '#d9a45a'], [260, 120, 112, 92, '#6a7a80'], [300, 260, 100, 92, '#9a8a70']],
    wallProps: [],
    props: [
      { p: 'car', x: 156, y: 150, s: 0.9 },
      { p: 'drums', x: 320, y: 210, r: -8 },
      { p: 'puddle', x: 252, y: 360 },
      { p: 'barrel', x: 300, y: 390 }
    ],
    body: [205, 292, 10, 0.74],
    stations: {
      desk: { t: 'workbench', x: 120, y: 380, s: 0.94 },
      window: { t: 'rollDoor', x: 272, y: 88, s: 0.92 },
      coat: { t: 'coveralls', x: 64, y: 196 },
      safe: { t: 'cabinet', x: 334, y: 306 }
    },
    sign: { style: 'stencil', x: 110, y: 50, rot: -1 }
  },

  /* 15 — The Cactus Flower Greenhouse, House 2 */
  greenhouse: {
    palette: 'greenhouse', floor: 'tile', wall: 'metal', door: { x: 158, w: 88, style: 'metal' },
    lights: [[130, 340, 142, 122, '#b8c97b'], [280, 140, 122, 102, '#7fa86a'], [60, 220, 92, 92, '#8a9a60']],
    wallProps: [],
    props: [
      { p: 'plants', x: 322, y: 166, s: 1.05 },
      { p: 'plantBench', x: 260, y: 216 },
      { p: 'puddle', x: 240, y: 340 },
      { p: 'cart', x: 332, y: 396, r: 6 }
    ],
    body: [205, 288, 4, 0.76],
    stations: {
      desk: { t: 'pottingBench', x: 120, y: 378, s: 0.94 },
      window: { t: 'glassPanel', x: 272, y: 66, s: 0.92 },
      coat: { t: 'apron', x: 64, y: 160 },
      safe: { t: 'till', x: 334, y: 304 }
    },
    sign: { style: 'painted', x: 108, y: 58, rot: 1.5 }
  },

  /* 16 — Fairview Mortuary, Room 4 */
  mortuary: {
    palette: 'mortuary', floor: 'tile', wall: 'tile', door: { x: 152, w: 90, style: 'metal' },
    lights: [[130, 340, 152, 112, '#a9c3b6'], [270, 120, 122, 102, '#6a8a86'], [60, 240, 92, 92, '#8a9a90']],
    wallProps: [{ p: 'shelves', x: 170, y: 108, kind: 'jars' }],
    props: [
      { p: 'gurney', x: 206, y: 194 },
      { p: 'cart', x: 330, y: 180, r: -6 }
    ],
    body: [205, 288, 0, 0.72],
    stations: {
      desk: { t: 'metalTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'frostedWindow', x: 272, y: 66, s: 0.9 },
      coat: { t: 'labCoat', x: 64, y: 186 },
      safe: { t: 'cabinet', x: 334, y: 304 }
    },
    sign: { style: 'enamel', x: 330, y: 120, rot: 1 }
  },

  /* 17 — The Commodore Suite, 1802 */
  commodore: {
    palette: 'penthouse', floor: 'marble', wall: 'panel', door: { x: 152, w: 94, style: 'wood' },
    lights: [[150, 110, 152, 112, '#e0c07c'], [300, 280, 132, 112, '#c9a05a'], [70, 230, 92, 92, '#8a6a4a']],
    wallProps: [],
    props: [
      { p: 'couch', x: 192, y: 156 },
      { p: 'chandelier', x: 150, y: 72 },
      { p: 'stand', x: 330, y: 180 },
      { p: 'rug', x: 205, y: 294, w: 246, h: 156 }
    ],
    body: [205, 288, 6, 0.76],
    stations: {
      desk: { t: 'writingDesk', x: 120, y: 380, s: 0.94 },
      window: { t: 'cityWindow', x: 272, y: 66, s: 0.9 },
      coat: { t: 'stole', x: 64, y: 186 },
      safe: { t: 'wallSafe', x: 334, y: 300 }
    },
    sign: { style: 'brass', x: 330, y: 120, rot: 1 }
  },

  /* 18 — Rialto Alley, Alley 7 */
  rialto: {
    palette: 'alley', floor: 'stone', wall: 'brick', door: { x: 218, w: 84, style: 'metal' },
    lights: [[130, 340, 132, 112, '#c9a05c'], [300, 120, 102, 92, '#5a4a5a'], [70, 240, 92, 92, '#8a5a4a']],
    wallProps: [{ p: 'fireEscape', x: 150, y: 100 }],
    props: [
      { p: 'trash', x: 250, y: 190 },
      { p: 'barrel', x: 300, y: 190 },
      { p: 'crates', x: 336, y: 344, s: 0.55 },
      { p: 'puddle', x: 244, y: 356 }
    ],
    body: [205, 288, 10, 0.76],
    stations: {
      desk: { t: 'crateTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'backDoor', x: 258, y: 90, s: 0.92 },
      coat: { t: 'guard', x: 64, y: 186 },
      safe: { t: 'strongbox', x: 334, y: 304 }
    },
    sign: { style: 'painted', x: 340, y: 60, rot: 2 }
  },

  /* 19 — The Hall of Antiquities, Gallery 3 */
  gallery: {
    palette: 'museum', floor: 'marble', wall: 'stone', door: { x: 154, w: 92, style: 'wood' },
    lights: [[205, 140, 172, 122, '#d5bb7d'], [100, 340, 132, 112, '#b08a50'], [310, 250, 102, 92, '#8a7a5a']],
    wallProps: [],
    props: [
      { p: 'column', x: 200, y: 168, h: 120 },
      { p: 'statue', x: 330, y: 180 },
      { p: 'stanchions', x: 260, y: 350 },
      { p: 'rug', x: 205, y: 292, w: 252, h: 162 }
    ],
    body: [205, 288, 4, 0.76],
    stations: {
      desk: { t: 'readingTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'archedWindow', x: 272, y: 66, s: 0.92 },
      coat: { t: 'uniform', x: 64, y: 186 },
      safe: { t: 'displayCase', x: 334, y: 304 }
    },
    sign: { style: 'brass', x: 110, y: 58, rot: -1 }
  },

  /* 20 — The Blue Note Barbershop, Chair 2 */
  barbershop: {
    palette: 'barbershop', floor: 'checker', wall: 'tile', door: { x: 156, w: 88, style: 'wood' },
    lights: [[130, 350, 142, 112, '#d9b96f'], [280, 140, 122, 92, '#7a9a90'], [60, 240, 92, 92, '#b08a4a']],
    wallProps: [{ p: 'mirror', x: 122, y: 112 }],
    props: [
      { p: 'barberPole', x: 342, y: 194 },
      { p: 'barberChair', x: 204, y: 172 },
      { p: 'trash', x: 300, y: 390 },
      { p: 'rug', x: 205, y: 296, w: 216, h: 142 }
    ],
    body: [205, 288, 6, 0.76],
    stations: {
      desk: { t: 'washstand', x: 120, y: 378, s: 0.94 },
      window: { t: 'storefront', x: 272, y: 66, s: 0.92 },
      coat: { t: 'smock', x: 64, y: 186 },
      safe: { t: 'register', x: 334, y: 304 }
    },
    sign: { style: 'enamel', x: 100, y: 58, rot: 1 }
  },

  /* 21 — Steam Laundry, Basement */
  laundry: {
    palette: 'laundry', floor: 'tile', wall: 'pipes', door: { x: 152, w: 92, style: 'metal' },
    lights: [[130, 340, 142, 112, '#b8c8bf'], [280, 140, 112, 92, '#6a8a90'], [60, 240, 92, 92, '#8a9a9a']],
    wallProps: [{ p: 'shelves', x: 160, y: 108, kind: 'bottles' }],
    props: [
      { p: 'counter', x: 200, y: 144, kind: 'laundry' },
      { p: 'laundryBasket', x: 238, y: 198 },
      { p: 'washer', x: 300, y: 202, r: -4 },
      { p: 'cart', x: 300, y: 390, r: 8 }
    ],
    body: [205, 288, 0, 0.72],
    stations: {
      desk: { t: 'foldingTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'highWindow', x: 272, y: 60, s: 0.92 },
      coat: { t: 'coveralls', x: 64, y: 186 },
      safe: { t: 'locker', x: 334, y: 304 }
    },
    sign: { style: 'stencil', x: 330, y: 120, rot: 1 }
  },

  /* 22 — The Ironworks Gym */
  gym: {
    palette: 'gym', floor: 'wood', wall: 'brick', door: { x: 156, w: 90, style: 'metal' },
    lights: [[130, 340, 142, 112, '#d2a45f'], [280, 140, 112, 92, '#6a7a70'], [60, 240, 92, 92, '#9a7a50']],
    wallProps: [],
    props: [
      { p: 'beam', x: 200, y: 38, w: 360 },
      { p: 'heavyBag', x: 200, y: 130 },
      { p: 'gymBench', x: 200, y: 228, r: -2 },
      { p: 'rope', x: 56, y: 300, s: 0.85, r: 30 },
      { p: 'puddle', x: 300, y: 360 }
    ],
    body: [205, 288, 8, 0.74],
    stations: {
      desk: { t: 'workbench', x: 120, y: 378, s: 0.94 },
      window: { t: 'highWindow', x: 272, y: 60, s: 0.92 },
      coat: { t: 'smock', x: 64, y: 186 },
      safe: { t: 'locker', x: 334, y: 304 }
    },
    sign: { style: 'painted', x: 110, y: 58, rot: -1.5 }
  },

  /* 23 — The Carnegie Library, Wing 2 */
  library: {
    palette: 'library', floor: 'wood', wall: 'books', door: { x: 152, w: 92, style: 'wood' },
    lights: [[205, 120, 162, 112, '#ccad6f'], [100, 340, 132, 112, '#9a7a4a'], [310, 240, 102, 92, '#7a6a50']],
    wallProps: [{ p: 'shelves', x: 170, y: 120 }],
    props: [
      { p: 'cart', x: 300, y: 180, r: -5 },
      { p: 'chair', x: 200, y: 230, r: 4 },
      { p: 'rug', x: 205, y: 295, w: 242, h: 152 }
    ],
    body: [205, 288, 2, 0.76],
    stations: {
      desk: { t: 'readingTable', x: 120, y: 378, s: 0.94 },
      window: { t: 'archedWindow', x: 272, y: 66, s: 0.92 },
      coat: { t: 'uniform', x: 64, y: 186 },
      safe: { t: 'cardCatalog', x: 334, y: 304 }
    },
    sign: { style: 'brass', x: 110, y: 58, rot: 1 }
  },

  /* 24 — The Palace Cinema, Projection Booth */
  cinema: {
    palette: 'cinema', floor: 'wood', wall: 'curtain', door: { x: 154, w: 90, style: 'wood' },
    lights: [[118, 350, 120, 96, '#c99a58'], [280, 120, 96, 74, '#7a3e46'], [66, 230, 78, 70, '#9a6a42']],
    wallProps: [],
    props: [
      { p: 'reelShelf', x: 200, y: 180 },
      { p: 'filmCans', x: 306, y: 212, r: -4 },
      { p: 'chair', x: 246, y: 238, r: -7 },
      { p: 'cart', x: 292, y: 404, r: -4 }
    ],
    body: [205, 288, 4, 0.72],
    stations: {
      desk: { t: 'projectorBench', x: 120, y: 378, s: 0.94 },
      window: { t: 'boothWindow', x: 272, y: 72, s: 0.9 },
      coat: { t: 'coatHook', x: 64, y: 186 },
      safe: { t: 'filmCabinet', x: 334, y: 304 }
    },
    sign: { style: 'marquee', x: 110, y: 58, rot: -1 }
  }
};
