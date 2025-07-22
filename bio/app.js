// Aplicația principală pentru site-ul de biologie

const lessonsData = [
  {
    id: 1,
    title: "Lesson 1",
    category: "Category 1",
    duration: "30 min",
    difficulty: "Beginner",
    content: "Content of Lesson 1",
  },
  {
    id: 2,
    title: "Lesson 2",
    category: "Category 2",
    duration: "45 min",
    difficulty: "Intermediate",
    content: "Content of Lesson 2",
  },
  // Add more lessons as needed
]

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: 0,
    explanation: "Paris is the capital of France.",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 2,
    explanation: "Jupiter is the largest planet in our solar system.",
  },
  // Add more quiz questions as needed
]

class BiologyApp {
  constructor() {
    this.currentPage = "dashboard"
    this.currentLesson = null
    this.currentQuiz = null
    this.quizState = {
      questions: [],
      currentIndex: 0,
      answers: [],
      startTime: null,
      score: 0,
    }

    this.init()
  }

  init() {
    this.loadProgress()
    this.updateDashboard()
    this.loadLessons()
    this.showPage("dashboard")
  }

  // Gestionarea paginilor
  showPage(pageId) {
    // Ascunde toate paginile
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active")
    })

    // Afișează pagina selectată
    document.getElementById(pageId).classList.add("active")
    this.currentPage = pageId

    // Actualizează navigația
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("bg-gray-700")
    })
  }

  // Gestionarea progresului
  loadProgress() {
    const saved = localStorage.getItem("biologyProgress")
    this.progress = saved
      ? JSON.parse(saved)
      : {
          completedLessons: [],
          quizScores: [],
          totalLessons: lessonsData.length,
        }
  }

  saveProgress() {
    localStorage.setItem("biologyProgress", JSON.stringify(this.progress))
  }

  markLessonComplete(lessonId) {
    if (!this.progress.completedLessons.includes(lessonId)) {
      this.progress.completedLessons.push(lessonId)
      this.saveProgress()
      this.updateDashboard()
    }
  }

  // Dashboard
  updateDashboard() {
    const completedCount = this.progress.completedLessons.length
    const totalCount = this.progress.totalLessons
    const percentage = Math.round((completedCount / totalCount) * 100)

    document.getElementById("lesson-progress-text").textContent = `${completedCount}/${totalCount}`
    document.getElementById("lesson-progress-bar").style.width = `${percentage}%`

    // Quiz average
    const quizAverage =
      this.progress.quizScores.length > 0
        ? Math.round(this.progress.quizScores.reduce((a, b) => a + b, 0) / this.progress.quizScores.length)
        : 0

    document.getElementById("quiz-average").textContent = `${quizAverage}%`
    document.getElementById("quiz-progress-bar").style.width = `${quizAverage}%`
  }

  // Lecții
  loadLessons() {
    const container = document.getElementById("lessons-list")
    container.innerHTML = ""

    lessonsData.forEach((lesson) => {
      const isCompleted = this.progress.completedLessons.includes(lesson.id)
      const statusClass = isCompleted ? "completed" : "not-started"
      const statusIcon = isCompleted ? "fa-check-circle text-green-400" : "fa-circle text-gray-400"

      const lessonCard = document.createElement("div")
      lessonCard.className = `lesson-card ${statusClass} fade-in`
      lessonCard.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <i class="fas ${statusIcon} mr-3"></i>
                            <h3 class="text-lg font-semibold">${lesson.title}</h3>
                        </div>
                        <div class="flex items-center text-sm text-gray-400 space-x-4">
                            <span><i class="fas fa-tag mr-1"></i>${lesson.category}</span>
                            <span><i class="fas fa-clock mr-1"></i>${lesson.duration}</span>
                            <span><i class="fas fa-signal mr-1"></i>${lesson.difficulty}</span>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
            `

      lessonCard.addEventListener("click", () => this.showLesson(lesson.id))
      container.appendChild(lessonCard)
    })
  }

  showLesson(lessonId) {
    const lesson = lessonsData.find((l) => l.id === lessonId)
    if (!lesson) return

    this.currentLesson = lesson
    const container = document.getElementById("lesson-content")

    container.innerHTML = `
            <div class="fade-in">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold">${lesson.title}</h2>
                    <button onclick="app.markLessonComplete(${lesson.id})" 
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <i class="fas fa-check mr-2"></i>
                        Marchează ca citit
                    </button>
                </div>
                ${lesson.content}
            </div>
        `

    this.showPage("lesson-detail")
  }

  // Quiz
  startQuiz() {
    // Randomizează întrebările
    this.quizState.questions = this.shuffleArray([...quizQuestions]).slice(0, Math.min(30, quizQuestions.length))
    this.quizState.currentIndex = 0
    this.quizState.answers = new Array(this.quizState.questions.length).fill(null)
    this.quizState.startTime = new Date()
    this.quizState.score = 0

    document.getElementById("quiz-start").classList.add("hidden")
    document.getElementById("quiz-content").classList.remove("hidden")

    this.showPage("quiz")
    this.displayQuestion()
    this.startQuizTimer()
  }

  displayQuestion() {
    const question = this.quizState.questions[this.quizState.currentIndex]
    const container = document.getElementById("question-container")

    container.innerHTML = `
            <h3 class="text-xl font-semibold mb-6">${question.question}</h3>
            <div class="space-y-3">
                ${question.options
                  .map(
                    (option, index) => `
                    <div class="quiz-option ${this.quizState.answers[this.quizState.currentIndex] === index ? "selected" : ""}" 
                         onclick="app.selectAnswer(${index})">
                        <span class="font-medium">${String.fromCharCode(65 + index)}.</span> ${option}
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `

    // Actualizează progresul
    document.getElementById("current-question").textContent = this.quizState.currentIndex + 1
    const progress = ((this.quizState.currentIndex + 1) / this.quizState.questions.length) * 100
    document.getElementById("quiz-progress").style.width = `${progress}%`

    // Actualizează butoanele
    document.getElementById("prev-btn").disabled = this.quizState.currentIndex === 0
    document.getElementById("next-btn").textContent =
      this.quizState.currentIndex === this.quizState.questions.length - 1 ? "Finalizează" : "Următorul"
  }

  selectAnswer(answerIndex) {
    this.quizState.answers[this.quizState.currentIndex] = answerIndex

    // Actualizează vizual
    document.querySelectorAll(".quiz-option").forEach((option, index) => {
      option.classList.remove("selected")
      if (index === answerIndex) {
        option.classList.add("selected")
      }
    })
  }

  nextQuestion() {
    if (this.quizState.currentIndex < this.quizState.questions.length - 1) {
      this.quizState.currentIndex++
      this.displayQuestion()
    } else {
      this.finishQuiz()
    }
  }

  previousQuestion() {
    if (this.quizState.currentIndex > 0) {
      this.quizState.currentIndex--
      this.displayQuestion()
    }
  }

  finishQuiz() {
    // Calculează scorul
    let correctAnswers = 0
    this.quizState.questions.forEach((question, index) => {
      if (this.quizState.answers[index] === question.correct) {
        correctAnswers++
      }
    })

    this.quizState.score = Math.round((correctAnswers / this.quizState.questions.length) * 100)

    // Salvează scorul
    this.progress.quizScores.push(this.quizState.score)
    this.saveProgress()

    // Afișează rezultatele
    this.showQuizResults(correctAnswers)
  }

  showQuizResults(correctAnswers) {
    const container = document.getElementById("quiz-results")
    const totalQuestions = this.quizState.questions.length

    let resultsHTML = `
            <div class="text-center mb-8 fade-in">
                <h2 class="text-3xl font-bold mb-4">Rezultate Quiz</h2>
                <div class="text-6xl font-bold mb-4 ${this.quizState.score >= 80 ? "text-green-400" : this.quizState.score >= 60 ? "text-yellow-400" : "text-red-400"}">
                    ${this.quizState.score}%
                </div>
                <p class="text-xl mb-2">${correctAnswers} din ${totalQuestions} răspunsuri corecte</p>
                <p class="text-gray-400">
                    ${
                      this.quizState.score >= 80
                        ? "Excelent! 🎉"
                        : this.quizState.score >= 60
                          ? "Bine! 👍"
                          : "Mai studiază! 📚"
                    }
                </p>
            </div>

            <div class="space-y-4 mb-8">
                <h3 class="text-xl font-semibold">Revizuire răspunsuri:</h3>
        `

    this.quizState.questions.forEach((question, index) => {
      const userAnswer = this.quizState.answers[index]
      const isCorrect = userAnswer === question.correct

      resultsHTML += `
                <div class="bg-gray-800 rounded-lg p-4">
                    <p class="font-semibold mb-2">${index + 1}. ${question.question}</p>
                    <div class="space-y-2">
                        ${question.options
                          .map((option, optIndex) => {
                            let classes = "p-2 rounded"
                            if (optIndex === question.correct) {
                              classes += " bg-green-900 border border-green-500"
                            } else if (optIndex === userAnswer && !isCorrect) {
                              classes += " bg-red-900 border border-red-500"
                            } else {
                              classes += " bg-gray-700"
                            }

                            return `<div class="${classes}">
                                ${String.fromCharCode(65 + optIndex)}. ${option}
                                ${optIndex === question.correct ? " ✓" : ""}
                                ${optIndex === userAnswer && !isCorrect ? " ✗" : ""}
                            </div>`
                          })
                          .join("")}
                    </div>
                    <p class="text-sm text-gray-400 mt-2"><strong>Explicație:</strong> ${question.explanation}</p>
                </div>
            `
    })

    resultsHTML += `
            </div>
            <div class="text-center">
                <button onclick="app.resetQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4">
                    <i class="fas fa-redo mr-2"></i>Quiz nou
                </button>
                <button onclick="app.showPage('dashboard')" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg">
                    <i class="fas fa-home mr-2"></i>Dashboard
                </button>
            </div>
        `

    container.innerHTML = resultsHTML
    document.getElementById("quiz-content").classList.add("hidden")
    container.classList.remove("hidden")

    this.updateDashboard()
  }

  resetQuiz() {
    document.getElementById("quiz-results").classList.add("hidden")
    document.getElementById("quiz-start").classList.remove("hidden")
    this.quizState = {
      questions: [],
      currentIndex: 0,
      answers: [],
      startTime: null,
      score: 0,
    }
  }

  startQuizTimer() {
    const timerElement = document.getElementById("quiz-timer")
    const startTime = this.quizState.startTime

    const updateTimer = () => {
      const now = new Date()
      const elapsed = Math.floor((now - startTime) / 1000)
      const minutes = Math.floor(elapsed / 60)
      const seconds = elapsed % 60
      timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    updateTimer()
    this.timerInterval = setInterval(updateTimer, 1000)
  }

  // Utilități
  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  showStats() {
    alert("Funcționalitatea de statistici va fi implementată în curând!")
  }
}

// Inițializează aplicația
const app = new BiologyApp()

// Funcții globale pentru butoane
function showPage(pageId) {
  app.showPage(pageId)
}

function startQuiz() {
  app.startQuiz()
}

function nextQuestion() {
  app.nextQuestion()
}

function previousQuestion() {
  app.previousQuestion()
}

function showStats() {
  app.showStats()
}
