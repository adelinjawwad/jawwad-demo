// 🔒 SIMPLE PASSWORD PROTECTION
const ADMIN_PASS = 'jawwad123';

function checkPassword() {
	const input = document.getElementById('adminPassword').value;
	const errorMsg = document.getElementById('loginError');
	if (input === ADMIN_PASS) {
		document.getElementById('loginScreen').style.display = 'none';
		document.getElementById('adminTopbar').classList.remove('hidden');
	} else {
		errorMsg.classList.remove('hidden');
	}
}

function logout() {
	location.reload();
}

let currentCategory = '';
let currentItems = [];
let editIndex = -1;

function showRelevantFields() {
	const cat = document.getElementById('categorySelect').value;

	document.getElementById('sharedFields').classList.add('hidden');
	document.getElementById('tutorialFields').classList.add('hidden');
	document.getElementById('toolsFields').classList.add('hidden');
	document.getElementById('freeFields').classList.add('hidden');

	if (['costumes', 'hairstyles', 'weapons', 'others', 'tools', 'free'].includes(cat)) {
		document.getElementById('sharedFields').classList.remove('hidden');
	}
	if (cat === 'tutorials') {
		document.getElementById('tutorialFields').classList.remove('hidden');
	}
	if (cat === 'tools') {
		document.getElementById('toolsFields').classList.remove('hidden');
	}
	if (cat === 'free') {
		document.getElementById('freeFields').classList.remove('hidden');
	}
}

function loadItems() {
	currentCategory = document.getElementById('categorySelect').value;
	if (!currentCategory) {
		showToast('Selectează o categorie mai întâi!', 'error');
		return;
	}
	fetch(`assets/data/${currentCategory}.json`)
		.then(res => res.json())
		.then(data => {
			currentItems = data;
			displayItems();
		});
}

function getYoutubeId(url) {
  const regExp = /^.*(youtu\.be\/|v=|\/embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function displayItems() {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';
  currentItems.forEach((item, index) => {
    container.innerHTML += `
      <div style="
        background-color: #2d3748;
        padding: 1.25rem;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <div style="max-width: 100%;">
          <strong style="font-size: 1.25rem; color: #edf2f7;">${item.title}</strong><br>
          ${item.img ? `<img src="${item.img}" style="width: 100%; max-height: 250px; object-fit: cover; margin: 0.75rem 0;">` : ''}
          <small style="font-size: 0.875rem; color: #a0aec0; line-height: 1.4;">
${item.youtube ? `
  <img src="https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg" style="width: 100%; max-height: 200px; object-fit: cover; margin: 0.75rem 0; border-radius: 0.25rem;">
  <br><a href="https://www.youtube.com/watch?v=${item.youtube}" target="_blank" style="color: #63b3ed; text-decoration: underline;">Vezi pe YouTube</a><br>
` : ''}
            ${item.desc ? item.desc + '<br>' : ''}
            ${item.extra ? item.extra : ''}
          </small>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 0.75rem;">
          <button onclick="editItem(${index})" style="
            background-color: #ecc94b;
            color: #1a202c;
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: background-color 0.3s ease;
          "
          onmouseover="this.style.backgroundColor='#d69e2e'"
          onmouseout="this.style.backgroundColor='#ecc94b'">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button onclick="deleteItem(${index})" style="
            background-color: #e53e3e;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: background-color 0.3s ease;
          "
          onmouseover="this.style.backgroundColor='#9b2c2c'"
          onmouseout="this.style.backgroundColor='#e53e3e'">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
  });
  document.getElementById('itemsCount').textContent = `${currentItems.length} item(s) loaded`;
}

function addItem() {
	const title = document.getElementById('newTitle').value.trim();
	const cat = currentCategory;
	if (!title || !cat) {
		showToast('Completează titlul și selectează categoria!', 'error');
		return;
	}

	let newItem = {
		title
	};

	if (['costumes', 'hairstyles', 'weapons', 'others', 'free'].includes(cat)) {
		const img = document.getElementById('newImg').value.trim();
		const full = document.getElementById('newFull').value.trim();
		

		// Doar pentru free adăugăm extra
		let extra = '';
		if (cat === 'free') {
			extra = document.getElementById('newFreeDesc').value.trim();
		}

		if (!img || !full) {
			showToast('Completează toate câmpurile!', 'error');
			return;
		}
		newItem.img = img;
		newItem.full = full;
	}

	if (['costumes', 'hairstyles', 'weapons', 'others'].includes(cat)) {
  	newItem.price = document.getElementById('newPrice').value.trim();
  	newItem.preview = document.getElementById('newPreview').value.trim();
	}

	if (cat === 'free') {
		const extra = document.getElementById('newFreeDesc').value.trim();
		newItem.extra = extra;
	}

	if (cat === 'tutorials') {
		const youtube = document.getElementById('newYoutube').value.trim();
		const desc = document.getElementById('newTutorialDesc').value.trim();
		if (!youtube) {
			showToast('Completează YouTube ID!', 'error');
			return;
		}
		newItem.youtube = youtube;
		newItem.desc = desc;
	}

	if (cat === 'tools') {
		const img = document.getElementById('newImg').value.trim();
		const full = document.getElementById('newFull').value.trim();
		const desc = document.getElementById('newDesc').value.trim();
		const price = document.getElementById('newPrice').value.trim();
		const discord = document.getElementById('newDiscord').value.trim();
		if (!img || !full || !desc || !price || !discord) {
			showToast('Completează toate câmpurile!', 'error');
			return;
		}
		newItem.img = img;
		newItem.full = full;
		newItem.desc = desc;
		newItem.price = price;
		newItem.discord = discord;
	}

	if (editIndex > -1) {
		currentItems[editIndex] = newItem;
		editIndex = -1;
	} else {
		currentItems.push(newItem);
	}

	displayItems();
	clearInputs();
}

function editItem(index) {
	const item = currentItems[index];
	document.getElementById('newTitle').value = item.title || '';
	document.getElementById('newImg').value = item.img || '';
	document.getElementById('newFull').value = item.full || '';
	document.getElementById('newYoutube').value = item.youtube || '';
	document.getElementById('newTutorialDesc').value = item.desc || '';
	document.getElementById('newDesc').value = item.desc || '';
	document.getElementById('newPrice').value = item.price || '';
	document.getElementById('newDiscord').value = item.discord || '';
	document.getElementById('newFreeDesc').value = item.extra || '';
	editIndex = index;
}

function deleteItem(index) {
	if (confirm('Sigur vrei să ștergi acest item?')) {
		currentItems.splice(index, 1);
		displayItems();
	}
}

function showToast(message, type = 'success') {
	const toast = document.getElementById('toast');
	toast.textContent = message;
	toast.classList.remove('hidden', 'bg-green-600', 'bg-red-600');

	if (type === 'success') {
		toast.classList.add('bg-green-600');
	} else if (type === 'error') {
		toast.classList.add('bg-red-600');
	}

	setTimeout(() => {
		toast.classList.add('hidden');
	}, 3000);
}

function saveData() {
	if (!currentCategory) {
		showToast('Selectează și încarcă o categorie mai întâi!', 'error');
		return;
	}

	const jsonStr = JSON.stringify(currentItems, null, 2);
	const blob = new Blob([jsonStr], {
		type: "application/json"
	});
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = `${currentCategory}.json`;
	a.click();
	URL.revokeObjectURL(url);

	showToast(`Fișierul ${currentCategory}.json a fost descărcat!`, 'success');
}

function clearInputs() {
	document.getElementById('newTitle').value = '';
	document.getElementById('newImg').value = '';
	document.getElementById('newFull').value = '';
	document.getElementById('newYoutube').value = '';
	document.getElementById('newTutorialDesc').value = '';
	document.getElementById('newDesc').value = '';
	document.getElementById('newPrice').value = '';
	document.getElementById('newDiscord').value = '';
	document.getElementById('newFreeDesc').value = '';
	editIndex = -1;
}

const toggleBtn = document.getElementById('toggle-table-btn');
const tableWrapper = document.getElementById('table-wrapper');
const downloadsList = document.getElementById('downloads-list');

// Funcție pentru toggling
toggleBtn.addEventListener('click', () => {
  const isOpen = tableWrapper.classList.contains('open');

  if (isOpen) {
    tableWrapper.classList.remove('open');
    tableWrapper.style.maxHeight = '0px';
    toggleBtn.innerText = '📁 Afișează fișiere';
  } else {
    tableWrapper.classList.add('open');
    tableWrapper.style.maxHeight = tableWrapper.scrollHeight + 'px';
    toggleBtn.innerText = '📂 Ascunde fișiere';
  }
});

// Fetch + populare tabel + copiere link
fetch('assets/downloads/downloads.json')
  .then(res => res.json())
  .then(files => {
    files.forEach(name => {
      const fullUrl = `https://adelinjawwad.github.io/jawwad-demo/assets/downloads/${name}`;
      const shortUrl = `https://adelinjawwad.github.io/jawwad-demo/short.html?file=${encodeURIComponent(name)}`;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="px-4 py-3">
          <a href="${fullUrl}" download class="text-blue-400 hover:underline">${name}</a>
        </td>
        <td class="px-4 py-3">
          <button class="copy-btn bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs" data-url="${shortUrl}">
            Copy link
          </button>
        </td>
      `;
      downloadsList.appendChild(tr);
    });

    // Adaugă event listeners pentru butoanele de copiere
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const link = btn.getAttribute('data-url');
        navigator.clipboard.writeText(link).then(() => {
          btn.innerText = 'Copied!';
          setTimeout(() => btn.innerText = 'Copy link', 2000);
        });
      });
    });
  });
