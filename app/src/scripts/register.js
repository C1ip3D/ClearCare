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
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const displayName = formData.get('displayName');

  try {
    const response = await window.api.register(credentials, displayName);
    if (response.success) {
      window.api.navigate('index');
    } 
  } catch (error) {
    console.error('Registration error:', error);
    alert('An error occurred during registration. Please try again later.');
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
