// ======= PERFORMANCE OPTIMIZATIONS =======
// Cache DOM elements
const AdminDOM = {
  loginScreen: null,
  adminTopbar: null,
  adminToast: null,
  adminToastMessage: null,
  categorySelect: null,
  itemsContainer: null,
  itemsCount: null,
  init() {
    this.loginScreen = document.getElementById('loginScreen');
    this.adminTopbar = document.getElementById('adminTopbar');
    this.adminToast = document.getElementById('admin-toast');
    this.adminToastMessage = document.getElementById('admin-toast-message');
    this.categorySelect = document.getElementById('categorySelect');
    this.itemsContainer = document.getElementById('itemsContainer');
    this.itemsCount = document.getElementById('itemsCount');
  }
};

// ======= AUTHENTICATION =======
const ADMIN_PASS = 'jawwad123';

function checkPassword() {
  const input = document.getElementById('adminPassword')?.value;
  const errorMsg = document.getElementById('loginError');
  
  if (input === ADMIN_PASS) {
    AdminDOM.loginScreen?.style.setProperty('display', 'none');
    AdminDOM.adminTopbar?.classList.remove('hidden');
  } else {
    errorMsg?.classList.remove('hidden');
  }
}

function logout() {
  location.reload();
}

// ======= STATE MANAGEMENT =======
let currentCategory = '';
let currentItems = [];
let editIndex = -1;

// ======= FORM MANAGEMENT =======
const formFields = {
  shared: ['newImg', 'newFull', 'newDownload', 'newPrice', 'newPreview'],
  tutorial: ['newYoutube', 'newTutorialDesc'],
  tools: ['newDesc'],
  free: ['newFreeDesc']
};

function showRelevantFields() {
  const cat = AdminDOM.categorySelect?.value;
  const fieldGroups = ['sharedFields', 'tutorialFields', 'toolsFields', 'freeFields'];
  
  // Hide all field groups
  fieldGroups.forEach(group => {
    document.getElementById(group)?.classList.add('hidden');
  });

  // Show relevant fields based on category
  if (['costumes', 'hairstyles', 'weapons', 'others', 'free'].includes(cat)) {
    document.getElementById('sharedFields')?.classList.remove('hidden');
  }
  if (cat === 'tutorials') {
    document.getElementById('tutorialFields')?.classList.remove('hidden');
  }
  if (cat === 'tools') {
    document.getElementById('toolsFields')?.classList.remove('hidden');
    document.getElementById('sharedFields')?.classList.remove('hidden');
  }
  if (cat === 'free') {
    document.getElementById('freeFields')?.classList.remove('hidden');
  }
}

// ======= DATA LOADING =======
async function loadItems() {
  currentCategory = AdminDOM.categorySelect?.value;
  if (!currentCategory) {
    showToast('Selectează o categorie mai întâi!', 'error');
    return;
  }
  
  try {
    const response = await fetch(`assets/data/${currentCategory}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    currentItems = await response.json();
    displayItems();
  } catch (error) {
    console.error('Failed to load items:', error);
    showToast('Failed to load items', 'error');
  }
}

// ======= UTILITY FUNCTIONS =======
function getYoutubeId(url) {
  const regExp = /^.*(youtu\.be\/|v=|\/embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Optimized display function using DocumentFragment
function displayItems() {
  if (!AdminDOM.itemsContainer) return;
  
  const fragment = document.createDocumentFragment();
  
  currentItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-card';
    itemDiv.innerHTML = `
      <div class="item-card-content">
        <strong>${item.title}</strong><br>
        ${item.img ? `<img loading="lazy" src="${item.img}" style="width: 100%; max-height: 250px; object-fit: cover; margin: 0.75rem 0;">` : ''}
        <small>
          ${item.youtube ? `
            <img src="https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg" class="youtube-thumb" />
            <br><a href="https://www.youtube.com/watch?v=${item.youtube}" target="_blank" rel="noopener noreferrer" style="color: #63b3ed; text-decoration: underline;">Vezi pe YouTube</a><br>
          ` : ''}
          ${item.desc ? item.desc + '<br>' : ''}
          ${item.extra ? `
            <button class="btn-extra">Parola: ${item.extra}</button>
          ` : ''}
        </small>
      </div>
      <div class="item-actions">
        <button onclick="editItem(${index})" class="btn-edit">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button onclick="deleteItem(${index})" class="btn-delete">
          <i class="fas fa-trash"></i> Delete
        </button>
        ${item.download ? `
          <a href="${item.download}" target="_blank" rel="noopener noreferrer" class="btn-download">
            <i class="fas fa-download"></i> Download
          </a>
        ` : ''}
      </div>
    `;
    fragment.appendChild(itemDiv);
  });
  
  AdminDOM.itemsContainer.innerHTML = '';
  AdminDOM.itemsContainer.appendChild(fragment);
  
  if (AdminDOM.itemsCount) {
    AdminDOM.itemsCount.textContent = `${currentItems.length} item(s) loaded`;
  }
}

// ======= ITEM MANAGEMENT =======
function addItem() {
  const title = document.getElementById('newTitle')?.value.trim();
  const cat = currentCategory;
  
  if (!title || !cat) {
    showToast('Completează titlul și selectează categoria!', 'error');
    return;
  }

  const newItem = { title };

  // Build item based on category
  try {
    if (['costumes', 'hairstyles', 'weapons', 'others', 'free', 'tools'].includes(cat)) {
      const img = document.getElementById('newImg')?.value.trim();
      const full = document.getElementById('newFull')?.value.trim();
      
      Object.assign(newItem, {
        download: document.getElementById('newDownload')?.value.trim(),
        img,
        full,
        price: document.getElementById('newPrice')?.value.trim(),
        preview: document.getElementById('newPreview')?.value.trim()
      });

      if (['free', 'tools'].includes(cat) && (!img || !full)) {
        showToast('Completează toate câmpurile!', 'error');
        return;
      }
    }

    if (cat === 'free') {
      newItem.extra = document.getElementById('newFreeDesc')?.value.trim();
    }

    if (cat === 'tutorials') {
      const youtube = document.getElementById('newYoutube')?.value.trim();
      if (!youtube) {
        showToast('Completează YouTube ID!', 'error');
        return;
      }
      newItem.youtube = youtube;
      newItem.desc = document.getElementById('newTutorialDesc')?.value.trim();
    }

    if (cat === 'tools') {
      const desc = document.getElementById('newDesc')?.value.trim();
      if (!desc) {
        showToast('Completează descrierea!', 'error');
        return;
      }
      newItem.desc = desc;
    }

    // Add or update item
    if (editIndex > -1) {
      currentItems[editIndex] = newItem;
      editIndex = -1;
    } else {
      currentItems.push(newItem);
    }

    displayItems();
    clearInputs();
    showToast('Item saved successfully!', 'success');
  } catch (error) {
    console.error('Error adding item:', error);
    showToast('Error saving item', 'error');
  }
}

function editItem(index) {
  const item = currentItems[index];
  if (!item) return;
  
  // Populate form fields
  const fieldMappings = {
    newTitle: item.title,
    newImg: item.img,
    newFull: item.full,
    newYoutube: item.youtube,
    newTutorialDesc: item.desc,
    newDesc: item.desc,
    newPrice: item.price,
    newPreview: item.preview,
    newFreeDesc: item.extra,
    newDownload: item.download
  };
  
  Object.entries(fieldMappings).forEach(([fieldId, value]) => {
    const field = document.getElementById(fieldId);
    if (field) field.value = value || '';
  });
  
  editIndex = index;
}

function deleteItem(index) {
  if (confirm("Ești sigur că vrei să ștergi acest item?")) {
    currentItems.splice(index, 1);
    displayItems();
    showToast('Item deleted successfully!', 'success');
  }
}

// ======= TOAST SYSTEM =======
let toastTimeout;
function showToast(message, type = 'success') {
  if (!AdminDOM.adminToast || !AdminDOM.adminToastMessage) return;
  
  // Clear existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  
  const icon = AdminDOM.adminToast.querySelector('.icon');
  
  AdminDOM.adminToastMessage.textContent = message;
  AdminDOM.adminToast.className = `toast-box show ${type}`;

  if (icon) {
    icon.className = type === 'success' ? 
      'icon fas fa-check-circle' : 
      'icon fas fa-exclamation-circle';
  }

  AdminDOM.adminToast.classList.add('show');
  AdminDOM.adminToast.classList.remove('hide');

  toastTimeout = setTimeout(() => {
    AdminDOM.adminToast.classList.remove('show');
    AdminDOM.adminToast.classList.add('hide');
  }, 3000);
}

// ======= DATA EXPORT =======
function saveData() {
  if (!currentCategory) {
    showToast('Selectează și încarcă o categorie mai întâi!', 'error');
    return;
  }

  try {
    const jsonStr = JSON.stringify(currentItems, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCategory}.json`;
    a.click();
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);

    showToast(`Fișierul ${currentCategory}.json a fost descărcat!`, 'success');
  } catch (error) {
    console.error('Error saving data:', error);
    showToast('Error saving data', 'error');
  }
}

// ======= FORM UTILITIES =======
function clearInputs() {
  const allFields = [
    'newTitle', 'newImg', 'newFull', 'newYoutube', 'newTutorialDesc',
    'newDesc', 'newPrice', 'newFreeDesc', 'newDownload', 'newPreview'
  ];
  
  allFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) field.value = '';
  });
  
  editIndex = -1;
}

// ======= FILE MANAGEMENT =======
function initializeFileTable() {
  const toggleBtn = document.getElementById('toggle-table-btn');
  const tableWrapper = document.getElementById('table-wrapper');
  const downloadsList = document.getElementById('downloads-list');

  if (!toggleBtn || !tableWrapper || !downloadsList) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = tableWrapper.classList.contains('open');

    if (isOpen) {
      tableWrapper.classList.remove('open');
      tableWrapper.style.maxHeight = '0px';
      toggleBtn.textContent = '📁 Afișează fișiere';
    } else {
      tableWrapper.classList.add('open');
      tableWrapper.style.maxHeight = tableWrapper.scrollHeight + 'px';
      toggleBtn.textContent = '📂 Ascunde fișiere';
    }
  });

  // Load files
  fetch('assets/downloads/downloads.json')
    .then(res => res.json())
    .then(files => {
      const fragment = document.createDocumentFragment();
      
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
        fragment.appendChild(tr);
      });
      
      downloadsList.appendChild(fragment);

      // Add copy functionality
      downloadsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
          const link = e.target.getAttribute('data-url');
          navigator.clipboard.writeText(link).then(() => {
            e.target.textContent = 'Copied!';
            setTimeout(() => e.target.textContent = 'Copy link', 2000);
          });
        }
      });
    })
    .catch(error => {
      console.error('Failed to load files:', error);
    });
}

// ======= INITIALIZATION =======
function initializeAdmin() {
  AdminDOM.init();
  initializeFileTable();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
  initializeAdmin();
}