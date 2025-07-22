// Date pentru lecții și quiz-uri - Biologie Animală Bacalaureat

const lessonsData = [
  {
    id: 1,
    title: "Clasificarea vertebratelor",
    category: "Sistematica",
    duration: "15 min",
    difficulty: "Ușor",
    content: `
            <div class="lesson-content">
                <h3><i class="fas fa-fish text-blue-400 mr-2"></i>Clasificarea vertebratelor</h3>
                
                <div class="definition">
                    <strong>Vertebratele</strong> sunt animale care posedă o <span class="important">coloană vertebrală</span> formată din vertebre, care protejează măduva spinării.
                </div>

                <h4>Caracteristici generale ale vertebratelor:</h4>
                <ul>
                    <li><span class="important">Scheletul intern</span> (endoschelet) format din os sau cartilaj</li>
                    <li><span class="important">Coloana vertebrală</span> care înlocuiește coarda dorsală</li>
                    <li><span class="important">Craniu</span> care protejează creierul</li>
                    <li><span class="important">Sistem nervos central</span> bine dezvoltat</li>
                    <li><span class="important">Sistem circulator închis</span> cu inimă</li>
                </ul>

                <h4>Clasificarea principală:</h4>

                <h4><i class="fas fa-fish mr-2"></i>1. Peștii (Pisces)</h4>
                <ul>
                    <li><strong>Peștii cartilaginoși (Chondrichthyes):</strong> rechini, pisici de mare</li>
                    <li><strong>Peștii osoși (Osteichthyes):</strong> crap, păstrăv, cod</li>
                </ul>
                <p><span class="important">Caracteristici:</span> respirație branhială, înot cu înotătoare, corp fusiform, solzi</p>

                <h4><i class="fas fa-frog mr-2"></i>2. Amfibienii (Amphibia)</h4>
                <ul>
                    <li><strong>Exemple:</strong> broasca, buhai, salamandra, tritoni</li>
                </ul>
                <p><span class="important">Caracteristici:</span> metamorfoză, respirație branhială (larve) și pulmonară (adulți), piele umedă</p>

                <h4><i class="fas fa-dragon mr-2"></i>3. Reptilele (Reptilia)</h4>
                <ul>
                    <li><strong>Exemple:</strong> șopârla, șarpele, țestoasa, crocodilul</li>
                </ul>
                <p><span class="important">Caracteristici:</span> piele cu solzi cornoși, ouă cu coajă, respirație pulmonară</p>

                <h4><i class="fas fa-dove mr-2"></i>4. Păsările (Aves)</h4>
                <ul>
                    <li><strong>Exemple:</strong> vrabia, vulturul, pinguin, struț</li>
                </ul>
                <p><span class="important">Caracteristici:</span> pene, zbor (la majoritatea), homeotermie, ouă cu coajă calcară</p>

                <h4><i class="fas fa-paw mr-2"></i>5. Mamiferele (Mammalia)</h4>
                <ul>
                    <li><strong>Exemple:</strong> câine, pisică, om, balenă, liliac</li>
                </ul>
                <p><span class="important">Caracteristici:</span> păr, glande mamare, homeotermie, naștere de pui vii (la majoritatea)</p>

                <div class="definition">
                    <strong>Homeotermia</strong> = capacitatea de a-și menține temperatura corpului constantă, independent de temperatura mediului.
                </div>

                <h4>Evoluția vertebratelor:</h4>
                <p>Ordinea evolutivă: <span class="important">Pești → Amfibieni → Reptile → Păsări și Mamifere</span></p>
                
                <p>Această succesiune reflectă adaptarea treptată la viața terestră, de la mediul acvatic la cel terestru și aerian.</p>
            </div>
        `,
  },
  {
    id: 2,
    title: "Sistemul digestiv la vertebrate",
    category: "Anatomie",
    duration: "20 min",
    difficulty: "Mediu",
    content: `
            <div class="lesson-content">
                <h3><i class="fas fa-utensils text-green-400 mr-2"></i>Sistemul digestiv la vertebrate</h3>
                
                <div class="definition">
                    <strong>Sistemul digestiv</strong> este ansamblul de organe care asigură <span class="important">prelucrarea alimentelor</span> și <span class="important">absorbția nutrienților</span>.
                </div>

                <h4>Componentele sistemului digestiv:</h4>
                <ul>
                    <li><span class="important">Tubul digestiv:</span> cavitatea bucală, esofag, stomac, intestin</li>
                    <li><span class="important">Glandele anexe:</span> glandele salivare, ficatul, pancreasul</li>
                </ul>

                <h4>Particularități la diferite grupe:</h4>

                <h4><i class="fas fa-fish mr-2"></i>La pești:</h4>
                <ul>
                    <li>Dinți specializați pentru tipul de hrană</li>
                    <li>Stomac simplu sau absent (la unele specii)</li>
                    <li>Intestin relativ scurt la carnivorele, lung la ierbivorele</li>
                </ul>

                <h4><i class="fas fa-dove mr-2"></i>La păsări:</h4>
                <ul>
                    <li><span class="important">Cioc</span> în loc de dinți</li>
                    <li><span class="important">Gușa</span> - pentru depozitarea temporară a hranei</li>
                    <li><span class="important">Stomac dublu:</span> proventricul (chimic) și pipota (mecanic)</li>
                    <li>Intestin lung, cu <span class="important">cecuri</span> la ierbivorele</li>
                </ul>

                <h4><i class="fas fa-paw mr-2"></i>La mamifere:</h4>
                <ul>
                    <li><span class="important">Dinți diferențiați:</span> incisivi, canini, premolari, molari</li>
                    <li><span class="important">La rumegătoare:</span> stomac cu 4 compartimente (pânzen, căciulă, foios, cheag)</li>
                    <li>Intestin foarte lung la ierbivorele</li>
                </ul>

                <div class="definition">
                    <strong>Rumegarea</strong> = procesul prin care alimentele sunt regurgitate și mestecate din nou pentru o digestie mai eficientă a celulozei.
                </div>
            </div>
        `,
  },
  // Aici poți adăuga mai multe lecții...
]

const quizQuestions = [
  {
    id: 1,
    question: "Care dintre următoarele caracteristici este specifică vertebratelor?",
    options: [
      "Prezența exoscheletului",
      "Prezența coloanei vertebrale",
      "Respirația prin trahee",
      "Sistemul nervos difuz",
    ],
    correct: 1,
    explanation:
      "Vertebratele se caracterizează prin prezența coloanei vertebrale care înlocuiește coarda dorsală și protejează măduva spinării.",
  },
  {
    id: 2,
    question: "Homeotermia este caracteristică pentru:",
    options: ["Pești și amfibieni", "Reptile și amfibieni", "Păsări și mamifere", "Toate vertebratele"],
    correct: 2,
    explanation:
      "Homeotermia (capacitatea de a-și menține temperatura corpului constantă) este specifică păsărilor și mamiferelor.",
  },
  {
    id: 3,
    question: "Metamorfoza completă se întâlnește la:",
    options: ["Pești", "Amfibieni", "Reptile", "Păsări"],
    correct: 1,
    explanation:
      "Amfibienii trec prin metamorfoză, transformându-se din larve cu respirație branhială în adulți cu respirație pulmonară.",
  },
  {
    id: 4,
    question: "Pipota la păsări este:",
    options: ["Un organ de zbor", "Partea mecanică a stomacului", "O glandă digestivă", "Un organ de respirație"],
    correct: 1,
    explanation:
      "Pipota este partea mecanică a stomacului păsărilor, care mărunțește alimentele cu ajutorul pietrelor înghițite.",
  },
  {
    id: 5,
    question: "Rumegarea este specifică:",
    options: ["Tuturor mamiferelor", "Doar carnivorelor", "Unor mamifere ierbivorele", "Păsărilor ierbivorele"],
    correct: 2,
    explanation:
      "Rumegarea este specifică unor mamifere ierbivorele (bovine, ovine, caprine) care au stomac cu 4 compartimente.",
  },
  // Aici poți adăuga mai multe întrebări pentru a ajunge la 30+
]
