// ======= AUTOMATIC DOWNLOAD REDIRECT SYSTEM =======

;(() => {
  // Configuration
  const DOWNLOAD_PAGE_URL = "short.html" // Your download page
  const LOCAL_DOMAINS = ["adelinjawwad.github.io", "localhost", "127.0.0.1"]

  // File extensions that should go through download page
  const DOWNLOAD_EXTENSIONS = [
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".exe",
    ".msi",
    ".dmg",
    ".pkg",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".mp3",
    ".wav",
    ".mp4",
    ".avi",
    ".mov",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".blend",
    ".fbx",
    ".obj",
    ".dae",
    ".3ds",
    ".psd",
    ".ai",
    ".eps",
    ".sketch",
    ".json",
    ".xml",
    ".csv",
    ".txt",
  ]

  // Check if URL is local
  function isLocalURL(url) {
    try {
      const urlObj = new URL(url, window.location.origin)
      return LOCAL_DOMAINS.some((domain) => urlObj.hostname.includes(domain) || urlObj.hostname === domain)
    } catch (e) {
      return false
    }
  }

  // Check if URL is a download file
  function isDownloadFile(url) {
    const urlLower = url.toLowerCase()
    return DOWNLOAD_EXTENSIONS.some((ext) => urlLower.includes(ext))
  }

  // Extract filename from URL
  function extractFileName(url) {
    try {
      const urlObj = new URL(url, window.location.origin)
      const pathname = urlObj.pathname
      return pathname.split("/").pop() || "download"
    } catch (e) {
      return url.split("/").pop() || "download"
    }
  }

  // Redirect to download page
  function redirectToDownloadPage(originalUrl) {
    const fileName = extractFileName(originalUrl)
    const downloadPageUrl = `${DOWNLOAD_PAGE_URL}?file=${encodeURIComponent(fileName)}&source=${encodeURIComponent(originalUrl)}`

    console.log(`🚀 Redirecting to download page: ${fileName}`)
    window.location.href = downloadPageUrl
  }

  // Process all download links
  function processDownloadLinks() {
    const links = document.querySelectorAll("a[href]")
    let processedCount = 0

    links.forEach((link) => {
      const href = link.getAttribute("href")

      // Skip if no href or it's already processed
      if (!href || link.dataset.downloadProcessed) return

      // Skip anchors, mailto, tel, etc.
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return

      // Check if it's a local download file
      if (isLocalURL(href) && isDownloadFile(href)) {
        // Mark as processed
        link.dataset.downloadProcessed = "true"

        // Add visual indicator
        if (!link.querySelector(".download-indicator")) {
          const indicator = document.createElement("i")
          indicator.className = "fas fa-download download-indicator"
          indicator.style.marginLeft = "0.5rem"
          indicator.style.opacity = "0.7"
          indicator.style.fontSize = "0.8em"
          link.appendChild(indicator)
        }

        // Override click behavior
        link.addEventListener("click", (e) => {
          e.preventDefault()
          redirectToDownloadPage(href)
        })

        processedCount++
        console.log(`✅ Processed download link: ${href}`)
      }
    })

    if (processedCount > 0) {
      console.log(`🎯 Processed ${processedCount} download links`)
    }
  }

  // Auto-process links when DOM changes
  function setupAutoProcessing() {
    // Initial processing
    processDownloadLinks()

    // Watch for new links added dynamically
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === "A" || node.querySelector("a")) {
                shouldProcess = true
              }
            }
          })
        }
      })

      if (shouldProcess) {
        setTimeout(processDownloadLinks, 100)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAutoProcessing)
  } else {
    setupAutoProcessing()
  }

  // Manual processing function (can be called from console)
  window.processDownloadLinks = processDownloadLinks

  console.log("🚀 Download redirect system initialized!")
})()
