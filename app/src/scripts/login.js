import '../css/login.scss';

const form = document.querySelector('.login-form');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('href');
      console.log(page);
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

  try {
    const serializedCredentials = await window.api.serializer(credentials);
    const response = await window.api.login(serializedCredentials);
    if (response.success) {
      window.api.navigate('index');
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  } catch (error) {
    console.error('Login error:', error.message || error);
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
