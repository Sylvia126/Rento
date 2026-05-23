// Sample property data
const properties = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
        rating: 3.5,
        location: "Alexandria",
        region: "New Borg El-Arab",
        price: 8000,
        bedrooms: 2,
        bathrooms: 1,
        available: false,
        lat: 31.2001,
        lng: 29.9187
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500",
        rating: 4,
        location: "Cairo",
        region: "Heliopolis",
        price: 12000,
        bedrooms: 3,
        bathrooms: 2,
        available: true,
        lat: 30.0444,
        lng: 31.2357
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500",
        rating: 4,
        location: "Qalyubia",
        region: "Banha",
        price: 10000,
        bedrooms: 2,
        bathrooms: 2,
        available: true,
        lat: 30.4658,
        lng: 31.1844
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
        rating: 4.5,
        location: "Cairo",
        region: "Heliopolis",
        price: 15000,
        bedrooms: 3,
        bathrooms: 2,
        available: true,
        lat: 30.0888,
        lng: 31.3123
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500",
        rating: 3.5,
        location: "Giza",
        region: "6th of October",
        price: 11000,
        bedrooms: 2,
        bathrooms: 1,
        available: true,
        lat: 29.9787,
        lng: 31.0087
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
        rating: 5,
        location: "Alexandria",
        region: "Smouha",
        price: 13000,
        bedrooms: 4,
        bathrooms: 3,
        available: true,
        lat: 31.2156,
        lng: 29.9553
    }
];

let filteredProperties = [...properties];
let map, markers = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    initMap();
});

// Render Properties
function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';

    filteredProperties.forEach(property => {
        const card = createPropertyCard(property);
        grid.appendChild(card);
    });

    document.getElementById('resultsCount').textContent = filteredProperties.length;
}

// Create Property Card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    const stars = '★'.repeat(Math.floor(property.rating)) + '☆'.repeat(5 - Math.floor(property.rating));
    
    card.innerHTML = `
        <div class="property-image-container">
            <img src="${property.image}" alt="Property" class="property-image">
            <button class="favorite-btn ${property.favorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${property.id}, this)">
                ${property.favorite ? '♥' : '♡'}
            </button>
        </div>
        <div class="property-details">
            <div class="rating">
                ${stars} <span class="rating-text">${property.rating}/5</span>
            </div>
            <div class="location-info">
                <p>Location: ${property.location}</p>
                <p>Region: ${property.region}</p>
            </div>
            <div class="price">L.E ${property.price.toLocaleString()} per/month</div>
            <div class="card-actions">
                <span class="availability-badge ${property.available ? 'badge-available' : 'badge-unavailable'}">
                    ${property.available ? 'Available' : 'Unavailable'}
                </span>
                <button class="btn-details" onclick="event.stopPropagation(); viewPropertyDetails(${property.id})">More details</button>
            </div>
        </div>
    `;

    return card;
}

// Toggle Favorite
function toggleFavorite(id, button) {
    const property = properties.find(p => p.id === id);
    property.favorite = !property.favorite;
    
    button.classList.toggle('active');
    button.innerHTML = property.favorite ? '♥' : '♡';
}

// View Property Details - Navigate to details.html
function viewPropertyDetails(id) {
    console.log('Navigating to property details page for ID:', id);
    
    // Store property ID in sessionStorage to access on details page
    sessionStorage.setItem('selectedPropertyId', id);
    
    // Navigate to details.html with property ID
    window.location.href = '/Details/details.html?id=' + id;
}

// Apply Filters
function applyFilters() {
    const city = document.getElementById('filterCity').value;
    const region = document.getElementById('filterRegion').value;
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    const bedrooms = parseInt(document.getElementById('filterBedrooms').value) || 0;
    const bathrooms = parseInt(document.getElementById('filterBathrooms').value) || 0;
    const availableOnly = document.getElementById('filterAvailable').checked;
    const sortBy = document.getElementById('sortBy').value;

    filteredProperties = properties.filter(property => {
        return (!city || property.location.toLowerCase() === city) &&
               (!region || property.region.toLowerCase().includes(region)) &&
               (property.price >= minPrice && property.price <= maxPrice) &&
               (property.bedrooms >= bedrooms) &&
               (property.bathrooms >= bathrooms) &&
               (!availableOnly || property.available);
    });

    // Sort
    if (sortBy === 'price-low') {
        filteredProperties.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProperties.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProperties.sort((a, b) => b.rating - a.rating);
    }

    renderProperties();
    updateMapMarkers();
}

// Reset Filters
function resetFilters() {
    document.getElementById('filtersForm').reset();
    filteredProperties = [...properties];
    renderProperties();
    updateMapMarkers();
}

// Initialize Map
function initMap() {
    map = L.map('map').setView([30.0444, 31.2357], 8);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    updateMapMarkers();
}

// Update Map Markers
function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    filteredProperties.forEach(property => {
        const marker = L.marker([property.lat, property.lng]).addTo(map);
        
        marker.on('click', () => showMapPropertyCard(property));
        markers.push(marker);
    });

    // Fit bounds if properties exist
    if (filteredProperties.length > 0) {
        const bounds = L.latLngBounds(filteredProperties.map(p => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// Show Property Card on Map
function showMapPropertyCard(property) {
    const card = document.getElementById('mapPropertyCard');
    const stars = '★'.repeat(Math.floor(property.rating)) + '☆'.repeat(5 - Math.floor(property.rating));
    
    document.getElementById('mapCardImage').src = property.image;
    document.getElementById('mapCardRating').textContent = stars;
    document.getElementById('mapCardRatingValue').textContent = property.rating + '/5';
    document.getElementById('mapCardLocation').textContent = `${property.location}, ${property.region}`;
    document.getElementById('mapCardPrice').textContent = `L.E ${property.price.toLocaleString()} per/month`;
    document.getElementById('mapCardDetailsBtn').onclick = () => viewPropertyDetails(property.id);
    
    card.style.display = 'block';
}

// Close Map Card
function closeMapCard() {
    document.getElementById('mapPropertyCard').style.display = 'none';
}

// Toggle View
function toggleView() {
    const listView = document.getElementById('listView');
    const mapView = document.getElementById('mapView');
    const btnText = document.getElementById('viewToggleText');

    if (listView.style.display === 'none') {
        listView.style.display = 'block';
        mapView.style.display = 'none';
        btnText.textContent = 'Map View';
    } else {
        listView.style.display = 'none';
        mapView.style.display = 'block';
        btnText.textContent = 'List View';
        
        // Refresh map after showing
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
