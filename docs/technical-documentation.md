# PLG Acachet Website — Technical Documentation

_Last updated: 13 November 2026 · Status: Phase 1, step 1 (Home page) complete_

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
| Media storage | Local disk in development; cloud object storage (e.g. Amazon S3, Vercel Blob, Cloudflare R2) for live | Images and videos uploaded through the CMS |
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
- **Page name** and **URL name** (the web address is worked out automatically, including nested pages such as `/legal/terms`).
- **Sections** — the ordered list of content blocks.
- **SEO** — page title, description and share image for search engines and social media.
- **Drafts, versions and scheduling** — changes are saved as drafts automatically, can be previewed live, published when ready, scheduled for later, and earlier versions can be restored.

### 4.2 Shared content
| Collection | Used for |
|---|---|
| Case studies | Case study tiles (and, from the Our Work page, the full case studies) |
| Partner logos | The scrolling logo strip; order and display size per logo |
| Images & videos | Every uploaded image, logo and video, with alt text and focal point |
| Form messages | Messages sent from the website's forms (read-only inbox) |
| Header & footer | Menu links, footer links, legal links, social media links, copyright line |

### 4.3 Sections available today
| Section | What it is | Options for editors |
|---|---|---|
| Banner (top of page) | Full-screen showreel with headline and up to two buttons | Video, background image, headline, intro text, buttons, scroll indicator |
| Text with image | Heading, text and button beside an image | Image left or right, shaded title, fade edge, button on/off |
| Cards | Row of image cards (swipeable on mobile) | Card style, cards (title, text, image, link), white or dark background |
| Stacking panels | Full-screen panels that slide over each other while scrolling | Up to 4 panels with heading, text, image, button |
| Key numbers | Large animated numbers over full-screen images | Numbers, suffix (e.g. "+"), captions, images, seconds per number |
| Logo strip | Continuously scrolling partner logos | Optional heading; all logos or a chosen set |
| Case study showcase | Large tiles linking to case studies | Choose case studies and order; full-width tiles; button |
| Statement | One large sentence | Scroll animation on/off; brand marks on/off |
| Form | Contact form with heading and photo | Heading, intro, background photo, button text, thank-you message |

Every section also has **Section settings**: a Section ID (so buttons can jump to it), a name for section menus, and **hide on website**.

More sections are added as the remaining pages are built (section menus, image tiles, team directory, open roles, service details, case study grid, offices, legal documents and others). Existing sections gain new styles where possible rather than duplicating them.

## 5. Editing workflow (for the content team)

1. Sign in at **`/admin`**.
2. Open **Pages** and choose a page.
3. Edit text and images inside a section; drag sections to reorder; use **Add Section** to insert a new one; use **Section settings → Hide this section** to take one off the page without deleting it.
4. Click the **eye icon** to see a **live preview** next to the editor (desktop, tablet and mobile sizes). Changes are saved as a draft automatically and are **not public** yet.
5. Click **Publish changes** to put the changes live (or schedule them).
6. **Header & footer** (under Settings) controls menus and footer links on every page.
7. Messages sent through the website appear under **Inbox → Form messages**.

### User roles
| Role | Can do |
|---|---|
| Admin | Everything, including managing user accounts |
| Editor | All website content (pages, sections, images, case studies, logos, header & footer) and read form messages; cannot manage users |

## 6. Website features

- **Responsive** design matching the prototype at desktop, tablet (sliders become swipeable) and mobile.
- **Motion** from the prototype: showreel intro, scroll reveals, stacking panels, auto-advancing key numbers, word-by-word statement, custom "View" cursor on case studies. All motion respects the visitor's **reduced-motion** setting.
- **Accessibility:** skip-to-content link, keyboard-operable menu (Escape closes), labelled controls, video pause button, alt text managed in the CMS.
- **Performance:** static pages, optimised responsive images (WebP/AVIF at the right size for each device), self-hosted fonts, the showreel pauses when off screen, scroll effects batched to once per frame.
- **SEO:** per-page title and description, canonical URLs, Open Graph/Twitter share images, automatic `sitemap.xml` and `robots.txt`.
- **Forms:** validated in the browser and on the server, spam honeypot, stored in the CMS inbox.

## 7. Security

- CMS access requires sign-in; passwords are hashed; sessions are signed with a secret key.
- Role-based permissions (Admin / Editor). Form messages cannot be created or edited through the CMS API, only by the website's form.
- Draft content is visible only to signed-in users (via preview); the public site shows published content only.
- Secrets (database connection, signing keys) are kept in environment variables, never in the code.
- `/admin`, `/api` and preview routes are excluded from search engines.

## 8. Hosting and deployment

### Requirements
| Item | Requirement |
|---|---|
| Runtime | Node.js 20.18 or newer (22 LTS recommended) — any Node host or container platform (e.g. Vercel, AWS, Azure, DigitalOcean, Render, Railway) |
| Database | PostgreSQL 14+ (managed service recommended, e.g. Neon, Supabase, AWS RDS, Azure Database) |
| Media storage | Cloud object storage (S3-compatible or Vercel Blob) |
| Domain & SSL | Client's domain pointed at the host; HTTPS |
| Email (optional) | Transactional email service (e.g. Resend, SendGrid, AWS SES) for CMS password resets and form notifications |

### Configuration (environment variables)
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection |
| `PAYLOAD_SECRET` | Signs CMS sign-in sessions |
| `NEXT_PUBLIC_SITE_URL` | Public website address (share images, sitemap, live preview) |
| `PREVIEW_SECRET` | Protects the preview link |

### Release process
1. Database changes are versioned as **migrations** and applied with `npm run migrate` before a release.
2. `npm run build` produces the optimised site; `npm run start` serves it.
3. Recommended environments: **staging** (client review) and **production**.

### Backups
Use the database provider's automated daily backups with point-in-time recovery, plus versioning on the media storage bucket.

## 9. Project status and roadmap

| Step | Scope | Status |
|---|---|---|
| 1 | Foundation, CMS, header/footer, **Home page** | ✅ Complete — in review |
| 2 | About Us | Planned |
| 3 | Our Story | Planned |
| 4 | The Team (team directory, profiles) | Planned |
| 5 | Join Us (open roles, application form with CV upload) | Planned |
| 6 | Services | Planned |
| 7 | Our Work (case study grid, filters, full case studies) | Planned |
| 8 | Contact (enquiry form, offices) | Planned |
| 9 | Legal (Terms, Privacy, Cookies) | Planned |
| 10 | Go-live: hosting, cloud media storage, email, domain, analytics/cookie consent | Planned |

## 10. Items needed from PLG Acachet

- Approved copy, figures and case study content where the prototype has placeholders.
- Real social media links (currently placeholders).
- Office addresses, email and phone for the Contact page.
- Legal wording (Terms, Privacy, Cookies) approved by counsel, and the chosen cookie-consent platform.
- Where form messages should go besides the CMS inbox (email addresses, CRM, careers system).
- Hosting preference (or approval of a recommended setup), and the domain.
- Names and email addresses of people who need CMS accounts, and their roles.
