// ======= FUNCȚII UTILE =======
function copyDiscordTag() {
	navigator.clipboard.writeText("1.3afb").then(() => showToast("Discord tag copied to clipboard!"));
}

function copyPassword(pass) {
	navigator.clipboard.writeText(pass).then(() => showToast('Password copied to clipboard!'));
}

function copyDiscordInvite() {
	navigator.clipboard.writeText("https://discord.gg/BBX8vfN4gQ").then(() => showToast("Discord invite link copied!"));
}

function toggleDiscordInvite() {
	document.getElementById("discord-invite").classList.toggle("hidden");
}

function showToast(message) {
	const toast = document.getElementById("toast");
	const box = toast.querySelector(".toast-box");
	const messageSpan = document.getElementById("toast-message");

	messageSpan.textContent = message;
	toast.classList.remove("hidden");
	box.classList.remove("hide");
	box.classList.add("show");

	setTimeout(() => {
		box.classList.remove("show");
		box.classList.add("hide");
		setTimeout(() => {
			toast.classList.add("hidden");
		}, 500); // durata animației floatOut
	}, 2500);
}

function openModal(src) {
	const modal = document.getElementById("image-modal");
	document.getElementById("modal-image").src = src;
	modal.classList.remove("hidden");
	document.body.style.overflow = "hidden";
}

function closeModal() {
	document.getElementById("image-modal").classList.add("hidden");
	document.body.style.overflow = "auto";
}

function toggleDropdown() {
	const dropdown = document.querySelector(".dropdown");
	const icon = dropdown.querySelector(".dropbtn i");
	dropdown.classList.toggle("active");
	icon.style.transform = dropdown.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
}

function animateContent() {
	document.getElementById("content-area").classList.remove("opacity-0");
}

// ======= PAGINA WELCOME =======
function renderWelcomeContent() {
	localStorage.setItem("currentPage", "welcome");
	const contentArea = document.getElementById("content-area");
	contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
	document.getElementById("mobile-menu").classList.add("hidden");

	setTimeout(() => {
		contentArea.innerHTML = `
      <section class="text-center mb-12">
<h1 class="subtle-gradient-text text-5xl md:text-6xl font-semibold mb-5">
  Jawwad ART
</h1>
<p class="motto-subtle text-gray-400 max-w-3xl mx-auto text-center text-lg md:text-xl">
  Discover assets for your projects.<br>
  <span class="highlight-subtle">High-quality costumes, hairstyles, weapons and more!</span>
</p>

<!-- Discord Button -->
<button onclick="toggleDiscordInvite()" class="discord-button">
  <i class="fab fa-discord mr-2"></i> Join our Discord server
</button>

<!-- Discord Invite Box -->
<div id="discord-invite" class="discord-box hidden">
  <p class="text-gray-300 mb-2">Join my Discord for chat, updates and support:</p>
  <div class="flex items-center justify-between bg-gray-800 p-3 rounded">
    <code class="text-purple-300">https://discord.gg/BBX8vfN4gQ</code>
    <button onclick="copyDiscordInvite()" class="copy-btn" title="Copy to clipboard">
      <i class="fas fa-copy"></i>
    </button>
  </div>
</div>
<button onclick="loadContent('about')" class="btn-premium">
  <i class="fas fa-user mr-2"></i> About Me
</button>
        <br />
<div class="animated-info-box">
  <div class="animated-header">
    <div class="animated-icon">
      <i class="fas fa-info-circle"></i>
    </div>
    <div class="animated-title">Important Information</div>
  </div>
  <ul class="animated-list">
    <li><i class="fas fa-check-circle"></i> MSM files are always included.</li>
    <li><i class="fas fa-check-circle"></i> Icons are always included.</li>
    <li><i class="fas fa-check-circle"></i> Granny 2.11 is required for all models.</li>
  </ul>
</div>
      </section>
    `;
		animateContent();
	}, 300);
}

// ======= ÎNCARCĂ CATEGORIE SIMPLĂ =======
function loadContent(section) {
	section = section.split("?")[0];
	localStorage.setItem("currentPage", section);
	const contentArea = document.getElementById("content-area");
	contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
	document.getElementById("mobile-menu").classList.add("hidden");

	setTimeout(() => {
		if (section === "welcome") {
			renderWelcomeContent();
			return;
		}
		if (section === "about") {
			renderAboutMePage();
			return;
		}

		const title = section.charAt(0).toUpperCase() + section.slice(1);
		const jsonUrl = section === 'tutorials' ?
			'assets/data/tutorials.json' :
			section === 'tools' ?
			'assets/data/tools.json' :
			`assets/data/${section}.json`;

		fetch(`${jsonUrl}?v=${Date.now()}`)
			.then(res => res.json())
			.then(data => renderContent(title, data, section));
	}, 300);
}

function renderContent(title, items, section) {
	const contentArea = document.getElementById("content-area");

	const gridCols = ['tutorials', 'tools'].includes(section) ?
		"grid-cols-1 sm:grid-cols-2" :
		"grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

	const content = `
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">${title}</h2>
      <div class="grid ${gridCols} gap-6">
        ${items.map(item => renderItem(item, section)).join("")}
      </div>
    </section>
  `;

	contentArea.innerHTML = content;
	animateContent();
}

// ======= PAGINA UNIVERSALĂ: ASSETS =======
function loadAllAssets() {
	localStorage.setItem("currentPage", "assets");
	const contentArea = document.getElementById("content-area");
	contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
	document.getElementById("mobile-menu").classList.add("hidden");

	const categories = ['costumes', 'hairstyles', 'weapons', 'others', 'free'];
	const categoryTitles = {
		costumes: "Costumes",
		hairstyles: "Hairstyles",
		weapons: "Weapons",
		others: "Others",
		free: "Free stuff"
	};

	setTimeout(async () => {
		let fullContent = '';
		let floatingLinks = '';

		for (const category of categories) {
			const res = await fetch(`assets/data/${category}.json?v=${Date.now()}`);
			const data = await res.json();

			// Dacă există cel puțin 1 item în categorie, îl adaugăm
			if (data.length > 0) {
				floatingLinks += `<a href="#${category}" class="block px-3 py-2 text-white bg-gray-800 rounded hover:bg-pink-600 transition text-sm" id="link-${category}">${categoryTitles[category]}</a>`;

				fullContent += `
          <section id="${category}">
            <h2 class="text-2xl font-semibold mb-4 text-pink-400 border-b border-gray-700 pb-2">${categoryTitles[category]}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              ${data.map(item => renderItem(item, category)).join("")}
            </div>
          </section>
        `;
			}
		}

		// Dacă nu e nimic, arătăm mesaj frumos
		if (fullContent === '') {
			contentArea.innerHTML = `
        <div class="text-center mt-24 text-gray-400 text-lg">No assets available at the moment. Please check back later!</div>
      `;
		} else {
			contentArea.innerHTML = `
        <aside class="fixed top-24 left-4 space-y-2 z-50">${floatingLinks}</aside>
        <div class="ml-32 space-y-12">${fullContent}</div>
      `;
			setupScrollSpy(categories); // scrollspy merge doar pe cele afișate
		}

		animateContent();
	}, 300);
}

function renderItem(item, section) {
	const imageWithPreviewButton = item.img ? `
    <div class="relative mb-4">
      <img src="${item.img}" alt="${item.title}" class="asset-card-media">
      <button onclick="openModal('${item.full || item.img}')" class="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded hover:bg-opacity-80 transition" title="Preview image">
        <i class="fas fa-expand"></i>
      </button>
    </div>` : '';

	const priceBtn = item.price ? `
    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm rounded-none">
      Price: ${item.price}
    </div>` : '';

	const previewBtn = item.preview ? `
    <a href="${item.preview}" target="_blank" class="asset-action-btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <i class="fas fa-eye"></i> Preview
    </a>` : '';

	// === FREE ===
	if (section === 'free') {
		return `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        ${imageWithPreviewButton}
        <div class="px-4 pb-4 flex flex-wrap gap-2">
          ${item.download ? `<a href="${item.download}" download class="asset-action-btn bg-gradient-to-r from-green-500 to-teal-600 text-white"><i class="fas fa-download"></i> Download</a>` : ''}
          ${previewBtn}
          ${item.extra ? `<button onclick="copyPassword('${item.extra}')" class="asset-action-btn bg-gradient-to-r from-purple-500 to-pink-600 text-white"><i class="fas fa-key"></i> Password</button>` : ''}
        </div>
      </div>`;
	}

	// === TUTORIALS ===
	if (section === 'tutorials') {
		return `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        <iframe class="asset-card-iframe mb-4" src="https://www.youtube.com/embed/${item.youtube}" frameborder="0" allowfullscreen></iframe>
      </div>`;
	}

	// === TOOLS ===
	if (section === 'tools') {
		return `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        ${imageWithPreviewButton}
        <p class="text-gray-300 mb-4 flex-1">${item.desc}</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          ${priceBtn}
          ${previewBtn}
        </div>
      </div>`;
	}

	// === DEFAULT (costumes, hairstyles, weapons, others)
	return `
    <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
      <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
      ${imageWithPreviewButton}
      <div class="flex flex-wrap gap-2 mt-4">
        ${priceBtn}
        ${previewBtn}
      </div>
    </div>`;
}

// ======= FLOATING MENU ACTIVE =======
function setupScrollSpy(categories) {
	const links = categories.map(cat => document.getElementById(`link-${cat}`));
	const sections = categories.map(cat => document.getElementById(cat));

	window.addEventListener('scroll', () => {
		let index = sections.length - 1;
		for (let i = 0; i < sections.length; i++) {
			if (window.scrollY >= sections[i].offsetTop - 150) {
				index = i;
			}
		}
		links.forEach(link => link.classList.remove('bg-pink-600'));
		links[index].classList.add('bg-pink-600');
	});
}

// ======= INIT =======
window.addEventListener("DOMContentLoaded", () => {
	const savedPage = localStorage.getItem("currentPage");
	if (savedPage === 'assets') {
		loadAllAssets();
	} else if (savedPage) {
		loadContent(savedPage);
	} else {
		renderWelcomeContent();
	}
});

document.getElementById("mobile-menu-button").addEventListener("click", () => {
	document.getElementById("mobile-menu").classList.toggle("hidden");
});

document.getElementById("image-modal").addEventListener("click", e => {
	if (e.target === e.currentTarget) closeModal();
});

document.addEventListener("keydown", e => {
	if (e.key === "Escape") closeModal();
});

document.querySelectorAll(".dropdown-content a").forEach(link => {
	link.addEventListener("click", toggleDropdown);
});

function renderAboutMePage() {
	const contentArea = document.getElementById("content-area");
	localStorage.setItem("currentPage", "about");
	contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
	document.getElementById("mobile-menu").classList.add("hidden");

	setTimeout(() => {
		contentArea.innerHTML = `
      <section class="text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-pink-500 mb-6">About Me</h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8">
       Hi, I’m Jawwad! I specialize in 3D design and modeling for Metin2, with years of experience under my belt. I was one of the first designers to enter the scene and continue to bring creativity and skill to every project I take on.</p>
        <div class="grid sm:grid-cols-2 gap-6 text-left text-white">
<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">🎨 Custom 2D Work</h2>
  <p class="mb-2">I offer a range of fully customizable 2D design services for Metin2, including:</p>
  <ul class="list-disc list-inside space-y-1">
    <li>Costumes, armors, hairstyles & weapons</li>
    <li>Mounts, pets, and GR2-based objects</li>
    <li>Specular creation and correction</li>
    <li>Renders (full hd, 2k)</li>
    <li>Icons (like official)</li>
  </ul>
</div>
<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">🧰 Custom 3D Work</h2>
  <p class="mb-2">Bringing your Metin2 world to life with detailed, high-quality 3D models, tailored to your vision:</p>
  <ul class="list-disc list-inside space-y-1">
    <li>Costumes, armors, hairstyles & weapons</li>
    <li>Mounts, pets, and NPCs</li>
    <li>Metin stones and animated objects</li>
    <li>Custom-designed wings</li>
    <li>Animations</li>
  </ul>
</div>
<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">🛠️ Tools</h2>
  <p class="mb-2">Whether you're just starting out or already experienced, I’ve got the best and easiest-to-use tools to support your workflow:</p>
  <ul class="list-disc list-inside space-y-1">
    <li>MDE Path Changer – quickly update paths in your .mde files</li>
    <li>GR2 Mesh Remover – remove unnecessary meshes with ease</li>
  </ul>
</div>
<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">📚 Tutorials</h2>
  <p>On the site, you'll find some of the most useful and beginner-friendly tutorials to help you grow your skills in both 2D and 3D design — all completely free. Whether you're just starting out or looking to improve, there's something here for everyone.</p>
</div>
<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">🎁 Free Stuff</h2>
  <p>I offer a variety of free assets ready to enhance your Metin2 server — all pre-configured and easy to install. Just browse the site and download what you need, no strings attached!</p>
</div>

<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">💬 Support</h2>
  <p>Have a question or need help with something? I'm always available on Discord for support. Don't hesitate to reach out — no question is too small!</p>
</div>
<div class="bg-black bg-opacity-30 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-2">🔧 Many More</h2>
  <p>I offer a wide range of services and assets — if what you're looking for isn't listed here, don't hesitate to ask. I might just have the solution you're looking for! 😉</p>
</div>

        </div>

        <button onclick="renderWelcomeContent()" class="mt-10 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition">
          ← Back to Welcome
        </button>
      </section>
    `;
		animateContent();
	}, 300);
}

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const navbarMenu = document.querySelector(".navbar-menu");

  if (menuBtn && navbarMenu) {
    menuBtn.addEventListener("click", () => {
      navbarMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });
  }
});