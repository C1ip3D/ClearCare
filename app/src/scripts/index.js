import '../css/index.scss';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('href');
      window.api.navigate(page);
    });
  });
});


