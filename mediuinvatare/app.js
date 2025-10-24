/* ========== SCRIPT: textul tău 1:1, organizat pe capitole/subcapitole ========== */
/* Paragrafele marcate arg:true sunt evidențiate cu badge-ul ARGUMENT. */

const SCRIPT = [
  {
    id: "intro",
    title: "1) Introducere & scopul vizitei",
    groups: [
      {
        id: "intro-core",
        title: "Introducere",
        blocks: [
          { text: "Am venit astăzi la dumneavoastră să vi-l prezint pe Kirby şi să facem o mică curăţenie, dvs. nu aveţi nicio obligaţie, nu vă costă nimic, dar la final dacă consideraţi că este util şi necesar acesta poate fi şi achiziţionat." },
          { text: "Kirby este un produs american, este pe piaţă de mai bine de 100 de ani, el este pentru persoanele care apreciează calitatea, fiabilitatea şi performanţa", arg:true },
          { text: "Are cel mai mare grad de filtrare, Micron Magic HEPA Filtration, adică filtare până la ultimul micron, orice intră în sacul Kirby acolo rămâne, sacul are 7 straturi şi 4 cusături", arg:true },
          { text: "Kirby este un produs exclusivist, el se vinde doar prin cadrul acestor prezentări, cum sunt şi eu astăzi la dumneavoastră, orice alt fel de reclamă este interzisă.", arg:true },
          { text: "Am venit astăzi la dumneavoastră cu 2 motive, unul să îl fac pe Kirby cât mai cunoscut în casele românilor, şi eu împreună cu colegii mei din toată România suntem înscrişi într-un concurs cu plecare în Gran Canaria unde ajung doar campionii diviziei, unde îmi doresc şi eu să fiu, iar dumneavoastră m-aţi ajuta foarte mult dacă la finalul prezentării îmi puteţi oferi contacte, rude, prieteni, familii la fel de serioase ca şi dumneavoastră la care să merg să le fac o prezentare gratuită" },
          { text: "Înainte de a începe prezentarea trebuie să îl sun pe domnul manager să-l anunţ că am ajuns la dumneavoastră şi că începem prezentarea." },
          { text: "O rugăminte aş mai avea la final să-mi spuneţi concret dacă aţi vrea să îl achiziţionaţi pe Kirby, da sau nu." }
        ]
      }
    ]
  },
  {
    id: "base",
    title: "2) Aparatul de bază & tehnic",
    groups: [
      {
        id: "materiale",
        title: "Materiale & siguranță",
        blocks: [
          { text: "Kirby este produs din duraluminiu, un material foarte rezistent, care mai este folosit şi în industria aeronautică, de aici şi forma asta mai din viitor", arg:true },
          { text: "Kirby are 2 turbine, 1 frontală pentru aspirare directă şi eficientă, una în lateral care ajută la răcirea motorului, îl puteţi folosi pe Kirby 24/7 acesta nu se supra încălzeşte, de aici şi durata de viaţă de 25-30 de ani şi o garanţie de 13 ani dacă îl achiziţionaţi de la un distribuitor autorizat", arg:true },
          { text: "Are aceste 2 micro-întrerupătoare, ele sunt pentru protecţia noastră, a copiilor, dacă ceva nu este montat bine Kirby nu porneşte, nu se poate arde.", arg:true },
          { text: "Roţile învelite în cauciuc siliconat pentru a proteja suprafaţa pe care este folosit" },
          { text: "LED frontal pentru a ilumina spaţiile întunecate" },
          { text: "Cutie de viteze în spate, cu 2 trepte, normal şi drive, funcţia drive preia 80% din efort, practic merge singur.", arg:true },
          { text: "Cablu lung de 10 metri care ne permite o aspirare eficientă cu o singură priză\nConsum între 450 şi 520 de waţi" },
          { text: "În prezentarea de astăzi vom folosi un vizualizator pentru a vedea în timp real eficienţa lui Kirby, dvs. nu veţi primi nici acest vizualizator, nici aceste filtre, veţi primii direct sacul Kirby cu cel mai mare grad de filtrare." }
        ]
      }
    ]
  },
  {
    id: "access",
    title: "3) Accesorii & perii",
    groups: [
      {
        id: "furtun-tevi",
        title: "Furtun + țevi + cot mobil",
        blocks: [
          { text: "Primul mod de aspirare este cel clasic cu furtunul, furtul are undeva la 210 centimetri, este foarte rezistent, nu se rupe şi mereu revine la forma iniţială" },
          { text: "Cu aceste 2 ţevi din plastic uşoare şi rezistente, lucioase pe interior pentru a nu reţine praf, şi cu cotul mobil, o invenţie patentată Kirby, putem avea poziţia de aspirare clasică, poziţia de aspirare a suprafeţelor înalte, şi unghiul de 45 de grade care ne permite aspirarea în profunzime a mobilierului, sub pat, etc", arg:true }
        ]
      },
      {
        id: "peria-dure",
        title: "Peria suprafețe dure (gresie/parchet)",
        blocks: [
          { text: "Prima perie pe care vreau să v-o arăt, este peria pentru suprafeţe dure, gresie parchet\n- aspiră pe toată suprafaţa ei, nu ca periile clasice doar 2-3 centimetri\n- are roţile învelite în cauciuc la fel pentru a proteja suprafaţa unde e folosită\n- are aceste 2 orificii de aspirare, nu fac vid\n- peria interioară permite scoterea prafului de la rosturi în timp ce aspiraţi" },
          { text: "argument:\ncând umblăm în şosete prin casă ne murdărim, iar dacă curăţăm podeaua cu mopul clasic e ca şi cum ne-am da cu cremă de mâini înainte să ne spălăm pe mâini, acesta este motivul pentru care se pătează chitul gresiei", arg:true }
        ]
      },
      {
        id: "peria-inalte",
        title: "Peria suprafețe înalte (perdele/draperii/tavan/pereți/AC)",
        blocks: [
          { text: "A doua perie este cea pentru suprafeţe înalte(perdele, draperii, tavan, pereţi, deasupra AC-ului)" },
          { text: "argument: \nde obicei le spălăm de 2 ori pe an, între sărbători, perdelele şi draperiile sunt filtrul casei, atunci când le băgăm la maşina de spălat ele se deterioează, se îngălbenesc pentru că au praf în ele\ncu această perie le putem aspira şi spăla direct pe verticală", arg:true }
        ]
      },
      {
        id: "peria-zip",
        title: "Peria Zipp (textile profunde)",
        blocks: [
          { text: "Peria Zipp\n- bate perie şi aspiră de 3600 de ori pe minut\n- aspiră în profunzime până la 15 cm" },
          { text: "argument:\nîn canapea şi în materialele textile se află aproximativ 80% din praf, pe acesta îl vedem în razele solare şi ne deteriorează suprafeţele şi ne deranjează vizual\n\n- când ne aşezăm pe canapea, ridicăm praful în aer, îl inhalăm şi ajungem la probleme de sănătate, alergii, diferite boli, pe care le dobândim în timp, nu ne naştem cu ele\n\n-nu ar trebui să cadă suc, vin sau sos pe canapea, este suficient să ne cadă apa care în combinaţie cu praful se transformă în nămol, de aceea este foarte important sa aspiram foarte bine praful\n\n- peria zip se foloseste pentru scaune tapiţate, canapele, paltoane, jucării de pluş, perne, prosoape, etc", arg:true }
        ]
      },
      {
        id: "alte-accesorii",
        title: "Accesorii utile",
        blocks: [
          { text: "Peria pentru suprafeţe înguste, colţuri, plinte, şifoniere culisabile, calorifer" },
          { text: "Ţesala pentru animale, haine de blană care face şi masaj capilar" },
          { text: "Compresor, dispozitiv pentru a umfla/dezumflat orice articol gonflabil, putem sufla praf din zone greu accesibile" },
          { text: "Pistol pulverizant, puteţi pune în recipient balsam, şampon, parfum, pentru a reimprospăta mirosul draperiilor, sau pentru a scoate pete" }
        ]
      },
      {
        id: "peria-carpa",
        title: "Peria cârpă (păr de cămilă)",
        blocks: [
          { text: "Peria cârpă\n- confecţionată din păr de cămilă, fină la atingere\n- nu reţine praf şi nu zgârie suprafaţa" },
          { text: "- cămila trăind în deşert, dacă ar reţine praf, ea nu s-ar mai putea ridica şi nu ar mai putea merge", arg:true },
          { text: "- nu mai este necesar să cheltuiţi bani pe şerveţele, lavete, cârpe, soluţii, etc\n- o lavetă are o rată de eficienţă de 20%, restul de 80% îl inhalăm sau se depune înapoi pe suprafaţă, de aceea este foarte importat să fie depozitat", arg:true }
        ]
      },
      {
        id: "turbo",
        title: "Turbo adaptorul",
        blocks: [
          { text: "Turbo adaptorul\n- puteţi şlefuii\n- puteţi degresa\n- puteţi să vă faceţi masaj\n\nare 3600 de degresări pe minut, este foarte eficient, ca o periuţă de dinţi electrică, care este mai bună decât una normală", arg:true }
        ]
      }
    ]
  },
  {
    id: "mattress",
    title: "4) Salteaua — Cârpa 1–4 (focus maxim)",
    groups: [
      {
        id: "saltea-intro",
        title: "De ce salteaua",
        blocks: [
          { text: "Salteaua\n5 minute dacă aş avea la dispoziţie să vă arăt ce face Kirby mai importat, doar aşa vi l-aş fi arătat\nAcesta este principalul motiv pentru care clientii cumpăra Kirby", arg:true },
          { text: "Întrebare: Ce spuneţi, daca nu avem furtun sau ţevi la un aspirator, aceasta mai poate fi folosit?\nSunt convins că chiar şi dvs. dacă o să luaţi decizia de a-l cumpăra pe Kirby astăzi de la mine sau nu, ce vedeţi acum o să ţineţi minte toată viaţă" },
          { text: "Peria bătător sau peria regină cum îi mai spunem noi\n- aspiră, bate şi perie pe toată suprafaţa ei de 38 de cm\n- aspiră până la 40 cm în profunzime\n- ea se montează la 1mm de motor, pentru o aspirare cât mai profundă şi eficientă (una e să bem apă cu paiul şi alta e să bem direct din pahar)", arg:true }
        ]
      },
      {
        id: "carpa1",
        title: "Cârpa 1 — acarieni & sănătate",
        blocks: [
          { text: "Prima cârpă (ştiţi ce se află aici?) Praf, scame, dar şi acarieni, aţi auzit de ei?" },
          { text: "Acarienii trăiesc între 2–4 luni\nreziduurile şi excrementele lor lăsate în saltele şi perne sunt cele care dăunează sistemului respirator, dau alergii şi unele boli ale aparatului respirator (astm, eczeme, inflamaţii ale mucoasei nazale)\nAu mediul prielnic să se dezvolte, căldură întuneric şi umiditate", arg:true },
          { text: "Un adult pierde într-o zi 1,5g de piele, aceasta este suficientă pentru a hrăni 1 milion de acarieni, iar un singur acarian poate produce reziduuri de până la 200 de ori greutatea lor", arg:true },
          { text: "De-asta oamenii se decid să cumpere Kirby, văd pe ce se doarme, iar alte alternative nu avem, nu există nici curăţătorii de saltele şi nici alte aparate", arg:true },
          { text: "V-aţi hotărât să luaţi un Kirby? Batem palma?", arg:true },
          { text: "Pentru ce vedeţi aici unii oameni se îmbolnăvesc, copiii sunt cei mai predispuşi să se îmbolnăvească, dar şi adulţii, nimeni nu este imun la aşa ceva.", arg:true },
          { text: "Presupun că la dvs. nu este problemă cu alergiile, după cum vedeţi Kirby este o necesitate nu un moft, nu-i aşa?", arg:true },
          { text: "Presupun că nu mai e nevoie să vă întreb dacă aveţi nevoie de un Kirby în casă sau nu.", arg:true }
        ]
      },
      {
        id: "carpa2",
        title: "Cârpa 2 — întreținere & opțiuni",
        blocks: [
          { text: "A doua cârpă\nPentru început trebuie să insistăm 15-20 de minute, iar întreţinerea se face în timp, 5 minute o dată la 2 luni este suficient pentru a dormi pe o saltea curată.", arg:true },
          { text: "Sunt două metode prin care puteţi scăpa de aşa ceva din saltele, prima ar fi să ascultăm sfatul unui medic alergolog şi să schimbăm salteaua o dată la 2 luni, sau să avem un Kirby acasă să le putem întreţine.", arg:true },
          { text: "Saltele sunt cele mai murdare locuri din casă, mult mai murdare decât podelele, le folosim mai des şi le curăţăm cel mai rar, Un sfert din viaţa noastră o putrecem pe saltea, domnule/doamna X, unde trebuie să fie mai curat? unde stăm cu picioarele sau unde punem capul?", arg:true }
        ]
      },
      {
        id: "carpa3",
        title: "Cârpa 3 — întrebarea de cuplu",
        blocks: [
          { text: "A treia cârpă\nCredeţi că, dacă eu astazi eram aici doar cu soţul/soţia dvs. şi după toate cele vazute de către dânsa/dânsul l-ar fi cumpărat pe Kirby astăzi de la mine v-ar fi deranjat? Nici soţul/soţia dvs nu are de ce sa se supere dacă îl cumpăraţi.", arg:true }
        ]
      },
      {
        id: "carpa4",
        title: "Cârpa 4 — prioritate & momentul deciziei",
        blocks: [
          { text: "A patra cârpă\nPână acum nu aţi ştiut ce se află în salteaua dvs. şi Kirby nu a fost o prioritate pentru dvs. dar acum că ştiţi şi vedeţi pe ce dormiţi seară de seară, presupun că ar trebui să fie o prioritate, nu?", arg:true },
          { text: "V-aţi hotărât să îl folosiţi pe Kirby? Când credeţi că este cel mai bun momentan să schimbăm ce găsim pe cârpe?", arg:true },
          { text: "Când ne întoarcem în sufragerie, punem cârpele lângă filtre şi facem prima încercare de vânzare pe fişa reporter, Dl/Dna popescu, să ştiţi că în cadrul prezentării noi avem nişte condiţii mai uşoare de achiziţie\nintegral şi 5% discount\n1500 avans şi 12 rate" }
        ]
      }
    ]
  },
  {
    id: "rug",
    title: "5) Covorul — test comparativ",
    groups: [
      {
        id: "covor-demo",
        title: "Demo & comparație",
        blocks: [
          { text: "Covorul\nPrezentăm mânerul vertical\n- acum îl transformăm pe Kirby într-un aspirator vertical, noi numim acest mâner protecţia coloanei\n- nu trebuie să vă mai aplecaţi când daţi cu aspiratorul, staţi cu spatele drept şi cu mânerul în dreptul buzunarului, pentru că mânerul se reglează în funcţie de înălţimea fiecăruia" },
          { text: "Când s-a aspirat ultima oară covorul?" },
          { text: "Dna/Dl X, sunt 2 motive pentru care noi am găsit acest praf, unul ar fi acela că a trecut ceva timp de la ultima aspirare sau poate că nu am avut timp să insistăm suficient, sau al doilea aspiratorul dvs nu-şi mai face datoria.", arg:true },
          { text: "Aş vrea sa va întreb cine se ocupă de curăţenie în casa dvs. Aveti pe cineva sau dvs.?" },
          { text: "O să delimitez un m2 de covor, şi o să vă rog să aspiraţi această suprafaţă până consideraţi dvs că este curată. De obicei daţi aşa mult pe o suprafaţă aşa mică? O să dau şi eu acum de 100 de ori să fim siguri că aspiratorul dvs a făcut tot posibilul pe această suprafaţă" },
          { text: "Eu acum o să pun un filtru curat, şi o să aspir cu Kirby această suprafaţă, unde am dat înainte de 100 de ori cu aspiratorul dvs." },
          { text: "Dacă Kirby nu mai găseşte praf înseamnă că aspiratorul dvs îşi face treaba doar că trebuie insistat foarte mult.", arg:true },
          { text: "Daca Kirby găseşte praf, ştim unde este problema, aspiratorul dvs. nu-şi mai face datoria şi trebuie schimbat.", arg:true },
          { text: "După ce aspir, o să vă dau acest filtru şi să-mi spuneţi care este diferenţa între suprafaţă aspirată şi cea neaspirată." }
        ]
      }
    ]
  },
  {
    id: "close",
    title: "6) Negociere & vânzare",
    groups: [
      {
        id: "inchidere",
        title: "Recapitulare & decizie",
        blocks: [
          { text: "Negociere şi vânzare\nArgumentăm şi recapitulăm, mai devreme ce am făcut Dl/Dna x, am depus efort, am consumat curent, energie, timp şi sănătate, şi rezultatul este acela de pe filtru.", arg:true },
          { text: "Acum v-aţi hotărât să îl punem pe Kirby la treabă?\nPractic avem aceeaşi curaţenie şi unde am aspirat de 100 de ori şi unde nu am aspirat, merităm rezultate mai bune? cum vreţi să-l achiziţionaţi? integral sau în rate?", arg:true },
          { text: "Facem testul pe loc şi-l dăm clientului să-l folosească, să vadă că e uşor de folosit." },
          { text: "V-aţi decis cum vreti să-l achiziţionaţi? Găsim o soluţie ca eu să plec cu praful şi acarienii şi cu punctele pentru concurs şi dvs să ramâneţi cu Kirby să vă rezolvaţi problema?", arg:true }
        ]
      }
    ]
  },
  {
    id: "follow",
    title: "7) Follow-up",
    groups: [
      {
        id: "final",
        title: "Final & recomandări",
        blocks: [
          { text: "Dl/Dna X — la final un răspuns concret: Da sau Nu. Mulţumiri pentru timp şi sprijin. Dacă v-a plăcut prezentarea, mă ajută mult 3–5 contacte (rude/prieteni/familii) pentru o prezentare gratuită, în cadrul concursului." }
        ]
      }
    ]
  }
];

/* ========== APLICAȚIE (fără TTS, fără checkbox-uri) ========== */

const STORAGE_KEY = "Kirby_full_trainer_progress_v2";
let state = { chapter: SCRIPT[0].id, group: SCRIPT[0].groups[0].id };

const $  = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function load(){
  try{ const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){ state = { ...state, ...JSON.parse(raw) }; }
  }catch{}
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function currentChapter(){ return SCRIPT.find(c => c.id === state.chapter) || SCRIPT[0]; }
function currentGroup(){
  const chap = currentChapter();
  return chap.groups.find(g => g.id === state.group) || chap.groups[0];
}

/* ----- Tabs (desktop) ----- */
function renderTabs(){
  const nav = document.querySelector('.tabs');
  nav.innerHTML = SCRIPT.map(c =>
    `<button class="tab ${c.id===state.chapter?'active':''}" data-id="${c.id}">${c.title}</button>`
  ).join('');
  nav.querySelectorAll('.tab').forEach(btn=>{
    btn.onclick = ()=>{
      state.chapter = btn.dataset.id;
      state.group   = (SCRIPT.find(x=>x.id===state.chapter).groups[0].id);
      save(); fillSelectors(); renderContent(); renderTabs();
      window.scrollTo({top:0, behavior:'smooth'});
    };
  });
}

/* ----- Selectoare capitol/subcapitol ----- */
function fillSelectors(){
  const chapSel = $('#chapterSelect');
  chapSel.innerHTML = SCRIPT.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
  chapSel.value = state.chapter;
  chapSel.onchange = ()=>{
    state.chapter = chapSel.value;
    state.group   = (SCRIPT.find(x=>x.id===state.chapter).groups[0].id);
    save(); fillSelectors(); renderContent(); renderTabs();
    window.scrollTo({top:0, behavior:'smooth'});
  };

  const grpSel = $('#groupSelect');
  const chap = currentChapter();
  grpSel.innerHTML = chap.groups.map(g => `<option value="${g.id}">${g.title}</option>`).join('');
  grpSel.value = state.group;
  grpSel.onchange = ()=>{
    state.group = grpSel.value; save(); renderContent();
    window.scrollTo({top:0, behavior:'smooth'});
  };
}

/* ----- Conținut ----- */
function renderContent(){
  const cont = $('#content');
  const grp  = currentGroup();
  cont.innerHTML = grp.blocks.map(b => `
    <article class="block">
      <div class="meta">
        <div class="meta-left">${grp.title}</div>
        ${b.arg ? '<span class="arg-badge">ARGUMENT</span>' : ''}
      </div>
      <div class="text">${escapeHtml(b.text)}</div>
    </article>
  `).join('');
}

/* ----- Navigare Next/Prev ----- */
function next(){
  const chap = currentChapter();
  const gi   = chap.groups.findIndex(g=>g.id===state.group);
  if (gi < chap.groups.length - 1){
    state.group = chap.groups[gi+1].id;
  } else {
    const ci = SCRIPT.findIndex(c=>c.id===state.chapter);
    const nextChap = SCRIPT[ci+1] || SCRIPT[0];
    state.chapter = nextChap.id; state.group = nextChap.groups[0].id;
  }
  save(); fillSelectors(); renderContent(); renderTabs();
  window.scrollTo({top:0, behavior:'smooth'});
}
function prev(){
  const chap = currentChapter();
  const gi   = chap.groups.findIndex(g=>g.id===state.group);
  if (gi > 0){
    state.group = chap.groups[gi-1].id;
  } else {
    const ci = SCRIPT.findIndex(c=>c.id===state.chapter);
    const prevChap = SCRIPT[ci-1] || SCRIPT[SCRIPT.length-1];
    state.chapter = prevChap.id;
    state.group   = prevChap.groups[prevChap.groups.length-1].id;
  }
  save(); fillSelectors(); renderContent(); renderTabs();
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ----- Drawer mobil (meniul cu capitole & subcapitole) ----- */
const drawer             = $('#drawer');
const drawerBody         = $('#drawerBody');
const openMenuBtn        = $('#openMenu');
const closeMenuBtn       = $('#closeMenu');
const drawerCloseBottom  = $('#drawerCloseBottom');

function openDrawer(){
  drawer.classList.remove('hidden');
  drawer.setAttribute('aria-hidden','false');
}
function closeDrawer(){
  drawer.classList.add('hidden');
  drawer.setAttribute('aria-hidden','true');
}
function renderDrawer(){
  drawerBody.innerHTML = SCRIPT.map(chap=>{
    const groups = chap.groups.map(g=>{
      const active = (state.chapter===chap.id && state.group===g.id) ? 'active' : '';
      return `<button class="d-group ${active}" data-ch="${chap.id}" data-gr="${g.id}">${g.title}</button>`;
    }).join('');
    return `<div class="d-chap">${chap.title}</div>${groups}`;
  }).join('');

  drawerBody.querySelectorAll('.d-group').forEach(btn=>{
    btn.onclick = ()=>{
      state.chapter = btn.dataset.ch;
      state.group   = btn.dataset.gr;
      save();
      fillSelectors(); renderContent(); renderTabs(); renderDrawer(); closeDrawer();
      window.scrollTo({top:0, behavior:'smooth'});
    };
  });
}
openMenuBtn?.addEventListener('click', ()=>{ renderDrawer(); openDrawer(); });
closeMenuBtn?.addEventListener('click', closeDrawer);
drawerCloseBottom?.addEventListener('click', closeDrawer);
drawer?.querySelector('.drawer-backdrop')?.addEventListener('click', closeDrawer);

/* ----- Util ----- */
function escapeHtml(s){
  return s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
}

/* ----- Init ----- */
load();
renderTabs();
fillSelectors();
renderContent();

$('#nextBtn').onclick = next;
$('#prevBtn').onclick = prev;
