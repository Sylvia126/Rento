function removeFavorite(btn) {
    const card = btn.closest('.fav-col');
    card.style.transition = 'opacity 0.4s, transform 0.4s';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    setTimeout(() => {
        card.remove();
        checkEmpty();
    }, 400);
}

function checkEmpty() {
    const remaining = document.querySelectorAll('.fav-col');
    document.getElementById('emptyState').style.display = remaining.length === 0 ? 'block' : 'none';
}

function filterCards(city, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.fav-col').forEach(col => {
        if (city === 'all' || col.dataset.city === city) {
            col.style.display = '';
        } else {
            col.style.display = 'none';
        }
    });
}

function sortCards(value) {
    const grid = document.getElementById('favoritesGrid');
    const cols = Array.from(grid.querySelectorAll('.fav-col'));

    cols.sort((a, b) => {
        if (value === 'price-asc')  return parseInt(a.dataset.price) - parseInt(b.dataset.price);
        if (value === 'price-desc') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
        if (value === 'rating')     return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
        return 0;
    });

    cols.forEach(col => grid.appendChild(col));
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
