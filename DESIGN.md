# Design System & UI Guide

This document outlines the visual design system, color palette, typography hierarchy, and UI patterns for Addis Eats.

---

## 1. Color Palette

The interface uses a warm, food-inspired palette rooted in Ethiopian culinary heritage—terracotta, spiced berbere, honey tej amber, and mineral grounds—paired with high-contrast text.

### Brand & Accent Colors
| Token | Hex | Role | Usage |
|---|---|---|---|
| `--color-berbere` | `#c23b22` | Primary Brand Accent | CTAs, active highlights, key links |
| `--color-berbere-hover` | `#a32c16` | Hover State | Button hover, active link state |
| `--color-gold` | `#d97706` | Secondary Accent | Focus rings, rating badges, special tags |
| `--color-gold-light` | `#fef3c7` | Highlight Fill | Badge backgrounds, banner highlights |
| `--color-rosemary` | `#235d3a` | Dietary / Status Accent | Vegetarian / Fasting badges, positive alerts |
| `--color-rosemary-soft` | `#eaf5ed` | Soft Green Background | Fasting tag pills |

### Backgrounds & Surfaces
| Token | Hex | Usage |
|---|---|---|
| `--color-bg-base` | `#fbf9f5` | Main page body background (warm mineral parchment) |
| `--color-surface` | `#ffffff` | Elevated cards, dialogs, dropdowns |
| `--color-surface-sunken` | `#f4eee3` | Inputs, secondary panels, item rows |
| `--color-obsidian` | `#181513` | Footer background, dark contrast elements |

### Text & Ink
| Token | Hex | Usage |
|---|---|---|
| `--color-ink-primary` | `#1c1815` | Headings, titles, primary body text (contrast ratio ≥ 7:1) |
| `--color-ink-secondary` | `#564e45` | Subtitles, descriptions, card summaries |
| `--color-ink-muted` | `#8c8175` | Captions, helper text, preparation times |
| `--color-ink-on-dark` | `#fbf9f5` | Text on dark surfaces and primary buttons |

---

## 2. Typography

Two typefaces are loaded from Google Fonts:

1. **Display & Headings:** `Fraunces` (Serif)
   - Used for page titles, hero headlines, and section headers.
   - Conveys warmth and artisanal culinary character.
2. **Body & Interface:** `Plus Jakarta Sans` (Sans-Serif)
   - Used for body text, navigation, buttons, form inputs, and metadata.
   - Crisp and legible at small sizes across all screen densities.
3. **Numerals:** Tabular numbers (`font-variant-numeric: tabular-nums`)
   - Applied to prices, item counters, and cart subtotals to prevent layout shifts when values update.

---

## 3. Elevation & Radius

### Shadows
- **Small (`--shadow-sm`):** `0 1px 3px rgba(28, 24, 21, 0.06)` — cards on hover, pills
- **Medium (`--shadow-md`):** `0 4px 6px -1px rgba(28, 24, 21, 0.06)` — standard dish cards
- **Large (`--shadow-lg`):** `0 10px 20px -3px rgba(28, 24, 21, 0.08)` — sticky header, modals

### Corner Radii
- **Input / Button:** `8px`
- **Card / Container:** `12px` to `16px`
- **Pills / Badges:** `9999px`

---

## 4. UI Patterns & Accessibility

- **Keyboard Navigation:** All interactive controls (buttons, links, inputs) have a distinct `outline: 2px solid var(--color-gold)` with `outline-offset: 3px` on `:focus-visible`.
- **Greyscale Accessibility:** Form errors in checkout include both a text description and an icon badge (`[!]`), ensuring errors are distinguishable even if color perception is impaired.
- **Interactive Feedback:** Dish addition shows immediate inline confirmation ("Added ✓") and updates the cart counter in the header in real time.
- **Empty & Error States:** Clear messaging with recovery actions (e.g. "Try Again" on network errors, "Clear Filters" when searches yield no matches).
