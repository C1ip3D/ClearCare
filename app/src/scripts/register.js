import '../css/register.scss';

const form = document.querySelector('.login-form');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('href');
      window.api.navigate(page);
    });
  });
});

form.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const credentials = Object.fromEntries(formData);
  try {
    const response = await window.api.login(credentials);
    if (response.success) {
      window.api.navigate('index');
    } else {
      alert(response.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login. Please try again later.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('href');
      window.api.navigate(page);
    });
  });
});
