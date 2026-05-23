// Apply dark mode immediately
(function() {
  if (localStorage.getItem('rento_dark') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  if (!email || !password) { showError('Please fill in all fields.'); return; }
  const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  localStorage.setItem('rento_user', JSON.stringify({ email, name, loggedInAt: Date.now() }));
  if (rememberMe) localStorage.setItem('rememberedEmail', email);
  else localStorage.removeItem('rememberedEmail');
  window.location.href = '/map/map.html';
}

function handleGoogleLogin() {
  localStorage.setItem('rento_user', JSON.stringify({ email: 'user@gmail.com', name: 'Google User', loggedInAt: Date.now() }));
  window.location.href = '/map/map.html';
}

function showError(msg) {
  let el = document.getElementById('loginError');
  if (!el) {
    el = document.createElement('div');
    el.id = 'loginError';
    el.style.cssText = 'color:#ef4444;font-size:0.9rem;margin-bottom:1rem;text-align:center;padding:0.5rem;background:rgba(239,68,68,0.1);border-radius:8px;';
    document.getElementById('loginForm').prepend(el);
  }
  el.textContent = msg;
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  isDark ? document.documentElement.removeAttribute('data-theme') : document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('rento_dark', !isDark);
  updateDarkBtn();
}
function updateDarkBtn() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = isDark
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('rento_user')) { window.location.href = '/map/map.html'; return; }
  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) { document.getElementById('email').value = savedEmail; document.getElementById('rememberMe').checked = true; }
  updateDarkBtn();
});
