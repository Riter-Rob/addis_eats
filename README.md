# Addis Eats

A responsive food ordering web application designed for Addis Ababa, Ethiopia. Addis Eats lets users explore local dishes, filter by category or search term, view detailed ingredient lists, manage a persistent shopping cart in Ethiopian Birr (ETB), and complete orders through a validated checkout flow.

---

## Features

- **Menu Browsing & Search:** Filter by category or search dish names and ingredients in real time.
- **URL-Synchronized Filters:** Category and search parameters sync with the URL query string (`?category=Traditional&q=tibs`), making filters shareable and refresh-safe.
- **Dish Details:** Dynamic route (`/menu/:id`) showcasing ingredients, dietary tags (vegetarian/fasting), estimated preparation times, and quantity selectors.
- **Persistent Cart:** Order items persist across page reloads via `localStorage`, featuring item quantity controls, item removal, and a clear-cart confirmation modal.
- **Protected Checkout:** The `/checkout` route is guarded by an authentication wrapper; unauthenticated users are directed to `/login` and returned directly to checkout upon signing in.
- **Form Validation:** The checkout form tracks field-level touched state and validates Ethiopian mobile phone numbers (`09...`, `07...`, or `+251...`), delivery sub-cities, and street landmarks.
- **Error Recovery:** Handles edge cases gracefully with a catch-all 404 screen, empty search results states, retry options for simulated network failures, and a top-level React Error Boundary.
- **Accessible UI:** Includes a skip-to-content link, keyboard focus styling, ARIA status announcements, and high-contrast error states that remain legible in greyscale.

---

## Tech Stack

- **Framework:** React 19
- **Routing:** React Router 7 (`BrowserRouter`, nested routes, dynamic parameters, lazy loading)
- **Tooling & Bundler:** Vite 8
- **Styling:** Vanilla CSS with custom properties (no external CSS framework)
- **Icons:** Inline SVG icons for zero external icon library overhead

---

## Project Structure

```text
src/
├── api/
│   └── dishesApi.js           # Mock API service, dish catalog, and lookup helpers
├── auth/
│   ├── AuthContext.jsx        # User session context and local storage persistence
│   ├── LoginPage.jsx          # Sign-in view preserving return redirect location
│   └── RequireAuth.jsx        # Protected route wrapper
├── cart/
│   ├── CartBadge.jsx          # Live cart count badge in navbar
│   ├── CartContext.jsx        # Cart state, quantity modifiers, and subtotal calculations
│   └── CartPage.jsx           # Order summary table and clear-cart dialog
├── checkout/
│   ├── Checkout.jsx           # Controlled delivery form with touched-state tracking
│   ├── Field.jsx              # Accessible form field component with inline error display
│   └── validate.js            # Pure validation rules for phone, sub-city, and address
├── home/
│   └── Home.jsx               # Landing page with hero banner and today's specials
├── hooks/
│   ├── useDebounce.js         # Input debouncing hook
│   └── useFetch.js            # Fetch wrapper handling loading, errors, and unmount cancellation
├── layout/
│   └── Layout.jsx             # Shell containing header navigation, main outlet, and footer
├── menu/
│   ├── CategoryBar.jsx        # Category selection tab bar
│   ├── DishCard.jsx           # Dish card with instant add-to-cart action
│   ├── DishDetail.jsx         # Dynamic detail page for single dishes
│   ├── DishList.jsx           # Grid renderer for dish collections
│   └── Menu.jsx               # Menu page reading and updating URL query parameters
├── pages/
│   └── NotFound.jsx           # 404 error page with navigation back to home
├── ui/
│   ├── Button.jsx             # Reusable button supporting variants and loading state
│   ├── ErrorBoundary.jsx      # Class component catching render errors
│   ├── Modal.jsx              # Accessible modal dialog rendered via React portal
│   └── Spinner.jsx            # Loading indicator with accessible status text
├── App.jsx                    # Root routes and providers configuration
├── App.css                    # Component and page stylesheets
├── index.css                  # Design tokens, reset, and base browser styles
└── main.jsx                   # Application entry point
```

---

## Local Setup

### Prerequisites
- Node.js 18+ and npm installed

### Installation & Development
```bash
# Clone repository
git clone https://github.com/Riter-Rob/addis_eats.git
cd addis-eats

# Install dependencies
npm install

# Start local dev server
npm run dev

# Run linter
npm run lint

# Build production bundle
npm run build
```

---

## Architecture Notes

### State Management Strategy
- **Search & Category Filters:** Stored in the URL query string (`useSearchParams`). This keeps navigation history functional and allows users to bookmark or share filtered menu views.
- **Cart & Authentication:** Managed using React Context (`CartContext` and `AuthContext`) with automatic `localStorage` synchronization.
- **Form State:** Isolated within the `Checkout` component, storing input values, touched flags, and validation errors locally to prevent unnecessary parent re-renders.

### Performance & Bundle Optimization
- The `Checkout` view is split and loaded on demand using `React.lazy` and `Suspense`, keeping the initial entry bundle lean.
- In-flight fetch requests inside `useFetch` utilize `AbortController` to cancel pending responses if the user navigates away before completion.
