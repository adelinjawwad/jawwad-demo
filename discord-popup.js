const openBtn = document.getElementById("openDiscord");
const popup = document.getElementById("discordPopup");
const closeBtn = document.getElementById("closePopup");

openBtn.addEventListener("click", () => {
  popup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
