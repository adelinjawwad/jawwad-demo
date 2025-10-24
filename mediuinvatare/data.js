/* ====== MODULES: Script exact pe etape (din mesajul tău) ====== */
const MODULES = [
  {
    id: "intro",
    title: "1) Introducere & scopul vizitei",
    parts: [
`Am venit astăzi la dumneavoastră să vi-l prezint pe Kirby și să facem o mică curățenie. Dvs. nu aveți nicio obligație, nu vă costă nimic, iar la final, dacă considerați că este util și necesar, acesta poate fi și achiziționat.`,
`Kirby este un produs american, pe piață de peste 100 de ani. Este pentru persoanele care apreciază calitatea, fiabilitatea și performanța.`,
`Are cel mai mare grad de filtrare — Magic Micron HEPA Filtration. Orice intră în sacul Kirby acolo rămâne; sacul are 7 straturi și 4 cusături.`,
`Kirby este un produs exclusivist, vândut doar prin prezentări ca cea de azi. Orice altă reclamă este interzisă.`,
`Am venit cu două motive: (1) să îl fac pe Kirby cât mai cunoscut în casele românilor; (2) eu și colegii din toată România suntem înscriși într-un concurs cu plecare în Grand Canaria (ajung doar campionii diviziei). Mă ajutați la final cu contacte (rude, prieteni, familii) serioase, pentru o prezentare gratuită?`,
`Înainte de a începe prezentarea, îl sun pe domnul manager să anunț că am ajuns și că începem.`,
`O rugăminte la final: să-mi spuneți concret dacă ați vrea să îl achiziționați pe Kirby — Da sau Nu.`
    ]
  },
  {
    id: "base",
    title: "2) Aparatul de bază & tehnic",
    parts: [
`Duraluminiu: material foarte rezistent, folosit și în industria aeronautică — de aici și forma modernă.`,
`Două turbine: una frontală pentru aspirare directă și eficientă; una laterală pentru răcirea motorului — poate fi folosit 24/7, nu se supraîncălzește. Durată de viață 25–30 ani; garanție 13 ani (de la distribuitor autorizat).`,
`Două micro-întrerupătoare pentru siguranță (copii). Dacă ceva nu e montat bine, Kirby nu pornește — nu se arde.`,
`Roți învelite în cauciuc siliconat pentru protecția suprafețelor. LED frontal pentru iluminarea spațiilor întunecate.`,
`Cutie de viteze cu 2 trepte: Normal și Drive. Funcția Drive preia 80% din efort — practic merge singur.`,
`Cablu lung de 10 metri pentru aspirare eficientă dintr-o singură priză. Consum 450–520 W.`,
`În prezentarea de astăzi folosim vizualizatorul (doar pentru demo). Clientul primește direct sacul Kirby cu filtrarea superioară.`
    ]
  },
  {
    id: "access",
    title: "3) Accesorii & Perii",
    parts: [
`Furtun clasic (≈210 cm), foarte rezistent, revine la forma inițială.`,
`Cu cele două țevi ușoare (interior lucios, nu rețin praf) + cotul mobil (invenție patentată Kirby) avem: poziția clasică, poziția pentru suprafețe înalte și unghiul de 45° pentru profunzime sub pat/mobilier.`,
`Peria pentru suprafețe dure (gresie, parchet): aspiră pe toată suprafața, roți cauciucate, 2 orificii de aspirare care nu fac vid; peria interioară scoate praful din rosturi. ARGUMENT: Mopul clasic „unge” murdăria — ca și cum ne-am da cu cremă pe mâini înainte să ne spălăm.`,
`Peria pentru suprafețe înalte (perdele, draperii, tavan, pereți, deasupra AC): de obicei se spală rar; sunt filtrul casei și se deteriorează la mașina de spălat. Cu peria Kirby le aspirăm/spălăm direct pe verticală, fără deteriorare.`,
`Peria ZIP: bate + aspiră de ~3600 ori/min; aspiră în profunzime până la 15 cm. ARGUMENT: în textile se află ~80% din praf; când ne așezăm pe canapea îl ridicăm și îl inhalăm → alergii, boli în timp. Apa amestecată cu praf = nămol — de aceea aspirarea corectă e esențială. Util: scaune, canapele, paltoane, jucării pluș, perne, prosoape.`,
`Peria colțuri/înguste: colțuri, plinte, șifoniere culisabile, calorifere.`,
`Țesala pentru animale (face și masaj capilar).`,
`Compresor: umflat/dezumflat articole gonflabile; suflat praf din zone greu accesibile.`,
`Pistol pulverizant: poți pune balsam/șampon/parfum – reîmprospătează mirosul draperiilor sau ajută la pete.`,
`Peria cârpă: păr de cămilă, fină, nu reține praf, nu zgârie. Nu mai cheltuim pe lavete/soluții; o lavetă obișnuită are ~20% eficiență, restul se depune sau e inhalat — important să fie aspirat/depozitat corect.`,
`Turbo adaptorul: poți șlefui, degresa și face masaj. ~3600 „degresări”/min. Eficient ca o periuță electrică vs una clasică.`
    ]
  },
  {
    id: "mattress",
    title: "4) Salteaua — Testele (cârpele 1–4)",
    parts: [
`„Dacă aș avea 5 minute să vă arăt ce face Kirby cel mai important, ar fi salteaua.” Principalul motiv pentru care clienții cumpără.`,
`Peria bătător (regina): aspiră, bate și perie pe toată suprafața (≈38 cm) și până la 40 cm adâncime; se montează la 1 mm de motor (aspirare profundă).`,
`Cârpa 1: praf, scame, acarieni. Acarienii trăiesc 2–4 luni; reziduurile lor afectează sistemul respirator (astm, eczeme, inflamații). Un adult pierde ~1.5 g de piele/zi — suficient pentru 1 milion de acarieni. Mediul lor: căldură, întuneric, umiditate. De-asta oamenii se decid să cumpere Kirby.`,
`Întrebări de decizie: „V-ați hotărât să luați un Kirby? Batem palma?” „Presupun că nu mai e nevoie să vă întreb dacă e necesar în casă.”`,
`Cârpa 2: la început insistăm 15–20 min; întreținerea apoi 5 min la 2 luni — saltea curată.`,
`Metode de „scăpare”: (a) schimbi salteaua la 2 luni (recomandarea absurdă a alergologului) sau (b) ai Kirby acasă pentru întreținere.`,
`Saltelele sunt cele mai murdare locuri din casă (mai murdare decât podelele). Un sfert din viață pe saltea — unde trebuie să fie mai curat: sub picioare sau unde pui capul?`,
`Cârpa 3: întrebare de cuplu — dacă doar unul ar cumpăra azi, pe celălalt l-ar deranja?`,
`Cârpa 4: acum că știți ce e în saltea, devine prioritate? Când e cel mai bun moment să schimbăm ce găsim pe cârpe?`,
`Revenim în sufragerie, punem cârpele lângă filtre și facem prima încercare de vânzare. Condiții: integral + 5% discount sau 1500 avans + 12 rate.`
    ]
  },
  {
    id: "rug",
    title: "5) Covorul — Test comparativ",
    parts: [
`Mâner vertical = protecția coloanei. Nu te mai apleci; mâner la înălțimea ta.`,
`Când s-a aspirat ultima dată covorul? De ce am găsit praf: (1) a trecut mult timp sau (2) aspiratorul nu mai face față.`,
`Cine se ocupă de curățenie în casă?`,
`Delimităm 1 m² de covor. Clientul aspiră „până e curat”. Întrebăm: „De obicei dați așa mult pe o suprafață așa mică?”`,
`Apoi punem filtru curat și aspirăm cu Kirby aceeași zonă. Dacă nu mai găsim praf → aspiratorul lor face, dar trebuie mult timp. Dacă găsim → știm problema: aparatul lor nu mai face față și trebuie schimbat.`,
`La final, clientul compară filtrul: diferența între suprafața aspirată și cea neaspirată.`
    ]
  },
  {
    id: "close",
    title: "6) Negociere & Închidere",
    parts: [
`Argumentăm și recapitulăm: „Am depus efort, curent, timp, sănătate, iar rezultatul este pe filtru.”`,
`„V-ați hotărât să-l punem pe Kirby la treabă?” „Merităm rezultate mai bune?”`,
`Testul pe loc: îi dăm clientului să folosească — e ușor.`,
`„Cum vreți să-l achiziționați? Integral sau în rate?”`,
`„Găsim o soluție ca eu să plec cu praful și acarienii și cu puncte la concurs, iar dvs. să rămâneți cu Kirby și cu problema rezolvată?”`
    ]
  },
  {
    id: "follow",
    title: "7) Închidere & Follow-up",
    parts: [
`O rugăminte la final: răspuns concret — Da / Nu (claritate).`,
`Recomandări: rude/prieteni/familii serioase pentru prezentare gratuită.`,
`Mulțumiri + apel manager (validare).`
    ]
  }
];

/* ====== CARDS: întrebări-răspuns (generate din argumentele tale) ====== */
const CARDS = [
{q:`Ce fel de produs este Kirby și cum se vinde?`, a:`Produs american, exclusivist; vândut doar prin prezentări, fără reclamă.`},
{q:`Ce sistem de filtrare are Kirby și ce înseamnă?`, a:`Magic Micron HEPA — reține până la ultimul micron; sac cu 7 straturi și 4 cusături.`},
{q:`Care sunt cele 3 valori cheie?`, a:`Calitate • Fiabilitate • Performanță.`},
{q:`De ce cereți contacte la final?`, a:`Pentru a face Kirby cunoscut și pentru concursul cu plecare în Grand Canaria.`},
{q:`De ce are două turbine?`, a:`Una pentru aspirare eficientă, una pentru răcirea motorului → folosință 24/7, durată 25–30 ani.`},
{q:`Cum te protejează micro-întrerupătoarele?`, a:`Dacă ceva nu e montat corect, aparatul nu pornește — siguranță, nu se arde.`},
{q:`Ce face funcția Drive?`, a:`Preia ~80% din efort; aparatul „merge singur”.`},
{q:`Care e argumentul împotriva mopului clasic?`, a:`Mopul „unge” murdăria; ca și cum te-ai da cu cremă înainte să te speli pe mâini.`},
{q:`Ce poate peria pentru suprafețe dure?`, a:`Aspiră pe toată suprafața, nu face vid; scoate praful din rosturi.`},
{q:`Ce face peria ZIP și de ce e importantă?`, a:`Bate+aspiră ~3600/min, până la 15 cm; textilele țin ~80% din praf.`},
{q:`De ce e importantă salteaua?`, a:`Dormim 1/4 din viață pe ea; acolo trebuie să fie cel mai curat.`},
{q:`Ce arăți cu „cârpa 1”?`, a:`Praful fin + acarienii și reziduurile lor (alergii/astm).`},
{q:`Care e întreținerea după prima curățare?`, a:`~5 minute la 2 luni mențin salteaua curată.`},
{q:`Ce opțiuni de plată oferi?`, a:`Integral + 5% discount sau 1500 avans + 12 rate.`},
{q:`Cum demonstrezi pe covor?`, a:`Clientul aspiră 1 m², apoi Kirby pe același loc → comparăm filtrul.`},
{q:`Ce spui în recapitulare la închidere?`, a:`Rezultatul e pe filtru; punem Kirby la treabă? Integral sau rate?`},
{q:`De ce pistolul pulverizant?`, a:`Împrospătează mirosul, ajută la pete (balsam/șampon/parfum).`},
{q:`Ce aduce peria cârpă (păr de cămilă)?`, a:`Fină, nu zgârie și nu reține praf; nu mai irosești bani pe lavete slabe.`},
{q:`De ce e util compresorul?`, a:`Umflat/dezumflat, suflat praf din zone greu accesibile.`},
{q:`Ce întrebare de decizie pui după saltea?`, a:`„Când e cel mai bun moment să schimbăm ce găsim pe cârpe?”`},
];

/* ====== NEGOTIATION: obiecții + răspuns corect ====== */
const NEG = [
  {cat:"General", client:"E scump.", good:"Înțeleg perfect. De asta există varianta în rate și garanția lungă. Pe lună iese cât un mic abonament, iar dormiți în aer curat.", bad:[
    "Prețul este fix, nu pot face nimic.",
    "Dacă nu aveți bani, nu are rost." ]},
  {cat:"General", client:"Am deja aspirator bun.", good:"Super! Facem test pe 1 m². Dacă scoate la fel ca Kirby, închid. Dacă Kirby scoate mai mult, măcar știți ce se întâmplă în toată casa.", bad:[
    "Atunci nu vă trebuie Kirby.",
    "Aspiratorul dvs nu e bun, trebuie aruncat." ]},
  {cat:"Saltea", client:"Nu am alergii.", good:"Excelent — tocmai de aceea e mai ușor să prevenim. Ce iese pe cârpe arată ce respirați noaptea; 5 minute la 2 luni și rămâne curat.", bad:[
    "Toată lumea are alergii.",
    "Atunci nu vă pasă de saltea." ]},
  {cat:"Timp", client:"Nu am timp de curățenie.", good:"Fix pentru asta: schimbi peria în câteva secunde, iar Kirby scoate mizeria din profunzime rapid, nu o mută din loc.", bad:[
    "Trebuie să vă faceți timp.",
    "Dacă nu aveți timp, nu e pentru dvs." ]},
  {cat:"Decizie", client:"Trebuie să mă gândesc.", good:"Corect. La ce anume vreți să vă gândiți: preț, rate, prioritate? Dacă diferența pe lună e mică, merită sănătatea și somnul curat?", bad:[
    "Hotărâți-vă acum sau pierdem oferta.",
    "Nu avem timp de gândire." ]},
];

/* ====== Helper: mapping card -> module for filtre ====== */
function guessModule(card){
  const t=(card.q+" "+card.a).toLowerCase();
  if(t.includes("saltea")||t.includes("cârp"))return"mattress";
  if(t.includes("covor"))return"rug";
  if(t.includes("perie")||t.includes("zip")||t.includes("compresor"))return"access";
  if(t.includes("rate")||t.includes("închidere")||t.includes("filtru"))return"close";
  return "intro";
}
