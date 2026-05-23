function handleBooking(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // Validate all fields are filled
    if (!name || !email || !phone || !startDate || !endDate) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        alert('Please enter a valid phone number (10-15 digits).');
        return;
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
        alert('Start date cannot be in the past.');
        return;
    }
    
    if (end <= start) {
        alert('End date must be after start date.');
        return;
    }
    
    // Calculate rental duration
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Here you would typically send the booking data to your backend
    console.log('Booking Data:', {
        name,
        email,
        phone,
        startDate,
        endDate,
        duration: duration + ' days'
    });
    
    alert(`Booking successful!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nRental Period: ${duration} days\n\nYou will receive a confirmation email shortly.`);
    
    // Redirect to success page or home page
    // window.location.href = 'index.html';
}

// Set minimum date to today for start date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput) {
        startDateInput.setAttribute('min', today);
    }
    
    // Update end date minimum when start date changes
    startDateInput?.addEventListener('change', function() {
        const selectedStartDate = this.value;
        if (endDateInput) {
            endDateInput.setAttribute('min', selectedStartDate);
            
            // Clear end date if it's before the new start date
            if (endDateInput.value && endDateInput.value <= selectedStartDate) {
                endDateInput.value = '';
            }
        }
    });
});

// Auto-format phone number as user types (optional)
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 15 digits
    if (value.length > 15) {
        value = value.slice(0, 15);
    }
    
    e.target.value = value;
});

// Prevent form submission on Enter key in input fields (optional)
document.querySelectorAll('#bookingForm input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move to next input
            const inputs = Array.from(document.querySelectorAll('#bookingForm input'));
            const index = inputs.indexOf(e.target);
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
});
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
