// Enhanced romantic loading script with complete functionality
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const floatingHearts = document.getElementById('floating-hearts');
const confettiContainer = document.getElementById('confetti-container');
const finalSound = document.getElementById("finalSound");

// Romantic messages that change during loading
const romanticMessages = [{
		main: "Mai am puţin şi sunt gata...",
		sub: "O să fii surprinsă iubirea mea ♥"
	},
	{
		main: "Adun toate momentele frumoase...",
		sub: "Ca să-ți arăt cât de mult înseamnă pentru mine ♥"
	},
	{
		main: "Adaug şi dragostea mea...",
		sub: "În fiecare pixel al acestei pagini ♥"
	},
	{
		main: "Mă gândesc la mesaje speciale de dragoste...",
		sub: "Pentru că meriți tot ce e mai frumos ♥"
	},
	{
		main: "Aproape gata, iubirea mea...",
		sub: "Încă puțin și vei vedea totul ♥"
	}
];

let currentMessageIndex = 0;

// Create romantic floating elements for loading
function createRosePetals() {
	const rosePetalsContainer = document.getElementById('rose-petals');

	setInterval(() => {
		const petal = document.createElement('div');
		petal.className = 'rose-petal';
		petal.style.left = Math.random() * 100 + 'vw';
		petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
		petal.style.animationDelay = Math.random() * 2 + 's';
		rosePetalsContainer.appendChild(petal);

		setTimeout(() => {
			if (petal.parentNode) {
				petal.parentNode.removeChild(petal);
			}
		}, 7000);
	}, 300);
}

function createLoadingHearts() {
	const heartsContainer = document.getElementById('loading-hearts');

	setInterval(() => {
		const heart = document.createElement('div');
		heart.innerHTML = '<i class="fas fa-heart"></i>';
		heart.className = 'loading-heart';
		heart.style.left = Math.random() * 100 + 'vw';
		heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
		heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
		heart.style.animationDelay = Math.random() * 2 + 's';
		heartsContainer.appendChild(heart);

		setTimeout(() => {
			if (heart.parentNode) {
				heart.parentNode.removeChild(heart);
			}
		}, 10000);
	}, 500);
}

function createSparkles() {
	const sparklesContainer = document.getElementById('sparkles');

	setInterval(() => {
		const sparkle = document.createElement('div');
		sparkle.className = 'sparkle';
		sparkle.style.left = Math.random() * 100 + 'vw';
		sparkle.style.top = Math.random() * 100 + 'vh';
		sparkle.style.animationDelay = Math.random() * 2 + 's';
		sparklesContainer.appendChild(sparkle);

		setTimeout(() => {
			if (sparkle.parentNode) {
				sparkle.parentNode.removeChild(sparkle);
			}
		}, 2000);
	}, 200);
}

// Change romantic messages during loading
function changeRomanticMessage() {
	const messageElement = document.getElementById('romantic-message');
	const subMessageElement = document.getElementById('sub-message');

	if (messageElement && subMessageElement) {
		messageElement.classList.add('message-fade-out');
		subMessageElement.classList.add('message-fade-out');

		setTimeout(() => {
			messageElement.textContent = romanticMessages[currentMessageIndex].main;
			subMessageElement.textContent = romanticMessages[currentMessageIndex].sub;

			messageElement.classList.remove('message-fade-out');
			subMessageElement.classList.remove('message-fade-out');
			messageElement.classList.add('message-fade-in');
			subMessageElement.classList.add('message-fade-in');

			currentMessageIndex = (currentMessageIndex + 1) % romanticMessages.length;
		}, 400);
	}
}

// Start romantic loading effects
createRosePetals();
createLoadingHearts();
createSparkles();

// Change message every 2 seconds
const messageInterval = setInterval(changeRomanticMessage, 2000);

// Create floating hearts for main content
function createFloatingHearts() {
	floatingHearts.innerHTML = '';
	for (let i = 0; i < 15; i++) {
		const heart = document.createElement('div');
		heart.innerHTML = '<i class="fas fa-heart text-pink-300 opacity-50"></i>';
		heart.className = 'absolute';
		heart.style.left = Math.random() * 100 + 'vw';
		heart.style.top = Math.random() * 100 + 'vh';
		heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
		heart.style.animation = `float ${Math.random() * 6 + 3}s ease-in-out infinite ${Math.random() * 2}s`;
		floatingHearts.appendChild(heart);
	}
}

// Create enhanced confetti
function createConfetti() {
	confettiContainer.innerHTML = '';
	const colors = ['#ff758c', '#ff7eb3', '#ff88a2', '#ff9770', '#ffa570'];

	for (let i = 0; i < 50; i++) {
		const confetti = document.createElement('div');
		confetti.className = 'confetti';
		confetti.style.left = Math.random() * 100 + 'vw';
		confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		confetti.style.width = (Math.random() * 10 + 5) + 'px';
		confetti.style.height = (Math.random() * 10 + 5) + 'px';
		confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
		confetti.style.animation = `confetti ${Math.random() * 5 + 3}s linear forwards ${Math.random() * 2}s`;
		confettiContainer.appendChild(confetti);
	}
}

// Enhanced scroll animations with AOS-like functionality
function setupScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';

				// Add special effects for photo sections
				if (entry.target.classList.contains('photo-section')) {
					const photoContainer = entry.target.querySelector('.photo-container-enhanced');
					const quoteCard = entry.target.querySelector('.quote-card-luxury');

					if (photoContainer) {
						setTimeout(() => {
							photoContainer.style.transform = 'translateY(0) rotateY(0)';
							photoContainer.style.opacity = '1';
						}, 200);
					}

					if (quoteCard) {
						setTimeout(() => {
							quoteCard.style.transform = 'translateY(0)';
							quoteCard.style.opacity = '1';
						}, 400);
					}
				}
			}
		});
	}, observerOptions);

	// Observe all animated elements
	document.querySelectorAll('.photo-section, .letter-container-luxury, .video-wrapper-luxury').forEach(element => {
		element.style.opacity = '0';
		element.style.transform = 'translateY(50px)';
		observer.observe(element);
	});

	// Observe original slide elements
	document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in').forEach(element => {
		observer.observe(element);
	});
}

// Video controls
function toggleVideo() {
	const video = document.querySelector('video');
	if (video) {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
}

// Set current date
function setCurrentDate() {
	const dateElement = document.getElementById('current-date');
	if (dateElement) {
		const today = new Date();
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		dateElement.textContent = today.toLocaleDateString('ro-RO', options);
	}
}

// Smooth scroll setup
function setupSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}

// Enhanced loading simulation
const interval = setInterval(() => {
	progress += Math.random() * 6 + 1;
	if (progress > 100) progress = 100;

	progressBar.style.width = `${progress}%`;
	progressText.textContent = `${Math.floor(progress)}%`;

	if (progress === 100) {
		clearInterval(interval);
		clearInterval(messageInterval);

		// Final romantic message
		const messageElement = document.getElementById('romantic-message');
		const subMessageElement = document.getElementById('sub-message');

		if (messageElement && subMessageElement) {
			messageElement.textContent = "Totul e pregătit pentru tine ♥";
			subMessageElement.textContent = "Să începem această călătorie frumoasă...";
		}

		setTimeout(() => {
			loadingScreen.style.opacity = '0';
			setTimeout(() => {
				loadingScreen.classList.add('hidden');
				mainContent.classList.remove('hidden');
				floatingHearts.classList.remove('hidden');

				// Initialize all enhanced effects
				createFloatingHearts();
				createConfetti();
				setupScrollAnimations();
				setupSmoothScroll();
				setCurrentDate();

			}, 1000);
		}, 1500);
	}
}, 400);

// Auto-play music on first interaction
document.addEventListener("click", function playMusicOnce() {
	finalSound.play().catch((e) => {
		console.log("Autoplay failed:", e);
	});
	document.removeEventListener("click", playMusicOnce);
});

// Enhanced hover effects and interactions
document.addEventListener('DOMContentLoaded', () => {
	// Add enhanced hover effects
	const interactiveElements = document.querySelectorAll('.photo-container-enhanced, .quote-card-luxury, .letter-paper-enhanced, .video-container-enhanced');

	interactiveElements.forEach(el => {
		el.addEventListener('mouseenter', () => {
			el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
		});
	});

	// Add parallax effect to background elements
	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		const parallaxElements = document.querySelectorAll('#floating-hearts');

		parallaxElements.forEach(element => {
			const speed = 0.3;
			element.style.transform = `translateY(${scrolled * speed}px)`;
		});
	});

	// Add click effects for photos
	document.querySelectorAll('.photo-container-enhanced').forEach(container => {
		container.addEventListener('click', () => {
			container.style.transform = 'scale(0.95)';
			setTimeout(() => {
				container.style.transform = '';
			}, 150);
		});
	});
});

// Keyboard shortcuts for fun interactions
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		createConfetti();
	}
	if (e.key === ' ') {
		e.preventDefault();
		// Create extra floating hearts
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				const heart = document.createElement('div');
				heart.innerHTML = '<i class="fas fa-heart text-pink-400"></i>';
				heart.className = 'absolute text-2xl';
				heart.style.left = Math.random() * 100 + 'vw';
				heart.style.top = '100vh';
				heart.style.animation = 'float-hearts 3s ease-out forwards';
				heart.style.pointerEvents = 'none';
				heart.style.zIndex = '1000';
				document.body.appendChild(heart);

				setTimeout(() => {
					if (heart.parentNode) {
						heart.parentNode.removeChild(heart);
					}
				}, 3000);
			}, i * 200);
		}
	}
});

// JS-ul tău existent (sau adaugă asta după ce s-a încărcat DOM-ul)
const tapOverlay = document.getElementById("tapOverlay");
const bgAudio = document.getElementById("bgMusic"); // asigură-te că ai un <audio> cu acest ID

function activateMusic() {
	tapOverlay.classList.add("hidden");
	bgAudio.play().catch(() => {
		console.warn("Autoplay blocat");
	});
}

// o singură dată la primul click/tap
document.addEventListener("click", activateMusic, {
	once: true
});
document.addEventListener("touchstart", activateMusic, {
	once: true
});