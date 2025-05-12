function copyDiscordTag() {
	navigator.clipboard.writeText("1.3afb").then(() => showToast("Discord tag copied to clipboard!"));
}

function copyDiscordInvite() {
	navigator.clipboard.writeText("https://discord.gg/BBX8vfN4gQ").then(() => showToast("Discord invite link copied!"));
}

function toggleDiscordInvite() {
	document.getElementById("discord-invite").classList.toggle("hidden");
}

function showToast(message) {
	const toast = document.getElementById("toast");
	document.getElementById("toast-message").textContent = message;
	toast.classList.remove("hidden");
	setTimeout(() => toast.classList.add("hidden"), 3000);
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

		const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
		const jsonUrl = section === 'tutorials'
			? 'assets/data/tutorials.json'
			: section === 'tools'
				? 'assets/data/tools.json'
				: `assets/data/${section}.json`;

		fetch(`${jsonUrl}?v=${Date.now()}`)
			.then(res => res.json())
			.then(data => renderContent(sectionTitle, data, section));
	}, 300);
}

function renderWelcomeContent() {
	const contentArea = document.getElementById("content-area");
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
	contentArea.classList.remove("opacity-0");
}

function renderContent(title, items, section) {
	const contentArea = document.getElementById("content-area");
	const gridCols = ['tutorials', 'tools'].includes(section)
		? "grid-cols-1 sm:grid-cols-2"
		: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

	const content = `
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">${title}</h2>
      <div class="grid ${gridCols} gap-6">
        ${items.map(item => renderItem(item, section)).join("")}
      </div>
    </section>
  `;

	contentArea.innerHTML = content;
	contentArea.classList.remove("opacity-0");
}

function renderItem(item, section) {
	const imageWithPreviewButton = `
    <div class="relative">
      <img src="${item.img}" alt="${item.title}" class="w-full h-72 object-cover rounded-none">
      <button onclick="openModal('${item.full}')" class="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded hover:bg-opacity-80 transition" title="Preview image">
        <i class="fas fa-expand"></i>
      </button>
    </div>
  `;

	if (section === 'tools') {
		return `
      <div class="bg-black bg-opacity-30 rounded-none p-6">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        <div class="mb-4">${imageWithPreviewButton}</div>
        <p class="text-gray-300 mb-4">${item.desc}</p>
        <div class="flex space-x-4">
          <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-none">Price: ${item.price}</div>
          <a href="${item.discord}" target="_blank" class="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-none hover:from-purple-600 hover:to-pink-700 transition">
            <i class="fab fa-discord mr-2"></i> Contact
          </a>
        </div>
      </div>
    `;
	}

	if (section === 'free') {
		return `
      <div class="gallery-item bg-gradient-to-br from-gray-800 to-gray-900 rounded-none shadow-lg overflow-hidden transition duration-300">
        ${imageWithPreviewButton}
        <div class="p-4"><h3 class="text-lg font-medium text-white">${item.title}</h3></div>
        ${item.download ? `
          <div class="px-4 pb-4">
            <a href="${item.download}" download class="block w-full py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white text-center rounded-none hover:from-green-600 hover:to-teal-700 transition">
              <i class="fas fa-download mr-2"></i> Download
            </a>
            ${item.extra ? `<p class="mt-2 text-white">${item.extra}</p>` : ''}
          </div>` : ''}
      </div>
    `;
	}

	if (section === 'tutorials') {
		return `
      <div class="bg-black bg-opacity-30 rounded-none p-6">
        <h3 class="text-xl font-bold text-white mb-4">${item.title}</h3>
        <iframe class="w-full rounded-none" style="height: 400px;" src="https://www.youtube.com/embed/${item.youtube}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;
	}

	// Default pentru costumes, hairstyles, weapons, others
	return `
    <div class="gallery-item bg-gradient-to-br from-gray-800 to-gray-900 rounded-none shadow-lg overflow-hidden transition duration-300">
      ${imageWithPreviewButton}
      <div class="p-4"><h3 class="text-lg font-medium text-white">${item.title}</h3></div>
    </div>
  `;
}

// === EVENTS ===

window.addEventListener("DOMContentLoaded", () => {
	const savedPage = localStorage.getItem("currentPage");
	savedPage ? loadContent(savedPage) : renderWelcomeContent();
});

document.getElementById("mobile-menu-button").addEventListener("click", () => {
	document.getElementById("mobile-menu").classList.toggle("hidden");
});

document.getElementById("image-modal").addEventListener("click", (e) => {
	if (e.target === e.currentTarget) closeModal();
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") closeModal();
});

document.querySelectorAll(".dropdown-content a").forEach((link) => {
	link.addEventListener("click", toggleDropdown);
});
