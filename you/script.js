// Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {
            // Loading animation
            setTimeout(() => {
                document.getElementById('loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                    showBirthdayHeader();
                }, 500);
            }, 3000);
            
            // Create floating hearts
            createFloatingHearts();
            
            // Create twinkling stars
            createTwinkles();
            
            // Timeline data
            const timelineData = [
                {
                    photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    date: "Our First Date",
                    message: "The day my life changed forever. I knew from the moment I saw you that you were special."
                },
                {
                    photo: "https://images.unsplash.com/photo-1529333164857-4230a53a2971?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    date: "Our First Trip",
                    message: "Exploring new places with you by my side made every moment magical."
                },
                {
                    photo: "https://images.unsplash.com/photo-1529333164857-4230a53a2971?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    date: "Your Smile",
                    message: "Your smile brightens even my darkest days. It's my favorite thing in the world."
                },
                {
                    photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    date: "Today",
                    message: "Every day I fall more in love with you. Happy 25th birthday to the most amazing woman."
                }
            ];
            
            // Generate timeline
            generateTimeline(timelineData);
            
            // Set up intersection observers for fade-in effects
            setupObservers();
            
            // Gift button event
            document.getElementById('gift-button').addEventListener('click', showLoveLetter);
            
            // Close love letter event
            document.getElementById('close-letter').addEventListener('click', hideLoveLetter);
        });
        
        function showBirthdayHeader() {
            const header = document.getElementById('birthday-header');
            header.style.opacity = '1';
            
            // Create confetti effect for the number 25
            createConfettiEffect(document.getElementById('number-25'));
        }
        
        function createConfettiEffect(container) {
            const colors = ['#ff6b9e', '#ff9ec6', '#ffb3d1', '#ffd6e7', '#ffecf2'];
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = Math.random() * 100 + '%';
                confetti.style.width = Math.random() * 8 + 4 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                
                container.appendChild(confetti);
                
                // Animate confetti
                setTimeout(() => {
                    confetti.style.opacity = '1';
                    confetti.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 + 100}px) rotate(${Math.random() * 360}deg)`;
                    confetti.style.transition = `all ${Math.random() * 2 + 1}s ease-out`;
                    
                    setTimeout(() => {
                        confetti.style.opacity = '0';
                    }, 1000);
                }, Math.random() * 500);
            }
        }
        
        function createFloatingHearts() {
            const container = document.getElementById('hearts-container');
            const heartCount = 15;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart text-pink-400';
                heart.innerHTML = '❤️';
                heart.style.fontSize = Math.random() * 20 + 10 + 'px';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + 'vh';
                heart.style.animationDelay = Math.random() * 5 + 's';
                heart.style.animationDuration = Math.random() * 10 + 5 + 's';
                
                container.appendChild(heart);
                
                // Animate heart
                setTimeout(() => {
                    heart.style.opacity = '0.7';
                    heart.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px)`;
                    heart.style.transition = `all ${Math.random() * 10 + 10}s linear`;
                    
                    setTimeout(() => {
                        heart.style.opacity = '0';
                        setTimeout(() => {
                            heart.style.left = Math.random() * 100 + '%';
                            heart.style.top = '100vh';
                            heart.style.opacity = '0.7';
                            heart.style.transform = 'translate(0, 0)';
                            
                            // Repeat animation
                            const animateHeart = () => {
                                heart.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px)`;
                                setTimeout(() => {
                                    heart.style.opacity = '0';
                                    setTimeout(() => {
                                        heart.style.left = Math.random() * 100 + '%';
                                        heart.style.top = '100vh';
                                        heart.style.opacity = '0.7';
                                        heart.style.transform = 'translate(0, 0)';
                                        setTimeout(animateHeart, 1000);
                                    }, 1000);
                                }, 10000);
                            };
                            
                            setTimeout(animateHeart, 1000);
                        }, 1000);
                    }, 10000);
                }, Math.random() * 2000);
            }
        }
        
        function createTwinkles() {
            const container = document.getElementById('twinkles-container');
            const twinkleCount = 20;
            
            for (let i = 0; i < twinkleCount; i++) {
                const twinkle = document.createElement('div');
                twinkle.className = 'twinkle absolute rounded-full bg-white';
                twinkle.style.width = Math.random() * 4 + 2 + 'px';
                twinkle.style.height = twinkle.style.width;
                twinkle.style.left = Math.random() * 100 + '%';
                twinkle.style.top = Math.random() * 100 + 'vh';
                twinkle.style.animationDelay = Math.random() * 2 + 's';
                
                container.appendChild(twinkle);
            }
        }
        
        function generateTimeline(data) {
            const timeline = document.getElementById('timeline');
            
            data.forEach((item, index) => {
                const isEven = index % 2 === 0;
                
                const timelineItem = document.createElement('div');
                timelineItem.className = 'fade-in timeline-item';
                
                timelineItem.innerHTML = `
                    <div class="flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6">
                        <div class="w-full md:w-2/3 photo-card rounded-xl overflow-hidden border-2 border-rose-200 shadow-lg bg-white">
                            <img src="${item.photo}" alt="${item.date}" class="w-full h-auto object-cover">
                        </div>
                        <div class="w-full md:w-1/3">
                            <div class="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 border border-rose-100 shadow-md">
                                <h3 class="text-2xl font-dancing text-rose-700 mb-2">${item.date}</h3>
                                <p class="text-rose-800">${item.message}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                timeline.appendChild(timelineItem);
            });
        }
        
        function setupObservers() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }
        
        function showLoveLetter() {
            // Create heart explosion effect
            createHeartExplosion();
            
            // Show love letter
            const loveLetter = document.getElementById('love-letter');
            loveLetter.style.opacity = '1';
            loveLetter.style.pointerEvents = 'auto';
        }
        
        function hideLoveLetter() {
            const loveLetter = document.getElementById('love-letter');
            loveLetter.style.opacity = '0';
            loveLetter.style.pointerEvents = 'none';
        }
        
        function createHeartExplosion() {
            const button = document.getElementById('gift-button');
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 30; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart text-pink-400 absolute';
                heart.innerHTML = '❤️';
                heart.style.fontSize = Math.random() * 24 + 16 + 'px';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.opacity = '0';
                
                document.body.appendChild(heart);
                
                // Animate heart
                setTimeout(() => {
                    heart.style.opacity = '1';
                    heart.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * -200 - 100}px) rotate(${Math.random() * 360}deg)`;
                    heart.style.transition = `all ${Math.random() * 1 + 0.5}s ease-out`;
                    
                    setTimeout(() => {
                        heart.style.opacity = '0';
                        setTimeout(() => {
                            heart.remove();
                        }, 1000);
                    }, 1000);
                }, i * 50);
            }
        }