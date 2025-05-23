document.addEventListener('DOMContentLoaded', function () {
	// Simulate loading with typing effect
	const loadingText = document.getElementById('loading-text');
	const textToType = "Preparing your magical gift...";
	let charIndex = 0;

	function typeLoadingText() {
		if (charIndex < textToType.length) {
			loadingText.textContent += textToType.charAt(charIndex);
			charIndex++;
			setTimeout(typeLoadingText, 50 + Math.random() * 50);
		} else {
			loadingText.style.borderRight = 'none';
			startLoadingProgress();
		}
	}

	// Start typing effect
	typeLoadingText();

	// Loading progress
	function startLoadingProgress() {
		let progress = 0;
		const loadingInterval = setInterval(() => {
			progress += Math.random() * 5;
			if (progress > 100) progress = 100;
			document.getElementById('loading-progress').style.width = progress + '%';

			if (progress >= 100) {
				clearInterval(loadingInterval);
				setTimeout(() => {
					// Fade out loading screen
					gsap.to("#loading-screen", {
						opacity: 0,
						duration: 0.8,
						ease: "power2.inOut",
						onComplete: function () {
							document.getElementById('loading-screen').style.display = 'none';
							document.getElementById('main-content').style.display = 'block';
							initAnimations();
						}
					});
				}, 500);
			}
		}, 100);
	}

	// Audio control
	const audioControl = document.getElementById('audio-control');
	const bgMusic = document.getElementById('bg-music');

	audioControl.addEventListener('click', function () {
		if (bgMusic.paused) {
			bgMusic.play().then(() => {
				audioControl.innerHTML = '<i class="fas fa-music"></i>';
			}).catch(e => {
				console.log('Audio playback prevented:', e);
			});
		} else {
			bgMusic.pause();
			audioControl.innerHTML = '<i class="fas fa-music-slash"></i>';
		}
	});

	// Try to autoplay music (may not work due to browser policies)
	document.addEventListener('click', function () {
		if (bgMusic.paused) {
			bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
		}
	}, {
		once: true
	});

	// Surprise button
	const surpriseBtn = document.getElementById('surprise-btn');
	const surpriseModal = document.getElementById('surprise-modal');
	const closeModal = document.querySelector('.close-modal');

	surpriseBtn.addEventListener('click', function () {
		surpriseModal.style.display = 'flex';
		setTimeout(() => {
			surpriseModal.classList.add('show');
		}, 10);
	});

	closeModal.addEventListener('click', function () {
		surpriseModal.classList.remove('show');
		setTimeout(() => {
			surpriseModal.style.display = 'none';
		}, 300);
	});

	window.addEventListener('click', function (event) {
		if (event.target === surpriseModal) {
			surpriseModal.classList.remove('show');
			setTimeout(() => {
				surpriseModal.style.display = 'none';
			}, 300);
		}
	});

	// Fullscreen photo viewer
	const photoFrames = document.querySelectorAll('.photo-frame');
	const fullscreenPhoto = document.getElementById('fullscreen-photo');
	const fullscreenImg = fullscreenPhoto.querySelector('img');
	const closeFullscreen = fullscreenPhoto.querySelector('.close-fullscreen');

	photoFrames.forEach(frame => {
		frame.addEventListener('click', function () {
			// In a real implementation, you would set the src to the actual photo
			// For now we'll just use a placeholder
			fullscreenImg.src = 'https://via.placeholder.com/1000x1000/ffb8c6/ff4757?text=Our+Photo';

			fullscreenPhoto.classList.add('active');
			document.body.style.overflow = 'hidden';
		});
	});

	closeFullscreen.addEventListener('click', function () {
		fullscreenPhoto.classList.remove('active');
		document.body.style.overflow = '';
	});

	// Create confetti
	function createConfetti() {
		const container = document.getElementById('confetti-container');
		const colors = ['#ff6b8b', '#ffb8c6', '#ff4757', '#ff8d8d', '#ffc3a0'];
		const shapes = ['circle', 'rect'];

		for (let i = 0; i < 150; i++) {
			const confetti = document.createElement('div');
			confetti.className = 'confetti';
			confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
			confetti.style.left = Math.random() * 100 + 'vw';
			confetti.style.top = -10 + 'px';
			confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

			// Random shape
			const shape = shapes[Math.floor(Math.random() * shapes.length)];
			if (shape === 'circle') {
				confetti.style.borderRadius = '50%';
			}

			// Random size
			const size = 6 + Math.random() * 12;
			confetti.style.width = size + 'px';
			confetti.style.height = size + 'px';

			container.appendChild(confetti);

			// Animate each confetti piece
			gsap.to(confetti, {
				y: window.innerHeight + 10,
				x: Math.random() * 200 - 100,
				rotation: Math.random() * 360,
				opacity: 0.8,
				duration: 2 + Math.random() * 4,
				delay: Math.random() * 3,
				ease: 'power1.out',
				onComplete: function () {
					confetti.remove();
				}
			});
		}
	}

	// Create floating hearts
	function createFloatingHeart() {
		const heart = document.createElement('div');
		heart.innerHTML = '<i class="fas fa-heart" style="font-size: 64px; color: red;"></i>';
		heart.style.position = 'fixed';
		heart.style.color = '#ff6b8b';
		heart.style.fontSize = (15 + Math.random() * 25) + 'px';
		heart.style.left = Math.random() * 100 + 'vw';
		heart.style.top = '100vh';
		heart.style.opacity = '0.7';
		heart.style.zIndex = '10';
		heart.style.pointerEvents = 'none';
		heart.style.transform = 'translateY(0)';
		document.body.appendChild(heart);

		gsap.to(heart, {
			y: -150,
			x: Math.random() * 40 - 20,
			opacity: 0,
			duration: 10 + Math.random() * 10,
			ease: 'power1.inOut',
			onComplete: function () {
				heart.remove();
			}
		});
	}

	// Initialize animations
	function initAnimations() {
		// Register plugins
		gsap.registerPlugin(ScrollTrigger, TextPlugin);

		// Hero section animations
		gsap.to('.number-25', {
			opacity: 1,
			y: 0,
			duration: 1.2,
			ease: 'elastic.out(1, 0.5)'
		});

		// Typewriter effect for birthday text
		gsap.to("#birthday-text", {
			duration: 2,
			text: "Happy Birthday, my love!",
			ease: "none",
			delay: 0.5
		});

		gsap.to("#birthday-text", {
			opacity: 1,
			duration: 0.5,
			delay: 0.5
		});

		gsap.to("#scroll-hint", {
			opacity: 1,
			delay: 2.5,
			duration: 1
		});

		// Create confetti
		createConfetti();

		// Create occasional floating hearts
		setInterval(() => {
			if (Math.random() > 0.7) {
				createFloatingHeart();
			}
		}, 3000);

		// Section animations
		const sections = document.querySelectorAll('.section');

		sections.forEach((section, index) => {
			gsap.to(section, {
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					toggleActions: 'play none none none',
					markers: false
				},
				opacity: 1,
				y: 0,
				duration: 1,
				delay: index * 0.1,
				ease: 'power2.out'
			});
		});

		// Initialize ScrollTrigger
		ScrollTrigger.refresh();
	}
});