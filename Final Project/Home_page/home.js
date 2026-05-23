// Dark mode applied by auth.js before DOM load

function toggleFavorite(button) {
  if (!isLoggedIn()) { requireLogin({ preventDefault: () => {} }); return; }
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    button.innerHTML = '♡';
  } else {
    button.classList.add('active');
    button.innerHTML = '♥';
  }
}

function loadMoreProperties() {
  if (!isLoggedIn()) { showAuthModal(); return; }
  alert('Loading more properties...');
}
