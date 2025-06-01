(() => {
  const DOWNLOAD_PAGE = "short.html";
  const DOWNLOAD_BASE_URL = "https://jawwad.site/assets/downloads/";
  const EXTENSIONS = [
    ".zip", ".rar", ".7z", ".tar", ".gz",
    ".exe", ".msi", ".dmg", ".pkg",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx",
    ".mp3", ".wav", ".mp4", ".avi", ".mov",
    ".jpg", ".jpeg", ".png", ".gif", ".svg",
    ".blend", ".fbx", ".obj", ".dae", ".3ds",
    ".psd", ".ai", ".eps", ".sketch",
    ".json", ".xml", ".csv", ".txt"
  ];

  function isDownloadLink(href) {
    if (!href.startsWith(DOWNLOAD_BASE_URL)) return false;
    const lower = href.toLowerCase();
    return EXTENSIONS.some(ext => lower.endsWith(ext));
  }

  function getFileNameFromURL(url) {
    try {
      const u = new URL(url);
      return u.pathname.split("/").pop() || "download";
    } catch {
      return "download";
    }
  }

  function redirectToDownloadPage(url) {
    const fileName = getFileNameFromURL(url);
    const redirectUrl = `${DOWNLOAD_PAGE}?file=${encodeURIComponent(fileName)}&source=${encodeURIComponent(url)}`;
    window.location.href = redirectUrl;
  }

  function processDownloadLinks() {
    const links = document.querySelectorAll("a[href]");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (link.dataset.downloadProcessed) return;

      if (isDownloadLink(href)) {
        link.dataset.downloadProcessed = "true";

        // Remove native download attribute to prevent instant download
        if (link.hasAttribute("download")) {
          link.removeAttribute("download");
        }

        // Add download icon (optional)
        if (!link.querySelector(".download-indicator")) {
          const icon = document.createElement("i");
          icon.className = "fas fa-download download-indicator";
          icon.style.marginLeft = "0.5rem";
          icon.style.opacity = "0.7";
          icon.style.fontSize = "0.8em";
          link.appendChild(icon);
        }

        // Add click listener that redirects instead of downloading immediately
        link.addEventListener("click", e => {
          e.preventDefault();
          e.stopImmediatePropagation();
          redirectToDownloadPage(href);
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processDownloadLinks);
  } else {
    processDownloadLinks();
  }
})();
