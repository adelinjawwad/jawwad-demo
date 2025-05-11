// 🔒 PASSWORD
const ADMIN_PASS = 'jawwad123';

function checkPassword() {
  const input = document.getElementById('adminPassword').value;
  const errorMsg = document.getElementById('loginError');
  if (input === ADMIN_PASS) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminTopbar').classList.remove('hidden');
    document.getElementById('adminContent').classList.remove('hidden');
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

// === AFISEAZĂ DOAR CAMPURILE RELEVANTE
function showRelevantFields() {
  const cat = document.getElementById('categorySelect').value;
  ['sharedFields', 'tutorialFields', 'toolsFields', 'freeFields'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  if (['costumes', 'hairstyles', 'weapons', 'others', 'free'].includes(cat)) {
    document.getElementById('sharedFields').classList.remove('hidden');
  }
  if (cat === 'tutorials') {
    document.getElementById('tutorialFields').classList.remove('hidden');
  }
  if (cat === 'tools') {
    document.getElementById('toolsFields').classList.remove('hidden');
    document.getElementById('sharedFields').classList.remove('hidden');
  }
  if (cat === 'free') {
    document.getElementById('freeFields').classList.remove('hidden');
  }
}

// === ÎNCARCĂ ITEMELE
function loadItems() {
  currentCategory = document.getElementById('categorySelect').value;
  if (!currentCategory) {
    alert('Selectează o categorie!');
    return;
  }
  fetch(`assets/data/${currentCategory}.json`)
    .then(res => res.json())
    .then(data => {
      currentItems = data;
      displayItems();
    });
}

// === AFIȘEAZĂ ITEMELE ÎN GRID
function displayItems() {
  const container = document.getElementById('itemsContainer');
  container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'; // exact ca pe site

  container.innerHTML = '';
  currentItems.forEach((item, index) => {
    container.innerHTML += `
      <div class="gallery-item bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
        ${item.img ? `<img src="${item.img}" alt="${item.title}" class="w-full h-72 object-cover">` : ''}
        <div class="p-4">
          <h3 class="text-lg font-medium text-white mb-2">${item.title}</h3>
          <small class="text-gray-400 text-xs break-all block mb-3">
            ${item.img ? `${item.img}<br>` : ''}
            ${item.youtube ? 'YouTube: ' + item.youtube + '<br>' : ''}
            ${item.extra ? item.extra + '<br>' : ''}
          </small>
          <div class="flex space-x-2">
            <button onclick="editItem(${index})" class="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 flex-1 text-sm flex items-center justify-center">
              <i class="fas fa-edit mr-1"></i>Edit
            </button>
            <button onclick="deleteItem(${index})" class="bg-red-600 hover:bg-red-700 px-3 py-1 flex-1 text-sm flex items-center justify-center">
              <i class="fas fa-trash mr-1"></i>Delete
            </button>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('itemsCount').textContent = `${currentItems.length} item(s) loaded`;
}


// === ADAUGĂ / EDITEAZĂ ITEM
function addItem() {
  const title = document.getElementById('newTitle').value.trim();
  const cat = currentCategory;
  if (!title || !cat) {
    alert('Completează titlul și selectează categoria!');
    return;
  }

  let newItem = { title };

  if (['costumes', 'hairstyles', 'weapons', 'others', 'free'].includes(cat)) {
    const img = document.getElementById('newImg').value.trim();
    const full = document.getElementById('newFull').value.trim();
    if (!img || !full) {
      alert('Completează toate câmpurile!');
      return;
    }
    newItem.img = img;
    newItem.full = full;
    if (cat === 'free') {
      newItem.extra = document.getElementById('newFreeDesc').value.trim();
    }
  }

  if (cat === 'tutorials') {
    const youtube = document.getElementById('newYoutube').value.trim();
    const desc = document.getElementById('newTutorialDesc').value.trim();
    if (!youtube) {
      alert('Completează YouTube ID!');
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
      alert('Completează toate câmpurile!');
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

// === EDITARE ITEM
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

// === ȘTERGERE ITEM
function deleteItem(index) {
  if (confirm('Sigur vrei să ștergi acest item?')) {
    currentItems.splice(index, 1);
    displayItems();
  }
}

// === SALVARE JSON
function saveData() {
  if (!currentCategory) {
    alert('Selectează și încarcă o categorie!');
    return;
  }

  const jsonStr = JSON.stringify(currentItems, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentCategory}.json`;
  a.click();
  URL.revokeObjectURL(url);

  alert(`Fișierul ${currentCategory}.json a fost descărcat! Urcă-l manual pe GitHub în folderul assets/data.`);
}

// === CLEAR FORM
function clearInputs() {
  ['newTitle', 'newImg', 'newFull', 'newYoutube', 'newTutorialDesc', 'newDesc', 'newPrice', 'newDiscord', 'newFreeDesc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  editIndex = -1;
}
