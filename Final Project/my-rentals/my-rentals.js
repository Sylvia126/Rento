// Tab switching
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content-panel').forEach(p => p.style.display = 'none');
    document.getElementById('tab-' + tabId).style.display = 'block';
}

// Star Rating
document.querySelectorAll('.star-rating').forEach(container => {
    const rated = parseInt(container.dataset.rated) || 0;
    const stars = container.querySelectorAll('span');
    stars.forEach((star, i) => {
        if (i < rated) star.classList.add('lit');
    });
});

function rateProperty(clickedStar, rating) {
    const container = clickedStar.closest('.star-rating');
    const stars = container.querySelectorAll('span');
    stars.forEach((star, i) => {
        star.classList.toggle('lit', i < rating);
    });
}

// Renew Modal
function showRenewModal() {
    document.getElementById('renewModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('renewModal').style.display = 'none';
}

function confirmRenew() {
    const date = document.getElementById('renewDate').value;
    if (!date) { alert('Please select a new end date.'); return; }
    closeModal();
    alert('Lease renewed successfully until ' + new Date(date).toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' }) + '!');
}

// Countdown for upcoming rental
function updateCountdown() {
    const target = new Date('2025-07-01T00:00:00');
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return;
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('mins');
    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = hours;
    if (mEl) mEl.textContent = mins;
}

updateCountdown();
setInterval(updateCountdown, 60000);

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
