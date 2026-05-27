---
name: SynthData
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5b605b'
  on-secondary: '#ffffff'
  secondary-container: '#dfe4dd'
  on-secondary-container: '#616661'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#dfe4dd'
  secondary-fixed-dim: '#c3c8c2'
  on-secondary-fixed: '#181d19'
  on-secondary-fixed-variant: '#434843'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '450'
    lineHeight: '1.5'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system embodies a Swiss editorial aesthetic tailored for high-stakes enterprise data synthesis. The personality is disciplined, intellectual, and utilitarian, drawing inspiration from the structured clarity of modernist graphic design. It rejects the "neon-and-glow" tropes of traditional AI products in favor of an industrial, human-centric interface that feels like a precision instrument.

The visual direction is rooted in **Minimalism** with an **Industrial** edge. It prioritizes information density, crisp borders, and a rhythmic use of negative space. The emotional goal is to evoke a sense of absolute reliability, calm, and architectural permanence. Every element must feel intentional, as if set by a master typographer.

## Colors

The palette is monochromatic and warm, moving away from sterile blue-tinted grays. 

- **Background:** A soft, warm off-white (#F9F8F6) serves as the "paper" of the interface, reducing eye strain and providing a premium, tactile feel.
- **Primary:** Charcoal Black (#1A1A1A) is used for high-contrast typography and primary actions, ensuring a grounded, authoritative presence.
- **Secondary/Accents:** An Olive-tinted Gray (#5E635E) provides a sophisticated point of focus without breaking the neutral harmony.
- **Borders:** Subtle neutral grays (#E5E5E1) provide structure without adding visual noise, mimicking the thin rules of a printed ledger.

Avoid all gradients, glows, and vibrant saturation. Use solid fills and high-contrast overlaps to define hierarchy.

## Typography

The typography is the core of the design system. It utilizes **Geist** for its technical precision and sharp terminals. The hierarchy is defined by extreme weight contrast—pairing heavy headlines with light, airy body text. 

For data-heavy views or synthetic schema definitions, a secondary monospaced font (JetBrains Mono) may be used at small scales to reinforce the industrial, developer-centric nature of the product. Letter spacing should be tight for headlines to create a "locked-in" editorial feel and slightly expanded for uppercase labels to improve legibility.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain editorial control over line lengths and readability. 

- **Grid:** 12-column system with a 24px gutter. 
- **Rhythm:** An 8px linear scale (with a 4px half-step for micro-adjustments) governs all margins and padding.
- **Density:** Information density should be high. Use tight padding in data tables and sidebars, while allowing large "air-gaps" (40px+) between major content sections to maintain a premium feel.
- **Adaptation:** On mobile, margins shrink to 16px, and the 12-column grid collapses to a single-column stack. Content-heavy tables should utilize horizontal scrolling with pinned key columns.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Low-contrast Outlines** rather than traditional shadows. 

1. **Flat Foundation:** The main background (#F9F8F6) is the lowest level.
2. **Surface Containers:** Cards and modals use a slightly brighter white (#FFFFFF) or a very subtle tint to differentiate from the base.
3. **Borders over Shadows:** Use 1px solid borders (#E5E5E1) to define boundaries. 
4. **Hover States:** Instead of large shadows, use a subtle 2px `translateY(-1px)` shift and a slightly darker border color (#D1D1CB) to indicate interactivity.
5. **Backdrop:** Modals should use a high-density blur (20px) with a semi-transparent warm gray overlay to maintain focus without introducing pitch-black overlays.

## Shapes

The shape language is strictly **Soft (0.25rem)**. This provides just enough approachable warmth to prevent the interface from feeling aggressive or "sharp," while maintaining the structural integrity of the Swiss design style.

- **Standard Elements:** 4px radius (Buttons, Inputs, Small Cards).
- **Large Containers:** 8px radius (Main Content areas, Modals).
- **Interactive Indicators:** Small 2px radius or sharp edges for interior components like checkboxes.

## Components

- **Buttons:** High-contrast. Primary buttons use #1A1A1A background with #F9F8F6 text. Secondary buttons use a transparent background with a 1px border. Interactions are limited to a slight background color shift—no heavy glows.
- **Cards:** Minimalist with no shadows. Defined by a 1px #E5E5E1 border. Headers within cards should use the `label-caps` typography style for clear sectioning.
- **Data Tables:** High-density. Use `zebra rows` with a #F3F2F0 alternate fill. Table headers use `label-caps` with a bottom border but no side borders.
- **Input Fields:** Rectangular with a 4px radius. Use a subtle #E5E5E1 border that darkens to #1A1A1A on focus. Placeholder text should be in #4A4A4A at 70% opacity.
- **Chips:** Small, rectangular, and neutral. Use the Olive Gray (#5E635E) for "Active" or "Success" states, kept at a low saturation.
- **Motion:** Transitions are limited to 150ms ease-out fades and 2px vertical translations. Avoid any "spring" or "bounce" animations to keep the experience professional and grounded.