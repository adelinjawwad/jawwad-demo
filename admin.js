// 🔒 SIMPLE PASSWORD PROTECTION
const ADMIN_PASS = 'jawwad123';  // 🔑 Setează parola ta aici

function checkPassword() {
  const input = document.getElementById('adminPassword').value;
  const errorMsg = document.getElementById('loginError');
  if (input === ADMIN_PASS) {
    document.getElementById('loginScreen').style.display = 'none';
  } else {
    errorMsg.classList.remove('hidden');
  }
}

let currentCategory = '';
let currentItems = [];

function loadItems() {
  currentCategory = document.getElementById('categorySelect').value;
  fetch(`assets/data/${currentCategory}.json`)
    .then(res => res.json())
    .then(data => {
      currentItems = data;
      displayItems();
    });
}

function displayItems() {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';
  currentItems.forEach((item, index) => {
    container.innerHTML += `
      <div class="bg-gray-800 p-4 rounded flex justify-between items-center">
        <div>
          <strong>${item.title}</strong><br>
          <small class="text-sm text-gray-400">
            ${item.img ? item.img : ''}
            ${item.youtube ? ' (YouTube: ' + item.youtube + ')' : ''}
            ${item.desc ? '<br>' + item.desc : ''}
          </small>
        </div>
        <button onclick="deleteItem(${index})" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
      </div>
    `;
  });
}

function addItem() {
  const title = document.getElementById('newTitle').value.trim();

  if (!title) {
    alert('Completează titlul!');
    return;
  }

  let newItem = { title };

  if (['costumes', 'hairstyles', 'weapons', 'others', 'free'].includes(currentCategory)) {
    const img = document.getElementById('newImg').value.trim();
    const full = document.getElementById('newFull').value.trim();
    if (!img || !full) {
      alert('Completează toate câmpurile!');
      return;
    }
    newItem.img = img;
    newItem.full = full;
  }

  if (currentCategory === 'tutorials') {
    const youtube = document.getElementById('newYoutube').value.trim();
    const desc = document.getElementById('newTutorialDesc').value.trim();
    if (!youtube) {
      alert('Completează YouTube ID!');
      return;
    }
    newItem.youtube = youtube;
    newItem.desc = desc;
  }

  if (currentCategory === 'tools') {
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

  currentItems.push(newItem);
  displayItems();
  clearInputs();
}

function deleteItem(index) {
  if (confirm('Sigur vrei să ștergi acest item?')) {
    currentItems.splice(index, 1);
    displayItems();
  }
}

function saveData() {
  if (!currentCategory) {
    alert('Selectează și încarcă o categorie mai întâi!');
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

function clearInputs() {
  document.getElementById('newTitle').value = '';
  document.getElementById('newImg').value = '';
  document.getElementById('newFull').value = '';
  document.getElementById('newYoutube').value = '';
  document.getElementById('newTutorialDesc').value = '';
  document.getElementById('newDesc').value = '';
  document.getElementById('newPrice').value = '';
  document.getElementById('newDiscord').value = '';
}
