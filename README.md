# Addis Eats — Food Ordering Frontend for Addis Ababa

A food ordering frontend designed and developed for Addis Ababa, Ethiopia, built to fulfill the **IBT College Canada CodeOps · Module 3 · Day 35 React Mini-Project Brief & Rubric**.

Browse an authentic menu loaded from an API helper, filter by category directly in the URL, view dish ingredients and preparation details on dynamic routes, manage a cart across multiple screens in Ethiopian Birr (ETB), and complete an order via a validated, accessible checkout guarded by user authentication.

---

## 🗺️ Route Map & Screen Breakdown

| Screen | Route | Dynamic / Guarded | Description |
|---|---|---|---|
| **Home** | `/` | Standard | Hero banner, chef's today specials highlight, quick link to menu |
| **Menu** | `/menu` | URL Param (`?category=...`, `?q=...`) | Fetched dishes, search, category filter in the URL, loading, error, and friendly empty states |
| **Dish Detail** | `/menu/:id` | Dynamic (`:id`) | Fetches dish by ID with unmount cleanup, ingredients breakdown, quantity selector, add-to-order |
| **Cart** | `/cart` | Store-driven | Order lines, item controls (`- / +`), line removal, running ETB total with delivery fee |
| **Checkout** | `/checkout` | Guarded & Lazy-Loaded | Controlled delivery form with touched validation, error summaries, accessible in greyscale, guarded by `<RequireAuth>` |
| **Login** | `/login` | Standard | Auth session screen; preserves `location.state.from` and returns to checkout after signing in |
| **Not Found** | `*` | Catch-all | Helpful 404 error screen with route diagnostics and navigation back home |

---

## 📚 CodeOps Curriculum Alignment (Days 26 – 34)

| Day Topic | Required Feature | Project Implementation |
|---|---|---|
| **Days 26–27** | Composed components, props, keys, conditional rendering | Decomposed single-responsibility components (`DishList`, `DishCard`, `CategoryBar`, `Field`, `CartBadge`) |
| **Day 28** | State, events, and a controlled form | Fully controlled form in `src/checkout/Checkout.jsx` with input change handlers and touched tracking |
| **Day 29** | Data fetched in an effect with cleanup on unmount | `src/hooks/useFetch.js` uses `AbortController` to abort in-flight promises when unmounting or deps change |
| **Day 30** | A custom hook, and context or a store | Reusable `useFetch` and `useDebounce` hooks; `CartContext` order store; `AuthContext` user session |
| **Day 31** | Nested routes, a dynamic route and a guarded route | `<Layout>` with `<Outlet />`; dynamic route `/menu/:id`; guarded route `/checkout` via `<RequireAuth>` |
| **Days 33–34** | Validation, an error boundary, and one lazy-loaded route | Accessible validation in `validate.js` + `Field.jsx` (visible in greyscale); `<ErrorBoundary>`; `React.lazy` checkout chunk |

---

## 📂 Feature-Based Folder Architecture

The codebase is organized strictly **by feature**, rather than an untyped generic components dumping ground:

```text
src/
├── api/
│   └── dishesApi.js           # Fetch helpers, abort signal handling, delay, single dish lookup
├── hooks/
│   ├── useFetch.js            # Reusable data fetch hook with AbortController cleanup
│   └── useDebounce.js         # Reusable debounced input hook
├── ui/
│   ├── Button.jsx             # Generic design system button (primary, secondary, outline, danger)
│   ├── Spinner.jsx            # Accessible loading spinner with role="status"
│   ├── Modal.jsx              # Accessible modal dialog with focus trapping and ESC support
│   └── ErrorBoundary.jsx      # React error boundary catching render-time errors
├── cart/
│   ├── CartContext.jsx        # Order store (cart items, qty modifiers, running ETB total)
│   ├── CartBadge.jsx          # Live badge in navigation bar
│   └── CartPage.jsx           # Order lines table, running ETB total, proceed action
├── menu/
│   ├── Menu.jsx               # Menu screen reading and updating URL search params
│   ├── CategoryBar.jsx        # Category navigation tabs
│   ├── DishList.jsx           # Pure list renderer receiving dishes via props
│   ├── DishCard.jsx           # Dish preview card with "Add to Order" action
│   └── DishDetail.jsx         # Dynamic screen for /menu/:id with ingredients and dietary tags
├── checkout/
│   ├── Checkout.jsx           # Controlled delivery form, touched tracking, order placement
│   ├── validate.js            # Pure validation rules (name, Ethiopian phone, sub-city, address)
│   └── Field.jsx              # Accessible field with label, error text, [!] icon, aria-describedby
├── auth/
│   ├── AuthContext.jsx        # Session store for sign-in state
│   ├── RequireAuth.jsx        # Route guard redirecting unauthenticated users to /login
│   └── LoginPage.jsx          # Sign-in screen redirecting back to target location
├── home/
│   └── Home.jsx               # Landing view with chef's specials highlight
├── layout/
│   └── Layout.jsx             # Header, Navigation, CartBadge, Auth status, Outlet, Footer
├── pages/
│   └── NotFound.jsx           # 404 Catch-all route
├── App.jsx                    # Router, Error Boundary, Auth & Cart providers, Lazy route
├── App.css                    # Handcrafted, accessible, responsive CSS styling
└── main.jsx                   # React 19 entry point
```

---

## 🎯 State Placement Decisions (Rubric Section 2.2)

- **Selected category**: Stored in the **URL query string** (`useSearchParams`) — bookmarkable, shareable, and survives a page refresh.
- **Fetched dishes**: Kept local to the components that display them (`Menu` and `DishDetail` via `useFetch`).
- **The order / cart**: Kept in **`CartContext`** — read and modified across four different screens (Navbar badge, DishCard / DishDetail, Cart page, Checkout summary).
- **Sign-in session**: Kept in **`AuthContext`** — persistent user session required by `<RequireAuth>` guard.
- **Checkout form fields**: Kept strictly inside the **`Checkout` component** — isolated form state, touched states, and submit status.
- **Modal open state**: Kept in the local component controlling it.

---

## 🧪 Testing the Six Failure Paths (Rubric Part 3)

1. **Throttle to Slow 3G**: Loading spinners appear immediately with accessible status text; never a blank screen.
2. **Rename data / Simulated Failure**: The error state displays a friendly error box with a "Try Again" refetch button.
3. **Filter to an Empty Category**: Selecting a category or search query with zero matches displays a friendly empty state ("No dishes found"), not an error or crash.
4. **Nonsense URL**: Typing `/some/invalid/path` renders the `NotFound` screen with a clear way back.
5. **Open `/checkout` signed out**: Unauthenticated users are redirected to `/login` preserving target location in state, and automatically returned to `/checkout` upon signing in.
6. **Reload on every screen**: Every route (`/`, `/menu`, `/menu/1`, `/cart`, `/checkout`, `/login`, `/unknown`) loads cold from the browser address bar without crashing.
7. **Accessibility & Greyscale**: Checkout form can be navigated entirely via keyboard (`Tab`, `Space`, `Enter`). All form validation errors include clear text and `[!]` indicator badges so errors remain unmistakably clear with color completely removed.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/Riter-Rob/addis_eats.git
cd addis_eats

# Install dependencies
npm install

# Start development server
npm run dev

# Run ESLint validation
npm run lint

# Build production bundle
npm run build
```
