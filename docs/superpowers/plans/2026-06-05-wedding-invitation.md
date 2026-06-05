# Asser & Yara Wedding Invitation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file animated wedding invitation landing page for Asser & Yara (July 1st, 2026, The Vine, Orabi, Egypt).

**Architecture:** One self-contained `index.html` file with inline `<style>` and `<script>` blocks. No framework, no build step, no backend. Photos embedded as base64 data URIs. Animations via CSS keyframes + IntersectionObserver scroll triggers.

**Tech Stack:** HTML5, CSS3 (custom properties, keyframes, clip-path), Vanilla JS (IntersectionObserver, setInterval, lightbox), Google Fonts CDN (Cormorant Garamond + Lato).

---

## File Map

| File | Role |
|------|------|
| `index.html` | Entire app — markup, styles, scripts |
| `photos/` | Source photos (user provides; converted to base64 inline) |

---

## Task 1: Project Scaffold + CSS Variables + Fonts

**Files:**
- Create: `/Users/appleera/Downloads/asser-yara-wedding/index.html`

- [ ] **Step 1: Create the HTML skeleton**

Create `index.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Asser & Yara — July 1st, 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
  <style>
    /* ── CSS Custom Properties ── */
    :root {
      --burgundy: #6B1B2E;
      --burgundy-light: #8B2840;
      --olive: #7A7F45;
      --olive-light: #B5B87A;
      --blush: #D4A0A7;
      --cream: #F5F0E8;
      --cream-dark: #EDE6D6;
      --white: #FFFFFF;
      --text-dark: #2C1810;
      --text-mid: #5A4040;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'Lato', sans-serif;
    }

    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--cream);
      color: var(--text-dark);
      font-family: var(--font-sans);
      overflow-x: hidden;
    }

    /* ── Scroll Reveal Base ── */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.9s ease, transform 0.9s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>

  <!-- sections go here -->

  <script>
    // scripts go here
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify it opens in browser**

Open `index.html` in Chrome/Safari. Should show a blank cream page with no errors in the console.

- [ ] **Step 3: Commit**

```bash
cd /Users/appleera/Downloads/asser-yara-wedding
git init
git add index.html
git commit -m "feat: scaffold html, css variables, google fonts"
```

---

## Task 2: Hero Section — Full-Screen + Falling Petals

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add hero HTML inside `<body>` before the closing `</body>` tag**

Replace `<!-- sections go here -->` with:

```html
<!-- ══ HERO ══ -->
<section id="hero">
  <div class="hero-overlay"></div>
  <div id="petals-container" aria-hidden="true"></div>
  <div class="hero-content reveal">
    <p class="hero-label">YOU ARE INVITED TO THE WEDDING OF</p>
    <h1 class="hero-names">Asser <span class="hero-amp">&</span> Yara</h1>
    <div class="hero-divider">
      <span class="hero-divider-line"></span>
      <span class="hero-flower">✿</span>
      <span class="hero-divider-line"></span>
    </div>
    <p class="hero-date">July 1st, 2026</p>
    <p class="hero-location">The Vine · Orabi · Egypt</p>
  </div>
  <div class="hero-scroll-arrow">
    <span>&#8964;</span>
  </div>
</section>
```

- [ ] **Step 2: Add hero CSS inside `<style>` block**

Append inside the `<style>` tag after the `.reveal.visible` rule:

```css
/* ══ HERO ══ */
#hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--burgundy);
  /* PHOTO: replace the url() below with base64 data URI in Task 6 */
  background-image: url('HERO_PHOTO_PLACEHOLDER');
  background-size: cover;
  background-position: center top;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(60, 10, 20, 0.55) 0%,
    rgba(60, 10, 20, 0.45) 60%,
    rgba(60, 10, 20, 0.65) 100%
  );
  z-index: 1;
}

#petals-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.petal {
  position: absolute;
  top: -30px;
  width: 14px;
  height: 14px;
  background: var(--blush);
  border-radius: 50% 0 50% 0;
  opacity: 0.75;
  animation: petalFall linear infinite;
}

@keyframes petalFall {
  0%   { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.8; }
  50%  { transform: translateY(50vh) rotate(180deg) translateX(30px); }
  100% { transform: translateY(105vh) rotate(360deg) translateX(-20px); opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: var(--cream);
  padding: 2rem;
}

.hero-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--blush);
  margin-bottom: 1.5rem;
}

.hero-names {
  font-family: var(--font-serif);
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1;
  color: var(--white);
  text-shadow: 0 2px 20px rgba(0,0,0,0.4);
  margin-bottom: 1.5rem;
}

.hero-amp {
  color: var(--blush);
  font-size: 0.8em;
}

.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.hero-divider-line {
  display: block;
  width: 80px;
  height: 1px;
  background: var(--blush);
  opacity: 0.7;
}

.hero-flower {
  color: var(--blush);
  font-size: 1.2rem;
}

.hero-date {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--cream);
  margin-bottom: 0.6rem;
}

.hero-location {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--blush);
}

.hero-scroll-arrow {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  color: var(--blush);
  font-size: 2.5rem;
  animation: bounce 2s ease-in-out infinite;
  cursor: pointer;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(10px); }
}
```

- [ ] **Step 3: Add petal spawn JS inside `<script>` block**

Replace `// scripts go here` with:

```javascript
/* ── Falling Petals ── */
function spawnPetals() {
  const container = document.getElementById('petals-container');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 8 + Math.random() * 12;
    petal.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${0.5 + Math.random() * 0.4};
      border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
    `;
    container.appendChild(petal);
  }
}
spawnPetals();

/* ── Scroll arrow click ── */
document.querySelector('.hero-scroll-arrow').addEventListener('click', () => {
  document.getElementById('countdown').scrollIntoView({ behavior: 'smooth' });
});
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. Should see:
- Dark burgundy full-screen section (placeholder bg color until photo added)
- "Asser & Yara" in large italic script
- "The Vine · Orabi · Egypt" in small caps
- Animated petals falling from top
- Bouncing scroll arrow at bottom

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: hero section with falling petals animation"
```

---

## Task 3: Countdown Timer Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add countdown HTML after the `</section>` closing tag of hero**

```html
<!-- ══ COUNTDOWN ══ -->
<section id="countdown">
  <p class="section-eyebrow reveal">Counting Down To Forever</p>
  <h2 class="section-heading reveal">Days Until We Say I Do</h2>
  <div class="countdown-grid reveal">
    <div class="countdown-box">
      <span class="countdown-num" id="cd-days">--</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-sep">:</div>
    <div class="countdown-box">
      <span class="countdown-num" id="cd-hours">--</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-sep">:</div>
    <div class="countdown-box">
      <span class="countdown-num" id="cd-minutes">--</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-sep">:</div>
    <div class="countdown-box">
      <span class="countdown-num" id="cd-seconds">--</span>
      <span class="countdown-label">Seconds</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add countdown CSS**

Append inside `<style>`:

```css
/* ══ SHARED SECTION STYLES ══ */
section {
  padding: 5rem 2rem;
}

.section-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--olive);
  text-align: center;
  margin-bottom: 0.75rem;
}

.section-heading {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  font-style: italic;
  text-align: center;
  color: var(--burgundy);
  margin-bottom: 3rem;
}

/* ══ COUNTDOWN ══ */
#countdown {
  background: var(--cream-dark);
  text-align: center;
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.countdown-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border: 2px solid var(--burgundy);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  min-width: 110px;
}

.countdown-num {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 600;
  color: var(--burgundy);
  line-height: 1;
}

.countdown-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--olive);
  margin-top: 0.5rem;
}

.countdown-sep {
  font-family: var(--font-serif);
  font-size: 3rem;
  color: var(--burgundy);
  opacity: 0.4;
  margin-bottom: 1.2rem;
  align-self: center;
}

@media (max-width: 500px) {
  .countdown-box { min-width: 70px; padding: 1rem; }
  .countdown-sep { font-size: 2rem; }
}
```

- [ ] **Step 3: Add countdown JS (append inside `<script>` block)**

```javascript
/* ── Countdown Timer ── */
function updateCountdown() {
  // Wedding: July 1, 2026, Cairo time (UTC+3)
  const wedding = new Date('2026-07-01T00:00:00+03:00').getTime();
  const now = Date.now();
  const diff = wedding - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent    = '00';
    document.getElementById('cd-hours').textContent   = '00';
    document.getElementById('cd-minutes').textContent = '00';
    document.getElementById('cd-seconds').textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
```

- [ ] **Step 4: Verify in browser**

Scroll down past hero. Should see countdown section with live ticking numbers counting down to July 1, 2026. Seconds should change every second.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: countdown timer section"
```

---

## Task 4: Our Story Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Our Story HTML after countdown section**

```html
<!-- ══ OUR STORY ══ -->
<section id="our-story">
  <div class="story-inner">
    <div class="story-text">
      <p class="section-eyebrow reveal">Est. 2024</p>
      <h2 class="section-heading reveal" style="text-align:left;">Our Story</h2>
      <p class="story-body reveal">
        Some love stories are written in the stars — ours was written in stolen glances,
        shared laughter, and a thousand quiet moments that became our world.
        Asser and Yara met and knew, in that way you just know, that this was it.
        Through every adventure and every ordinary Tuesday, they chose each other.
        On July 1st, 2026, they make it forever.
      </p>
      <div class="story-signature reveal">
        <span>Asser</span>
        <span class="story-sig-amp">&</span>
        <span>Yara</span>
      </div>
    </div>
    <div class="story-photo-wrap reveal story-wipe">
      <!-- PHOTO: Christmas glasses photo — replaced with base64 in Task 6 -->
      <img
        src="STORY_PHOTO_PLACEHOLDER"
        alt="Asser and Yara"
        class="story-photo"
        onerror="this.parentElement.style.background='var(--blush)'"
      />
      <div class="story-photo-border"></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Our Story CSS**

Append inside `<style>`:

```css
/* ══ OUR STORY ══ */
#our-story {
  background: var(--cream);
  position: relative;
}

#our-story::before {
  content: '❧';
  position: absolute;
  top: 2rem;
  right: 3rem;
  font-size: 8rem;
  color: var(--olive-light);
  opacity: 0.15;
  pointer-events: none;
}

.story-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-text .section-heading {
  text-align: left;
}

.story-body {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  line-height: 1.9;
  color: var(--text-mid);
  margin-bottom: 2rem;
}

.story-signature {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-style: italic;
  color: var(--burgundy);
}

.story-sig-amp {
  color: var(--olive);
  font-size: 1.4rem;
}

/* Photo with cinematic wipe */
.story-photo-wrap {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
}

.story-photo-wrap.visible {
  clip-path: inset(0 0% 0 0);
}

.story-photo {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

.story-photo-border {
  position: absolute;
  inset: 12px;
  border: 1px solid var(--blush);
  border-radius: 2px;
  pointer-events: none;
}

@media (max-width: 768px) {
  .story-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .story-photo { height: 350px; }
  #our-story::before { display: none; }
  .story-text .section-heading { text-align: center; }
  .story-signature { justify-content: center; }
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Our Story section. Should see:
- Left: text content with story paragraph and signature
- Right: blush-colored placeholder box (photo comes in Task 6)
- Decorative floral glyph in background

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: our story section with cinematic photo wipe"
```

---

## Task 5: Event Details Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Event Details HTML after Our Story section**

```html
<!-- ══ EVENT DETAILS ══ -->
<section id="event-details">
  <p class="section-eyebrow reveal">Join Us</p>
  <h2 class="section-heading reveal">Event Details</h2>
  <div class="details-grid">
    <div class="detail-card reveal" style="transition-delay: 0s;">
      <div class="detail-icon">📅</div>
      <h3 class="detail-title">The Date</h3>
      <p class="detail-main">Wednesday</p>
      <p class="detail-main">July 1st, 2026</p>
    </div>
    <div class="detail-card reveal" style="transition-delay: 0.15s;">
      <div class="detail-icon">📍</div>
      <h3 class="detail-title">The Venue</h3>
      <p class="detail-main">The Vine</p>
      <p class="detail-sub">Orabi, Egypt</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Event Details CSS**

Append inside `<style>`:

```css
/* ══ EVENT DETAILS ══ */
#event-details {
  background: var(--cream-dark);
  text-align: center;
}

.details-grid {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.detail-card {
  background: var(--white);
  border: 1px solid var(--blush);
  border-top: 4px solid var(--olive);
  border-radius: 6px;
  padding: 2.5rem 3rem;
  min-width: 220px;
  flex: 1;
  max-width: 320px;
}

.detail-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.detail-title {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: 1rem;
}

.detail-main {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--burgundy);
  line-height: 1.4;
}

.detail-sub {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text-mid);
  margin-top: 0.3rem;
}

@media (max-width: 500px) {
  .detail-card { min-width: 100%; padding: 2rem; }
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Event Details. Should see 2 olive-topped white cards: "The Date" and "The Venue".

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: event details section with two cards"
```

---

## Task 6: Photos — Base64 Embed + Hero + Our Story

**Files:**
- Modify: `index.html`

> **Note:** The user has 5 photos. They are saved locally. This task converts them to base64 and embeds them. The hero photo is the "It Was Always You" neon sign photo (photo 3). The Our Story photo is the Christmas glasses photo (photo 4).

- [ ] **Step 1: Save the 5 photos to the project**

Create a `photos/` folder and ask the user to save:
- `photos/photo1.jpg` — ring show at brick wall (portrait)
- `photos/photo2.jpg` — hugging at brick wall
- `photos/photo3.jpg` — "It Was Always You" neon sign (HERO)
- `photos/photo4.jpg` — Christmas glasses selfie (OUR STORY)
- `photos/photo5.jpg` — rooftop restaurant night

- [ ] **Step 2: Convert all photos to base64**

Run this script from the project root:

```bash
cd /Users/appleera/Downloads/asser-yara-wedding
for i in 1 2 3 4 5; do
  echo "photo${i}: $(base64 -i photos/photo${i}.jpg | tr -d '\n' | wc -c) chars"
done
```

Then generate the actual base64 strings:
```bash
BASE64_1=$(base64 -i photos/photo1.jpg | tr -d '\n')
BASE64_2=$(base64 -i photos/photo2.jpg | tr -d '\n')
BASE64_3=$(base64 -i photos/photo3.jpg | tr -d '\n')
BASE64_4=$(base64 -i photos/photo4.jpg | tr -d '\n')
BASE64_5=$(base64 -i photos/photo5.jpg | tr -d '\n')
```

- [ ] **Step 3: Replace hero background with base64**

In `index.html`, find:
```css
background-image: url('HERO_PHOTO_PLACEHOLDER');
```

Replace with:
```css
background-image: url('data:image/jpeg;base64,BASE64_3_VALUE_HERE');
```
(Paste the actual base64 string for photo3)

- [ ] **Step 4: Replace Our Story photo src with base64**

Find:
```html
src="STORY_PHOTO_PLACEHOLDER"
```

Replace with:
```html
src="data:image/jpeg;base64,BASE64_4_VALUE_HERE"
```
(Paste the actual base64 string for photo4)

- [ ] **Step 5: Verify in browser**

- Hero should now show the "It Was Always You" neon sign photo as background
- Our Story right column should show the Christmas glasses photo with cinematic wipe on scroll

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: embed hero and story photos as base64"
```

---

## Task 7: Gallery Section — Masonry + Lightbox

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Gallery HTML after Event Details section**

```html
<!-- ══ GALLERY ══ -->
<section id="gallery">
  <p class="section-eyebrow reveal">Memories</p>
  <h2 class="section-heading reveal">Asser & Yara</h2>
  <div class="gallery-grid">
    <div class="gallery-item reveal gallery-wipe" data-index="0" style="transition-delay:0s">
      <img src="GALLERY_PHOTO_1" alt="Asser and Yara" loading="lazy" />
    </div>
    <div class="gallery-item reveal gallery-wipe" data-index="1" style="transition-delay:0.12s">
      <img src="GALLERY_PHOTO_2" alt="Asser and Yara" loading="lazy" />
    </div>
    <div class="gallery-item reveal gallery-wipe" data-index="2" style="transition-delay:0.24s">
      <img src="GALLERY_PHOTO_3" alt="Asser and Yara" loading="lazy" />
    </div>
    <div class="gallery-item reveal gallery-wipe" data-index="3" style="transition-delay:0.36s">
      <img src="GALLERY_PHOTO_4" alt="Asser and Yara" loading="lazy" />
    </div>
    <div class="gallery-item reveal gallery-wipe" data-index="4" style="transition-delay:0.48s">
      <img src="GALLERY_PHOTO_5" alt="Asser and Yara" loading="lazy" />
    </div>
  </div>
</section>

<!-- Lightbox -->
<div id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lb-close" id="lb-close" aria-label="Close">✕</button>
  <button class="lb-arrow lb-prev" id="lb-prev" aria-label="Previous">&#8592;</button>
  <img id="lb-img" src="" alt="Asser and Yara" />
  <button class="lb-arrow lb-next" id="lb-next" aria-label="Next">&#8594;</button>
</div>
```

- [ ] **Step 2: Add Gallery CSS**

Append inside `<style>`:

```css
/* ══ GALLERY ══ */
#gallery {
  background: var(--cream);
  text-align: center;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* Layout: photo 1 tall left, photos 2+3 right top, photos 4+5 right bottom */
.gallery-item:nth-child(1) { grid-row: 1 / 3; }
.gallery-item:nth-child(2) { grid-column: 2; grid-row: 1; }
.gallery-item:nth-child(3) { grid-column: 3; grid-row: 1; }
.gallery-item:nth-child(4) { grid-column: 2; grid-row: 2; }
.gallery-item:nth-child(5) { grid-column: 3; grid-row: 2; }

.gallery-item {
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 0.3s;
}

.gallery-item.visible {
  clip-path: inset(0 0 0% 0);
}

.gallery-item:hover { box-shadow: 0 8px 30px rgba(107,27,46,0.25); }

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 200px;
  display: block;
  transition: transform 0.5s ease;
}

.gallery-item:hover img { transform: scale(1.04); }

/* Lightbox */
#lightbox {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(20, 5, 10, 0.92);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

#lightbox.open { display: flex; }

#lb-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}

.lb-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--cream);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.lb-close:hover { opacity: 1; }

.lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(245,240,232,0.1);
  border: 1px solid rgba(245,240,232,0.3);
  color: var(--cream);
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.lb-arrow:hover { background: rgba(245,240,232,0.25); }
.lb-prev { left: 1.5rem; }
.lb-next { right: 1.5rem; }

@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .gallery-item:nth-child(1) { grid-row: auto; grid-column: auto; }
  .gallery-item:nth-child(2),
  .gallery-item:nth-child(3),
  .gallery-item:nth-child(4),
  .gallery-item:nth-child(5) { grid-column: auto; grid-row: auto; }
}
```

- [ ] **Step 3: Add Gallery JS (append inside `<script>`)**

```javascript
/* ── Gallery Lightbox ── */
const galleryPhotos = [
  'GALLERY_PHOTO_1',
  'GALLERY_PHOTO_2',
  'GALLERY_PHOTO_3',
  'GALLERY_PHOTO_4',
  'GALLERY_PHOTO_5'
];
// NOTE: Replace these strings with the actual base64 data URIs after Task 6

let lbIndex = 0;
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');

function openLightbox(index) {
  lbIndex = index;
  lbImg.src = document.querySelectorAll('.gallery-item img')[index].src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNavigate(dir) {
  lbIndex = (lbIndex + dir + 5) % 5;
  lbImg.src = document.querySelectorAll('.gallery-item img')[lbIndex].src;
}

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => lbNavigate(-1));
document.getElementById('lb-next').addEventListener('click', () => lbNavigate(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lbNavigate(-1);
  if (e.key === 'ArrowRight')  lbNavigate(1);
});
```

- [ ] **Step 4: Replace gallery photo src attributes with base64**

In `index.html`, replace each `GALLERY_PHOTO_N` in the `<img src="">` attributes with the actual base64 data URIs from Task 6 (photo 1 through 5 in order).

- [ ] **Step 5: Verify in browser**

- Gallery shows 5 photos in asymmetric grid layout
- Photos wipe in from top to bottom on scroll
- Hover causes subtle zoom
- Click opens full-screen lightbox
- Arrow keys / buttons navigate between photos
- ESC or click outside closes lightbox

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: gallery section with masonry grid and lightbox"
```

---

## Task 8: Location / Map Section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Location HTML after Gallery section**

```html
<!-- ══ LOCATION ══ -->
<section id="location">
  <p class="section-eyebrow reveal">How To Find Us</p>
  <h2 class="section-heading reveal">The Venue</h2>
  <div class="location-inner reveal">
    <div class="map-frame">
      <iframe
        title="The Vine Orabi location"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=The+Vine+Orabi+Egypt"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
    <div class="location-info">
      <div class="location-name">The Vine</div>
      <div class="location-address">Orabi, Egypt</div>
      <a
        href="https://www.google.com/maps/search/The+Vine+Orabi+Egypt"
        target="_blank"
        rel="noopener noreferrer"
        class="directions-btn"
      >
        Get Directions ↗
      </a>
    </div>
  </div>
</section>

<!-- ══ FOOTER ══ -->
<footer>
  <p class="footer-names">Asser <span>&</span> Yara</p>
  <p class="footer-date">July 1st, 2026 · With Love</p>
  <div class="footer-petals" aria-hidden="true">✿ ❧ ✿</div>
</footer>
```

- [ ] **Step 2: Add Location + Footer CSS**

Append inside `<style>`:

```css
/* ══ LOCATION ══ */
#location {
  background: var(--cream-dark);
  text-align: center;
}

.location-inner {
  max-width: 800px;
  margin: 0 auto;
}

.map-frame {
  border: 3px solid var(--burgundy);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.location-name {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-style: italic;
  color: var(--burgundy);
  margin-bottom: 0.3rem;
}

.location-address {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  color: var(--text-mid);
  margin-bottom: 1.5rem;
}

.directions-btn {
  display: inline-block;
  padding: 0.75rem 2.5rem;
  background: var(--burgundy);
  color: var(--cream);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  transition: background 0.25s;
}

.directions-btn:hover { background: var(--burgundy-light); }

/* ══ FOOTER ══ */
footer {
  background: var(--burgundy);
  color: var(--cream);
  text-align: center;
  padding: 3rem 2rem;
}

.footer-names {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.footer-names span {
  color: var(--blush);
}

.footer-date {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--blush);
  margin-bottom: 1rem;
}

.footer-petals {
  color: var(--blush);
  font-size: 1.2rem;
  opacity: 0.6;
  letter-spacing: 1rem;
}
```

- [ ] **Step 3: Verify in browser**

- Location section shows Google Maps iframe with burgundy border frame
- "The Vine / Orabi, Egypt" text below
- "Get Directions ↗" button links to Google Maps search
- Footer shows "Asser & Yara" in burgundy background with blush text

> **Note:** The Google Maps embed uses a public embed key. If the map shows an error, replace the `src` URL with: `https://www.google.com/maps?q=The+Vine+Orabi+Egypt&output=embed` as a fallback.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: location map section and footer"
```

---

## Task 9: Scroll Reveal — IntersectionObserver

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add IntersectionObserver JS (append inside `<script>`)**

```javascript
/* ── Scroll Reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once only
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Hero content: trigger immediately ── */
setTimeout(() => {
  document.querySelector('.hero-content').classList.add('visible');
}, 300);
```

- [ ] **Step 2: Verify in browser**

Scroll through the entire page slowly from top to bottom:
- Hero text fades in after 0.3s on load
- Each section's heading, eyebrow, and body fade + slide up as they enter the viewport
- Gallery photos wipe in from top to bottom one by one
- Our Story photo wipes in from left to right
- Elements do NOT re-animate on scroll-up

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scroll reveal with IntersectionObserver"
```

---

## Task 10: Mobile Polish + Final QA

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add mobile meta + final responsive CSS fixes**

Append inside `<style>`:

```css
/* ══ MOBILE GLOBAL ══ */
@media (max-width: 768px) {
  section { padding: 3.5rem 1.25rem; }
  .hero-label { font-size: 0.6rem; letter-spacing: 0.2em; }
  .lb-prev { left: 0.5rem; }
  .lb-next { right: 0.5rem; }
}
```

- [ ] **Step 2: Full QA checklist**

Open in Chrome DevTools. Test each:

**Desktop (1280px):**
- [ ] Hero fills screen, petals falling, text centered
- [ ] Countdown numbers ticking
- [ ] Our Story: two columns, photo wipes in on scroll
- [ ] Event Details: 2 cards side by side
- [ ] Gallery: asymmetric 3-column grid, lightbox works
- [ ] Location: map visible, directions button works
- [ ] Footer visible

**Mobile (390px — iPhone):**
- [ ] Hero fills screen, names readable
- [ ] Countdown boxes wrap/stack
- [ ] Our Story: single column, text above photo
- [ ] Event Details: cards stack vertically
- [ ] Gallery: 2-column grid
- [ ] No horizontal scroll

**Animation checks:**
- [ ] Scroll slowly — each section fades in
- [ ] Gallery photos wipe in individually with delay
- [ ] Hero content appears after 0.3s

- [ ] **Step 3: Final commit**

```bash
git add index.html
git commit -m "feat: mobile responsive polish, full QA pass"
```

---

## Delivery

The complete wedding invitation is in:
```
/Users/appleera/Downloads/asser-yara-wedding/index.html
```

Share by:
1. **Drag & drop** to Vercel / Netlify → get a URL instantly
2. **Email the HTML file** — guests can open locally
3. **GitHub Pages** — push to a repo, enable Pages, share the URL
