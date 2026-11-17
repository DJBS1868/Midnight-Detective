/* ============================================================
   MIDNIGHT DETECTIVE — CLOSE-UP CAMERA
   Builds a genuine macro view from the room that was just on
   screen. The inspected station keeps its exact scene art and
   brightness, the room around it falls into shadow, and the
   crop frames the object.
   ============================================================ */

const CLOSEUP_DEFS = `
<defs>
  <filter id="cz-feather" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="2.2"/>
  </filter>
  <radialGradient id="cz-vignette" cx=".5" cy=".48" r=".8">
    <stop offset=".46" stop-color="#000" stop-opacity="0"/>
    <stop offset=".76" stop-color="#000" stop-opacity=".16"/>
    <stop offset="1" stop-color="#000" stop-opacity=".62"/>
  </radialGradient>
  <linearGradient id="cz-sheen" x1="0" y1="0" x2=".9" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity=".04"/>
    <stop offset=".38" stop-color="#fff" stop-opacity=".008"/>
    <stop offset=".62" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".14"/>
  </linearGradient>
</defs>`;

const CLOSEUP_FALLBACK = {
  desk: { w: 148, h: 88 },
  window: { w: 112, h: 70 },
  coat: { w: 78, h: 108 },
  safe: { w: 100, h: 88 }
};

const closeupHash = (seed) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const closeupRandom = (seed) => {
  let h = closeupHash(seed);
  return () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };
};

function getCloseupFrame(loc, key, ratio = 0.62) {
  const source = document.querySelector('#sceneCanvas svg');
  const group = source?.querySelector(`[data-station="${key}"]`);
  let box = null;
  if (group) {
    try {
      const b = group.getBBox();
      if (b.width > 2 && b.height > 2) {
        box = { x: b.x, y: b.y, w: b.width, h: b.height };
      }
    } catch (e) { /* fall through to the station's nominal size */ }
  }
  if (!box) {
    const spec = SCENES[loc.scene] || {};
    const st = spec.stations?.[key] || { x: 200, y: 280 };
    const fb = CLOSEUP_FALLBACK[key] || { w: 120, h: 100 };
    const s = st.s || 1;
    box = { x: st.x - (fb.w * s) / 2, y: st.y - (fb.h * s) / 2, w: fb.w * s, h: fb.h * s };
  }

  // The zoom bay changes shape from phone to phone. Match its aspect so
  // the same crop that is drawn is the crop that fills the bay.
  const ar = Math.max(0.46, Math.min(2.5, ratio || 0.62));
  const maxW = key === 'coat' ? 0.8 : 0.88;
  const maxH = key === 'coat' ? 0.78 : 0.80;
  let w = Math.max(box.w / maxW, (box.h / maxH) * ar, 70);
  let h = w / ar;
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  return {
    x: cx - w / 2,
    y: cy - h / 2,
    w,
    h,
    ar,
    cx,
    cy,
    box
  };
}

function closeupDust(frame, seed) {
  const rnd = closeupRandom(seed);
  let out = '<g fill="var(--chalk)">';
  for (let i = 0; i < 12; i++) {
    const x = frame.x + rnd() * frame.w;
    const y = frame.y + rnd() * frame.h;
    const r = 0.35 + rnd() * 0.9;
    const o = 0.035 + rnd() * 0.09;
    out += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" opacity="${o.toFixed(2)}"/>`;
  }
  return out + '</g>';
}

function renderCloseup(loc, key, ratio = 0.62) {
  const spec = SCENES[loc.scene] || {};
  const pal = SCENE_PALETTES[spec.palette || loc.scene] || SCENE_PALETTES.hotel;
  const frame = getCloseupFrame(loc, key, ratio);
  const source = document.querySelector('#sceneCanvas svg');
  let fallbackHero = '';
  let backdrop = '';
  let hasHero = false;

  if (source) {
    const clone = source.cloneNode(true);
    hasHero = !!clone.querySelector(`[data-station="${key}"]`);
    clone.querySelectorAll('rect[fill="url(#rs-vignette)"]').forEach((node) => node.remove());
    backdrop = clone.innerHTML;
  }

  if (!hasHero) {
    const st = spec.stations?.[key];
    const def = st && STATIONS[st.t];
    fallbackHero = def ? `<g data-station="${key}">${def.draw(st, key)}</g>` : '';
  }

  const stType = spec.stations?.[key]?.t || '';
  const floorSafe = ['floorSafe', 'strongbox', 'trunk'].includes(stType);
  const counterTop = ['register', 'till', 'cashBox', 'cage'].includes(stType);
  const onFloor = key === 'desk' || floorSafe || counterTop;
  const base = onFloor ? 'var(--floor)' : 'var(--wall)';
  const pattern = onFloor
    ? (SCENE_FLOORS[spec.floor] || SCENE_FLOORS.wood)
    : (SCENE_WALLS[spec.wall] || SCENE_WALLS.panel);
  const frameRect = `x="${frame.x}" y="${frame.y}" width="${frame.w}" height="${frame.h}"`;
  const dust = closeupDust(frame, `${loc.scene}:${key}`);
  // A soft hole in the lens shade: the inspected object keeps its exact
  // scene brightness, while the room around it falls away.
  const pad = Math.max(2.5, Math.min(frame.box.w, frame.box.h) * 0.035);
  const hole = `x="${(frame.box.x - pad).toFixed(2)}" y="${(frame.box.y - pad).toFixed(2)}" width="${(frame.box.w + pad * 2).toFixed(2)}" height="${(frame.box.h + pad * 2).toFixed(2)}"`;
  const mask = `<mask id="cz-focus" maskUnits="userSpaceOnUse" x="${frame.x.toFixed(2)}" y="${frame.y.toFixed(2)}" width="${frame.w.toFixed(2)}" height="${frame.h.toFixed(2)}">
    <rect ${frameRect} fill="#fff"/>
    <rect ${hole} rx="6" fill="#000" filter="url(#cz-feather)"/>
  </mask>`;

  const svg = `<svg class="closeup-svg" viewBox="${frame.x.toFixed(2)} ${frame.y.toFixed(2)} ${frame.w.toFixed(2)} ${frame.h.toFixed(2)}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="${sceneVars(pal)}">
    ${SCENE_DEFS}
    ${CLOSEUP_DEFS}
    ${mask}
    <rect ${frameRect} fill="${base}"/>
    <rect ${frameRect} fill="url(#${pattern})" opacity=".5"/>
    <g>${backdrop}</g>
    ${fallbackHero}
    <rect ${frameRect} fill="#050403" opacity=".58" mask="url(#cz-focus)"/>
    <rect ${frameRect} fill="url(#cz-sheen)"/>
    ${dust}
    <rect ${frameRect} fill="url(#cz-vignette)"/>
  </svg>`;

  return { svg, frame };
}
