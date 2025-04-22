const sections = {
  costume: {
    title: "Costume",
    images: [
      "https://via.placeholder.com/300x400/6a00ff/ffffff?text=Costum+1",
      "https://via.placeholder.com/300x400/6a00ff/ffffff?text=Costum+2"
    ]
  },
  frizuri: {
    title: "Frizuri",
    images: [
      "https://via.placeholder.com/300x400/aa00ff/ffffff?text=Frizură+1",
      "https://via.placeholder.com/300x400/aa00ff/ffffff?text=Frizură+2"
    ]
  },
  arme: {
    title: "Arme",
    images: [
      "https://via.placeholder.com/300x400/ff00aa/ffffff?text=Armă+1",
      "https://via.placeholder.com/300x400/ff00aa/ffffff?text=Armă+2"
    ]
  },
  altele: {
    title: "Altele",
    images: [
      "assets/img/ninjaflex.jpg",
      "assets/img/ninjaflex2.jpg"
    ]
  }
};

function loadSection(name) {
  const content = document.getElementById("content");
  const data = sections[name];
  if (!data) return;

  // Fade out
  content.classList.remove("active");
  setTimeout(() => {
    content.innerHTML = `
      <h2>${data.title}</h2>
      <div class="grid">
        ${data.images.map(src => `<img src="${src}" alt="${data.title}" />`).join("")}
      </div>
    `;
    // Fade in
    setTimeout(() => content.classList.add("active"), 10);
  }, 300);
}

function router() {
  const hash = window.location.hash.substring(1);
  if (hash && sections[hash]) {
    loadSection(hash);
  } else {
    document.getElementById("content").innerHTML = `
      <h2>Bine ai venit la Jawwad ART</h2>
      <p>Selectează o categorie din meniu.</p>
    `;
    document.getElementById("content").classList.add("active");
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// Click to zoom
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG' && e.target.closest('.grid')) {
    const overlay = document.getElementById('overlay');
    const overlayImg = overlay.querySelector('img');
    overlayImg.src = e.target.src;
    overlay.style.display = 'flex';
  }
});

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}


