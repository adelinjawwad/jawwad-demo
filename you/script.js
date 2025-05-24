// Enhanced Loading animation with smoother effects
document.addEventListener('DOMContentLoaded', function() {
    const loadingText = document.getElementById('loading-text');
    const heartSvg = document.getElementById('heart-svg');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Enhanced typewriter effect
    const text = "Happy Birthday My Love";
    loadingText.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            loadingText.textContent += text.charAt(i);
            // Add typing sound effect (optional)
            playTypingSound();
            i++;
        } else {
            clearInterval(typing);
            
            // Smooth transition to heart
            setTimeout(() => {
                loadingText.style.transform = 'translateY(-20px)';
                loadingText.style.opacity = '0';
                
                setTimeout(() => {
                    loadingText.style.display = 'none';
                    heartSvg.style.display = 'block';
                    heartSvg.style.opacity = '0';
                    heartSvg.style.transform = 'scale(0.5)';
                    
                    // Animate heart appearance
                    setTimeout(() => {
                        heartSvg.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                        heartSvg.style.opacity = '1';
                        heartSvg.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Show main content with enhanced transition
                    setTimeout(() => {
                        loadingScreen.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        loadingScreen.style.opacity = '0';
                        loadingScreen.style.transform = 'scale(1.1)';
                        
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            mainContent.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
                            mainContent.style.opacity = '1';
                            mainContent.style.transform = 'translateY(0)';
                            
                            // Create enhanced particles
                            createEnhancedParticles();
                            
                            // Start background animations
                            startBackgroundAnimations();
                        }, 1500);
                    }, 2000);
                }, 500);
            }, 1000);
        }
    }, 120);
});

// Enhanced particle system
function createEnhancedParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createSingleParticle(container);
        }, i * 200);
    }
    
    // Continuously create new particles
    setInterval(() => {
        createSingleParticle(container);
    }, 3000);
}

function createSingleParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 3px and 8px
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = '100vh';
    
    // Random animation duration
    const duration = Math.random() * 10 + 15;
    particle.style.animationDuration = `${duration}s`;
    
    // Add to container
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Enhanced video functionality with smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const video = document.getElementById('my-video');
    const placeholder = document.getElementById('video-placeholder');

    if (playBtn && video && placeholder) {
        playBtn.addEventListener('click', () => {
            // Add click animation
            playBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // Smooth fade out of placeholder
                placeholder.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                placeholder.style.opacity = '0';
                placeholder.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    placeholder.style.display = 'none';
                    video.classList.remove('hidden');
                    video.style.opacity = '0';
                    video.style.transform = 'scale(0.8)';
                    
                    // Animate video appearance
                    setTimeout(() => {
                        video.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                        video.style.opacity = '1';
                        video.style.transform = 'scale(1)';
                        
                        // Start video
                        video.play().catch(error => {
                            console.log('Video play failed:', error);
                        });
                    }, 100);
                }, 1000);
            }, 200);
        });
    }
});

// Enhanced background music with fade in
document.addEventListener('click', function() {
    const music = document.getElementById('background-music');
    if (music && music.paused) {
        music.volume = 0;
        music.play().then(() => {
            // Fade in music
            let volume = 0;
            const fadeIn = setInterval(() => {
                if (volume < 0.3) {
                    volume += 0.01;
                    music.volume = volume;
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);
        }).catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}, { once: true });

// Smooth scroll for anchor links with easing
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
});

// Background animations controller
function startBackgroundAnimations() {
    // Animate background shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        setTimeout(() => {
            shape.style.opacity = '0.1';
            shape.style.animation = `floatShape ${20 + index * 5}s ease-in-out infinite`;
        }, index * 1000);
    });
}

// Optional typing sound effect
function playTypingSound() {
    // Create a subtle typing sound using Web Audio API
    if (typeof AudioContext !== 'undefined' || typeof window.webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});

// Enhanced hover effects for photos
document.addEventListener('DOMContentLoaded', function() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle vibration effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'subtleVibrate 0.3s ease-in-out';
            }, 10);
        });
    });
});

// Add subtle vibrate animation
const style = document.createElement('style');
style.textContent = `
    @keyframes subtleVibrate {
        0%, 100% { transform: scale(1.02) translateY(-10px) rotate(0deg); }
        25% { transform: scale(1.02) translateY(-10px) rotate(0.5deg); }
        75% { transform: scale(1.02) translateY(-10px) rotate(-0.5deg); }
    }
`;
document.head.appendChild(style);