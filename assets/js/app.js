    // Save initial Home content
    const homeContentBackup = document.getElementById('home-content').outerHTML;

	const masterItems = {
    costumes: [
        { title: 'Costume Preview', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' }
    ],
    hairstyles: [
        { title: 'Hairstyle Preview', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' }
    ],
    weapons: [
        { title: 'Weapon Preview', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' }
    ],
    others: [
        { title: 'Other Asset Preview', img: 'assets/img/jawwad_mini.png', full: 'assets/img/jawwad.png' }
    ],
    free: [
        { title: 'Antaras Weapons', img: 'assets/img/antaras_weapons.png', full: 'assets/img/antaras_weapons.png' },
        { title: 'Dynasty Weapons', img: 'assets/img/dynasty_weapons.png', full: 'assets/img/dynasty_weapons.png' },
        { title: 'God Awakening Weapons', img: 'assets/img/god_awakening_weapons.png', full: 'assets/img/god_awakening_weapons.png' },
        { title: 'Silver Hunter Weapons', img: 'assets/img/silver_hunter_weapons.jpg', full: 'assets/img/silver_hunter_weapons.jpg' },
        { title: 'Dark Crystal Weapons', img: 'assets/img/dark_crystal_weapons.jpg', full: 'assets/img/dark_crystal_weapons.jpg' }
    ],
    tutorials: [
        { title: 'Installing Assets', youtube: 'dQw4w9WgXcQ' },
        { title: 'Editing Textures', youtube: 'abcdEFGH123' }
    ],
};

	// Când pagina se încarcă, verificăm dacă există o pagină salvată
window.addEventListener('DOMContentLoaded', () => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage && savedPage !== 'home') {
        loadContent(savedPage);
    }
});


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
        navigator.clipboard.writeText('https://discord.gg/BBX8vfN4gQ').then(() => {
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
		
		if (section === 'home') {
  localStorage.setItem('currentPage', 'home');
}
		
function renderContent(title, items, section) {
  const contentArea = document.getElementById('content-area');

  // Setează layout grid diferit în funcție de secțiune
  let gridCols = 'grid-cols-1';
  if (section === 'tutorials') gridCols = 'grid-cols-1 sm:grid-cols-2';
  else if (section === 'tools') gridCols = 'grid-cols-1 sm:grid-cols-2';
  else gridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  let content = `
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">${title}</h2>
      <div class="grid ${gridCols} gap-6">
        ${items.map(item => renderItem(item, section)).join('')}
      </div>
    </section>
  `;

  contentArea.innerHTML = content;
  animateContent();
}

function renderItem(item, section) {
  if (section === 'tools') {
    return `
      <div class="bg-black bg-opacity-30 rounded-lg p-6">
        <div class="cursor-pointer mb-4" onclick="openModal('${item.full}')">
          <img src="${item.img}" alt="${item.title}" class="w-full h-64 object-cover rounded-lg hover:opacity-80 transition">
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">${item.title}</h3>
        <p class="text-gray-300 mb-4">${item.desc}</p>
        <div class="flex space-x-4">
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg">
            Price: ${item.price}
          </div>
          <a href="${item.discord}" target="_blank" class="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition">
            <i class="fab fa-discord mr-2"></i> Contact
          </a>
        </div>
      </div>
    `;
  }

  if (section === 'free') {
    return `
      <div class="gallery-item bg-black bg-opacity-30 rounded-lg overflow-hidden">
        <div class="cursor-pointer" onclick="openModal('${item.full}')">
          <img src="${item.img}" alt="${item.title}" class="w-full h-64 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-medium text-white">${item.title}</h3>
          </div>
        </div>
        ${item.download ? `
          <div class="px-4 pb-4">
            <button class="w-full py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded hover:from-green-600 hover:to-teal-700 transition">
              <a href="${item.download}" download><i class="fas fa-download mr-2"></i> Download</a>
            </button>
            ${item.extra ? `<p class="mt-2 text-white">${item.extra}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  if (section === 'tutorials') {
    return `
      <div class="bg-black bg-opacity-30 rounded-lg p-6">
        <h3 class="text-xl font-bold text-white mb-4">${item.title}</h3>
        <div class="w-full">
          <iframe class="w-full rounded-lg" style="height: 400px;" src="https://www.youtube.com/embed/${item.youtube}" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;
  }

  // default (standard content: costumes, weapons, hairstyles, others)
  return `
    <div class="gallery-item bg-black bg-opacity-30 rounded-lg overflow-hidden cursor-pointer" onclick="openModal('${item.full}')">
      <img src="${item.img}" alt="${item.title}" class="w-full h-64 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-medium text-white">${item.title}</h3>
      </div>
    </div>
  `;
}

		
		// Salvăm pagina curentă
localStorage.setItem('currentPage', section);

        document.getElementById('mobile-menu').classList.add('hidden');
        
        const contentArea = document.getElementById('content-area');

        // Fade out current content
        contentArea.classList.add('opacity-0', 'transition-opacity', 'duration-300');

        setTimeout(() => {
            // Load new content
if (section === 'home') {
    contentArea.innerHTML = homeContentBackup;

    // 1. Combinăm doar itemele non-tutoriale (costumes, hairstyles, weapons, others, free, tools)
    const combinedItems = [
        ...masterItems.costumes,
        ...masterItems.hairstyles,
        ...masterItems.weapons,
        ...masterItems.others,
        ...masterItems.free
    ];

    // 2. Alegem 3 random din combinedItems
    const randomNormalItems = combinedItems.sort(() => 0.5 - Math.random()).slice(0, 3);

    // 4. Injectăm în galerie

    const galleryDiv = contentArea.querySelector('#home-content .grid');

    galleryDiv.innerHTML = `
        ${randomNormalItems.map(item => `
            <div class="gallery-item bg-black bg-opacity-30 rounded-lg overflow-hidden cursor-pointer" onclick="openModal('${item.full}')">
                <img src="${item.img}" alt="${item.title}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-medium text-white">${item.title}</h3>
                </div>
            </div>
        `).join('')}
    `;

    animateContent();
    return;
}
            let title = '';
            let items = [];

            switch(section) {
case 'costumes':
case 'hairstyles':
case 'weapons':
case 'others':
case 'free':
  title = section.charAt(0).toUpperCase() + section.slice(1);
  fetch(`assets/data/${section}.json`)
    .then(res => res.json())
    .then(data => {
      renderContent(title, data, section);
    });
  return;

					
case 'tutorials':
  title = 'Tutorials';
  fetch('assets/data/tutorials.json')
    .then(res => res.json())
    .then(data => {
      renderContent(title, data, section);
    });
  return;

case 'tools':
    title = 'Tools';
    fetch('assets/data/tools.json')
      .then(response => response.json())
      .then(data => {
        items = data;
        renderContent(title, data, section);
      });
    return;
            }
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
