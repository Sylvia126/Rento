function handleSearch(event) {
    event.preventDefault();
    
    // Get form values
    const city = document.getElementById('city').value;
    const region = document.getElementById('region').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    // Validate form
    if (!city || !region || !minPrice || !maxPrice) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Validate price range
    if (parseInt(minPrice) > parseInt(maxPrice)) {
        alert('Minimum price cannot be greater than maximum price.');
        return;
    }
    
    // Here you would typically send the search criteria to your backend
    console.log('Search Criteria:', {
        city,
        region,
        minPrice,
        maxPrice
    });
    
    alert('Searching for properties...');
    
    // Redirect to results page with search parameters
    // window.location.href = `index.html?city=${city}&region=${region}&min=${minPrice}&max=${maxPrice}`;
}

// Optional: Update region dropdown based on city selection
document.getElementById('city')?.addEventListener('change', function() {
    const city = this.value;
    const regionSelect = document.getElementById('region');
    
    // Clear current regions
    regionSelect.innerHTML = '<option value="">Label*</option>';
    
    // Example: Add regions based on city
    // In a real application, you would fetch this from your backend
    const regions = {
        'alexandria': ['New Borg El-Arab', 'Smouha', 'Sidi Gaber'],
        'cairo': ['Heliopolis', 'Nasr City', 'Maadi', 'Downtown'],
        'giza': ['6th of October', 'Sheikh Zayed', 'Dokki'],
        // Add more cities and regions as needed
    };
    
    if (regions[city]) {
        regions[city].forEach(region => {
            const option = document.createElement('option');
            option.value = region.toLowerCase().replace(/\s+/g, '-');
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }
});
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
