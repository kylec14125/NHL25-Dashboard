// app.js

// Example: This could store shared data, toggle themes, or load insights dynamically
document.addEventListener('DOMContentLoaded', () => {
  console.log('NHL Assistant GM app is ready!');

  // Example: show a welcome message or load dashboard insights
  const welcomeMessage = 'Welcome back to your Assistant GM Dashboard!';
  console.log(welcomeMessage);

  // Future: load shared data, e.g., from localStorage or JSON files
  // Example:
  // const playersData = JSON.parse(localStorage.getItem('playersData') || '[]');
  // console.log(playersData);

  // Future: add nav active link highlighting
  const navLinks = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
