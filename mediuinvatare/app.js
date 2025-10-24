/* ====== STATE ====== */
const STORAGE_KEY = "kirby_premium_v1";
let state = {
  deck: [],           // flashcards with spaced repetition meta
  notes: "",
  activeModule: MODULES[0].id,
  chunkIndex: 0
};

/* ====== UTIL ====== */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const uid = () => Math.random().toString(36).slice(2,9);
const now = () => new Date();
const isFuture = iso => new Date(iso) > now();

/* ====== PERSIST ====== */
function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    deck: state.deck, notes: $('#notesBox').value || state.notes,
    activeModule: state.activeModule, chunkIndex: state.chunkIndex
  }));
  renderStats();
}
function load(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try {
    const d = JSON.parse(raw);
    state.deck = d.deck || [];
    state.notes = d.notes || "";
    state.activeModule = d.activeModule || MODULES[0].id;
    state.chunkIndex = d.chunkIndex || 0;
  } catch {}
}

/* ====== INIT DECK ====== */
function ensureDeck(){
  if(state.deck.length) return;
  state.deck = CARDS.map(c=>({
    id: uid(), q: c.q, a: c.a, module: guessModule(c),
    level: 0, due: new Date().toISOString()
  }));
}

/* ====== TABS ====== */
function switchTab(id){
  $$('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  $$('.panel').forEach(p=>p.classList.remove('shown'));
  $('#tab-'+id).classList.add('shown');
}
$$('.tab').forEach(b=> b.addEventListener('click', ()=> switchTab(b.dataset.tab)));

/* ====== STUDY ====== */
function fillModuleSelect(){
  const s = $('#moduleSelect');
  s.innerHTML = MODULES.map(m=> `<option value="${m.id}">${m.title}</option>`).join('');
  s.value = state.activeModule;
  s.onchange = ()=>{ state.activeModule = s.value; state.chunkIndex = 0; renderReader(); save(); };
}
function renderReader(){
  const m = MODULES.find(x=>x.id===state.activeModule) || MODULES[0];
  $('#moduleTitle').textContent = m.title;
  const html = m.parts.map((txt,i)=>`
    <div class="chunk">
      <div class="tag">Bucata ${i+1}/${m.parts.length}</div>
      <div>${txt}</div>
    </div>`).join('');
  $('#reader').innerHTML = html;
  highlightChunk();
}
function highlightChunk(){
  const chunks = $$('#reader .chunk');
  chunks.forEach((c,i)=> c.style.outline = (i===state.chunkIndex?'2px solid var(--accent)':'none'));
}
$('#nextChunk').addEventListener('click', ()=>{
  const m = MODULES.find(x=>x.id===state.activeModule) || MODULES[0];
  state.chunkIndex = (state.chunkIndex+1) % m.parts.length;
  highlightChunk(); speakChunk();
  save();
});

/* ====== TTS ====== */
let voices=[];
function loadVoices(){
  voices = speechSynthesis.getVoices();
}
if('speechSynthesis' in window){
  speechSynthesis.onvoiceschanged = loadVoices; loadVoices();
}
function speakChunk(){
  speechSynthesis.cancel();
  const m = MODULES.find(x=>x.id===state.activeModule);
  const text = m.parts[state.chunkIndex];
  if(!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.02;
  speechSynthesis.speak(u);
}
$('#ttsBtn').addEventListener('click', speakChunk);
$('#stopTTSBtn').addEventListener('click', ()=> speechSynthesis.cancel());
$('#themeBtn').addEventListener('click', ()=> document.body.classList.toggle('dark'));

/* ====== FLASH ====== */
let pool=[], idx=0;
function fillFilters(){
  const opts = [{id:'all',name:'Toate'}, ...MODULES.map(m=>({id:m.id,name:m.title}))];
  ['deckFilter','quizFilter'].forEach(id=>{
    const s = $('#'+id); s.innerHTML = opts.map(o=>`<option value="${o.id}">${o.name}</option>`).join('');
  });
  // neg filter
  const cats = ['Toate', ...Array.from(new Set(NEG.map(n=>n.cat)))];
  $('#negFilter').innerHTML = cats.map(c=>`<option value="${c}">${c}</option>`).join('');
}
function buildPool(filter){
  let arr = [...state.deck];
  if(filter && filter!=='all') arr = arr.filter(c=>c.module===filter);
  const due = arr.filter(c=>!isFuture(c.due));
  pool = due.length ? due : arr;
  idx = 0;
}
function renderFlash(){
  if(!pool.length){ $('#flashFront').textContent='Nu există carduri.'; $('#flashBack').textContent=''; return; }
  const c = pool[idx];
  $('#flashFront').textContent = c.q;
  $('#flashBack').textContent = c.a;
  $('#flashBack').classList.add('hide');
  $('#showBtn').textContent='Arată răspuns';
  $('#flashInfo').textContent = `Card ${idx+1}/${pool.length} • level ${c.level}`;
}
function schedule(card, grade){
  const steps=[{m:10},{h:1},{d:1},{d:3},{d:7}];
  if(grade==='good') card.level = Math.min(card.level+1, steps.length-1);
  else card.level = Math.max(0, card.level-1);
  const d = new Date();
  const s = steps[card.level];
  if(s.m) d.setMinutes(d.getMinutes()+s.m);
  if(s.h) d.setHours(d.getHours()+s.h);
  if(s.d) d.setDate(d.getDate()+s.d);
  card.due = d.toISOString();
}
$('#flashCard').addEventListener('click', ()=>{
  const b = $('#flashBack'); b.classList.toggle('hide');
  $('#showBtn').textContent = b.classList.contains('hide')?'Arată răspuns':'Ascunde';
});
$('#showBtn').addEventListener('click', ()=> $('#flashCard').click());
$('#againBtn').addEventListener('click', ()=> { const c=pool[idx]; schedule(c,'again'); save(); idx=(idx+1)%pool.length; renderFlash(); });
$('#goodBtn').addEventListener('click',  ()=> { const c=pool[idx]; schedule(c,'good');  save(); idx=(idx+1)%pool.length; renderFlash(); });
$('#deckFilter').addEventListener('change', e=>{ buildPool(e.target.value); renderFlash(); });
$('#shuffleBtn').addEventListener('click', ()=>{ pool.sort(()=>Math.random()-0.5); idx=0; renderFlash(); });

/* Editor */
$('#editBtn').addEventListener('click', ()=>{
  const f = $('#deckFilter').value;
  const set = state.deck.filter(c=> f==='all' ? true : c.module===f);
  $('#editor').value = set.map(c=>`Q: ${c.q}\nA: ${c.a}\n---`).join('\n');
  $('#modal').classList.remove('hide');
});
$('#closeModal').addEventListener('click', ()=> $('#modal').classList.add('hide'));
$('#saveSetBtn').addEventListener('click', ()=>{
  const f = $('#deckFilter').value;
  const groups = $('#editor').value.trim().split(/\n-{3,}\s*/).map(s=>s.trim()).filter(Boolean);
  const fresh = groups.map(g=>{
    const q=(g.match(/(^|\n)Q:\s*([\s\S]*?)(\nA:|$)/i)||[])[2]?.trim();
    const a=(g.match(/\nA:\s*([\s\S]*)$/i)||[])[1]?.trim();
    if(!q||!a) return null;
    return {id:uid(),q,a,module:f==='all'?guessModule({q,a}):f,level:0,due:new Date().toISOString()};
  }).filter(Boolean);
  state.deck = state.deck.filter(c=> f==='all' ? false : c.module!==f).concat(fresh);
  save(); $('#modal').classList.add('hide');
  buildPool(f); renderFlash();
});

/* ====== QUIZ ====== */
$('#startQuizBtn').addEventListener('click', startQuiz);
function startQuiz(){
  const n = Math.max(4, Math.min(parseInt($('#quizCount').value||'12',10), 40));
  const f = $('#quizFilter').value;
  let arr = [...state.deck]; if(f!=='all') arr = arr.filter(c=>c.module===f);
  if(arr.length<4){ $('#quizArea').innerHTML = `<p class="muted">Nu sunt suficiente carduri.</p>`; return; }
  arr.sort(()=>Math.random()-0.5);
  const pick = arr.slice(0, Math.min(n, arr.length));
  let i=0, score=0;
  const area = $('#quizArea');
  function render(){
    const it = pick[i];
    const opts = [it.a, ...arr.filter(x=>x.id!==it.id).sort(()=>Math.random()-0.5).slice(0,3).map(x=>x.a)].sort(()=>Math.random()-0.5);
    area.innerHTML = `
      <div class="quiz q">
        <div class="muted">Întrebarea ${i+1}/${pick.length}</div>
        <div class="front">${it.q}</div>
        ${opts.map(o=>`<button class="opt">${o}</button>`).join('')}
        <div class="muted right">Scor: ${score}</div>
      </div>`;
    area.querySelectorAll('.opt').forEach(b=>{
      b.onclick = ()=>{
        const ok = b.textContent===it.a;
        b.classList.add(ok?'correct':'wrong');
        if(ok) score++;
        setTimeout(()=>{ i++; if(i>=pick.length){
          area.innerHTML = `<div class="q"><div class="front">Gata! Scor: ${score}/${pick.length}</div><button id="againQuiz" class="primary" style="margin-top:10px">Reia</button></div>`;
          $('#againQuiz').onclick = startQuiz;
        } else render(); }, 500);
      };
    });
  }
  render();
}

/* ====== NEGOTIATION SIM ====== */
$('#newScenario').addEventListener('click', newScenario);
function newScenario(){
  const cat = $('#negFilter').value;
  let pool = [...NEG];
  if(cat!=='Toate') pool = pool.filter(n=>n.cat===cat);
  const sc = pool[Math.floor(Math.random()*pool.length)];
  const area = $('#negArea');
  const choices = [sc.good, ...sc.bad].sort(()=>Math.random()-0.5);
  area.innerHTML = `
    <div class="bubble"><b>Client:</b> „${sc.client}”</div>
    <div class="bubble">
      ${choices.map(c=>`<button class="reply">${c}</button>`).join('')}
    </div>`;
  area.querySelectorAll('.reply').forEach(btn=>{
    btn.onclick = ()=>{
      const ok = btn.textContent===sc.good;
      btn.classList.add(ok?'ok':'no');
      setTimeout(newScenario, 700);
    };
  });
}

/* ====== NOTES & STATS ====== */
$('#saveNotesBtn').addEventListener('click', ()=>{ state.notes = $('#notesBox').value; save(); alert('Notițe salvate!'); });
function renderStats(){
  const total = state.deck.length || 1;
  const mastered = state.deck.filter(c=>c.level>=3).length;
  $('#statTotal').textContent = total;
  $('#statMastered').textContent = mastered;
  $('#progressBar').style.width = Math.round(mastered*100/total)+'%';
}

/* ====== INIT ====== */
function buildPool(filter){ /* shadowing fixed below */ }
(function(){
  // fix shadowed function (already declared earlier)
})();
function init(){
  load(); ensureDeck();
  fillModuleSelect(); renderReader();
  fillFilters();
  // build pool default
  const f = $('#deckFilter').value || 'all';
  // redefine buildPool (typo guard)
  window.buildPool = function(filter){
    let arr = [...state.deck];
    if(filter && filter!=='all') arr = arr.filter(c=>c.module===filter);
    const due = arr.filter(c=>!isFuture(c.due));
    pool = due.length ? due : arr;
    idx = 0;
  };
  buildPool(f); renderFlash();
  $('#notesBox').value = state.notes;
  renderStats();
  // hotkeys mobile-safe: Enter = good, Space = again
  document.addEventListener('keydown', (e)=>{
    if(e.target.matches('input,textarea')) return;
    if(e.key==='Enter'){ e.preventDefault(); $('#goodBtn').click(); }
    if(e.key===' '){ e.preventDefault(); $('#againBtn').click(); }
  });
}
init();
