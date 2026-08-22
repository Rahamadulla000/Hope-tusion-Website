---
title: React Frontend Implementation
type: feature
created: 2026-08-22
status: in-review
review_loop_iteration: 0
context: []
baseline_commit: NO_VCS
---

## Intent

**Problem:** The Tuition Academy project currently has no frontend code, only planning specs and design ideas. We need to implement a fully working React + Tailwind CSS landing page that matches the premium Modern Academic (Oxford Blue & Gold) theme and functions offline.

**Approach:** Initialize the Tailwind CSS v4 plugin, load Google Fonts, create a static data file for academic offerings, and build a single-page responsive React layout containing all 9 sections from the PRD, complete with form validation, timetable filters, and modern animations.

## Boundaries & Constraints

**Always:**
- Use Tailwind CSS v4 for all styling.
- Adopt the "Modern Academic" theme: Deep Oxford Blue (`#0B2545`), Warm Gold (`#C5A880`), and Soft Ivory (`#F9F9F8`).
- Maintain a single-page scroll layout structure with a sticky navigation bar.
- Implement responsive design supporting mobile, tablet, and desktop viewports.
- Validate the inquiry form fields (Name and Phone Number must be non-empty).

**Ask First:**
- Integrating third-party database backends or external APIs (e.g. EmailJS, backend servers).

**Never:**
- No user login, registration, dashboard, database schemas, or student portals.
- Do not use Tailwind configuration files (`tailwind.config.js` or `postcss.config.js`) as Tailwind v4 compiles directly via the `@tailwindcss/vite` plugin.
- Do not add any AI-generated metadata, planning references, or tracking tags in source code comments.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Sticky Header Scroll | Scroll position > 50px | Header transitions to translucent glassmorphism with shadow | N/A |
| Mobile Navigation Menu Toggle | Tap hamburger icon | Mobile slide-out nav panel opens; body scrolling is locked | N/A |
| Course Filter Tabs | Tap "Primary" or "Secondary" | Course grid filters and displays only matching grade courses | N/A |
| Timetable Filter Tabs | Tap "Morning" or "Evening" | Timetable grid updates to show corresponding batch schedule | N/A |
| Submit Empty Contact Form | Submit form with empty fields | Prevents submission, scrolls to form, highlights Name and Phone in red | Displays validation warning border on input fields |
| Submit Valid Form | Submit form with Name, Phone, and Class | Prevents default action, triggers a mock success toast/state | N/A |

## Code Map

- `vite.config.js` -- Add `@tailwindcss/vite` plugin.
- `index.html` -- Load Google Fonts (Playfair Display and Inter) and update site title.
- `src/index.css` -- Import Tailwind CSS and define custom styling tokens.
- `src/data.js` [NEW] -- Houses structured static data for courses, teachers, and timetable batches.
- `src/App.jsx` -- The main landing page component containing navigation, hero, sections, interactive timetable, inquiry form, and footer.

## Tasks & Acceptance

**Execution:**
- [x] `vite.config.js` -- Add Tailwind plugin import and configure plugin stack.
- [x] `index.html` -- Inject Google Fonts stylesheet link and set title to "The HOPE Tuition Academy".
- [x] `src/index.css` -- Add `@import "tailwindcss";` and inject font-family overrides.
- [x] `src/data.js` -- Write clean exports for `courses`, `teachers`, `timings`, and `testimonials`.
- [x] `src/App.jsx` -- Implement stateful header, filters, timetable, validations, testimonials carousel, and footer layout.

**Acceptance Criteria:**
- Given user lands on site, when they scroll, then header background becomes translucent glassmorphism.
- Given mobile device, when user clicks hamburger menu, then nav links panel slides into view.
- Given course tab select, when user clicks "High School", then courses list updates dynamically.
- Given contact form, when user submits with empty phone, then red input validation borders appear.
- Given contact form, when user submits with valid details, then success message overlay is displayed.

## Design Notes

We will define custom font families and colors in `src/index.css` using Tailwind CSS v4 `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", sans-serif;
  --color-oxford-blue: #0b2545;
  --color-warm-gold: #c5a880;
  --color-warm-gold-hover: #b0936b;
  --color-soft-ivory: #f9f9f8;
}
```

## Verification

**Commands:**
- `npm run build` -- expected: SUCCESS (Zero compilation errors or warnings).
- `npx oxlint` -- expected: SUCCESS (Zero lint issues on JS/JSX code).

**Manual checks:**
- Inspect form layout on mobile viewport width (375px) to ensure no horizontal overflow.
