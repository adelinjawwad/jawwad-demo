document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      fetch(`components/${page}.php`).then(res => res.text()).then(html => {
        document.getElementById('app').innerHTML = html;
      });
    });
  });
});