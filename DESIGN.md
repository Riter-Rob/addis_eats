---
name: Addis Eats "Mesob & Clay"
description: An artisanal Ethiopian culinary design system blending warm earthenware terracotta, fiery berbere vermilion, golden tej amber, and deep volcanic obsidian.
colors:
  # Primary Accents
  berbere-vermilion: "oklch(56% 0.20 32)"       # #c23b22 - Primary brand CTA and highlight
  berbere-deep: "oklch(46% 0.18 30)"            # #9a2b16 - Hover and active states
  tej-gold: "oklch(76% 0.16 75)"                # #d97706 - Secondary gold, badges, stars
  tej-light: "oklch(88% 0.11 82)"               # #fef3c7 - Soft highlight fills
  highland-rosemary: "oklch(50% 0.12 148)"      # #2d5a3e - Fasting / Vegetarian badge

  # Surfaces & Grounds
  parchment-ground: "oklch(98% 0.008 75)"       # #fcfaf6 - Warm organic page background
  surface-card: "oklch(100% 0 0)"               # #ffffff - Pure crisp surface
  surface-sunken: "oklch(96% 0.012 75)"         # #f5f0e6 - Insets, inputs, secondary panels
  obsidian-dark: "oklch(18% 0.015 45)"          # #181513 - Volcanic charcoal for footer & contrast
  obsidian-surface: "oklch(23% 0.015 45)"       # #231f1c - Raised dark panels

  # Text & Ink
  ink-primary: "oklch(22% 0.02 45)"             # #1c1815 - High-contrast readable dark ink
  ink-secondary: "oklch(45% 0.02 45)"           # #5a524a - Subtitles, descriptions, captions
  ink-muted: "oklch(62% 0.015 50)"              # #8e8479 - Meta information and timestamps
  ink-on-dark: "oklch(96% 0.005 75)"            # #f7f5f2 - Pure legible text on obsidian

  # Rules & Borders
  border-warm: "oklch(90% 0.018 75)"            # #e8ded2 - Subtle earthenware hairline border
  border-accent: "oklch(76% 0.16 75 / 0.35)"    # Gold-tinted active rule

typography:
  display:
    fontFamily: "'Fraunces', Georgia, serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "'Fraunces', Georgia, serif"
    fontWeight: 600
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    fontWeight: 600
    letterSpacing: "0.01em"
  numeral:
    fontVariantNumeric: "tabular-nums"

rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  pill: "9999px"

spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  "2xl": "64px"
---

# Design System: Mesob & Clay (Addis Eats)

## 1. Creative North Star: "Mesob & Clay"
Addis Eats honors the physical warmth, hospitality, and sensory textures of Ethiopian culinary tradition:
- **Warm Earthenware & Volcanic Obsidian:** Replace cold SaaS grays (`#f8fafc`, `#e2e8f0`) with warm mineral parchment grounds and obsidian dark accents.
- **Berbere & Tej Gold:** Authentic culinary color anchors: deep spiced berbere vermilion for primary action, and golden tej honey wine for awards and ratings.
- **Editorial Typography:** Headings in **Fraunces** evoke vintage artisanal menus and culinary heritage; interface elements in **Plus Jakarta Sans** ensure effortless readability.
- **Craft Floor Compliance:** Strict contrast ratios ($\ge 4.5:1$), custom browser selection and scrollbars, zero un-tinted dead grays, and no eyebrow tags or nested cards.
