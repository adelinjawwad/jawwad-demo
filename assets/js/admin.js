// ======= PERFORMANCE OPTIMIZATIONS =======
const AdminDOM = {
  adminTopbar: null,
  adminToast: null,
  adminToastMessage: null,
  categorySelect: null,
  itemsContainer: null,
  itemsCount: null,
  init() {
    this.adminTopbar = document.getElementById('adminTopbar');
    this.adminToast = document.getElementById('admin-toast');
    this.adminToastMessage = document.getElementById('admin-toast-message');
    this.categorySelect = document.getElementById('categorySelect');
    this.itemsContainer = document.getElementById('itemsContainer');
    this.itemsCount = document.getElementById('itemsCount');
  }
};

// ======= STATE MANAGEMENT =======
let currentCategory = '';
let currentItems = [];
let editIndex = -1;

// ======= ENHANCED TOAST SYSTEM =======
let toastTimeout;
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.getElementById('admin-toast');
  const toastBox = toast?.querySelector('.toast-box') || toast;
  const toastMessage = document.getElementById('admin-toast-message');

  if (!toast || !toastMessage) {
    console.log('Toast elements not found');
    return;
  }

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  const icon = toast.querySelector('.icon');
  
  toastMessage.textContent = message;
  toast.className = `toast-box show ${type}`;
  
  if (icon) {
    const iconClass = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    icon.className = `icon ${iconClass[type] || iconClass.success}`;
  }

  toast.classList.remove('hidden');
  toast.classList.add('show');
  toast.classList.remove('hide');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 500);
  }, duration);
}

// ======= FORM MANAGEMENT =======
function showRelevantFields() {
  const cat = AdminDOM.categorySelect?.value;
  const fieldGroups = ['sharedFields', 'tutorialFields', 'toolsFields', 'freeFields'];
  
  // Hide all field groups with animation
  fieldGroups.forEach(group => {
    const element = document.getElementById(group);
    if (element) {
      element.style.opacity = '0';
      setTimeout(() => element.classList.add('hidden'), 150);
    }
  });

  // Show relevant fields with animation
  setTimeout(() => {
    if (['costumes', 'hairstyles', 'weapons', 'others', 'free'].includes(cat)) {
      showFieldGroup('sharedFields');
    }
    if (cat === 'tutorials') {
      showFieldGroup('tutorialFields');
    }
    if (cat === 'tools') {
      showFieldGroup('toolsFields');
      showFieldGroup('sharedFields');
    }
    if (cat === 'free') {
      showFieldGroup('freeFields');
    }
  }, 150);
}

function showFieldGroup(groupId) {
  const element = document.getElementById(groupId);
  if (element) {
    element.classList.remove('hidden');
    element.style.opacity = '0';
    setTimeout(() => element.style.opacity = '1', 50);
  }
}

// ======= DATA LOADING =======
async function loadItems() {
  currentCategory = AdminDOM.categorySelect?.value;
  if (!currentCategory) {
    showToast('Please select a category first!', 'warning');
    return;
  }
  
  try {
    // Add loading indicator
    const container = AdminDOM.itemsContainer;
    if (container) {
      container.innerHTML = '<div class="col-span-full text-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-pink-500"></i><p class="mt-2">Loading items...</p></div>';
    }
    
    const response = await fetch(`assets/data/${currentCategory}.json?v=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    currentItems = await response.json();
    displayItems();
    showToast(`Loaded ${currentItems.length} items from ${currentCategory}`, 'success');
  } catch (error) {
    console.error('Failed to load items:', error);
    showToast('Failed to load items. Please try again.', 'error');
    
    const container = AdminDOM.itemsContainer;
    if (container) {
      container.innerHTML = '<div class="col-span-full text-center py-8 text-red-400"><i class="fas fa-exclamation-triangle text-2xl"></i><p class="mt-2">Failed to load items</p></div>';
    }
  }
}

// ======= DISPLAY FUNCTIONS =======
function displayItems() {
  if (!AdminDOM.itemsContainer) return;
  
  if (currentItems.length === 0) {
    AdminDOM.itemsContainer.innerHTML = '<div class="col-span-full text-center py-8 text-gray-400"><i class="fas fa-inbox text-2xl"></i><p class="mt-2">No items found</p></div>';
    return;
  }
  
  const fragment = document.createDocumentFragment();
  
  currentItems.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-card animate-scaleUp';
    itemDiv.style.animationDelay = `${index * 0.1}s`;
    itemDiv.innerHTML = generateItemHTML(item, index);
    fragment.appendChild(itemDiv);
  });
  
  AdminDOM.itemsContainer.innerHTML = '';
  AdminDOM.itemsContainer.appendChild(fragment);
  
  if (AdminDOM.itemsCount) {
    AdminDOM.itemsCount.innerHTML = `<i class="fas fa-info-circle"></i> <span>${currentItems.length} item(s) loaded</span>`;
  }
}

function generateItemHTML(item, index) {
  const imageHTML = item.img ? 
    `<img loading="lazy" src="${item.img}" style="width: 100%; max-height: 250px; object-fit: cover; margin: 0.75rem 0; border-radius: 8px;" alt="${item.title}">` : '';
  
  const youtubeHTML = item.youtube ? 
    `<img src="https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg" class="youtube-thumb" alt="YouTube thumbnail" />
     <br><a href="https://www.youtube.com/watch?v=${item.youtube}" target="_blank" rel="noopener noreferrer" style="color: #63b3ed; text-decoration: underline;">Watch on YouTube</a><br>` : '';
  
  const extraHTML = item.extra ? 
    `<button class="btn-extra">Password: ${item.extra}</button>` : '';
  
  const downloadHTML = item.download ? 
    `<a href="${item.download}" target="_blank" rel="noopener noreferrer" class="btn-download">
       <i class="fas fa-download"></i> Download
     </a>` : '';
  
  return `
    <div class="item-card-content">
      <strong>${item.title}</strong><br>
      ${imageHTML}
      <small>
        ${youtubeHTML}
        ${item.desc ? item.desc + '<br>' : ''}
        ${extraHTML}
      </small>
    </div>
    <div class="item-actions">
      <button onclick="editItem(${index})" class="btn-edit">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button onclick="deleteItem(${index})" class="btn-delete">
        <i class="fas fa-trash"></i> Delete
      </button>
      ${downloadHTML}
    </div>
  `;
}

// ======= ITEM MANAGEMENT =======
function addItem() {
  const title = document.getElementById('newTitle')?.value.trim();
  
  if (!title || !currentCategory) {
    showToast('Please enter a title and select a category!', 'error');
    return;
  }

  const newItem = { title };

  try {
    // Build item based on category
    if (['costumes', 'hairstyles', 'weapons', 'others', 'free', 'tools'].includes(currentCategory)) {
      Object.assign(newItem, {
        download: document.getElementById('newDownload')?.value.trim(),
        img: document.getElementById('newImg')?.value.trim(),
        full: document.getElementById('newFull')?.value.trim(),
        price: document.getElementById('newPrice')?.value.trim(),
        preview: document.getElementById('newPreview')?.value.trim()
      });
    }

    if (currentCategory === 'free') {
      newItem.extra = document.getElementById('newFreeDesc')?.value.trim();
    }

    if (currentCategory === 'tutorials') {
      const youtube = document.getElementById('newYoutube')?.value.trim();
      if (!youtube) {
        showToast('YouTube ID is required for tutorials!', 'error');
        return;
      }
      newItem.youtube = youtube;
      newItem.desc = document.getElementById('newTutorialDesc')?.value.trim();
    }

    if (currentCategory === 'tools') {
      const desc = document.getElementById('newDesc')?.value.trim();
      if (!desc) {
        showToast('Description is required for tools!', 'error');
        return;
      }
      newItem.desc = desc;
    }

    // Clean up empty fields
    Object.keys(newItem).forEach(key => {
      if (!newItem[key]) {
        delete newItem[key];
      }
    });

    // Add or update item
    if (editIndex > -1) {
      currentItems[editIndex] = newItem;
      editIndex = -1;
      showToast('Item updated successfully!', 'success');
    } else {
      currentItems.push(newItem);
      showToast('Item added successfully!', 'success');
    }

    displayItems();
    clearInputs();
  } catch (error) {
    console.error('Error adding item:', error);
    showToast('Error saving item. Please check your input.', 'error');
  }
}

function editItem(index) {
  const item = currentItems[index];
  if (!item) {
    showToast('Item not found!', 'error');
    return;
  }
  
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
    if (field) {
      field.value = value || '';
      // Add visual feedback
      if (value) {
        field.style.borderColor = '#10b981';
        setTimeout(() => field.style.borderColor = '', 1000);
      }
    }
  });
  
  editIndex = index;
  
  // Scroll to form
  document.querySelector('#newTitle').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
  
  showToast('Item loaded for editing', 'info', 2000);
}

function deleteItem(index) {
  const item = currentItems[index];
  
  if (!item) {
    showToast('Item not found!', 'error');
    return;
  }
  
  const confirmed = confirm(`Are you sure you want to delete "${item.title}"?\n\nThis action cannot be undone.`);
  
  if (confirmed) {
    currentItems.splice(index, 1);
    displayItems();
    showToast('Item deleted successfully!', 'success');
  }
}

function clearInputs() {
  const allFields = [
    'newTitle', 'newImg', 'newFull', 'newYoutube', 'newTutorialDesc',
    'newDesc', 'newPrice', 'newFreeDesc', 'newDownload', 'newPreview'
  ];
  
  allFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = '';
      field.style.borderColor = ''; // Remove any error styling
    }
  });
  
  editIndex = -1;
  showToast('Form cleared', 'info', 1500);
}

// ======= DATA EXPORT =======
function saveData() {
  if (!currentCategory) {
    showToast('Please select and load a category first!', 'warning');
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

    showToast(`File ${currentCategory}.json downloaded successfully!`, 'success');
  } catch (error) {
    console.error('Error saving data:', error);
    showToast('Error saving data. Please try again.', 'error');
  }
}

// ======= FILE MANAGEMENT =======
async function initializeFileTable() {
  const toggleBtn = document.getElementById('toggle-table-btn');
  const tableWrapper = document.getElementById('table-wrapper');
  const downloadsList = document.getElementById('downloads-list');

  if (!toggleBtn || !tableWrapper || !downloadsList) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = tableWrapper.classList.contains('open');

    if (isOpen) {
      tableWrapper.classList.remove('open');
      tableWrapper.style.maxHeight = '0px';
      toggleBtn.innerHTML = '<i class="fas fa-folder"></i> <span>Show Files</span>';
    } else {
      tableWrapper.classList.add('open');
      tableWrapper.style.maxHeight = tableWrapper.scrollHeight + 'px';
      toggleBtn.innerHTML = '<i class="fas fa-folder-open"></i> <span>Hide Files</span>';
    }
  });

  // Load files
  try {
    const response = await fetch('assets/downloads/downloads.json');
    if (!response.ok) throw new Error('Failed to load files');
    
    const files = await response.json();
    const fragment = document.createDocumentFragment();
    
    files.forEach((name, index) => {
      const fullUrl = `https://adelinjawwad.github.io/jawwad-demo/assets/downloads/${name}`;
      const shortUrl = `https://adelinjawwad.github.io/jawwad-demo/short.html?file=${encodeURIComponent(name)}`;

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-800 transition-colors duration-200';
      tr.innerHTML = `
        <td class="px-4 py-3">
          <a href="${fullUrl}" download class="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 flex items-center gap-2">
            <i class="fas fa-file-download"></i>
            ${name}
          </a>
        </td>
        <td class="px-4 py-3">
          <button class="copy-btn bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-all duration-200 flex items-center gap-2" data-url="${shortUrl}">
            <i class="fas fa-copy"></i>
            Copy Link
          </button>
        </td>
      `;
      fragment.appendChild(tr);
    });
    
    downloadsList.appendChild(fragment);

    // Add copy functionality
    downloadsList.addEventListener('click', async (e) => {
      if (e.target.closest('.copy-btn')) {
        const btn = e.target.closest('.copy-btn');
        const link = btn.getAttribute('data-url');
        
        try {
          await navigator.clipboard.writeText(link);
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          btn.classList.add('bg-green-600');
          
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('bg-green-600');
          }, 2000);
          
        } catch (error) {
          showToast('Failed to copy link', 'error');
        }
      }
    });
  } catch (error) {
    console.error('Failed to load files:', error);
    downloadsList.innerHTML = '<tr><td colspan="2" class="text-center text-red-400 py-4">Failed to load files</td></tr>';
  }
}

// ======= KEYBOARD SHORTCUTS =======
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveData();
    }
    
    // Ctrl+N to clear form
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      clearInputs();
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
      clearInputs();
    }
  });
}

// ======= AUTO-SAVE =======
function setupAutoSave() {
  setInterval(() => {
    if (currentCategory && currentItems.length > 0) {
      localStorage.setItem(`admin_backup_${currentCategory}`, JSON.stringify(currentItems));
    }
  }, 30000); // Every 30 seconds
}

// ======= INITIALIZATION =======
function initializeAdmin() {
  AdminDOM.init();
  
  // Show admin panel immediately (no login required)
  AdminDOM.adminTopbar?.classList.remove('hidden');
  
  // Initialize file management
  initializeFileTable();
  
  // Setup keyboard shortcuts
  setupKeyboardShortcuts();
  
  // Setup auto-save
  setupAutoSave();
  
  // Welcome message
  setTimeout(() => {
    showToast('Welcome to Admin Panel! 🎉', 'success');
  }, 500);
  
  console.log('Admin panel initialized successfully - No password required!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
  initializeAdmin();
}