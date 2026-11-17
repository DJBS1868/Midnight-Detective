/* ============================================================
   MIDNIGHT DETECTIVE — FOCAL STATIONS (desks & windows)
   ============================================================ */

function windowBase(st, o = {}) {
  const {
    w = 112, h = 62, round = false, door = false, roll = false, bars = false,
    rain = false, city = false, stain = false, neon = false, frost = false,
    booth = false, shop = false, train = false, arch = false, high = false,
    project = false, stage = false, back = false
  } = o;
  const x = st.x, y = st.y, r = st.r || 0, s = st.s || 1;

  if (round) {
    return sceneG(x, y, s, r, `
      <circle r="36" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <circle r="30" fill="#081116" stroke="url(#rs-brass)" stroke-width="7"/>
      <circle r="23" fill="url(#rs-night)"/>
      <g stroke="#7fa6ae" stroke-width=".8" opacity=".45">
        <path d="M-16 8c4-10 12-15 22-14M-20 -4c7-6 14-9 23-9M-9 16c6-6 14-8 22-6"/>
      </g>
      <circle r="26" fill="none" stroke="#e7d5a9" stroke-width=".7" opacity=".2"/>
      <g fill="#e6c98c" opacity=".55">
        <circle cx="0" cy="-30" r="1.3"/><circle cx="21" cy="-21" r="1.3"/><circle cx="30" cy="0" r="1.3"/>
        <circle cx="21" cy="21" r="1.3"/><circle cx="0" cy="30" r="1.3"/><circle cx="-21" cy="21" r="1.3"/>
        <circle cx="-30" cy="0" r="1.3"/><circle cx="-21" cy="-21" r="1.3"/>
      </g>
      <path d="M-17 -17c6-5 12-7 18-7" stroke="#fff" stroke-width="1.2" opacity=".25" fill="none"/>
    `);
  }

  if (door) {
    const tone = stage ? '#4a2a1e' : back ? '#3d4341' : '#3a2a1c';
    return sceneG(x, y, s, r, `
      <rect x="${-w / 2 - 4}" y="${-h / 2 - 4}" width="${w + 8}" height="${h + 8}" fill="#070606" opacity=".55" filter="url(#rs-blur2)"/>
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${tone}" stroke="#14100c" stroke-width="4"/>
      <rect x="${-w / 2 + 7}" y="${-h / 2 + 7}" width="${w - 14}" height="${h - 14}" fill="#1a1510" stroke="#59452f" stroke-width=".9" opacity=".8"/>
      <rect x="${-w / 2 + 15}" y="${-h / 2 + 14}" width="${w - 30}" height="${h * .38}" fill="#0b1519" stroke="#3c3630" stroke-width="1.2"/>
      ${stage ? `<g fill="#d9b56e" opacity=".55" transform="translate(0 ${-h / 2 + 26})"><path d="M0 -8l2.4 5 5.4.6-4 3.7 1.1 5.3L0 4.4l-4.9 2.2 1.1-5.3-4-3.7 5.4-.6Z"/></g>` : ''}
      ${back ? `
        <g transform="translate(0 ${-h / 2 + 24})">
          <rect x="-21" y="-8" width="42" height="13" rx="1" fill="#1b0e0d" stroke="#6a2a28" stroke-width=".8"/>
          <text y="2" text-anchor="middle" font-family="Oswald, sans-serif" font-size="6.2" letter-spacing="2" fill="#e78072" opacity=".85">EXIT</text>
        </g>
        <rect x="${-w / 2 + 12}" y="12" width="${w - 24}" height="7" rx="3" fill="#8a3a32" opacity=".5"/>
        <path d="M${-w / 2 + 6} ${h / 2 + 4}h${w - 12}" stroke="#050606" stroke-width="5" opacity=".55"/>
        <path d="M${-w / 2 + 8} ${h / 2 + 4}h${w - 16}" stroke="#7c8a89" stroke-width="1" opacity=".25"/>
      ` : ''}
      <path d="M${-w / 2 + 12} ${h / 2 - 10}h${w - 24}" stroke="#b09a6b" stroke-width="1" opacity=".3"/>
      <circle cx="${w / 2 - 14}" cy="${h / 2 - 22}" r="2.8" fill="url(#rs-brass)"/>
      <path d="M${-w / 2 + 10} ${-h / 2 + 7}v${h - 14}" stroke="#c7ae7c" stroke-width=".8" opacity=".2"/>
      <path d="M${-w / 2 + 7} ${h / 2 - 6}l-10 10" stroke="#d9b477" stroke-width=".8" opacity=".2"/>
    `);
  }

  if (roll) {
    return sceneG(x, y, s, r, `
      <rect x="${-w / 2 - 5}" y="${-h / 2 - 5}" width="${w + 10}" height="${h + 10}" fill="#000" opacity=".5" filter="url(#rs-blur2)"/>
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="var(--metal)" stroke="#12171a" stroke-width="4"/>
      <g stroke="#0e1316" stroke-width="2" opacity=".65">
        <path d="M${-w / 2 + 4} ${-h / 2 + 12}h${w - 8}M${-w / 2 + 4} ${-h / 2 + 24}h${w - 8}M${-w / 2 + 4} ${-h / 2 + 36}h${w - 8}M${-w / 2 + 4} ${-h / 2 + 48}h${w - 8}M${-w / 2 + 4} ${-h / 2 + 60}h${w - 8}"/>
      </g>
      <rect x="${-w / 2 + 26}" y="${-h / 2 + 8}" width="${w - 52}" height="18" rx="2" fill="#0a1518" stroke="#5b686a" stroke-width="1.2"/>
      <path d="M${-w / 2 + 30} ${-h / 2 + 12}c18-4 34-4 50 0" stroke="#b9dce2" stroke-width=".8" opacity=".25"/>
      <rect x="${w / 2 - 30}" y="${h / 2 - 22}" width="16" height="5" rx="2" fill="#20282a" stroke="#9aa7a5" stroke-width=".8"/>
      <path d="M${-w / 2 + 4} ${h / 2 - 4}h${w - 8}" stroke="#7c8a89" stroke-width="2" opacity=".3"/>
    `);
  }

  const frame = arch
    ? `<path d="M${-w / 2} ${h / 2}V${-h / 2 + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${h / 2}Z" fill="#05090c" stroke="#171310" stroke-width="5"/>`
    : `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#05090c" stroke="#171310" stroke-width="5"/>`;
  const glass = arch
    ? `<path d="M${-w / 2 + 5} ${h / 2 - 5}V${-h / 2 + w / 2}a${w / 2 - 5} ${w / 2 - 5} 0 0 1 ${w - 10} 0V${h / 2 - 5}Z" fill="url(#rs-night)"/>`
    : `<rect x="${-w / 2 + 5}" y="${-h / 2 + 5}" width="${w - 10}" height="${h - 10}" fill="url(#rs-night)"/>`;

  const cityArt = city ? `<g opacity=".65">
      <path d="M${-w / 2 + 8} ${h / 2 - 6}v-26h14v26M${-w / 2 + 26} ${h / 2 - 6}v-38h18v38M${-w / 2 + 48} ${h / 2 - 6}v-20h12v20M${-w / 2 + 64} ${h / 2 - 6}v-32h16v32" fill="#0a1116"/>
      <g fill="#f0c47b" opacity=".55">
        <rect x="${-w / 2 + 12}" y="${h / 2 - 28}" width="2" height="3"/><rect x="${-w / 2 + 30}" y="${h / 2 - 36}" width="2" height="3"/>
        <rect x="${-w / 2 + 38}" y="${h / 2 - 24}" width="2" height="3"/><rect x="${-w / 2 + 68}" y="${h / 2 - 20}" width="2" height="3"/>
        <rect x="${-w / 2 + 74}" y="${h / 2 - 30}" width="2" height="3"/>
      </g>
    </g>` : '';

  const rainArt = rain ? `<g stroke="#b9dce5" stroke-width=".8" opacity=".42">
      <path d="M${-w / 2 + 18} ${-h / 2 + 6}l-7 ${h - 12}M${-w / 2 + 40} ${-h / 2 + 6}l-6 ${h - 12}M${-w / 2 + 64} ${-h / 2 + 6}l-7 ${h - 12}M${-w / 2 + 86} ${-h / 2 + 6}l-6 ${h - 12}"/>
      <path d="M${-w / 2 + 10} ${-h / 2 + 18}h${w - 20}" stroke-width=".6" opacity=".5"/>
    </g>` : '';

  const stainArt = stain ? `<g>
      <path d="M${-w / 2 + 5} ${-h / 2 + 12}h${w - 10}v${h - 19}h-${w - 10}Z" fill="#1a1219"/>
      <g fill="#8a3e5e" opacity=".55"><path d="M${-w / 2 + 8} ${-h / 2 + 15}h26v22h-26Z"/><path d="M${-w / 2 + 38} ${-h / 2 + 15}h30v22h-30Z"/></g>
      <g fill="#3f5f8a" opacity=".5"><path d="M${-w / 2 + 8} ${-h / 2 + 40}h26v${h - 48}h-26Z"/><path d="M${-w / 2 + 38} ${-h / 2 + 40}h30v${h - 48}h-30Z"/></g>
      <g fill="#a8863f" opacity=".45"><circle cx="0" cy="${-h / 2 + 26}" r="13"/></g>
      <g stroke="#0d0a0c" stroke-width="1.6" opacity=".8"><path d="M${-w / 2 + 8} ${-h / 2 + 37}h${w - 16}M${-w / 2 + 36} ${-h / 2 + 15}v${h - 23}"/></g>
    </g>` : '';

  const frostArt = frost ? `<rect x="${-w / 2 + 5}" y="${-h / 2 + 5}" width="${w - 10}" height="${h - 10}" fill="#b7c9c3" opacity=".14"/>
    <g stroke="#d8e4dc" stroke-width=".8" opacity=".28"><path d="M${-w / 2 + 14} ${-h / 2 + 10}c8 10 4 22 12 32M${-w / 2 + 58} ${-h / 2 + 8}c-6 12 4 20 1 34"/></g>` : '';

  const neonArt = neon ? `<rect x="${-w / 2 + 5}" y="${-h / 2 + 5}" width="${w - 10}" height="${h - 10}" fill="#c05b78" opacity=".08"/>
    <path d="M${-w / 2 + 12} ${h / 2 - 8}c18-6 36-4 54-8s28 0 34-4" stroke="#e690a7" stroke-width="1.2" opacity=".35" filter="url(#rs-glow)"/>` : '';

  const barsArt = bars ? `<g stroke="#9aa3a0" stroke-width="2.2" opacity=".55">
      <path d="M${-w / 2 + 16} ${-h / 2 + 4}v${h - 8}M${-w / 2 + 38} ${-h / 2 + 4}v${h - 8}M${-w / 2 + 60} ${-h / 2 + 4}v${h - 8}M${-w / 2 + 82} ${-h / 2 + 4}v${h - 8}"/>
      <path d="M${-w / 2 + 6} ${-h / 2 + 10}h${w - 12}M${-w / 2 + 6} ${h / 2 - 12}h${w - 12}"/>
    </g>` : '';

  const mullions = `<g stroke="#1a1611" stroke-width="2" opacity=".9">
      <path d="M0 ${-h / 2 + 4}v${h - 8}"/>
      <path d="M${-w / 2 + 4} ${-h / 2 + 24}h${w - 8}"/>
    </g>`;

  const boothArt = booth || project ? `<rect x="${-w / 2 + 5}" y="${-h / 2 + 5}" width="${w - 10}" height="${h - 10}" fill="#0d1717"/>
    <rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" fill="#132225" opacity=".7"/>
    <g stroke="#6f9296" stroke-width=".8" opacity=".3"><path d="M${-w / 2 + 12} ${-h / 2 + 20}h${w - 24}M${-w / 2 + 12} ${-h / 2 + 36}h${w - 24}"/></g>
    <path d="M${-w / 2 + 10} ${-h / 2 + 8}l${w - 20} ${h - 16}" stroke="#d7e3e2" stroke-width="1.4" opacity=".13"/>` : '';

  const shopArt = shop ? `<rect x="${-w / 2 + 5}" y="${-h / 2 + 5}" width="${w - 10}" height="${h - 10}" fill="#10191b" opacity=".75"/>
    <g fill="#d9b56e" opacity=".45"><path d="M${-w / 2 + 16} ${h / 2 - 16}h${w - 32}" stroke="#d9b56e" stroke-width="1.2"/></g>
    <path d="M${-w / 2 + 8} ${-h / 2 + 8}l${w - 16} ${h - 16}" stroke="#d7e3e2" stroke-width="1.6" opacity=".12"/>` : '';

  const trainArt = train ? `<g stroke="#4b5b4b" stroke-width="4" opacity=".55">
      <path d="M${-w / 2 + 12} ${-h / 2}v${h}M${w / 2 - 12} ${-h / 2}v${h}"/>
      <path d="M${-w / 2 + 20} ${-h / 2}c-6 16-6 34 0 50M${w / 2 - 20} ${-h / 2}c6 16 6 34 0 50" stroke-width="2"/>
    </g>
    <g fill="#f0c47b" opacity=".35"><circle cx="${w / 2 - 30}" cy="${-h / 2 + 20}" r="1.2"/><circle cx="${w / 2 - 22}" cy="${-h / 2 + 34}" r="1"/></g>` : '';

  return sceneG(x, y, s, r, `
    <rect x="${-w / 2 - 4}" y="${-h / 2 - 4}" width="${w + 8}" height="${h + 8}" fill="#000" opacity=".4" filter="url(#rs-blur2)"/>
    ${frame}${glass}
    ${cityArt}${rainArt}${stainArt}${frostArt}${neonArt}${trainArt}${boothArt}${shopArt}${barsArt}
    ${mullions}
    <rect x="${-w / 2 - 5}" y="${h / 2 - 3}" width="${w + 10}" height="8" fill="var(--wood)" stroke="#1a110a" stroke-width="1"/>
    <path d="M${-w / 2 + 6} ${-h / 2 + 6}h${w - 12}" stroke="#d7e3e2" stroke-width="1" opacity=".16"/>
  `);
}

const STATIONS = {
  /* ---------------- desks / work surfaces ---------------- */
  writingDesk: {
    label: 'DESK', name: 'the writing desk', place: 'under the writing desk',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="76" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-70" y="-30" width="140" height="66" rx="3" fill="var(--wood)" stroke="#160f0a" stroke-width="1.4"/>
      <rect x="-66" y="-26" width="132" height="10" fill="var(--woodHi)" opacity=".3"/>
      <g stroke="#160f0a" stroke-width=".7" opacity=".35"><path d="M-62 -14h124M-62 2h124M-62 18h124"/></g>
      <rect x="-51" y="-20" width="34" height="26" fill="#cbb997" opacity=".8" transform="rotate(-6 -34 -7)"/>
      <g stroke="#6b583b" stroke-width=".8" opacity=".7" transform="rotate(-6 -34 -7)"><path d="M-46 -13h24M-46 -8h24M-46 -3h20"/></g>
      <ellipse cx="22" cy="-4" rx="12" ry="10" fill="#181310" stroke="#54442f" stroke-width="1"/>
      <ellipse cx="22" cy="-5" rx="6" ry="4.4" fill="#0d0a08"/>
      <path d="M47 -18l12 3-2 18-12-2z" fill="#241a10" stroke="#4b3a27"/>
      <path d="M-20 12c14-3 30-3 44 1" stroke="var(--accent)" stroke-width="1" opacity=".25"/>
      <path d="M52 -6l14-2" stroke="#d1c4aa" stroke-width="1.6" opacity=".4"/>
    `)
  },

  barTop: {
    label: 'BAR', name: 'the private bar', place: 'behind the bar',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="28" rx="92" ry="20" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-88" y="-25" width="176" height="53" rx="3" fill="var(--wood)" stroke="#120c08" stroke-width="1.4"/>
      <rect x="-84" y="-21" width="168" height="10" fill="var(--woodHi)" opacity=".32"/>
      <path d="M-84 -3h168" stroke="#000" stroke-width="1" opacity=".2"/>
      <g>
        <rect x="-70" y="-52" width="9" height="28" rx="2" fill="#3f5a39"/><rect x="-68" y="-58" width="2.4" height="7" fill="#2f442b"/>
        <rect x="-56" y="-46" width="10" height="22" rx="2" fill="#7a4a2c"/><rect x="-53.6" y="-52" width="2.4" height="7" fill="#5a351f"/>
        <rect x="-42" y="-56" width="8" height="32" rx="2" fill="#4b5d66"/><rect x="-40" y="-62" width="2.2" height="7" fill="#3a4a51"/>
      </g>
      <g><ellipse cx="4" cy="-12" rx="8" ry="7" fill="#a88955" opacity=".35" stroke="#d9c39a" stroke-width=".7"/>
        <path d="M4 -17v10" stroke="#c5ae80" stroke-width="1" opacity=".5"/></g>
      <g><ellipse cx="30" cy="-8" rx="9" ry="6" fill="#c9b27c" opacity=".25" stroke="#e0d0a6" stroke-width=".7"/>
        <path d="M22 -8h16" stroke="#e0d0a6" stroke-width="1" opacity=".4"/></g>
      <ellipse cx="62" cy="-2" rx="13" ry="9" fill="#18130e" stroke="#4c3a28" stroke-width="1"/>
      <path d="M57 -4l10 0M60 -7l1 8" stroke="#c9a15e" stroke-width=".8" opacity=".25"/>
      <path d="M-88 12h176" stroke="url(#rs-brass)" stroke-width="2.4" opacity=".55"/>
      <path d="M-88 20h176" stroke="#000" stroke-width="1" opacity=".25"/>
      <path d="M-60 -21c12 4 24 4 36 0" stroke="#e0d0a6" stroke-width="1" opacity=".2"/>
    `)
  },

  chartTable: {
    label: 'CHART', name: 'the chart table', place: 'under the chart table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="32" rx="82" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-76" y="-36" width="152" height="74" rx="2" fill="var(--wood)" stroke="#16100a" stroke-width="1.4"/>
      <rect x="-72" y="-32" width="144" height="66" fill="#20282a" stroke="#4f5c5c" stroke-width=".8" opacity=".8"/>
      <g stroke="#9cbcbc" stroke-width=".7" opacity=".35">
        <path d="M-62 -24c24 4 48 2 72-2M-64 4c30-3 54 2 82 0M-60 26c22-2 44 0 66-2"/>
        <path d="M-40 -30c-2 20 2 40 4 58M14 -30c4 18 2 38 0 58"/>
      </g>
      <path d="M-54 18l14-14 12 8 16-18 14 6" fill="none" stroke="#d4b26e" stroke-width="1.1" opacity=".55"/>
      <g transform="translate(46 -18)">
        <circle r="13" fill="#141a1b" stroke="url(#rs-brass)" stroke-width="1.4"/>
        <path d="M0 -9v18M-9 0h18M-6 -6l12 12M6 -6l-12 12" stroke="#d9c39a" stroke-width=".7" opacity=".5"/>
        <circle r="2.4" fill="#d9c39a" opacity=".6"/>
      </g>
      <g transform="translate(-12 10)"><path d="M-20 -9l34 18M-20 9l34-18" stroke="url(#rs-steel)" stroke-width="2" stroke-linecap="round"/><circle r="3" fill="#c9b27c"/></g>
      <rect x="-66" y="-42" width="32" height="6" rx="3" fill="#d8c8a6" opacity=".4" transform="rotate(-7 -50 -39)"/>
      <path d="M-76 -2h152" stroke="#d0bb90" stroke-width=".8" opacity=".18"/>
      <path d="M55 34h14" stroke="#d1c4aa" stroke-width="1.6" opacity=".3"/>
    `)
  },

  dinerTable: {
    label: 'TABLE', name: 'the booth table', place: 'under the booth table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="28" rx="52" ry="16" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <rect x="-46" y="-32" width="92" height="66" rx="4" fill="#b7a98f" stroke="#2c241b" stroke-width="1.2"/>
      <rect x="-42" y="-28" width="84" height="58" rx="3" fill="#c8bca2" opacity=".35"/>
      <path d="M-42 -20h84M-42 20h84" stroke="#e6dcc4" stroke-width="1" opacity=".3"/>
      <g transform="translate(-22 -6)">
        <ellipse rx="13" ry="10" fill="#e4dcc8" stroke="#8a7b60" stroke-width=".8"/>
        <ellipse rx="8" ry="6" fill="#b9a06c" opacity=".5"/><path d="M-12 3c4 5 20 5 24 0" stroke="#8a7b60" stroke-width=".7" fill="none"/>
      </g>
      <g transform="translate(18 -12)">
        <path d="M-7 -9h14v12a5 5 0 0 1-10 0Z" fill="#e8e0cf" stroke="#8a7b60" stroke-width=".7"/>
        <path d="M7 -5c5 0 5 7 0 7" fill="none" stroke="#8a7b60" stroke-width="1"/>
        <ellipse cy="-9" rx="7" ry="2.4" fill="#4a2c18"/>
      </g>
      <g transform="translate(30 12)">
        <rect x="-8" y="-12" width="16" height="24" rx="3" fill="#9c2f2b" stroke="#401313" stroke-width=".8"/>
        <rect x="-6" y="-14" width="12" height="5" rx="1" fill="#d9c9a6"/>
      </g>
      <g transform="translate(-32 16) rotate(-12)"><rect x="-10" y="-5" width="20" height="10" fill="#e8e0cf" opacity=".7"/><path d="M-6 -1h12M-6 2h9" stroke="#8a7b60" stroke-width=".6"/></g>
      <path d="M-46 30h92" stroke="#ece2ca" stroke-width="1.4" opacity=".28"/>
    `)
  },

  vanityTable: {
    label: 'VANITY', name: 'the vanity', place: 'in the vanity drawer',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="66" ry="16" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-60" y="-30" width="120" height="60" rx="3" fill="var(--wood)" stroke="#160f0a" stroke-width="1.3"/>
      <rect x="-56" y="-26" width="112" height="9" fill="var(--woodHi)" opacity=".26"/>
      <g transform="translate(0 -42)">
        <rect x="-42" y="-18" width="84" height="34" rx="2" fill="#1b1713" stroke="url(#rs-brass)" stroke-width="1.4"/>
        <rect x="-37" y="-14" width="74" height="26" fill="#2b3336" opacity=".8"/>
        <g fill="#ffe3ad"><circle cx="-36" cy="-18" r="2"/><circle cx="-18" cy="-18" r="2"/><circle cx="0" cy="-18" r="2"/><circle cx="18" cy="-18" r="2"/><circle cx="36" cy="-18" r="2"/></g>
        <g fill="#ffe3ad" opacity=".55"><circle cx="-36" cy="-18" r="5" filter="url(#rs-blur2)"/><circle cx="0" cy="-18" r="5" filter="url(#rs-blur2)"/><circle cx="36" cy="-18" r="5" filter="url(#rs-blur2)"/></g>
      </g>
      <g transform="translate(-34 4)">
        <rect x="-6" y="-8" width="12" height="16" rx="4" fill="#b35a6a" opacity=".6"/>
        <rect x="-4" y="-13" width="8" height="6" fill="url(#rs-brass)"/>
      </g>
      <g transform="translate(-12 8)"><circle r="7" fill="#d9c9a6" opacity=".3" stroke="#e6dcc4" stroke-width=".7"/><circle r="3" fill="#8a3e3e" opacity=".5"/></g>
      <g transform="translate(16 2)"><rect x="-9" y="-6" width="18" height="12" rx="2" fill="#d9c9a6" opacity=".18" stroke="#e6dcc4" stroke-width=".6"/><path d="M-4 -2h8M-4 1h6" stroke="#6b583b" stroke-width=".6"/></g>
      <path d="M46 -2l7-9 7 9" stroke="#c9a15e" stroke-width="1" fill="none" opacity=".5"/>
      <path d="M-60 16h120" stroke="#000" stroke-width="1" opacity=".2"/>
    `)
  },

  workbench: {
    label: 'BENCH', name: 'the workbench', place: 'under the workbench',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="84" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-78" y="-30" width="156" height="64" rx="2" fill="var(--wood)" stroke="#16100a" stroke-width="1.5"/>
      <rect x="-74" y="-26" width="148" height="9" fill="var(--woodHi)" opacity=".25"/>
      <g stroke="#1a110a" stroke-width=".8" opacity=".4"><path d="M-70 -8h140M-70 10h140M-70 22h140"/></g>
      <g transform="translate(-54 -8)">
        <rect x="-14" y="-10" width="28" height="20" rx="2" fill="var(--metal)" stroke="#171a1a" stroke-width="1"/>
        <circle r="5" fill="#202526" stroke="var(--metalHi)" stroke-width=".8"/><path d="M0 -10v-8M-6 -18h12" stroke="var(--metalHi)" stroke-width="1.6"/>
      </g>
      <g transform="translate(10 2) rotate(14)">
        <path d="M-16 -3h26" stroke="#8a744f" stroke-width="3" stroke-linecap="round"/>
        <rect x="10" y="-7" width="10" height="14" rx="1" fill="var(--metal)" stroke="#1a1a18" stroke-width=".8"/>
      </g>
      <g transform="translate(42 -8) rotate(-8)">
        <path d="M-14 0h20M-4 -8v16M-10 8h12" stroke="#9b8b6d" stroke-width="1.4" fill="none"/>
      </g>
      <path d="M-66 18c20-4 43-4 64 0s38 3 56-1" stroke="#15110d" stroke-width="1.2" fill="none" opacity=".55"/>
      <g fill="#c9a15e" opacity=".18"><circle cx="-30" cy="16" r="1"/><circle cx="22" cy="20" r=".8"/><circle cx="56" cy="12" r="1"/></g>
      <path d="M-78 -2h156" stroke="#d9c39a" stroke-width=".8" opacity=".16"/>
    `)
  },

  trainTable: {
    label: 'TABLE', name: 'the fold-down table', place: 'under the fold-down table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="22" rx="42" ry="12" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <rect x="-38" y="-26" width="76" height="52" rx="2" fill="var(--wood)" stroke="#130d09" stroke-width="1.2"/>
      <rect x="-34" y="-22" width="68" height="8" fill="var(--woodHi)" opacity=".25"/>
      <path d="M-38 12h76" stroke="url(#rs-brass)" stroke-width="1.6" opacity=".45"/>
      <g transform="translate(-14 -2) rotate(-4)"><rect x="-12" y="-9" width="24" height="18" fill="#d9c9a6" opacity=".7"/><path d="M-8 -4h16M-8 0h13M-8 4h15" stroke="#6b583b" stroke-width=".6"/></g>
      <g transform="translate(18 -8)"><path d="M-5 -6h10v9a4 4 0 0 1-8 0Z" fill="#c9d3cc" opacity=".5" stroke="#dbe2da" stroke-width=".6"/><ellipse cy="-6" rx="5" ry="1.8" fill="#8a744f" opacity=".5"/></g>
      <ellipse cx="8" cy="12" rx="7" ry="4" fill="#171310" stroke="#4a3a28" stroke-width=".7"/>
      <path d="M-22 -26v-8h44v8" stroke="url(#rs-brass)" stroke-width="1.2" fill="none" opacity=".4"/>
    `)
  },

  console: {
    label: 'CONSOLE', name: 'the broadcast console', place: 'beneath the console',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="32" rx="80" ry="18" fill="#000" opacity=".55" filter="url(#rs-blur)"/>
      <rect x="-72" y="-28" width="144" height="58" rx="3" fill="var(--wood)" stroke="#130d09" stroke-width="1.4"/>
      <rect x="-68" y="-24" width="136" height="50" rx="2" fill="#1a1916" stroke="#4a4034" stroke-width="1"/>
      <g fill="#c9b790" opacity=".65">
        <circle cx="-56" cy="-12" r="2.2"/><circle cx="-46" cy="-12" r="2.2"/><circle cx="-36" cy="-12" r="2.2"/><circle cx="-26" cy="-12" r="2.2"/><circle cx="-16" cy="-12" r="2.2"/>
        <circle cx="-56" cy="0" r="2.2"/><circle cx="-46" cy="0" r="2.2"/><circle cx="-36" cy="0" r="2.2"/><circle cx="-26" cy="0" r="2.2"/><circle cx="-16" cy="0" r="2.2"/>
      </g>
      <g>
        <rect x="4" y="-20" width="22" height="14" rx="1" fill="#0d1314" stroke="#5b5142" stroke-width=".8"/>
        <path d="M8 -12l4-5 3 8 4-6 4 3" stroke="#d9b56e" stroke-width=".8" fill="none" opacity=".8"/>
        <rect x="32" y="-20" width="22" height="14" rx="1" fill="#0d1314" stroke="#5b5142" stroke-width=".8"/>
        <path d="M36 -13l4 4 4-7 4 5 3-3" stroke="#d9b56e" stroke-width=".8" fill="none" opacity=".65"/>
      </g>
      <g fill="#8b806b">
        <rect x="-58" y="8" width="26" height="3" rx="1.5"/><rect x="-58" y="14" width="26" height="3" rx="1.5"/>
        <rect x="-24" y="8" width="22" height="3" rx="1.5"/><rect x="-24" y="14" width="22" height="3" rx="1.5"/>
        <rect x="8" y="8" width="26" height="3" rx="1.5"/><rect x="8" y="14" width="26" height="3" rx="1.5"/>
        <rect x="42" y="8" width="18" height="3" rx="1.5"/><rect x="42" y="14" width="18" height="3" rx="1.5"/>
      </g>
      <g transform="translate(-52 20)"><path d="M-8 0a8 8 0 0 1 16 0v4H-8Z" fill="#23272a" stroke="#7c8788" stroke-width=".8"/><rect x="-12" y="4" width="6" height="4" rx="2" fill="#23272a" stroke="#7c8788" stroke-width=".6"/><rect x="6" y="4" width="6" height="4" rx="2" fill="#23272a" stroke="#7c8788" stroke-width=".6"/></g>
      <circle cx="54" cy="-14" r="3" fill="#b4503f" opacity=".6"/><path d="M-72 -28h144" stroke="#d9c39a" stroke-width=".8" opacity=".16"/>
    `)
  },

  glassCounter: {
    label: 'COUNTER', name: 'the counter', place: 'under the glass counter',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="28" rx="82" ry="16" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-78" y="-26" width="156" height="56" rx="3" fill="var(--wood)" stroke="#130d09" stroke-width="1.4"/>
      <rect x="-74" y="-22" width="148" height="38" fill="#1b2223" stroke="#5b5b50" stroke-width=".8"/>
      <g opacity=".7">
        <rect x="-66" y="-16" width="20" height="26" rx="2" fill="#6b5a3c" stroke="#a58e60" stroke-width=".7"/>
        <circle cx="-32" cy="-4" r="9" fill="#8f7a52" opacity=".5" stroke="#c9b27c" stroke-width=".7"/>
        <path d="M-12 8V-14l10-5 10 5V8Z" fill="#4a3e2c" stroke="#8f7a52" stroke-width=".7"/>
        <rect x="16" y="-12" width="18" height="20" rx="2" fill="#584a34" stroke="#a58e60" stroke-width=".7"/>
        <path d="M44 -14l8 8-8 8-8-8Z" fill="#8a6a3e" stroke="#c9b27c" stroke-width=".7"/>
      </g>
      <path d="M-74 -16h148" stroke="#cfe0e0" stroke-width="1.6" opacity=".25"/>
      <rect x="-74" y="-22" width="148" height="8" fill="#bfd3d2" opacity=".12"/>
      <g transform="translate(52 10)"><rect x="-10" y="-7" width="20" height="14" rx="2" fill="var(--metal)" stroke="#1a1c1b" stroke-width=".8"/><circle r="2.6" cy="-1" fill="#111"/><path d="M-4 4h8" stroke="#c9b27c" stroke-width="1"/></g>
      <path d="M-78 20h156" stroke="#000" stroke-width="1" opacity=".22"/>
      <path d="M-60 -22l20 38" stroke="#d7e3e2" stroke-width="1" opacity=".1"/>
    `)
  },

  cardTable: {
    label: 'CARDS', name: 'the card table', place: 'under the card table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="26" rx="62" ry="20" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <circle r="56" fill="var(--wood)" stroke="#160f0a" stroke-width="1.4"/>
      <circle r="49" fill="#2c4a34" stroke="#1a2b1f" stroke-width="1"/>
      <circle r="44" fill="none" stroke="#8a744f" stroke-width="1" opacity=".35"/>
      <g transform="translate(-20 -8) rotate(-16)">
        <rect x="-12" y="-16" width="24" height="32" rx="2" fill="#e4dcc8" stroke="#8a7b60" stroke-width=".6"/>
        <path d="M0 -12l4 8-4 8-4-8Z" fill="#8d2a2a" opacity=".7"/>
      </g>
      <g transform="translate(-8 -2) rotate(8)">
        <rect x="-12" y="-16" width="24" height="32" rx="2" fill="#e4dcc8" stroke="#8a7b60" stroke-width=".6"/>
        <path d="M-4 -8h8v16h-8Z" fill="#2c2a28" opacity=".5"/>
      </g>
      <g transform="translate(26 -14)">
        <circle r="7" fill="#8d2a2a" opacity=".7"/><circle r="7" fill="none" stroke="#d9c9a6" stroke-width="1" stroke-dasharray="2 3"/>
        <circle cx="18" cy="4" r="6" fill="#d9c9a6" opacity=".24"/><circle cx="18" cy="4" r="6" fill="none" stroke="#d9c9a6" stroke-width=".8" stroke-dasharray="2 3"/>
      </g>
      <g transform="translate(34 22)"><ellipse rx="10" ry="7" fill="#a88955" opacity=".25" stroke="#d9c39a" stroke-width=".7"/><path d="M0 -6v12" stroke="#d9c39a" stroke-width=".8" opacity=".5"/></g>
      <ellipse cx="-30" cy="24" rx="8" ry="4" fill="#241a10" stroke="#4a3a28" stroke-width=".7"/>
      <path d="M-56 0c8 3 12 9 12 16" stroke="#d9b56e" stroke-width=".8" fill="none" opacity=".2"/>
    `)
  },

  altarTable: {
    label: 'ALTAR', name: 'the altar', place: 'beneath the altar cloth',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="88" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-84" y="-30" width="168" height="66" rx="2" fill="var(--wood)" stroke="#16100a" stroke-width="1.4"/>
      <rect x="-80" y="-26" width="160" height="58" fill="#d9d2bd" opacity=".26"/>
      <path d="M-80 -26h160v10h-160zM-80 22h160v10h-160z" fill="#e6dcc4" opacity=".22"/>
      <path d="M-74 -20h148M-74 26h148" stroke="url(#rs-brass)" stroke-width="1.2" opacity=".45"/>
      <g transform="translate(-56 -2)">
        <rect x="-3" y="-18" width="6" height="18" fill="#d9c9a6"/>
        <ellipse cy="-20" rx="3.4" ry="5" fill="#ffd98c" opacity=".8"/>
        <ellipse cy="-20" rx="9" ry="8" fill="#ffd98c" opacity=".12" filter="url(#rs-blur2)"/>
      </g>
      <g transform="translate(56 -2)">
        <rect x="-3" y="-18" width="6" height="18" fill="#d9c9a6"/>
        <ellipse cy="-20" rx="3.4" ry="5" fill="#ffd98c" opacity=".8"/>
        <ellipse cy="-20" rx="9" ry="8" fill="#ffd98c" opacity=".12" filter="url(#rs-blur2)"/>
      </g>
      <g transform="translate(0 -2)">
        <path d="M-5 -16h10v24h-10Z" fill="#38251a" stroke="#8a744f" stroke-width=".7"/>
        <path d="M0 -20v32" stroke="url(#rs-brass)" stroke-width="2"/>
        <path d="M-8 -12h16" stroke="url(#rs-brass)" stroke-width="2"/>
      </g>
      <path d="M-50 20c14-3 30-3 44 0" stroke="#d9c9a6" stroke-width=".8" opacity=".25"/>
      <path d="M-84 16h168" stroke="#000" stroke-width="1" opacity=".18"/>
    `)
  },

  pottingBench: {
    label: 'BENCH', name: 'the potting bench', place: 'under the potting bench',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="82" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-78" y="-28" width="156" height="60" rx="2" fill="var(--wood)" stroke="#16100a" stroke-width="1.4"/>
      <rect x="-74" y="-24" width="148" height="8" fill="var(--wood-hi)" opacity=".22"/>
      <g fill="#6b4a30" stroke="#1a110a" stroke-width=".8">
        <path d="M-62 -14h18l-3 16h-12Z"/><path d="M-38 -14h15l-3 16h-9Z"/><path d="M-16 -14h20l-4 16h-13Z"/>
      </g>
      <g stroke="#6b8a5a" stroke-width="1.8" fill="none">
        <path d="M-53 -14v-12M-53 -20l-7-6M-53 -17l6-7M-31 -14v-10M-31 -20l6-6M-6 -14v-14M-6 -22l-7-6"/>
      </g>
      <g fill="#7e9a6b" opacity=".7">
        <ellipse cx="-60" cy="-28" rx="6" ry="2.8" transform="rotate(-28 -60 -28)"/><ellipse cx="-46" cy="-26" rx="5" ry="2.4" transform="rotate(26 -46 -26)"/>
        <ellipse cx="-25" cy="-27" rx="5" ry="2.4" transform="rotate(-24 -25 -27)"/><ellipse cx="-13" cy="-26" rx="5" ry="2.4" transform="rotate(28 -13 -26)"/>
      </g>
      <g transform="translate(26 -2)"><path d="M-10 4c0-6 4-10 10-10s10 4 10 10Z" fill="#6a5a3e" opacity=".5" stroke="#9a8a62" stroke-width=".8"/><path d="M20 4v-10h8v10" stroke="#9a8a62" stroke-width="1.2" fill="none"/></g>
      <g transform="translate(52 6)"><path d="M-10 0l8-8 8 8-8 8Z" fill="#8a744f" opacity=".6"/><path d="M-2 -8v16" stroke="#6b583b" stroke-width="1"/></g>
      <path d="M-66 18c20 4 42 3 62 0s36-2 52 1" stroke="#1a110a" stroke-width="1" fill="none" opacity=".5"/>
      <g fill="#3b2f1d" opacity=".6"><circle cx="-34" cy="18" r="1"/><circle cx="8" cy="20" r=".8"/><circle cx="42" cy="16" r="1"/></g>
    `)
  },

  metalTable: {
    label: 'TABLE', name: 'the steel table', place: 'under the steel table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="86" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-80" y="-30" width="160" height="62" rx="5" fill="url(#rs-steel)" stroke="#151b1b" stroke-width="1.4"/>
      <rect x="-74" y="-24" width="148" height="50" rx="3" fill="#b9c4be" opacity=".14"/>
      <g stroke="#6a7775" stroke-width="1" opacity=".35"><path d="M-68 -14h136M-68 0h136M-68 14h136"/></g>
      <g transform="translate(-34 -4) rotate(-6)">
        <rect x="-15" y="-12" width="30" height="22" fill="#e4dcc8" opacity=".7"/>
        <g stroke="#7a6a54" stroke-width=".6"><path d="M-11 -7h22M-11 -2h18M-11 3h20M-11 8h14"/></g>
        <rect x="16" y="-10" width="3" height="18" fill="#8d2a2a" opacity=".5"/>
      </g>
      <g transform="translate(38 -2)">
        <rect x="-16" y="-10" width="32" height="18" rx="3" fill="#9fa9a4" opacity=".3" stroke="#c4d0c8" stroke-width=".8"/>
        <path d="M-12 2l7-8 6 6 7-9" stroke="#5a6a67" stroke-width="1.4" fill="none"/>
        <circle cx="10" cy="-5" r="2.4" fill="#5a6a67" opacity=".5"/>
      </g>
      <path d="M-80 18h160" stroke="#d7e3e2" stroke-width="1" opacity=".2"/>
      <circle cx="-68" cy="20" r="1.4" fill="#d7e3e2" opacity=".3"/><circle cx="68" cy="20" r="1.4" fill="#d7e3e2" opacity=".3"/>
    `)
  },

  readingTable: {
    label: 'TABLE', name: 'the reading table', place: 'under the reading table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="32" rx="82" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-76" y="-30" width="152" height="66" rx="3" fill="var(--wood)" stroke="#160f0a" stroke-width="1.4"/>
      <rect x="-72" y="-26" width="144" height="10" fill="var(--wood-hi)" opacity=".24"/>
      <g transform="translate(-34 -2) rotate(-3)">
        <path d="M-22 -12h22v24h-22Z" fill="#e4dcc8" opacity=".7"/><path d="M0 -12h22v24H0Z" fill="#d9d0ba" opacity=".7"/>
        <path d="M-18 -6h14M-18 -1h14M-18 4h10M4 -6h14M4 -1h14M4 4h10" stroke="#7a6a54" stroke-width=".6"/>
      </g>
      <g transform="translate(36 -10)">
        <path d="M-16 0a12 12 0 0 1 24 0" fill="#2c5a3c" stroke="url(#rs-brass)" stroke-width="1.2"/>
        <path d="M-2 0v10M-9 14h14" stroke="url(#rs-brass)" stroke-width="1.4"/>
        <ellipse cy="6" rx="18" ry="10" fill="#ffcf87" opacity=".1"/>
      </g>
      <g transform="translate(24 14)"><circle r="8" fill="none" stroke="url(#rs-brass)" stroke-width="1.6"/><circle r="6" fill="#bfd3d2" opacity=".12"/><path d="M6 6l10 8" stroke="url(#rs-brass)" stroke-width="2" stroke-linecap="round"/></g>
      <g transform="translate(-38 16) rotate(4)"><rect x="-10" y="-6" width="20" height="12" fill="#d9c9a6" opacity=".6"/><path d="M-6 0h12" stroke="#6b583b" stroke-width=".7"/></g>
      <path d="M-76 22h152" stroke="#000" stroke-width="1" opacity=".2"/>
    `)
  },

  crateTable: {
    label: 'CRATES', name: 'the packing crate', place: 'under the packing crate',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="26" rx="60" ry="16" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <rect x="-52" y="-28" width="104" height="52" fill="var(--wood)" stroke="#16100a" stroke-width="1.4" transform="rotate(-2)"/>
      <path d="M-52 -20h104M-52 -5h104M-52 10h104M-38 -28l16 52M18 -28l-14 52" stroke="#1a110a" stroke-width="1" opacity=".45" transform="rotate(-2)"/>
      <path d="M-58 -24h116" stroke="var(--wood-hi)" stroke-width="5" opacity=".3" transform="rotate(-2)"/>
      <g transform="translate(18 -12) rotate(7)"><rect x="-8" y="-10" width="16" height="20" fill="#d9c9a6" opacity=".55"/><path d="M-4 -4h8M-4 1h6" stroke="#6b583b" stroke-width=".6"/></g>
      <path d="M-38 14c12-3 26-3 38 0" stroke="#8a744f" stroke-width="1.6" opacity=".35"/>
      <g transform="translate(-34 18)"><ellipse rx="9" ry="4" fill="#171310" stroke="#4a3a28" stroke-width=".7"/><path d="M-6 -2h12" stroke="#c9a15e" stroke-width=".7" opacity=".4"/></g>
    `)
  },

  foldingTable: {
    label: 'TABLE', name: 'the folding table', place: 'under the folding table',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="28" rx="76" ry="16" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <rect x="-70" y="-26" width="140" height="54" rx="2" fill="var(--wood)" stroke="#16100a" stroke-width="1.3"/>
      <rect x="-66" y="-22" width="132" height="8" fill="var(--wood-hi)" opacity=".2"/>
      <g transform="translate(-34 -2)">
        <rect x="-22" y="-14" width="44" height="28" rx="2" fill="#d9d2bd" opacity=".5" stroke="#ece2ca" stroke-width=".6"/>
        <path d="M-18 -6h36M-18 0h36M-18 6h30" stroke="#8a7b60" stroke-width=".6" opacity=".6"/>
      </g>
      <g transform="translate(30 -2) rotate(8)">
        <path d="M-14 -6h20a8 8 0 0 1 0 16h-20Z" fill="var(--metal)" stroke="#1a1c1b" stroke-width=".9"/>
        <path d="M6 -2c6 0 6 8 0 8" fill="none" stroke="#1a1c1b" stroke-width="2"/>
        <path d="M-10 12l4 8M2 12l-4 8" stroke="#1a1c1b" stroke-width="1.4"/>
      </g>
      <g transform="translate(38 16) rotate(-6)"><rect x="-10" y="-6" width="20" height="12" fill="#e4dcc8" opacity=".6"/><path d="M-6 -2h12M-6 2h9" stroke="#7a6a54" stroke-width=".6"/></g>
      <path d="M-70 18h140" stroke="#000" stroke-width="1" opacity=".2"/>
    `)
  },

  washstand: {
    label: 'WASHSTAND', name: 'the washstand', place: 'in the washstand drawer',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="28" rx="44" ry="12" fill="#000" opacity=".45" filter="url(#rs-blur)"/>
      <rect x="-38" y="-18" width="76" height="48" rx="2" fill="var(--wood)" stroke="#16100a" stroke-width="1.3"/>
      <rect x="-34" y="-14" width="68" height="7" fill="var(--wood-hi)" opacity=".24"/>
      <g transform="translate(0 -28)">
        <rect x="-24" y="-18" width="48" height="28" rx="2" fill="#1a1713" stroke="url(#rs-brass)" stroke-width="1.1"/>
        <rect x="-20" y="-14" width="40" height="20" fill="#2b3336" opacity=".7"/>
      </g>
      <g transform="translate(-14 4)">
        <ellipse rx="13" ry="8" fill="#b9c4be" opacity=".35" stroke="#d7e3e2" stroke-width=".8"/>
        <ellipse rx="8" ry="4.6" fill="#0d1719" opacity=".7"/>
        <path d="M8 -6h12l-4 12H8Z" fill="#c9c2ad" opacity=".35" stroke="#d7e3e2" stroke-width=".7"/>
      </g>
      <g transform="translate(18 8)"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#d9d2bd" opacity=".35"/><path d="M-5 -2h10M-5 2h8" stroke="#8a7b60" stroke-width=".6"/></g>
      <path d="M-38 20h76" stroke="#000" stroke-width="1" opacity=".2"/>
      <path d="M-14 -6c-3 2-5 5-5 9" stroke="#d7e3e2" stroke-width=".7" opacity=".25" fill="none"/>
    `)
  },

  projectorBench: {
    label: 'PROJECTOR', name: 'the projector bench', place: 'under the projector bench',
    draw: (st) => sceneG(st.x, st.y, st.s || 1, st.r || 0, `
      <ellipse cx="0" cy="30" rx="82" ry="18" fill="#000" opacity=".5" filter="url(#rs-blur)"/>
      <rect x="-76" y="-28" width="152" height="58" rx="3" fill="var(--wood)" stroke="#160f0a" stroke-width="1.4"/>
      <rect x="-72" y="-24" width="144" height="8" fill="var(--wood-hi)" opacity=".22"/>
      <g transform="translate(-14 -4)">
        <rect x="-34" y="-16" width="64" height="30" rx="4" fill="var(--metal)" stroke="#121617" stroke-width="1.2"/>
        <circle cx="-20" cy="-18" r="11" fill="#1a1d1c" stroke="url(#rs-steel)" stroke-width="1.4"/>
        <circle cx="-20" cy="-18" r="5" fill="#0b0d0c" stroke="#8e9a97" stroke-width=".7"/>
        <circle cx="6" cy="-18" r="9" fill="#1a1d1c" stroke="url(#rs-steel)" stroke-width="1.2"/>
        <circle cx="6" cy="-18" r="4" fill="#0b0d0c" stroke="#8e9a97" stroke-width=".7"/>
        <path d="M32 -6h12v14H32Z" fill="#111" stroke="#8e9a97" stroke-width="1"/>
        <path d="M46 -2l20 8-20 8Z" fill="#ffe2a3" opacity=".12"/>
        <circle cx="44" cy="2" r="3" fill="#ffe2a3" opacity=".35" filter="url(#rs-blur2)"/>
      </g>
      <g transform="translate(40 16)"><rect x="-14" y="-7" width="28" height="14" rx="2" fill="#2b2620" stroke="#6b5a3c" stroke-width=".8"/><circle r="4" fill="#8d2a2a" opacity=".35"/></g>
      <path d="M-76 16h152" stroke="#000" stroke-width="1" opacity=".2"/>
    `)
  },

  /* ---------------- windows, doors and openings ---------------- */
  rainWindow: { label: 'WINDOW', name: 'the rain-streaked window', place: 'on the windowsill', draw: (st) => windowBase(st, { w: 116, h: 64, rain: true, city: true }) },
  neonWindow: { label: 'WINDOW', name: 'the neon-lit window', place: 'on the windowsill', draw: (st) => windowBase(st, { w: 122, h: 64, rain: true, city: true, neon: true }) },
  cityWindow: { label: 'CITY WINDOW', name: 'the city window', place: 'on the window ledge', draw: (st) => windowBase(st, { w: 132, h: 70, city: true, rain: true }) },
  storefront: { label: 'WINDOW', name: 'the storefront window', place: 'on the window ledge', draw: (st) => windowBase(st, { w: 128, h: 68, rain: true, city: true, shop: true }) },
  porthole: { label: 'PORTHOLE', name: 'the brass porthole', place: 'on the porthole rim', draw: (st) => windowBase(st, { round: true }) },
  barredWindow: { label: 'WINDOW', name: 'the barred window', place: 'on the barred sill', draw: (st) => windowBase(st, { w: 104, h: 58, bars: true, rain: true }) },
  highWindow: { label: 'HIGH WINDOW', name: 'the high window', place: 'on the high sill', draw: (st) => windowBase(st, { w: 96, h: 40, bars: true }) },
  frostedWindow: { label: 'WINDOW', name: 'the frosted window', place: 'on the frosted sill', draw: (st) => windowBase(st, { w: 104, h: 56, frost: true }) },
  stainedGlass: { label: 'STAINED GLASS', name: 'the stained-glass window', place: 'beneath the stained glass', draw: (st) => windowBase(st, { w: 108, h: 76, stain: true, arch: true }) },
  archedWindow: { label: 'ARCHED WINDOW', name: 'the arched window', place: 'on the arched sill', draw: (st) => windowBase(st, { w: 108, h: 78, arch: true, city: true, rain: true }) },
  trainWindow: { label: 'WINDOW', name: 'the sleeper window', place: 'on the window ledge', draw: (st) => windowBase(st, { w: 104, h: 58, train: true, rain: true }) },
  studioGlass: { label: 'BOOTH GLASS', name: 'the control booth glass', place: 'on the booth ledge', draw: (st) => windowBase(st, { w: 116, h: 52, booth: true }) },
  boothWindow: { label: 'BOOTH WINDOW', name: 'the projection booth window', place: 'on the booth ledge', draw: (st) => windowBase(st, { w: 100, h: 50, booth: true, project: true }) },
  shopWindow: { label: 'SHOP WINDOW', name: 'the shop window', place: 'on the shop sill', draw: (st) => windowBase(st, { w: 112, h: 58, shop: true, rain: true }) },
  glassPanel: { label: 'GLASS PANEL', name: 'the greenhouse glass', place: 'by the glass panel', draw: (st) => windowBase(st, { w: 120, h: 64, rain: true, frost: true }) },
  stageDoor: { label: 'STAGE DOOR', name: 'the stage door', place: 'by the stage door', draw: (st) => windowBase(st, { door: true, stage: true, w: 86, h: 118 }) },
  backDoor: { label: 'BACK DOOR', name: 'the back door', place: 'by the back door', draw: (st) => windowBase(st, { door: true, back: true, w: 82, h: 112 }) },
  rollDoor: { label: 'LOADING DOOR', name: 'the loading door', place: 'by the loading door', draw: (st) => windowBase(st, { roll: true, w: 158, h: 92 }) },

  /* fallbacks */
  deskWriting: { label: 'DESK', name: 'the desk', place: 'under the desk', draw: (st) => STATIONS.writingDesk.draw(st) },
  windowRain: { label: 'WINDOW', name: 'the window', place: 'on the windowsill', draw: (st) => windowBase(st, { w: 112, h: 62, rain: true, city: true }) },
  coatChair: null,
  safeWall: null
};
delete STATIONS.deskWriting;
delete STATIONS.windowRain;
delete STATIONS.coatChair;
delete STATIONS.safeWall;
