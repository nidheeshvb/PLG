# PLG Acachet Website — Technical Documentation

_Last updated: 16 November 2026 · Status: Phase 1, step 9 (Legal pages) complete: every page is built_

---

## 1. Overview

The PLG Acachet website is being rebuilt from the approved static HTML prototype into a production web application with a content management system (CMS).

- The **website** looks and behaves exactly like the approved prototype, on desktop, tablet and mobile.
- The **CMS** lets PLG Acachet's team update text, images, videos, links and logos, and **add, remove, reorder or hide whole sections of a page**, without a developer.
- Pages are built from a shared library of **sections** (for example "Banner", "Text with image", "Cards", "Key numbers"). New pages reuse the same sections, which keeps the design consistent and lowers the cost of every new page.

## 2. Technology

| Area | Technology | Notes |
|---|---|---|
| Website framework | Next.js 16 (React 19, TypeScript) | Industry-standard, fast, search-engine friendly |
| Content management | Payload CMS 3 | Open source, runs inside the same application (no separate CMS server or licence fees) |
| Database | PostgreSQL | Stores all content, users and form messages |
| Media storage | Amazon S3 with CloudFront CDN in production; local disk in development | Images and videos uploaded through the CMS |
| Styling | CSS Modules | Design ported directly from the prototype |
| Fonts | Inter (Google Fonts, self-hosted by Next.js) | |

Everything is open source; there are no per-seat or licence costs for the CMS.

## 3. How the system fits together

```
 Editors ──► CMS (/admin) ──► PostgreSQL database ◄── Website (public pages)
                 │                                         ▲
                 └── Images & videos ──► Media storage ────┘
```

- The CMS and the website are **one application**, deployed together. The CMS is available at `/admin`.
- Every page of the website is a **Page** in the CMS made of an ordered list of sections. The website renders whatever that list says, top to bottom.
- Pages are pre-built as static HTML for speed. When an editor **publishes** a change, only the affected pages are rebuilt automatically, within seconds.

The full application and server architecture, with diagrams and hosting options, is in the separate **Architecture** document (`docs/architecture.md`).

## 4. Content model

### 4.1 Pages
Each page has:
- **Page name** and **URL name** (the web address is worked out automatically, including nested pages such as `/about/our-story` or `/legal/terms`). Pages can sit under a parent page; the breadcrumb at the top of inner pages is built from this page tree automatically.
- **Sections** — the ordered list of content blocks.
- **SEO** — page title, description and share image for search engines and social media.
- **Drafts, versions and scheduling** — changes are saved as drafts automatically, can be previewed live, published when ready, scheduled for later, and earlier versions can be restored.

### 4.2 Shared content
| Collection | Used for |
|---|---|
| Case studies | Tiles (Home, Our Work) and the full case study that opens over Our Work: client, services, market, year, brief, approach, 1–4 impact figures, other results, gallery, photo and film, search description, order. Text in [square brackets] shows highlighted as "to be confirmed" |
| Partner logos | The scrolling logo strip; order and display size per logo |
| Team members | The Team page: name, job title, photo, filter group, org chart position (and column head), "Senior account owner" label, bio, social links, order |
| Open roles | Join Us job listings: title, team, location, type, description, key points, "show on the website" switch, order. Also fills the application form's role list |
| Images & videos | Every uploaded image, logo and video, with alt text and focal point |
| Form messages | Enquiries and job applications sent from the website's forms (read-only inbox) |
| Header & footer | Menu links (with optional mobile sub-links), the site-wide "Start a conversation" banner, company details (for the legal documents), footer links, legal links, social media links, copyright line |

### 4.3 Sections available today
| Section | What it is | Options for editors |
|---|---|---|
| Banner (top of page) | Page-top banner. Styles: *Showreel* (Home, full-screen video) and *Inner page* (automatic breadcrumb, headline with orange last word, intro and buttons) | Style, video, background image, headline (size: wrapping, one line, fitted; slightly larger or smaller on phones), photo dimmed or brighter, intro text, buttons, scroll indicator, brand mark |
| Section menu | Bar of links under the banner | Links generated either from the page's sections (highlighting the one being read) or from the main menu's sub-links (highlighting this page, with a "Back to…" link); optional note; *numbered* look that stays at the top while scrolling with a progress line and gives way to the main menu (Services) |
| Lead paragraph | Large paragraph whose words light up while scrolling, optional diagram, details row and closing line | Text size, orange words (end of paragraph, particular names or a phrase), animation on/off, diagrams "Three into one", "Lanes into one" (rows with photos, lines drawn while scrolling) and "One line across lanes" (columns crossed by one line drawn while scrolling), row with heading, text and a labelled list (Join Us markets), heading above the paragraph, short notes, grey band background, closing line with button |
| Text with image | Heading, text and button beside an image. Styles: *fade* (Home) and *rounded image on grey band* (About "Mujtamae") | Image left or right, shaded title, fade edge, button on/off, list, illustrative report card with bars |
| Cards | Row of image cards (swipeable on mobile). Styles: *numbered* and *pillar* | Card style, cards (title, label, text, image, link), note, white or dark background |
| Side-by-side statements | Heading plus 2–3 large statements (Vision & Mission) | Statements, brand mark on/off |
| Text over image | Heading and text over a drifting photo with a scrolling fact strip | Image, text, strip items |
| Group structure | Text, counting key facts and nested company frames (Our Ownership) | Facts, closing line, 1–4 levels with label, detail, description, figure |
| Team directory | Team portraits with a grid / org chart switch, a "Show" filter by group with counts, and a profile panel (The Team) | Intro with orange words, all people or a chosen set, org chart view on/off, filter on/off. People come from Team members; the org chart is built from each person's position |
| Group chain | Statement, a chain of company names and a text link (The Team "Group scale") | 1–5 names (first highlighted), link on/off |
| Open roles | Job list with team filter buttons (with counts); each role opens to its description and an "Apply for this role" button that fills in the application form (Join Us) | Heading, all open roles or a chosen set, filter on/off, button text, form section, empty-list text, line and button under the list. Roles come from Open roles |
| Link tiles | Expanding image tiles linking to other pages | Standard, tall or numbered style (Services categories: automatic 01–04, text opens on hover); up to 4 tiles: title, text, image, destination |
| Service detail | One service (Services page): number, name and buttons in a column that stays in view; photos, a highlight (FUZE), sub-services and photo collages on the right | Name, short headline, intro, 2 buttons; content pieces in any order. Numbering ("02 / 04") and the alternating grey band are automatic |
| Call to action banner | White "Start a conversation" banner | Uses the site-wide content from Header & footer, or page-specific content |
| Stacking panels | Full-screen panels that slide over each other while scrolling | Up to 4 panels with heading, text, image, button |
| Key numbers | Large animated numbers over full-screen images | Numbers, suffix (e.g. "+"), captions, images, seconds per number |
| Logo strip | Continuously scrolling partner logos | Optional label (slimmer strip with the label in the corner); all logos or a chosen set |
| Case study showcase | Large tiles linking to case studies | Choose case studies and order; full-width tiles; optional different photo per tile; button |
| Case study grid | Every case study as large numbered tiles with a filter bar by service that sticks to the top; each tile opens the full case study over the page at its own address (Our Work) | Filter on/off and labels, tile link text, empty-filter text, "next" label, closing button. Tiles and case studies come from Case studies |
| Statement | One large sentence | Look: centred over brand marks or left-aligned on a grey band; orange end of sentence; scroll animation or fade-in; brand marks on/off |
| Form | Website form. Types: *Enquiry* (contact form over a photo), *Detailed enquiry* (Contact: name, company, work email, phone, choices, message, consent, with numbered promises beside it) and *Job application* (name, email, role, discipline, LinkedIn/portfolio link, message, on a white band) | Form type, heading, intro, background photo (enquiry), promises, choices and the note they can show, consent wording, button text, thank-you heading and message, note next to the button (application) |
| Legal document | A legal page (Terms, Privacy Policy, Cookies): dark header with facts, a document switcher that sticks to the top, numbered contents that follow the reader, sections (with optional highlighted box, tag, cookie table, contact card, cookie preferences button), a questions box and links to the other documents | Title, facts, documents in the switcher, notice, introduction, sections, questions box. Contact details from Header & footer → Company details |
| Office | Office photo with the city and a live local-time clock, and email, phone (with Copy), address (with Directions) and hours (Contact) | Heading, intro, photo, label, city, time zone, contact details, opening hours |

Every section also has **Section settings**: a Section ID (so buttons can jump to it), a name for section menus, and **hide on website**.

Every page of the design is built. New sections or styles can be added on request; existing sections gain new styles where possible rather than duplicating them.

## 5. Editing workflow (for the content team)

1. Sign in at **`/admin`**.
2. Open **Pages** and choose a page.
3. Edit text and images inside a section; drag sections to reorder; use **Add Section** to insert a new one; use **Section settings → Hide this section** to take one off the page without deleting it.
4. Click the **eye icon** to see a **live preview** next to the editor (desktop, tablet and mobile sizes). Changes are saved as a draft automatically and are **not public** yet.
5. Click **Publish changes** to put the changes live (or schedule them).
6. **Header & footer** (under Settings) controls menus, footer links and the site-wide "Start a conversation" banner on every page.
7. Messages sent through the website appear under **Inbox → Form messages**.

A detailed, plain-language **Content Editor Guide** (every section and option, buttons, images, publishing, and what each change affects) is provided separately for the content team (`docs/editor-guide.md`).

### User roles
| Role | Can do |
|---|---|
| Admin | Everything, including managing user accounts |
| Editor | All website content (pages, sections, images, case studies, logos, team members, open roles, header & footer) and read form messages and job applications; cannot manage users |

## 6. Website features

- **Responsive** design matching the prototype at desktop, tablet (sliders become swipeable) and mobile.
- **Motion** from the prototype: showreel intro, scroll reveals, stacking panels, auto-advancing key numbers, word-by-word statement and lead paragraph, custom "View" cursor on case studies, banner and background parallax, drawn diagram lines, counting facts, highlighted group structure, expanding link tiles. All motion respects the visitor's **reduced-motion** setting.
- **Navigation:** the current page is highlighted in the menu; inner pages have an automatic breadcrumb; long pages have a section menu that follows the reader (swipeable on phones).
- **Accessibility:** skip-to-content link, keyboard-operable menu (Escape closes), labelled controls, video pause button, alt text managed in the CMS.
- **Performance:** static pages, optimised responsive images (WebP/AVIF at the right size for each device), self-hosted fonts, the showreel pauses when off screen, scroll effects batched to once per frame.
- **SEO:** per-page title and description, canonical URLs, Open Graph/Twitter share images, automatic `sitemap.xml` and `robots.txt`.
- **Forms:** validated in the browser and on the server, spam honeypot, stored in the CMS inbox. The job application form only accepts roles that are currently open and offers keyboard-operable dropdowns.
- **Case studies:** filter by service with counts; each case study has its own address (`/our-work#case-…`) that can be shared, closes with Esc, keeps keyboard focus inside while open and updates the browser tab title and page description.
- **Careers:** open roles filter by team with counts and expand in place; "Apply for this role" jumps to the form with the role and discipline filled in.

## 7. Security

- CMS access requires sign-in; passwords are hashed; sessions are signed with a secret key.
- Role-based permissions (Admin / Editor). Form messages cannot be created or edited through the CMS API, only by the website's form.
- Draft content is visible only to signed-in users (via preview); the public site shows published content only.
- Secrets (database connection, signing keys) are kept in environment variables, never in the code.
- `/admin`, `/api` and preview routes are excluded from search engines.

## 8. Hosting and deployment

### Proposed production setup (AWS, UAE region)
The website is being built for the hosting plan in **PLG Acachet: Proposed Hosting Architecture** (local copy: `docs/hosting-architecture.md`). Hosting region: **AWS Middle East (UAE), me-central-1**, the AWS region closest to Dubai.

| Component | AWS service | Purpose |
|---|---|---|
| DNS | Amazon Route 53 | Domain management and routing |
| SSL certificate | AWS Certificate Manager | Free HTTPS certificate with automatic renewal |
| CDN | Amazon CloudFront | Caches pages, images and videos close to visitors, including locations in the UAE |
| Application server | Amazon EC2 | Runs the website and the CMS |
| Database | Amazon RDS for PostgreSQL | CMS content, with automated daily backups |
| Media storage | Amazon S3 | Images, videos and documents uploaded through the CMS |
| Security (optional) | AWS WAF | Firewall against bots and common attacks |
| Monitoring | Amazon CloudWatch | Uptime, performance and error alerts |

**Ready in the application:** uploads go to S3 once the bucket is configured; media can be served from the CDN; publishing a change clears it from the CDN automatically; email works with Amazon SES; a health-check address (`/next/health`) is available for monitoring. Each of these is switched on by configuration at deployment, with no code changes, so the hosting choices can still change.

**Images and videos:** images are delivered in several sizes in modern formats (AVIF/WebP), so each device downloads only what it needs. Background videos are optimised MP4 files on S3 delivered through CloudFront; the banner can also take a lighter video for phones, and a preview image shows instantly while the video loads.

### Configuration (environment variables)
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection (RDS) |
| `PAYLOAD_SECRET` | Signs CMS sign-in sessions |
| `NEXT_PUBLIC_SITE_URL` | Public website address (share images, sitemap, live preview) |
| `PREVIEW_SECRET` | Protects the preview link |
| `S3_BUCKET`, `S3_REGION` | Media storage on Amazon S3 |
| `MEDIA_PUBLIC_URL` | CDN address for media files |
| `CLOUDFRONT_DISTRIBUTION_ID` | Clears the CDN cache when content is published |
| `SMTP_HOST` and related settings | Outgoing email through Amazon SES (password resets, form notifications) |

### Release process
1. Database changes are versioned as **migrations** and applied with `npm run migrate` before a release.
2. `npm run build` produces the optimised site; `npm run start` serves it on the EC2 server.
3. Recommended environments: **staging** (client review) and **production**, each with its own database and storage.

### Backups
RDS automated daily backups with point-in-time recovery, a snapshot before each release, and versioning on the S3 media bucket.

### Local installation
Developers can run the full website and CMS on their own computer by following `docs/local-setup.md` (requirements, step-by-step installation, database options, troubleshooting). No cloud account is needed for local development.

## 9. Project status and roadmap

| Step | Scope | Status |
|---|---|---|
| 1 | Foundation, CMS, header/footer, **Home page** | ✅ Complete — in review |
| 2 | **About Us** (banner, section menu, overview diagram, pillars, Mujtamae, vision & mission, why the UAE, ownership, more about us, call to action) | ✅ Complete — in review |
| 3 | **Our Story** (banner, section menu, the combination with "lanes into one" diagram, more about us, call to action) | ✅ Complete — in review |
| 4 | **The Team** (banner, section menu, team directory with grid / org chart / filter / profile panel, group scale, more about us, call to action) | ✅ Complete — in review |
| 5 | **Join Us** (banner, section menu, why join with "one line across lanes" diagram and markets, statement, open roles with filter, application form, more about us) | ✅ Complete — in review. **CV upload logic deferred** (see below) |
| 6 | **Services** (banner, numbered section menu that stays at the top, four categories, our approach, four service details, call to action) | ✅ Complete — in review |
| 7 | **Our Work** (video banner with pause button, filter bar, eight case study tiles, full case study view, brand logos, call to action) | ✅ Complete — in review. Extra case study sections from the design kept in the backlog |
| 8 | **Contact** (banner, detailed enquiry form with promises and choices, office with live local time, copy and directions) | ✅ Complete — in review |
| 9 | **Legal** (Terms & Conditions, Privacy Policy, Cookies: header, document switcher, numbered contents, sections, cookie table, questions box). `/legal` opens Terms | ✅ Complete — in review. Wording by counsel still needed; cookie preferences button waits for the consent platform |
| 10 | Go-live on AWS (me-central-1): set up EC2, RDS, S3, CloudFront, SES, domain; analytics and cookie consent | Planned |

### Deferred: CV upload on the Join Us form
The design includes a CV upload (PDF/Word, up to 10 MB). It is **on hold** until PLG Acachet confirms how CVs are handled and private S3 storage is available, because CVs are personal data and must not be stored with the public website media. The CV field is already on the form as designed, but a chosen file is **not sent or stored** yet. Everything else in the form works, and applicants can add a LinkedIn or portfolio link. Open questions and the planned implementation are in `docs/backlog-cv-upload.md`.

## 10. Items needed from PLG Acachet

- Approved copy, figures and case study content where the prototype has placeholders (About: the Mujtamae report card is an illustrative mock-up; confirm its figures or wording).
- Real social media links (currently placeholders), including each team member's LinkedIn / Instagram / X profile.
- Team bios (50–70 words each) and confirmation of the org chart reporting lines; photos for Sherif Saed and Emma Valdez.
- Confirmation of the office details on the Contact page (email, phone, address and hours are the ones in the design).
- Legal wording (Terms, Privacy, Cookies) approved by counsel: the pages contain the design's outline and placeholder text, plus the real "last updated" / "effective from" dates and version. And the chosen cookie-consent platform (connects the "Manage Cookie Preferences" button and the cookie list).
- Where form messages should go besides the CMS inbox (email addresses, CRM, careers system).
- The real open roles with descriptions (the six on the site come from the design and have no descriptions yet).
- Case studies: key visuals for G42, Pizza Hut and Red Bull (library photos for now), project photos for each gallery (library shots for now), and confirmation of the facts shown in [square brackets] (e.g. years).
- Whether the extra case study sections in the design are wanted (Mujtamae link, idea line, operating model): see the backlog.
- CV upload decisions (`docs/backlog-cv-upload.md`): whether to accept CVs, who may download them, how long they are kept, consent wording, applicant-tracking system, notification email, and access to a private S3 bucket.
- Approval of the proposed AWS hosting setup, expected monthly visitors (to size the server and estimate cost), and the domain.
- Names and email addresses of people who need CMS accounts, and their roles.
