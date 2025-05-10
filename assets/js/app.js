const masterItems = {
	costumes: [{
		title: 'Costume Preview',
		img: 'assets/img/jawwad_mini.jpg',
		full: 'assets/img/jawwad.jpg'
	}],
	hairstyles: [{
		title: 'Hairstyle Preview',
		img: 'assets/img/jawwad_mini.jpg',
		full: 'assets/img/jawwad.jpg'
	}],
	weapons: [{
		title: 'Weapon Preview',
		img: 'assets/img/jawwad_mini.jpg',
		full: 'assets/img/jawwad.jpg'
	}],
	others: [{
		title: 'Other Asset Preview',
		img: 'assets/img/jawwad_mini.jpg',
		full: 'assets/img/jawwad.jpg'
	}],
	free: [{
			title: 'Antaras Weapons',
			img: 'assets/img/antaras_weapons.jpg',
			full: 'assets/img/antaras_weapons.jpg'
		},
		{
			title: 'Dynasty Weapons',
			img: 'assets/img/dynasty_weapons.jpg',
			full: 'assets/img/dynasty_weapons.jpg'
		},
		{
			title: 'God Awakening Weapons',
			img: 'assets/img/god_awakening_weapons.jpg',
			full: 'assets/img/god_awakening_weapons.jpg'
		},
		{
			title: 'Silver Hunter Weapons',
			img: 'assets/img/silver_hunter_weapons.jpg',
			full: 'assets/img/silver_hunter_weapons.jpg'
		},
		{
			title: 'Dark Crystal Weapons',
			img: 'assets/img/dark_crystal_weapons.jpg',
			full: 'assets/img/dark_crystal_weapons.jpg'
		}
	],
	tutorials: [{
			title: 'Installing Assets',
			youtube: 'dQw4w9WgXcQ'
		},
		{
			title: 'Editing Textures',
			youtube: 'abcdEFGH123'
		}
	]
};

// ===== EVENIMENTE =====
window.addEventListener('DOMContentLoaded', () => {
	const savedPage = localStorage.getItem('currentPage');
	if (savedPage) {
		loadContent(savedPage);
	} else {
		loadWelcome(); // 🟢 Dacă nu e nimic salvat, deschide Welcome
	}
});

document.getElementById('mobile-menu-button').addEventListener('click', () => {
	document.getElementById('mobile-menu').classList.toggle('hidden');
});

// ===== FUNCTII UTILE =====
function copyDiscordTag() {
	navigator.clipboard.writeText('1.3afb').then(() => showToast('Discord tag copied to clipboard!'));
}

function copyDiscordInvite() {
	navigator.clipboard.writeText('https://discord.gg/BBX8vfN4gQ').then(() => showToast('Discord invite link copied!'));
}

function toggleDiscordInvite() {
	document.getElementById('discord-invite').classList.toggle('hidden');
}

function showToast(message) {
	const toast = document.getElementById('toast');
	document.getElementById('toast-message').textContent = message;
	toast.classList.remove('hidden');
	setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ===== MODAL POZE =====
function openModal(imageSrc) {
	const modal = document.getElementById('image-modal');
	const modalImage = document.getElementById('modal-image');
	modalImage.src = imageSrc;
	modal.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
}

function closeModal() {
	const modal = document.getElementById('image-modal');
	modal.classList.add('hidden');
	document.body.style.overflow = 'auto';
}

document.getElementById('image-modal').addEventListener('click', (e) => {
	if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') closeModal();
});

// ===== MENIU DROPDOWN =====
function toggleDropdown() {
	const dropdown = document.querySelector('.dropdown');
	const icon = dropdown.querySelector('.dropbtn i');
	dropdown.classList.toggle('active');
	icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
}

document.querySelectorAll('.dropdown-content a').forEach((link) => {
	link.addEventListener('click', toggleDropdown);
});

// ===== CONTINUT DINAMIC =====
function loadContent(section) {
	section = section.split('?')[0];
	localStorage.setItem('currentPage', section);

	const contentArea = document.getElementById('content-area');
	contentArea.classList.add('opacity-0', 'transition-opacity', 'duration-300');
	document.getElementById('mobile-menu').classList.add('hidden');

	setTimeout(() => {
		if (section === 'welcome') {
			renderWelcomeContent(); // 🟢 noua funcţie, ca să fie ca restul
			return;
		}

		const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
		const jsonUrl = section === 'tutorials' ? 'assets/data/tutorials.json' :
			section === 'tools' ? 'assets/data/tools.json' :
			`assets/data/${section}.json`;

		fetch(`${jsonUrl}?v=${Date.now()}`)
			.then((res) => res.json())
			.then((data) => renderContent(sectionTitle, data, section));
	}, 300);
}

function renderWelcomeContent() {
	const contentArea = document.getElementById('content-area');
	contentArea.innerHTML = `
	<section class="text-center mb-12">
	  <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Jawwad ART</h1>
	  <p class="text-xl text-gray-300 max-w-3xl mx-auto">Discover assets for your projects.<br> High-quality costumes, hairstyles, weapons and more!</p>

	  <button onclick="toggleDiscordInvite()" class="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition flex items-center mx-auto">
		<i class="fab fa-discord mr-2"></i> Join our Discord server
	  </button>

	  <div id="discord-invite" class="mt-4 hidden max-w-md mx-auto bg-black bg-opacity-50 p-4 rounded-lg">
		<p class="text-gray-300 mb-2">Join my discord for chat, updates and support:</p>
		<div class="flex items-center justify-between bg-gray-800 p-3 rounded">
		  <code class="text-purple-300">https://discord.gg/BBX8vfN4gQ</code>
		  <button onclick="copyDiscordInvite()" class="text-pink-400 hover:text-pink-300">
			<i class="fas fa-copy"></i>
		  </button>
		</div>
	  </div>
	</section>
  `;
	animateContent();
}


function renderContent(title, items, section) {
	const contentArea = document.getElementById('content-area');

	let gridCols = 'grid-cols-1';
	if (['tutorials', 'tools'].includes(section)) gridCols = 'grid-cols-1 sm:grid-cols-2';
	else gridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

	const content = `
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
	  <div class="bg-black bg-opacity-30 rounded-none p-6">
		<div class="cursor-pointer mb-4" onclick="openModal('${item.full}')">
		  <img src="${item.img}" alt="${item.title}" class="w-full h-64 object-cover rounded-none hover:opacity-80 transition">
		</div>
		<h3 class="text-2xl font-bold text-white mb-2">${item.title}</h3>
		<p class="text-gray-300 mb-4">${item.desc}</p>
		<div class="flex space-x-4">
		  <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-none">Price: ${item.price}</div>
		  <a href="${item.discord}" target="_blank" class="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-none hover:from-purple-600 hover:to-pink-700 transition">
			<i class="fab fa-discord mr-2"></i> Contact
		  </a>
		</div>
	  </div>`;
	}

	if (section === 'free') {
		return `
	<div class="gallery-item bg-gradient-to-br from-gray-800 to-gray-900 rounded-none shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer" onclick="openModal('${item.full}')">
	  <img src="${item.img}" alt="${item.title}" class="w-full h-72 object-cover rounded-none">
	  <div class="p-4">
		<h3 class="text-lg font-medium text-white">${item.title}</h3>
	  </div>
	  ${item.download ? `
		<div class="px-4 pb-4">
		  <button class="w-full py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-none hover:from-green-600 hover:to-teal-700 transition">
			<a href="${item.download}" download onclick="event.stopPropagation()">
			  <i class="fas fa-download mr-2"></i> Download
			</a>
		  </button>
		  ${item.extra ? `<p class="mt-2 text-white ">${item.extra}</p>` : ''}
		</div>` : ''}
	</div>`;
	}

	if (section === 'tutorials') {
		return `
	  <div class="bg-black bg-opacity-30 rounded-none p-6">
		<h3 class="text-xl font-bold text-white mb-4">${item.title}</h3>
		<iframe class="w-full rounded-none" style="height: 400px;" src="https://www.youtube.com/embed/${item.youtube}" frameborder="0" allowfullscreen></iframe>
	  </div>`;
	}

	return `
	<div class="gallery-item bg-gradient-to-br from-gray-800 to-gray-900 rounded-none shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer" onclick="openModal('${item.full}')">
	  <img src="${item.img}" alt="${item.title}" class="w-full h-72 object-cover rounded-none">
	  <div class="p-4"><h3 class="text-lg font-medium text-white">${item.title}</h3></div>
	</div>`;
}

function animateContent() {
	const contentArea = document.getElementById('content-area');
	contentArea.classList.remove('opacity-0');
}

// ===== WELCOME PAGE =====
function loadWelcome() {
	localStorage.setItem('currentPage', 'welcome');

	const contentArea = document.getElementById('content-area');
	contentArea.classList.add('opacity-0', 'transition-opacity', 'duration-300'); // 🟢 Adaug fade-out
	document.getElementById('mobile-menu').classList.add('hidden');

	setTimeout(() => {
		const welcomeContent = `
	  <section class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Jawwad ART</h1>
		<p class="text-xl text-gray-300 max-w-3xl mx-auto">Discover assets for your projects.<br> High-quality costumes, hairstyles, weapons and more!</p>

		<button onclick="toggleDiscordInvite()" class="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition flex items-center mx-auto">
		  <i class="fab fa-discord mr-2"></i> Join our Discord server
		</button>

		<div id="discord-invite" class="mt-4 hidden max-w-md mx-auto bg-black bg-opacity-50 p-4 rounded-lg">
		  <p class="text-gray-300 mb-2">Join my discord for chat, updates and support:</p>
		  <div class="flex items-center justify-between bg-gray-800 p-3 rounded">
			<code class="text-purple-300">https://discord.gg/BBX8vfN4gQ</code>
			<button onclick="copyDiscordInvite()" class="text-pink-400 hover:text-pink-300">
			  <i class="fas fa-copy"></i>
			</button>
		  </div>
		</div>
	  </section>
	`;

		contentArea.innerHTML = welcomeContent;
		animateContent(); // 🟢 Fade-in după ce s-a injectat conţinutul
	}, 300);
}