const $ = (selector) => document.querySelector(selector);
const game = $('#game');

const svg = (body) =>
  `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const ICONS = {
  arrow: svg('<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>'),
  back: svg('<path d="M20 12H5"/><path d="m11 18-6-6 6-6"/>'),
  board: svg('<rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M7 8h10M7 12h10M7 16h6"/>'),
  check: svg('<path d="m5 13 4 4L19 7"/>'),
  close: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  search: svg('<circle cx="11" cy="11" r="6"/><path d="m16 16 5 5"/>'),
  pin: svg('<path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/>'),
  desk: svg('<path d="M3 8h18M5 8v12M19 8v12M3 20h18M8 8V5h8v3"/>'),
  window: svg('<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/>'),
  coat: svg('<path d="M8 4h8l3 5-3 2v9H8v-9L5 9z"/><path d="M12 7v9"/>'),
  body: svg('<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M8 11l4 1 4-2M9 21l3-6 3 6"/>'),
  chevron: svg('<path d="m9 5 7 7-7 7"/>')
};

const OBJECTS = {
  desk: { name: 'The desk', short: 'Desk', icon: 'desk' },
  window: { name: 'The window', short: 'Window', icon: 'window' },
  coat: { name: 'The coat', short: 'Coat', icon: 'coat' },
  body: { name: 'The body', short: 'Body', icon: 'body' }
};

const data = {
  victims: [
    { name: 'Evelyn March', role: 'Nightclub owner', age: 42 },
    { name: 'Arthur Bell', role: 'City comptroller', age: 56 },
    { name: 'Nora Vale', role: 'Jazz singer', age: 31 },
    { name: 'Franklin Pike', role: 'Union fixer', age: 49 },
    { name: 'Vivian Cross', role: 'Society heiress', age: 38 },
    { name: 'Walter Crane', role: 'Newspaper editor', age: 61 },
    { name: 'Lena Fontaine', role: 'Burlesque headliner', age: 34 },
    { name: 'Harlan Webb', role: 'Defense attorney', age: 53 }
  ],
  suspects: [
    { name: 'Iris Calloway', role: 'The business partner', motive: 'The club was about to be sold from under her.', alibi: 'Claims she was closing the books at home.' },
    { name: 'Miles Rourke', role: 'The debt collector', motive: 'The victim owed him a fortune and stopped paying.', alibi: 'Says he was playing cards at the Blue Note.' },
    { name: 'June Holloway', role: 'The former flame', motive: 'A blackmail letter threatened to ruin her.', alibi: 'Insists she took the last train out of town.' },
    { name: 'Victor Sloane', role: 'The city inspector', motive: 'A payoff ledger could end his career.', alibi: 'Says he was on the night shift at City Hall.' },
    { name: 'Ruby Mercer', role: 'The chorus girl', motive: 'The victim stole the song that made her.', alibi: 'Claims the stage manager saw her backstage.' },
    { name: 'Eddie Voss', role: 'The private secretary', motive: 'He was cut out of a lucrative inheritance.', alibi: 'Says he never left the apartment upstairs.' },
    { name: 'Calvin Shaw', role: 'The rival editor', motive: 'A buried scandal was about to hit the presses.', alibi: 'Claims he was working alone in the newsroom.' },
    { name: 'Beatrice Wynn', role: 'The club singer', motive: 'The victim knew who really started the fire.', alibi: 'Says she sang through the midnight set.' },
    { name: 'Otto Grimm', role: 'The house manager', motive: 'The victim planned to fire him in the morning.', alibi: 'Insists he was making a liquor run.' },
    { name: 'Delia Frost', role: 'The gossip columnist', motive: 'One more printed lie would have finished her.', alibi: 'Says she was filing copy until dawn.' }
  ],
  weapons: [
    'pearl-handled .38',
    'brass candlestick',
    'narrow stiletto',
    'crystal decanter',
    'length of piano wire',
    'heavy letter opener',
    'ivory-handled razor',
    'fireplace poker'
  ],
  addresses: [
    'The Marlowe Club, 18 Wabash Ave.',
    'Room 9, Hotel Orpheum, 41 State St.',
    'The Bellweather Apartments, 6 N. Clark St.',
    'Pier 14, South Water Street',
    'The Alden House, 220 Dearborn St.',
    'The Starlight Ballroom, 77 Cottage Grove'
  ],
  tips: [
    'Nobody heard a thing over the rain. Somebody in that room is lying, Detective.',
    'The desk sergeant says the window was open. Don’t trust the first story you hear.',
    'Keep your eyes on the little things. The killer always leaves something behind.',
    'Three people had reason to hate the deceased. One of them had the nerve to act.',
    'The rain is washing the street clean. It won’t wash that room clean.'
  ]
};

let caseNumber = 47;
let current = null;

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

const pick = (items) => items[Math.floor(Math.random() * items.length)];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

const article = (word) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

function formatCase(number) {
  return String(number).padStart(4, '0');
}

function startCase() {
  caseNumber += 1;
  const victim = pick(data.victims);
  const suspects = shuffle(data.suspects).slice(0, 3);
  const killer = pick(suspects);
  const weapon = pick(data.weapons);
  const gunLocation = pick(Object.keys(OBJECTS));
  const payment = `${article(weapon)} ${weapon}`;

  const evidence = {
    desk: {
      title: 'The ledger page',
      text: `A torn page from the victim’s accounts. A payment for ${payment} is circled in red, and ${killer.name}’s initials are inked in the margin.`,
      gun: gunLocation === 'desk'
    },
    window: {
      title: 'The rain-slick latch',
      text: `The rain washed the prints away. Not the smear on the latch: greasepaint, the kind ${killer.name} wears onstage.`,
      gun: gunLocation === 'window'
    },
    coat: {
      title: 'The hidden pocket',
      text: `A cufflink sits in a hidden pocket, engraved with ${killer.name}’s initials and still wet with the victim’s blood.`,
      gun: gunLocation === 'coat'
    },
    body: {
      title: 'The fatal wound',
      text: `The wound matches ${payment}. Caught in the fabric is a snapped thread from ${killer.name}’s signature coat.`,
      gun: gunLocation === 'body'
    }
  };

  const flavour = {
    desk: 'Two fingers of rye, untouched. The victim was expecting someone.',
    window: 'The latch is broken from the inside. Whoever left knew this room.',
    coat: 'Rain beads on the sleeve. The rest of the coat is bone dry.',
    body: `The ${weapon} is gone. Whoever did this took it with them.`
  };

  Object.keys(evidence).forEach((key) => {
    if (!evidence[key].gun) evidence[key].text = flavour[key];
  });

  current = {
    id: formatCase(caseNumber),
    victim,
    suspects,
    killer,
    weapon,
    address: pick(data.addresses),
    tip: pick(data.tips),
    evidence,
    found: [],
    selected: '',
    confirm: false,
    stage: 'office',
    zoom: null
  };

  $('#header-case').textContent = `Case ${current.id}`;
  document.title = `Case ${current.id} — Midnight Detective`;
  render();
}

function render() {
  if (!current) return;
  const views = {
    office: officeView,
    scene: sceneView,
    zoom: zoomView,
    board: boardView,
    win: endView,
    loss: endView
  };
  const view = views[current.stage] || officeView;
  const previousStage = game.dataset.stage;
  document.body.classList.toggle('modal-open', Boolean(current.confirm));
  game.dataset.stage = current.stage;
  game.innerHTML = view();
  if (current.confirm) game.insertAdjacentHTML('beforeend', accuseModal());
  if (previousStage && previousStage !== current.stage && !current.confirm) {
    window.scrollTo(0, 0);
  }
  const focusTarget = current.confirm
    ? game.querySelector('#accuse-title')
    : game.querySelector('[data-focus]');
  if (focusTarget) focusTarget.focus({ preventScroll: true });
}

function officeView() {
  const victim = current.victim;
  return `
    <section class="screen office">
      <div class="office-art" role="img" aria-label="A rain-lashed detective office at two in the morning">
        <div class="office-window" aria-hidden="true">
          <div class="city-glow"></div>
          <div class="city"></div>
          <div class="blinds"></div>
          <div class="rain-glass"></div>
          <div class="window-bar v"></div>
          <div class="window-bar h"></div>
          <div class="window-sill"></div>
        </div>
        <div class="wall-art" aria-hidden="true"></div>
        <div class="filing-cabinet" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="office-glow" aria-hidden="true"></div>
        <div class="office-desk" aria-hidden="true"></div>
        <div class="desk-lamp" aria-hidden="true"></div>
        <div class="desk-phone" aria-hidden="true"></div>
        <div class="desk-cord" aria-hidden="true"></div>
        <div class="desk-paper" aria-hidden="true"></div>
        <div class="desk-paper b" aria-hidden="true"></div>
        <div class="desk-glass" aria-hidden="true"></div>
        <div class="ashtray" aria-hidden="true"></div>
        <div class="smoke" aria-hidden="true"></div>
        <div class="art-chip" aria-hidden="true"><b>02:00</b> Wabash Ave.</div>
        <div class="art-weather" aria-hidden="true">41° · rain · wind NE</div>
      </div>

      <div class="office-copy">
        <p class="eyebrow">2:00 AM · The call</p>
        <h1 class="display" data-focus tabindex="-1">The city<br>never <em>sleeps.</em></h1>
        <p class="lede">The rotary phone claws through the quiet. Another body. Another night with the rain for company.</p>

        <div class="callout">
          <div class="callout-head">
            <span class="badge">SM</span>
            <span><strong>Sergeant Miller</strong><small>Homicide · 11th Precinct</small></span>
          </div>
          <p>“${escapeHTML(current.tip)}”</p>
        </div>

        <div class="address">${ICONS.pin}<span>${escapeHTML(current.address)}</span></div>

        <button class="btn btn-primary" data-action="head" type="button">Work the scene ${ICONS.arrow}</button>

        <div class="facts">
          <div><span>Victim</span><strong>${escapeHTML(victim.name)}</strong><small>${victim.age} · ${escapeHTML(victim.role)}</small></div>
          <div><span>Cause</span><strong>${article(current.weapon)} ${escapeHTML(current.weapon)}</strong><small>No witnesses</small></div>
          <div><span>Weather</span><strong>Cold rain</strong><small>41° · Wind NE</small></div>
        </div>
      </div>
    </section>`;
}

function sceneView() {
  const foundCount = current.found.length;
  const hotspots = Object.entries(OBJECTS).map(([key, object], index) => {
    const found = current.found.includes(key);
    return `
      <button class="hotspot spot-${key}${found ? ' is-found' : ''}" data-object="${key}" type="button"
        aria-label="${found ? 'Review' : 'Examine'} ${object.name}">
        <span class="hotspot-dot">${ICONS[object.icon]}</span>
        <span class="hotspot-no" aria-hidden="true">0${index + 1}</span>
        <span class="hotspot-tag">${object.short}</span>
        ${found ? `<span class="hotspot-check">${ICONS.check}</span>` : ''}
      </button>`;
  }).join('');

  const points = Object.entries(OBJECTS).map(([key, object], index) => {
    const found = current.found.includes(key);
    return `
      <button class="poi${found ? ' is-found' : ''}" data-object="${key}" type="button"
        aria-label="${found ? 'Review' : 'Examine'} ${object.name}">
        <span class="poi-no">0${index + 1}</span>
        <span class="poi-icon">${ICONS[object.icon]}</span>
        <span class="poi-copy"><strong>${object.name}</strong><small>${found ? 'Evidence logged' : 'Unprocessed'}</small></span>
        <span class="poi-state">${found ? ICONS.check : ICONS.chevron}</span>
      </button>`;
  }).join('');

  const segments = Object.keys(OBJECTS).map((key) => {
    const found = current.found.includes(key);
    const gun = found && current.evidence[key].gun;
    return `<span class="${found ? 'on' : ''}${gun ? ' gun' : ''}"></span>`;
  }).join('');

  return `
    <section class="screen scene">
      <div class="page-head">
        <div>
          <p class="eyebrow">Crime scene · 02:17 AM</p>
          <h1 data-focus tabindex="-1">Work the room.</h1>
        </div>
        <div class="location">
          ${ICONS.pin}<strong>${escapeHTML(current.address)}</strong>
          <small>Police line · do not cross</small>
        </div>
      </div>

      <div class="scene-grid">
        <div class="scene-art" role="group" aria-label="Top-down view of the murder room. Four marked points of interest.">
          <div class="room-floor" aria-hidden="true"></div>
          <div class="room-wall wall-n" aria-hidden="true"></div>
          <div class="room-wall wall-w" aria-hidden="true"></div>
          <div class="room-wall wall-e" aria-hidden="true"></div>
          <div class="scene-door" aria-hidden="true"></div>
          <div class="rug" aria-hidden="true"></div>

          <div class="scene-desk" aria-hidden="true">
            <span class="s-ledger"></span><span class="s-glass"></span><span class="s-lamp"></span><span class="s-scatter"></span>
          </div>
          <div class="scene-chair" aria-hidden="true"></div>
          <div class="scene-table" aria-hidden="true"><span class="st-glass"></span><span class="st-paper"></span></div>
          <div class="scene-window" aria-hidden="true"><span class="s-rain"></span></div>
          <div class="scene-coat" aria-hidden="true"><i></i></div>
          <div class="scene-body" aria-hidden="true">
            <span class="s-blood"></span>
            <svg class="s-chalk" viewBox="0 0 200 140" aria-hidden="true">
              <g fill="none" stroke="#e8dfca" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="7 6">
                <circle cx="154" cy="34" r="16"/>
                <path d="M148 49 Q132 68 118 78"/>
                <path d="M139 57 L181 65"/>
                <path d="M135 65 L112 83"/>
                <path d="M118 78 L92 72 L72 82"/>
                <path d="M118 78 L110 108 L88 126"/>
                <path d="M114 89 L136 112 L158 122"/>
              </g>
            </svg>
          </div>
          <div class="lamp-glow" aria-hidden="true"></div>
          <span class="debris d1" aria-hidden="true"></span>
          <span class="debris d2" aria-hidden="true"></span>
          <span class="debris d3" aria-hidden="true"></span>

          ${hotspots}
          <div class="scene-caption">${ICONS.search} Select a marker</div>
        </div>

        <aside class="scene-panel">
          <div class="panel-top">
            <span class="kicker">The room</span>
            <span class="mono-badge">${foundCount} / 4</span>
          </div>
          <h2>Nothing is clean.</h2>
          <p class="panel-copy">Four points of interest. One of them carries the killer’s name.</p>

          <div class="victim-strip">
            <span class="victim-avatar" aria-hidden="true"></span>
            <span>
              <small>Deceased</small>
              <strong>${escapeHTML(current.victim.name)}</strong>
              <em>${current.victim.age} · ${escapeHTML(current.victim.role)}</em>
            </span>
          </div>

          <div class="poi-list">${points}</div>

          <div class="progress">
            <div class="progress-label"><span>Evidence recovered</span><b>${foundCount} / 4</b></div>
            <div class="progress-segments" aria-hidden="true">${segments}</div>
          </div>

          <div class="panel-actions">
            <button class="btn btn-primary" data-action="board" type="button">${ICONS.board} Open board</button>
            <button class="btn btn-ghost" data-action="office" type="button">${ICONS.back} The call</button>
          </div>
        </aside>
      </div>
    </section>`;
}

function closeupArt(key) {
  if (key === 'desk') {
    return `
      <div class="closeup closeup-desk" aria-hidden="true">
        <div class="cu-lamp"></div>
        <div class="cu-desk-surface"></div>
        <div class="cu-paper cu-paper-a"></div>
        <div class="cu-paper cu-paper-b"></div>
        <div class="cu-torn"></div>
        <div class="cu-glass"></div>
        <div class="cu-magnifier"></div>
      </div>`;
  }
  if (key === 'window') {
    return `
      <div class="closeup closeup-window" aria-hidden="true">
        <div class="cu-night"></div>
        <div class="cu-city"></div>
        <div class="cu-rain"></div>
        <div class="cu-window-frame"></div>
        <div class="cu-curtain left"></div>
        <div class="cu-curtain right"></div>
        <div class="cu-reflection"></div>
        <div class="cu-sill"></div>
        <div class="cu-latch"></div>
        <div class="cu-smear"></div>
      </div>`;
  }
  if (key === 'coat') {
    return `
      <div class="closeup closeup-coat" aria-hidden="true">
        <div class="cu-hook"></div>
        <div class="cu-coat-light"></div>
        <div class="cu-coat">
          <span class="cu-collar"></span>
          <span class="cu-lapel"></span>
          <span class="cu-pocket"></span>
          <span class="cu-cufflink"></span>
        </div>
        <div class="cu-rain-beads"></div>
      </div>`;
  }
  return `
    <div class="closeup closeup-body" aria-hidden="true">
      <div class="cu-floor"></div>
      <svg class="cu-body-svg" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="bloodGrad">
            <stop offset="0" stop-color="#64231d"/>
            <stop offset="1" stop-color="#3c1512" stop-opacity=".12"/>
          </radialGradient>
        </defs>
        <ellipse cx="258" cy="112" rx="96" ry="56" transform="rotate(-12 258 112)" fill="url(#bloodGrad)" opacity=".82"/>
        <g fill="none" stroke="#e6dcc4" stroke-width="3" stroke-linecap="round" stroke-dasharray="9 7" opacity=".72">
          <circle cx="292" cy="72" r="24"/>
          <path d="M279 96 C252 118 226 128 202 136"/>
          <path d="M270 105 L324 122"/>
          <path d="M264 116 L238 154"/>
          <path d="M202 136 C178 132 156 140 132 154"/>
          <path d="M202 136 C196 168 188 194 166 218"/>
          <path d="M196 160 C220 184 238 204 254 236"/>
        </g>
        <path d="M244 148 C270 170 286 186 302 198" stroke="#a64538" stroke-width="2.2" fill="none" opacity=".85"/>
      </svg>
      <div class="cu-flash"></div>
      <div class="cu-tag a">3</div>
      <div class="cu-tag b">7</div>
      <div class="cu-ruler"></div>
    </div>`;
}

function zoomView() {
  const key = current.zoom;
  const clue = current.evidence[key];
  const object = OBJECTS[key];
  const index = Object.keys(OBJECTS).indexOf(key);
  const allFound = current.found.length === 4;
  const dots = Object.keys(OBJECTS).map((dotKey, dotIndex) => {
    const on = current.found.includes(dotKey);
    const gun = on && current.evidence[dotKey].gun;
    return `<i class="${dotIndex === index ? 'current ' : ''}${on ? 'on' : ''}${gun ? ' gun' : ''}"></i>`;
  }).join('');

  return `
    <section class="screen zoom">
      <div class="zoom-art" role="img" aria-label="Close-up of ${object.name.toLowerCase()}">
        ${closeupArt(key)}
        <span class="zoom-label">Evidence ${String(index + 1).padStart(2, '0')} · ${object.short}</span>
      </div>
      <div class="zoom-copy">
        <p class="eyebrow">Evidence close-up · ${String(index + 1).padStart(2, '0')} / 04</p>
        <h1 data-focus tabindex="-1">${escapeHTML(clue.title)}</h1>
        <div class="clue-dots" aria-hidden="true">${dots}</div>
        <p class="clue-text">${escapeHTML(clue.text)}</p>
        ${clue.gun ? '<p class="clue-note">This is the thread that pulls the whole case apart.</p>' : ''}
        <div class="evidence-meta">
          <span class="logged">${ICONS.check} Logged ${current.found.length} / 4</span>
          ${clue.gun ? '<span class="gun-badge">Smoking gun</span>' : ''}
        </div>
        <div class="zoom-actions">
          <button class="btn btn-primary" data-action="next-object" type="button">${allFound ? 'Open the board' : 'Next object'} ${ICONS.arrow}</button>
          <button class="btn btn-ghost" data-action="scene" type="button">${ICONS.back} Back to the room</button>
        </div>
      </div>
    </section>`;
}

function boardView() {
  const selected = current.selected;
  const gunFound = current.found.some((key) => current.evidence[key].gun);

  const evidence = current.found.map((key, index) => {
    const clue = current.evidence[key];
    return `
      <article class="evidence-card${clue.gun ? ' is-gun' : ''}">
        <span class="pin" aria-hidden="true"></span>
        <div class="evidence-top"><span>Exhibit ${String(index + 1).padStart(2, '0')}</span><span>${OBJECTS[key].short}</span></div>
        <h3>${escapeHTML(clue.title)}</h3>
        <p>${escapeHTML(clue.text)}</p>
        ${clue.gun ? '<span class="gun-stamp" aria-label="Smoking gun">Smoking gun</span>' : ''}
      </article>`;
  }).join('');

  const suspects = current.suspects.map((suspect, index) => {
    const active = selected === suspect.name;
    return `
      <article class="suspect-card${active ? ' selected' : ''}">
        <div class="mugshot v${index + 1}" aria-hidden="true">
          <span class="m-shoulders"></span>
          <span class="m-neck"></span>
          <span class="m-collar"></span>
          <span class="m-head"></span>
          <span class="m-glasses"></span>
          <span class="m-moustache"></span>
          <span class="m-hat"></span>
          <span class="m-tie"></span>
        </div>
        <div class="suspect-top">
          <h3>${escapeHTML(suspect.name)}</h3>
          <span class="role">${escapeHTML(suspect.role)}</span>
        </div>
        <dl>
          <div><dt>Motive</dt><dd>${escapeHTML(suspect.motive)}</dd></div>
          <div><dt>Alibi</dt><dd>${escapeHTML(suspect.alibi)}</dd></div>
        </dl>
        <button class="select-suspect" data-suspect="${escapeHTML(suspect.name)}" type="button" aria-pressed="${active}">
          ${active ? `${ICONS.check} Selected` : 'Select suspect'}
        </button>
      </article>`;
  }).join('');

  return `
    <section class="screen board">
      <div class="page-head board-head">
        <div>
          <p class="eyebrow">Case ${current.id} · Private notes</p>
          <h1 data-focus tabindex="-1">Connect the dots.</h1>
        </div>
        <div class="case-stamp${gunFound ? ' is-gun' : ''}">${gunFound ? 'Gun in hand' : 'Open case'}</div>
      </div>

      <div class="board-grid">
        <section class="board-panel" aria-label="Recovered evidence">
          <div class="panel-head"><span>Recovered evidence</span><span>${current.found.length} / 4</span></div>
          <div class="evidence-list">
            ${evidence || `<div class="empty-evidence"><span class="pin" aria-hidden="true"></span>${ICONS.search}<strong>No evidence yet</strong><p>The room is still waiting.</p></div>`}
          </div>
        </section>

        <section class="board-panel" aria-label="Persons of interest">
          <div class="panel-head"><span>Persons of interest</span><span>03 profiles</span></div>
          <div class="suspect-grid">${suspects}</div>
          <div class="panel-note">
            <span>Detective’s note</span>
            <p>${gunFound ? 'The proof is in hand. Now pick the story that can’t hold.' : 'No smoking gun yet. The truth is still in that room.'}</p>
          </div>
        </section>
      </div>

      <div class="board-actions">
        <button class="btn btn-ghost" data-action="scene" type="button" aria-label="Back to crime scene">${ICONS.back} Crime scene</button>
        <p class="hint">${selected ? `Accusing <strong>${escapeHTML(selected)}</strong> closes the case.` : 'Select a suspect to make an accusation.'}</p>
        <button class="btn btn-danger" data-action="accuse" type="button" ${selected ? '' : 'disabled'}>Accuse ${ICONS.arrow}</button>
      </div>
    </section>`;
}

function accuseModal() {
  const suspect = current.suspects.find((person) => person.name === current.selected);
  if (!suspect) return '';
  const gunFound = current.found.some((key) => current.evidence[key].gun);
  return `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="accuse-title">
        <button class="modal-x" data-action="cancel-accuse" type="button" aria-label="Close accusation">${ICONS.close}</button>
        <p class="eyebrow">Point the finger</p>
        <h2 id="accuse-title" tabindex="-1">Accuse ${escapeHTML(suspect.name)}?</h2>
        <p>Once you name a suspect, the case goes to the district attorney. <strong>There is no second chance.</strong></p>
        <div class="modal-facts">
          <div><span>Suspect</span><strong>${escapeHTML(suspect.name)}</strong></div>
          <div><span>Evidence</span><strong>${current.found.length} of 4 logged</strong></div>
          <div><span>Smoking gun</span><strong>${gunFound ? 'In hand' : 'Not found'}</strong></div>
          <div><span>Case file</span><strong>${current.id}</strong></div>
        </div>
        ${gunFound ? '' : '<p class="modal-alert">You don’t have the smoking gun. Without it, a name is only a guess.</p>'}
        <div class="modal-actions">
          <button class="btn btn-ghost" data-action="cancel-accuse" type="button">Not yet</button>
          <button class="btn btn-danger" data-action="confirm-accuse" type="button">Make the accusation</button>
        </div>
      </div>
    </div>`;
}

function endView() {
  const won = current.stage === 'win';
  const gunKey = current.found.find((key) => current.evidence[key].gun);
  const proof = gunKey ? current.evidence[gunKey].title : 'None recovered';
  const note = won
    ? ''
    : `<p class="summary-note">${gunKey
        ? `You had the proof. You named the wrong person. ${escapeHTML(current.killer.name)} walks.`
        : `You never found the smoking gun. ${escapeHTML(current.killer.name)} walks.`}</p>`;

  return `
    <section class="screen end ${won ? 'is-win' : 'is-loss'}">
      <div class="outcome-stamp">${won ? 'Case closed' : 'Cold case'}</div>
      <p class="eyebrow">${won ? '03:12 AM · The cuffs click shut' : '03:12 AM · The file goes in the drawer'}</p>
      <h1 class="display" data-focus tabindex="-1">${won ? 'The city<br><em>owes you one.</em>' : 'The trail<br><em>goes cold.</em>'}</h1>
      <p class="lede">${won
        ? 'The rain keeps falling, but one ghost won’t haunt these streets again.'
        : 'The killer walks into the wet dark. Without the right name — and the proof to back it — the department buries the file.'}</p>

      <div class="case-summary">
        <div class="summary-head"><span>Case ${current.id} · Final report</span><span>${won ? 'Closed' : 'Cold'}</span></div>
        <dl>
          <div><dt>The killer</dt><dd><em>${escapeHTML(current.killer.name)}</em></dd></div>
          <div><dt>The victim</dt><dd>${escapeHTML(current.victim.name)} · ${escapeHTML(current.victim.role)}</dd></div>
          <div><dt>The weapon</dt><dd>${article(current.weapon)} ${escapeHTML(current.weapon)}</dd></div>
          <div><dt>The proof</dt><dd>${escapeHTML(proof)}</dd></div>
        </dl>
        ${note}
      </div>

      <div class="end-actions">
        <button class="btn btn-primary" data-action="new" type="button">Take another case ${ICONS.arrow}</button>
        <button class="btn btn-ghost" data-action="details" type="button">${ICONS.board} Review the board</button>
      </div>
    </section>`;
}

function openObject(key) {
  if (!current || !OBJECTS[key]) return;
  if (!current.found.includes(key)) current.found.push(key);
  current.zoom = key;
  current.stage = 'zoom';
  current.confirm = false;
  render();
}

function nextObject() {
  if (!current) return;
  const keys = Object.keys(OBJECTS);
  if (current.found.length === keys.length) {
    current.stage = 'board';
    current.confirm = false;
    render();
    return;
  }
  const start = Math.max(0, keys.indexOf(current.zoom));
  for (let step = 1; step <= keys.length; step += 1) {
    const key = keys[(start + step) % keys.length];
    if (!current.found.includes(key)) {
      openObject(key);
      return;
    }
  }
  current.stage = 'board';
  render();
}

function handleAction(action) {
  if (!current) return;
  switch (action) {
    case 'head':
    case 'scene':
      current.stage = 'scene';
      current.confirm = false;
      break;
    case 'office':
      current.stage = 'office';
      current.confirm = false;
      break;
    case 'board':
      current.stage = 'board';
      current.confirm = false;
      break;
    case 'new':
      startCase();
      return;
    case 'details':
      current.stage = 'board';
      current.selected = '';
      current.confirm = false;
      break;
    case 'accuse':
      if (current.selected) current.confirm = true;
      break;
    case 'cancel-accuse':
      current.confirm = false;
      break;
    case 'confirm-accuse': {
      if (!current.selected) break;
      const gunFound = current.found.some((key) => current.evidence[key].gun);
      current.stage = current.selected === current.killer.name && gunFound ? 'win' : 'loss';
      current.confirm = false;
      break;
    }
    case 'next-object':
      nextObject();
      return;
    default:
      return;
  }
  render();
}

game.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-backdrop')) {
    current.confirm = false;
    render();
    return;
  }

  const objectButton = event.target.closest('[data-object]');
  if (objectButton) {
    openObject(objectButton.dataset.object);
    return;
  }

  const suspectButton = event.target.closest('[data-suspect]');
  if (suspectButton) {
    current.selected = suspectButton.dataset.suspect;
    render();
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (actionButton && !actionButton.disabled) handleAction(actionButton.dataset.action);
});

document.addEventListener('keydown', (event) => {
  if (!current) return;
  if (event.key === 'Escape' && current.confirm) {
    current.confirm = false;
    render();
    return;
  }
  if (current.stage === 'zoom' && !current.confirm) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextObject();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      current.stage = 'scene';
      render();
    }
  }
});

$('#new-case').addEventListener('click', startCase);

document.querySelector('.brand').addEventListener('click', (event) => {
  event.preventDefault();
});

startCase();



