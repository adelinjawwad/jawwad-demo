document.getElementById('discordToggle').addEventListener('click', () => {
  const widget = document.getElementById('discordWidget');
  widget.classList.toggle('discord-hidden');
});

document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      img.requestFullscreen();
    }
  });
});