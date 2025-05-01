import '../css/forgot-password.scss';

const form = document.querySelector('.forgot-form');

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
  const email = formData.get('email');

  try {
    const response = await window.api.forgotPassword(email);
    if (response.success) {
      alert('Password reset link sent to your email.');
      window.api.navigate('login');
    } else {
      alert(response.message || 'Failed to send password reset link. Please try again.');
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    alert('An error occurred while processing your request. Please try again later.');
  }
}