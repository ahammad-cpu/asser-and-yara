# Asser & Yara — Wedding Invitation Landing Page
**Date written:** 2026-06-05  
**Wedding date:** July 1st, 2026  
**Venue:** The Vine, Orabi, Egypt

---

## Overview

A single-page wedding invitation website for Asser and Yara. Built as a pure HTML + CSS + JS single file (no framework, no backend). Guests receive a link and experience a beautiful, animated scroll journey celebrating the couple.

---

## Visual Identity

| Property | Value |
|----------|-------|
| Burgundy | `#6B1B2E` |
| Olive | `#7A7F45` |
| Blush | `#D4A0A7` |
| Cream | `#F5F0E8` |
| Heading font | Cormorant Garamond (Google Fonts) |
| Body font | Lato (Google Fonts) |
| Background | Cream `#F5F0E8` throughout |

---

## Sections (top → bottom)

### 1. Hero
- Full-viewport-height section
- Background: the "It Was Always You" neon sign engagement photo (photo 3)
- Dark overlay (burgundy tint, ~40% opacity) so text is readable
- Animated falling rose petals (CSS + JS, ~15 petals, random positions/speeds)
- Center-aligned content:
  - Small caps label: "YOU ARE INVITED TO THE WEDDING OF"
  - Large script heading: **Asser & Yara** (Cormorant Garamond italic, ~96px)
  - Divider line with small floral ornament
  - Date: **July 1st, 2026**
  - Location: **The Vine, Orabi, Egypt**
- Pulsing scroll-down chevron arrow at bottom

### 2. Countdown Timer
- Cream background section
- Heading: "Days Until We Say I Do"
- 4 live-ticking boxes: **Days · Hours · Minutes · Seconds**
- Boxes styled with burgundy border, olive accent on labels
- Numbers update every second via JS `setInterval`
- Target date: `2026-07-01T00:00:00` (Cairo timezone offset)
- Fade-in on scroll entry

### 3. Our Story
- Two-column layout (text left, photo right) on desktop; stacked on mobile
- Heading: "Our Story"
- Placeholder text:
  > "Some love stories are written in the stars — ours was written in stolen glances, shared laughter, and a thousand quiet moments that became our world. Asser and Yara met and knew, in that way you just know, that this was it. Through every adventure and every ordinary Tuesday, they chose each other. On July 1st, 2026, they make it forever."
- Photo: the Christmas glasses fun photo (photo 4) — reveals with cinematic curtain-wipe animation on scroll
- Soft olive botanical illustration as background accent (CSS, decorative)

### 4. Event Details
- Cream/white cards on a light olive-tinted background
- 2 cards (was 3, dress code removed):
  - 📅 **The Date** — Wednesday, July 1st, 2026
  - 📍 **The Venue** — The Vine, Orabi, Egypt
- Cards fade in with staggered delay (card 1 then card 2, 150ms apart)
- Each card has a burgundy icon, olive accent border, Cormorant heading

### 5. Gallery
- Heading: "Asser & Yara"
- Masonry grid layout, 5 photos:
  1. Ring show at brick wall (portrait, engagement)
  2. Hugging at brick wall (portrait)
  3. "It Was Always You" neon sign (horizontal, ceremony-style)
  4. Christmas glasses selfie (casual/fun)
  5. Rooftop restaurant night (romantic)
- Photos encoded as base64 inline (no external hosting needed)
- Hover: subtle scale-up + soft shadow
- Click: lightbox overlay opens with prev/next navigation
- Photos reveal one-by-one with cinematic wipe on scroll entry

### 6. Location / Map
- Heading: "Find Us"
- Subtext: "The Vine, Orabi, Egypt"
- Google Maps iframe embed centered on The Vine, Orabi
- Elegant burgundy border frame around the map
- Below map: a small "Get Directions" button linking to Google Maps
- Section fades in on scroll

---

## Animations

| Animation | Trigger | Implementation |
|-----------|---------|----------------|
| Falling rose petals | Page load | JS: spawn `<div>` petals with random CSS transforms |
| Section fade + slide up | Scroll into view | `IntersectionObserver` adds `.visible` class |
| Gallery curtain wipe | Scroll into view | CSS clip-path animation per photo, staggered |
| Countdown flip | Every second | `setInterval` updates DOM |
| Scroll chevron pulse | Always | CSS `@keyframes` bounce |
| Photo hover zoom | Mouse hover | CSS `transform: scale(1.04)` |

---

## Technical Specs

- **Single file**: `index.html` with inline `<style>` and inline `<script>`
- **No framework**: Vanilla JS, plain CSS
- **No backend**: Static, no form, no server
- **Fonts**: Google Fonts CDN (Cormorant Garamond + Lato)
- **Images**: All 5 photos embedded as base64 data URIs inside the HTML
- **Browser support**: Modern browsers (Chrome, Safari, Firefox, Edge)
- **Mobile**: Fully responsive — single column on mobile, two-column on desktop
- **Deployment**: Can be opened directly as a local file OR deployed to Vercel/Netlify by dropping the single file

---

## File Delivery

Single file: `/Users/appleera/Downloads/asser-yara-wedding/index.html`
