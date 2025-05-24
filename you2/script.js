// Loading animation
        document.addEventListener('DOMContentLoaded', function() {
            const loadingText = document.getElementById('loading-text');
            const heartSvg = document.getElementById('heart-svg');
            const loadingScreen = document.getElementById('loading-screen');
            const mainContent = document.getElementById('main-content');
            
            // Simulate handwriting effect
            const text = "Happy Birthday My Love";
            loadingText.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    loadingText.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    loadingText.style.display = 'none';
                    heartSvg.style.display = 'block';
                    
                    // Show main content after animation
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            mainContent.style.opacity = '1';
                            
                            // Create particles
                            createParticles();
                        }, 1000);
                    }, 2000);
                }
            }, 150);
        });
        
        // Create floating particles
        function createParticles() {
            const container = document.getElementById('particles-container');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 2px and 5px
                const size = Math.random() * 3 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random opacity
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                // Random animation
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                
                // Add to container
                container.appendChild(particle);
                
                // Add animation style
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes float {
                        0% {
                            transform: translate(0, 0) rotate(0deg);
                        }
                        50% {
                            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                        }
                        100% {
                            transform: translate(0, 0) rotate(360deg);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

            const playBtn = document.getElementById('play-btn');
    const video = document.getElementById('my-video');
    const placeholder = document.getElementById('video-placeholder');

    playBtn.addEventListener('click', () => {
        // Ascunde placeholderul cu butonul și textul
        placeholder.style.display = 'none';
        // Arată video-ul
        video.classList.remove('hidden');
        // Pornește video-ul
        video.play();
    });

    document.addEventListener('click', () => {
  const music = document.getElementById('background-music');
  music.play().catch(() => {}); // încearcă să pornească muzica
}, { once: true });