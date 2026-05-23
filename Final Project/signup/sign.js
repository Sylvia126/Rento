(function() {
  if (localStorage.getItem('rento_dark') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function handleSignUp(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) { showError('Passwords do not match!'); return; }
  if (password.length < 6) { showError('Password must be at least 6 characters.'); return; }

  localStorage.setItem('rento_user', JSON.stringify({ name, email, phone, loggedInAt: Date.now() }));
  window.location.href = '/map/map.html';
}

function showError(msg) {
  let el = document.getElementById('signupError');
  if (!el) {
    el = document.createElement('div');
    el.id = 'signupError';
    el.style.cssText = 'color:#ef4444;font-size:0.9rem;margin-bottom:1rem;text-align:center;padding:0.5rem;background:rgba(239,68,68,0.1);border-radius:8px;';
    document.getElementById('signupForm').prepend(el);
  }
  el.textContent = msg;
}

document.getElementById('confirmPassword')?.addEventListener('input', function() {
  const pwd = document.getElementById('password').value;
  this.style.borderBottomColor = (this.value && pwd !== this.value) ? '#ef4444' : '';
});

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('rento_user')) { window.location.href = '/map/map.html'; return; }
});
