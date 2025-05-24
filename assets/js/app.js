// ======= PERFORMANCE OPTIMIZATIONS =======
// Cache DOM elements to avoid repeated queries
const DOM = {
  contentArea: null,
  mobileMenu: null,
  toast: null,
  toastMessage: null,
  toastBox: null,
  imageModal: null,
  modalImage: null,
  init() {
    this.contentArea = document.getElementById("content-area");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.toast = document.getElementById("toast");
    this.toastMessage = document.getElementById("toast-message");
    this.toastBox = this.toast?.querySelector(".toast-box");
    this.imageModal = document.getElementById("image-modal");
    this.modalImage = document.getElementById("modal-image");
  }
};

// Debounce function for scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ======= UTILITY FUNCTIONS =======
const copyToClipboard = async (text, message) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch (err) {
    console.error('Failed to copy:', err);
    showToast('Copy failed', 'error');
  }
};

function copyDiscordTag() {
  copyToClipboard("1.3afb", "Discord tag copied to clipboard!");
}

function copyPassword(pass) {
  copyToClipboard(pass, 'Password copied to clipboard!');
}

function copyDiscordInvite() {
  copyToClipboard("https://discord.gg/BBX8vfN4gQ", "Discord invite link copied!");
}

function toggleDiscordInvite() {
  const wrapper = document.getElementById("discord-invite-wrapper");
  wrapper?.classList.toggle("open");
}

// Optimized toast with better performance
let toastTimeout;
function showToast(message, type = 'success') {
  if (!DOM.toast || !DOM.toastBox || !DOM.toastMessage) return;
  
  // Clear existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  
  DOM.toastMessage.textContent = message;
  DOM.toast.classList.remove("hidden");
  DOM.toastBox.classList.remove("hide");
  DOM.toastBox.classList.add("show");

  toastTimeout = setTimeout(() => {
    DOM.toastBox.classList.remove("show");
    DOM.toastBox.classList.add("hide");
    setTimeout(() => {
      DOM.toast.classList.add("hidden");
    }, 500);
  }, 2500);
}

// Optimized modal functions
function openModal(src) {
  if (!DOM.imageModal || !DOM.modalImage) return;
  
  DOM.modalImage.src = src;
  DOM.imageModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!DOM.imageModal) return;
  
  DOM.imageModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Optimized dropdown toggle
function toggleDropdown() {
  const dropdown = document.querySelector(".dropdown");
  if (!dropdown) return;
  
  const icon = dropdown.querySelector(".dropbtn i");
  const isActive = dropdown.classList.toggle("active");
  
  if (icon) {
    icon.style.transform = isActive ? "rotate(180deg)" : "rotate(0deg)";
  }
}

function animateContent() {
  DOM.contentArea?.classList.remove("opacity-0");
}

// ======= CONTENT RENDERING =======
function renderWelcomeContent() {
  localStorage.setItem("currentPage", "welcome");
  if (!DOM.contentArea) return;
  
  DOM.contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
  DOM.mobileMenu?.classList.add("hidden");

  setTimeout(() => {
    DOM.contentArea.innerHTML = `
      <section class="text-center mb-12">
        <p class="motto-subtle text-gray-400 max-w-3xl mx-auto text-center text-lg md:text-xl">
          Discover assets for your projects.<br>
          <span class="highlight-subtle">High-quality costumes, hairstyles, weapons and more!</span>
        </p>

        <button onclick="toggleDiscordInvite()" class="discord-button">
          <i class="fab fa-discord mr-2"></i> Join our Discord server
        </button>

        <div id="discord-invite-wrapper" class="discord-box-wrapper">
          <div id="discord-invite" class="discord-box">
            <p class="text-gray-300 mb-2">Join my Discord for chat, updates and support:</p>
            <div class="flex items-center justify-between bg-gray-800 p-3 rounded">
              <code class="text-purple-300">https://discord.gg/BBX8vfN4gQ</code>
              <button onclick="copyDiscordInvite()" class="copy-btn" title="Copy to clipboard">
                <i class="fas fa-copy"></i>
              </button>
            </div>
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
            <div class="animated-title">Information</div>
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

// Optimized content loading with better error handling
async function loadContent(section) {
  section = section.split("?")[0];
  localStorage.setItem("currentPage", section);
  
  if (!DOM.contentArea) return;
  
  DOM.contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
  DOM.mobileMenu?.classList.add("hidden");

  setTimeout(async () => {
    if (section === "welcome") {
      renderWelcomeContent();
      return;
    }
    if (section === "about") {
      renderAboutMePage();
      return;
    }

    const title = section.charAt(0).toUpperCase() + section.slice(1);
    const jsonUrl = section === 'tutorials' ? 'assets/data/tutorials.json' :
                   section === 'tools' ? 'assets/data/tools.json' :
                   `assets/data/${section}.json`;

    try {
      const response = await fetch(`${jsonUrl}?v=${Date.now()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      renderContent(title, data, section);
    } catch (error) {
      console.error('Failed to load content:', error);
      DOM.contentArea.innerHTML = `
        <div class="text-center mt-24 text-red-400 text-lg">
          Failed to load content. Please try again later.
        </div>
      `;
      animateContent();
    }
  }, 300);
}

// Optimized content rendering
function renderContent(title, items, section) {
  if (!DOM.contentArea || !Array.isArray(items)) return;

  const gridCols = ['tutorials', 'tools'].includes(section) ?
    "grid-cols-1 sm:grid-cols-2" :
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  // Use DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  const container = document.createElement('section');
  
  container.innerHTML = `
    <h2 class="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">${title}</h2>
    <div class="grid ${gridCols} gap-6">
      ${items.map(item => renderItem(item, section)).join("")}
    </div>
  `;
  
  fragment.appendChild(container);
  DOM.contentArea.innerHTML = '';
  DOM.contentArea.appendChild(fragment);
  animateContent();
}

// ======= ASSETS PAGE =======
async function loadAllAssets() {
  localStorage.setItem("currentPage", "assets");
  
  if (!DOM.contentArea) return;
  
  DOM.contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
  DOM.mobileMenu?.classList.add("hidden");

  const categories = ['costumes', 'hairstyles', 'weapons', 'others', 'free'];
  const categoryTitles = {
    costumes: "Costumes",
    hairstyles: "Hairstyles", 
    weapons: "Weapons",
    others: "Others",
    free: "Free stuff"
  };

  // Inject styles only once
  if (!document.getElementById("floating-menu-style")) {
    const style = document.createElement("style");
    style.id = "floating-menu-style";
    style.textContent = `
      @keyframes fade-slide-left {
        from { opacity: 0; transform: translateX(-16px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .animate-fade-left {
        animation: fade-slide-left 0.4s ease-out forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(async () => {
    try {
      // Fetch all categories in parallel for better performance
      const fetchPromises = categories.map(async category => {
        const response = await fetch(`assets/data/${category}.json?v=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to fetch ${category}`);
        const data = await response.json();
        return { category, data };
      });

      const results = await Promise.all(fetchPromises);
      
      let fullContent = '';
      let floatingLinks = '';

      results.forEach(({ category, data }) => {
        if (data.length > 0) {
          floatingLinks += `
            <a href="#${category}" 
               class="category-link block px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition duration-300 text-sm font-medium" 
               data-target="${category}" 
               id="link-${category}">
              ${categoryTitles[category]}
            </a>
          `;

          fullContent += `
            <section id="${category}">
              <h2 class="text-2xl font-semibold mb-4 text-pink-400 border-b border-gray-700 pb-2">${categoryTitles[category]}</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                ${data.map(item => renderItem(item, category)).join("")}
              </div>
            </section>
          `;
        }
      });

      if (fullContent === '') {
        DOM.contentArea.innerHTML = `
          <div class="text-center mt-24 text-gray-400 text-lg">No assets available at the moment. Please check back later!</div>
        `;
      } else {
        DOM.contentArea.innerHTML = `
          <aside class="fixed top-1/2 -left-3 translate-y-[-50%] z-[9999] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-r-3xl p-3 space-y-2 hover:translate-x-1 transition-all duration-300">
            ${floatingLinks}
          </aside>
          <div class="space-y-12">${fullContent}</div>
        `;

        // Staggered animation for menu links
        const links = document.querySelectorAll(".category-link");
        links.forEach((link, index) => {
          link.style.animationDelay = `${index * 0.15}s`;
          link.classList.add("animate-fade-left");
        });

        setupScrollSpy(categories);
        setupSmoothScrolling();
      }

      animateContent();
    } catch (error) {
      console.error('Failed to load assets:', error);
      DOM.contentArea.innerHTML = `
        <div class="text-center mt-24 text-red-400 text-lg">Failed to load assets. Please try again later.</div>
      `;
      animateContent();
    }
  }, 300);
}

// Optimized smooth scrolling
function setupSmoothScrolling() {
  document.querySelectorAll(".category-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const categoryId = this.getAttribute("data-target");
      const section = document.getElementById(categoryId);
      if (section) {
        const title = section.querySelector("h2");
        if (title) {
          const offset = title.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({
            top: offset,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

// Optimized item rendering
function renderItem(item, section) {
  const imageWithPreviewButton = item.img ? `
    <div class="relative mb-4">
      <img loading="lazy" src="${item.img}" alt="${item.title}" class="asset-card-media">
      <button onclick="openModal('${item.full || item.img}')" class="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded hover:bg-opacity-80 transition" title="Preview image">
        <i class="fas fa-expand"></i>
      </button>
    </div>` : '';

  const priceBtn = item.price ? `
    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm rounded-none">
      Price: ${item.price}
    </div>` : '';

  const previewBtn = item.preview ? `
    <a href="${item.preview}" target="_blank" rel="noopener noreferrer" class="asset-action-btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <i class="fas fa-eye"></i> Preview
    </a>` : '';

  // Optimized rendering based on section
  const sectionRenderers = {
    free: () => `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        ${imageWithPreviewButton}
        <div class="px-4 pb-4 flex flex-wrap gap-2">
          ${item.download ? `<a href="${item.download}" download class="asset-action-btn bg-gradient-to-r from-green-500 to-teal-600 text-white"><i class="fas fa-download"></i> Download</a>` : ''}
          ${previewBtn}
          ${item.extra ? `<button onclick="copyPassword('${item.extra}')" class="asset-action-btn bg-gradient-to-r from-purple-500 to-pink-600 text-white"><i class="fas fa-key"></i> Password</button>` : ''}
        </div>
      </div>`,
    
    tutorials: () => `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        <iframe class="asset-card-iframe mb-4" src="https://www.youtube.com/embed/${item.youtube}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>`,
    
    tools: () => `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        ${imageWithPreviewButton}
        <p class="text-gray-300 mb-4 flex-1">${item.desc}</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          ${priceBtn}
          ${previewBtn}
        </div>
      </div>`,
    
    default: () => `
      <div class="bg-black bg-opacity-30 rounded-none p-6 flex flex-col h-full">
        <h3 class="text-2xl font-bold text-white mb-4">${item.title}</h3>
        ${imageWithPreviewButton}
        <div class="flex flex-wrap gap-2 mt-4">
          ${priceBtn}
          ${previewBtn}
        </div>
      </div>`
  };

  return (sectionRenderers[section] || sectionRenderers.default)();
}

// Optimized scroll spy with debouncing
function setupScrollSpy(categories) {
  const links = categories
    .map(cat => document.getElementById(`link-${cat}`))
    .filter(Boolean);

  const sections = categories
    .map(cat => document.getElementById(cat))
    .filter(Boolean);

  if (sections.length === 0 || links.length === 0) return;

  const debouncedScrollHandler = debounce(() => {
    let index = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
      if (window.scrollY >= sections[i].offsetTop - 150) {
        index = i;
      }
    }
    
    // Use requestAnimationFrame for smooth DOM updates
    requestAnimationFrame(() => {
      links.forEach(link => link.classList.remove('bg-pink-600'));
      if (links[index]) {
        links[index].classList.add('bg-pink-600');
      }
    });
  }, 16); // ~60fps

  window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
}

// About page rendering
function renderAboutMePage() {
  if (!DOM.contentArea) return;
  
  localStorage.setItem("currentPage", "about");
  DOM.contentArea.classList.add("opacity-0", "transition-opacity", "duration-300");
  DOM.mobileMenu?.classList.add("hidden");

  setTimeout(() => {
    DOM.contentArea.innerHTML = `
      <section class="text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-pink-500 mb-6">About Me</h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8">
          Hi, I'm Jawwad! I specialize in 3D design and modeling for Metin2, with years of experience under my belt. I was one of the first designers to enter the scene and continue to bring creativity and skill to every project I take on.
        </p>
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
            <p class="mb-2">Whether you're just starting out or already experienced, I've got the best and easiest-to-use tools to support your workflow:</p>
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

// ======= INITIALIZATION =======
function initializeApp() {
  DOM.init();
  
  // Set up event listeners with better performance
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      DOM.mobileMenu?.classList.toggle("hidden");
    });
  }

  if (DOM.imageModal) {
    DOM.imageModal.addEventListener("click", e => {
      if (e.target === e.currentTarget) closeModal();
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // Optimize dropdown links
  document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", toggleDropdown);
  });

  // Optimized intersection observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe fade images
  document.querySelectorAll('.fade-img').forEach(img => {
    observer.observe(img);
  });

  // Load initial page
  const savedPage = localStorage.getItem("currentPage");
  if (savedPage === 'assets') {
    loadAllAssets();
  } else if (savedPage) {
    loadContent(savedPage);
  } else {
    renderWelcomeContent();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Mobile menu handler
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