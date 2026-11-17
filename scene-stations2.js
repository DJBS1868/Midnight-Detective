/* ============================================================
   MIDNIGHT DETECTIVE — FOCAL STATIONS (coats & safes)
   ============================================================ */

Object.assign(STATIONS, {
  /* ---------------- coats, garments & personal effects ---------------- */
  coatChair: {
    label: 'COAT', name: 'the coat on the chair', place: 'in the coat pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="34" rx="34" ry="10" fill="#000" opacity=".55" filter="url(#rs-blur)"/>
      <g>
        <rect x="-26" y="-6" width="52" height="38" rx="3" fill="var(--wood)" stroke="#160f0a" stroke-width="1.2"/>
        <rect x="-26" y="-34" width="52" height="30" rx="4" fill="var(--wood)" stroke="#160f0a" stroke-width="1.2"/>
        <path d="M-22 -30h44M-22 -8h44" stroke="var(--wood-hi)" stroke-width="1.2" opacity=".3"/>
      </g>
      <path d="M-31 -30c-6 8-8 22-5 38l13 6 4-30 4 30 14-6c3-16 1-30-6-38-5-6-19-6-24 0Z" fill="var(--rug)" stroke="#120c0a" stroke-width="1.2"/>
      <path d="M-24 -28c2 12 0 26-2 38M24 -28c-2 12 0 26 2 38" stroke="var(--rug-line, var(--rugLine))" stroke-width="1" opacity=".5"/>
      <path d="M-6 -30l-3 18 9 4 9-4-3-18" fill="#0d0908" opacity=".55"/>
      <path d="M-6 -27l9 3 9-3" stroke="var(--rug-line, var(--rugLine))" stroke-width="1" opacity=".6" fill="none"/>
      <g transform="translate(0 -48) rotate(-4)">
        <ellipse rx="24" ry="7" fill="#14100d" stroke="#2c231a" stroke-width="1"/>
        <path d="M-16 -2c0-9 7-14 16-14s16 5 16 14Z" fill="#1c1712" stroke="#33281d" stroke-width="1"/>
        <path d="M-16 -2h32" stroke="var(--rug-line, var(--rugLine))" stroke-width="1.6" opacity=".8"/>
      </g>
      <path d="M-34 34h68" stroke="#0e0b08" stroke-width="2" opacity=".5"/>
      <g fill="var(--metal-hi)" opacity=".34"><circle cx="18" cy="16" r="1.4"/><circle cx="-20" cy="22" r="1.2"/></g>
    `)
  },

  coatHook: {
    label: 'COAT', name: 'the coat on the hook', place: 'in the hanging coat',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <rect x="-38" y="-26" width="76" height="10" rx="2" fill="var(--wood)" stroke="#160f0a" stroke-width="1.2"/>
      <path d="M-22 -26v-8h44v8" stroke="var(--wood-hi)" stroke-width="1.4" fill="none" opacity=".4"/>
      <path d="M0 -16v-10" stroke="var(--metal-hi)" stroke-width="3" opacity=".7"/>
      <path d="M0 -26c0-5 6-6 7-1" stroke="var(--metal-hi)" stroke-width="2.6" fill="none" opacity=".7"/>
      <path d="M-19 -14c-6 10-8 30-6 48l11 17 4-42 3 42 12-17c2-18 0-38-7-48-5-5-13-5-17 0Z" fill="var(--rug)" stroke="#120c0a" stroke-width="1.2"/>
      <path d="M-12 -12l-4 34M12 -12l3 34" stroke="var(--rug-line, var(--rugLine))" stroke-width="1" opacity=".55"/>
      <path d="M-3 -14l3 20 3-20" fill="#0c0907" opacity=".6"/>
      <path d="M-14 44c3 8 6 12 9 14M14 44c-3 8-6 12-9 14" stroke="var(--rug-line, var(--rugLine))" stroke-width="1" fill="none" opacity=".4"/>
      <g transform="translate(25 -12) rotate(9)">
        <ellipse rx="17" ry="5.4" fill="#191410" stroke="#33281d" stroke-width=".9"/>
        <path d="M-11 0c0-7 5-11 11-11s11 4 11 11Z" fill="#221b15" stroke="#3c3125" stroke-width=".9"/>
        <path d="M-11 0h22" stroke="var(--rug-line, var(--rugLine))" stroke-width="1.4" opacity=".7"/>
      </g>
      <ellipse cx="-26" cy="58" rx="9" ry="4" fill="#0e0c0a" opacity=".6"/>
    `)
  },

  coatRack: {
    label: 'COAT RACK', name: 'the coat rack', place: 'in the coat rack pockets',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="66" rx="30" ry="9" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <path d="M0 -54v118" stroke="var(--wood)" stroke-width="4"/>
      <path d="M-20 64L0 52l20 12" stroke="var(--wood)" stroke-width="3" fill="none"/>
      <path d="M-26 66h52" stroke="var(--wood-hi)" stroke-width="2" opacity=".35"/>
      <path d="M0 -54l-24 12M0 -54l24 12M0 -54l-13 -10M0 -54l13 -10" stroke="var(--wood)" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M-27 -42c-5 12-7 34-4 54l11 8 3-38 3 38 11-8c3-20 1-42-4-54-4-6-16-6-20 0Z" fill="var(--rug)" stroke="#120c0a" stroke-width="1.1"/>
      <path d="M-19 -40l-3 42M19 -40l3 42" stroke="var(--rug-line, var(--rugLine))" stroke-width=".9" opacity=".45"/>
      <path d="M23 -42c-4 14-5 34-2 52l9 6 2-36 2 36 9-6c2-18 0-38-4-52-4-5-12-5-16 0Z" fill="#2a2019" stroke="#120d09" stroke-width="1"/>
      <g transform="translate(-1 -66) rotate(-3)">
        <ellipse rx="21" ry="6.4" fill="#161210" stroke="#33281d" stroke-width=".9"/>
        <path d="M-14 0c0-8 6-13 14-13s14 5 14 13Z" fill="#1e1812" stroke="#3b3023" stroke-width=".9"/>
        <path d="M-14 -1h28" stroke="var(--rug-line, var(--rugLine))" stroke-width="1.4" opacity=".65"/>
      </g>
      <g transform="translate(24 -58) rotate(6)">
        <ellipse rx="15" ry="4.6" fill="#141110" stroke="#2f271d" stroke-width=".8"/>
        <path d="M-10 0c0-6 4-9 10-9s10 3 10 9Z" fill="#1a1510" stroke="#33281d" stroke-width=".8"/>
      </g>
      <path d="M-46 46c0-10 8-16 18-16M46 46c0-10-8-16-18-16" stroke="#0e0b08" stroke-width="1.4" fill="none" opacity=".4"/>
    `)
  },

  costumeRack: {
    label: 'COSTUMES', name: 'the costume rack', place: 'in the costume pockets',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="54" rx="58" ry="10" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <path d="M-54 -34h108" stroke="var(--metal-hi)" stroke-width="2.6" opacity=".55"/>
      <path d="M-54 -34v-8M54 -34v-8" stroke="var(--metal-hi)" stroke-width="2" opacity=".4"/>
      <path d="M-48 -34v84M48 -34v84" stroke="var(--metal)" stroke-width="2.4" opacity=".6"/>
      <path d="M-48 50h96" stroke="var(--metal-hi)" stroke-width="2" opacity=".35"/>
      <g fill="none" stroke="var(--metal-hi)" stroke-width="1.4" opacity=".55">
        <path d="M-34 -34v10M-34 -22h12"/>
        <path d="M-10 -34v10M-10 -22h12"/>
        <path d="M14 -34v10M14 -22h12"/>
        <path d="M36 -34v10M36 -22h10"/>
      </g>
      <path d="M-39 -14c-8 8-10 26-8 42l9 20 3-32 3 32 10-20c1-16-1-34-9-42-2-2-6-2-8 0Z" fill="#6a2b3d" stroke="#1a0e13" stroke-width="1"/>
      <path d="M-6 -14c-7 9-9 28-7 44l8 18 3-30 3 30 9-18c1-16-1-35-8-44-2-2-6-2-8 0Z" fill="#2f4a5c" stroke="#101a20" stroke-width="1"/>
      <path d="M19 -12c-6 8-8 24-6 38l7 16 2-26 3 26 8-16c0-14-1-30-6-38-2-2-6-2-8 0Z" fill="#b9a06c" opacity=".6" stroke="#3a2f1d" stroke-width="1"/>
      <path d="M39 -12c-5 7-7 22-5 34l6 14 2-24 2 24 7-14c0-12-1-27-5-34-2-2-5-2-7 0Z" fill="#4a3e5e" opacity=".7" stroke="#1a1522" stroke-width="1"/>
      <g transform="translate(-39 58)"><path d="M-8 0h16v6H-8Z" fill="#161210"/></g>
      <g transform="translate(-6 58)"><path d="M-8 0h16v6H-8Z" fill="#161210"/></g>
      <g transform="translate(19 56)"><path d="M-7 0h14v6H-7Z" fill="#161210"/></g>
      <g fill="#e2d8c3" opacity=".2"><circle cx="-34" cy="10" r="1"/><circle cx="19" cy="6" r=".9"/></g>
    `)
  },

  oilskins: {
    label: 'OILSKINS', name: 'the oilskins', place: 'in the oilskin pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <rect x="-42" y="-62" width="84" height="9" rx="2" fill="var(--wood)" stroke="#160f0a" stroke-width="1.1"/>
      <path d="M-28 -53v-5M-10 -53v-5M10 -53v-5" stroke="var(--metal-hi)" stroke-width="2.6" opacity=".55"/>
      <path d="M-26 -52c-8 12-10 36-8 58l13 20 5-40 4 40 14-20c2-22 0-46-8-58-5-6-16-6-20 0Z" fill="#b89a4c" stroke="#3a2f16" stroke-width="1.3"/>
      <path d="M-18 -50c2 18 1 38-1 56M18 -50c-2 18-1 38 1 56" stroke="#8a723a" stroke-width="1" opacity=".7"/>
      <path d="M-8 -52l-4 26 12 5 12-5-4-26" fill="#8a723a" opacity=".45"/>
      <g fill="#6e5a2c" opacity=".6"><circle cx="-12" cy="-30" r="1.5"/><circle cx="10" cy="-24" r="1.5"/><circle cx="-8" cy="-4" r="1.3"/><circle cx="12" cy="6" r="1.2"/></g>
      <g transform="translate(0 38)">
        <path d="M-18 0h12v20h-12Z" fill="#8a723a" stroke="#3a2f16" stroke-width="1.1"/>
        <path d="M4 0h12v20H4Z" fill="#8a723a" stroke="#3a2f16" stroke-width="1.1"/>
        <path d="M-18 20h12M4 20h12" stroke="#2a2312" stroke-width="2.4"/>
      </g>
      <g transform="translate(34 -34) rotate(8)">
        <path d="M0 -26a14 14 0 0 1 0 28c-9 0-9-28 0-28Z" fill="#9a7f42" stroke="#3a2f16" stroke-width="1.1"/>
        <path d="M-8 -14h16M-8 0h16M-8 14h16" stroke="#6e5a2c" stroke-width="1" opacity=".6"/>
        <path d="M0 -26v28" stroke="#c9ae62" stroke-width=".8" opacity=".5"/>
      </g>
      <path d="M-38 40c12 4 26 4 38 0s24-3 34 1" stroke="#0d1011" stroke-width="1.2" fill="none" opacity=".5"/>
    `)
  },

  apron: {
    label: 'APRON', name: 'the apron', place: 'in the apron pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-22 -64h44" stroke="var(--wood)" stroke-width="3.4"/>
      <path d="M-22 -64l22 8 22-8" stroke="var(--metal-hi)" stroke-width="1.6" fill="none" opacity=".5"/>
      <path d="M-20 -56c-2 8-2 14-2 20l6 4 2-22M20 -56c2 8 2 14 2 20l-6 4-2-22" fill="#c9c0a9" opacity=".8" stroke="#3a3328" stroke-width=".9"/>
      <path d="M-16 -32h32l6 58H-22Z" fill="#cfc6af" opacity=".82" stroke="#3a3328" stroke-width="1.1"/>
      <rect x="-14" y="-24" width="28" height="16" rx="2" fill="#bfb59c" opacity=".7" stroke="#3a3328" stroke-width=".8"/>
      <path d="M-12 -20c8 3 16 3 24 0" stroke="#8a7f68" stroke-width="1" fill="none" opacity=".6"/>
      <path d="M-6 4c4 2 8 2 12 0" stroke="#8a7f68" stroke-width="1" fill="none" opacity=".4"/>
      <path d="M-22 26h44" stroke="#a89d84" stroke-width="1.2" opacity=".6"/>
      <path d="M-19 18c-2 8-1 16 2 22M19 18c2 8 1 16-2 22" stroke="#a89d84" stroke-width="1" fill="none" opacity=".5"/>
      <g transform="translate(0 2)">
        <path d="M-8 -20h16v9h-16Z" fill="#8a7f68" opacity=".55" stroke="#4a4234" stroke-width=".7"/>
        <path d="M-8 -11h16l3 20h-22Z" fill="#b5aa91" opacity=".8" stroke="#4a4234" stroke-width=".8"/>
        <path d="M0 -2l5 7-5 7-5-7Z" fill="#6b614c" opacity=".5"/>
      </g>
      <path d="M-14 58c4 2 8 3 14 3s10-1 14-3" stroke="#e2d8c3" stroke-width=".8" fill="none" opacity=".25"/>
    `)
  },

  stole: {
    label: 'STOLE', name: 'the fur stole', place: 'in the stole folds',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-34 -46h68l-4 54c-10 8-22 10-30 10s-20-2-30-10Z" fill="var(--wood)" stroke="#160f0a" stroke-width="1.2"/>
      <path d="M-34 -46h68l-4 54c-10 8-22 10-30 10s-20-2-30-10Z" fill="#2a1b22" opacity=".3"/>
      <path d="M-30 -40c-4 10 4 18 14 16s12 10 22 8 14-10 20-6l2 24c-10 8-20 10-28 10s-18-2-28-10Z" fill="#4a2c33" stroke="#1a1012" stroke-width="1.1"/>
      <path d="M-24 -34c8 6 18 4 24 10s10 12 18 8M-16 -20c6 6 14 6 20 12" stroke="#6b4149" stroke-width="1" fill="none" opacity=".6"/>
      <g fill="#7c4a52" opacity=".45">
        <ellipse cx="-16" cy="-28" rx="6" ry="3" transform="rotate(-24 -16 -28)"/>
        <ellipse cx="4" cy="-22" rx="6" ry="3" transform="rotate(16 4 -22)"/>
        <ellipse cx="20" cy="-30" rx="5" ry="2.6" transform="rotate(-12 20 -30)"/>
        <ellipse cx="-8" cy="-12" rx="5.4" ry="2.8" transform="rotate(22 -8 -12)"/>
      </g>
      <path d="M-8 14c6 2 12 2 18 0" stroke="#8a5a62" stroke-width="1" fill="none" opacity=".4"/>
      <g transform="translate(28 -20)">
        <circle r="7" fill="var(--metal-hi)" opacity=".3" stroke="var(--metal-hi)" stroke-width=".9"/>
        <circle r="3" fill="#d9c9a6" opacity=".5"/>
      </g>
      <path d="M-34 24c14 6 32 8 46 4" stroke="#1a1012" stroke-width="1" fill="none" opacity=".4"/>
    `)
  },

  uniform: {
    label: 'UNIFORM', name: 'the uniform coat', place: 'in the uniform pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-26 -60l26 8 26-8" stroke="var(--metal-hi)" stroke-width="1.6" fill="none" opacity=".5"/>
      <path d="M-26 -60v-8M26 -60v-8" stroke="var(--metal)" stroke-width="1.4" opacity=".4"/>
      <path d="M-24 -56c-10 8-13 30-11 52l14 18 4-36 4 36 14-18c2-22-1-44-11-52-4-4-10-4-14 0Z" fill="#26313d" stroke="#0e1318" stroke-width="1.2"/>
      <path d="M-12 -52l-4 30M12 -52l4 30" stroke="#3d4d5c" stroke-width="1" opacity=".7"/>
      <path d="M-9 -56l9 14 9-14" fill="#141b22" opacity=".7"/>
      <path d="M-9 -56l9 14 9-14" fill="none" stroke="#4a5d6e" stroke-width=".9"/>
      <g fill="var(--metal-hi)" opacity=".75">
        <circle cx="-4" cy="-30" r="1.7"/><circle cx="-4" cy="-20" r="1.7"/><circle cx="-4" cy="-10" r="1.7"/>
      </g>
      <path d="M15 -34l10 5" stroke="var(--accent)" stroke-width="1.4" opacity=".6"/>
      <g transform="translate(15 -40)">
        <path d="M-7 0l7-4 7 4v8l-7 4-7-4Z" fill="#8a7a4a" opacity=".5" stroke="#d9c48c" stroke-width=".7"/>
        <path d="M0 -3v10M-5 1h10" stroke="#e6d8b8" stroke-width=".8" opacity=".65"/>
      </g>
      <g transform="translate(-24 -66) rotate(-5)">
        <path d="M-15 -6h30l-3 8c-8 3-16 3-24 0Z" fill="#1b242e" stroke="#0c1116" stroke-width="1"/>
        <path d="M-15 -6c4-6 26-6 30 0" fill="#26313d" stroke="#0c1116" stroke-width="1"/>
        <path d="M-16 -5h32" stroke="#0c1116" stroke-width="1.4"/>
        <circle cx="0" cy="-9" r="2" fill="var(--metal-hi)" opacity=".6"/>
      </g>
    `)
  },

  vestment: {
    label: 'VESTMENT', name: 'the vestment', place: 'in the vestment folds',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-30 -60h60" stroke="var(--wood)" stroke-width="2.4"/>
      <path d="M-14 -60v-8M14 -60v-8" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".5"/>
      <path d="M-28 -54c-10 12-12 36-9 60l15 18 4-44 4 44 15-18c3-24 0-48-9-60-5-6-16-6-20 0Z" fill="#5a2a2a" stroke="#1c0c0e" stroke-width="1.2"/>
      <path d="M-19 -52c2 20 1 44-2 62M19 -52c-2 20-1 44 2 62" stroke="#7a3a36" stroke-width="1" opacity=".6"/>
      <path d="M-8 -54l8 24 8-24" fill="#3d191c" opacity=".6"/>
      <path d="M-8 -54l8 24 8-24" fill="none" stroke="var(--accent)" stroke-width="1.1" opacity=".55"/>
      <g transform="translate(0 -14)">
        <path d="M0 -12v24M-9 -3h18" stroke="var(--accent)" stroke-width="2.2" opacity=".8"/>
        <circle r="3.4" fill="none" stroke="var(--accent)" stroke-width="1.2" opacity=".6"/>
      </g>
      <path d="M-24 34c10 5 24 6 34 2" stroke="var(--accent)" stroke-width="1" fill="none" opacity=".3"/>
      <path d="M-20 42c7 4 18 4 25 1" stroke="var(--accent)" stroke-width=".8" fill="none" opacity=".22"/>
      <g transform="translate(0 30)">
        <path d="M-6 0h12v12H-6Z" fill="#2a1416" opacity=".7"/>
        <path d="M0 0v12M-6 4h12" stroke="var(--accent)" stroke-width=".8" opacity=".4"/>
      </g>
    `)
  },

  smock: {
    label: 'SMOCK', name: 'the work smock', place: 'in the smock pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-34 -58h68" stroke="var(--wood)" stroke-width="3"/>
      <path d="M-10 -58v-9M12 -58v-9" stroke="var(--metal-hi)" stroke-width="2" opacity=".5"/>
      <path d="M-26 -50c-8 10-10 30-8 48l12 16 4-34 4 34 13-16c2-18 0-38-8-48-5-5-13-5-17 0Z" fill="#6a6a5e" stroke="#22221c" stroke-width="1.2"/>
      <path d="M-17 -48c2 16 1 34-1 48M17 -48c-2 16-1 34 1 48" stroke="#4a4a40" stroke-width="1" opacity=".6"/>
      <path d="M-8 -50l8 18 8-18" fill="#3d3d34" opacity=".5"/>
      <rect x="-16" y="-26" width="30" height="18" rx="2" fill="#555548" opacity=".6" stroke="#31312a" stroke-width=".8"/>
      <path d="M-12 -21c8 3 16 3 22 0" stroke="#8a8a76" stroke-width=".8" fill="none" opacity=".5"/>
      <g transform="translate(0 4)">
        <rect x="-7" y="-10" width="15" height="10" rx="1" fill="#8a7b60" opacity=".6" stroke="#31312a" stroke-width=".7"/>
        <path d="M-3 -10v-5h4v5" stroke="#8a7b60" stroke-width="1" fill="none"/>
      </g>
      <g fill="#3d3d34" opacity=".5"><circle cx="-16" cy="8" r="1.2"/><circle cx="12" cy="16" r="1"/><circle cx="-6" cy="30" r="1.1"/></g>
    `)
  },

  labCoat: {
    label: 'LAB COAT', name: 'the lab coat', place: 'in the lab coat pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-28 -62h56" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".5"/>
      <path d="M-28 -62v-8M28 -62v-8" stroke="var(--metal)" stroke-width="1.4" opacity=".4"/>
      <path d="M-24 -56c-9 10-11 32-9 52l13 18 4-36 4 36 13-18c2-20 0-42-9-52-4-4-12-4-16 0Z" fill="#d6d2c2" opacity=".82" stroke="#4a4438" stroke-width="1.1"/>
      <path d="M-12 -54l-3 32M12 -54l3 32" stroke="#a8a493" stroke-width="1" opacity=".7"/>
      <path d="M-8 -56l8 15 8-15" fill="none" stroke="#8a867a" stroke-width="1"/>
      <g transform="translate(16 -18)">
        <rect x="-7" y="-9" width="16" height="20" rx="1" fill="#c9c4b2" opacity=".9" stroke="#5a5448" stroke-width=".8"/>
        <path d="M-3 -9v-4h7v4" stroke="#5a5448" stroke-width="1" fill="none"/>
        <path d="M-4 -3h10M-4 2h10M-4 7h7" stroke="#8a867a" stroke-width=".6"/>
      </g>
      <g transform="translate(-16 8)">
        <path d="M-5 -10h10v20H-5Z" fill="#b5b0a0" opacity=".5" stroke="#6a6456" stroke-width=".7"/>
        <path d="M0 -10v20" stroke="#6a6456" stroke-width="1.4"/>
        <ellipse cy="12" rx="7" ry="3" fill="#8a867a" opacity=".4"/>
      </g>
      <path d="M-22 30c10 4 30 4 40-1" stroke="#8a867a" stroke-width=".8" fill="none" opacity=".4"/>
      <g fill="#8a3e3e" opacity=".5"><circle cx="8" cy="24" r="1.4"/><circle cx="12" cy="27" r=".9"/></g>
    `)
  },

  coveralls: {
    label: 'COVERALLS', name: 'the coveralls', place: 'in the coveralls pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-34 -60h68" stroke="var(--metal-hi)" stroke-width="2" opacity=".45"/>
      <path d="M-18 -60v-7M18 -60v-7" stroke="var(--metal)" stroke-width="1.6" opacity=".4"/>
      <path d="M-26 -54c-9 10-11 34-8 54l13 18 5-40 4 40 14-18c2-20 0-44-9-54-5-5-14-5-19 0Z" fill="#3d4a52" stroke="#141a1d" stroke-width="1.2"/>
      <path d="M-17 -52c2 18 1 40-1 54M17 -52c-2 18-1 40 1 54" stroke="#55646c" stroke-width="1" opacity=".6"/>
      <path d="M-10 -54l10 16 10-16" fill="none" stroke="#6b7a80" stroke-width="1"/>
      <g fill="var(--metal-hi)" opacity=".55"><circle cx="-5" cy="-30" r="1.5"/><circle cx="-5" cy="-20" r="1.5"/><circle cx="-5" cy="-10" r="1.5"/></g>
      <rect x="-18" y="-4" width="16" height="13" rx="1" fill="#55646c" opacity=".55" stroke="#1a2226" stroke-width=".7"/>
      <rect x="4" y="-4" width="16" height="13" rx="1" fill="#55646c" opacity=".55" stroke="#1a2226" stroke-width=".7"/>
      <path d="M-14 0h8M8 0h8" stroke="#8a9aa0" stroke-width=".8" opacity=".5"/>
      <g transform="translate(0 -66) rotate(-4)">
        <path d="M-15 -4h30l-2 7c-8 4-18 4-26 0Z" fill="#33424a" stroke="#101619" stroke-width=".9"/>
        <path d="M-15 -4c4-6 26-6 30 0" fill="#3d4a52" stroke="#101619" stroke-width=".9"/>
        <path d="M-16 -3h32" stroke="#101619" stroke-width="1.2"/>
      </g>
      <path d="M-20 32c8 4 24 5 34 1" stroke="#6b7a80" stroke-width=".8" fill="none" opacity=".35"/>
    `)
  },

  guard: {
    label: 'GUARD COAT', name: 'the guard coat', place: 'in the guard coat pocket',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <path d="M-30 -60h60" stroke="var(--wood)" stroke-width="2.6"/>
      <path d="M-18 -60v-8M18 -60v-8" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".5"/>
      <path d="M-24 -54c-9 10-11 30-9 50l14 18 4-36 4 36 14-18c2-20 0-40-9-50-5-5-13-5-18 0Z" fill="#2c3a2e" stroke="#101610" stroke-width="1.2"/>
      <path d="M-13 -52l-3 30M13 -52l3 30" stroke="#44584a" stroke-width="1" opacity=".6"/>
      <path d="M-9 -54l9 14 9-14" fill="#1a241d" opacity=".6"/>
      <g transform="translate(14 -28)">
        <path d="M-6 0l6-4 6 4v8l-6 4-6-4Z" fill="#8a7a4a" opacity=".55" stroke="#d9c48c" stroke-width=".7"/>
        <path d="M0 -3v10M-5 1h10" stroke="#d9c48c" stroke-width=".7" opacity=".6"/>
      </g>
      <path d="M-18 6h10v14h-10Z" fill="#223026" opacity=".7" stroke="#101610" stroke-width=".7"/>
      <g transform="translate(0 -68) rotate(-4)">
        <path d="M-16 -5h32l-3 8c-9 3-17 3-26 0Z" fill="#223026" stroke="#0c110d" stroke-width=".9"/>
        <path d="M-16 -5c4-6 28-6 32 0" fill="#2c3a2e" stroke="#0c110d" stroke-width=".9"/>
        <path d="M-17 -4h34" stroke="#0c110d" stroke-width="1.3"/>
        <circle cx="0" cy="-8" r="1.8" fill="#d9c48c" opacity=".6"/>
      </g>
      <path d="M-20 30c8 4 24 4 34 1" stroke="#44584a" stroke-width=".8" fill="none" opacity=".4"/>
    `)
  },

  /* ---------------- safes, tills & strongboxes ---------------- */
  wallSafe: {
    label: 'SAFE', name: 'the wall safe', place: 'inside the wall safe',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <rect x="-46" y="-42" width="92" height="84" rx="2" fill="#0a0907" opacity=".5" filter="url(#rs-blur2)"/>
      <rect x="-43" y="-39" width="86" height="78" fill="var(--wall-hi)" opacity=".35" stroke="#0e0d0b" stroke-width="1.4"/>
      <rect x="-36" y="-32" width="72" height="64" fill="#191b1a" stroke="#4a4d48" stroke-width="1.4"/>
      <path d="M-36 -32h72v10h-72Z" fill="#2b2e2c" opacity=".8"/>
      <g transform="translate(-6 0)">
        <circle r="17" fill="#2b2e2c" stroke="url(#rs-steel)" stroke-width="2"/>
        <circle r="11" fill="#1a1c1b" stroke="#5b605c" stroke-width="1"/>
        <g stroke="#c9c4b2" stroke-width="1" opacity=".6">
          <path d="M0 -9v18M-9 0h18M-6 -6l12 12M6 -6l-12 12"/>
        </g>
        <circle r="3" fill="#8a8f88" opacity=".7"/>
      </g>
      <g transform="translate(22 0)">
        <rect x="-5" y="-15" width="10" height="18" rx="2" fill="#2b2e2c" stroke="#5b605c" stroke-width=".9"/>
        <path d="M0 -12v12" stroke="#8a8f88" stroke-width="2" opacity=".6"/>
      </g>
      <circle cx="35" cy="22" r="2.4" fill="url(#rs-brass)"/>
      <path d="M-36 32h72" stroke="#0e0d0b" stroke-width="1.2" opacity=".6"/>
      <path d="M-33 -29h66" stroke="#6b706a" stroke-width=".9" opacity=".25"/>
      <g fill="#c9a15e" opacity=".2"><circle cx="-38" cy="-34" r="1.3"/><circle cx="38" cy="-34" r="1.3"/></g>
    `)
  },

  floorSafe: {
    label: 'SAFE', name: 'the floor safe', place: 'inside the floor safe',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="34" rx="48" ry="13" fill="#000" opacity=".55" filter="url(#rs-blur)"/>
      <rect x="-40" y="-14" width="80" height="48" rx="2" fill="#26292a" stroke="#0d0f0f" stroke-width="1.4"/>
      <rect x="-40" y="-30" width="80" height="20" rx="2" fill="#313536" stroke="#0d0f0f" stroke-width="1.4"/>
      <path d="M-40 -10h80" stroke="#0d0f0f" stroke-width="1.6" opacity=".8"/>
      <g transform="translate(-10 -1)">
        <circle r="13" fill="#2b2e2c" stroke="url(#rs-steel)" stroke-width="1.8"/>
        <circle r="8" fill="#1a1c1b" stroke="#5b605c" stroke-width=".9"/>
        <path d="M0 -7v14M-7 0h14M-4 -4l8 8M4 -4l-8 8" stroke="#c9c4b2" stroke-width=".8" opacity=".55"/>
        <circle r="2.2" fill="#8a8f88" opacity=".7"/>
      </g>
      <g transform="translate(20 0)"><rect x="-4" y="-11" width="8" height="14" rx="2" fill="#2b2e2c" stroke="#5b605c" stroke-width=".8"/><path d="M0 -9v9" stroke="#8a8f88" stroke-width="1.8" opacity=".6"/></g>
      <path d="M-40 26h80" stroke="#0d0f0f" stroke-width="1.4" opacity=".7"/>
      <g fill="var(--metal-hi)" opacity=".22"><circle cx="-34" cy="-22" r="1.4"/><circle cx="34" cy="-22" r="1.4"/><circle cx="-34" cy="34" r="1.4"/><circle cx="34" cy="34" r="1.4"/></g>
      <path d="M-30 -30h60" stroke="#6b706a" stroke-width=".8" opacity=".22"/>
    `)
  },

  strongbox: {
    label: 'STRONGBOX', name: 'the strongbox', place: 'inside the strongbox',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="28" rx="50" ry="12" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-42" y="-14" width="84" height="42" rx="3" fill="var(--wood)" stroke="#140e09" stroke-width="1.4"/>
      <path d="M-42 -14c0-16 14-24 42-24s42 8 42 24Z" fill="var(--wood)" stroke="#140e09" stroke-width="1.4"/>
      <path d="M-42 -14h84" stroke="#0f0b07" stroke-width="1.6"/>
      <g stroke="#c9a15e" stroke-width="2.2" opacity=".55"><path d="M-32 -12v36M32 -12v36"/></g>
      <g transform="translate(0 8)">
        <rect x="-10" y="-10" width="20" height="17" rx="2" fill="#2b2a24" stroke="#8a8f88" stroke-width="1.1"/>
        <path d="M0 -10v-7a6 6 0 0 1 12 0" fill="none" stroke="#8a8f88" stroke-width="2"/>
        <circle cy="-2" r="1.6" fill="#d9c48c" opacity=".7"/>
        <path d="M0 1v4" stroke="#d9c48c" stroke-width="1.2" opacity=".5"/>
      </g>
      <path d="M-30 14h60" stroke="#0f0b07" stroke-width="1" opacity=".5"/>
      <g fill="#c9a15e" opacity=".35"><circle cx="-38" cy="-16" r="1.3"/><circle cx="38" cy="-16" r="1.3"/></g>
      <path d="M-36 20c22 4 48 3 70-1" stroke="var(--wood-hi)" stroke-width="1" fill="none" opacity=".25"/>
    `)
  },

  register: {
    label: 'REGISTER', name: 'the cash register', place: 'in the register drawer',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="36" rx="46" ry="12" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-34" y="10" width="68" height="26" rx="3" fill="var(--wood)" stroke="#140e09" stroke-width="1.2"/>
      <path d="M-30 10V-8c0-16 12-26 30-26s30 10 30 26v18Z" fill="#2b2a24" stroke="#0e0c09" stroke-width="1.4"/>
      <path d="M-24 -8c0-12 9-20 24-20s24 8 24 20" fill="#3d3a30" opacity=".5"/>
      <g transform="translate(0 -14)">
        <rect x="-18" y="-10" width="36" height="16" rx="2" fill="#0e1210" stroke="#6b6a5c" stroke-width="1"/>
        <text y="3" text-anchor="middle" font-family="Oswald, sans-serif" font-size="9" letter-spacing="1.6" fill="#d9c48c" opacity=".8">$0.00</text>
      </g>
      <g fill="#c9bda6" opacity=".6">
        <rect x="-28" y="-2" width="6" height="4" rx="1"/><rect x="-20" y="-2" width="6" height="4" rx="1"/><rect x="-12" y="-2" width="6" height="4" rx="1"/>
        <rect x="2" y="-2" width="6" height="4" rx="1"/><rect x="10" y="-2" width="6" height="4" rx="1"/><rect x="18" y="-2" width="6" height="4" rx="1"/>
      </g>
      <path d="M-26 12h52M-26 22h52" stroke="#c9a15e" stroke-width="1.2" opacity=".35"/>
      <g transform="translate(26 22)"><rect x="-6" y="-8" width="12" height="12" rx="1" fill="#22211c" stroke="#8a8f88" stroke-width=".8"/><path d="M0 -8v-4M-4 -4h8" stroke="#8a8f88" stroke-width="1" opacity=".6"/></g>
      <path d="M-34 34h68" stroke="#0e0c09" stroke-width="1.2" opacity=".6"/>
    `)
  },

  locker: {
    label: 'LOCKER', name: 'the locker', place: 'inside the locker',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="58" rx="40" ry="10" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-32" y="-62" width="64" height="118" rx="2" fill="#3d4a4e" stroke="#101516" stroke-width="1.5"/>
      <rect x="-28" y="-58" width="56" height="110" fill="#2b3639"/>
      <path d="M0 -58v110" stroke="#101516" stroke-width="1.4" opacity=".7"/>
      <g stroke="#a6b3b1" stroke-width="1.2" opacity=".3">
        <path d="M-22 -50v18M-16 -50v18M-10 -50v18M-4 -50v18M2 -50v18M8 -50v18M14 -50v18"/>
      </g>
      <rect x="-26" y="-24" width="22" height="8" rx="1" fill="#222b2d" stroke="#6b7a7a" stroke-width=".8"/>
      <rect x="4" y="-24" width="22" height="8" rx="1" fill="#222b2d" stroke="#6b7a7a" stroke-width=".8"/>
      <g fill="#c9bda6" opacity=".4"><rect x="-20" y="-14" width="10" height="3" rx="1"/><rect x="10" y="-14" width="10" height="3" rx="1"/></g>
      <path d="M-24 8h18M6 8h18" stroke="#6b7a7a" stroke-width="1" opacity=".4"/>
      <g transform="translate(-15 -2)"><circle r="2.4" fill="#8a8f88"/><rect x="-1" y="2" width="2" height="10" fill="#8a8f88" opacity=".55"/></g>
      <g transform="translate(15 -2)"><circle r="2.4" fill="#8a8f88"/><rect x="-1" y="2" width="2" height="10" fill="#8a8f88" opacity=".55"/></g>
      <g transform="translate(0 -54)">
        <rect x="-26" y="-5" width="52" height="7" rx="2" fill="#48585c" stroke="#101516" stroke-width=".8"/>
        <path d="M-18 -2h36" stroke="#a6b3b1" stroke-width=".8" opacity=".3"/>
      </g>
      <path d="M-32 50h64" stroke="#0e1213" stroke-width="1.4" opacity=".7"/>
    `)
  },

  cashBox: {
    label: 'CASH BOX', name: 'the cash box', place: 'inside the cash box',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="24" rx="38" ry="10" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-34" y="-6" width="68" height="30" rx="2" fill="#2b2e2c" stroke="#101211" stroke-width="1.2"/>
      <path d="M-34 -6c0-10 8-16 34-16s34 6 34 16Z" fill="#3a3f3d" stroke="#101211" stroke-width="1.2"/>
      <path d="M-34 -6h68" stroke="#0e100f" stroke-width="1.4"/>
      <path d="M-22 -10h44" stroke="#6b706a" stroke-width=".9" opacity=".3"/>
      <g transform="translate(0 6)">
        <rect x="-9" y="-7" width="18" height="13" rx="1" fill="#c9bda6" opacity=".8"/>
        <path d="M-5 -7v-4h5v4M-6 0h12M-6 3h9" stroke="#6b5a3c" stroke-width=".9" fill="none"/>
      </g>
      <g fill="#8a8f88" opacity=".5"><circle cx="-28" cy="-2" r="1.2"/><circle cx="28" cy="-2" r="1.2"/></g>
      <path d="M-28 16h56" stroke="#0e100f" stroke-width="1" opacity=".5"/>
      <g transform="translate(24 -16)"><circle r="2.2" fill="url(#rs-brass)"/><path d="M0 2v4" stroke="#8a8f88" stroke-width="1" opacity=".4"/></g>
    `)
  },

  cage: {
    label: 'CAGE', name: 'the cashier cage', place: 'inside the cashier cage',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <rect x="-56" y="-54" width="112" height="108" rx="2" fill="#0d0c0a" opacity=".55" filter="url(#rs-blur2)"/>
      <rect x="-56" y="-54" width="112" height="108" fill="var(--wood)" stroke="#140e09" stroke-width="1.6"/>
      <rect x="-46" y="-44" width="92" height="66" fill="#171a19" stroke="#4a4232" stroke-width="1.2"/>
      <g stroke="var(--metal-hi)" stroke-width="1.6" opacity=".55">
        <path d="M-38 -44v66M-24 -44v66M-10 -44v66M4 -44v66M18 -44v66M32 -44v66"/>
        <path d="M-46 -30h92M-46 -10h92"/>
      </g>
      <path d="M-46 22h92" stroke="var(--wood-hi)" stroke-width="2" opacity=".4"/>
      <rect x="-30" y="26" width="60" height="16" rx="2" fill="#0f1211" stroke="#4a4232" stroke-width="1"/>
      <path d="M-22 34h44" stroke="#c9a15e" stroke-width="1" opacity=".35"/>
      <g transform="translate(0 34)">
        <ellipse cx="-16" cy="0" rx="8" ry="4" fill="#d9c48c" opacity=".25"/>
        <rect x="8" y="-4" width="14" height="8" rx="1" fill="#8a744f" opacity=".4"/>
      </g>
      <g transform="translate(-46 0)"><rect x="-4" y="-12" width="8" height="24" rx="2" fill="url(#rs-brass)" opacity=".55"/></g>
      <g transform="translate(46 0)"><rect x="-4" y="-12" width="8" height="24" rx="2" fill="url(#rs-brass)" opacity=".55"/></g>
      <g fill="var(--metal-hi)" opacity=".25"><circle cx="-50" cy="-48" r="1.4"/><circle cx="50" cy="-48" r="1.4"/></g>
      <path d="M-52 44c34 5 70 4 100-1" stroke="#0e0b08" stroke-width="1.4" fill="none" opacity=".5"/>
    `)
  },

  trunk: {
    label: 'TRUNK', name: 'the steamer trunk', place: 'inside the steamer trunk',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="32" rx="58" ry="14" fill="#000" opacity=".55" filter="url(#rs-blur)"/>
      <rect x="-52" y="-18" width="104" height="46" rx="3" fill="#3d2c1d" stroke="#140e09" stroke-width="1.4"/>
      <path d="M-52 -18c0-14 18-22 52-22s52 8 52 22Z" fill="#463321" stroke="#140e09" stroke-width="1.4"/>
      <path d="M-52 -18h104" stroke="#120c08" stroke-width="1.6"/>
      <g stroke="#c9a15e" stroke-width="2" opacity=".5"><path d="M-34 -17v45M34 -17v45"/></g>
      <g fill="#c9a15e" opacity=".4"><circle cx="-35" cy="-4" r="2"/><circle cx="35" cy="-4" r="2"/></g>
      <g transform="translate(0 -4)">
        <rect x="-9" y="-8" width="18" height="14" rx="2" fill="#2b2a24" stroke="#8a8f88" stroke-width="1"/>
        <path d="M0 2v5" stroke="#d9c48c" stroke-width="1.2" opacity=".6"/>
        <rect x="-4" y="-3" width="8" height="4" fill="#d9c48c" opacity=".4"/>
      </g>
      <g transform="translate(-20 -34)" opacity=".55">
        <rect x="-12" y="-5" width="24" height="10" rx="1" fill="#d9c9a6"/>
        <path d="M-18 0h-8M18 0h8" stroke="#d9c9a6" stroke-width="1"/>
      </g>
      <g fill="#8a7a5c" opacity=".3"><path d="M-46 -8h12v10h-12zM20 -8h14v10H20z"/></g>
      <path d="M-52 22c32 5 72 4 104-1" stroke="#1a120b" stroke-width="1.2" fill="none" opacity=".5"/>
    `)
  },

  poorBox: {
    label: 'POOR BOX', name: 'the poor box', place: 'inside the poor box',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="34" rx="32" ry="10" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-12" y="-4" width="24" height="34" rx="2" fill="var(--wood)" stroke="#140e09" stroke-width="1.2"/>
      <rect x="-26" y="-36" width="52" height="34" rx="3" fill="var(--wood)" stroke="#140e09" stroke-width="1.3"/>
      <path d="M-26 -30h52M-26 -12h52" stroke="var(--wood-hi)" stroke-width="1.2" opacity=".3"/>
      <path d="M-4 -36v34M6 -36v34" stroke="#0f0a07" stroke-width="1" opacity=".5"/>
      <g transform="translate(0 -22)">
        <rect x="-14" y="-6" width="28" height="4" rx="1" fill="#0c0a08"/>
        <path d="M-3 -6l2-6 4 2-2 4" stroke="#d9c48c" stroke-width="1.3" fill="none" opacity=".55"/>
      </g>
      <g transform="translate(0 -4)">
        <path d="M-2 -8v-6M-2 -12c-4-3-7 0-5 3s5 2 5 2 5 0 5 3-4 5-5 3" stroke="#d9c48c" stroke-width="1.3" fill="none" opacity=".55"/>
      </g>
      <path d="M-22 8c8 2 14 2 22 0s14-1 20 1" stroke="var(--wood-hi)" stroke-width="1" fill="none" opacity=".25"/>
      <path d="M-12 30h24" stroke="#0f0a07" stroke-width="1.2" opacity=".6"/>
    `)
  },

  displayCase: {
    label: 'DISPLAY', name: 'the display case', place: 'inside the display case',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="38" rx="62" ry="14" fill="#000" opacity=".55" filter="url(#rs-blur)"/>
      <rect x="-58" y="8" width="116" height="30" rx="2" fill="var(--wood)" stroke="#140e09" stroke-width="1.4"/>
      <rect x="-58" y="8" width="116" height="8" fill="var(--wood-hi)" opacity=".24"/>
      <rect x="-54" y="-40" width="108" height="48" fill="#1a2223" opacity=".8" stroke="#4a4232" stroke-width="1"/>
      <g opacity=".7">
        <path d="M-40 8V-14l9-9 9 9V8Z" fill="#8a6a3e" opacity=".55" stroke="#c9b27c" stroke-width=".8"/>
        <circle cx="-10" cy="-2" r="10" fill="#a88a52" opacity=".5" stroke="#d9c48c" stroke-width=".8"/>
        <path d="M-10 -10v-6M2 -2h6" stroke="#d9c48c" stroke-width="1.2" opacity=".5"/>
        <path d="M16 8v-16h14V8Z" fill="#5a4a34" opacity=".65" stroke="#a58e60" stroke-width=".8"/>
        <path d="M36 8V-8l6-6 6 6V8Z" fill="#4a4034" opacity=".6" stroke="#a58e60" stroke-width=".8"/>
      </g>
      <path d="M-54 -40h108v48h-108Z" fill="#cfe0e0" opacity=".06"/>
      <path d="M-54 -40L54 8M54 -40L-54 8" stroke="#d7e3e2" stroke-width="1" opacity=".1"/>
      <path d="M-54 8h108" stroke="url(#rs-brass)" stroke-width="2" opacity=".5"/>
      <g transform="translate(0 -44)">
        <path d="M-60 4h120" stroke="#d9c48c" stroke-width="1" opacity=".35"/>
        <path d="M-54 4v-4M0 4v-4M54 4v-4" stroke="#d9c48c" stroke-width=".8" opacity=".3"/>
      </g>
      <g fill="var(--metal-hi)" opacity=".22"><circle cx="-50" cy="16" r="1.3"/><circle cx="50" cy="16" r="1.3"/></g>
    `)
  },

  cabinet: {
    label: 'CABINET', name: 'the steel cabinet', place: 'inside the steel cabinet',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="52" rx="38" ry="10" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-34" y="-56" width="68" height="106" rx="2" fill="#4a4f4c" stroke="#101312" stroke-width="1.4"/>
      <rect x="-30" y="-52" width="60" height="98" fill="#3a3f3d"/>
      <g stroke="#171a19" stroke-width="2">
        <path d="M-30 -22h60M-30 12h60"/>
      </g>
      <g fill="#1a1d1c" stroke="#6b706a" stroke-width=".7">
        <rect x="-25" y="-47" width="20" height="7" rx="2"/><rect x="4" y="-47" width="20" height="7" rx="2"/>
        <rect x="-25" y="-17" width="20" height="7" rx="2"/><rect x="4" y="-17" width="20" height="7" rx="2"/>
        <rect x="-25" y="17" width="20" height="7" rx="2"/><rect x="4" y="17" width="20" height="7" rx="2"/>
      </g>
      <g transform="translate(0 -12)">
        <rect x="-4" y="-3" width="8" height="6" rx="1" fill="#8a8f88" opacity=".65"/>
        <path d="M0 3v6" stroke="#8a8f88" stroke-width="1.4" opacity=".4"/>
      </g>
      <g fill="#c9bda6" opacity=".28"><rect x="-18" y="-38" width="10" height="3" rx="1"/><rect x="8" y="-38" width="10" height="3" rx="1"/></g>
      <path d="M-34 40h68" stroke="#101312" stroke-width="1.2" opacity=".7"/>
      <g fill="var(--metal-hi)" opacity=".2"><circle cx="-29" cy="-51" r="1.2"/><circle cx="29" cy="-51" r="1.2"/></g>
    `)
  },

  cardCatalog: {
    label: 'CARD FILE', name: 'the card catalog', place: 'inside the card catalog',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="48" rx="52" ry="12" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-48" y="-48" width="96" height="92" rx="2" fill="var(--wood)" stroke="#140e09" stroke-width="1.4"/>
      <rect x="-44" y="-44" width="88" height="84" fill="#3a2a1c" opacity=".75"/>
      <g fill="#21170f" stroke="#5a4430" stroke-width=".8">
        <rect x="-38" y="-38" width="24" height="16" rx="1"/><rect x="-10" y="-38" width="24" height="16" rx="1"/><rect x="18" y="-38" width="24" height="16" rx="1"/>
        <rect x="-38" y="-18" width="24" height="16" rx="1"/><rect x="-10" y="-18" width="24" height="16" rx="1"/><rect x="18" y="-18" width="24" height="16" rx="1"/>
        <rect x="-38" y="2" width="24" height="16" rx="1"/><rect x="-10" y="2" width="24" height="16" rx="1"/><rect x="18" y="2" width="24" height="16" rx="1"/>
        <rect x="-38" y="22" width="24" height="16" rx="1"/><rect x="-10" y="22" width="24" height="16" rx="1"/><rect x="18" y="22" width="24" height="16" rx="1"/>
      </g>
      <g fill="#c9bda6" opacity=".42">
        <circle cx="-26" cy="-30" r="1.6"/><circle cx="2" cy="-30" r="1.6"/><circle cx="30" cy="-30" r="1.6"/>
        <circle cx="-26" cy="-10" r="1.6"/><circle cx="2" cy="-10" r="1.6"/><circle cx="30" cy="-10" r="1.6"/>
        <circle cx="-26" cy="10" r="1.6"/><circle cx="2" cy="10" r="1.6"/><circle cx="30" cy="10" r="1.6"/>
        <circle cx="-26" cy="30" r="1.6"/><circle cx="2" cy="30" r="1.6"/><circle cx="30" cy="30" r="1.6"/>
      </g>
      <g fill="none" stroke="#d9c48c" stroke-width=".6" opacity=".3">
        <rect x="-32" y="-34" width="12" height="7"/><rect x="-4" y="-34" width="12" height="7"/><rect x="24" y="-34" width="12" height="7"/>
        <rect x="-32" y="-14" width="12" height="7"/><rect x="-4" y="-14" width="12" height="7"/><rect x="24" y="-14" width="12" height="7"/>
      </g>
      <path d="M-48 -44h96" stroke="var(--wood-hi)" stroke-width="2" opacity=".3"/>
      <path d="M-44 40h88" stroke="#0f0a07" stroke-width="1.2" opacity=".7"/>
      <g transform="translate(0 -50)">
        <rect x="-20" y="-4" width="40" height="6" rx="1" fill="#21170f" stroke="#5a4430" stroke-width=".7"/>
        <path d="M-12 -1h24" stroke="#d9c48c" stroke-width=".7" opacity=".35"/>
      </g>
    `)
  },

  filmCabinet: {
    label: 'FILM FILE', name: 'the film cabinet', place: 'inside the film cabinet',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="50" rx="46" ry="12" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-42" y="-50" width="84" height="96" rx="2" fill="#3a3f3d" stroke="#101312" stroke-width="1.4"/>
      <rect x="-38" y="-46" width="76" height="88" fill="#2b302e"/>
      <g stroke="#161a19" stroke-width="1.4"><path d="M-38 -18h76M-38 12h76"/></g>
      <g>
        <g transform="translate(-20 -32)">
          <circle r="13" fill="#171b1a" stroke="#6b706a" stroke-width="1.1"/>
          <circle r="4" fill="#0c0e0d" stroke="#8a8f88" stroke-width=".8"/>
          <circle r="9" fill="none" stroke="#5b605c" stroke-width=".8" stroke-dasharray="2 2"/>
        </g>
        <g transform="translate(12 -32)">
          <circle r="11" fill="#20241f" stroke="#6b706a" stroke-width="1.1"/>
          <circle r="3.4" fill="#0c0e0d" stroke="#8a8f88" stroke-width=".8"/>
        </g>
        <g transform="translate(-16 -4)">
          <circle r="11" fill="#1a1e1c" stroke="#6b706a" stroke-width="1.1"/>
          <circle r="3.4" fill="#0c0e0d" stroke="#8a8f88" stroke-width=".8"/>
        </g>
        <g transform="translate(16 -4)">
          <circle r="12" fill="#171b1a" stroke="#6b706a" stroke-width="1.1"/>
          <circle r="4" fill="#0c0e0d" stroke="#8a8f88" stroke-width=".8"/>
        </g>
        <g transform="translate(-18 24)">
          <rect x="-15" y="-6" width="30" height="12" rx="1" fill="#8a744f" opacity=".5" stroke="#c9b27c" stroke-width=".7"/>
          <path d="M-10 0h20" stroke="#d9c48c" stroke-width=".6" opacity=".45"/>
        </g>
        <g transform="translate(20 24)">
          <rect x="-12" y="-6" width="24" height="12" rx="1" fill="#6b5a3c" opacity=".5" stroke="#c9b27c" stroke-width=".7"/>
          <path d="M-7 0h14" stroke="#d9c48c" stroke-width=".6" opacity=".4"/>
        </g>
      </g>
      <g transform="translate(0 -14)"><rect x="-4" y="-3" width="8" height="6" rx="1" fill="#8a8f88" opacity=".55"/><path d="M0 3v6" stroke="#8a8f88" stroke-width="1.2" opacity=".35"/></g>
      <path d="M-38 36h76" stroke="#161a19" stroke-width="1.2" opacity=".7"/>
      <path d="M-38 -46h76" stroke="#6b706a" stroke-width=".8" opacity=".18"/>
    `)
  },

  till: {
    label: 'TILL', name: 'the open till', place: 'in the open till',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="26" rx="46" ry="11" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-42" y="4" width="84" height="22" rx="2" fill="var(--wood)" stroke="#140e09" stroke-width="1.2"/>
      <g transform="translate(0 4)">
        <rect x="-38" y="-16" width="76" height="20" rx="2" fill="#1a1d1c" stroke="#5b605c" stroke-width="1.2"/>
        <g fill="#c9bda6" opacity=".7">
          <rect x="-32" y="-14" width="18" height="16" rx="1"/>
          <rect x="-12" y="-14" width="18" height="16" rx="1"/>
          <rect x="8" y="-14" width="18" height="16" rx="1"/>
        </g>
        <g fill="#7a8a6a" opacity=".55">
          <rect x="-32" y="-14" width="18" height="5" rx="1"/>
          <rect x="-12" y="-14" width="18" height="5" rx="1"/>
          <rect x="8" y="-14" width="18" height="5" rx="1"/>
        </g>
        <g stroke="#8a7b60" stroke-width=".7" opacity=".5">
          <path d="M-32 -5h18M-12 -5h18M8 -5h18"/>
        </g>
        <g fill="#b5a06a" opacity=".5">
          <circle cx="-30" cy="-10" r="1.4"/><circle cx="-24" cy="-10" r="1.4"/><circle cx="-10" cy="-10" r="1.4"/><circle cx="14" cy="-10" r="1.4"/>
        </g>
      </g>
      <g transform="translate(0 -14)">
        <rect x="-38" y="-4" width="76" height="6" rx="2" fill="#2b2e2c" stroke="#5b605c" stroke-width=".9"/>
        <path d="M-30 -1h60" stroke="#8a8f88" stroke-width=".8" opacity=".3"/>
      </g>
      <g transform="translate(30 10)"><rect x="-6" y="-4" width="12" height="10" rx="1" fill="#22211c" stroke="#8a8f88" stroke-width=".8"/></g>
      <path d="M-42 20h84" stroke="#0e0c09" stroke-width="1.1" opacity=".6"/>
      <g fill="#d9c48c" opacity=".2"><circle cx="-34" cy="8" r="1"/><circle cx="34" cy="8" r="1"/></g>
    `)
  }
});

/* proper defaults used when a scene omits a station */
STATIONS.desk = STATIONS.writingDesk;
STATIONS.window = STATIONS.rainWindow;
STATIONS.coat = STATIONS.coatChair;
STATIONS.safe = STATIONS.wallSafe;
