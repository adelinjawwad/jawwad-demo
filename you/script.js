// Simulate loading progress
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const floatingHearts = document.getElementById('floating-hearts');
const confettiContainer = document.getElementById('confetti-container');

// Create floating hearts
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

// Create confetti
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

// Animate elements when they come into view
function animateOnScroll() {
	const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateX(0)';
			}
		});
	}, {
		threshold: 0.1
	});

	elements.forEach(element => {
		observer.observe(element);
	});
}

// Smooth scroll to sections
function setupSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
}

// Simulate loading
const interval = setInterval(() => {
	progress += Math.random() * 10;
	if (progress > 100) progress = 100;

	progressBar.style.width = `${progress}%`;
	progressText.textContent = `${Math.floor(progress)}%`;

	if (progress === 100) {
		clearInterval(interval);
		setTimeout(() => {
			loadingScreen.classList.add('opacity-0');
			setTimeout(() => {
				loadingScreen.classList.add('hidden');
				mainContent.classList.remove('hidden');
				floatingHearts.classList.remove('hidden');
				createFloatingHearts();
				createConfetti();
				animateOnScroll();
				setupSmoothScroll();
			}, 1000);
		}, 500);
	}
}, 300);

// Add hover effects to all interactive elements
document.addEventListener('DOMContentLoaded', () => {
	const interactiveElements = document.querySelectorAll('button, a, .photo-container, .letter-paper, .video-container');

	interactiveElements.forEach(el => {
		el.addEventListener('mouseenter', () => {
			el.classList.add('transition', 'duration-300', 'ease-in-out');
		});
	});
});

const finalSound = document.getElementById("finalSound");

// Pornim muzica la primul click oriunde în pagină
document.addEventListener("click", function playMusicOnce() {
	finalSound.play().catch((e) => {
		console.log("Autoplay failed:", e);
	});
	document.removeEventListener("click", playMusicOnce); // evită redare multiplă
});