// Image Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-image');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
}

// Auto-play slider (optional)
let autoPlayInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause auto-play on hover
document.querySelector('.image-slider')?.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

document.querySelector('.image-slider')?.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// Toggle Favorite
function toggleFavoriteDetail(button) {
    button.classList.toggle('active');
    
    // Here you would typically save to backend
    if (button.classList.contains('active')) {
        console.log('Added to favorites');
    } else {
        console.log('Removed from favorites');
    }
}

// Book Now Function
function bookNow() {
    alert('Booking functionality would be implemented here. You will be redirected to the booking page.');
    
    // Here you would typically:
    // 1. Show a booking form
    // 2. Collect user information
    // 3. Process the booking request
    // window.location.href = 'booking.html';
}

// Toggle Description (Read More/Less)
function toggleDescription(event) {
    event.preventDefault();
    const descriptionText = document.querySelector('.description-text');
    const readMoreBtn = event.target;
    
    if (descriptionText.style.maxHeight) {
        descriptionText.style.maxHeight = null;
        readMoreBtn.textContent = 'Read More...';
    } else {
        descriptionText.style.maxHeight = descriptionText.scrollHeight + 'px';
        readMoreBtn.textContent = 'Read Less...';
    }
}

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.image-slider');

slider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        changeSlide(-1);
    }
}
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
