// State variables
let currentState = "intro"
let currentPhotoIndex = 0
let musicPlaying = false
let videoPlaying = false
const typewriterIndex = 0
let countdownValue = 5

// Data
const introMessage = "Happy Birthday\nMy Love"
const photos = [
  {
    src: "https://via.placeholder.com/280x350/fce7f3/ec4899?text=Memory+1",
    message: "You're the most beautiful part of my life...",
  },
  {
    src: "https://via.placeholder.com/280x350/fce7f3/ec4899?text=Memory+2",
    message: "Every moment with you feels like magic...",
  },
  {
    src: "https://via.placeholder.com/280x350/fce7f3/ec4899?text=Memory+3",
    message: "25 years of you. I'm so grateful to be part of your story...",
  },
  {
    src: "https://via.placeholder.com/280x350/fce7f3/ec4899?text=Memory+4",
    message: "Here's to many more adventures together...",
  },
]

const storyText =
  "My dearest Alexandra, today marks 25 beautiful years of your existence in this world, and I couldn't be more grateful that our paths crossed. You bring light to every room you enter, warmth to every heart you touch, and magic to every moment we share. Your smile has the power to turn ordinary days into extraordinary memories, and your love has transformed my world in the most wonderful ways. As you celebrate this special milestone, know that you are cherished beyond words, loved beyond measure, and appreciated for the incredible woman you are. Happy 25th Birthday, my love. Here's to celebrating you today and always. ❤️"

// DOM elements
const fadeOverlay = document.getElementById("fadeOverlay")
const introSection = document.getElementById("introSection")
const envelopeSection = document.getElementById("envelopeSection")
const photosSection = document.getElementById("photosSection")
const storySection = document.getElementById("storySection")
const videoSection = document.getElementById("videoSection")

// Initialize the experience
document.addEventListener("DOMContentLoaded", () => {
  createBackgroundElements()
  createSparkles()
  startIntroAnimation()
  setupEventListeners()
})

// Create floating background elements
function createBackgroundElements() {
  const heartsContainer = document.querySelector(".floating-hearts")
  const petalsContainer = document.querySelector(".floating-petals")

  // Create floating hearts
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div")
    heart.className = "floating-heart"
    heart.textContent = "❤️"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = Math.random() * 100 + "%"
    heart.style.animationDelay = Math.random() * 8 + "s"
    heart.style.animationDuration = 8 + Math.random() * 4 + "s"
    heart.style.fontSize = 8 + Math.random() * 12 + "px"
    heartsContainer.appendChild(heart)
  }

  // Create floating petals
  for (let i = 0; i < 15; i++) {
    const petal = document.createElement("div")
    petal.className = "floating-petal"
    petal.style.left = Math.random() * 100 + "%"
    petal.style.top = Math.random() * 100 + "%"
    petal.style.animationDelay = Math.random() * 6 + "s"
    petal.style.animationDuration = 10 + Math.random() * 4 + "s"
    petalsContainer.appendChild(petal)
  }
}

// Create sparkle elements
function createSparkles() {
  // Intro sparkles
  const introSparkles = document.querySelector(".intro-sparkles")
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "intro-sparkle"
    sparkle.style.left = Math.random() * 100 + "%"
    sparkle.style.top = Math.random() * 100 + "%"
    sparkle.style.animationDelay = Math.random() * 3 + "s"
    introSparkles.appendChild(sparkle)
  }

  // Envelope sparkles
  const envelopeSparkles = document.querySelector(".envelope-sparkles")
  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "envelope-sparkle"
    sparkle.style.left = 10 + Math.random() * 80 + "%"
    sparkle.style.top = 10 + Math.random() * 80 + "%"
    sparkle.style.animationDelay = Math.random() * 3 + "s"
    envelopeSparkles.appendChild(sparkle)
  }

  // Photo sparkles
  const photoSparkles = document.querySelector(".photo-sparkles")
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "photo-sparkle"
    sparkle.style.left = Math.random() * 100 + "%"
    sparkle.style.top = Math.random() * 100 + "%"
    sparkle.style.animationDelay = Math.random() * 2 + "s"
    photoSparkles.appendChild(sparkle)
  }

  // Video sparkles
  const videoSparkles = document.querySelector(".video-sparkles")
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "video-sparkle"
    sparkle.style.left = Math.random() * 100 + "%"
    sparkle.style.top = Math.random() * 100 + "%"
    sparkle.style.animationDelay = Math.random() * 3 + "s"
    videoSparkles.appendChild(sparkle)
  }

  // Video hearts
  const videoHearts = document.querySelector(".video-hearts")
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("div")
    heart.className = "video-heart"
    heart.textContent = "❤️"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = Math.random() * 100 + "%"
    heart.style.animationDelay = Math.random() * 4 + "s"
    heart.style.fontSize = 12 + Math.random() * 8 + "px"
    videoHearts.appendChild(heart)
  }

  // Number sparkles
  const numberSparkles = document.querySelector(".number-sparkles")
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "number-sparkle"
    sparkle.style.left = 10 + Math.random() * 80 + "%"
    sparkle.style.top = 10 + Math.random() * 80 + "%"
    sparkle.style.animationDelay = Math.random() * 2 + "s"
    numberSparkles.appendChild(sparkle)
  }
}

// Setup event listeners
function setupEventListeners() {
  // Music control
  document.getElementById("musicControl").addEventListener("click", toggleMusic)

  // Share button
  document.getElementById("shareBtn").addEventListener("click", shareExperience)

  // Envelope click
  document.getElementById("envelope").addEventListener("click", openEnvelope)

  // Video controls
  document.getElementById("playButton").addEventListener("click", toggleVideo)
  document.getElementById("birthdayVideo").addEventListener("play", () => {
    document.getElementById("playButton").classList.add("hidden")
    videoPlaying = true
  })
  document.getElementById("birthdayVideo").addEventListener("pause", () => {
    document.getElementById("playButton").classList.remove("hidden")
    videoPlaying = false
  })
}

// Start intro animation
function startIntroAnimation() {
  const introTextElement = document.getElementById("introText")
  let currentText = ""
  let index = 0

  function typeNextCharacter() {
    if (index < introMessage.length) {
      currentText += introMessage[index]
      introTextElement.innerHTML = currentText + '<span class="cursor">|</span>'
      index++
      setTimeout(typeNextCharacter, 150)
    } else {
      introTextElement.innerHTML = currentText
      setTimeout(() => {
        fadeToSection("envelope")
      }, 2000)
    }
  }

  typeNextCharacter()
}

// Fade transition between sections
function fadeToSection(nextSection) {
  fadeOverlay.classList.add("active")

  setTimeout(() => {
    // Hide all sections
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden")
    })

    // Show next section
    switch (nextSection) {
      case "envelope":
        envelopeSection.classList.remove("hidden")
        currentState = "envelope"
        break
      case "photos":
        photosSection.classList.remove("hidden")
        currentState = "photos"
        startPhotoSequence()
        break
      case "story":
        storySection.classList.remove("hidden")
        currentState = "story"
        startStorySequence()
        break
      case "video":
        videoSection.classList.remove("hidden")
        currentState = "video"
        break
    }

    fadeOverlay.classList.remove("active")
  }, 500)
}

// Open envelope
function openEnvelope() {
  if (navigator.vibrate) {
    navigator.vibrate(100)
  }
  fadeToSection("photos")
}

// Start photo sequence
function startPhotoSequence() {
  showCurrentPhoto()

  const photoTimer = setInterval(() => {
    currentPhotoIndex++
    if (currentPhotoIndex < photos.length) {
      showCurrentPhoto()
    } else {
      clearInterval(photoTimer)
      setTimeout(() => {
        fadeToSection("story")
      }, 1000)
    }
  }, 4000)
}

// Show current photo
function showCurrentPhoto() {
  const photoImage = document.getElementById("photoImage")
  const photoMessage = document.getElementById("photoMessage")
  const photoNumber = document.getElementById("photoNumber")
  const polaroidLabel = document.getElementById("polaroidLabel")
  const nextPhotoHint = document.getElementById("nextPhotoHint")

  // Update photo content
  photoImage.src = photos[currentPhotoIndex].src
  photoMessage.textContent = photos[currentPhotoIndex].message
  photoNumber.textContent = currentPhotoIndex + 1
  polaroidLabel.textContent = `Memory #${currentPhotoIndex + 1}`

  // Update progress dots
  const progressDots = document.querySelectorAll(".progress-dot")
  progressDots.forEach((dot, index) => {
    if (index <= currentPhotoIndex) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })

  // Hide hint on last photo
  if (currentPhotoIndex >= photos.length - 1) {
    nextPhotoHint.style.display = "none"
  }

  // Trigger animations
  const magicalStar = document.getElementById("magicalStar")
  const currentPhoto = document.getElementById("currentPhoto")

  // Reset animations
  magicalStar.style.animation = "none"
  currentPhoto.style.animation = "none"

  // Trigger reflow
  magicalStar.offsetHeight
  currentPhoto.offsetHeight

  // Start animations
  magicalStar.style.animation = "star-emerge-and-circle 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  currentPhoto.style.animation = "photo-magical-appear 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
}

// Start story sequence
function startStorySequence() {
  const letterTextElement = document.getElementById("letterText")
  const signatureElement = document.getElementById("signature")
  const countdownElement = document.getElementById("countdown")

  let currentText = ""
  let index = 0

  function typeNextCharacter() {
    if (index < storyText.length) {
      currentText += storyText[index]
      letterTextElement.innerHTML = currentText + '<span class="cursor">|</span>'
      index++
      setTimeout(typeNextCharacter, 80)
    } else {
      letterTextElement.innerHTML = currentText
      signatureElement.classList.remove("hidden")

      setTimeout(() => {
        countdownElement.classList.remove("hidden")
        startCountdown()
      }, 4000)
    }
  }

  typeNextCharacter()
}

// Start countdown
function startCountdown() {
  const countdownHearts = document.querySelectorAll(".countdown-heart")
  const countdownNumber = document.getElementById("countdownNumber")

  const countdownTimer = setInterval(() => {
    countdownValue--

    // Update hearts
    countdownHearts.forEach((heart, index) => {
      if (index >= countdownValue) {
        heart.classList.remove("active")
        heart.classList.add("dropped")
      }
    })

    // Update number
    if (countdownValue > 0) {
      countdownNumber.textContent = `${countdownValue}...`
    } else {
      countdownNumber.textContent = "Here we go! 💕"
      clearInterval(countdownTimer)

      setTimeout(() => {
        fadeToSection("video")
      }, 800)
    }
  }, 1000)
}

// Toggle music
function toggleMusic() {
  const audio = document.getElementById("backgroundMusic")
  const musicIcon = document.querySelector(".volume-icon")

  if (musicPlaying) {
    audio.pause()
    musicIcon.textContent = "🔇"
    musicPlaying = false
  } else {
    audio.play().catch((e) => console.log("Audio play failed:", e))
    musicIcon.textContent = "🔊"
    musicPlaying = true
  }
}

// Toggle video
function toggleVideo() {
  const video = document.getElementById("birthdayVideo")

  if (videoPlaying) {
    video.pause()
  } else {
    video.play().catch((e) => console.log("Video play failed:", e))
  }
}

// Share experience
function shareExperience() {
  if (navigator.share) {
    navigator
      .share({
        title: "Alexandra's 25th Birthday Surprise",
        text: "A special birthday message for Alexandra ❤️",
        url: window.location.href,
      })
      .catch((e) => console.log("Share failed:", e))
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent("Check out this beautiful birthday surprise for Alexandra!")
    window.open(`https://wa.me/?text=${text} ${url}`, "_blank")
  }
}

// Add some extra magic on load
window.addEventListener("load", () => {
  // Add some random delays to background elements for more natural movement
  document.querySelectorAll(".floating-heart, .floating-petal").forEach((element) => {
    const delay = Math.random() * 5
    element.style.animationDelay = delay + "s"
  })
})
