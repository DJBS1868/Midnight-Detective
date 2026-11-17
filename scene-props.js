/* ============================================================
   MIDNIGHT DETECTIVE — AMBIENT PROPS (rooms & furniture)
   ============================================================ */

const PROPS = {
  rug: ({ x, y, w = 240, h = 170, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="${-w / 2 - 6}" y="${-h / 2 - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#000" opacity=".3" filter="url(#rs-blur)"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="2" fill="var(--rug)" opacity=".72" stroke="var(--rugLine, var(--rug-line))" stroke-width="1.4" stroke-opacity=".55"/>
    <rect x="${-w / 2 + 9}" y="${-h / 2 + 9}" width="${w - 18}" height="${h - 18}" fill="none" stroke="var(--rugLine, var(--rug-line))" stroke-width="1" opacity=".4"/>
    <path d="M${-w / 2 + 20} 0h${w - 40}M0 ${-h / 2 + 20}v${h - 40}" stroke="var(--rugLine, var(--rug-line))" stroke-width="1" opacity=".15"/>
    <path d="M${-w / 2 + 30} ${-h / 2 + 26}l18 18-18 18-18-18zM${w / 2 - 30} ${h / 2 - 26}l18-18 18 18-18 18z" fill="none" stroke="var(--rugLine, var(--rug-line))" opacity=".15"/>
    <rect x="${-w / 2 + 3}" y="${-h / 2 + 3}" width="${w - 6}" height="${h - 6}" rx="2" fill="none" stroke="#000" stroke-width="3" opacity=".18"/>
  `),

  bed: ({ x, y, r = 0, s = 1 }) => sceneG(x, y, s, r, `
    <ellipse cx="0" cy="32" rx="68" ry="20" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <rect x="-56" y="-76" width="112" height="152" rx="4" fill="var(--wood)" stroke="#1a110a" stroke-width="1.4"/>
    <rect x="-50" y="-70" width="100" height="138" rx="3" fill="#c9bda6" opacity=".22"/>
    <rect x="-50" y="-42" width="100" height="88" rx="3" fill="#4c3d31"/>
    <path d="M-50 -42h100v18h-100z" fill="#ded3bd" opacity=".3"/>
    <path d="M-50 -10h100M-50 20h100" stroke="#2b2119" stroke-width="1" opacity=".45"/>
    <rect x="-42" y="-68" width="36" height="17" rx="7" fill="#ded3bd" opacity=".4" transform="rotate(-3 -24 -60)"/>
    <rect x="6" y="-68" width="36" height="17" rx="7" fill="#ded3bd" opacity=".36" transform="rotate(2 24 -60)"/>
    <rect x="-56" y="-78" width="112" height="12" rx="3" fill="var(--wood-hi)" opacity=".4"/>
    <path d="M-56 44h112v14h-112z" fill="var(--wood)" opacity=".9"/>
    <circle cx="45" cy="62" r="5" fill="#1a1712" stroke="var(--metal-hi)" stroke-width="1" opacity=".65"/>
  `),

  cot: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="28" rx="58" ry="16" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
    <rect x="-46" y="-70" width="92" height="138" rx="2" fill="var(--metal)" stroke="#151515" stroke-width="1.4" opacity=".8"/>
    <rect x="-42" y="-64" width="84" height="126" rx="2" fill="#b9b09b" opacity=".18"/>
    <rect x="-42" y="-36" width="84" height="82" rx="2" fill="#4a4237" opacity=".75"/>
    <path d="M-42 -36h84v14h-84z" fill="#ded3bd" opacity=".22"/>
    <rect x="-34" y="-61" width="30" height="14" rx="6" fill="#ded3bd" opacity=".32"/>
    <path d="M-46 42h92M-40 -68v136M40 -68v136" stroke="var(--metal-hi)" stroke-width="1.5" opacity=".3"/>
  `),

  stand: ({ x, y, r = 0, lamp = true }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="18" rx="30" ry="8" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
    <rect x="-24" y="-15" width="48" height="34" rx="2" fill="var(--wood)" stroke="#1a110a"/>
    <rect x="-20" y="-11" width="40" height="3" fill="var(--wood-hi)" opacity=".4"/>
    <circle cx="12" cy="4" r="2" fill="var(--metal-hi)" opacity=".8"/>
    ${lamp ? `<path d="M-8 -15v-15" stroke="var(--metal)" stroke-width="2"/>
      <path d="M-18 -30h20l9 13h-38z" fill="#d9c9a6" opacity=".8"/>
      <ellipse cx="2" cy="-17" rx="20" ry="6" fill="#ffcf87" opacity=".16"/>` : ''}
  `),

  dresser: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="30" rx="48" ry="12" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
    <rect x="-40" y="-38" width="80" height="74" rx="2" fill="var(--wood)" stroke="#1a110a"/>
    <rect x="-34" y="-32" width="68" height="19" fill="var(--wood-hi)" opacity=".2"/>
    <rect x="-34" y="-9" width="68" height="19" fill="var(--wood-hi)" opacity=".15"/>
    <rect x="-34" y="14" width="68" height="19" fill="var(--wood-hi)" opacity=".11"/>
    <circle cx="0" cy="-22" r="1.6" fill="var(--metal-hi)"/><circle cx="0" cy="1" r="1.6" fill="var(--metal-hi)"/><circle cx="0" cy="23" r="1.6" fill="var(--metal-hi)"/>
    <rect x="16" y="-36" width="14" height="10" rx="1" fill="#c9bda6" opacity=".3"/>
  `),

  chair: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="16" rx="20" ry="7" fill="#000" opacity=".4"/>
    <rect x="-17" y="-14" width="34" height="30" rx="2" fill="var(--wood)" stroke="#1a110a"/>
    <rect x="-17" y="-23" width="34" height="9" rx="2" fill="var(--wood-hi)" opacity=".4"/>
    <path d="M-14 16v14M14 16v14" stroke="#1a110a" stroke-width="2"/>
  `),

  couch: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="30" rx="74" ry="16" fill="#000" opacity=".48" filter="url(#rs-blur)"/>
    <path d="M-56 22v8M56 22v8" stroke="#15100c" stroke-width="4"/>
    <rect x="-66" y="-24" width="132" height="52" rx="9" fill="var(--rug-line)" stroke="#1a1110"/>
    <rect x="-58" y="-17" width="52" height="30" rx="6" fill="var(--rug)" opacity=".9"/>
    <rect x="6" y="-17" width="52" height="30" rx="6" fill="var(--rug)" opacity=".9"/>
    <path d="M-6 -17v30" stroke="#1a1110" stroke-width="1.4" opacity=".7"/>
    <rect x="-66" y="-24" width="16" height="52" rx="7" fill="var(--rug-line)"/>
    <rect x="50" y="-24" width="16" height="52" rx="7" fill="var(--rug-line)"/>
    <path d="M-58 -17h116" stroke="#e0d6bd" stroke-width=".7" opacity=".18"/>
    <path d="M-34 -12c10 3 22 3 32 0M8 -12c9 3 20 3 28 0" stroke="#d9c9a6" stroke-width="1.2" opacity=".2"/>
    <g transform="translate(-38 -20) rotate(-8)">
      <rect x="-12" y="-9" width="24" height="18" rx="3" fill="var(--accent)" opacity=".28" stroke="#1a1110" stroke-width=".7"/>
      <path d="M-6 -5h12M-6 0h9" stroke="#1a1110" stroke-width=".6" opacity=".35"/>
    </g>
    <path d="M-66 20h132" stroke="#0e0a08" stroke-width="1.2" opacity=".4"/>
  `),

  crates: ({ x, y, r = 0, s = 1 }) => sceneG(x, y, s, r, `
    <ellipse cx="0" cy="26" rx="54" ry="14" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
    <g transform="rotate(-4)">
      <rect x="-48" y="-34" width="62" height="52" fill="var(--wood)" stroke="#1a110a"/>
      <path d="M-48 -26h62M-48 -8h62M-48 10h62" stroke="var(--wood-hi)" stroke-width="2" opacity=".3"/>
      <path d="M-40 -34L-24 18M-8 -34L8 18M24 -34L40 18" stroke="#1a110a" stroke-width="1" opacity=".4"/>
      <rect x="-50" y="-36" width="66" height="5" fill="var(--wood-hi)" opacity=".28"/>
    </g>
    <g transform="translate(34 -14) rotate(3)">
      <rect x="-18" y="-16" width="40" height="34" fill="var(--wood)" stroke="#1a110a"/>
      <path d="M-18 -8h40M-18 6h40" stroke="var(--wood-hi)" stroke-width="1.6" opacity=".28"/>
      <path d="M-9 -16l12 34" stroke="#1a110a" stroke-width=".8" opacity=".4"/>
    </g>
  `),

  barrel: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="14" rx="25" ry="9" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
    <ellipse cx="0" cy="0" rx="22" ry="22" fill="var(--wood)" stroke="#1a110a" stroke-width="1.2"/>
    <ellipse cx="0" cy="0" rx="16" ry="16" fill="none" stroke="var(--wood-hi)" stroke-width="1.2" opacity=".4"/>
    <ellipse cx="0" cy="0" rx="7" ry="7" fill="#1a110a" opacity=".65"/>
    <path d="M-21 -8a22 22 0 0 0 42 0" fill="none" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".3"/>
  `),

  rope: ({ x, y, s = 1, r = 0 }) => sceneG(x, y, s, r, `
    <ellipse cx="0" cy="6" rx="30" ry="8" fill="#000" opacity=".35"/>
    <ellipse cx="0" cy="0" rx="26" ry="10" fill="none" stroke="#8a744f" stroke-width="4"/>
    <ellipse cx="0" cy="0" rx="18" ry="7" fill="none" stroke="#a88e62" stroke-width="3.5" opacity=".75"/>
    <ellipse cx="0" cy="0" rx="10" ry="4" fill="none" stroke="#8a744f" stroke-width="3"/>
    <path d="M22 -2c10-4 16-10 14-18" stroke="#a88e62" stroke-width="3" fill="none" stroke-linecap="round"/>
  `),

  counter: ({ x, y, r = 0, kind = 'diner' }) => {
    const chrome = kind === 'diner';
    const laundry = kind === 'laundry';
    return sceneG(x, y, 1, r, `
      <ellipse cx="0" cy="26" rx="116" ry="20" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <rect x="-112" y="-24" width="224" height="52" rx="3" fill="var(--wood)" stroke="#17100b" stroke-width="1.4"/>
      <rect x="-112" y="-24" width="224" height="13" fill="var(--wood-hi)" opacity=".32"/>
      <rect x="-108" y="-8" width="216" height="30" fill="#000" opacity=".14"/>
      <path d="M-108 -10h216" stroke="${chrome ? 'var(--metal-hi)' : 'var(--wood-hi)'}" stroke-width="2" opacity=".45"/>
      ${chrome ? `<g fill="var(--metal-hi)" opacity=".32"><rect x="-108" y="15" width="216" height="2"/><rect x="-108" y="-21" width="216" height="2"/></g>` : ''}
      ${laundry ? `
        <g transform="translate(-64 -34)">
          <rect x="-20" y="-4" width="40" height="10" rx="2" fill="#d9d2bd" opacity=".5"/>
          <rect x="-18" y="-12" width="36" height="10" rx="2" fill="#e6dcc4" opacity=".4"/>
          <path d="M-16 -8h32" stroke="#8a7f68" stroke-width=".8" opacity=".4"/>
        </g>
        <g transform="translate(44 -36)">
          <rect x="-16" y="-6" width="32" height="14" rx="3" fill="#b9c4be" opacity=".3" stroke="#d7e3e2" stroke-width=".7"/>
          <path d="M-12 -2h24M-10 2h20" stroke="#d7e3e2" stroke-width=".7" opacity=".35"/>
        </g>
        <g transform="translate(80 -6)" opacity=".5">
          <rect x="-12" y="-20" width="24" height="34" rx="2" fill="#8a744f" stroke="#2a2319" stroke-width=".7"/>
          <path d="M-8 -16h16M-8 -10h16M-8 -4h16M-8 2h16" stroke="#5a4a32" stroke-width=".8"/>
        </g>
        <path d="M-96 6h192M-96 12h192" stroke="var(--wood-hi)" stroke-width=".8" opacity=".2"/>
      ` : `
        <g transform="translate(-72 -34)">
          <ellipse cx="0" cy="8" rx="13" ry="9" fill="#121212"/>
          <path d="M-11 2a11 9 0 0 1 22 0Z" fill="#b9c9c4" opacity=".35" stroke="#d9e2dc" stroke-width=".8"/>
          <path d="M-3 -8h6v10h-6z" fill="#c9d3cc" opacity=".4"/>
          <ellipse cx="0" cy="-8" rx="14" ry="4" fill="var(--metal-hi)" opacity=".4"/>
        </g>
        <g transform="translate(58 -32)">
          <rect x="-12" y="-12" width="24" height="23" rx="2" fill="var(--metal)" stroke="#1a1712"/>
          <circle cx="0" cy="-4" r="5" fill="#0f0d0a" stroke="var(--metal-hi)" stroke-width=".8"/>
          <path d="M-7 8h14" stroke="var(--metal-hi)" stroke-width="1" opacity=".5"/>
          <path d="M10 -4h6" stroke="var(--metal-hi)" stroke-width="2" opacity=".6"/>
        </g>
        <g fill="var(--metal-hi)" opacity=".28">
          <circle cx="-28" cy="18" r="2"/><circle cx="2" cy="18" r="2"/><circle cx="32" cy="18" r="2"/>
        </g>
      `}
    `);
  },

  stools: ({ x, y, n = 3, gap = 62, r = 0 }) => sceneG(x, y, 1, r,
    Array.from({ length: n }, (_, i) => `
      <g transform="translate(${(i - (n - 1) / 2) * gap} 0)">
        <ellipse cx="0" cy="10" rx="16" ry="8" fill="#000" opacity=".35"/>
        <ellipse cx="0" cy="0" rx="14" ry="14" fill="var(--rug-line)" stroke="#1a1410" stroke-width="1.2"/>
        <ellipse cx="0" cy="-2" rx="9" ry="9" fill="var(--rug)" opacity=".7"/>
        <path d="M0 12v14M-9 25h18" stroke="var(--metal)" stroke-width="2" opacity=".7"/>
      </g>`).join('')),

  jukebox: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="42" rx="38" ry="12" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <path d="M-32 38V-10c0-22 14-36 32-36s32 14 32 36v48Z" fill="var(--wood)" stroke="#1a110a" stroke-width="1.5"/>
    <path d="M-25 34V-8c0-18 10-29 25-29s25 11 25 29v42Z" fill="#171310" stroke="#3d2f20" stroke-width="1"/>
    <path d="M-18 -2c0-14 7-23 18-23s18 9 18 23v18h-36Z" fill="#2a2017"/>
    <g stroke="#d9b36a" stroke-width="1.2" opacity=".6"><path d="M-18 4h36M-18 12h36M-18 20h36"/></g>
    <circle cx="0" cy="-14" r="7" fill="#c88f4e" opacity=".5" filter="url(#rs-glow)"/>
    <path d="M-19 34h38" stroke="#d9b36a" stroke-width="2" opacity=".5"/>
    <g fill="#d9b36a" opacity=".5"><circle cx="-20" cy="30" r="1.4"/><circle cx="20" cy="30" r="1.4"/></g>
  `),

  booth: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="-64" y="-6" width="26" height="70" rx="5" fill="var(--rug-line)" stroke="#160f0d"/>
    <rect x="38" y="-6" width="26" height="70" rx="5" fill="var(--rug-line)" stroke="#160f0d"/>
    <rect x="-64" y="-14" width="128" height="12" rx="4" fill="var(--rug-line)" opacity=".8"/>
    <rect x="-58" y="6" width="15" height="52" fill="var(--rug)" opacity=".4"/>
    <rect x="43" y="6" width="15" height="52" fill="var(--rug)" opacity=".4"/>
  `),

  screen: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <path d="M-44 28l8-64 26 4-3 66Z" fill="var(--wood)" stroke="#1a110a" stroke-width="1.2"/>
    <path d="M-10 34l6-66 28 2-2 66Z" fill="var(--wood-hi)" opacity=".45" stroke="#1a110a" stroke-width="1.2"/>
    <path d="M27 34l8-62 24 3-1 64Z" fill="var(--wood)" opacity=".85" stroke="#1a110a" stroke-width="1.2"/>
    <g stroke="#d7c6a1" stroke-width=".8" opacity=".2"><path d="M-32 -26l2 46M6 -28l2 54M45 -22l1 46"/></g>
    <path d="M-46 32h104" stroke="#0f0a07" stroke-width="2"/>
  `),

  rail: ({ x, y, r = 0, w = 300 }) => sceneG(x, y, 1, r, `
    <path d="M${-w / 2} 0h${w}" stroke="var(--metal-hi)" stroke-width="3" opacity=".45"/>
    <path d="M${-w / 2} 10h${w}" stroke="var(--metal-hi)" stroke-width="2" opacity=".3"/>
    <g stroke="var(--metal)" stroke-width="2.4" opacity=".55">
      <path d="M${-w / 2} -14v14M${-w / 4} -14v14M0 -14v14M${w / 4} -14v14M${w / 2} -14v14"/>
      <path d="M${-w / 2} 0l${w / 5} 10M${-w / 3} 0l${w / 5} 10M${w / 15} 0l${w / 5} 10M${w / 2 - w / 3} 0l${w / 5} 10"/>
    </g>
  `),

  rack: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <path d="M-42 0h84M-42 0v-18M42 0v-18" stroke="var(--metal-hi)" stroke-width="2" opacity=".4"/>
    <rect x="-44" y="-30" width="36" height="20" rx="3" fill="var(--wood)" stroke="#1a110a"/>
    <rect x="8" y="-26" width="34" height="16" rx="2" fill="var(--rug-line)" stroke="#1a110a"/>
    <path d="M-34 -30v-6h18v6M14 -26v-5h20v5" stroke="var(--metal-hi)" stroke-width="1.4" opacity=".5"/>
  `),

  mic: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="46" rx="22" ry="7" fill="#000" opacity=".4"/>
    <path d="M0 44V4M0 4l24-18" stroke="var(--metal)" stroke-width="2.4"/>
    <path d="M0 18l18-8" stroke="var(--metal-hi)" stroke-width="1.2" opacity=".4"/>
    <g transform="translate(26 -18) rotate(18)">
      <rect x="-6" y="-11" width="12" height="20" rx="5" fill="#171717" stroke="var(--metal-hi)" stroke-width="1"/>
      <path d="M-4 -6h8M-4 -2h8M-4 2h8" stroke="var(--metal-hi)" stroke-width=".7" opacity=".4"/>
    </g>
    <path d="M-12 46h24" stroke="var(--metal-hi)" stroke-width="2" opacity=".4"/>
  `),

  neon: ({ x, y, r = 0, kind = 'moon' }) => {
    const art = kind === 'moon'
      ? `<path d="M8 -24a25 25 0 1 0 0 48 20 20 0 1 1 0-48Z" fill="none" stroke="#e79bb2" stroke-width="2.4" filter="url(#rs-glow)"/>
         <path d="M-22 -14l4 3M-24 4l5-1M-16 20l3-4" stroke="#f3c3d0" stroke-width="1.4" opacity=".7"/>`
      : kind === 'star'
      ? `<path d="M0 -26l7 17 18 2-14 12 4 18-15-10-15 10 4-18-14-12 18-2Z" fill="none" stroke="#e7c27a" stroke-width="2" filter="url(#rs-glow)"/>`
      : `<path d="M-24 14h48M-16 14V-4l16-14 16 14v18" fill="none" stroke="#9fd4d0" stroke-width="2" filter="url(#rs-glow)"/>
         <path d="M-8 -2h16" stroke="#9fd4d0" stroke-width="2"/>`;
    return sceneG(x, y, 1, r, `
      <ellipse cx="0" cy="0" rx="40" ry="34" fill="#e28aa4" opacity=".1" filter="url(#rs-blur)"/>
      ${art}
    `);
  },

  shelves: ({ x, y, r = 0, kind = 'bottles' }) => {
    let bits = '';
    if (kind === 'bottles') {
      bits = `<g opacity=".8">
        <rect x="-38" y="-18" width="7" height="26" rx="2" fill="#4c5e3a"/><rect x="-35" y="-25" width="2" height="8" fill="#3e4d30"/>
        <rect x="-24" y="-12" width="9" height="20" rx="2" fill="#6b3d2a"/><rect x="-21" y="-18" width="2" height="7" fill="#4a2a1d"/>
        <rect x="-8" y="-20" width="6" height="28" rx="2" fill="#3d4e56"/><rect x="-6" y="-26" width="2" height="7" fill="#333f46"/>
        <rect x="4" y="-15" width="10" height="23" rx="2" fill="#5a4a2e"/><rect x="7" y="-21" width="2" height="7" fill="#40341f"/>
        <rect x="22" y="-18" width="8" height="26" rx="2" fill="#4a5a3c"/><rect x="25" y="-24" width="2" height="7" fill="#3b4a30"/>
      </g>`;
    } else if (kind === 'pawn') {
      bits = `<g opacity=".85">
        <path d="M-40 4c8-16 20-16 28 0Z" fill="#8a6a3e"/><rect x="-30" y="4" width="8" height="10" fill="#4a3822"/>
        <circle cx="-6" cy="-2" r="9" fill="#b9a36f" opacity=".7" stroke="#e0d0a6" stroke-width=".8"/><path d="M-6 -11v-4" stroke="#b9a36f" stroke-width="2"/>
        <path d="M12 -8h20v18H12Z" fill="#564a36"/><path d="M16 -8v-6h12v6" stroke="#8e7a57" stroke-width="1.5"/>
        <path d="M40 4v10" stroke="#8f7a52" stroke-width="2"/>
      </g>`;
    } else if (kind === 'records') {
      bits = `<g opacity=".8">
        <rect x="-40" y="-22" width="14" height="30" rx="1" fill="#3e3427"/><rect x="-23" y="-18" width="13" height="26" rx="1" fill="#51412d"/>
        <rect x="-7" y="-25" width="15" height="33" rx="1" fill="#382f25"/><rect x="11" y="-19" width="14" height="27" rx="1" fill="#463a2a"/>
        <rect x="28" y="-23" width="12" height="31" rx="1" fill="#4d3e2c"/>
      </g>`;
    } else if (kind === 'jars') {
      bits = `<g opacity=".8">
        <rect x="-38" y="-20" width="13" height="26" rx="3" fill="#7d8f78" opacity=".5"/><rect x="-36" y="-23" width="9" height="4" fill="#b9c2a8"/>
        <rect x="-18" y="-16" width="12" height="22" rx="3" fill="#8a7d64" opacity=".5"/><rect x="-16" y="-19" width="8" height="4" fill="#c2b896"/>
        <rect x="2" y="-22" width="14" height="28" rx="3" fill="#6d8078" opacity=".5"/><rect x="4" y="-25" width="10" height="4" fill="#b5c0b4"/>
        <rect x="24" y="-17" width="12" height="23" rx="3" fill="#8b846c" opacity=".5"/><rect x="26" y="-20" width="8" height="4" fill="#c2baa4"/>
      </g>`;
    } else {
      bits = `<g opacity=".8">
        <rect x="-38" y="-18" width="9" height="24" fill="#8a744c"/><rect x="-25" y="-24" width="7" height="30" fill="#a08a5e"/>
        <rect x="-13" y="-15" width="10" height="21" fill="#76623f"/><rect x="2" y="-22" width="8" height="28" fill="#b59a66"/>
        <rect x="15" y="-18" width="11" height="24" fill="#8e7a52"/><rect x="30" y="-25" width="7" height="31" fill="#a58e60"/>
      </g>`;
    }
    return sceneG(x, y, 1, r, `
      <rect x="-48" y="-32" width="96" height="50" rx="1" fill="#0d0a07" opacity=".42"/>
      <rect x="-48" y="-32" width="96" height="50" rx="1" fill="none" stroke="#1a120b" stroke-width="1.2"/>
      <rect x="-50" y="-35" width="100" height="5" rx="1" fill="var(--wood)" stroke="#15100c" stroke-width=".8"/>
      <rect x="-46" y="-28" width="92" height="6" fill="var(--wood-hi)" opacity=".35"/>
      <rect x="-46" y="-8" width="92" height="5" fill="var(--wood-hi)" opacity=".28"/>
      <rect x="-46" y="12" width="92" height="5" fill="var(--wood-hi)" opacity=".22"/>
      ${bits}
      <path d="M-48 -30v46M48 -30v46" stroke="#15100c" stroke-width="2" opacity=".7"/>
      <rect x="-48" y="16" width="96" height="3" fill="var(--wood-hi)" opacity=".16"/>
    `);
  },

  boat: ({ x, y, r = 0, s = 1 }) => sceneG(x, y, s, r, `
    <ellipse cx="0" cy="10" rx="76" ry="24" fill="#041014" opacity=".55" filter="url(#rs-blur)"/>
    <path d="M-74 0c18-22 130-22 148 0-14 24-134 24-148 0Z" fill="var(--wood)" stroke="#1a110a" stroke-width="1.6"/>
    <path d="M-60 0c16-15 104-15 120 0-14 16-106 16-120 0Z" fill="#0d1312" opacity=".75"/>
    <path d="M-56 -4c18-8 94-8 112 0M-30 8h58" stroke="var(--wood-hi)" stroke-width="2" opacity=".35"/>
    <path d="M-18 -6l44 14M-18 8l44-14" stroke="var(--wood-hi)" stroke-width="3" opacity=".5"/>
    <path d="M-46 12l-26 20M44 12l24 18" stroke="#8f7a52" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M-58 0h116" stroke="var(--wood-hi)" stroke-width="1.4" opacity=".4"/>
  `),

  water: ({ x, y, w = 180, h = 220, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#08171c" opacity=".9"/>
    <g stroke="#5f8c94" fill="none" opacity=".28">
      <path d="M${-w / 2 + 8} ${-h / 2 + 22}c18-5 36 6 54 0s38 5 58-1M${-w / 2 + 2} ${-h / 2 + 58}c22-6 38 6 61 1s37 5 55-2M${-w / 2 + 12} ${-h / 2 + 96}c16-4 34 7 53 1s35 5 53-1M${-w / 2 + 4} ${-h / 2 + 138}c20-5 39 6 59 1s33 5 51-2"/>
    </g>
    <g fill="#8fb5b7" opacity=".18">
      <ellipse cx="-40" cy="${-h / 2 + 36}" rx="12" ry="2.4"/><ellipse cx="34" cy="${-h / 2 + 76}" rx="16" ry="2.6"/>
      <ellipse cx="-18" cy="${-h / 2 + 118}" rx="9" ry="2"/><ellipse cx="46" cy="${-h / 2 + 160}" rx="13" ry="2.2"/>
    </g>
    <path d="M${-w / 2} ${-h / 2}v${h}" stroke="#3b5b60" stroke-width="5" opacity=".3"/>
  `),

  ringBuoy: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <circle r="21" fill="#b5473b" stroke="#e0d6c0" stroke-width="2"/>
    <circle r="11" fill="none" stroke="#e0d6c0" stroke-width="8" stroke-dasharray="9 8"/>
    <circle r="11" fill="none" stroke="#b5473b" stroke-width="3" opacity=".6"/>
  `),

  chandelier: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="0" rx="46" ry="34" fill="#ffd18b" opacity=".12" filter="url(#rs-blur)"/>
    <path d="M0 -30v20M-28 6l28-16 28 16" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".45"/>
    <g fill="#ffdda3" opacity=".65">
      <circle cx="-28" cy="8" r="2.4"/><circle cx="-14" cy="13" r="2.4"/><circle cx="0" cy="15" r="2.4"/><circle cx="14" cy="13" r="2.4"/><circle cx="28" cy="8" r="2.4"/>
      <circle cx="-20" cy="20" r="1.5"/><circle cx="0" cy="24" r="1.5"/><circle cx="20" cy="20" r="1.5"/>
    </g>
  `),

  pews: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="28" rx="88" ry="18" fill="#000" opacity=".28" filter="url(#rs-blur)"/>
    ${[-52, -16, 20].map((dy, i) => `
      <g transform="translate(0 ${dy})">
        <ellipse cx="0" cy="16" rx="82" ry="8" fill="#000" opacity=".22" filter="url(#rs-blur)"/>
        <g>
          <rect x="-82" y="-13" width="74" height="7" rx="1" fill="var(--wood-hi)" opacity=".34"/>
          <rect x="-82" y="-6" width="74" height="15" rx="1" fill="var(--wood)" stroke="#1a110a" stroke-width="1"/>
          <path d="M-79 -2h68M-79 5h68" stroke="var(--wood-hi)" stroke-width=".9" opacity=".28"/>
          <path d="M-79 9v6M-11 9v6" stroke="#15100b" stroke-width="2.2"/>
          <rect x="-82" y="15" width="74" height="4" fill="var(--wood-hi)" opacity=".18"/>
        </g>
        <g>
          <rect x="8" y="-13" width="74" height="7" rx="1" fill="var(--wood-hi)" opacity=".34"/>
          <rect x="8" y="-6" width="74" height="15" rx="1" fill="var(--wood)" stroke="#1a110a" stroke-width="1"/>
          <path d="M11 -2h68M11 5h68" stroke="var(--wood-hi)" stroke-width=".9" opacity=".28"/>
          <path d="M11 9v6M79 9v6" stroke="#15100b" stroke-width="2.2"/>
          <rect x="8" y="15" width="74" height="4" fill="var(--wood-hi)" opacity=".18"/>
        </g>
        ${i === 1 ? `<g transform="translate(-46 -2)"><rect x="-7" y="-4" width="14" height="9" rx="1" fill="#7a2a2a" stroke="#2a0e0e" stroke-width=".7"/><path d="M0 -4v9" stroke="#d9c48c" stroke-width=".6" opacity=".5"/></g>` : ''}
      </g>`).join('')}
    <path d="M0 -70v104" stroke="var(--rug-line)" stroke-width="1" opacity=".14"/>
  `),

  cross: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <path d="M0 -30v58M-18 -16h36" stroke="var(--metal-hi)" stroke-width="4.5" opacity=".55"/>
    <path d="M0 -29v56M-17 -15h34" stroke="#e6d8b8" stroke-width="1.4" opacity=".35"/>
  `),

  car: ({ x, y, r = 0, s = 1 }) => sceneG(x, y, s, r, `
    <ellipse cx="0" cy="44" rx="62" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <rect x="-48" y="-86" width="96" height="172" rx="18" fill="var(--rug-line)" stroke="#0e0d0c" stroke-width="1.4"/>
    <path d="M-40 -58h80v54h-80z" fill="#101920" stroke="#3b454b" stroke-width="1"/>
    <path d="M-36 12h72v42h-72z" fill="#0d161c" stroke="#39444b" stroke-width="1"/>
    <path d="M-40 -6h80" stroke="#0b1013" stroke-width="1.4" opacity=".8"/>
    <path d="M-32 -14h64M-30 4h60" stroke="#4d585d" stroke-width=".8" opacity=".25"/>
    <path d="M-48 -58v30M48 -58v30M-48 30v30M48 30v30" stroke="#0a0d0f" stroke-width="1.3" opacity=".7"/>
    <path d="M-56 -30h8M48 -30h8" stroke="var(--metal-hi)" stroke-width="2" opacity=".3"/>
    <path d="M-32 -64h64v10h-64zM-32 58h64v8h-64z" fill="var(--metal-hi)" opacity=".2"/>
    <g fill="#090909"><rect x="-52" y="-56" width="8" height="30" rx="3"/><rect x="44" y="-56" width="8" height="30" rx="3"/><rect x="-52" y="30" width="8" height="30" rx="3"/><rect x="44" y="30" width="8" height="30" rx="3"/></g>
    <g fill="#ffe2a3" opacity=".42"><circle cx="-34" cy="-77" r="4.4"/><circle cx="34" cy="-77" r="4.4"/></g>
    <circle cx="0" cy="-80" r="2.6" fill="url(#rs-brass)" opacity=".55"/>
    <path d="M0 -84v6" stroke="var(--metal-hi)" stroke-width="1.2" opacity=".45"/>
    <path d="M-28 -54l14 46M28 -54l-14 46" stroke="#cfe0e0" stroke-width=".8" opacity=".09"/>
    <path d="M-36 64h72" stroke="var(--metal-hi)" stroke-width="2" opacity=".25"/>
  `),

  toolWall: ({ x, y, r = 0, s = 1 }) => sceneG(x, y, s, r, `
    <rect x="-52" y="-30" width="104" height="60" fill="#202326" stroke="#0e1011" stroke-width="1.5"/>
    <g stroke="#9ba4a2" stroke-width="1.6" fill="none" opacity=".55">
      <path d="M-40 -18h22M-29 -24v12M-29 -24a5 5 0 0 1 0 10M-8 -20h20M2 -26v14M16 -22l8 8M26 -20l-8 8M-38 8h14v12h-14zM-14 6v18M-22 6h16M20 6l10 18M30 6l-10 18"/>
    </g>
    <g fill="#8d968f" opacity=".3"><circle cx="-44" cy="-24" r="1.4"/><circle cx="44" cy="-24" r="1.4"/><circle cx="-44" cy="24" r="1.4"/><circle cx="44" cy="24" r="1.4"/></g>
  `),

  drums: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <g>
      <ellipse cx="-22" cy="20" rx="20" ry="8" fill="#000" opacity=".4"/>
      <circle cx="-22" cy="4" r="19" fill="#4b4a3e" stroke="#1a1a16" stroke-width="1.2"/>
      <circle cx="-22" cy="4" r="12" fill="none" stroke="#8a8870" stroke-width="1.2" opacity=".35"/>
      <circle cx="-22" cy="4" r="4" fill="#25241d"/>
      <ellipse cx="22" cy="14" rx="18" ry="7" fill="#000" opacity=".4"/>
      <circle cx="22" cy="0" r="17" fill="#5a4632" stroke="#1a110a" stroke-width="1.2"/>
      <circle cx="22" cy="0" r="10" fill="none" stroke="#9b7c53" stroke-width="1.2" opacity=".35"/>
    </g>
  `),

  plants: ({ x, y, r = 0, s = 1 }) => sceneG(x, y, s, r, `
    <g>
      <ellipse cx="0" cy="18" rx="34" ry="10" fill="#000" opacity=".35"/>
      <path d="M-18 10h36l-5 20h-26Z" fill="#6b4a30" stroke="#1a110a"/>
      <path d="M0 10V-18M0 -8l-16-14M0 -4l17-16M0 2l-12-10M0 0l12-12" stroke="#5f7a4e" stroke-width="2.4" fill="none"/>
      <g fill="#78946a" opacity=".8">
        <ellipse cx="-15" cy="-23" rx="9" ry="4" transform="rotate(-28 -15 -23)"/>
        <ellipse cx="16" cy="-21" rx="10" ry="4" transform="rotate(26 16 -21)"/>
        <ellipse cx="-11" cy="-9" rx="8" ry="3.4" transform="rotate(-20 -11 -9)"/>
        <ellipse cx="12" cy="-11" rx="8" ry="3.4" transform="rotate(22 12 -11)"/>
        <ellipse cx="0" cy="-22" rx="8" ry="4"/>
      </g>
    </g>
  `),

  plantBench: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="20" rx="56" ry="12" fill="#000" opacity=".35" filter="url(#rs-blur)"/>
    <rect x="-54" y="-10" width="108" height="34" fill="var(--wood)" stroke="#1a110a"/>
    <path d="M-54 -6h108M-54 12h108" stroke="var(--wood-hi)" stroke-width="1.4" opacity=".3"/>
    <g fill="#6b4a30" stroke="#1a110a" stroke-width=".8">
      <path d="M-42 -10h18l-3 14h-12Z"/><path d="M-12 -10h16l-3 14h-10Z"/><path d="M18 -10h18l-3 14h-12Z"/>
    </g>
    <g stroke="#6b8a5a" stroke-width="2" fill="none">
      <path d="M-33 -10V-24M-33 -18l-9-8M-33 -14l8-8"/>
      <path d="M-4 -10V-26M-4 -20l-8-7M-4 -16l7-9"/>
      <path d="M27 -10V-22M27 -16l-8-7M27 -13l7-8"/>
    </g>
    <g fill="#7e9a6b" opacity=".75">
      <ellipse cx="-42" cy="-30" rx="7" ry="3.2" transform="rotate(-30 -42 -30)"/><ellipse cx="-24" cy="-28" rx="6" ry="3" transform="rotate(26 -24 -28)"/>
      <ellipse cx="-12" cy="-32" rx="7" ry="3.2" transform="rotate(-26 -12 -32)"/><ellipse cx="4" cy="-31" rx="6" ry="3" transform="rotate(24 4 -31)"/>
      <ellipse cx="19" cy="-30" rx="6.5" ry="3" transform="rotate(-24 19 -30)"/><ellipse cx="35" cy="-28" rx="6" ry="3" transform="rotate(26 35 -28)"/>
    </g>
  `),

  gurney: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="26" rx="54" ry="12" fill="#000" opacity=".4" filter="url(#rs-blur)"/>
    <rect x="-46" y="-66" width="92" height="118" rx="6" fill="var(--metal)" stroke="#1a1f20" stroke-width="1.4"/>
    <rect x="-42" y="-62" width="84" height="104" rx="4" fill="#7f8d87" opacity=".25"/>
    <rect x="-22" y="-59" width="44" height="14" rx="6" fill="#e6e2d3" opacity=".35" stroke="#b9b5a5" stroke-width=".7"/>
    <path d="M-38 -40h76v30c-6 8-16 12-38 12s-32-4-38-12Z" fill="#d9d6c8" opacity=".42" stroke="#9aa09a" stroke-width=".8"/>
    <path d="M-34 -36h68M-32 -28h64M-30 -20h60" stroke="#b9b5a5" stroke-width="1" opacity=".25"/>
    <path d="M-38 0c6 8 16 12 38 12s32-4 38-12" stroke="#b9b5a5" stroke-width="1.2" fill="none" opacity=".3"/>
    <path d="M-42 -30h84M-42 6h84" stroke="var(--metal-hi)" stroke-width="1.2" opacity=".3"/>
    <g fill="#20282a" stroke="var(--metal-hi)" stroke-width="1"><circle cx="-38" cy="44" r="6"/><circle cx="38" cy="44" r="6"/></g>
    <path d="M-46 28h92" stroke="var(--metal-hi)" stroke-width="1.4" opacity=".4"/>
    <path d="M-40 14h80" stroke="#3a4242" stroke-width="2.4" opacity=".45"/>
  `),

  jars: ({ x, y, r = 0 }) => PROPS.shelves({ x, y, r, kind: 'jars' }),

  piano: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="30" rx="78" ry="22" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <path d="M-62 -40C-60 -58 60 -62 62 -40L58 30c-12 14-32 22-60 22s-48-8-60-22Z" fill="var(--wood)" stroke="#120c08" stroke-width="1.6"/>
    <path d="M-54 -34C-50 -48 50 -50 54 -34L50 26c-10 10-28 16-50 16s-40-6-50-16Z" fill="#0e0c0b" opacity=".9"/>
    <path d="M-50 -18C-18 -28 18 -28 50 -18" stroke="var(--wood-hi)" stroke-width="1.6" fill="none" opacity=".4"/>
    <g fill="#f2e6c6" opacity=".55">
      <rect x="-44" y="-8" width="4" height="14"/><rect x="-36" y="-8" width="4" height="14"/><rect x="-28" y="-8" width="4" height="14"/>
      <rect x="-20" y="-8" width="4" height="14"/><rect x="-12" y="-8" width="4" height="14"/><rect x="-4" y="-8" width="4" height="14"/>
      <rect x="4" y="-8" width="4" height="14"/><rect x="12" y="-8" width="4" height="14"/><rect x="20" y="-8" width="4" height="14"/><rect x="28" y="-8" width="4" height="14"/><rect x="36" y="-8" width="4" height="14"/>
    </g>
    <path d="M-60 30c18 10 102 10 120 0" stroke="#0b0806" stroke-width="2" opacity=".6"/>
    <path d="M-62 -40c0 16-2 38-4 56M62 -40c0 16 2 38 4 56" stroke="#f0d6a4" stroke-width="1" opacity=".16"/>
  `),

  trash: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <g transform="translate(-22 4)">
      <ellipse cx="0" cy="22" rx="20" ry="7" fill="#000" opacity=".4"/>
      <path d="M-16 -14h32l-4 34h-24Z" fill="#3d4241" stroke="#151818" stroke-width="1.2"/>
      <ellipse cx="0" cy="-14" rx="16" ry="5" fill="#4d5350" stroke="#151818"/>
      <path d="M-8 -14V-24h16v10" stroke="#5a605c" stroke-width="1.6" fill="none"/>
      <path d="M-12 4h24M-11 12h22" stroke="#1a1d1c" stroke-width="1.2" opacity=".5"/>
    </g>
    <g transform="translate(22 -2) rotate(8)">
      <ellipse cx="0" cy="20" rx="17" ry="6" fill="#000" opacity=".4"/>
      <path d="M-14 -12h28l-3 30h-22Z" fill="#4a4338" stroke="#17130f" stroke-width="1.2"/>
      <ellipse cx="0" cy="-12" rx="14" ry="4.4" fill="#5c5342" stroke="#17130f"/>
      <path d="M-8 6c8 3 16 2 22-1" stroke="#201a13" stroke-width="1.4" fill="none" opacity=".5"/>
    </g>
  `),

  fireEscape: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="-38" y="-80" width="76" height="160" fill="#000" opacity=".2"/>
    <g stroke="#4d5555" stroke-width="2.4" opacity=".7" fill="none">
      <path d="M-34 -76h68M-34 76h68M-34 -76v152M34 -76v152"/>
      <path d="M-34 -76l68 152M34 -76l-68 152"/>
      <path d="M-34 -20h68M-34 30h68"/>
    </g>
    <g stroke="#6d7574" stroke-width="1" opacity=".4"><path d="M-22 -76v152M0 -76v152M22 -76v152"/></g>
    <path d="M-42 -80h88M-42 78h88" stroke="#7b8482" stroke-width="3" opacity=".35"/>
  `),

  puddle: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="0" rx="54" ry="19" fill="#08181d" opacity=".7" filter="url(#rs-blur2)"/>
    <ellipse cx="0" cy="0" rx="47" ry="15.5" fill="#0e252b" opacity=".65"/>
    <ellipse cx="-6" cy="-2" rx="33" ry="9" fill="#16333a" opacity=".4"/>
    <g fill="none" stroke="#6f989d" stroke-width=".8" opacity=".16">
      <ellipse cx="12" cy="3" rx="12" ry="4"/><ellipse cx="12" cy="3" rx="22" ry="7"/>
      <ellipse cx="-20" cy="-4" rx="8" ry="3"/>
    </g>
    <path d="M-30 -8c12 1 22 2 34 0" stroke="#9fbcbf" stroke-width=".9" opacity=".18"/>
  `),

  column: ({ x, y, r = 0, h = 120 }) => sceneG(x, y, 1, r, `
    <rect x="-16" y="${-h / 2}" width="32" height="${h}" fill="var(--wall-hi)" opacity=".55" stroke="#13110e" stroke-width="1.2"/>
    <rect x="-20" y="${-h / 2 - 8}" width="40" height="10" fill="var(--wall-hi)" opacity=".7"/>
    <rect x="-20" y="${h / 2 - 2}" width="40" height="10" fill="var(--wall-hi)" opacity=".7"/>
    <g stroke="#0f0d0b" stroke-width="1" opacity=".25">
      <path d="M-8 ${-h / 2 + 4}v${h - 8}M0 ${-h / 2 + 4}v${h - 8}M8 ${-h / 2 + 4}v${h - 8}"/>
    </g>
  `),

  statue: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="34" rx="34" ry="10" fill="#000" opacity=".4" filter="url(#rs-blur)"/>
    <rect x="-26" y="16" width="52" height="22" fill="var(--wall-hi)" opacity=".5" stroke="#14110d"/>
    <rect x="-30" y="10" width="60" height="9" fill="var(--wall-hi)" opacity=".65"/>
    <path d="M0 -38c-8 0-13 6-13 14 0 6 2 10 6 14-8 4-12 10-12 16h38c0-6-4-12-12-16 4-4 6-8 6-14 0-8-5-14-13-14Z" fill="var(--metal-hi)" opacity=".35" stroke="#1a1a17" stroke-width="1"/>
    <path d="M-7 -26c2-2 5-3 7-3" stroke="#fff" stroke-width="1" opacity=".2"/>
  `),

  stanchions: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <g fill="var(--metal-hi)" opacity=".55">
      <circle cx="-44" cy="0" r="7"/><circle cx="44" cy="0" r="7"/>
      <rect x="-47" y="-26" width="6" height="26" rx="2"/><rect x="41" y="-26" width="6" height="26" rx="2"/>
      <circle cx="-44" cy="-28" r="3.4"/><circle cx="44" cy="-28" r="3.4"/>
    </g>
    <path d="M-44 -24c4 16 84 16 88 0" stroke="#8d2a2a" stroke-width="2.4" fill="none" opacity=".55"/>
  `),

  cart: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="22" rx="34" ry="10" fill="#000" opacity=".4"/>
    <rect x="-28" y="-24" width="56" height="40" rx="3" fill="var(--wood)" stroke="#1a110a" stroke-width="1.2"/>
    <rect x="-24" y="-20" width="48" height="8" fill="var(--wood-hi)" opacity=".3"/>
    <circle cx="-24" cy="22" r="6" fill="#202020" stroke="var(--metal-hi)" stroke-width="1.4"/>
    <circle cx="24" cy="22" r="6" fill="#202020" stroke="var(--metal-hi)" stroke-width="1.4"/>
    <path d="M-28 -24l-12 -10h80" stroke="var(--metal-hi)" stroke-width="1.6" opacity=".45"/>
    <g fill="#8a744f" opacity=".55"><rect x="-18" y="-12" width="10" height="14" rx="2"/><rect x="-4" y="-14" width="10" height="16" rx="2"/><rect x="10" y="-11" width="10" height="13" rx="2"/></g>
  `),

  heavyBag: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <path d="M0 -102v70" stroke="var(--metal-hi)" stroke-width="1.8" opacity=".4"/>
    <rect x="-12" y="-105" width="24" height="5" rx="2" fill="var(--metal)" stroke="#1a1d1c" stroke-width=".8"/>
    <path d="M-7 -102v-4M7 -102v-4" stroke="var(--metal-hi)" stroke-width="1.2" opacity=".35"/>
    <path d="M-9 -34h18" stroke="var(--metal-hi)" stroke-width="2.4" opacity=".6"/>
    <ellipse cx="0" cy="38" rx="34" ry="12" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <ellipse cx="0" cy="-8" rx="20" ry="26" fill="#4a3426" stroke="#1a110a" stroke-width="1.4"/>
    <ellipse cx="0" cy="-8" rx="13" ry="19" fill="#5a4030" opacity=".6"/>
    <path d="M-16 6c10 4 22 4 32 0M-17 -22c10 3 24 3 34 0" stroke="#3a281c" stroke-width="1.2" fill="none" opacity=".7"/>
    <path d="M-8 24c5 2 11 2 16 0" stroke="#7a5a40" stroke-width="1" fill="none" opacity=".5"/>
    <g fill="#8a744f" opacity=".4"><circle cx="-9" cy="-20" r="1.2"/><circle cx="8" cy="-12" r="1.2"/><circle cx="-4" cy="2" r="1"/></g>
  `),

  gymBench: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="24" rx="46" ry="11" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
    <rect x="-40" y="-16" width="80" height="32" rx="7" fill="#4a3428" stroke="#1a110a" stroke-width="1.3"/>
    <path d="M-34 -12h68v10h-68Z" fill="#8a6a4a" opacity=".3"/>
    <path d="M-30 2h60" stroke="#2a1a10" stroke-width="1" opacity=".5"/>
    <path d="M-30 16v10M30 16v10" stroke="var(--metal)" stroke-width="3"/>
    <path d="M-38 26h76" stroke="var(--metal-hi)" stroke-width="2" opacity=".3"/>
    <g fill="var(--metal-hi)" opacity=".3"><circle cx="-34" cy="-12" r="1.2"/><circle cx="34" cy="-12" r="1.2"/></g>
  `),

  washer: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="30" rx="32" ry="10" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <rect x="-28" y="-34" width="56" height="62" rx="4" fill="#5a6462" stroke="#171c1c" stroke-width="1.3"/>
    <rect x="-24" y="-30" width="48" height="54" rx="3" fill="#485250" opacity=".8"/>
    <circle cx="0" cy="-4" r="18" fill="#2b3231" stroke="#8a9694" stroke-width="2"/>
    <circle cx="0" cy="-4" r="12" fill="#0e1517" stroke="#5a6664" stroke-width="1"/>
    <path d="M-10 -10c5-6 15-6 20 0" stroke="#b7c4c0" stroke-width="1" fill="none" opacity=".2"/>
    <g fill="#a6b0ac" opacity=".55"><circle cx="-18" cy="-24" r="1.6"/><circle cx="-10" cy="-24" r="1.6"/><circle cx="14" cy="-24" r="1.6"/></g>
    <path d="M-24 18h48" stroke="#171c1c" stroke-width="1" opacity=".6"/>
    <path d="M-28 24h56" stroke="#0e1212" stroke-width="1.4" opacity=".6"/>
  `),

  reelShelf: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="-46" y="-28" width="92" height="6" fill="var(--wood-hi)" opacity=".3"/>
    <rect x="-46" y="-4" width="92" height="5" fill="var(--wood-hi)" opacity=".22"/>
    <g>
      <circle cx="-30" cy="-14" r="11" fill="#1a1d1c" stroke="#8a8f88" stroke-width="1.1"/>
      <circle cx="-30" cy="-14" r="3.4" fill="#0c0e0d"/>
      <circle cx="-30" cy="-14" r="7" fill="none" stroke="#5b605c" stroke-width=".7" stroke-dasharray="2 2"/>
      <circle cx="-4" cy="-14" r="9" fill="#20241f" stroke="#8a8f88" stroke-width="1"/>
      <circle cx="-4" cy="-14" r="3" fill="#0c0e0d"/>
      <rect x="14" y="-24" width="22" height="16" rx="1" fill="#8a744f" opacity=".45" stroke="#c9b27c" stroke-width=".7"/>
      <path d="M19 -16h12" stroke="#d9c48c" stroke-width=".6" opacity=".4"/>
      <circle cx="26" cy="8" r="9" fill="#171b1a" stroke="#6b706a" stroke-width="1"/>
      <circle cx="26" cy="8" r="3" fill="#0c0e0d"/>
    </g>
    <path d="M-48 -30v46M48 -30v46" stroke="#15100c" stroke-width="2" opacity=".6"/>
  `),

  slotMachine: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="38" rx="30" ry="10" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <rect x="-24" y="-40" width="48" height="74" rx="5" fill="#5a2a34" stroke="#1a0c10" stroke-width="1.3"/>
    <rect x="-19" y="-34" width="38" height="28" rx="3" fill="#2b1a1e" stroke="#8a5a4a" stroke-width=".9"/>
    <g fill="#e0d0a6" opacity=".7">
      <rect x="-15" y="-30" width="10" height="20" rx="1"/><rect x="-3" y="-30" width="10" height="20" rx="1"/><rect x="9" y="-30" width="6" height="20" rx="1"/>
    </g>
    <g stroke="#8a5a4a" stroke-width=".7" opacity=".5"><path d="M-15 -20h10M-3 -20h10M9 -20h6"/></g>
    <circle cx="0" cy="10" r="7" fill="#c9a15e" opacity=".4" stroke="#e6d0a0" stroke-width=".9"/>
    <path d="M-16 26h32" stroke="#d9b56e" stroke-width="1.4" opacity=".4"/>
    <path d="M24 -6h10v22" stroke="var(--metal-hi)" stroke-width="2.4" fill="none" opacity=".55"/>
    <circle cx="34" cy="-8" r="3" fill="#8a2a2a" opacity=".6"/>
    <g fill="#d9b56e" opacity=".3"><circle cx="-16" cy="30" r="1.2"/><circle cx="16" cy="30" r="1.2"/></g>
  `),

  barberChair: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="40" rx="40" ry="13" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
    <ellipse cx="0" cy="34" rx="24" ry="8" fill="var(--metal)" stroke="#1a1d1c" stroke-width="1.2"/>
    <rect x="-6" y="8" width="12" height="26" fill="url(#rs-steel)" stroke="#1a1d1c" stroke-width=".8"/>
    <path d="M-30 -16h60l4 30c-6 8-18 12-34 12s-28-4-34-12Z" fill="#54262a" stroke="#1a0e10" stroke-width="1.4"/>
    <path d="M-26 -14h52l2 20c-4 6-14 9-28 9s-24-3-28-9Z" fill="#6a3136" opacity=".7"/>
    <path d="M-24 -20c0-16 10-24 24-24s24 8 24 24l-4 10c-8-6-32-6-40 0Z" fill="#5a2a30" stroke="#1a0e10" stroke-width="1.3"/>
    <rect x="-18" y="-50" width="36" height="16" rx="7" fill="#6a3438" stroke="#1a0e10" stroke-width="1.2"/>
    <path d="M-18 -44h36" stroke="#8a4a50" stroke-width=".9" opacity=".5"/>
    <path d="M-32 -10h-8v22h8M32 -10h8v22h-8" stroke="url(#rs-steel)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M-32 -10h-10M32 -10h10" stroke="url(#rs-brass)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M-30 8h60" stroke="#c9b08a" stroke-width="1.3" opacity=".35"/>
    <g fill="var(--metal-hi)" opacity=".4"><circle cx="-8" cy="-56" r="1.4"/><circle cx="8" cy="-56" r="1.4"/></g>
    <path d="M-14 24h28" stroke="#8a4a50" stroke-width="1" opacity=".4"/>
  `),

  barberPole: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <path d="M0 -58v-10" stroke="var(--metal)" stroke-width="2.6"/>
    <rect x="-11" y="-50" width="22" height="100" rx="11" fill="#e6e0cd" stroke="#2a2319" stroke-width="1.4"/>
    <defs><clipPath id="rs-barber-clip"><rect x="-10" y="-49" width="20" height="98" rx="10"/></clipPath></defs>
    <g clip-path="url(#rs-barber-clip)">
      <rect x="-10" y="-49" width="20" height="98" fill="#efe9d8"/>
      <path d="M-24 -58l44 22v16l-44-22Z" fill="#8d2a2a" opacity=".8"/>
      <path d="M-24 -30l44 22v16l-44-22Z" fill="#2f4a5c" opacity=".75"/>
      <path d="M-24 -2l44 22v16l-44-22Z" fill="#8d2a2a" opacity=".8"/>
      <path d="M-24 26l44 22v16l-44-22Z" fill="#2f4a5c" opacity=".75"/>
      <path d="M-6 -50v100" stroke="#fff" stroke-width="3" opacity=".18"/>
    </g>
    <circle cy="-50" r="7" fill="url(#rs-brass)" stroke="#332310" stroke-width=".8"/>
    <circle cy="50" r="7" fill="url(#rs-brass)" stroke="#332310" stroke-width=".8"/>
    <path d="M0 57v8" stroke="var(--metal)" stroke-width="2.4"/>
    <ellipse cx="0" cy="66" rx="12" ry="4" fill="#000" opacity=".3"/>
  `),

  mirror: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="-56" y="-36" width="112" height="74" rx="3" fill="var(--wood)" stroke="#140e09" stroke-width="1.4"/>
    <rect x="-48" y="-28" width="96" height="58" fill="#0c171a" stroke="#8a8f88" stroke-width="1.2" opacity=".9"/>
    <path d="M-42 -20l22 18-10 14M20 -22l14 12-8 10" stroke="#d7e3e2" stroke-width=".9" opacity=".16" fill="none"/>
    <g fill="#ffe2a3" opacity=".4">
      <circle cx="-42" cy="-20" r="2"/><circle cx="42" cy="-20" r="2"/><circle cx="-42" cy="20" r="2"/><circle cx="42" cy="20" r="2"/>
    </g>
    <rect x="-58" y="40" width="116" height="6" rx="1" fill="var(--wood)" stroke="#140e09" stroke-width=".9"/>
    <g>
      <rect x="-38" y="26" width="8" height="14" rx="2" fill="#4c5e3a"/><rect x="-35" y="20" width="2" height="7" fill="#3e4d30"/>
      <rect x="-14" y="28" width="7" height="12" rx="2" fill="#6b3d2a"/><rect x="-12" y="22" width="2" height="6" fill="#4a2a1d"/>
      <rect x="18" y="24" width="10" height="16" rx="2" fill="#3d4e56"/><rect x="21" y="18" width="2" height="7" fill="#333f46"/>
    </g>
    <path d="M-52 -32h104" stroke="var(--wood-hi)" stroke-width="1.6" opacity=".3"/>
  `),

  laundryBasket: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="18" rx="30" ry="9" fill="#000" opacity=".4"/>
    <path d="M-26 0h52l-7 26h-38Z" fill="#8a744f" stroke="#2a2319" stroke-width="1.2"/>
    <path d="M-26 0c0-8 12-12 26-12s26 4 26 12Z" fill="#a88e62" stroke="#2a2319" stroke-width="1.2"/>
    <path d="M-18 -2c8 4 28 4 36 0" stroke="#6e5a3c" stroke-width="1" opacity=".5"/>
    <g fill="#e0d8c4" opacity=".5">
      <path d="M-16 -4c-3-10 6-16 14-14s10 10 6 14Z"/>
      <path d="M2 -2c-2-12 10-18 18-12s2 14-4 14Z"/>
    </g>
    <path d="M-26 6h52M-24 14h48" stroke="#5a4a32" stroke-width="1" opacity=".5"/>
    <path d="M-14 6l-2 18M14 6l2 18" stroke="#5a4a32" stroke-width=".8" opacity=".35"/>
  `),

  beam: ({ x, y, w = 340, r = 0 }) => sceneG(x, y, 1, r, `
    <rect x="${-w / 2}" y="-8" width="${w}" height="16" fill="var(--wood)" stroke="#15100c" stroke-width="1.2"/>
    <path d="M${-w / 2 + 2} -3h${w - 4}M${-w / 2 + 2} 4h${w - 4}" stroke="var(--wood-hi)" stroke-width="1" opacity=".22"/>
    <g fill="#000" opacity=".25">
      <path d="M${-w / 2 + 30} -8v16M${-w / 2 + 90} -8v16M${-w / 2 + 150} -8v16M${w / 2 - 30} -8v16M${w / 2 - 90} -8v16M${w / 2 - 150} -8v16"/>
    </g>
    <g fill="var(--metal-hi)" opacity=".22"><circle cx="${-w / 2 + 18}" cy="0" r="1.4"/><circle cx="${w / 2 - 18}" cy="0" r="1.4"/></g>
  `),

  filmCans: ({ x, y, r = 0 }) => sceneG(x, y, 1, r, `
    <ellipse cx="0" cy="20" rx="34" ry="10" fill="#000" opacity=".4"/>
    <circle cx="-14" cy="-2" r="15" fill="#1a1d1c" stroke="#8a8f88" stroke-width="1.2"/>
    <circle cx="-14" cy="-2" r="5" fill="#0c0e0d" stroke="#5b605c" stroke-width=".8"/>
    <circle cx="-14" cy="-2" r="9" fill="none" stroke="#5b605c" stroke-width=".7" stroke-dasharray="2 2"/>
    <circle cx="14" cy="2" r="12" fill="#20241f" stroke="#6b706a" stroke-width="1.1"/>
    <circle cx="14" cy="2" r="4" fill="#0c0e0d"/>
    <rect x="-26" y="14" width="22" height="10" rx="2" fill="#8a744f" opacity=".5" stroke="#c9b27c" stroke-width=".7"/>
    <rect x="6" y="16" width="20" height="9" rx="2" fill="#6b5a3c" opacity=".5" stroke="#c9b27c" stroke-width=".7"/>
  `)
};
