const $ = (selector) => document.querySelector(selector);
const game = $('#game');
let caseNumber = 47;
let current = null;

const data = {
  victims: [
    {name:'Evelyn March',role:'Nightclub owner',age:42},
    {name:'Arthur Bell',role:'City comptroller',age:56},
    {name:'Nora Vale',role:'Jazz singer',age:31},
    {name:'Franklin Pike',role:'Union fixer',age:49},
    {name:'Vivian Cross',role:'Society heiress',age:38},
    {name:'Walter Crane',role:'Newspaper editor',age:61}
  ],
  suspects: [
    {name:'Iris Calloway',role:'The business partner',motive:'The club was about to be sold from under her.',alibi:'Claims she was closing the books at home.'},
    {name:'Miles Rourke',role:'The debt collector',motive:'March owed him a fortune and stopped paying.',alibi:'Says he was playing cards at the Blue Note.'},
    {name:'June Holloway',role:'The former flame',motive:'A blackmail letter threatened to ruin her.',alibi:'Insists she took the last train out of town.'},
    {name:'Victor Sloane',role:'The city inspector',motive:'A payoff ledger could end his career.',alibi:'Says he was on the night shift at City Hall.'},
    {name:'Ruby Mercer',role:'The chorus girl',motive:'The victim stole the song that made her.',alibi:'Claims the stage manager saw her backstage.'},
    {name:'Eddie Voss',role:'The private secretary',motive:'He was cut out of a lucrative inheritance.',alibi:'Says he never left the apartment upstairs.'},
    {name:'Calvin Shaw',role:'The rival editor',motive:'A buried scandal was about to hit the presses.',alibi:'Claims he was working alone in the newsroom.'},
    {name:'Beatrice Wynn',role:'The club singer',motive:'The victim knew who really started the fire.',alibi:'Says she sang through the midnight set.'},
    {name:'Otto Grimm',role:'The house manager',motive:'The victim planned to fire him in the morning.',alibi:'Insists he was making a liquor run.'}
  ],
  weapons: ['pearl-handled .38','brass candlestick','narrow stiletto','crystal decanter','length of piano wire','heavy letter opener'],
  addresses: ['The Marlowe Club, 18 Wabash Ave.','Room 9, Hotel Orpheum, 41 State St.','The Bellweather Apartments, 6 N. Clark St.','Pier 14, South Water Street','The Alden House, 220 Dearborn St.'],
  tips: [
    'Nobody heard a thing over the rain. Somebody in that room is lying, Detective.',
    'The desk sergeant says the window was open. Don’t trust the first story you hear.',
    'Keep your eyes on the little things. The killer always leaves something behind.',
    'Three people had reason to hate the deceased. One of them had the nerve to act.'
  ]
};

const objectInfo = {
  desk:{name:'The Desk',icon:'▤',objectIcon:'▰',spot:'spot-desk'},
  window:{name:'The Window',icon:'▧',objectIcon:'▨',spot:'spot-window'},
  coat:{name:'The Coat',icon:'♟',objectIcon:'♟',spot:'spot-coat'},
  body:{name:'The Body',icon:'✦',objectIcon:'✦',spot:'spot-body'}
};

function pick(items){ return items[Math.floor(Math.random()*items.length)]; }
function shuffle(items){ return [...items].sort(()=>Math.random()-.5); }
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function startCase(){
  caseNumber++;
  const victim = pick(data.victims);
  const suspects = shuffle(data.suspects).slice(0,3);
  const killerIndex = Math.floor(Math.random()*suspects.length);
  const killer = suspects[killerIndex];
  const weapon = pick(data.weapons);
  const gunLocation = pick(['desk','window','coat','body']);
  const evidence = {
    desk:{title:'A torn ledger page',text:`A page has been ripped from the victim’s accounts. ${killer.name}’s initials are inked beside a payment for ${weapon}.`,gun:gunLocation==='desk'},
    window:{title:'Rain on the sill',text:`The rain washed the footprints clean—except for a smear of ${killer.name}’s distinctive stage makeup on the latch.`,gun:gunLocation==='window'},
    coat:{title:'A bloodied overcoat',text:`A hidden pocket holds a cufflink engraved with ${killer.name}’s initials, still wet with the victim’s blood.`,gun:gunLocation==='coat'},
    body:{title:'The fatal wound',text:`The wound was made by ${weapon}. A snapped thread from ${killer.name}’s signature coat is caught in the cut.`,gun:gunLocation==='body'}
  };
  const flavor = {
    desk:`A glass sits untouched beside the ${weapon}; the victim was expecting company.`,
    window:'The latch is broken from the inside. Whoever left knew the room well.',
    coat:'Fresh rain beads on the sleeve, but the rest of the room is bone dry.',
    body:`The victim fell before the clock struck two. The ${weapon} is gone.`
  };
  Object.keys(evidence).forEach(key=>{if(!evidence[key].gun)evidence[key].text=flavor[key];});
  current={victim,suspects,killer,weapon,address:pick(data.addresses),tip:pick(data.tips),evidence,found:[],stage:'office',zoom:null};
  $('#header-case').textContent=`CASE FILE ${String(caseNumber).padStart(4,'0')}`;
  render();
}
function render(){
  if(!current)return;
  if(current.stage==='office')renderOffice();
  if(current.stage==='scene')renderScene();
  if(current.stage==='zoom')renderZoom();
  if(current.stage==='board')renderBoard();
  if(current.stage==='win'||current.stage==='loss')renderEnd();
}
function renderOffice(){
  game.innerHTML=`<section class="office-layout">
    <div class="office-visual" aria-label="A rain-lashed detective office at night">
      <div class="office-window"></div><div class="office-desk"></div><div class="desk-lamp"></div><div class="phone phone-ringing"></div>
    </div>
    <div class="office-copy">
      <div class="eyebrow">Chicago · 2:00 AM · The call</div>
      <h1 class="display-title">The city<br>never <em>sleeps.</em></h1>
      <p class="lede">The rotary phone claws through the quiet. Another body. Another night with the rain for company.</p>
      <div class="callout"><b>Sergeant Miller · Homicide</b>“${escapeHTML(current.tip)}”</div>
      <div class="address-row"><span>⌖</span> ${escapeHTML(current.address)}</div>
      <button class="btn" data-action="head">Head to the Crime Scene <span class="arrow">→</span></button>
      <div class="case-facts"><div><strong>THE VICTIM</strong>${escapeHTML(current.victim.name)}</div><div><strong>CAUSE</strong>${escapeHTML(current.weapon)}</div><div><strong>WEATHER</strong>Cold rain</div></div>
    </div>
  </section>`;
}
function renderScene(){
  const foundCount=current.found.length;
  game.innerHTML=`<section class="scene-shell">
    <div class="scene-heading"><div><div class="eyebrow">Crime scene · ${escapeHTML(current.victim.role)}</div><h1>Rain on the evidence.</h1></div><div class="location"><strong>${escapeHTML(current.address)}</strong><br>POLICE LINE · 02:17 AM</div></div>
    <div class="scene-layout">
      <div class="scene-art" aria-label="Top-down view of the murder room">
        <div class="room-grid"></div><div class="room-wall wall-top"></div><div class="room-wall wall-left"></div><div class="room-wall wall-right"></div><div class="rug"></div>
        <div class="desk-prop"></div><div class="window-prop"></div><div class="coat-prop"></div><div class="lamp-prop"></div><div class="body-prop"></div><div class="blood-mark"></div>
        ${Object.entries(objectInfo).map(([key,obj])=>`<button class="hotspot ${obj.spot}" data-object="${key}" aria-label="${obj.name}" title="${obj.name}">${obj.icon}</button>`).join('')}
        <div class="scene-caption">EVIDENCE MARKERS · SELECT AN OBJECT</div>
      </div>
      <aside class="scene-side"><div class="side-label">THE SCENE / 04 OBJECTS</div><h2>Look closer.</h2><p>The room is sealed. Tap a marked object and see what the rain couldn’t wash away.</p>
        <div class="victim-card"><div class="avatar"></div><div><small>DECEASED</small><strong>${escapeHTML(current.victim.name)}</strong></div></div>
        <div class="progress-label"><span>EVIDENCE RECOVERED</span><span>${foundCount} / 4</span></div><div class="progress-track"><span style="width:${foundCount*25}%"></span></div>
        <div class="side-buttons"><button class="btn secondary" data-action="board">▤ &nbsp; Open Evidence Board</button><button class="btn secondary" data-action="office">← &nbsp; Back to the Call</button></div>
      </aside>
    </div>
  </section>`;
}
function renderZoom(){
  const key=current.zoom;
  const clue=current.evidence[key];
  const found=current.found.includes(key);
  game.innerHTML=`<section class="zoom-shell">
    <div class="zoom-art" data-object="${key}" aria-label="Close-up: ${escapeHTML(objectInfo[key].name)}"><div class="zoom-object">${objectInfo[key].objectIcon}</div><div class="zoom-grain"></div></div>
    <div class="zoom-side"><div class="eyebrow">Evidence close-up · ${escapeHTML(current.address.split(',')[0])}</div><h1>${escapeHTML(clue.title)}</h1>
      <p class="clue-quote">“${escapeHTML(clue.text)}”</p>
      <div class="found-tag">${found?'✓ EVIDENCE LOGGED':'✦ NEW EVIDENCE ADDED TO THE CASE FILE'}</div>
      <button class="btn secondary" data-action="scene">← &nbsp; Zoom Out</button>
      <button class="btn secondary" data-action="board" style="margin-top:9px">▤ &nbsp; Open Evidence Board</button>
    </div>
  </section>`;
}
function renderBoard(){
  const selected=current.selected||'';
  const clues=current.found.map(key=>{const clue=current.evidence[key];return `<article class="evidence-card ${clue.gun?'gun':''}"><div class="evidence-icon">${clue.gun?'✦':'◈'}</div><div><h3>${escapeHTML(clue.title)}${clue.gun?' · SMOKING GUN':''}</h3><p>${escapeHTML(clue.text)}</p></div></article>`;}).join('');
  const cards=current.suspects.map(suspect=>`<article class="suspect-card" style="${selected===suspect.name?'border-color:#c7a86c;box-shadow:inset 0 0 0 1px #c7a86c':''}"><div class="suspect-avatar" aria-hidden="true"></div><h3>${escapeHTML(suspect.name)}</h3><div class="role">${escapeHTML(suspect.role)}</div><p><b>Motive</b> ${escapeHTML(suspect.motive)}<br><b>Alibi</b> ${escapeHTML(suspect.alibi)}</p><button class="btn ${selected===suspect.name?'':'secondary'}" data-suspect="${escapeHTML(suspect.name)}" style="margin-top:11px;width:100%;padding:9px 5px;font-size:8px">${selected===suspect.name?'✓ SELECTED':'SELECT SUSPECT'}</button></article>`).join('');
  game.innerHTML=`<section class="board-shell">
    <div class="board-title"><div><div class="eyebrow">Case file ${String(caseNumber).padStart(4,'0')} · Private notes</div><h1>Make it make sense.</h1></div><div class="case-stamp">${current.found.some(k=>current.evidence[k].gun)?'GUN FOUND':'OPEN CASE'}</div></div>
    <div class="board-grid">
      <div class="board-panel"><div class="panel-heading"><span>RECOVERED EVIDENCE</span><span>${current.found.length} / 4</span></div><div class="evidence-list">${clues||'<div class="empty-evidence">NO EVIDENCE YET<br>THE ROOM IS STILL WAITING.</div>'}</div></div>
      <div class="board-panel"><div class="panel-heading"><span>PERSONS OF INTEREST</span><span>3 PROFILES</span></div><div class="suspect-grid">${cards}</div></div>
    </div>
    <div class="board-actions"><button class="btn secondary" data-action="scene">← &nbsp; Return to Crime Scene</button><span class="hint">${selected?'ONE NAME. MAKE IT COUNT.':'SELECT A SUSPECT TO FORMALIZE AN ACCUSATION.'}</span><button class="btn danger" data-action="accuse" ${selected?'':'disabled'}>Accuse a Suspect <span class="arrow">→</span></button></div>
  </section>`;
}
function renderEnd(){
  const won=current.stage==='win';
  game.innerHTML=`<section class="end-layout ${won?'win':''}"><div class="end-icon"><span>${won?'✓':'×'}</span></div>
    <div class="eyebrow">${won?'Case closed · 03:12 AM':'Cold case · 03:12 AM'}</div>
    <h1 class="display-title">${won?'The city':'The trail'}<br><em>${won?'owes you one.':'goes cold.'}</em></h1>
    <p class="lede">${won?'The cuffs click shut. The rain keeps falling, but one ghost won’t haunt these streets again.':'The killer slips into the wet dark. Without proof, the department shuts the file and the truth goes with them.'}</p>
    <div class="end-note">THE KILLER WAS <strong>${escapeHTML(current.killer.name)}</strong> · ${escapeHTML(current.victim.name)}’S CASE</div>
    <div class="end-actions"><button class="btn" data-action="new">Take another case <span class="arrow">→</span></button><button class="btn secondary" data-action="details">Review the evidence</button></div>
  </section>`;
}
function handleAction(action){
  if(action==='head'||action==='scene')current.stage='scene';
  if(action==='office')current.stage='office';
  if(action==='board')current.stage='board';
  if(action==='new'){startCase();return;}
  if(action==='details'){current.stage='board';current.selected='';}
  if(action==='accuse'){
    const foundGun=current.found.some(key=>current.evidence[key].gun);
    current.stage=current.selected===current.killer.name&&foundGun?'win':'loss';
  }
  render();
}
game.addEventListener('click',event=>{
  const objectButton=event.target.closest('[data-object]');
  if(objectButton){
    const key=objectButton.dataset.object;
    if(!current.found.includes(key))current.found.push(key);
    current.zoom=key;current.stage='zoom';render();return;
  }
  const suspectButton=event.target.closest('[data-suspect]');
  if(suspectButton){current.selected=suspectButton.dataset.suspect;render();return;}
  const actionButton=event.target.closest('[data-action]');
  if(actionButton&&!actionButton.disabled)handleAction(actionButton.dataset.action);
});
$('#new-case').addEventListener('click',startCase);
startCase();
