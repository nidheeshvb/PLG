# PLG Acachet website: end-to-end test plan (before go-live)

Last updated: 2026-11-18

Every kind of test the site should pass before it goes live, in one list so we can work through it and track progress. Each test has:
- **Priority**: **Must** before launch, **Should** before launch, **Later** (nice to have, or after launch).
- **Where**: **Local** (this machine), **Staging** (AWS test environment), **Prod** (the live site, just before or right after launch).
- **Status**: ✅ Done · 🟡 Partly · ⬜ Not started · ⏸️ Blocked (waits for a decision or access).

Results go in a report per area, like the two already done:
- [ui-comparison-issues.md](ui-comparison-issues.md) (prototype vs website);
- [cms-revalidation-test.md](cms-revalidation-test.md) (CMS to website).

## Summary

| # | Area | Tests | Status |
|---|---|---|---|
| 1 | [Pages, links and navigation](#1-pages-links-and-navigation) | 12 | 🟡 |
| 2 | [Interactive parts](#2-interactive-parts) | 14 | 🟡 |
| 3 | [Forms](#3-forms) | 12 | 🟡 |
| 4 | [CMS and editing](#4-cms-and-editing) | 16 | 🟡 |
| 5 | [Content edge cases](#5-content-edge-cases) | 10 | ⬜ |
| 6 | [Visual and responsive](#6-visual-and-responsive) | 8 | 🟡 |
| 7 | [Browsers and devices](#7-browsers-and-devices) | 9 | ⬜ |
| 8 | [Accessibility](#8-accessibility) | 11 | ⬜ |
| 9 | [Performance](#9-performance) | 11 | ⬜ |
| 10 | [SEO and sharing](#10-seo-and-sharing) | 11 | ⬜ |
| 11 | [Security](#11-security) | 17 | 🟡 |
| 12 | [Privacy and legal](#12-privacy-and-legal) | 6 | ⏸️ |
| 13 | [Hosting and deployment](#13-hosting-and-deployment) | 15 | ⬜ |
| 14 | [Backup and recovery](#14-backup-and-recovery) | 5 | ⬜ |
| 15 | [Monitoring and operations](#15-monitoring-and-operations) | 6 | ⬜ |
| 16 | [Content readiness and sign-off](#16-content-readiness-and-sign-off) | 9 | ⬜ |
| 17 | [Automated regression](#17-automated-regression) | 5 | ⬜ |

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
| 1.1 | Every page returns 200 and renders: Home, About, Our Story, The Team, Join Us, Services, Our Work, Contact, Terms, Privacy Policy, Cookies | Must | Local, Staging, Prod | ✅ local |
| 1.2 | Crawl the whole site for broken links: internal links, section anchors (`#about`…), images, videos | Must | Staging | ⬜ |
| 1.3 | External links work and open as intended: social icons, Google Maps "Directions", `mailto:` and `tel:` links | Must | Staging | ⬜ |
| 1.4 | Header menu on desktop: every link, current-page highlight, hide on scroll down / show on scroll up | Must | Local | 🟡 (checked per page while building) |
| 1.5 | Phone menu: open/close, sub-links under About, Esc, body scroll lock, links close the menu | Must | Local, real phone | 🟡 |
| 1.6 | Section menus (About, Services sticky bar, Our Story/Team/Join "same as main menu"): click, scroll-spy, back link | Must | Local | 🟡 |
| 1.7 | Breadcrumbs on every inner page match the page tree | Should | Local | ✅ |
| 1.8 | Unknown address → custom 404 page with status 404 | Must | Local, Prod | ⬜ |
| 1.9 | `/legal` forwards to `/legal/terms` (307) | Should | Local | ✅ |
| 1.10 | Case study links: `/our-work#case-<slug>` opened directly, shared, refreshed, Back/Forward buttons | Must | Local | 🟡 |
| 1.11 | Browser Back/Forward and scroll position across pages and anchors | Should | Local | ⬜ |
| 1.12 | Old website addresses (if PLG has a current site): list them and redirect each to the new page | Must if a site exists | Staging | ⏸️ needs the old URL list |

## 2. Interactive parts

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 2.1 | Home showreel: video autoplay (muted, inline on iPhone), poster before load, scroll cue | Must | Local, real phones | 🟡 |
| 2.2 | Our Work banner video: pause/play button, paused while a case study is open | Should | Local | ✅ |
| 2.3 | Sliders below 1100px (cards, key numbers): swipe, drag, arrows, autoplay | Must | Local, real phones | 🟡 |
| 2.4 | Logo strip and text ticker loop smoothly with no gap | Should | Local | 🟡 |
| 2.5 | Stacking panels, parallax, word-by-word reveal, diagrams (merge, weave, cross) drawn by scroll | Should | Local | 🟡 |
| 2.6 | Reveal animations: nothing stays hidden (fast scroll, jump to anchor, Back button, very tall screens) | Must | Local | 🟡 (GLOB-2 fixed) |
| 2.7 | The Team: filter, grid ↔ org chart, person drawer (open, Esc, focus trap, scroll lock) | Must | Local | ✅ |
| 2.8 | Join Us: role filter, accordion, "Apply for this role" fills in the form | Must | Local | ✅ |
| 2.9 | Our Work: filter, tile hover clip, open case study, next case, Esc, focus back to tile, tab title | Must | Local | ✅ |
| 2.10 | Services sticky bar: sticks, active chapter + progress, gives way to the header | Should | Local | ✅ |
| 2.11 | Legal: contents scroll-spy, smooth scroll, document switcher, cookie preferences button (UI only) | Should | Local | ✅ |
| 2.12 | Contact: copy email/phone (and fallback), live Dubai clock | Should | Local | ✅ |
| 2.13 | Custom cursor shows only on desktop pointers, never on touch | Should | Local, real devices | ⬜ |
| 2.14 | Everything above works with "reduce motion" switched on (no broken or hidden content) | Must | Local | ⬜ |

## 3. Forms

Three forms: Home enquiry, Contact, Join Us application.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 3.1 | Each form sends with valid data, shows its thank-you panel and appears in **Inbox → Form messages** with every field | Must | Local, Staging | 🟡 (checked while building) |
| 3.2 | Every validation rule, in the browser and on the server: required fields, email format, name/company length, message 10–1500, consent, discipline, http(s) link | Must | Local | 🟡 |
| 3.3 | Server checks hold when the browser checks are bypassed (post the form directly with bad data) | Must | Local | ⬜ |
| 3.4 | Honeypot: a filled hidden field is quietly dropped | Must | Local | ⬜ |
| 3.5 | Application: a closed or made-up role is saved as "General application" | Should | Local | ⬜ |
| 3.6 | Special characters, Arabic text, emoji and very long input are saved and shown correctly in the admin | Must | Local | ⬜ |
| 3.7 | Double click / double submit creates one message only | Should | Local | ⬜ |
| 3.8 | Errors when the server or database is down: the visitor sees a clear message, nothing is lost silently | Should | Local | ⬜ |
| 3.9 | **Notification email** to PLG for each new message, and maybe a confirmation to the sender | Must | Staging | ⏸️ not built: who receives it? |
| 3.10 | Email delivery: SES, SPF/DKIM/DMARC pass, not in spam (Gmail, Outlook) | Must | Staging | ⏸️ after 3.9 |
| 3.11 | Spam / abuse: many submissions from one address are limited (rate limit or WAF rule) | Should | Staging | ⬜ |
| 3.12 | CV upload: UI only, the file is not sent (backlog `backlog-cv-upload.md`) | — | — | ⏸️ backlog |

## 4. CMS and editing

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 4.1 | Every text field and option on every page reaches the website (683 + 452) | Must | Local prod build | ✅ [report](cms-revalidation-test.md) |
| 4.2 | Shared content: Header & footer, case studies, logos, team, roles | Must | Local prod build | ✅ |
| 4.3 | Revalidation issues fixed and re-tested: REVAL-1 (images), REVAL-6 (scheduling), CMS-1…6 | Must | Local prod build | 🟡 REVAL-2…5 fixed |
| 4.4 | Full text/option sweep re-run after all fixes (regression) | Must | Local prod build | ⬜ |
| 4.5 | Page actions not yet re-tested on the new code: move a page under another parent, change **Forward visitors to**, **Restore this version**, the real **Unpublish** button | Must | Local prod build | ⬜ |
| 4.6 | Lists beyond the first row: change, add, remove, reorder rows 2+ in every list | Should | Local | ⬜ |
| 4.7 | Add every kind of section to a new, empty page (from the section picker) with only required fields: renders without errors | Must | Local | ⬜ |
| 4.8 | Create a brand new page from scratch, put it in the menu, publish, delete | Must | Local | 🟡 (API only) |
| 4.9 | Images & videos: upload (jpg, png, webp, svg, mp4), replace a file, edit alt/focal point, delete one in use | Must | Local, Staging (S3) | 🟡 |
| 4.10 | Live preview on every page, desktop and phone sizes | Should | Local | 🟡 |
| 4.11 | Editor account walkthrough with the editor guide: every "I want to…" row done as written | Must | Local, Staging | ⬜ |
| 4.12 | Editor permissions: what editors can and can't do (Users hidden, form messages read-only, page delete: CMS-6 decision) | Must | Local | 🟡 |
| 4.13 | Two editors on the same page at once: locking warning, no lost changes | Should | Staging | ⬜ |
| 4.14 | Admin login: wrong password lock-out, forgot password email, sign-out, session expiry | Must | Staging | ⬜ |
| 4.15 | Admin on a tablet/phone (quick fixes on the go) | Later | Staging | ⬜ |
| 4.16 | Seed / first content: production starts with the real content, not test data | Must | Staging | ⬜ |

## 5. Content edge cases

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 5.1 | Very long headlines, names and button labels: wrap or shrink without breaking the layout (all widths) | Must | Local | ⬜ |
| 5.2 | Optional fields left empty in every section: no empty boxes, stray dividers or "undefined" | Must | Local | ⬜ |
| 5.3 | Lists at their minimum and maximum (e.g. 1 vs 4 tiles, 1 vs 5 chain names, 0 open roles → empty text) | Must | Local | ⬜ |
| 5.4 | Collections empty: no case studies matching a filter, no open roles, no team in a department | Should | Local | ⬜ |
| 5.5 | Arabic text in any field: shows correctly (direction, font fallback). **Is an Arabic version planned?** | Should | Local | ⏸️ decision |
| 5.6 | Special characters and emoji: `& < > " '`, accents, ™ | Should | Local | ⬜ |
| 5.7 | Missing image or video (deleted file): the section still renders | Should | Local | ⬜ |
| 5.8 | Very large uploads (20 MB photo, 200 MB video): accepted or refused with a clear message, page stays fast | Must | Staging | ⬜ |
| 5.9 | Portrait vs landscape images and focal points in every image slot | Should | Local | ⬜ |
| 5.10 | `[to confirm]` markers still in content are found before launch (see 16.2) | Must | Local | ⬜ |

## 6. Visual and responsive

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 6.1 | Prototype vs website at 1440, 1280, 1024, 768, 375 on every page | Must | Local | ✅ [report](ui-comparison-issues.md) |
| 6.2 | In-between and extreme widths: 320, 414, 1100, 1366, 1920, 2560 | Must | Local | ⬜ |
| 6.3 | Phone and tablet in landscape | Should | Local, real devices | ⬜ |
| 6.4 | Browser zoom 200% and larger default font size | Should | Local | ⬜ |
| 6.5 | Short laptop screens (1366×650): banners, sticky bars and drawers still fit | Should | Local | ⬜ |
| 6.6 | Fonts load with no flash or layout jump; fallbacks look acceptable | Should | Staging | ⬜ |
| 6.7 | Print the legal pages: readable, no menus/videos | Later | Local | ⬜ |
| 6.8 | Favicon, app icon, browser tab titles | Should | Staging | ⬜ |

## 7. Browsers and devices

The site uses modern CSS (`:has()`, `position: sticky`, `text-wrap: balance`), so older browsers need a check.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 7.1 | Chrome (Windows, Mac), latest | Must | Staging | 🟡 (built in Chrome) |
| 7.2 | Safari (Mac), latest and one version back | Must | Staging | ⬜ |
| 7.3 | Safari on iPhone (iOS 17 and 18): video autoplay, sticky bars, phone menu, forms, keyboard pushing the page | Must | Staging, real iPhone | ⬜ |
| 7.4 | Chrome on Android (a mid-range phone, not only a flagship) | Must | Staging, real phone | ⬜ |
| 7.5 | Firefox (Windows), latest | Must | Staging | ⬜ |
| 7.6 | Edge (Windows), latest | Should | Staging | ⬜ |
| 7.7 | Samsung Internet | Should | Staging | ⬜ |
| 7.8 | iPad (Safari), portrait and landscape | Should | Staging | ⬜ |
| 7.9 | Admin (CMS) in Chrome, Safari, Edge | Should | Staging | ⬜ |

## 8. Accessibility

Target: WCAG 2.2 AA.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 8.1 | Automated scan of every page (axe / Lighthouse), no serious issues | Must | Local | ⬜ |
| 8.2 | Keyboard only: reach and use every link, button, filter, slider, drawer, menu and form; focus always visible; no traps | Must | Local | 🟡 (drawers, case study) |
| 8.3 | Screen readers: NVDA + Chrome (Windows), VoiceOver (iPhone, Mac) | Must | Local, real devices | ⬜ |
| 8.4 | Colour contrast of grey text, text over images and videos, orange highlights | Must | Local | ⬜ |
| 8.5 | Heading order and one `h1` per page; page landmarks (header, main, footer) | Should | Local | ⬜ |
| 8.6 | Every meaningful image has alt text; decorative ones are hidden | Must | Local | ⬜ |
| 8.7 | Forms: labels, error messages read out and linked to their fields, required fields marked | Must | Local | ⬜ |
| 8.8 | Video: no sound by default; pause control; captions if any video has speech | Should | Local | ⬜ |
| 8.9 | Reduced motion respected (2.14) | Must | Local | ⬜ |
| 8.10 | "Skip to content" link | Should | Local | ⬜ |
| 8.11 | Page language set (`lang="en"`); tab titles unique | Should | Local | ⬜ |

## 9. Performance

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 9.1 | Lighthouse / PageSpeed on every page, phone and desktop | Must | Staging | ⬜ |
| 9.2 | Core Web Vitals: LCP under 2.5 s (Home video poster!), CLS under 0.1, INP under 200 ms | Must | Staging | ⬜ |
| 9.3 | Page weight: HTML size (CMS-3: Home 231 KB HTML), JavaScript, images, fonts | Should | Local | 🟡 CMS-3 open |
| 9.4 | Images served as AVIF/WebP at the right size per screen | Must | Staging | ⬜ |
| 9.5 | Video files: size and bitrate, separate phone video where set, poster shown first | Must | Staging | ⬜ |
| 9.6 | Cache headers: pages, images, videos and static files cached at CloudFront; `/admin`, `/api`, `/next/*` never cached | Must | Staging | ⬜ |
| 9.7 | Speed from the UAE (and Saudi Arabia, Europe) | Should | Prod | ⬜ |
| 9.8 | Slow 3G/4G phone: the site is usable while video loads | Should | Staging | ⬜ |
| 9.9 | Load test: many visitors at once (cached pages) and a burst right after a publish (pages rebuilding) | Should | Staging | ⬜ |
| 9.10 | Admin speed with many versions and media files | Later | Staging | ⬜ |
| 9.11 | Server memory and CPU stay steady over a day (no leaks) | Should | Staging | ⬜ |

## 10. SEO and sharing

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 10.1 | Every page has a unique title and description (SEO tab) | Must | Local | 🟡 (fields work) |
| 10.2 | Canonical URL on every page, one version of the domain (https, with or without www) | Must | Prod | ⬜ |
| 10.3 | Share previews (Open Graph / X card) on WhatsApp, LinkedIn, X, Slack: title, text, image | Must | Staging | ⬜ |
| 10.4 | Case study links shared from Our Work show useful previews | Should | Staging | ⬜ |
| 10.5 | `sitemap.xml`: every published page, no forwarding, draft or deleted pages, correct domain | Must | Prod | 🟡 |
| 10.6 | `robots.txt` correct for production | Must | Prod | ⬜ |
| 10.7 | Structured data (Organization, logo, contact) validates | Later | Staging | ⬜ |
| 10.8 | 404 pages return status 404 (not 200) | Must | Prod | ⬜ |
| 10.9 | **Staging is not indexed** (noindex or password) | Must | Staging | ⬜ |
| 10.10 | Google Search Console set up, sitemap submitted | Must | Prod | ⬜ |
| 10.11 | Redirects from old URLs (1.12) keep their search ranking (301) | Must if a site exists | Prod | ⏸️ |

## 11. Security

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 11.1 | Security headers: HSTS, CSP, X-Frame-Options / frame-ancestors, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. **Not set yet** | Must | Staging | ⬜ |
| 11.2 | HTTPS only: http → https, valid certificate, TLS 1.2+ (SSL Labs A) | Must | Prod | ⬜ |
| 11.3 | Access per role through the API: visitors, editors, admins on every collection (read drafts, read form messages, create users…) | Must | Local | 🟡 (key cases checked) |
| 11.4 | Admin login: lock-out after failed attempts, strong passwords, no default accounts left | Must | Staging | ⬜ |
| 11.5 | Preview link secret: refused when wrong, not leaked in pages | Must | Local | ✅ |
| 11.6 | GraphQL API and playground (`/api/graphql`, `/api/graphql-playground`): switch off, or at least the playground in production | Must | Local | ⬜ |
| 11.7 | Uploads: only allowed file types; SVG files can't run scripts; file names cleaned | Must | Local | ⬜ |
| 11.8 | Text fields can't inject HTML/script into pages (XSS) | Must | Local | ⬜ |
| 11.9 | Forms: no injection, size limits, honeypot, rate limit (3.3, 3.4, 3.11) | Must | Local, Staging | ⬜ |
| 11.10 | Secrets: none in the repo, the browser bundle or error pages; production `.env` values are new (not the local ones) | Must | Staging | ⬜ |
| 11.11 | Error pages show no stack traces or server details | Must | Prod | ⬜ |
| 11.12 | `npm audit` / dependency check; plan for Payload + Node upgrade (pinned 3.91, Node 22.17) | Must | Local | ⬜ |
| 11.13 | S3 bucket: no public listing; only media is public; CloudFront origin access | Must | Staging | ⬜ |
| 11.14 | Database (RDS) not reachable from the internet; EC2 security groups minimal; SSH closed or limited | Must | Staging | ⬜ |
| 11.15 | WAF rules (if used): admin login, forms, bad bots | Should | Staging | ⬜ |
| 11.16 | `/admin` reachable only as needed (optional: IP allow-list or VPN) | Should | Staging | ⬜ |
| 11.17 | External penetration test or security review | Should | Staging | ⬜ |

## 12. Privacy and legal

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 12.1 | Legal texts written by counsel and published (currently placeholders) | Must | Prod | ⏸️ PLG / counsel |
| 12.2 | Cookie consent: banner and preferences (backlog item 3), and no non-essential cookies before consent | Must if analytics or tracking is added | Staging | ⏸️ backlog |
| 12.3 | List every cookie and third-party request the site makes; match the Cookies page | Must | Staging | ⬜ |
| 12.4 | Form data: who can read it, how long it's kept, how to delete on request (UAE PDPL) | Must | Prod | ⏸️ PLG |
| 12.5 | Consent checkbox text and stored consent on the Contact form | Should | Local | 🟡 |
| 12.6 | Footer legal link wording (FOOT-2, backlog 5) | Should | — | ⏸️ PLG |

## 13. Hosting and deployment

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 13.1 | Fresh install: empty database → migrations → content → every page matches local | Must | Staging | ⬜ |
| 13.2 | Every migration runs cleanly in order; migrations match the code (no pending schema change) | Must | Staging | ⬜ |
| 13.3 | Production environment variables complete (`web/.env.example` checklist); the app refuses to start without required ones | Must | Staging | ⬜ |
| 13.4 | Health check `/next/health` used by the load balancer/monitoring | Must | Staging | ⬜ |
| 13.5 | CloudFront: pages and media cached, `/admin`, `/api`, `/next/*` not cached, cookies/headers forwarded correctly | Must | Staging | ⬜ |
| 13.6 | Publish clears CloudFront (invalidation): change shows for visitors within seconds (`x-cache` header) | Must | Staging | ⬜ |
| 13.7 | Uploads land in S3 and are served through CloudFront | Must | Staging | ⬜ |
| 13.8 | Email through SES works (forms 3.9, admin forgot password) | Must | Staging | ⬜ |
| 13.9 | Domain: DNS, apex and www, http → https, certificate auto-renews | Must | Prod | ⬜ |
| 13.10 | Server restart / reboot: the app comes back by itself (process manager), pages still served | Must | Staging | ⬜ |
| 13.11 | Deploy a new version without downtime; roll back to the previous version | Must | Staging | ⬜ |
| 13.12 | Build at deploy time with the production database (pages are pre-built from it) | Must | Staging | ⬜ |
| 13.13 | **One server or several?** With several, each keeps its own page cache and a publish refreshes only one: confirm one server, or add a shared cache | Must | Staging | ⬜ decision |
| 13.14 | Time zone and dates (scheduled publish, form message times) in UAE time | Should | Staging | ⬜ |
| 13.15 | Disk space: logs rotate, no media written to local disk | Should | Staging | ⬜ |

## 14. Backup and recovery

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 14.1 | Automatic database backups on, retention agreed | Must | Prod | ⬜ |
| 14.2 | Restore a database backup to a new instance and run the site from it | Must | Staging | ⬜ |
| 14.3 | S3 versioning (or backup) so a deleted or replaced media file can be recovered | Should | Prod | ⬜ |
| 14.4 | Rebuild the server from scratch using the setup notes, and time it | Should | Staging | ⬜ |
| 14.5 | Editor mistakes: restore an old page version, recover a deleted page (backup only, CMS-6) | Must | Staging | 🟡 versions ✅ |

## 15. Monitoring and operations

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 15.1 | Uptime check on the home page and `/next/health`, with alerts to the right people | Must | Prod | ⬜ |
| 15.2 | CloudWatch alarms (CPU, memory, disk, 5xx errors, database) actually fire (trigger one) | Must | Staging | ⬜ |
| 15.3 | Application errors are logged and someone is notified | Must | Staging | ⬜ |
| 15.4 | Analytics (if PLG wants it): tool chosen, consent first, events checked | Should | Staging | ⏸️ decision |
| 15.5 | Cost alerts on the AWS account | Should | Prod | ⬜ |
| 15.6 | Who to call and what to do when the site is down (short runbook) | Should | — | ⬜ |

## 16. Content readiness and sign-off

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 16.1 | No placeholder content left: lorem text, sample bios, "Key visual to come" | Must | Prod | ⏸️ PLG |
| 16.2 | No `[to confirm]` markers left in case studies and pages | Must | Prod | ⏸️ PLG |
| 16.3 | Real data from PLG: office details, team photos and social links, role descriptions, key visuals, case study results | Must | Prod | ⏸️ PLG |
| 16.4 | Spelling and grammar pass on every page | Should | Staging | ⬜ |
| 16.5 | Every alt text written (8.6) | Must | Staging | ⬜ |
| 16.6 | Backlog decisions made or accepted as "after launch" ([backlog.md](backlog.md)) | Must | — | ⏸️ PLG |
| 16.7 | PLG user acceptance test (UAT) on staging, with a sign-off list per page | Must | Staging | ⬜ |
| 16.8 | Editor training using [editor-guide.md](editor-guide.md) | Must | Staging | ⬜ |
| 16.9 | Final go-live checklist on launch day, then smoke test of the live site (pages, forms, emails, admin) | Must | Prod | ⬜ |

## 17. Automated regression

So the tests above can be repeated after every change, not only once.

| # | Test | Priority | Where | Status |
|---|---|---|---|---|
| 17.1 | Move the CMS test scripts (markers, options, revalidation) into the repo (`web/tests/cms/`) with one command | Should | Local | ⬜ |
| 17.2 | Browser tests for the key journeys (Playwright): menu, filters, case study, forms | Should | Local, CI | ⬜ |
| 17.3 | Visual regression: screenshots of every page at 3 widths, compared after each change | Should | Local, CI | ⬜ |
| 17.4 | Lint, typecheck, build and the tests run automatically on each push (CI) | Should | CI | ⬜ |
| 17.5 | Smoke test after every deploy: all pages 200, health check, one form | Must | Staging, Prod | ⬜ |

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
- scheduled publishing (REVAL-6).
