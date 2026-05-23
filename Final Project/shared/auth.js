/* ── Rento Shared Auth + Dark Mode ── */

// ── Auth helpers ──────────────────────────────────────────────
function isLoggedIn() {
  return !!localStorage.getItem('rento_user');
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('rento_user')); } catch { return null; }
}

function loginUser(userData) {
  localStorage.setItem('rento_user', JSON.stringify(userData));
}

function logoutUser() {
  localStorage.removeItem('rento_user');
  window.location.href = '/Home_page/home.html';
}

// ── Dark mode ─────────────────────────────────────────────────
function applyDarkMode() {
  if (localStorage.getItem('rento_dark') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('rento_dark', 'false');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('rento_dark', 'true');
  }
  updateDarkBtn();
}

function updateDarkBtn() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = isDark
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// ── Nav renderer ──────────────────────────────────────────────
function renderNav(activePage) {
  const loggedIn = isLoggedIn();
  const user = getUser();
  const initial = user ? (user.name || user.email || 'U')[0].toUpperCase() : 'U';

  const pages = [
    { href: '/Home_page/home.html', label: 'Home', id: 'home',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
    { href: '/map/map.html', label: 'Explore', id: 'explore',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>` },
    { href: '/dashboard/dashboard.html', label: 'Dashboard', id: 'dashboard',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>` },
    { href: '/favorites/favorites.html', label: 'Favorites', id: 'favorites',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>` },
    { href: '/my-rentals/my-rentals.html', label: 'My Rentals', id: 'my-rentals',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>` },
    { href: '/about/about.html', label: 'About', id: 'about',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` },
  ];

  const navLinksHTML = pages.map(p => {
    const isActive = p.id === activePage;
    if (!loggedIn && p.id !== 'home' && p.id !== 'about') {
      return `<a href="#" class="nav-link${isActive ? ' active' : ''}" onclick="requireLogin(event)">${p.icon} ${p.label}</a>`;
    }
    return `<a href="${p.href}" class="nav-link${isActive ? ' active' : ''}">${p.icon} ${p.label}</a>`;
  }).join('');

  const mobileLinksHTML = pages.map(p => {
    if (!loggedIn && p.id !== 'home' && p.id !== 'about') {
      return `<a href="#" onclick="requireLogin(event)">${['🏠','🗺️','📊','❤️','📋','ℹ️'][pages.indexOf(p)]} ${p.label}</a>`;
    }
    return `<a href="${p.href}">${['🏠','🗺️','📊','❤️','📋','ℹ️'][pages.indexOf(p)]} ${p.label}</a>`;
  }).join('');

  const authHTML = loggedIn
    ? `<div class="user-menu-wrap">
        <button class="user-avatar-btn" onclick="toggleUserMenu()" title="${user?.name || user?.email || 'Account'}">
          <span class="avatar-circle-nav">${initial}</span>
          <span class="user-name-nav">${user?.name?.split(' ')[0] || 'Account'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="user-dropdown" id="userDropdown">
          <div class="user-dropdown-info">
            <div class="dropdown-avatar">${initial}</div>
            <div>
              <div class="dropdown-name">${user?.name || 'User'}</div>
              <div class="dropdown-email">${user?.email || ''}</div>
            </div>
          </div>
          <a href="/dashboard/dashboard.html" class="dropdown-item">📊 Dashboard</a>
          <a href="/my-rentals/my-rentals.html" class="dropdown-item">📋 My Rentals</a>
          <a href="/favorites/favorites.html" class="dropdown-item">❤️ Favorites</a>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item logout-item" onclick="logoutUser()">🚪 Logout</button>
        </div>
      </div>`
    : `<a href="/login/login.html" class="btn-login">Login</a>
       <a href="/signup/sign.html" class="btn-register">Register</a>`;

  const mobileAuthHTML = loggedIn
    ? `<div class="mobile-auth">
        <span class="mobile-user-label">👤 ${user?.name || user?.email || 'Account'}</span>
        <button class="btn-logout-mobile" onclick="logoutUser()">Logout</button>
       </div>`
    : `<div class="mobile-auth">
        <a href="/login/login.html" class="btn-login">Login</a>
        <a href="/signup/sign.html" class="btn-register">Register</a>
       </div>`;

  const navHTML = `
    <nav class="navbar">
      <div class="nav-inner">
        <a class="logo" href="/Home_page/home.html">
          <img src="/rento.png" alt="Rento Logo" class="logo-image">
        </a>
        <div class="nav-links">${navLinksHTML}</div>
        <div class="nav-auth">
          <button id="darkToggle" class="dark-toggle-btn" onclick="toggleDarkMode()" title="Toggle Dark Mode"></button>
          ${authHTML}
        </div>
        <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        ${mobileLinksHTML}
        ${mobileAuthHTML}
      </div>
    </nav>`;

  // Find existing nav and replace, or prepend to body
  const existingNav = document.querySelector('nav.navbar');
  if (existingNav) {
    existingNav.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  updateDarkBtn();

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const wrap = document.querySelector('.user-menu-wrap');
    if (wrap && !wrap.contains(e.target)) {
      document.getElementById('userDropdown')?.classList.remove('open');
    }
  });
}

function toggleUserMenu() {
  document.getElementById('userDropdown')?.classList.toggle('open');
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

function requireLogin(e) {
  e.preventDefault();
  showAuthModal();
}

// ── Auth Modal ────────────────────────────────────────────────
function showAuthModal() {
  const existing = document.getElementById('authModal');
  if (existing) { existing.classList.add('visible'); return; }

  const modal = document.createElement('div');
  modal.id = 'authModal';
  modal.className = 'auth-modal-overlay';
  modal.innerHTML = `
    <div class="auth-modal-box">
      <div class="auth-modal-icon">🔐</div>
      <h2>Sign in to continue</h2>
      <p>You need to be logged in to access this feature.</p>
      <div class="auth-modal-btns">
        <a href="/login/login.html" class="auth-modal-login">Login</a>
        <a href="/signup/sign.html" class="auth-modal-register">Create Account</a>
      </div>
      <button class="auth-modal-close" onclick="closeAuthModal()">✕</button>
    </div>`;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('visible'), 10);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) { modal.classList.remove('visible'); }
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyDarkMode();
});
