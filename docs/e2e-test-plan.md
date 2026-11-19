# PLG Acachet website: end-to-end test plan (before go-live)

Last updated: 2026-11-19 (local test round finished; fixes #1 E2E-13-1, #2 E2E-3-1; REVAL-6 and CMS-6 closed)

Every kind of test the site should pass before it goes live, in one list so we can work through it and track progress. Each test has:
- **Priority**: **Must** before launch, **Should** before launch, **Later** (nice to have, or after launch).
- **Where**: **Local** (this machine), **Staging** (AWS test environment), **Prod** (the live site, just before or right after launch).
- **Status**:
  - ✅ Pass;
  - ❌ Fail (see [Issues found](#issues-found));
  - 🟡 Partly (the note says what's left);
  - ⬜ Not run yet, or "needs staging" (waits for the AWS test environment);
  - ⏸️ Blocked (waits for a decision or content);
  - 🖐️ Manual (for you or PLG on a real device or browser, see the [manual checklist](#manual-checklist)).

<!-- progress:start -->
### Progress (local test round)

**138 of 177 tests have a result** (78%) · updated 18 Nov 2026, 22:05

| ✅ Pass | ❌ Fail | 🟡 Partly | ⬜ Not run / needs staging | ⏸️ Blocked | 🖐️ Manual |
|---|---|---|---|---|---|
| 73 | 13 | 26 | 39 | 16 | 10 |

**Now:** Fixing issues one by one (see the Fix log). Done: E2E-13-1, E2E-3-1. Next in the suggested order: E2E-10-1 (keep staging out of search), E2E-13-2, E2E-11-1, E2E-11-3.

This round runs on this machine (production build, Chrome only). Tests that need AWS stay ⬜ "needs staging". Failures are recorded, not fixed, in [Issues found](#issues-found). The [Run log](#run-log) shows the order of work.
<!-- progress:end -->

Results go in a report per area, like the two already done:
- [ui-comparison-issues.md](ui-comparison-issues.md) (prototype vs website);
- [cms-revalidation-test.md](cms-revalidation-test.md) (CMS to website).

## Summary

| # | Area | Tests | Result |
|---|---|---|---|
| 1 | [Pages, links and navigation](#1-pages-links-and-navigation) | 12 | ✅ 9 · ❌ 1 · 🟡 1 · ⏸️ 1 |
| 2 | [Interactive parts](#2-interactive-parts) | 14 | ✅ 14 |
| 3 | [Forms](#3-forms) | 12 | ✅ 6 · ❌ 1 · 🟡 1 · ⬜ 1 · ⏸️ 3 |
| 4 | [CMS and editing](#4-cms-and-editing) | 16 | ✅ 12 · 🟡 1 · ⬜ 1 · ⏸️ 1 · 🖐️ 1 |
| 5 | [Content edge cases](#5-content-edge-cases) | 10 | ✅ 5 · ❌ 1 · 🟡 4 |
| 6 | [Visual and responsive](#6-visual-and-responsive) | 8 | ✅ 4 · ❌ 1 · 🟡 3 |
| 7 | [Browsers and devices](#7-browsers-and-devices) | 9 | ✅ 1 · 🖐️ 8 |
| 8 | [Accessibility](#8-accessibility) | 11 | ✅ 4 · ❌ 3 · 🟡 3 · 🖐️ 1 |
| 9 | [Performance](#9-performance) | 11 | ✅ 4 · ❌ 2 · 🟡 3 · ⬜ 2 |
| 10 | [SEO and sharing](#10-seo-and-sharing) | 11 | ✅ 5 · ❌ 1 · 🟡 3 · ⬜ 1 · ⏸️ 1 |
| 11 | [Security](#11-security) | 17 | ✅ 5 · ❌ 2 · 🟡 4 · ⬜ 6 |
| 12 | [Privacy and legal](#12-privacy-and-legal) | 6 | ✅ 2 · ⏸️ 4 |
| 13 | [Hosting and deployment](#13-hosting-and-deployment) | 15 | ✅ 2 · ❌ 1 · 🟡 1 · ⬜ 11 |
| 14 | [Backup and recovery](#14-backup-and-recovery) | 5 | 🟡 1 · ⬜ 4 |
| 15 | [Monitoring and operations](#15-monitoring-and-operations) | 6 | ⬜ 5 · ⏸️ 1 |
| 16 | [Content readiness and sign-off](#16-content-readiness-and-sign-off) | 9 | 🟡 1 · ⬜ 3 · ⏸️ 5 |
| 17 | [Automated regression](#17-automated-regression) | 5 | ⬜ 5 |

**Found while writing this plan (to decide or fix before launch):**
- Forms save to **Form messages** but **send no notification email**, so nobody is told about a new enquiry or application. Who should get emails? (3.9)
- No **security headers** are set (CSP, HSTS, frame protection…) (11.1).
- The **GraphQL API and playground** (`/api/graphql`, `/api/graphql-playground`) are on but unused by the site (11.6).
- Staging must not be indexed by Google (10.9).
- If production runs **more than one server**, a publish only refreshes the server that handled it (13.13).

---

## 1. Pages, links and navigation

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 1.1 | Every page returns 200 and renders: Home, About, Our Story, The Team, Join Us, Services, Our Work, Contact, Terms, Privacy Policy, Cookies | Must | Local, Staging, Prod | ✅ all 11 pages 200 |
| 1.2 | Crawl the whole site for broken links: internal links, section anchors (`#about`…), images, videos | Must | Staging | ✅ 12 page links, 83 anchors, 366 image/video files: none broken |
| 1.3 | External links work and open as intended: social icons, Google Maps "Directions", `mailto:` and `tel:` links | Must | Staging | 🟡 all 6 work; social links are platform home pages (placeholders, 16.3) |
| 1.4 | Header menu on desktop: every link, current-page highlight, hide on scroll down / show on scroll up | Must | Local | ✅ links, current highlight, hide/show on scroll |
| 1.5 | Phone menu: open/close, sub-links under About, Esc, body scroll lock, links close the menu | Must | Local, real phone | ✅ open, sub-links, scroll lock, Esc, link closes it (Chrome phone emulation; real phone in manual list) |
| 1.6 | Section menus (About, Services sticky bar, Our Story/Team/Join "same as main menu"): click, scroll-spy, back link | Must | Local | ✅ About 6 links, Services sticky 4 chapters, Our Story menu |
| 1.7 | Breadcrumbs on every inner page match the page tree | Should | Local | ✅ |
| 1.8 | Unknown address → custom 404 page with status 404 | Must | Local, Prod | ❌ 404 status OK, but blank without JavaScript (E2E-1-1) |
| 1.9 | `/legal` forwards to `/legal/terms` (307) | Should | Local | ✅ 307 → /legal/terms |
| 1.10 | Case study links: `/our-work#case-<slug>` opened directly, shared, refreshed, Back/Forward buttons | Must | Local | ✅ direct link, reload, Esc, from Home tile |
| 1.11 | Browser Back/Forward and scroll position across pages and anchors | Should | Local | ✅ scroll position kept on Back; Forward works |
| 1.12 | Old website addresses (if PLG has a current site): list them and redirect each to the new page | Must if a site exists | Staging | ⏸️ needs the old site URL list (if any) |

## 2. Interactive parts

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 2.1 | Home showreel: video autoplay (muted, inline on iPhone), poster before load, scroll cue | Must | Local, real phones | ✅ autoplay, muted, inline, poster (Chrome; real iPhone in manual list) |
| 2.2 | Our Work banner video: pause/play button, paused while a case study is open | Should | Local | ✅ |
| 2.3 | Sliders below 1100px (cards, key numbers): swipe, drag, arrows, autoplay | Must | Local, real phones | ✅ swipe at 375, arrows at 901–1100, key numbers every 7 s |
| 2.4 | Logo strip and text ticker loop smoothly with no gap | Should | Local | ✅ |
| 2.5 | Stacking panels, parallax, word-by-word reveal, diagrams (merge, weave, cross) drawn by scroll | Should | Local | ✅ all pages 1440 + 375, no errors |
| 2.6 | Reveal animations: nothing stays hidden (fast scroll, jump to anchor, Back button, very tall screens) | Must | Local | ✅ nothing left hidden (fast jumps, anchors, Back, 2560 px screen) |
| 2.7 | The Team: filter, grid ↔ org chart, person drawer (open, Esc, focus trap, scroll lock) | Must | Local | ✅ |
| 2.8 | Join Us: role filter, accordion, "Apply for this role" fills in the form | Must | Local | ✅ |
| 2.9 | Our Work: filter, tile hover clip, open case study, next case, Esc, focus back to tile, tab title | Must | Local | ✅ |
| 2.10 | Services sticky bar: sticks, active chapter + progress, gives way to the header | Should | Local | ✅ |
| 2.11 | Legal: contents scroll-spy, smooth scroll, document switcher, cookie preferences button (UI only) | Should | Local | ✅ |
| 2.12 | Contact: copy email/phone (and fallback), live Dubai clock | Should | Local | ✅ |
| 2.13 | Custom cursor shows only on desktop pointers, never on touch | Should | Local, real devices | ✅ desktop shown, touch hidden (real devices in manual list) |
| 2.14 | Everything above works with "reduce motion" switched on (no broken or hidden content) | Must | Local | ✅ all content visible; loops and videos stop |

## 3. Forms

Three forms: Home enquiry, Contact, Join Us application.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 3.1 | Each form sends with valid data, shows its thank-you panel and appears in **Inbox → Form messages** with every field | Must | Local, Staging | ✅ all three forms: thank-you + saved with every field |
| 3.2 | Every validation rule, in the browser and on the server: required fields, email format, name/company length, message 10–1500, consent, discipline, http(s) link | Must | Local | ✅ every rule in browser and on server (one low gap: E2E-3-3) |
| 3.3 | Server checks hold when the browser checks are bypassed (post the form directly with bad data) | Must | Local | ✅ server refuses every bad value posted directly |
| 3.4 | Honeypot: a filled hidden field is quietly dropped | Must | Local | ✅ all three forms |
| 3.5 | Application: a closed or made-up role is saved as "General application" | Should | Local | ✅ made-up, invalid and closed roles → General application |
| 3.6 | Special characters, Arabic text, emoji and very long input are saved and shown correctly in the admin | Must | Local | 🟡 Arabic + emoji ✅ (fixed 18 Nov, E2E-3-1); long Home messages cut silently (E2E-3-4) |
| 3.7 | Double click / double submit creates one message only | Should | Local | ❌ triple click → 3 messages (E2E-3-2) |
| 3.8 | Errors when the server or database is down: the visitor sees a clear message, nothing is lost silently | Should | Local | ✅ clear message, form kept, health 503, recovers by itself |
| 3.9 | **Notification email** to PLG for each new message, and maybe a confirmation to the sender | Must | Staging | ⏸️ not built: who receives it? |
| 3.10 | Email delivery: SES, SPF/DKIM/DMARC pass, not in spam (Gmail, Outlook) | Must | Staging | ⏸️ after 3.9 |
| 3.11 | Spam / abuse: many submissions from one address are limited (rate limit or WAF rule) | Should | Staging | ⬜ needs staging (rate limit / WAF) |
| 3.12 | CV upload: UI only, the file is not sent (backlog `backlog-cv-upload.md`) | — | — | ⏸️ backlog |

## 4. CMS and editing

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 4.1 | Every text field and option on every page reaches the website (683 + 452) | Must | Local prod build | ✅ [report](cms-revalidation-test.md) |
| 4.2 | Shared content: Header & footer, case studies, logos, team, roles | Must | Local prod build | ✅ |
| 4.3 | Revalidation issues fixed and re-tested: REVAL-1 (images), REVAL-6 (scheduling), CMS-1…6 | Must | Local prod build | 🟡 REVAL-2…5 fixed; REVAL-6 and CMS-6 closed 2026-11-19 (scheduling off, everyone admin); REVAL-1, CMS-1…5 open |
| 4.4 | Full text/option sweep re-run after all fixes (regression) | Must | Local prod build | ⏸️ waits for the remaining CMS fixes (4.3) |
| 4.5 | Page actions not yet re-tested on the new code: move a page under another parent, change **Forward visitors to**, **Restore this version**, the real **Unpublish** button | Must | Local prod build | ✅ move, forward, restore version, real Unpublish button |
| 4.6 | Lists beyond the first row: change, add, remove, reorder rows 2+ in every list | Should | Local | ✅ 34 lists on 8 pages: reorder, remove last, minimum enforced |
| 4.7 | Add every kind of section to a new, empty page (from the section picker) with only required fields: renders without errors | Must | Local | ✅ all 23 section types with required fields only: render, no errors |
| 4.8 | Create a brand new page from scratch, put it in the menu, publish, delete | Must | Local | ✅ new page, header menu, delete |
| 4.9 | Images & videos: upload (jpg, png, webp, svg, mp4), replace a file, edit alt/focal point, delete one in use | Must | Local, Staging (S3) | ✅ 5 file types, .exe refused, replace, delete in use (refresh: REVAL-1) |
| 4.10 | Live preview on every page, desktop and phone sizes | Should | Local | ✅ draft in preview at 1440 + 375, not live; wrong secret 403 |
| 4.11 | Editor account walkthrough with the editor guide: every "I want to…" row done as written | Must | Local, Staging | ✅ 29 editor screens load; 398 guide names match the CMS (hands-on walk at training, 16.8) |
| 4.12 | Editor permissions: what editors can and can't do (Users hidden, form messages read-only, page delete: CMS-6 decision) | Must | Local | ✅ see 11.3 (access per role) |
| 4.13 | Two editors on the same page at once: locking warning, no lost changes | Should | Staging | 🖐️ no lock warning seen headless (E2E-4-2); check in two real browsers |
| 4.14 | Admin login: wrong password lock-out, forgot password email, sign-out, session expiry | Must | Staging | ✅ lock-out after 5, unlock, sign-out, 2 h sessions; reset email is 13.8 |
| 4.15 | Admin on a tablet/phone (quick fixes on the go) | Later | Staging | ✅ 375: no overflow, no errors |
| 4.16 | Seed / first content: production starts with the real content, not test data | Must | Staging | ⬜ needs staging |

## 5. Content edge cases

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 5.1 | Very long headlines, names and button labels: wrap or shrink without breaking the layout (all widths) | Must | Local | ❌ buttons, small headings and diagram labels don't wrap (E2E-5-1) |
| 5.2 | Optional fields left empty in every section: no empty boxes, stray dividers or "undefined" | Must | Local | 🟡 all 11 pages render with optional fields empty; 3 empty headings/links left (Our Story 1, Services 2) |
| 5.3 | Lists at their minimum and maximum (e.g. 1 vs 4 tiles, 1 vs 5 chain names, 0 open roles → empty text) | Must | Local | ✅ 33 list limits enforced; uncapped lists render with 30 rows |
| 5.4 | Collections empty: no case studies matching a filter, no open roles, no team in a department | Should | Local | ✅ no open roles: "No open roles" text, form offers General application |
| 5.5 | Arabic text in any field: shows correctly (direction, font fallback). **Is an Arabic version planned?** | Should | Local | 🟡 Arabic saves and shows (form and CMS, fixed 18 Nov). Right-to-left layout and an Arabic font aren't designed: decision on an Arabic version |
| 5.6 | Special characters and emoji: `& < > " '`, accents, ™ | Should | Local | ✅ & < > " quotes ™ accents shown as text on all pages; HTML not rendered |
| 5.7 | Missing image or video (deleted file): the section still renders | Should | Local | 🟡 page still 200 with an image file missing; image cache hid the gap: re-test with S3 on staging |
| 5.8 | Very large uploads (20 MB photo, 200 MB video): accepted or refused with a clear message, page stays fast | Must | Staging | 🟡 ≤20 MB fine and resized fast; over 20 MB refused (E2E-5-2) |
| 5.9 | Portrait vs landscape images and focal points in every image slot | Should | Local | ✅ portrait photo in 42 image slots: no layout change |
| 5.10 | `[to confirm]` markers still in content are found before launch (see 16.2) | Must | Local | ✅ scan done: see 16.1, 16.2, 16.5 |

## 6. Visual and responsive

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 6.1 | Prototype vs website at 1440, 1280, 1024, 768, 375 on every page | Must | Local | ✅ [report](ui-comparison-issues.md) |
| 6.2 | In-between and extreme widths: 320, 414, 1100, 1366, 1920, 2560 | Must | Local | ❌ 320 px: About +12 px, Contact +4 px (E2E-6-1); 414, 1100, 1366, 1920, 2560 all fit |
| 6.3 | Phone and tablet in landscape | Should | Local, real devices | ✅ phone landscape 812×375, tablet 1024×768 and 768×1024: all pages fit |
| 6.4 | Browser zoom 200% and larger default font size | Should | Local | 🟡 200% zoom: no overflow on 4 pages. Text sizes are in px, so the browser's "font size" setting has no effect (zoom works) |
| 6.5 | Short laptop screens (1366×650): banners, sticky bars and drawers still fit | Should | Local | 🟡 1366×650: drawer and case study scroll, menu scrolls at 375×560; About banner button below the first screen |
| 6.6 | Fonts load with no flash or layout jump; fallbacks look acceptable | Should | Staging | ✅ Inter self-hosted, preloaded, font-display swap, no external font requests |
| 6.7 | Print the legal pages: readable, no menus/videos | Later | Local | 🟡 no print styles: prints like the screen (dark banner, menu icon), readable |
| 6.8 | Favicon, app icon, browser tab titles | Should | Staging | ✅ favicon 32×32, apple-touch 180×180, theme colour; 11 unique tab titles |

## 7. Browsers and devices

The site uses modern CSS (`:has()`, `position: sticky`, `text-wrap: balance`), so older browsers need a check.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 7.1 | Chrome (Windows, Mac), latest | Must | Staging | ✅ every test this round ran in Chrome (headless and desktop), at 9 widths and with phone emulation |
| 7.2 | Safari (Mac), latest and one version back | Must | Staging | 🖐️ Safari (Mac): manual checklist |
| 7.3 | Safari on iPhone (iOS 17 and 18): video autoplay, sticky bars, phone menu, forms, keyboard pushing the page | Must | Staging, real iPhone | 🖐️ iPhone Safari: manual checklist |
| 7.4 | Chrome on Android (a mid-range phone, not only a flagship) | Must | Staging, real phone | 🖐️ Android Chrome: manual checklist |
| 7.5 | Firefox (Windows), latest | Must | Staging | 🖐️ Firefox: manual checklist |
| 7.6 | Edge (Windows), latest | Should | Staging | 🖐️ Edge: manual checklist |
| 7.7 | Samsung Internet | Should | Staging | 🖐️ Samsung Internet: manual checklist |
| 7.8 | iPad (Safari), portrait and landscape | Should | Staging | 🖐️ iPad: manual checklist |
| 7.9 | Admin (CMS) in Chrome, Safari, Edge | Should | Staging | 🖐️ admin in Safari and Edge: manual checklist (Chrome ✅, 4.11) |

## 8. Accessibility

Target: WCAG 2.2 AA.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 8.1 | Automated scan of every page (axe / Lighthouse), no serious issues | Must | Local | ❌ axe WCAG 2.2 AA on 11 pages × 2 widths: contrast (E2E-8-1) + 3 smaller rules (E2E-8-4) |
| 8.2 | Keyboard only: reach and use every link, button, filter, slider, drawer, menu and form; focus always visible; no traps | Must | Local | 🟡 every control reachable, no traps, focus visible; Home banner has 2 invisible focus stops (E2E-8-3) |
| 8.3 | Screen readers: NVDA + Chrome (Windows), VoiceOver (iPhone, Mac) | Must | Local, real devices | 🖐️ screen readers (NVDA, VoiceOver): manual checklist; landmarks and labels checked automatically |
| 8.4 | Colour contrast of grey text, text over images and videos, orange highlights | Must | Local | ❌ orange buttons 2.3:1, grey on white 2.5–3.5:1 (E2E-8-1) |
| 8.5 | Heading order and one `h1` per page; page landmarks (header, main, footer) | Should | Local | 🟡 one h1 and header/main/footer on every page, navs labelled; heading skip on The Team and Join Us (E2E-8-4) |
| 8.6 | Every meaningful image has alt text; decorative ones are hidden | Must | Local | ✅ every <img> has alt; 120 decorative (alt="") — meaningful ones described (9 media without alt to review, 16.5) |
| 8.7 | Forms: labels, error messages read out and linked to their fields, required fields marked | Must | Local | ❌ labels OK; errors not announced or linked (E2E-8-2) |
| 8.8 | Video: no sound by default; pause control; captions if any video has speech | Should | Local | 🟡 muted, pause button on Home and Our Work (Home's invisible: E2E-8-3); captions only if a video has speech |
| 8.9 | Reduced motion respected (2.14) | Must | Local | ✅ see 2.14 |
| 8.10 | "Skip to content" link | Should | Local | ✅ "Skip to content" is the first Tab stop and jumps into main |
| 8.11 | Page language set (`lang="en"`); tab titles unique | Should | Local | ✅ lang="en", 11 unique tab titles |

## 9. Performance

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 9.1 | Lighthouse / PageSpeed on every page, phone and desktop | Must | Staging | ✅ Lighthouse on 11 pages: phone performance 87–95, desktop 99–100; best practices 96, SEO 92–100 |
| 9.2 | Core Web Vitals: LCP under 2.5 s (Home video poster!), CLS under 0.1, INP under 200 ms | Must | Staging | ❌ phone LCP 2.8–4.0 s (target 2.5) (E2E-9-1); CLS 0, TBT ≤70 ms; desktop LCP ≤0.8 s |
| 9.3 | Page weight: HTML size (CMS-3: Home 231 KB HTML), JavaScript, images, fonts | Should | Local | 🟡 HTML: Home 231 KB (CMS-3); page weight on phones 300 KB–4.4 MB (videos); 172 KB JS (≈50 KB unused) |
| 9.4 | Images served as AVIF/WebP at the right size per screen | Must | Staging | ✅ next/image serves AVIF at the right size (Lighthouse: no image savings on phones, ≤46 KB on desktop) |
| 9.5 | Video files: size and bitrate, separate phone video where set, poster shown first | Must | Staging | 🟡 showreel 4.5 MB, no phone version set (E2E-9-1); the poster shows first |
| 9.6 | Cache headers: pages, images, videos and static files cached at CloudFront; `/admin`, `/api`, `/next/*` never cached | Must | Staging | ❌ media files have no cache headers; 404 cached for a year (E2E-9-2); pages, static and admin ✅ |
| 9.7 | Speed from the UAE (and Saudi Arabia, Europe) | Should | Prod | ⬜ needs staging |
| 9.8 | Slow 3G/4G phone: the site is usable while video loads | Should | Staging | ✅ phone, 500 kbit/s, 400 ms latency, 4× slower CPU: Home headline at 3.4 s with the poster; About at 1.7 s |
| 9.9 | Load test: many visitors at once (cached pages) and a burst right after a publish (pages rebuilding) | Should | Staging | ✅ 50 parallel clients: 509 req/s, p95 133 ms, 0 errors; right after a site-wide refresh 439 req/s, p95 150 ms, 0 errors |
| 9.10 | Admin speed with many versions and media files | Later | Staging | ⬜ |
| 9.11 | Server memory and CPU stay steady over a day (no leaks) | Should | Staging | 🟡 memory 274 → 351 MB during this run; check over a day on staging |

## 10. SEO and sharing

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 10.1 | Every page has a unique title and description (SEO tab) | Must | Local | ✅ 11 unique titles and descriptions |
| 10.2 | Canonical URL on every page, one version of the domain (https, with or without www) | Must | Prod | ✅ canonical on every page from NEXT_PUBLIC_SITE_URL (domain choice on staging) |
| 10.3 | Share previews (Open Graph / X card) on WhatsApp, LinkedIn, X, Slack: title, text, image | Must | Staging | 🟡 title, description, image (1200×630), X card present; image under /api (E2E-10-2); real preview tools on staging |
| 10.4 | Case study links shared from Our Work show useful previews | Should | Staging | 🟡 case study links preview as Our Work (E2E-10-3) |
| 10.5 | `sitemap.xml`: every published page, no forwarding, draft or deleted pages, correct domain | Must | Prod | ✅ 11 published pages, no forwarding/draft pages (no lastmod dates) |
| 10.6 | `robots.txt` correct for production | Must | Prod | ✅ Allow /, Disallow /admin /api /next, sitemap link (set the domain) |
| 10.7 | Structured data (Organization, logo, contact) validates | Later | Staging | 🟡 no structured data yet (Organization, logo, contact) |
| 10.8 | 404 pages return status 404 (not 200) | Must | Prod | ✅ 404 status with noindex |
| 10.9 | **Staging is not indexed** (noindex or password) | Must | Staging | ❌ no switch to keep staging out of search (E2E-10-1) |
| 10.10 | Google Search Console set up, sitemap submitted | Must | Prod | ⬜ |
| 10.11 | Redirects from old URLs (1.12) keep their search ranking (301) | Must if a site exists | Prod | ⏸️ |

## 11. Security

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 11.1 | Security headers: HSTS, CSP, X-Frame-Options / frame-ancestors, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. **Not set yet** | Must | Staging | ❌ none set; X-Powered-By "Next.js, Payload" (E2E-11-1) |
| 11.2 | HTTPS only: http → https, valid certificate, TLS 1.2+ (SSL Labs A) | Must | Prod | ⬜ needs staging (real domain + certificate) |
| 11.3 | Access per role through the API: visitors, editors, admins on every collection (read drafts, read form messages, create users…) | Must | Local | ✅ visitors: read published content only, no form messages/users; editors: no users, no form message changes, can't promote themselves; can delete pages (CMS-6) |
| 11.4 | Admin login: lock-out after failed attempts, strong passwords, no default accounts left | Must | Staging | 🟡 lock-out after 5 tries, 2 h sessions, sign-out works (4.14); no CORS/CSRF allow-list (E2E-11-3); default accounts: replace the seed logins before go-live |
| 11.5 | Preview link secret: refused when wrong, not leaked in pages | Must | Local | ✅ wrong secret refused (403); the secret isn't in the browser code |
| 11.6 | GraphQL API and playground (`/api/graphql`, `/api/graphql-playground`): switch off, or at least the playground in production | Must | Local | 🟡 /api/graphql is on but introspection is off and access rules apply; playground 404 in production. Switch it off if unused |
| 11.7 | Uploads: only allowed file types; SVG files can't run scripts; file names cleaned | Must | Local | ✅ .exe refused; SVG with <script> refused ("potentially harmful content") |
| 11.8 | Text fields can't inject HTML/script into pages (XSS) | Must | Local | 🟡 script/HTML in text shown as text; javascript: links accepted but neutralised by React (E2E-11-4) |
| 11.9 | Forms: no injection, size limits, honeypot, rate limit (3.3, 3.4, 3.11) | Must | Local, Staging | ✅ forms: server checks, honeypot, length caps (3.3–3.4); rate limit on staging (3.11) |
| 11.10 | Secrets: none in the repo, the browser bundle or error pages; production `.env` values are new (not the local ones) | Must | Staging | ✅ only .env.example in git; no secret value in the browser bundle (5 checked) |
| 11.11 | Error pages show no stack traces or server details | Must | Prod | 🟡 no stack traces; depth=999 → 500 (E2E-11-5) |
| 11.12 | `npm audit` / dependency check; plan for Payload + Node upgrade (pinned 3.91, Node 22.17) | Must | Local | ❌ 24 vulnerabilities (19 high) in production packages (E2E-11-2) |
| 11.13 | S3 bucket: no public listing; only media is public; CloudFront origin access | Must | Staging | ⬜ needs staging |
| 11.14 | Database (RDS) not reachable from the internet; EC2 security groups minimal; SSH closed or limited | Must | Staging | ⬜ needs staging |
| 11.15 | WAF rules (if used): admin login, forms, bad bots | Should | Staging | ⬜ needs staging |
| 11.16 | `/admin` reachable only as needed (optional: IP allow-list or VPN) | Should | Staging | ⬜ needs staging |
| 11.17 | External penetration test or security review | Should | Staging | ⬜ needs staging |

## 12. Privacy and legal

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 12.1 | Legal texts written by counsel and published (currently placeholders) | Must | Prod | ⏸️ counsel: all 3 legal pages are placeholders (16.1) |
| 12.2 | Cookie consent: banner and preferences (backlog item 3), and no non-essential cookies before consent | Must if analytics or tracking is added | Staging | ⏸️ backlog 3: no consent banner yet; today the site sets no cookies for visitors (12.3) |
| 12.3 | List every cookie and third-party request the site makes; match the Cookies page | Must | Staging | ✅ visitors get no cookies, no local/session storage and no third-party requests on any page (the Cookies page lists placeholder cookies: align it, 12.1) |
| 12.4 | Form data: who can read it, how long it's kept, how to delete on request (UAE PDPL) | Must | Prod | ⏸️ PLG: retention and deletion of form messages |
| 12.5 | Consent checkbox text and stored consent on the Contact form | Should | Local | ✅ the consent box is required (browser and server) and stored as "consent: true" with the message (3.1–3.3) |
| 12.6 | Footer legal link wording (FOOT-2, backlog 5) | Should | — | ⏸️ PLG: FOOT-2 (backlog 5) |

## 13. Hosting and deployment

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 13.1 | Fresh install: empty database → migrations → content → every page matches local | Must | Staging | ✅ fixed 18 Nov: empty UTF-8 database → migrate → seed → build → all pages identical to local (E2E-13-1) |
| 13.2 | Every migration runs cleanly in order; migrations match the code (no pending schema change) | Must | Staging | ✅ one initial migration; schema identical to the development schema (0 differences in 2677 items) |
| 13.3 | Production environment variables complete (`web/.env.example` checklist); the app refuses to start without required ones | Must | Staging | ❌ all 23 variables documented, but none checked at start-up; NEXT_PUBLIC_SITE_URL silently falls back to localhost (E2E-13-2) |
| 13.4 | Health check `/next/health` used by the load balancer/monitoring | Must | Staging | ⬜ needs staging |
| 13.5 | CloudFront: pages and media cached, `/admin`, `/api`, `/next/*` not cached, cookies/headers forwarded correctly | Must | Staging | ⬜ needs staging |
| 13.6 | Publish clears CloudFront (invalidation): change shows for visitors within seconds (`x-cache` header) | Must | Staging | ⬜ needs staging |
| 13.7 | Uploads land in S3 and are served through CloudFront | Must | Staging | ⬜ needs staging |
| 13.8 | Email through SES works (forms 3.9, admin forgot password) | Must | Staging | ⬜ needs staging |
| 13.9 | Domain: DNS, apex and www, http → https, certificate auto-renews | Must | Prod | ⬜ needs staging |
| 13.10 | Server restart / reboot: the app comes back by itself (process manager), pages still served | Must | Staging | 🟡 manual restart: health 200 after 4 s, pages served from the build cache (15–50 ms); automatic restart by a process manager on staging |
| 13.11 | Deploy a new version without downtime; roll back to the previous version | Must | Staging | ⬜ needs staging |
| 13.12 | Build at deploy time with the production database (pages are pre-built from it) | Must | Staging | ⬜ needs staging |
| 13.13 | **One server or several?** With several, each keeps its own page cache and a publish refreshes only one: confirm one server, or add a shared cache | Must | Staging | ⬜ needs staging (and a decision) |
| 13.14 | Time zone and dates (scheduled publish, form message times) in UAE time | Should | Staging | ⬜ needs staging |
| 13.15 | Disk space: logs rotate, no media written to local disk | Should | Staging | ⬜ needs staging |

## 14. Backup and recovery

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 14.1 | Automatic database backups on, retention agreed | Must | Prod | ⬜ needs staging |
| 14.2 | Restore a database backup to a new instance and run the site from it | Must | Staging | ⬜ needs staging |
| 14.3 | S3 versioning (or backup) so a deleted or replaced media file can be recovered | Should | Prod | ⬜ needs staging |
| 14.4 | Rebuild the server from scratch using the setup notes, and time it | Should | Staging | ⬜ needs staging |
| 14.5 | Editor mistakes: restore an old page version, recover a deleted page (backup only, CMS-6) | Must | Staging | 🟡 Versions → Restore ✅ (4.5); deleted pages can only come back from a database backup (CMS-6) |

## 15. Monitoring and operations

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 15.1 | Uptime check on the home page and `/next/health`, with alerts to the right people | Must | Prod | ⬜ needs staging |
| 15.2 | CloudWatch alarms (CPU, memory, disk, 5xx errors, database) actually fire (trigger one) | Must | Staging | ⬜ needs staging |
| 15.3 | Application errors are logged and someone is notified | Must | Staging | ⬜ needs staging |
| 15.4 | Analytics (if PLG wants it): tool chosen, consent first, events checked | Should | Staging | ⏸️ PLG: analytics tool and consent |
| 15.5 | Cost alerts on the AWS account | Should | Prod | ⬜ needs staging |
| 15.6 | Who to call and what to do when the site is down (short runbook) | Should | — | ⬜ to write with the hosting setup |

## 16. Content readiness and sign-off

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 16.1 | No placeholder content left: lorem text, sample bios, "Key visual to come" | Must | Prod | ⏸️ PLG: lorem/placeholder text on all 3 legal pages (35), 11 team bios, 6 role descriptions, 13 social links are platform home pages |
| 16.2 | No `[to confirm]` markers left in case studies and pages | Must | Prod | ⏸️ PLG: 34 [to confirm] markers (legal 29, case studies 5); "Key visual to come" on 3 case studies |
| 16.3 | Real data from PLG: office details, team photos and social links, role descriptions, key visuals, case study results | Must | Prod | ⏸️ PLG: office details, team photos/bios/socials, role descriptions, key visuals (16.1) |
| 16.4 | Spelling and grammar pass on every page | Should | Staging | ⏸️ after PLG's final copy (most text is still the prototype's) |
| 16.5 | Every alt text written (8.6) | Must | Staging | 🟡 9 of 41 media have no alt text (some may be decorative): review with PLG |
| 16.6 | Backlog decisions made or accepted as "after launch" ([backlog.md](backlog.md)) | Must | — | ⏸️ PLG: 5 backlog items (docs/backlog.md) |
| 16.7 | PLG user acceptance test (UAT) on staging, with a sign-off list per page | Must | Staging | ⬜ needs staging (PLG) |
| 16.8 | Editor training using [editor-guide.md](editor-guide.md) | Must | Staging | ⬜ needs staging (PLG) |
| 16.9 | Final go-live checklist on launch day, then smoke test of the live site (pages, forms, emails, admin) | Must | Prod | ⬜ launch day |

## 17. Automated regression

So the tests above can be repeated after every change, not only once.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 17.1 | Move the CMS test scripts (markers, options, revalidation) into the repo (`web/tests/cms/`) with one command | Should | Local | ⬜ separate task: this round's 30 scripts (crawl, forms, CMS, edge cases, axe, Lighthouse) are ready to move into web/tests/ |
| 17.2 | Browser tests for the key journeys (Playwright): menu, filters, case study, forms | Should | Local, CI | ⬜ separate task (Playwright) |
| 17.3 | Visual regression: screenshots of every page at 3 widths, compared after each change | Should | Local, CI | ⬜ separate task (screenshot comparison) |
| 17.4 | Lint, typecheck, build and the tests run automatically on each push (CI) | Should | CI | ⬜ separate task (CI): include the fresh-install migration test (E2E-13-1) |
| 17.5 | Smoke test after every deploy: all pages 200, health check, one form | Must | Staging, Prod | ⬜ with the first staging deploy |

## Suggested order

1. **Finish the CMS fixes** (REVAL-1, CMS issues) and re-run the full sweep (4.3–4.5).
2. **Local checks that need no AWS:**
   - edge cases (5);
   - accessibility (8);
   - security in the code: headers, GraphQL, uploads, XSS (11.1, 11.6–11.8);
   - forms (3.2–3.8);
   - the missing 404 and reduced-motion checks.
3. **Set up staging on AWS**, then run:
   - hosting and deployment (13);
   - browsers and devices (7);
   - performance (9);
   - SEO (10);
   - backup (14);
   - monitoring (15);
   - the rest of security (11).
4. **With PLG:** content readiness, decisions and UAT (12, 16).
5. **Launch day:** 16.9, 10.10, 15.1.

Decisions needed from PLG or you before some tests can run:
- form notification emails (3.9);
- an old site to redirect (1.12);
- an Arabic version (5.5);
- analytics and cookie consent (12.2, 15.4);
- one server or several (13.13);
- editors deleting pages (CMS-6);
- ~~scheduled publishing (REVAL-6)~~: decided 2026-11-19, not used (switched off).

<!-- issues:start -->
## Issues found

**Suggested fix order**:
1. ~~**E2E-13-1** (blocker)~~ and ~~**E2E-3-1**~~ ✅ fixed 18 Nov.
2. **Before staging goes up**: E2E-10-1 (keep staging out of search), E2E-13-2 (start-up settings check), E2E-11-1 (security headers), E2E-11-3 (CSRF/CORS list).
3. **E2E-11-2**: upgrade Node, then Payload and sharp (also unlocks newer Payload fixes). Rerun the suite after.
4. **Visible to visitors**: E2E-3-2 (double send), E2E-5-1 + E2E-6-1 (labels that don't wrap), E2E-8-2 (form errors for screen readers), E2E-8-3, E2E-9-1 (phone LCP: phone video, first-screen reveal).
5. **Design decision with PLG**: E2E-8-1 (contrast), E2E-5-2 (upload limit), E2E-10-3 (case study share links).
6. **The low ones**: E2E-1-1, E2E-3-3, E2E-3-4, E2E-4-1, E2E-8-4, E2E-9-2, E2E-10-2, E2E-11-4, E2E-11-5. Then E2E-4-2 after the manual check.

| ID | Test | Status | Severity | Summary |
|---|---|---|---|---|
| [E2E-13-1](#e2e-13-1) | 13.1 | ✅ Fixed 18 Nov | **Blocker** | The migrations can't build a new database: migration 3 of 10 fails, so a fresh staging/production database can't be created |
| [E2E-1-1](#e2e-1-1) | 1.8 | Open | Low | The 404 page is empty until JavaScript runs (the server sends a blank body) |
| [E2E-3-1](#e2e-3-1) | 3.6 | ✅ Fixed 18 Nov | **High** | The local database uses the Windows text encoding (WIN1252): Arabic text and emoji can't be saved (forms fail; CMS content would too) |
| [E2E-3-2](#e2e-3-2) | 3.7 | Open | Medium | Clicking Send several times quickly saves the message several times (Home, Contact) |
| [E2E-3-3](#e2e-3-3) | 3.2 | Open | Low | Contact accepts made-up "What do you want to unlock" choices when the form is posted directly |
| [E2E-3-4](#e2e-3-4) | 3.6 | Open | Low | Home form messages longer than 5000 characters are cut off without telling the visitor |
| [E2E-4-1](#e2e-4-1) | 4.x | Open | Low | A request made in the first ~0.3 s after saving can still get the old page (the next one is fresh) |
| [E2E-4-2](#e2e-4-2) | 4.13 | To check | Low | No "someone else is editing" warning appeared when two people opened the same page (confirm in two real browsers) |
| [E2E-5-1](#e2e-5-1) | 5.1 | Open | Medium | Long button labels, small headings and diagram labels don't wrap: the page becomes wider than the screen |
| [E2E-5-2](#e2e-5-2) | 5.8 | Decision | Low | Uploads over 20 MB are refused ("File size limit has been reached"); confirm the limit for videos |
| [E2E-6-1](#e2e-6-1) | 6.2 | Open | Low | At 320 px wide, About (12 px) and Contact (4 px) scroll sideways |
| [E2E-8-1](#e2e-8-1) | 8.4 | Decision | Medium | Colour contrast below WCAG AA: white text on orange buttons (2.3:1), grey labels on white (2.5–3.5:1), orange numbers on white (2.7:1) |
| [E2E-8-2](#e2e-8-2) | 8.7 | Open | Medium | Form errors aren't announced to screen readers (Home and Join Us mark nothing; no form links errors to fields) |
| [E2E-8-3](#e2e-8-3) | 8.2 | Open | Low | Home banner "Scroll to content" and "Pause background video" can be focused with the keyboard but stay invisible |
| [E2E-8-4](#e2e-8-4) | 8.1 | Open | Low | Smaller axe findings: 2 scroll areas not keyboard-reachable, heading level skips (Team, Join Us), Contact details list structure |
| [E2E-9-1](#e2e-9-1) | 9.2 | Open | Medium | Phone LCP 2.8–4.0 s in Lighthouse (target 2.5 s): the main text fades in, and Home downloads the 4.5 MB desktop video |
| [E2E-9-2](#e2e-9-2) | 9.6 | Open | Medium | Uploaded files (/api/media/file/…) are sent with no cache headers, and 404 pages are cached for a year |
| [E2E-10-1](#e2e-10-1) | 10.9 | Open | **High** (before staging) | Nothing keeps a staging site out of search engines: robots.txt allows everything and pages have no noindex |
| [E2E-10-2](#e2e-10-2) | 10.3 | Open | Low | The share image is under /api/, which robots.txt blocks for crawlers (fine once media is on the CDN) |
| [E2E-10-3](#e2e-10-3) | 10.4 | Decision | Low | A shared case study link previews as the Our Work page (the case is in the #part of the URL) |
| [E2E-13-2](#e2e-13-2) | 13.3 | Open | Medium | No start-up check of required settings: without NEXT_PUBLIC_SITE_URL the canonical links, sitemap, robots.txt and share images silently use localhost |
| [E2E-11-1](#e2e-11-1) | 11.1 | Open | **High** | No security headers on any response (HSTS, CSP, frame protection…), and the server advertises "Next.js, Payload" |
| [E2E-11-2](#e2e-11-2) | 11.12 | Open | **High** | npm audit: 24 known vulnerabilities in production packages (19 high), mostly fixed by the Node + Payload upgrade |
| [E2E-11-3](#e2e-11-3) | 11.4 | Open | Medium | The CMS has no CORS/CSRF allow-list: Payload warns "Request origin … is not in the CORS/CSRF allowlist" |
| [E2E-11-4](#e2e-11-4) | 11.8 | Open | Low | Button links and rich-text links accept `javascript:` addresses (React neutralises them on the page) |
| [E2E-11-5](#e2e-11-5) | 11.11 | Open | Low | `/api/pages?depth=999` answers 500 instead of a clear 400 |

<a id="e2e-1-1"></a>
### E2E-1-1: 404 page is blank without JavaScript

- **Status**: Open (low)
- **Steps**: request any unknown address, e.g. `/qz-does-not-exist`, and read the HTML the server sends.
- **Expected**: the custom "404 · Page not found." page with header and footer in the HTML, status 404.
- **Actual**:
  - Status 404 is correct and `noindex` is set.
  - The HTML is `<html id="__next_error__">` with an empty body. The page, header and footer are only drawn in the browser after JavaScript runs.
  - In Chrome it looks right ("Page not found.", Back to home, header, footer).
  - Without JavaScript, or for link-preview bots, it's a blank page.
- **Likely cause**: `notFound()` from the catch-all page `src/app/(frontend)/[[...slug]]/page.tsx` with the root layout inside a route group: Next renders the not-found boundary on the client. To check when fixing.
- **Suggested fix**: investigate Next 16's not-found rendering for route-group root layouts (e.g. a top-level `app/not-found.tsx` with its own layout, or `dynamicParams` settings). Re-test with `curl`.

<a id="e2e-3-1"></a>
### E2E-3-1: the local database can't store Arabic or emoji

- **Status**: ✅ Fixed 18 Nov (fix log #2). The local database is UTF-8 and Arabic/emoji save through the forms and the CMS. Production needs a UTF-8 database (confirmed working, 13.1)
- **Steps**: send the Home form with the name `سارة أحمد 😀` (or save any CMS field with Arabic or emoji).
- **Expected**: saved and shown correctly.
- **Actual**:
  - The visitor sees "Sorry, something went wrong. Please try again."
  - The server log shows `character with byte sequence 0xd8 0xb3 in encoding "UTF8" has no equivalent in encoding "WIN1252"`.
  - Every database in the local cluster is WIN1252 (`English_India.1252`).
- **Re-test on UTF-8 (18 Nov)**: on the freshly migrated UTF-8 database (E2E-13-1 re-test), the Home form with `سارة أحمد 😀` / `مرحبا، نريد تنظيم بطولة 🎮` showed "Thanks" and stored both exactly. So production (UTF-8 RDS) is fine; only the local cluster needs moving to UTF-8.
- **Cause**: `web/scripts/db.mjs` creates the embedded PostgreSQL cluster without an encoding, so on Windows it takes the system's code page.
- **Suggested fix**:
  - **Local**: create the cluster with `initdbFlags: ['--encoding=UTF8', '--locale=C']` (or `--no-locale`). Existing local data has to be moved: dump → new UTF-8 cluster → restore, or a fresh migrate + seed.
  - **Production and staging**: make sure the RDS database is created as UTF-8 (the RDS default), and add a startup or health check that warns if `server_encoding` isn't UTF8.
  - **Docs**: add a note to `docs/local-setup.md`.
  - Re-test 3.6 and 5.5 on a UTF-8 database (area 13.1 builds one).

<a id="e2e-3-2"></a>
### E2E-3-2: double or triple click sends the form several times

- **Status**: Open (medium)
- **Steps**: fill the Home or Contact form correctly and click the send button three times quickly.
- **Expected**: one message.
- **Actual**: three identical messages in **Form messages** (both forms). The button isn't disabled while sending.
- **Suggested fix**: disable the submit button while the action is pending (`useActionState`'s `isPending`, or `useFormStatus`), and show "Sending…". Check the application form the same way.

<a id="e2e-3-3"></a>
### E2E-3-3: Contact interests aren't checked against the real choices

- **Status**: Open (low)
- **Steps**: post the Contact form directly with `interests=Not a real choice`.
- **Actual**: saved as is.
- **Suggested fix**: in `submitContact` (`src/app/(frontend)/actions.ts`), keep only the choices the Contact form block offers, or limit length and number (the number is already capped at 20).

<a id="e2e-3-4"></a>
### E2E-3-4: long Home messages are cut silently

- **Status**: Open (low)
- **Steps**: send a Home enquiry with a 6000-character message.
- **Actual**: saved, but cut to 5000 characters, and the visitor isn't told. The Contact form has a 1500 counter and `maxlength`, so it isn't affected; posted directly, it's cut to 1500 the same way.
- **Suggested fix**: add `maxLength` (and maybe a counter) to the Home message box, matching the server limit.

<a id="e2e-4-1"></a>
### E2E-4-1: the request right after a save can still get the old page

- **Status**: Open (low, information)
- **Steps**: publish a change (page, open role…) through the API and request the page the moment the save returns.
- **Actual**:
  - In 66 of 75 tries the very first request still got the cached old page (`x-nextjs-cache: HIT`). The next request, 0.3 s later, was always fresh (`MISS`, new content).
  - Seen on pages (new hook) and on open roles (unchanged hook), so it isn't caused by the REVAL fixes.
  - The CMS round's "first request" timings were taken after the admin and API round trip, so they didn't hit this window.
- **Cause**: Next.js applies `revalidatePath` just after the save's response is sent.
- **Impact**: none for editors; switching to the website tab takes longer than 0.3 s. Automated tests must wait about 1 s after a save. With CloudFront the invalidation takes seconds anyway (13.6).
- **Suggested fix**: none needed. Optionally make the revalidation finish before the response and re-measure.

<a id="e2e-4-2"></a>
### E2E-4-2: no warning when two people edit the same page

- **Status**: To check by hand (low)
- **Steps**: the admin opens **Services** and types in the page name; the editor then opens **Services**.
- **Expected**: Payload's document locking (on by default) warns the editor that someone else is editing, or offers to take over.
- **Actual**: in headless Chrome no warning appeared and no lock record was created (`payload-locked-documents` empty).
- **Next**: repeat in two real browsers (manual checklist). If confirmed, check whether locking is switched off. Otherwise the last person to save wins without warning.

<a id="e2e-5-1"></a>
### E2E-5-1: long labels push the page wider than the screen

- **Status**: Open (medium)
- **Steps**: on each page, add a realistic sentence (~110 characters, longest word 20 letters) to every short text field; look at 1440 and 375.
- **Expected**: text wraps; the page never scrolls sideways.
- **Actual**: the page becomes wider than the screen on 7 of 11 pages:

  | Page | Extra width at 1440 | Extra width at 375 |
  |---|---|---|
  | Home | 3112 px | 1220 px |
  | About | 957 px | 1107 px |
  | Our Story | 1210 px | 672 px |
  | Join Us | 784 px | 992 px |
  | Services | 151 px | 1009 px |
  | Contact | 0 px | 1100 px |

  Legal, Our Work and The Team stay within the screen.

  The elements that don't wrap:
  - **Button labels** (`Button` `.btn`): hero buttons, Services chapter buttons.
  - **Small headings** (`.eyebrow`) in section headers and the Contact copy column.
  - **Diagram labels**: the Our Story "weave" (`weaveName`, `weaveEnd`) and the Join Us lane names and details list.
- **Why it matters**: editors will write longer labels than the prototype's ("Download the 2026 partnership deck"). On phones, about 35 characters is enough to overflow a button.
- **Suggested fix**:
  - let button labels and eyebrows wrap (`white-space: normal`, `overflow-wrap: anywhere`), keeping one line for short labels;
  - and/or set `maxLength` on those CMS fields (e.g. 40 for buttons, 50 for small headings) with a note in the field description and the editor guide;
  - check the diagram labels at 375.

<a id="e2e-5-2"></a>
### E2E-5-2: 20 MB upload limit

- **Status**: Decision needed (low)
- **What happens**:
  - Photos and videos up to 20 MB upload fine. A 15.7 MB 6000×4000 photo is resized by the site to a 249 KB AVIF in 0.8 s (then 0.01 s from cache).
  - A 25 MB video is refused with "File size limit has been reached" (413).
  - A 200 MB upload is cut off by the server (connection reset), with no friendly message.
- **Today's largest file**: the Home showreel, 4.7 MB.
- **Decision**: is 20 MB right? Longer films (the hosting plan mentions plain MP4 on S3/CloudFront) will need more. Raise the limit for videos only, or upload large films outside the CMS. Whatever is chosen, document it in the editor guide (Images & videos) and check the admin's message for a too-large file.

<a id="e2e-6-1"></a>
### E2E-6-1: small phones (320 px) scroll sideways on About and Contact

- **Status**: Open (low)
- **Steps**: open About and Contact at 320 × 740 (iPhone SE 1st generation, small Android phones).
- **Actual**:
  - About is 12 px wider than the screen, caused by a banner button (`.btn`).
  - Contact is 4 px wider: the copy column (small heading + title).
  - All other pages fit at 320, and every page fits at 375 and above.
- **Note**: the prototype comparison didn't cover 320, so this may come from the prototype. Check it there before fixing.
- **Suggested fix**: let the banner buttons and the Contact copy column shrink below 360 px (same fix as E2E-5-1: wrapping labels).

<a id="e2e-8-1"></a>
### E2E-8-1: colour contrast below WCAG AA

- **Status**: Decision needed (medium: these colours come from the approved design)
- **Found by**: axe-core on every page at 1440 and 375, grouped by colour pair (Home, About, Services, Contact, Terms, Our Work):

  | Colours | Ratio (needed) | Where |
  |---|---|---|
  | #ececec text on #ff7433 orange | 2.27:1 (4.5:1) | every orange button label: "Start a conversation", "Learn more"… |
  | #ff7433 on white | 2.69:1 (4.5:1) | the legal "On this page" numbers |
  | #a2a5a0 / #8a8d88 / #9a9d98 on white | 2.5–3.4:1 (4.5:1) | the legal contents list, Contact "Optional" and the counter |
  | #888888 on white | 3.54:1 (4.5:1) | the Home footer legal links and copyright |
  | #70746e on black / #0d0d0e | 4.1–4.4:1 (4.5:1) | small grey labels ("Where it fits", tags) |

- **Not counted as issues**: the scroll-reveal paragraphs (About, Home, Services) are dim *until they light up* as you scroll (#262727–#4d2411 on black). That's the intended effect and they end fully lit. Text over photos and videos (about 600 elements) can't be measured automatically: check by eye.
- **Suggested fix**: a design decision with PLG.
  - Darker orange for buttons (or dark text on the orange).
  - Darker greys on white (≥ #767676).
  - Slightly lighter grey labels on black (≥ #767a74).
  - The prototype CSS would change in `styles/tokens` and the button module.

<a id="e2e-8-2"></a>
### E2E-8-2: form errors aren't announced to screen readers

- **Status**: Open (medium)
- **Steps**: send each form empty and inspect the fields.
- **Actual**:

  | Form | Fields labelled | Invalid fields marked (`aria-invalid`) | Errors linked to fields (`aria-describedby`) | Live region |
  |---|---|---|---|---|
  | Home | 4/4 ✅ | 0 ❌ | 0 ❌ | no ❌ |
  | Contact | 16/16 ✅ | 5 ✅ | 0 ❌ | yes ✅ |
  | Join Us | 7/7 ✅ | 0 ❌ | 0 ❌ | no ❌ |

  Focus moves to the first field after a failed send (good), but a screen reader doesn't hear what's wrong.
- **Suggested fix**: on all three forms, set `aria-invalid` on flagged fields, give each error an id and point to it with `aria-describedby`, and wrap the errors in `aria-live="polite"`. Contact already has the first and last.

<a id="e2e-8-3"></a>
### E2E-8-3: invisible focusable controls on the Home banner

- **Status**: Open (low)
- **Steps**: on Home, press Tab until you reach "Scroll to content" and "Pause background video".
- **Actual**: they take focus but stay invisible (`.scrollCue`, `.vctl` at opacity 0), so a keyboard user can't see where they are. Everything else that fades in on scroll appears within 1.5 s of getting focus: checked on Home, About, Services and Our Work (132 focus stops).
- **Suggested fix**: show them on `:focus-visible` (as on hover), or take the scroll cue out of the tab order.

<a id="e2e-8-4"></a>
### E2E-8-4: smaller automated accessibility findings

- **Status**: Open (low)
- **Findings**:
  - **`scrollable-region-focusable`**: the About pillars slider (375) and the Cookies table (375) scroll sideways, but keyboard users can't focus them. Fix: add `tabindex="0"` with a label, or arrow buttons that reach them.
  - **`heading-order`**: The Team (person cards' `h3` straight after an `h1`) and Join Us skip a heading level. Fix: use `h2` or add the section heading.
  - **`definition-list`**: the Contact office details `<dl>` contains elements other than `dt`/`dd` groups. Fix: wrap each pair in a `div` only.

<a id="e2e-10-1"></a>
### E2E-10-1: staging would be indexed by search engines

- **Status**: Open (high once a staging site exists)
- **What happens**:
  - `robots.txt` is the same everywhere: `Allow: /`, with only `/admin`, `/api` and `/next` blocked.
  - Pages carry no `robots` meta (only the 404 page has `noindex`).
  - Nothing in the code switches this off for a non-production site (`src/app/robots.ts` only reads `NEXT_PUBLIC_SITE_URL`).
- **Risk**: a public staging URL gets indexed and competes with the real site, with placeholder content.
- **Suggested fix**:
  - add an env switch (e.g. `SITE_INDEXING=off` on staging) that makes `robots.txt` `Disallow: /`, sends an `X-Robots-Tag: noindex` header and sets `robots: { index: false }` in the metadata;
  - and/or put staging behind a password or IP allow-list (11.16);
  - document the variable in `.env.example`, `architecture.md` B9 and `local-setup.md` §11.

<a id="e2e-10-2"></a>
### E2E-10-2: share image under a blocked path

- **Status**: Open (low)
- **What happens**:
  - `og:image` / `twitter:image` is `…/api/media/file/og-image.jpg` (1200×630, 24 KB, the same on every page).
  - `robots.txt` disallows `/api`, and some link-preview bots (e.g. LinkedIn) respect it, so the preview may show no image.
- **In production**: when `MEDIA_PUBLIC_URL` points media at the CDN (hosting plan), the image URL is on the CDN and this goes away. Make sure it's set on staging and production (13.7).
- **Optional**: `Allow: /api/media/file/` in `robots.txt`, add `og:type`, and a per-page share image.

<a id="e2e-10-3"></a>
### E2E-10-3: shared case study links preview as Our Work

- **Status**: Decision (low)
- **What happens**: case studies open at `/our-work#case-<slug>`, the prototype's URLs. The part after `#` never reaches the server, so a link shared on LinkedIn or WhatsApp previews with Our Work's title, description and image, not the case study's.
- **Options**:
  - accept it (the link still opens the right case study);
  - or add real case study pages (e.g. `/our-work/<slug>`) with their own share data that open the same overlay.

<a id="e2e-13-1"></a>
### E2E-13-1: migrations fail on an empty database (blocks deployment)

- **Status**: ✅ Fixed 18 Nov (fix log #1). Re-tested: empty UTF-8 database → migrate → schema identical to local → seed → all pages identical
- **Steps**: start an empty PostgreSQL (UTF-8, port 5434) and run `payload migrate` with `DATABASE_URL` pointing at it and `NODE_ENV=production`. That's exactly what a first deploy to RDS does.
- **Expected**: all 10 migrations run; the schema matches the code.
- **Actual**:
  - Only `20261113_150619_initial` and `20261113_154236_media_storage_and_mobile_video` apply.
  - `20261113_194317_about_page_blocks` fails: `unsafe use of new value "page" of enum type enum_pages_blocks_hero_variant`.
  - The run stops, and the 7 later migrations never run.
- **Cause**: the migration adds an enum value (`ALTER TYPE … ADD VALUE 'page'`) and uses it in the same transaction (`ALTER COLUMN "variant" SET DEFAULT 'page'`). PostgreSQL forbids using a new enum value before the transaction that added it commits. The local database never ran these migrations: it was built by Payload's development schema push.
- **Also at risk**: 4 more migrations add enum values the same way:
  - `our_story_options` (2);
  - `join_page` (6);
  - `services_page` (4);
  - `contact_page` (2).
- **Suggested fix** (one of):
  1. **Split each `ADD VALUE`** into its own migration that runs before the statements using it (or commit in between). Payload runs each migration file in a transaction.
  2. **Squash** all migrations into one fresh `initial` migration generated from the current schema (`migrate:create` against an empty database). Nothing is in production yet, so this is the simplest.
  - After either fix: rerun this test (empty DB → migrate → seed → every page renders and matches local), and add it to CI (17.4).
- **Consequence for this round**: 13.1 and 13.2 fail. The seed and page comparison on the new database, and the Arabic re-test on UTF-8 (E2E-3-1), wait for the fix.

<a id="e2e-13-2"></a>
### E2E-13-2: required settings aren't checked at start-up

- **Status**: Open (medium)
- **What happens**:
  - All 23 environment variables the code reads are documented in `web/.env.example` (plus `PG_PORT`/`PG_DATABASE` for the local database script). But none is checked when the app starts:
    - `PAYLOAD_SECRET` and `DATABASE_URL` fall back to `''`, so the app fails later with a less clear error.
    - `PREVIEW_SECRET` empty: preview is refused, which is safe.
    - **`NEXT_PUBLIC_SITE_URL` missing**: the canonical links, `sitemap.xml`, `robots.txt` and `og:image` URLs silently say `http://localhost:3000` (seen in this round: `src/app/robots.ts`, `(frontend)/sitemap.ts`, `layout.tsx` `metadataBase`).
  - `NEXT_PUBLIC_*` values are fixed into the build, so staging and production each need their own `npm run build` with the right value (13.12).
- **Suggested fix**: a small start-up check (e.g. in `payload.config.ts` or `instrumentation.ts`) that stops with a clear message when `NODE_ENV=production` and `PAYLOAD_SECRET`, `DATABASE_URL` or `NEXT_PUBLIC_SITE_URL` is missing or still `localhost`. Note the build-time rule in `docs/architecture.md` B9 and the deploy steps.

<a id="e2e-9-1"></a>
### E2E-9-1: slow largest paint on phones

- **Status**: Open (medium; re-measure on staging with CloudFront)
- **Found by**: Lighthouse 13 (simulated mid-range phone on slow 4G) on every page.
- **Scores**: phone 87–95, desktop 99–100.
- **LCP on phones** (target 2.5 s):

  | Page | LCP |
  |---|---|
  | Services | 4.0 s |
  | About | 3.8 s |
  | Our Story | 3.6 s |
  | Home | 3.5 s |
  | Our Work | 3.5 s |
  | Contact | 3.5 s |
  | The Team | 3.2 s |
  | Join Us | 3.1 s |
  | Legal pages | 2.8–2.9 s |

  Desktop is 0.6–0.8 s everywhere. CLS is 0 and total blocking time 40–70 ms everywhere.
- **Causes seen**:
  1. On most inner pages the LCP element is the **lead paragraph or headline, which fades/slides in** (reveal and word-by-word effects), so it counts late.
  2. **Home has no phone video**: Hero → *Video for phones* (`videoMobile`) is empty, so phones load `hero-reel-960.mp4` (4.5 MB). Home weighs 3.4 MB on a phone and Our Work 4.4 MB.
  3. 172 KB of JavaScript on every page, about 50 KB of it unused on load.
- **Suggested fix**:
  - show the first screen's headline/lead without the delay (or start its reveal at once);
  - add a small phone version of the showreel (the hosting plan suggests one);
  - re-measure on staging behind CloudFront (HTTP/2, Brotli, edge cache) before deeper work.

<a id="e2e-9-2"></a>
### E2E-9-2: missing / too long cache headers

- **Status**: Open (medium; matters once CloudFront is in front)
- **What happens** (`next start`, response headers):

  | Address | Cache-Control |
  |---|---|
  | Pages (`/`, `/about`…) | `s-maxage=31536000` (cached until a publish clears them) ✅ |
  | `/_next/static/…` | `public, max-age=31536000, immutable` ✅ |
  | `/admin` | `private, no-cache, no-store` ✅ |
  | `/next/health` | `no-store` ✅ |
  | **`/api/media/file/…`** (images, the 4.5 MB showreel) | **none**: browsers and CloudFront fall back to their defaults |
  | **an unknown address (404)** | **`s-maxage=31536000`**: a 404 cached for a year at the CDN |

- **Suggested fix**:
  - With S3 + `MEDIA_PUBLIC_URL` (hosting plan), media is served by CloudFront from S3: set long cache headers there (S3 object metadata or a CloudFront cache policy).
  - Without it, set `Cache-Control` on the media route.
  - Give 404 responses a short cache time (e.g. 60 s) via a CloudFront error caching rule, so a page created later at that address isn't hidden by a cached 404.

<a id="e2e-11-1"></a>
### E2E-11-1: no security headers

- **Status**: Open (high)
- **What happens**: on a page, `/api/…`, `/admin` and a media file, none of these headers is set:
  - `Strict-Transport-Security`
  - `Content-Security-Policy`
  - `X-Frame-Options` / `frame-ancestors`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`

  `X-Powered-By: Next.js, Payload` is sent everywhere.
- **Risks**: the site and the admin can be framed (clickjacking); no HTTPS pinning; browsers may sniff content types; the stack is advertised.
- **Suggested fix**:
  - add the headers in `next.config` `headers()` (or as a CloudFront response-headers policy, which also covers S3 media);
  - `poweredByHeader: false`;
  - start the CSP in report-only mode (the site uses inline styles, Next.js scripts and video), then enforce;
  - re-run 11.1 on staging (SSL Labs / securityheaders.com).

<a id="e2e-11-2"></a>
### E2E-11-2: known vulnerabilities in dependencies

- **Status**: Open (high)
- **What happens**: `npm audit --omit=dev` reports 24 vulnerabilities: 19 high, 5 moderate, 0 critical.
- **Fixes available**:
  - **Payload 3.94** fixes `payload` (undici, json-schema-to-typescript, tinyglobby) and the `happy-dom` advisories in `@payloadcms/richtext-lexical`. Payload is pinned at 3.91 because 3.92+ needs Node ≥ 22.23.4 (this machine has 22.17), so this needs the **Node upgrade** first.
  - **`sharp`** (librsvg advisory): 0.35.5.
  - The rest (picomatch/micromatch/chokidar/sass/esbuild chains) come in through Payload's build and CLI tooling, with no fix yet.
- **Suggested fix**: upgrade Node to 22.23+ on this machine and on the EC2 image, then all `@payloadcms/*` together and sharp, then re-run `npm audit` and the full test suite.

<a id="e2e-11-3"></a>
### E2E-11-3: no CORS/CSRF allow-list for the CMS

- **Status**: Open (medium)
- **What happens**: Payload logs `Request origin "http://localhost:3000" is not in the CORS/CSRF allowlist. Falling back to empty string…` for admin requests. `payload.config.ts` sets neither `cors` nor `csrf`, and `serverURL` was removed on purpose (relative media URLs, see CLAUDE.md).
- **Risk**: Payload's protection against cross-site requests made with a signed-in editor's cookie relies on this list.
- **Suggested fix**: set `csrf: [siteUrl]` and `cors: [siteUrl]` from `NEXT_PUBLIC_SITE_URL`, without `serverURL`, and confirm media URLs stay relative. Re-test admin sign-in, preview and saving.

<a id="e2e-11-4"></a>
### E2E-11-4: `javascript:` links accepted by the CMS

- **Status**: Open (low)
- **Steps**: set a button's link to *Web address* `javascript:alert(1)`, and a rich-text link to `javascript:…`; publish.
- **Actual**:
  - Both save.
  - On the page React 19 replaces them with a blocked `javascript:` URL, so nothing ran in the test (clicked).
  - Other script tricks are shown as plain text: `<img onerror>` and `<script>` typed in a headline.
  - SVG uploads containing `<script>` are refused by Payload ("SVG file contains potentially harmful content").
- **Suggested fix**: validate link fields (`fields/link.ts` `url`, and the rich-text link) to allow only `https://`, `http://`, `mailto:`, `tel:`, `/…` and `#…`.

<a id="e2e-11-5"></a>
### E2E-11-5: a very deep query gives a server error

- **Status**: Open (low)
- **Steps**: `GET /api/pages?depth=999`.
- **Actual**: 500 "An unknown error occurred." (no stack trace shown). Other bad requests answer properly: bad id 404, bad field 400, unknown server action 400.
- **Suggested fix**: set `maxDepth` (e.g. 3) in the Payload config, and let CloudFront/WAF rate-limit `/api`.
<!-- issues:end -->

<!-- fixlog:start -->
## Fix log

| # | Date | Issue | Change | Files | Re-tested |
|---|---|---|---|---|---|
| 1 | 2026-11-18 | E2E-13-1 | The 10 development migrations were squashed into one `20261118_161446_initial`, generated from the current schema (no `ADD VALUE` steps: 141 tables and 108 enum types created directly). Nothing was deployed, and the local database is push-built, so nothing depended on the old files | `web/src/migrations/*` (10 migrations removed, 1 added, `index.ts`) | ✅ details below |

**Re-test of fix #1** (an empty PostgreSQL 17, UTF-8, port 5434):

| Check | Result |
|---|---|
| `payload migrate` with `NODE_ENV=production` | ✅ `20261118_161446_initial` migrated in 1.3 s; `payload_migrations` has it as batch 1 |
| Schema vs the local database (built by the dev schema push the app has always run on) | ✅ identical: 1592 columns (type, null, default), 108 enum types with their values, 605 indexes, 372 keys and constraints: 0 differences |
| `npm run seed` on the new database | ✅ all pages, collections, media and Header & footer created |
| Production build + `next start` on the new database, every page compared with the local site | ✅ 11 pages + `/legal` forward: same status and identical text; same images (file names got a `-1` because both databases share one local media folder); sitemap lists the same pages |
| Arabic + emoji through the Home form (E2E-3-1) | ✅ shown "Thanks" and stored exactly on UTF-8 |
| `npm run typecheck`, `npm run lint`, `npm run build` | ✅ |
| Local site afterwards | ✅ database untouched (snapshot identical), media folder restored (checksum identical), every local page's text unchanged |
| 2 | 2026-11-18 | E2E-3-1 | The local database is UTF-8 now:
- `npm run db` creates new clusters as UTF-8 and warns if an existing one isn't.
- New `npm run db:utf8` converts an older cluster, keeping all content: a new UTF-8 cluster, the schema from the migration, every table copied (PostgreSQL converts the text), id counters kept, row counts checked, folders swapped, the old one kept.

This machine's database was converted with it | `web/scripts/db.mjs`, new `web/scripts/db-to-utf8.mjs`, `web/package.json` (`db:utf8`), `web/.gitignore` (`/.postgres*`) | ✅ details below |

**Re-test of fix #2**:

| Check | Result |
|---|---|
| Conversion of this machine's database | ✅ 4220 rows in 141 tables copied, 75 id counters set; new cluster UTF8; old one kept as `web/.postgres-old-2026-11-18` |
| Every table compared row by row with the old database | ✅ 0 differences in content (141 tables, 4220 rows); every id counter at least as high as before |
| Script tested again on a copy of the old database (`PG_DATA_DIR`) after the counter change | ✅ same result: 0 differences, no counter lower |
| `npm run db` on the converted database | ✅ starts with no warning; `server_encoding` UTF8 |
| Dev server (schema push) on the converted database | ✅ no prompts; every record and update time identical to before; all 11 pages render the same text and images |
| Home form with `سارة أحمد 😀` / `مرحبا، نريد تنظيم بطولة 🎮 في دبي` | ✅ "Thanks", stored exactly (test message then deleted) |
| CMS: an open role's title set to `مدير الشراكات 🤝` | ✅ saved and shown on Join Us; title put back |
| A script crash (first run) | Stopped safely with "nothing was changed"; fixed two bugs (a table alias clashing with the team-members `x` column, an unhandled closed connection) and made the "already running" check ignore a stale lock file |
<!-- fixlog:end -->

<!-- runlog:start -->
## Run log

| When | Area | What ran | Result |
|---|---|---|---|
| 18 Nov | Setup | Database + media backed up, production build, "before" snapshot (12 pages, 8 case studies, 6 logos, 11 team, 6 roles, 41 media) | ✅ |
| 18 Nov | 1. Pages and links | Crawl of 11 pages (12 links, 83 anchors, 366 files, 6 external) + browser checks | ✅ 10 · 🟡 1 · ❌ 1 (E2E-1-1) |
| 18 Nov | 2. Interactive parts | Videos, sliders, marquees, reveals on every page at 1440 + 375, team, join, cursor, reduced motion | ✅ 14 |
| 18 Nov | 3. Forms | 3 forms in Chrome + 22 direct server posts + double click + database stopped | ✅ 6 · ❌ 2 (E2E-3-1, E2E-3-2) · 2 low issues |
| 18 Nov | 4. CMS and editing | Page actions, 34 lists, all 23 sections on a new page, menu, media, preview, 29 admin screens, guide labels, login | ✅ 12 · 🟡 1 · 🖐️ 1 · ⏸️ 1 · E2E-4-1, E2E-4-2 (low) |
| 18 Nov | 5. Content edge cases | Long, empty, special, many rows, no roles, portrait images, missing file, big uploads, content scan on every page at 1440 + 375 | ✅ 5 · 🟡 3 · ❌ 2 (E2E-5-1, E2E-3-1) |
| 18 Nov | 6. Visual and responsive | 11 pages at 320, 414, 1100, 1366, 1920, 2560, landscape, tablet, 200% zoom, short screens, fonts, print, icons | ✅ 3 · 🟡 3 · ❌ 1 (E2E-6-1) |
| 18 Nov | 8. Accessibility | axe WCAG 2.2 AA on 11 pages × 2 widths, keyboard walk (338 stops), structure, forms, skip link | ✅ 4 · 🟡 3 · ❌ 3 · 🖐️ 1 (E2E-8-1…4) |
| 18 Nov | 10. SEO and sharing | Titles, descriptions, canonical, share tags, robots, sitemap, 404 on all pages | ✅ 6 · 🟡 3 · ❌ 1 (E2E-10-1) |
| 18 Nov | 13. Fresh install (early) | Empty UTF-8 database on port 5434 → payload migrate | ❌ blocker E2E-13-1 |
| 18 Nov | 9. Performance | Lighthouse ×22, cache headers, slow network, load test (14 565 requests), memory | ✅ 4 · 🟡 3 · ❌ 2 (E2E-9-1, E2E-9-2) |
| 18 Nov | 11. Security | Headers, access per role on 12 collections × 3 roles, GraphQL, uploads, script injection, secrets, errors, npm audit | ✅ 5 · 🟡 4 · ❌ 2 (E2E-11-1, E2E-11-2) |
| 18 Nov | 12–13. Privacy and hosting (local parts) | Cookies, storage and third parties on every page; environment variables; restart | ✅ 2 · 🟡 1 · ❌ 1 (E2E-13-2) |
| 18 Nov | Restore | Database + media restored from the backup; every record, update time, page (11 × 200) and the media checksum identical to before; dev server running again | ✅ |
| 18 Nov | Fix #1: E2E-13-1 | Migrations squashed; empty DB → migrate → schema compare → seed → build → page compare; Arabic on UTF-8 | ✅ fixed |
| 18 Nov | Fix #2: E2E-3-1 | Local database converted to UTF-8 with the new `db:utf8` script; tables compared row by row; Arabic through form and CMS | ✅ fixed |
<!-- runlog:end -->

<!-- manual:start -->
## Manual checklist

For you or PLG, on real devices and browsers this round couldn't use (it ran in Chrome only). Tick each box; write any problem underneath with the page, device and a screenshot. Best done on **staging**. Until then, the local site works on the same Wi-Fi only.

**Devices and browsers (7.2–7.9, 2.1, 2.13)**: on each of
- Safari on a Mac;
- Safari on an iPhone (iOS 17 or 18);
- Chrome on an Android phone (a mid-range one);
- Firefox and Edge on Windows;
- Samsung Internet;
- Safari on an iPad (portrait and landscape)

check:
- [ ] Every page opens; nothing overlaps or runs off the screen; no sideways scrolling.
- [ ] Home showreel video plays by itself (muted) and the pause button works. On iPhone it must play inside the page, not full screen.
- [ ] The header hides when scrolling down and comes back when scrolling up. The phone menu opens, scrolls and closes.
- [ ] Sliders swipe (Home services, case gallery, About pillars, key numbers).
- [ ] Services and Our Work: the sticky bar sticks under the header, and tapping a chapter or filter works.
- [ ] Our Work: tap a tile → the case study opens; the X or Back closes it; Next case study works.
- [ ] The Team: filter, Grid / Org chart, tapping a person opens their profile; it scrolls and closes.
- [ ] Join Us: open a role → **Apply for this role** fills in the form; the Role and Discipline dropdowns work with touch.
- [ ] Contact: every field, the choices and the consent box. On phones the keyboard doesn't hide the field being typed in. Sending shows the thank-you message.
- [ ] Legal pages: "On this page" links scroll to the right section; the document tabs switch pages.
- [ ] No custom round cursor on phones and tablets (2.13).
- [ ] Admin (\`/admin\`) in Safari and Edge: sign in, edit a page, live preview, publish (7.9).

**Screen readers (8.3)**:
- [ ] **NVDA + Chrome or Firefox (Windows)**: the headings list makes sense on each page; menu, filters, sliders, the case study, the team profile and the form dropdowns are announced with their names and state (open/closed, selected).
- [ ] Form errors are read out (expected to fail until E2E-8-2 is fixed).
- [ ] **VoiceOver on an iPhone and a Mac**: the same checks with swipe navigation.

**Two people editing the same page (4.13, E2E-4-2)**:
- [ ] Two people sign in to \`/admin\` on two computers (or two different browsers) and open the same page; the first one types. Does the second see "someone is editing"? Then both publish: whose change wins? Note what happens.

**Speed on a real phone (9.2, on staging)**:
- [ ] Open Home and About on a phone over 4G (Wi-Fi off). How long until the headline shows, and does the page jump while loading?
<!-- manual:end -->

<!-- results:start -->
## Detailed results

<details><summary><b>Area 1: pages, links and navigation</b> (18 Nov)</summary>

**Pages** (production build, first request):

| Page | Status | HTML size |
|---|---|---|
| / | 200 | 231 KB |
| /about | 200 | 125 KB |
| /about/our-story | 200 | 172 KB |
| /about/team | 200 | 146 KB |
| /about/join | 200 | 105 KB |
| /services | 200 | 122 KB |
| /our-work | 200 | 124 KB |
| /contact | 200 | 89 KB |
| /legal/terms | 200 | 94 KB |
| /legal/privacy-policy | 200 | 100 KB |
| /legal/cookies | 200 | 91 KB |

The sitemap lists exactly these 11 pages (not `/legal`, which forwards).

**Crawl**:
- **Internal page links**: 12 distinct; all 200 (or the 307 forward).
- **Images, video and poster files**: 366 distinct files, including every `srcset` size; all 200.
- **Section anchors**: 83 distinct (`#overview`, `#contact`…).
  - Every one exists on its target page.
  - The 5 `#case-…` links on Home match real case studies.
- **External links**: 6.
  - Instagram, LinkedIn and X point to the platforms' home pages: seeded placeholders, real profiles needed (16.3).
  - `mailto:info@powerleaguegaming.com` and `tel:+971487648133` are well formed. The office details are still the prototype's, to confirm with PLG.
  - The Google Maps "Directions" search works.

**Browser** (headless Chrome):
- **404**: status 404, `noindex`, the custom page with header and footer once JavaScript has run (E2E-1-1).
- **`/legal`**: 307 to `/legal/terms`.
- **Header** (on The Team):
  - About us highlighted (`aria-current` only on exact pages);
  - hides after scrolling down (`nav-hidden` set at 1600 px), shows again when scrolling up.
- **Phone menu**:
  - opens (`aria-expanded=true`) and shows the About sub-links (Overview, Our Story, The Team, Join Us);
  - page scroll locked while open;
  - Esc closes it;
  - tapping "Service" goes to `/services` and closes the menu.
- **Section menus**:
  - About: 6 links, each scrolls its section to the top and highlights the link.
  - Services sticky bar: 4 chapters, each lands 150 px from the top (under the bar) and becomes active.
  - Our Story ("same as main menu"): Overview · Our Story · The Team · Join Us + Back to About Us.
- **Case studies**:
  - `/our-work#case-kfc` opened directly: the overlay is open and the tab title is "KFC Case Study";
  - a reload keeps it open;
  - Esc closes it to `#cases`;
  - after going to Contact and back, it comes back on Our Work with the overlay closed;
  - the first Home showcase tile opens its case study.
- **Back/Forward**: scrolled to 2500 px on About → Contact → Back returns to 2500 px; Forward works.
- **Console**: no errors on any of these pages (the 404 page logs its own 404, as expected).

</details>

<details><summary><b>Area 2: interactive parts</b> (18 Nov)</summary>

Headless Chrome: desktop at 1440×900, phone emulation at 375×812 (iPhone user agent, touch).

- **2.1 Home showreel** (1440 and 375):
  - `hero-reel-960.mp4` plays by itself: muted, `playsinline`, poster set, playing at 3 s;
  - the scroll cue is there.
  - The real iPhone check is in the manual list.
- **2.2 Our Work banner video**: playing on load; the pause button pauses it; paused while a case study is open; resumes when it's closed.
- **2.3 Sliders**:
  - **Swipe/drag** moves every slider at 375 (Home services cards 0 → 425 px, Home case gallery 0 → 293, About pillars 0 → 289).
  - **Arrows** are shown between 901 and 1100 px: at 1000, both Home sliders move with Next and come back with Previous. Below 900 there are no arrows (swipe only).
  - **Key numbers** move on by themselves every ~7 s (13 years → 100+ programmes → 50+ partners) at 375 and 1440.
- **2.4 Logo strips and ticker**: Home and Our Work logo strips (24 s loop) and the About ticker (30 s) run, each with the set rendered twice (no gap).
- **2.5 Scroll effects**: every page scrolled top to bottom at 1440 and 375. No JavaScript errors and no failed requests on any page.
- **2.6 Reveals**: no element left hidden in view on any page, at either width, after:
  - a slow scroll;
  - an instant jump to the bottom;
  - an instant jump to the middle;
  - opening `/about#ownership` directly;
  - going Back from another page;
  - opening Services on a 2560×2400 screen.
- **2.7 The Team**: filter buttons, the person drawer (dialog; page scroll locked; closes with Esc).
- **2.8 Join Us**: open "Partnerships Manager" → **Apply for this role** scrolls to the form and fills in Role "Partnerships Manager" and Discipline "Commercial".
- **2.9–2.12**: checked on 17–18 Nov (area 1 case study checks, earlier page builds).
- **2.13 Custom cursor**: shown over tiles with a mouse at 1440; hidden (`display: none`) with touch emulation. Real touch devices are in the manual list.
- **2.14 Reduced motion**: every page at 1440 and 375 with `prefers-reduced-motion: reduce`:
  - all content visible at the top and the middle of the page;
  - no looping animations running (logo strips and ticker stop);
  - background videos don't play (Home, Our Work);
  - no errors.

</details>

<details><summary><b>Area 3: forms</b> (18 Nov)</summary>

Headless Chrome, plus direct posts to the forms' server actions. For the direct posts, the real request was recorded once, then replayed with changed fields, the way a bot or a broken browser would send it. Every check counted the **Form messages** before and after.

| Check | Home enquiry | Contact | Join Us application |
|---|---|---|---|
| Empty form → messages | ✅ name, email | ✅ name, company, work email, message, consent (fields marked invalid) | ✅ name, email, discipline |
| Wrong values in the browser | ✅ bad email | ✅ `qa@company.c`, 5-letter message, no consent; counter "63 / 1500" | ✅ link without https:// |
| Valid send → thank-you + saved with every field | ✅ "Thanks — we'll be in touch shortly"; name, email, phone, message, page `/` | ✅ "Thank you. We'll be in touch within two business days."; company, 2 interests, consent, page `/contact` | ✅ "Thanks, Qa"; role Partnerships Manager, discipline Commercial, link |
| **Server** refuses a bad email | ✅ | ✅ `a@b.c` refused | — |
| **Server** refuses a short name / company | ✅ 1 letter | ✅ company 1 letter | — |
| **Server** refuses a missing field | ✅ no email field | ✅ no consent; 9-character message | ✅ discipline "Hacker"; `javascript:alert(1)` link |
| Honeypot filled → "ok" but nothing saved | ✅ | ✅ | ✅ |
| Made-up / closed role | — | — | ✅ role 99999, `1 OR 1=1` and a closed role are all saved as "General application" |
| Arabic + emoji | ❌ "Sorry, something went wrong" (E2E-3-1) | — | — |
| Very long text | 🟡 6000 → cut to 5000 silently (E2E-3-4) | ✅ 2000 → 1500 (the browser stops at 1500) | — |
| Made-up interest choice | — | 🟡 saved as is (E2E-3-3) | — |
| Triple click on send | ❌ 3 messages (E2E-3-2) | ❌ 3 messages (E2E-3-2) | — |

**Database stopped while sending (Contact)**:
- the visitor sees "Sorry, something went wrong. Please try again." after the time-out, and the form keeps what they typed;
- `/next/health` reports 503;
- cached pages are still served (200 in 10 ms);
- after the database restarts, the site recovers by itself (health 200), with no server restart.

No JavaScript errors on any form page. The test messages are removed by the database restore at the end.

</details>

<details><summary><b>Area 4: CMS and editing</b> (18 Nov)</summary>

Production build, API changes made the way the admin makes them, and the admin UI driven in headless Chrome. The admin was signed in with a session cookie; passwords were never typed or printed. Everything was undone, and the database is restored at the end.

**4.5 Page actions on the new revalidation code**:

| Check | Result |
|---|---|
| Move Contact under About | ✅ `/about/contact` works (0.3 s); `/contact` 404; links on other pages follow (0.1 s); breadcrumb "Home / About Us / Contact"; sitemap updated |
| Move it back | ✅ `/contact` works again, links follow, page identical to before |
| **Forward visitors to** Contact on Join Us | ✅ 307 to `/contact` (1.1 s); left out of the sitemap |
| Remove the forward | ✅ Join Us shows again (0.6 s) and is back in the sitemap |
| **Restore this version** (Services) | ✅ the live page goes back (0.8 s); content identical |
| Real **Unpublish** button in the admin (Our Story, as editor) | ✅ "Unpublished successfully", page 404 at once; publishing again brings it back (200) |

**4.6 Lists beyond the first row**: on 8 pages, every list with 2+ rows got a marker in its first and last row (34 lists). Then:
- **Reorder**: each list reversed: ✅ 34/34 show the new order.
- **Remove the last row**: ✅ 33/33 removed from the page. The 34th, the About "Lanes into one" items, was correctly refused: "requires at least 3 Rows".
- **Restore**: every page back to its exact original content.

**4.7 Every section type on a new page**: a page with all 23 section types, filled with only the fields the CMS requires (26 fields).
- ✅ Saved and published.
- ✅ 200 at 1440 and 375, no JavaScript errors, no sideways scrolling.
- ✅ No "undefined" / "null" text.
- ✅ Sections with empty lists simply don't show.
- Then deleted (404).

**4.8 New page + menu**:
- ✅ New page live and in the sitemap.
- ✅ Added to the header menu, and the menu updated on other pages (0.6 s).
- ✅ After the page is deleted: 404, and its menu link disappears from other pages.
- ✅ Header menu restored.

**4.9 Images & videos**:
- ✅ Upload jpg, png, webp, svg and mp4: each saved and served with the right type.
- ✅ A `.exe` is refused.
- ✅ An uploaded image used on a page shows.
- ✅ Replacing its file works (webp → jpg). It shows on the page after re-publishing; the refresh without re-publishing is REVAL-1.
- ✅ Deleting an image in use: the page still renders and the section loses its image. The CMS gives no warning (the editor guide says "An empty space appears").

**4.10 Preview**:
- ✅ A draft change on The Team shows in preview at 1440 and 375, and not on the live site.
- ✅ A wrong preview secret is refused (403).

**4.11 Editor screens and guide**:
- As editor, all 29 admin screens load with no errors: dashboard, every list, Header & footer, all 12 pages, one of each collection item.
- The menu shows Pages, Case studies, Partner logos, Team members, Open roles, Images & videos, Form messages and Header & footer, without Users.
- The editor guide's 398 bold names were compared with the CMS: every field, button and section name exists. The rest were emphasis or Payload's own buttons (**Create New**, **Edit image**).

**4.13 Two people on one page**: no warning seen (E2E-4-2), so it's in the manual checklist.

**4.14 Admin login**:
- ✅ After 5 wrong passwords the account is locked: "This user is locked due to having too many failed login attempts". An admin unlocks it (200), and the login works again.
- ✅ Sign-out ends the session: the old token no longer works.
- ✅ Sessions last 2 hours.
- ✅ "Forgot password" answers the same for a known and an unknown email (no account guessing). The email is created; locally it's logged, not sent (sending is 13.8).

**4.15 Admin on a phone (375)**: ✅ dashboard and a page editor load with no sideways scrolling and no errors.

</details>

<details><summary><b>Area 5: content edge cases</b> (18 Nov)</summary>

Each check: change content through the API → measure every page in Chrome at 1440 and 375 → put the content back. The measurements: sideways overflow, elements outside the screen, empty headings and links, "undefined" text and JavaScript errors.

| Check | Result |
|---|---|
| **5.1** Long text in every short field | ❌ 7 pages wider than the screen (E2E-5-1). An extreme 50-letter word makes it worse (Home +3968 px) |
| **5.2** Every optional text, rich text and image emptied (required ones refused by the CMS: 4–48 per page) | ✅ no errors, no overflow, no "undefined". 🟡 Our Story leaves 1 empty heading or link, Services 2 |
| **5.3** Lists with 13× their rows (up to 30) | ✅ the CMS refuses every list over its maximum (33 limits, e.g. "no more than 4 Rows" for tiles); lists without a maximum (legal sections, contact choices…) render fine with 30 rows |
| **5.4** No open roles | ✅ "0 roles open · No open roles in this team right now…", and the form's role list offers only "General application" |
| **5.5** Arabic | ❌ can't be saved on the local database (E2E-3-1) |
| **5.6** `Ça & Co <b>"Quotes"</b> ‘single’ – ™ é ü ß` as the headline of every page | ✅ shown exactly as typed; the `<b>` shows as text, not bold (no HTML injection) |
| **5.7** An image file deleted from disk (Home key numbers) | 🟡 the page still loads (200). The image itself still showed from the image cache, so the missing-file look needs a re-test with S3 |
| **5.8** Big uploads | 🟡 9.3 MB and 15.7 MB photos upload in under 0.1 s and are resized to AVIF (469 KB / 249 KB) in under 0.9 s; 25 MB refused (E2E-5-2) |
| **5.9** A portrait photo (1080×1440) in every image slot (42 slots on 8 pages) | ✅ no section changes height, no broken images, no errors |
| **5.10** Content scan of all pages, case studies, team, roles, logos, Header & footer | ✅ done: 34 `[to confirm]` markers, 35 lorem/placeholder texts (legal), 36 "counsel" notes, 3 "Key visual to come", 11 team members without bio, 6 roles without a description, 13 placeholder social links, 9 media without alt text |

</details>

<details><summary><b>Area 6: visual and responsive</b> (18 Nov)</summary>

Headless Chrome, every page, measuring sideways overflow and elements outside the screen.

| Check | Result |
|---|---|
| **6.2** 320 px | ❌ About +12 px (banner button), Contact +4 px (copy column) (E2E-6-1); the other 9 pages fit |
| **6.2** 414, 1100, 1366, 1920 and 2560 px | ✅ all 11 pages fit, headline in the first screen, no errors (screenshots of Home, Services and Contact at 320 and 2560 kept) |
| **6.3** Phone landscape 812×375, tablet 1024×768 and 768×1024 | ✅ all pages fit, headline in the first screen |
| **6.4** 200% zoom (1440×900 → 720×450) | ✅ Home, About, Contact, Our Work fit with no overflow |
| **6.4** Larger default font (browser setting) | 🟡 no effect: text sizes are px (body text stays 14 px). Browser zoom works, so WCAG resize text is met; respecting the setting would need rem units |
| **6.5** Laptop 1366×650 | ✅ team drawer fills the height and scrolls; the case study scrolls. 🟡 On About the banner button is just below the first screen (Home and Services fit) |
| **6.5** Small phone 375×560 | ✅ the phone menu (13 links) scrolls |
| **6.6** Fonts | ✅ Inter, self-hosted by Next.js, one preloaded file, `font-display: swap`, no external font or CSS requests |
| **6.7** Print (Terms) | 🟡 no print styles: prints like the screen (dark banner, menu icon), readable |
| **6.8** Icons and titles | ✅ favicon 32×32, apple-touch icon 180×180, theme colour #010202; every page has its own tab title ("About Us \| PLG Acachet"…) |

</details>

<details><summary><b>Area 8: accessibility</b> (18 Nov)</summary>

**8.1 axe-core 4 scan**: WCAG 2.0/2.1/2.2 A and AA + best practice, every page at 1440 and 375, after scrolling so reveal effects have run.

| Rule | Impact | Elements | Pages |
|---|---|---|---|
| color-contrast | serious | 589 (incl. the dim scroll-reveal words, by design) | all 22 page-widths (E2E-8-1) |
| scrollable-region-focusable | serious | 2 | About 375, Cookies 375 (E2E-8-4) |
| heading-order | moderate | 4 | The Team, Join Us (E2E-8-4) |
| definition-list | serious | 2 | Contact (E2E-8-4) |

No other rule fails: names on buttons and links, image alt, labels, landmarks, `lang`, ARIA use, duplicate ids, viewport zoom…

**8.2 Keyboard** (Tab through each page at 1440):
- **Stops per page**: Home 30, About 33, Our Story 29, The Team 20, Join Us 28, Services 35, Our Work 34, Contact 9, Terms 41, Privacy 43, Cookies 36. No traps.
- **First stops**: "Skip to content", logo, menu.
- **Fade-in items**: they fade in once focused (within 1.5 s).
- **Exception**: the 2 Home banner controls (E2E-8-3).

**8.5 / 8.11 Structure**:
- every page has one `h1`, `header`/`main`/`footer`, `lang="en"`;
- navs are labelled (Primary, Mobile, Breadcrumb, Section menu, Legal documents, Filter case studies by service, Footer).

**8.6 Images**: all 160 `<img>` elements have an `alt` attribute; 120 are decorative (`alt=""`).

**8.7 Forms**: see E2E-8-2.

**8.10 Skip link**: "Skip to content" (`#top`) is visible when focused, and the next Tab lands inside `main`.

</details>

<details><summary><b>Area 9: performance</b> (18 Nov, local estimates)</summary>

Lighthouse 13: phone = simulated mid-range phone on slow 4G; desktop preset. Production build on this machine, no CDN, so staging numbers will differ.

| Page | Phone perf | Phone LCP | Desktop perf | Desktop LCP | CLS | Weight (phone) |
|---|---|---|---|---|---|---|
| Home | 91 | 3.5 s | 100 | 0.7 s | 0 | 3473 KB |
| About | 89 | 3.8 s | 100 | 0.8 s | 0 | 519 KB |
| Our Story | 90 | 3.6 s | 100 | 0.8 s | 0 | 497 KB |
| The Team | 93 | 3.2 s | 100 | 0.7 s | 0 | 404 KB |
| Join Us | 94 | 3.1 s | 100 | 0.7 s | 0 | 357 KB |
| Services | 87 | 4.0 s | 100 | 0.8 s | 0 | 560 KB |
| Our Work | 91 | 3.5 s | 99 | 0.8 s | 0 | 4384 KB |
| Contact | 91 | 3.5 s | 100 | 0.7 s | 0 | 431 KB |
| Terms / Privacy / Cookies | 95 | 2.8–2.9 s | 100 | 0.6 s | 0 | 300 KB |

Lighthouse accessibility 93–100 (the same findings as area 8), best practices 96, SEO 92–100.

**Slow network (9.8)**: Chrome on a phone, 500 kbit/s, 400 ms latency, 4× slower CPU.
- Home: page ready 3.3 s, headline 3.4 s with the video poster, network quiet at 9.5 s (334 KB by then).
- About: headline 1.7 s.

**Load test (9.9)**: 50 clients requesting Home, About, Services, Our Work and Contact non-stop.

| Run | Requests | Per second | p50 | p95 | Max | Errors |
|---|---|---|---|---|---|---|
| Cached pages, 20 s | 10179 | 509 | 94 ms | 133 ms | 267 ms | 0 |
| Right after a site-wide refresh, 10 s | 4386 | 439 | 99 ms | 150 ms | 1036 ms | 0 |

**Memory (9.11)**: server process 274 MB → 309 MB after the load test → 351 MB at the end.

</details>

<details><summary><b>Area 10: SEO and sharing</b> (18 Nov)</summary>

From the HTML each page sends (production build, `NEXT_PUBLIC_SITE_URL` unset, so `localhost` is the domain).

| Page | Title | Description | Canonical | Share tags | h1 |
|---|---|---|---|---|---|
| All 11 pages | ✅ unique ("About Us \| PLG Acachet"…) | ✅ unique, 60–170 characters | ✅ own URL | ✅ og:title / og:description / og:url / og:image / twitter:card `summary_large_image`; ❌ no og:type | ✅ 1 |

- **Share image**: `og-image.jpg`, 1200×630, 24 KB, the same on every page, served from `/api/media/file/` (E2E-10-2).
- **robots.txt**: `Allow: /`, `Disallow: /admin, /api, /next`, `Sitemap: <site>/sitemap.xml`. The same on every environment (E2E-10-1).
- **sitemap.xml**: the 11 published pages; `/legal` (forwards) and drafts are left out; no `lastmod`.
- **404**: status 404 + `noindex`.
- **Structured data**: none.

</details>

<details><summary><b>Area 11: security (code level)</b> (18 Nov)</summary>

**11.3 Access through the API** (status codes; create with an empty body: 403 = not allowed, 400 = allowed but invalid):

| Collection | Visitor | Editor | Admin |
|---|---|---|---|
| Pages, case studies, logos, team, roles, media | read published · create 403 · update 403 | read · create · update | read · create · update |
| Delete a page | 403 | **200** (CMS-6) | 200 |
| Form messages | read 403 | read ✅ · create/update/delete 403 | read · delete |
| Users | 403 | own account only · create 403 · making themselves admin is ignored (role stays editor) | all |
| Header & footer | read · update 403 | update | update |
| Jobs, key-value store | 403 | 403 | 403 |

**11.6 GraphQL**: `/api/graphql` answers, but introspection is refused, and access rules apply (form messages → "not allowed"). `/api/graphql-playground` 404 in production.

**11.7 Uploads**: `.exe` refused; an SVG with `<script>` refused.

**11.8 Script injection**:
- `<img onerror>` and `<script>` in the About headline: shown as text, nothing ran.
- `javascript:` in a button and a rich-text link: saved, rendered blocked, nothing ran on click (E2E-11-4).

**11.10 Secrets**: `DATABASE_URL`, `PAYLOAD_SECRET`, `PREVIEW_SECRET` and both seed passwords were looked for in `.next/static` (everything a browser can download): not found. Git tracks only `web/.env.example`.

**11.11 Errors**: bad id 404, bad field 400, unknown server action 400, `depth=999` 500; never a stack trace.

**11.12 npm audit (production packages)**: 19 high, 5 moderate (E2E-11-2).

</details>

<details><summary><b>Areas 12–13: privacy and hosting (local parts)</b> (18 Nov)</summary>

**12.3 Cookies and third-party requests**: Chrome, a new visitor, every page plus an open case study, scrolled top to bottom.
- Cookies set: **none**.
- localStorage / sessionStorage: **none**.
- Requests to other hosts: **none** (fonts, images and videos are all served by the site).

The Cookies page lists four placeholder cookies, so it must be rewritten to match (counsel, 12.1).

**13.1–13.2 Fresh install**: an empty PostgreSQL 17 (UTF-8, `--locale=C`) on port 5434, then `payload migrate`. It stopped at migration 3 of 10 (E2E-13-1). Seeding and the page comparison wait for the fix.

**13.3 Settings**: the 23 variables read by the code are all in `.env.example`; nothing checks them at start-up (E2E-13-2).

**13.10 Restart**: `next start` stopped and started again by hand. Health 200 after 4 s; Home, About, Services, Our Work, Contact and Terms served at once from the build cache (`HIT`, 15–50 ms).

</details>
<!-- results:end -->
