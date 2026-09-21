# Addis Eats — Product Specification

## Overview
Addis Eats is a food ordering and delivery web application built for residents, workers, and visitors in Addis Ababa, Ethiopia. It provides a digital menu for traditional Ethiopian dishes, order configuration, persistent cart management, and a localized delivery checkout flow.

---

## Target Audience & Geography
- **Primary Users:** Customers in Addis Ababa ordering meals to homes or offices.
- **Coverage Sub-Cities:** Bole, Kirkos, Arada, Yeka, Lideta, Nifas Silk-Lafto, Kolfe Keranio, and Gullele.
- **Dietary Considerations:** Clear indicators for traditional fasting (Tsom) vegan dishes alongside meat specialties.

---

## Core Features & User Workflows

### 1. Menu Browsing & Filtering
- Categorized view of dishes (Traditional, Breakfast, Fasting/Vegetarian, Salads, Beverages).
- URL-driven search query and category filtering for shareable, persistent links.
- Real-time empty state handling when no dishes match search criteria.

### 2. Dish Detail View
- Dynamic route per dish (`/menu/:id`) displaying price, preparation estimates, ingredient breakdown, and dietary tags.
- Direct quantity adjustment and add-to-cart action.

### 3. Order & Cart Management
- Persistent shopping cart stored in browser `localStorage`.
- Real-time calculation of dish subtotals, standard delivery fee, and running order total in Ethiopian Birr (ETB).
- Clear cart confirmation modal preventing accidental order loss.

### 4. Authenticated Delivery Checkout
- Route guard (`RequireAuth`) requiring user sign-in before checkout access, with automatic redirection back to checkout upon authentication.
- Delivery form capturing recipient name, verified Ethiopian phone number (`09...`, `07...`, or `+251...`), sub-city selection, and delivery address/landmark.
- Touch-tracking validation displaying inline errors and accessible indicators.
- Order confirmation receipt with unique order ID and itemized breakdown.

---

## Localization & Business Rules
- **Currency:** Ethiopian Birr (ETB) with tabular numerical alignment.
- **Delivery Fee:** Flat rate of 60 ETB per order within central Addis Ababa sub-cities.
- **Payment Options:** Telebirr, CBE Birr, and Cash on Delivery.
