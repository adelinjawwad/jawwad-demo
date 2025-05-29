// ======= ENHANCED ADMIN PANEL WITH PASSWORD PROTECTION =======

// Configuration
const ADMIN_PASSWORD = "jawwad123" // Change this to your desired password

// DOM Cache
const AdminDOM = {
  loginContainer: null,
  adminTopbar: null,
  adminToast: null,
  adminToastMessage: null,
  categorySelect: null,
  itemsContainer: null,
  itemsCount: null,
  init() {
    this.loginContainer = document.getElementById("loginContainer")
    this.adminTopbar = document.getElementById("adminTopbar")
    this.adminToast = document.getElementById("admin-toast")
    this.adminToastMessage = document.getElementById("admin-toast-message")
    this.categorySelect = document.getElementById("categorySelect")
    this.itemsContainer = document.getElementById("itemsContainer")
    this.itemsCount = document.getElementById("itemsCount")
  },
}

// State Management
let currentCategory = ""
let currentItems = []
let editIndex = -1
let isAuthenticated = false

// Password Check Function
function checkPassword() {
  const passwordInput = document.getElementById("adminPassword")
  const errorDiv = document.getElementById("loginError")
  const enteredPassword = passwordInput?.value

  if (enteredPassword === ADMIN_PASSWORD) {
    isAuthenticated = true

    // Hide login screen with animation
    if (AdminDOM.loginContainer) {
      AdminDOM.loginContainer.style.opacity = "0"
      AdminDOM.loginContainer.style.transform = "scale(0.95)"
      setTimeout(() => {
        AdminDOM.loginContainer.style.display = "none"
      }, 300)
    }

    // Show admin panel
    if (AdminDOM.adminTopbar) {
      AdminDOM.adminTopbar.classList.remove("hidden")
    }

    // Show success message
    setTimeout(() => {
      showToast("Welcome to Admin Panel! 🎉", "success")
    }, 500)

    console.log("Admin access granted!")
    return true
  } else {
    // Show error
    if (errorDiv) {
      errorDiv.textContent = "❌ Incorrect password. Please try again."
      errorDiv.style.display = "block"
    }

    // Clear password field
    if (passwordInput) {
      passwordInput.value = ""
      passwordInput.focus()
    }

    // Add shake animation to login box
    const loginBox = document.querySelector(".login-box")
    if (loginBox) {
      loginBox.style.animation = "shake 0.5s ease-in-out"
      setTimeout(() => {
        loginBox.style.animation = ""
      }, 500)
    }

    console.log("Admin access denied!")
    return false
  }
}

// Logout Function
function logout() {
  const confirmed = confirm("Are you sure you want to logout? 🤔\n\nYou will be redirected to the main website.")

  if (confirmed) {
    // Reset authentication
    isAuthenticated = false

    // Clear any stored data
    currentCategory = ""
    currentItems = []
    editIndex = -1

    // Show logout message
    showToast("Logging out... See you soon! 👋", "info", 2000)

    // Redirect to main site after a short delay
    setTimeout(() => {
      window.location.href = "https://adelinjawwad.github.io/jawwad-demo/"
    }, 2000)
  }
}

// Enhanced Toast System
let toastTimeout
function showToast(message, type = "success", duration = 3000) {
  const toast = document.getElementById("admin-toast")
  const toastMessage = document.getElementById("admin-toast-message")

  if (!toast || !toastMessage) {
    console.log("Toast elements not found")
    return
  }

  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }

  const icon = toast.querySelector(".icon")

  toastMessage.textContent = message
  toast.className = `toast-box show ${type}`

  if (icon) {
    const iconClass = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle",
    }
    icon.className = `icon ${iconClass[type] || iconClass.success}`
  }

  toast.classList.remove("hidden")
  toast.classList.add("show")
  toast.classList.remove("hide")

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show")
    toast.classList.add("hide")
    setTimeout(() => {
      toast.classList.add("hidden")
    }, 500)
  }, duration)
}

// Form Management
function showRelevantFields() {
  if (!isAuthenticated) return

  const cat = AdminDOM.categorySelect?.value
  const fieldGroups = ["sharedFields", "tutorialFields", "toolsFields", "freeFields"]

  // Hide all field groups with animation
  fieldGroups.forEach((group) => {
    const element = document.getElementById(group)
    if (element) {
      element.style.opacity = "0"
      setTimeout(() => element.classList.add("hidden"), 150)
    }
  })

  // Show relevant fields with animation
  setTimeout(() => {
    if (["costumes", "hairstyles", "weapons", "others", "free"].includes(cat)) {
      showFieldGroup("sharedFields")
    }
    if (cat === "tutorials") {
      showFieldGroup("tutorialFields")
    }
    if (cat === "tools") {
      showFieldGroup("toolsFields")
      showFieldGroup("sharedFields")
    }
    if (cat === "free") {
      showFieldGroup("freeFields")
    }
  }, 150)
}

function showFieldGroup(groupId) {
  const element = document.getElementById(groupId)
  if (element) {
    element.classList.remove("hidden")
    element.style.opacity = "0"
    setTimeout(() => (element.style.opacity = "1"), 50)
  }
}

// Data Loading
async function loadItems() {
  if (!isAuthenticated) {
    showToast("Please login first!", "error")
    return
  }

  currentCategory = AdminDOM.categorySelect?.value
  if (!currentCategory) {
    showToast("Please select a category first!", "warning")
    return
  }

  try {
    // Add loading indicator
    const container = AdminDOM.itemsContainer
    if (container) {
      container.innerHTML =
        '<div class="col-span-full text-center py-8"><i class="fas fa-spinner fa-spin text-2xl text-pink-500"></i><p class="mt-2">Loading items...</p></div>'
    }

    const response = await fetch(`assets/data/${currentCategory}.json?v=${Date.now()}`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    currentItems = await response.json()
    displayItems()
    showToast(`Loaded ${currentItems.length} items from ${currentCategory}`, "success")
  } catch (error) {
    console.error("Failed to load items:", error)
    showToast("Failed to load items. Please try again.", "error")

    const container = AdminDOM.itemsContainer
    if (container) {
      container.innerHTML =
        '<div class="col-span-full text-center py-8 text-red-400"><i class="fas fa-exclamation-triangle text-2xl"></i><p class="mt-2">Failed to load items</p></div>'
    }
  }
}

// Enhanced Display Functions
function displayItems() {
  if (!AdminDOM.itemsContainer) return

  if (currentItems.length === 0) {
    AdminDOM.itemsContainer.innerHTML =
      '<div class="col-span-full text-center py-8 text-gray-400"><i class="fas fa-inbox text-2xl"></i><p class="mt-2">No items found</p></div>'
    return
  }

  const fragment = document.createDocumentFragment()

  currentItems.forEach((item, index) => {
    const itemDiv = document.createElement("div")
    itemDiv.className = "item-card animate-scaleUp"
    itemDiv.style.animationDelay = `${index * 0.1}s`
    itemDiv.innerHTML = generateItemHTML(item, index)
    fragment.appendChild(itemDiv)
  })

  AdminDOM.itemsContainer.innerHTML = ""
  AdminDOM.itemsContainer.appendChild(fragment)

  if (AdminDOM.itemsCount) {
    AdminDOM.itemsCount.innerHTML = `<i class="fas fa-info-circle"></i> <span>${currentItems.length} item(s) loaded</span>`
  }
}

function generateItemHTML(item, index) {
  const imageHTML = item.img
    ? `<img loading="lazy" src="${item.img}" style="width: 100%; max-height: 250px; object-fit: cover; margin: 0.75rem 0; border-radius: 12px;" alt="${item.title}">`
    : ""

  const youtubeHTML = item.youtube
    ? `<img src="https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg" class="youtube-thumb" alt="YouTube thumbnail" />
     <br><a href="https://www.youtube.com/watch?v=${item.youtube}" target="_blank" rel="noopener noreferrer" style="color: #63b3ed; text-decoration: underline;">Watch on YouTube</a><br>`
    : ""

  const extraHTML = item.extra
    ? `<button class="btn-extra btn-base">
       <i class="fas fa-key"></i>
       Password: ${item.extra}
     </button>`
    : ""

  const downloadHTML = item.download
    ? `<a href="${item.download}" target="_blank" rel="noopener noreferrer" class="btn-download btn-base">
       <i class="fas fa-download"></i>
       Download
     </a>`
    : ""

  // Enhanced Price Display with Sale Support
  const priceHTML = generatePriceHTML(item)

  return `
    <div class="item-card-content">
      <strong>${item.title}</strong>
      ${imageHTML}
      ${priceHTML}
      <small>
        ${youtubeHTML}
        ${item.desc ? item.desc + "<br>" : ""}
        ${extraHTML}
      </small>
    </div>
    <div class="item-actions">
      <button onclick="editItem(${index})" class="btn-edit btn-base">
        <i class="fas fa-edit"></i>
        Edit
      </button>
      <button onclick="deleteItem(${index})" class="btn-delete btn-base">
        <i class="fas fa-trash"></i>
        Delete
      </button>
      ${downloadHTML}
    </div>
  `
}

function generatePriceHTML(item) {
  if (!item.price) return ""

  let priceHTML = '<div class="item-price-container">'

  if (item.onSale && item.discount > 0) {
    // Calculate discounted price
    const originalPrice = Number.parseFloat(item.price.replace(/[^\d.]/g, ""))
    const discountedPrice = originalPrice - (originalPrice * item.discount) / 100
    const currency = item.price.replace(/[\d.]/g, "")

    priceHTML += `
      <div class="item-price on-sale">
        <i class="fas fa-fire"></i>
        <span>${discountedPrice.toFixed(0)}${currency}</span>
        <span class="original-price">${item.price}</span>
      </div>
      <div class="sale-badge">
        <i class="fas fa-percent"></i>
        -${item.discount}% OFF
      </div>
    `
  } else {
    priceHTML += `
      <div class="item-price">
        <i class="fas fa-euro-sign"></i>
        <span>${item.price}</span>
      </div>
    `
  }

  priceHTML += "</div>"
  return priceHTML
}

// Item Management
function addItem() {
  if (!isAuthenticated) {
    showToast("Please login first!", "error")
    return
  }

  const title = document.getElementById("newTitle")?.value.trim()

  if (!title || !currentCategory) {
    showToast("Please enter a title and select a category!", "error")
    return
  }

  const newItem = { title }

  try {
    // Build item based on category
    if (["costumes", "hairstyles", "weapons", "others", "free", "tools"].includes(currentCategory)) {
      Object.assign(newItem, {
        download: document.getElementById("newDownload")?.value.trim(),
        img: document.getElementById("newImg")?.value.trim(),
        full: document.getElementById("newFull")?.value.trim(),
        price: document.getElementById("newPrice")?.value.trim(),
        preview: document.getElementById("newPreview")?.value.trim(),
      })
    }

    if (currentCategory === "free") {
      newItem.extra = document.getElementById("newFreeDesc")?.value.trim()
    }

    if (currentCategory === "tutorials") {
      const youtube = document.getElementById("newYoutube")?.value.trim()
      if (!youtube) {
        showToast("YouTube ID is required for tutorials!", "error")
        return
      }
      newItem.youtube = youtube
      newItem.desc = document.getElementById("newTutorialDesc")?.value.trim()
    }

    if (currentCategory === "tools") {
      const desc = document.getElementById("newDesc")?.value.trim()
      if (!desc) {
        showToast("Description is required for tools!", "error")
        return
      }
      newItem.desc = desc

      // Add sale fields for tools
      const onSale = document.getElementById("newOnSale")?.checked || false
      const discount = document.getElementById("newDiscount")?.value.trim()

      newItem.onSale = onSale
      newItem.discount = onSale && discount ? Number.parseInt(discount) : 0
    }

    // Clean up empty fields
    Object.keys(newItem).forEach((key) => {
      if (!newItem[key] && newItem[key] !== false && newItem[key] !== 0) {
        delete newItem[key]
      }
    })

    // Add or update item
    if (editIndex > -1) {
      currentItems[editIndex] = newItem
      editIndex = -1
      showToast("Item updated successfully!", "success")
    } else {
      currentItems.push(newItem)
      showToast("Item added successfully!", "success")
    }

    displayItems()
    clearInputs()
  } catch (error) {
    console.error("Error adding item:", error)
    showToast("Error saving item. Please check your input.", "error")
  }
}

function editItem(index) {
  if (!isAuthenticated) {
    showToast("Please login first!", "error")
    return
  }

  const item = currentItems[index]
  if (!item) {
    showToast("Item not found!", "error")
    return
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
    newDownload: item.download,
    newDiscount: item.discount,
  }

  Object.entries(fieldMappings).forEach(([fieldId, value]) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.value = value || ""
      // Add visual feedback
      if (value) {
        field.style.borderColor = "#10b981"
        setTimeout(() => (field.style.borderColor = ""), 1000)
      }
    }
  })

  // Handle checkbox for onSale
  const onSaleField = document.getElementById("newOnSale")
  if (onSaleField) {
    onSaleField.checked = item.onSale || false
  }

  editIndex = index

  // Scroll to form
  document.querySelector("#newTitle").scrollIntoView({
    behavior: "smooth",
    block: "center",
  })

  showToast("Item loaded for editing", "info", 2000)
}

function deleteItem(index) {
  if (!isAuthenticated) {
    showToast("Please login first!", "error")
    return
  }

  const item = currentItems[index]

  if (!item) {
    showToast("Item not found!", "error")
    return
  }

  const confirmed = confirm(`Are you sure you want to delete "${item.title}"?\n\nThis action cannot be undone.`)

  if (confirmed) {
    currentItems.splice(index, 1)
    displayItems()
    showToast("Item deleted successfully!", "success")
  }
}

function clearInputs() {
  const allFields = [
    "newTitle",
    "newImg",
    "newFull",
    "newYoutube",
    "newTutorialDesc",
    "newDesc",
    "newPrice",
    "newFreeDesc",
    "newDownload",
    "newPreview",
    "newDiscount",
  ]

  allFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.value = ""
      field.style.borderColor = ""
    }
  })

  // Clear checkbox
  const onSaleField = document.getElementById("newOnSale")
  if (onSaleField) {
    onSaleField.checked = false
  }

  editIndex = -1
  showToast("Form cleared", "info", 1500)
}

// Data Export
function saveData() {
  if (!isAuthenticated) {
    showToast("Please login first!", "error")
    return
  }

  if (!currentCategory) {
    showToast("Please select and load a category first!", "warning")
    return
  }

  try {
    const jsonStr = JSON.stringify(currentItems, null, 2)
    const blob = new Blob([jsonStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${currentCategory}.json`
    a.click()

    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100)

    showToast(`File ${currentCategory}.json downloaded successfully!`, "success")
  } catch (error) {
    console.error("Error saving data:", error)
    showToast("Error saving data. Please try again.", "error")
  }
}

// File Management
async function initializeFileTable() {
  const toggleBtn = document.getElementById("toggle-table-btn")
  const tableWrapper = document.getElementById("table-wrapper")
  const downloadsList = document.getElementById("downloads-list")

  if (!toggleBtn || !tableWrapper || !downloadsList) return

  toggleBtn.addEventListener("click", () => {
    if (!isAuthenticated) {
      showToast("Please login first!", "error")
      return
    }

    const isOpen = tableWrapper.classList.contains("open")

    if (isOpen) {
      tableWrapper.classList.remove("open")
      tableWrapper.style.maxHeight = "0px"
      toggleBtn.innerHTML = '<i class="fas fa-folder"></i> <span>Show Files</span>'
    } else {
      tableWrapper.classList.add("open")
      tableWrapper.style.maxHeight = tableWrapper.scrollHeight + "px"
      toggleBtn.innerHTML = '<i class="fas fa-folder-open"></i> <span>Hide Files</span>'
    }
  })

  // Remove this line that was blocking file loading:
  // if (!isAuthenticated) return

  try {
    const response = await fetch("assets/downloads/downloads.json")
    if (!response.ok) throw new Error("Failed to load files")

    const files = await response.json()
    const fragment = document.createDocumentFragment()

    files.forEach((name, index) => {
      const fullUrl = `https://adelinjawwad.github.io/jawwad-demo/assets/downloads/${name}`
      const shortUrl = `https://adelinjawwad.github.io/jawwad-demo/short.html?file=${encodeURIComponent(name)}`

      const tr = document.createElement("tr")
      tr.className = "hover:bg-gray-800 transition-colors duration-200"
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
      `
      fragment.appendChild(tr)
    })

    downloadsList.appendChild(fragment)

    // Add copy functionality
    downloadsList.addEventListener("click", async (e) => {
      if (e.target.closest(".copy-btn")) {
        const btn = e.target.closest(".copy-btn")
        const link = btn.getAttribute("data-url")

        try {
          await navigator.clipboard.writeText(link)
          const originalHTML = btn.innerHTML
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!'
          btn.classList.add("bg-green-600")

          setTimeout(() => {
            btn.innerHTML = originalHTML
            btn.classList.remove("bg-green-600")
          }, 2000)
        } catch (error) {
          showToast("Failed to copy link", "error")
        }
      }
    })
  } catch (error) {
    console.error("Failed to load files:", error)
    downloadsList.innerHTML = '<tr><td colspan="2" class="text-center text-red-400 py-4">Failed to load files</td></tr>'
  }
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (!isAuthenticated) return

    // Ctrl+S to save
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault()
      saveData()
    }

    // Ctrl+N to clear form
    if (e.ctrlKey && e.key === "n") {
      e.preventDefault()
      clearInputs()
    }

    // Escape to clear form
    if (e.key === "Escape") {
      clearInputs()
    }
  })

  // Enter key on password field
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.getElementById("adminPassword") === document.activeElement) {
      checkPassword()
    }
  })
}

// Auto-save
function setupAutoSave() {
  setInterval(() => {
    if (isAuthenticated && currentCategory && currentItems.length > 0) {
      localStorage.setItem(`admin_backup_${currentCategory}`, JSON.stringify(currentItems))
    }
  }, 30000) // Every 30 seconds
}

// Initialization
function initializeAdmin() {
  AdminDOM.init()

  // Setup keyboard shortcuts
  setupKeyboardShortcuts()

  // Setup auto-save
  setupAutoSave()

  // Initialize file management (will check auth inside)
  initializeFileTable()

  console.log("Enhanced admin panel with password protection initialized!")
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAdmin)
} else {
  initializeAdmin()
}
