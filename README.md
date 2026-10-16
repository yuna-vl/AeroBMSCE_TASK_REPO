# AeroBMSCE &bull; Tactical Aerospace Precision Web Redesign

Official recruitment task redesign for **AeroBMSCE**, the collegiate aerospace, aeromodelling, and unmanned systems innovation club of BMS College of Engineering (operating out of Propel Lab–3).

Built with zero-dependency **Vanilla HTML5, CSS3, and JavaScript**, delivering a high-performance, accessible, editorial aerospace engineering experience compatible with GitHub Pages.

- **Live Website:** [https://yuna-vl.github.io/AeroBMSCE_TASK_REPO/](https://yuna-vl.github.io/AeroBMSCE_TASK_REPO/)
- **GitHub Repository:** [https://github.com/yuna-vl/AeroBMSCE_TASK_REPO](https://github.com/yuna-vl/AeroBMSCE_TASK_REPO)
- **Reference Broken Website:** [https://rajeshbharadwaj44.github.io/AeroBMSCE_TASK_REPO/](https://rajeshbharadwaj44.github.io/AeroBMSCE_TASK_REPO/)

---

## Table of Contents
1. [Overview & Project Structure](#overview--project-structure)
2. [Task Question 1: Flaws of the Original Website](#task-question-1-flaws-of-the-original-website)
3. [Task Question 2: Design Route, UI & UX Decisions](#task-question-2-design-route-ui--ux-decisions)
4. [Task Question 3: Technical Problem / Edge Case Faced & Resolution](#task-question-3-technical-problem--edge-case-faced--resolution)
5. [Cross-Device Viewport Verification](#cross-device-viewport-verification)
6. [GitHub Pages Deployment Guide](#github-pages-deployment-guide)
7. [Factual Reconciliation & Integrity Notes](#factual-reconciliation--integrity-notes)

---

## Overview & Project Structure

The project has been refactored directly within the existing repository stack, preserving all verified historical facts, imagery, and institutional identity without introducing unnecessary frameworks, bundlers, or third-party runtime dependencies.

```
AeroBMSCE_TASK_REPO/
├── index.html        # Home, Institutional Overview, R&D Preview, Achievements, Strategic Alliance CTA
├── journey.html      # Club Journey, 4 Sub-Teams, Verified Milestones, Clean Slideshow & Gallery
├── partners.html     # Sponsorship Tiers, R&D Roadmap, Ecosystem Logos, Institutional Contact
├── style.css         # Tactical Aerospace Precision Design System (CSS Grid & Flexbox)
├── script.js         # Accessible Carousel, Mobile Nav Toggle, Scroll Animations & Keyboard Listeners
├── images/           # Aircraft photography, team emblems, and partner logos
└── README.md         # Mandatory recruitment task documentation and deployment guide
```

---

## Task Question 1: Flaws of the Original Website

Based on direct inspection of the original codebase and the live deployment at [https://rajeshbharadwaj44.github.io/AeroBMSCE_TASK_REPO/](https://rajeshbharadwaj44.github.io/AeroBMSCE_TASK_REPO/), the most noticeable flaws encountered were:

1. **Rigid 1480px Fixed-Width Layout & Zero Responsiveness:**
   - The original stylesheet enforced rigid pixel dimensions: `.wrap { width: 1480px; margin: 0 auto; }`, `.banner { width: 1480px; height: 160px; }`, and `table.tiers { width: 1440px; }`.
   - On standard laptops (1366px, 1440px), tablets (768px, 1024px), and mobile devices (320px–430px), content was severely cut off horizontally, generating persistent horizontal scrollbars and requiring users to pinch-zoom or pan across the screen.

2. **Missing Viewport Meta Tag:**
   - All HTML documents completely lacked `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Consequently, mobile browsers rendered the site as a tiny desktop viewport with unreadable micro-text.

3. **Broken Links & Navigation Inconsistencies:**
   - The primary navigation contained a broken link `<a href="contact.html">Contact</a>`, leading to an immediate **404 Not Found** error because no `contact.html` existed in the repository (contact info was located at the bottom of `partners.html`).
   - Anchor links had mismatched naming and order across pages (e.g., `partners.html` had `Journey`, `Home`, `Partners` in a conflicting order compared to `index.html`).
   - The header emblem was not wrapped in an anchor tag and could not be clicked to return to the homepage.

4. **Clashing, Unprofessional Aesthetic & WCAG Contrast Failures:**
   - The visual identity used an unappealing color combination: dark muddy background (`#141414`), harsh maroon/burgundy header bars (`#7b2339`), washed-out pinkish-purple links (`#d08aa0`), and bright mustard-yellow headings (`#f5b730`).
   - Body copy was set in default serif `"Times New Roman"` with low-contrast dark grey (`#707070`) on dark surfaces, failing WCAG AA contrast standards.
   - Headings were set in jarring, heavy `Impact, "Arial Black"`, giving the site the feel of an unmaintained early-2000s blog rather than a world-class collegiate aerospace team.

5. **Float-Based Layout Mechanics & Extreme Image Distortion:**
   - Layouts relied on CSS floats (`float: left`, `float: right`) and clearing hacks (`<div class="clear"></div>`).
   - The AeroBMSCE logo in the header was forcibly stretched to `width: 420px; height: 200px;`, severely distorting its original square/round aspect ratio.

6. **Non-Responsive HTML Table for Content:**
   - In `partners.html`, the four sponsorship tiers were laid out in a fixed 1440px `<table>` with four `360px` columns (`<td>`), which completely broke layout bounds on any mobile display.

7. **Typographical, Grammatical, and Content Errors:**
   - The original text suffered from noticeable typographical errors:
     - `"TeamFlying Phantoms"` (missing space between words).
     - `"lll South India Exhibition"` (lowercase letters 'l' used instead of Roman numeral III).
     - Missing punctuation spacing: `"Kalpataru Institute of Technology,Tiptur,Karnataka"` and `"Oct 18-20,2024"`.
     - Split compound word: `"Tools show cased"`.
     - Misspelled word: `"UAV Hardware & Component Ecosytem"`.
     - Dangling punctuation: `"SAE competitions, IIT techfests, )"`.
     - Subject-verb agreement error: `"competitive aerospace & UAV team with international flight history"` (should be plural *teams* or restructured).

---

## Task Question 2: Design Route, UI & UX Decisions

To elevate AeroBMSCE from an amateur webpage into a state-of-the-art engineering institution, the redesign adopted the **"Minimalist Aerospace Monochromatic"** architecture inspired directly by modern aerospace telemetry consoles, flight computers, and technical drafting blueprints:

1. **Curated Aerospace Color Tokens:**
   - **Titanium Ivory Canvas (`#F2F0EC`):** A warm, refined off-white technical background reminiscent of aerospace cleanrooms and composite material panels.
   - **Graphite Black (`#202124`):** Crisp, high-contrast primary typography ensuring effortless legibility.
   - **Brushed Titanium Borders (`#D9D7D2`):** Delicate 1px dividers, engineering grid guides, and technical structural boundaries.
   - **Aerospace Electric Cobalt (`#2449D8`) & Burnished Copper (`#C66B43`):** High-precision accent colors for primary interactive CTAs, verified badges, and active state indicators.

2. **Technical Engineering Typography Hierarchy:**
   - **`Space Mono`:** Applied to technical eyebrows (`// 01. INSTITUTIONAL FOUNDATION`), navigation labels (`//Home`, `//Journey`), numerical statistics, and flight badges to create an authentic flight-deck console feel.
   - **`Space Grotesk`:** High-impact modern geometric grotesk for primary section headlines.
   - **`Inter`:** Clean, highly legible neutral sans-serif for long-form editorial paragraphs, timeline descriptions, and specifications.

3. **Tactical UI Components & Aerospace Micro-Interactions:**
   - **Corner Bracket Accents (`.bracket-box`):** Technical corner markers (`┌ ┐ └ ┘`) rendered purely with CSS gradients that illuminate in cobalt blue upon card hover, evoking engineering crosshairs without image overhead.
   - **Fluid CSS Grid Architecture:** Completely replaced rigid 1480px floats with flexible CSS Grid (`repeat(auto-fit, minmax(...))`) and Flexbox containers that scale seamlessly from 320px mobile screens to 1920px 4K displays.
   - **External-Controlled Cinematic Carousel:** Built an accessible slideshow with external navigation arrows, progress dots, pause-on-hover, and keyboard arrow support that respects `prefers-reduced-motion`.
   - **Flush Justified Typography:** Applied `text-align: justify; text-justify: inter-word;` across key institutional callouts and contact cards to align copy cleanly with card boundaries.

4. **Information Architecture & UX Improvements:**
   - **Unified Navigation Bar:** Sticky, responsive header with the brand emblem, clear active indicator states, language tag, and a mobile hamburger drawer with ARIA controls, outside-click dismiss, and `Escape` key support.
   - **Institutional Direct Contact:** Replaced the broken `contact.html` link with direct institutional contact links to `aerobmsce@bmsce.ac.in` and clean in-page anchors (`#contact`).
   - **Preserved & Elevated Heritage Content:** Retained 100% of the verified flight lineage, 75+ projects, 20+ podium finishes, and 4 sub-teams (Team Yaksha, Team Blue Impulse, Team Flying Phantoms, Team Vectors) arranged into structured timeline milestones.

---

## Task Question 3: Technical Problem / Edge Case Faced & Resolution

### The Problem
During responsive testing across mobile devices (specifically compact 320px viewports like the iPhone SE and 360px Android devices), automated headless Chromium audits detected a **subpixel horizontal overflow** (`scrollWidth > innerWidth`), triggering unwanted horizontal scrollbars and layout shifts.

### How We Ran Into It
We ran an automated Chrome DevTools Protocol (CDP) test script across 10 distinct viewport widths (`320px`, `360px`, `375px`, `390px`, `414px`, `430px`, `768px`, `1024px`, `1366px`, `1920px`) on all three pages. The audit flagged `hasOverflow: true` on `partners.html` and `journey.html` at `320px` width (reporting a `scrollWidth` of 360px).

Deep DOM rect inspection revealed three interrelated root causes:
1. **Header Element Crowding:** In `.site-header`, the horizontal `.nav-wrapper` contained the brand emblem + title (~150px), the mobile hamburger toggle (`min-width: 44px`), and the desktop contact pill (`.btn-header-contact`, ~100px) all placed within the flex container with padding and gaps. In a 320px viewport with 32px total container padding (leaving 288px of available width), this row required ~330px, forcing the page to expand horizontally.
2. **Carousel 3D Transform Layer Bleed:** The CSS 3D hardware-accelerated carousel placed inactive slides at `transform: translate3d(100%, 0, 0)`. Without explicit paint containment on `.slideshow-track`, the compositor layer calculated bounding boxes that overflowed subpixel thresholds in Chromium.
3. **Single-Level Viewport Overflow:** The root `html` tag was missing `overflow-x: hidden;` and `max-width: 100vw;` (only `body` was constrained), which permitted transformed offscreen elements to trigger page scrollbars.

### Steps Taken to Work Around It
1. **Adaptive Mobile Header Collapse:**
   - Below 480px (`@media (max-width: 480px)`), collapsed `.header-actions` (the desktop contact button) from the top bar:
     ```css
     @media (max-width: 480px) {
       .header-actions {
         display: none;
       }
       .nav-contact-mobile {
         display: block;
       }
     }
     ```
   - Injected a dedicated `//Contact Us` menu item (`.nav-contact-mobile`) directly into `#primary-nav` so mobile users retain immediate access to contact channels inside the hamburger drawer without crowding the header bar.
2. **CSS Paint Containment:**
   - Added `contain: paint; overflow: hidden;` to both `.slideshow-viewport` and `.slideshow-track` in `style.css`. This isolates the hardware-accelerated 3D transforms strictly within the carousel boundaries, preventing any subpixel layer bleeding.
3. **Dual-Tier Viewport Clipping:**
   - Applied `overflow-x: hidden; max-width: 100vw; -webkit-text-size-adjust: 100%;` to the `html` root, and `overflow-x: hidden; width: 100%;` to `body`.
4. **Automated Verification:**
   - Re-executed automated CDP testing across all 10 viewport widths for all 3 pages (`index.html`, `journey.html`, `partners.html`). All tests achieved `hasOverflow: false` with `scrollWidth === innerWidth` down to 320px.

---

## Cross-Device Viewport Verification

Automated headless browser audits were executed against all three pages across 10 industry-standard viewport sizes:

| Viewport Category | Width | Index (`index.html`) | Journey (`journey.html`) | Partners (`partners.html`) |
| :--- | :---: | :---: | :---: | :---: |
| Compact Mobile (iPhone SE) | **320px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Standard Android (Galaxy) | **360px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Standard iPhone (iPhone 12/13/14) | **375px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Modern iPhone (iPhone 14/15 Pro) | **390px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Large Mobile (iPhone Plus/Max) | **414px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Pro Max Mobile | **430px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Tablet Portrait (iPad) | **768px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Tablet Landscape / Small Laptop | **1024px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Standard Desktop / Laptop | **1366px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |
| Full HD Desktop Display | **1920px** | PASS (0 overflow) | PASS (0 overflow) | PASS (0 overflow) |

---

## GitHub Pages Deployment Guide

The website is engineered with 100% relative paths and requires no build or compilation steps. It is immediately ready to be served from GitHub Pages:

1. **Verify Git Remote & Branch:**
   Ensure all changes are committed to the `main` branch:
   ```bash
   git status
   git add index.html journey.html partners.html style.css script.js README.md
   git commit -m "feat: complete Tactical Aerospace Precision responsive redesign"
   git push origin main
   ```

2. **Enable GitHub Pages in Repository Settings:**
   - Open your repository on GitHub ([https://github.com/yuna-vl/AeroBMSCE_TASK_REPO](https://github.com/yuna-vl/AeroBMSCE_TASK_REPO)).
   - Navigate to **Settings** &gt; **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.

3. **Verify Deployment:**
   - GitHub Actions will trigger the `pages-build-deployment` workflow automatically.
   - The live site is published and accessible at:
     **[https://yuna-vl.github.io/AeroBMSCE_TASK_REPO/](https://yuna-vl.github.io/AeroBMSCE_TASK_REPO/)**

---

## Factual Reconciliation & Integrity Notes

- **2012 Establishment vs. "16+ Years" Heritage:**  
  AeroBMSCE was formally established as a dedicated innovation club operating from Propel Lab–3 in **2012** (14 years of formal club operations as of 2026). The "16+ years" claim reflects the unbroken collegiate aeromodelling lineage and competitive student aeronautics projects at BMS College of Engineering dating back to ~2008. Both verified facts are accurately presented together without fabricating or erasing claims.
- **Confidential Defense Project:**  
  Preserved the restricted status of the ongoing defense research in collaboration with **DRDO**. No restricted specifications or flight data have been fabricated.
- **Official Contact Verification:**  
  All contact and sponsorship inquiries reference the verified institutional email: `aerobmsce@bmsce.ac.in`. No unverified personal phone numbers or external forms are used.
