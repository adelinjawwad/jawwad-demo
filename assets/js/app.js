    // Save initial Home content
    const homeContentBackup = document.getElementById('home-content').outerHTML;

    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });

    // Copy Discord tag to clipboard
    function copyDiscordTag() {
        navigator.clipboard.writeText('1.3afb').then(() => {
            showToast('Discord tag copied to clipboard!');
        });
    }

    // Copy Discord invite to clipboard
    function copyDiscordInvite() {
        navigator.clipboard.writeText('https://discord.gg/jawwadart').then(() => {
            showToast('Discord invite link copied!');
        });
    }

    // Toggle Discord invite visibility
    function toggleDiscordInvite() {
        const invite = document.getElementById('discord-invite');
        invite.classList.toggle('hidden');
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Open image modal
    function openModal(imageSrc) {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close image modal
    function closeModal() {
        const modal = document.getElementById('image-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    document.getElementById('image-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Dynamic content loading with fade animation
    function loadContent(section) {
        document.getElementById('mobile-menu').classList.add('hidden');
        
        const contentArea = document.getElementById('content-area');

        // Fade out current content
        contentArea.classList.add('opacity-0', 'transition-opacity', 'duration-300');

        setTimeout(() => {
            // Load new content
            if (section === 'home') {
                contentArea.innerHTML = homeContentBackup;
                animateContent(); // make sure new buttons work again
                return;
            }

            let title = '';
            let items = [];

            switch(section) {
                case 'costumes':
                    title = 'Costumes';
                    items = [
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' }
                    ];
                    break;
                case 'hairstyles':
                    title = 'Hairstyles';
                    items = [
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' }
                    ];
                    break;
                case 'weapons':
                    title = 'Weapons';
                    items = [
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                    ];
                    break;
                case 'others':
                    title = 'Other Assets';
                    items = [
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                        { title: 'Coming soon', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' },
                    ];
                    break;
                case 'free':
                    title = 'Free Stuff';
                    items = [
                        { title: 'Antaras', img: 'assets/img/antaras_weapons.png', full: 'assets/img/antaras_weapons.png', free1: true },
                        { title: 'Dynasty', img: 'assets/img/dynasty_weapons.png', full: 'assets/img/dynasty_weapons.png', free2: true },
                        { title: 'God Awakening', img: 'assets/img/god_awakening_weapons.png', full: 'assets/img/god_awakening_weapons.png', free3: true },
                        { title: 'Silver Hunter', img: 'assets/img/silver_hunter_weapons.jpg', full: 'assets/img/silver_hunter_weapons.jpg', free4: true },
                        { title: 'Dark Crystal', img: 'assets/img/dark_crystal_weapons.jpg', full: 'assets/img/dark_crystal_weapons.jpg', free5: true },
                        { title: 'More soon', img: 'assets/img/jawwad.png', full: 'assets/img/jawwad.png', free6: true },
                    ];
                    break;
            }

// Funcția modificată pentru a accepta orice text suplimentar
function createDownloadButton(item, downloadLink, extraText = '') {
    return item ? `
        <div class="px-4 pb-4">
            <button class="w-full py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded hover:from-green-600 hover:to-teal-700 transition">
                <a href="${downloadLink}" download><i class="fas fa-download mr-2"></i> Download</a>
            </button>
            ${extraText ? `<p class="mt-2 text-white">${extraText}</p>` : ''}
        </div>
    ` : '';
}

let content = `
    <section>
        <h2 class="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">${title}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${items.map(item => `
                <div class="gallery-item bg-black bg-opacity-30 rounded-lg overflow-hidden">
                    <div class="cursor-pointer" onclick="openModal('${item.full}')">
                        <img src="${item.img}" alt="${item.title}" class="w-full h-64 object-cover">
                        <div class="p-4">
                            <h3 class="text-lg font-medium text-white">${item.title}</h3>
                        </div>
                    </div>
                    ${createDownloadButton(item.free1, 'assets/downloads/antaras_weapons.rar')}
                    ${createDownloadButton(item.free2, 'assets/downloads/dynasty_weapons.rar', 'Password: jawwad@wk')}
                    ${createDownloadButton(item.free3, 'assets/downloads/god_awakening_weapons.rar')}
                    ${createDownloadButton(item.free4, 'assets/downloads/silver_hunter_weapons.rar', '<a href="https://vimeo.com/534330489" target="_blank">In game preview here</a>')}
                    ${createDownloadButton(item.free5, 'assets/downloads/dark_crystal_weapons.rar')}
                </div>
            `).join('')}
        </div>
    </section>
`;

            contentArea.innerHTML = content;
            animateContent();
        }, 300); // wait for fade-out
    }

    // Fade-in after loading content
    function animateContent() {
        const contentArea = document.getElementById('content-area');
        contentArea.classList.remove('opacity-0');
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
	
	// Funcție pentru toggle (deschide/închide dropdown-ul)
function toggleDropdown() {
  var dropdown = document.querySelector('.dropdown');
  var icon = dropdown.querySelector('.dropbtn i');
  
  // Toggle class-ul 'active' pe dropdown
  dropdown.classList.toggle('active');
  
  // Dacă dropdown-ul este activ, rotiți săgeata
  if (dropdown.classList.contains('active')) {
    icon.style.transform = 'rotate(180deg)'; // Rotește săgeata când este deschis
  } else {
    icon.style.transform = 'rotate(0deg)'; // Revine la poziția inițială când este închis
  }
}

// Închide meniul după ce se apasă un link
document.querySelectorAll('.dropdown-content a').forEach(function(link) {
  link.addEventListener('click', function() {
    var dropdown = document.querySelector('.dropdown');
    var icon = dropdown.querySelector('.dropbtn i');
    
    // Îndepărtează clasa 'active' pentru a închide meniul
    dropdown.classList.remove('active');
    icon.style.transform = 'rotate(0deg)'; // Resetează săgeata la poziția inițială
  });
});
