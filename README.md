# 🏠 Rento — Property Rental Web Application

> A Human-Computer Interaction (HCI) course project — a fully responsive, multi-page property rental platform designed with a strong focus on usability, accessibility, and user experience.

---

## 📌 About the Project

**Rento** is a front-end web application that simulates a real-world property rental service for the Egyptian market. The project was developed as part of an HCI course, with emphasis on user-centered design principles, interaction design, and interface prototyping.

Users can browse available rental properties, explore them on an interactive map, save favorites, manage their bookings, and track rental activity through a personal dashboard — all within a clean, intuitive interface that supports both light and dark modes.

---

## ✨ Features

- **Home Page** — Browse property listings with images, pricing, ratings, location, and availability badges
- **Interactive Map** — Explore properties plotted on a map with filtering and availability indicators
- **Property Details** — View detailed information about individual listings
- **Booking System** — Book a property with date selection and confirmation flow
- **Dashboard** — Personal overview with active rentals, saved favorites, and total monthly spend
- **My Rentals** — Manage and review current and past rental bookings
- **Favorites** — Save and revisit preferred properties
- **Authentication** — Login and registration system with session persistence via localStorage
- **Dark Mode** — System-wide dark/light theme toggle with preference saved across sessions
- **Responsive Design** — Fully mobile-friendly with a hamburger navigation menu

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Custom styling, layouts, and theming |
| JavaScript (Vanilla) | Interactivity, DOM manipulation, auth logic |
| Bootstrap 5 | Responsive grid system and UI components |
| Leaflet.js / Map API | Interactive property map |
| localStorage | Client-side auth and dark mode persistence |

---

## 📁 Project Structure

```
Rento/
├── Home_page/
│   ├── home.html
│   ├── home.css
│   └── home.js
├── map/
│   ├── map.html
│   ├── map.css
│   └── map.js
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
├── booking/
│   ├── booking.html
│   ├── booking.css
│   └── booking.js
├── Details/
│   ├── details.html
│   ├── details.css
│   └── details.js
├── favorites/
│   ├── favorites.html
│   ├── favorites.css
│   └── favorites.js
├── my-rentals/
│   ├── my-rentals.html
│   ├── my-rentals.css
│   └── my-rentals.js
├── login/
│   ├── login.html
│   ├── login.css
│   └── login.js
├── signup/
│   ├── sign.html
│   ├── sign.css
│   └── sign.js
├── about/
│   ├── about.html
│   ├── about.css
│   └── about.js
├── shared/
│   ├── auth.js          # Shared authentication & dark mode logic
│   └── dark.css         # Global dark mode styles
└── rento.png            # App logo
```

---

## 🚀 Getting Started

Since this is a purely front-end project with no backend or build step, getting it running is straightforward.

### Prerequisites

A modern web browser (Chrome, Firefox, Edge, Safari).

### Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rento.git
   ```

2. Open `Home_page/home.html` in your browser.

   Or, for a better experience with correct relative paths, serve it with a local server:
   ```bash
   # Using VS Code Live Server extension, or:
   npx serve .
   # Then navigate to http://localhost:3000/Home_page/home.html
   ```

> **Note:** Some features (auth state, dark mode) rely on `localStorage`, which works best when served over HTTP rather than opened as a `file://` URL.

---

## 📸 Screenshots

| Page | Preview |
|---|---|
| Home | Property listings grid with search |
| Map | Interactive map with property pins |
| Dashboard | Rental stats and activity overview |
| Booking | Date picker and confirmation form |

*(Add your screenshots here)*

---

## 📄 Documentation

The `HCI/` folder includes:
- `documentation.pdf` — Full project documentation including design decisions, wireframes, and HCI analysis
- `Rento_Requirements_Analysis.pdf` — Requirements analysis and use case breakdown
- `rento use case.png` — Use case diagram



