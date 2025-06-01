(() => {
  const DOWNLOAD_PAGE_URL = "short.html";
  const DOWNLOAD_FOLDER = "https://jawwad.site/assets/downloads/";
  const DOWNLOAD_EXTENSIONS = [
    ".zip", ".rar", ".7z", ".tar", ".gz",
    ".exe", ".msi", ".dmg", ".pkg",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx",
    ".mp3", ".wav", ".mp4", ".avi", ".mov",
    ".jpg", ".jpeg", ".png", ".gif", ".svg",
    ".blend", ".fbx", ".obj", ".dae", ".3ds",
    ".psd", ".ai", ".eps", ".sketch",
    ".json", ".xml", ".csv", ".txt"
  ];

  // Verifică dacă linkul este din folderul downloads și are extensie validă
  function isDownloadLink(href) {
    if (!href.startsWith(DOWNLOAD_FOLDER)) return false;

    const lowerHref = href.toLowerCase();
    return DOWNLOAD_EXTENSIONS.some(ext => lowerHref.endsWith(ext));
  }

  // Extrage numele fișierului din URL
  function extractFileName(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.split("/").pop() || "download";
    } catch {
      return "download";
    }
  }

  // Redirect la pagina de download
  function redirectToDownloadPage(url) {
    const fileName = extractFileName(url);
    const targetUrl = `${DOWNLOAD_PAGE_URL}?file=${encodeURIComponent(fileName)}&source=${encodeURIComponent(url)}`;
    window.location.href = targetUrl;
  }

  // Procesarea tuturor linkurilor din pagină
  function processLinks() {
    const links = document.querySelectorAll("a[href]");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (link.dataset.downloadProcessed === "true") return;

      if (isDownloadLink(href)) {
        link.dataset.downloadProcessed = "true";

        // Adaugă iconiță dacă nu există deja
        if (!link.querySelector(".download-indicator")) {
          const indicator = document.createElement("i");
          indicator.className = "fas fa-download download-indicator";
          indicator.style.marginLeft = "0.5rem";
          indicator.style.opacity = "0.7";
          indicator.style.fontSize = "0.8em";
          link.appendChild(indicator);
        }

        // Previne descărcarea directă și face redirect
        link.addEventListener("click", e => {
          e.preventDefault();
          redirectToDownloadPage(href);
        });
      }
    });
  }

  // Pornim procesarea când DOM-ul e gata
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processLinks);
  } else {
    processLinks();
  }

  // Opțional: dacă se adaugă linkuri noi dinamic, poți activa MutationObserver
})();
