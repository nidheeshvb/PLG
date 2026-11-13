# PLG Acachet Website — Architecture

_Last updated: 13 November 2026 · Covers Phase 1, step 1 (foundation + Home page) and the proposed AWS production setup_

This document describes **how the application is built** (Part A) and **how it is hosted** (Part B).
It contains no secrets and can be shared with the client. Diagrams use Mermaid (they render on GitHub, GitLab and most Markdown viewers).

- **Decided** = built and in use. **Proposed** = recommended, waiting for a client decision (mainly hosting).

---

# Part A — Application architecture

## A1. System context

```mermaid
flowchart LR
  V[Website visitors] -->|HTTPS| APP
  E[Content editors] -->|HTTPS /admin| APP
  subgraph APP[PLG Acachet application · one Next.js deployment]
    W[Public website]
    C[Payload CMS: admin UI + API]
  end
  APP --> DB[(PostgreSQL)]
  APP --> M[(Media storage)]
  APP -. later .-> X[Email / CRM]
```

The website and the CMS are **one application** (Next.js with Payload CMS embedded). There is no separate CMS server, no headless-CMS subscription and no extra network hop between them: the website reads content through Payload's in-process Local API.

## A2. Technology stack (decided)

| Layer | Choice | Version |
|---|---|---|
| Runtime | Node.js | 20.18+ (22 LTS recommended) |
| Web framework | Next.js, App Router, React Server Components | 16.4 |
| UI | React, TypeScript (strict), CSS Modules | React 19.2 |
| CMS | Payload CMS (admin UI, REST/GraphQL API, Local API) | 3.91 |
| Rich text | Lexical editor (restricted toolbar for editors) | via Payload |
| Database | PostgreSQL via `@payloadcms/db-postgres` (Drizzle) | PG 14+ |
| CMS plugins | Nested docs (page tree + breadcrumbs), SEO (meta tab) | 3.91 |
| Images | `next/image` + `sharp` (responsive WebP/AVIF) | |
| Live preview | `@payloadcms/live-preview-react` + Next.js draft mode | |
| Media storage | `@payloadcms/storage-s3` (Amazon S3), local disk when not configured | 3.91 |
| CDN refresh | `@aws-sdk/client-cloudfront` (invalidation on publish) | |
| Email | `@payloadcms/email-nodemailer` (SMTP, e.g. Amazon SES) | 3.91 |

## A3. Layered structure

```mermaid
flowchart TB
  subgraph Presentation
    R["Route: app/(frontend)/[[...slug]]/page.tsx<br/>Layout: header, footer, global behaviours"]
    RB[RenderBlocks: blockType → component]
    B["Blocks: Banner, Text with image, Cards, ... (config + component + CSS)"]
    UI["UI primitives: Button, CMSLink, Media, RichText,<br/>SectionHeader, Section, Slider, Marquee, cursor, reveal"]
  end
  subgraph Content
    F["Reusable CMS field groups: link, section header,<br/>section settings, rich text, media, slug"]
    COL["Collections & globals: Pages, Case studies, Partners,<br/>Media, Form messages, Users · Header & footer"]
  end
  subgraph Data
    L["lib/payload.ts: the only data-access module"]
    P[Payload Local API]
  end
  R --> RB --> B --> UI
  B -. fields defined by .-> F
  F --> COL
  R --> L --> P --> PG[(PostgreSQL)]
```

**Rules that keep it maintainable**
1. UI primitives know nothing about the CMS; blocks combine primitives; pages only list blocks.
2. Every block is assembled from the same field groups, so all sections edit the same way.
3. All database reads go through `src/lib/payload.ts`; components receive data as props.
4. New pages reuse blocks first, then add a variant to an existing block, and only then add a new block.

## A4. Source layout (`web/src`)

| Path | Responsibility |
|---|---|
| `app/(frontend)/` | Website: root layout, the single page route, form server action, preview routes, sitemap, 404 |
| `app/(payload)/` | Payload admin UI and REST/GraphQL API (generated) |
| `app/robots.ts` | robots.txt |
| `blocks/<Name>/` | One folder per section type: `config.ts` (CMS fields), `Component.tsx`, `Component.module.css` |
| `blocks/index.ts`, `blocks/RenderBlocks.tsx` | Block registry for the CMS and for rendering |
| `collections/`, `globals/` | Content model |
| `fields/` | Reusable CMS field groups |
| `access/` | Permission rules (admin / editor / public) |
| `components/layout/`, `components/ui/` | Header, footer, logo; UI primitives |
| `hooks/` | Shared scroll loop (`useRafScroll`), reduced-motion |
| `lib/` | Data access, link resolution, preview URL, revalidation, fixed routes |
| `styles/` | Global design tokens, reset, shared typography |
| `seed/` | Imports prototype content into the CMS |
| `migrations/` | Versioned database schema changes |
| `payload.config.ts`, `payload-types.ts` | CMS configuration; generated TypeScript types |

## A5. Content model

```mermaid
erDiagram
  PAGES ||--o{ PAGES : "parent (nested pages)"
  PAGES ||--o{ SECTION : "layout (ordered)"
  SECTION }o--o{ MEDIA : "images / videos"
  SECTION }o--o{ CASE_STUDIES : "Case study showcase"
  SECTION }o--o{ PARTNERS : "Logo strip"
  SECTION }o--o{ PAGES : "button links"
  CASE_STUDIES }o--|| MEDIA : "cover image / video"
  PARTNERS }o--|| MEDIA : "logo"
  SITE_SETTINGS }o--o{ PAGES : "menu & footer links"
  USERS ||--o{ PAGES : "edits (versions)"
  FORM_SUBMISSIONS }o--|| WEBSITE_FORM : "created by"
```

| Entity | Key fields | Notes |
|---|---|---|
| Pages | title, slug, parent, path (computed), layout (sections), meta (SEO) | Drafts, autosave, versions, scheduled publish |
| Section (block) | blockType + its fields + Section settings (anchorId, navLabel, theme, hideSection) | Stored inside the page |
| Case studies | title, slug, cardTitle, summary, client, image, video | Extended with full case study content in a later step |
| Partners | name, logo, height, mobileHeight, sortOrder | |
| Media | file, alt, focal point | Images, SVG, MP4/WebM |
| Form submissions | form, name, email, phone, message, page | Created only by the website |
| Users | email, password, name, role (admin / editor) | |
| Site settings (global) | headerLinks, mobileMenuNote, footerLinks, legalLinks, social, copyright | |

**Page addresses** are computed, not typed: `home` → `/`; other pages → their nested path (e.g. `/legal/terms`), stored in `path` and used for lookups.

## A6. Request lifecycle (public page)

```mermaid
sequenceDiagram
  participant V as Visitor
  participant CDN as CDN / edge cache
  participant N as Next.js server
  participant P as Payload Local API
  participant DB as PostgreSQL
  V->>CDN: GET /about
  alt page already built
    CDN-->>V: static HTML (fast)
  else first request or revalidated
    CDN->>N: render
    N->>P: find page where path = "/about"
    P->>DB: query (published only)
    DB-->>P: page + sections (+ related media, case studies)
    P-->>N: typed data
    N-->>CDN: HTML (cached)
    CDN-->>V: HTML
  end
  V->>CDN: images / video (/api/media/file/…, optimised by next/image)
```

- All published pages are generated at build time (`generateStaticParams`) and served as static HTML.
- Images are resized and converted per device by `next/image`; files come from media storage.

## A7. Editing and publishing lifecycle

```mermaid
sequenceDiagram
  participant E as Editor
  participant A as CMS admin (/admin)
  participant DB as PostgreSQL
  participant PV as Preview pane (draft mode)
  participant S as Public site
  E->>A: edit a section
  A->>DB: autosave draft (every ~0.6 s)
  A-->>PV: "saved" event
  PV->>DB: re-render page with draft content
  E->>A: Publish changes
  A->>DB: save published version
  A->>S: revalidate that page's path (header/footer/logos/case studies: whole site)
  S-->>S: next request rebuilds the page
```

- Preview opens `/next/preview?path=…&secret=…`, which turns on Next.js **draft mode** for that browser only. Visitors never see drafts.
- Draft mode can be turned off at `/next/exit-preview`.

## A8. Form submission flow

```mermaid
sequenceDiagram
  participant V as Visitor
  participant F as Form (browser)
  participant SA as Server action submitEnquiry
  participant DB as PostgreSQL
  V->>F: fill in + submit
  F->>F: check name and email
  F->>SA: POST form data
  SA->>SA: honeypot check, validate again, trim lengths
  SA->>DB: create Form message (server-only permission)
  SA-->>F: ok / field errors
  F-->>V: "Sent" + thank-you message
```

Later: notification email and CRM/careers-system hand-off from the same server action.

## A9. Rendering model

| Concern | Approach |
|---|---|
| Server vs client | Server components render markup; small client components add behaviour (menu, sliders, carousels, scroll effects, forms) |
| Scroll effects | One shared, frame-batched scroll loop (`useRafScroll`): all layout reads, then all style writes, at most once per frame |
| Reveal on scroll | One global observer adds `.in` to elements marked `data-reveal` |
| Styling | Global tokens + shared typography; everything else in per-component CSS Modules |
| Header tone | Sections with white backgrounds mark themselves `data-nav-tone="light"`; the header reads that while scrolling |
| Accessibility | Reduced-motion respected everywhere; keyboard menu; labelled controls |

## A10. Security model

| Area | Measure |
|---|---|
| Authentication | Payload auth (hashed passwords, signed sessions via `PAYLOAD_SECRET`) |
| Authorisation | Admin: everything. Editor: content only. Public: published pages and media only |
| Drafts | Readable only by signed-in users; preview route protected by `PREVIEW_SECRET` |
| Form messages | API create/update disabled; only the server action can create them |
| Secrets | Environment variables only; `.env` never committed |
| Indexing | `/admin`, `/api`, `/next` disallowed in robots.txt |

## A11. Build and release pipeline

```mermaid
flowchart LR
  G[Git push] --> CI["CI: install → lint → typecheck → build"]
  CI --> MIG[Run database migrations on target]
  MIG --> DEP[Deploy new version]
  DEP --> SMK[Smoke check: home page, /admin login]
```

| Command | Purpose |
|---|---|
| `npm run lint`, `npm run typecheck`, `npm run build` | Quality gates |
| `npm run migrate:create -- <name>` | Generate a migration after a schema change (committed to git) |
| `npm run migrate` | Apply migrations to a database |
| `npm run seed` | Load prototype content (development / first setup only) |
| `npm run generate:types` | Regenerate TypeScript types from the CMS config |

---

# Part B — Server architecture

The production plan is the **AWS Middle East (UAE) architecture** in [`hosting-architecture.md`](hosting-architecture.md) (prepared 12 November 2026). Development proceeds on that basis. It may change later, so every external service is connected through environment variables and can be swapped without code changes (section B9).

## B1. Hosting requirements

The application is a **long-running Node.js server** (not a static export): the CMS admin, API, form handling, preview and on-demand page rebuilds need a running server. That fits Amazon EC2.

| Component | Requirement |
|---|---|
| Application | Node.js 20.18+ (22 LTS), 2 GB RAM recommended (image resizing and the CMS admin build), 2 vCPU |
| Database | PostgreSQL 14+, managed (Amazon RDS), automated backups and point-in-time recovery |
| Media storage | Amazon S3 bucket (application uses it when `S3_BUCKET` is set) |
| CDN | Amazon CloudFront in front of the site and the media bucket |
| TLS | AWS Certificate Manager certificate on the client's domain |
| Email (optional) | Amazon SES (SMTP) or any SMTP service, for password resets and form notifications |

## B2. Environments

| Environment | Purpose | Database | Media | Status |
|---|---|---|---|---|
| Local development | Building and testing | Embedded PostgreSQL started by `npm run db` (port 5433, data in `web/.postgres`) | Local `web/media/` folder | **In use** |
| Staging | Client review of each step | RDS PostgreSQL (separate database or small instance) | Separate S3 bucket or prefix | Planned (same AWS setup, smaller sizes) |
| Production | Live website | RDS PostgreSQL | S3 bucket + CloudFront | Planned |

Each environment has its own database, bucket and secrets. Once live, content is entered in production; staging can be refreshed from a production snapshot.

## B3. Production topology (AWS me-central-1)

```mermaid
flowchart LR
  U[Visitors & editors] --> R53[Route 53 · DNS]
  R53 --> CF["CloudFront · CDN + TLS (ACM)<br/>optional AWS WAF"]
  CF -->|"pages, /_next/*, /admin, /api"| EC2["EC2 · Next.js + Payload CMS<br/>(Node 22, process manager)"]
  CF -->|"media files"| S3[(S3 · media bucket)]
  EC2 --> RDS[(RDS for PostgreSQL)]
  EC2 -->|uploads| S3
  EC2 -->|"invalidate on publish"| CF
  EC2 -. optional .-> SES[Amazon SES]
  EC2 -. logs & metrics .-> CW[CloudWatch]
```

| # | Component | AWS service | Role in this application |
|---|---|---|---|
| 1 | DNS | Route 53 | Domain → CloudFront |
| 2 | Certificate | ACM | HTTPS on the domain (certificate for CloudFront is issued in us-east-1, as CloudFront requires) |
| 3 | CDN | CloudFront | Caches pages, images and videos at edge locations including the UAE |
| 4 | Application | EC2 | Runs `next start` (website + CMS) |
| 5 | Database | RDS for PostgreSQL | All CMS content, users, form messages |
| 6 | Media | S3 | Every upload from the CMS |
| 7 | Firewall (optional) | WAF | Bot and common-attack protection on CloudFront |
| 8 | Monitoring | CloudWatch | Logs, metrics, alarms, health check on `/next/health` |

### CloudFront behaviours (recommended)

| Path | Origin | Caching |
|---|---|---|
| `/_next/static/*` | EC2 | Cache long (files are content-hashed) |
| `/_next/image*` | EC2 | Cache, include query string in the cache key |
| `/admin*`, `/api/*`, `/next/*` | EC2 | **No caching**; forward cookies, headers and query strings |
| Media path (e.g. `media.<domain>/*` or `/media/*`) | S3 (Origin Access Control) | Cache long |
| Default (`/*`, pages) | EC2 | Cache using the origin's headers; forward the draft-mode cookie so previews bypass the cache |

When an editor publishes, the application clears the changed page from both Next.js's cache and CloudFront (`CreateInvalidation`; whole site for header/footer, logo or case-study changes).

## B4. How images and videos are delivered

| Media | Delivery |
|---|---|
| Images | Uploaded to S3. `next/image` serves each device a resized AVIF/WebP version; those versions are cached on the server and at CloudFront |
| Background videos | Optimised MP4 files in S3, delivered through CloudFront. The banner supports a separate lighter **mobile video** (≤900px) and shows the poster image instantly |
| Logos (SVG) | Served as-is from S3 via CloudFront |
| Long videos with a player | Not needed at launch. If required later, add Bunny Stream or AWS MediaConvert; the rest of the architecture stays the same |

## B5. Data, backups and migrations

| Concern | Approach |
|---|---|
| Schema changes | Versioned migrations in `web/src/migrations`, applied with `npm run migrate` before each release |
| Database access | RDS in a private subnet, reachable only from the EC2 security group; TLS connections (`?sslmode=require` in `DATABASE_URL`) |
| Backups | RDS automated daily backups with point-in-time recovery (7–35 days); snapshot before each release |
| Media | S3 versioning on; bucket private, read through CloudFront Origin Access Control |
| Restore drill | Restore an RDS snapshot to staging before go-live |

## B6. Caching layers

| Layer | What | Cleared by |
|---|---|---|
| CloudFront | Page HTML, `/_next/*` assets, optimised images, media files | Publish (automatic invalidation); deploys for assets (new file names) |
| Next.js server | Pre-rendered pages (all published pages built at deploy) and optimised images | `revalidatePath` on publish |
| Browser | Content-hashed assets | New deploy |

## B7. Security

- HTTPS only (CloudFront redirect), HSTS on the domain.
- EC2 accepts web traffic only from CloudFront (CloudFront managed prefix list in the security group); SSH via AWS Systems Manager Session Manager instead of an open port.
- RDS private, TLS; S3 private with Origin Access Control.
- EC2 IAM role with least privilege: `s3:GetObject/PutObject/DeleteObject/ListBucket` on the media bucket, `cloudfront:CreateInvalidation` on the distribution, CloudWatch logs.
- Secrets (`PAYLOAD_SECRET`, `DATABASE_URL`, `PREVIEW_SECRET`, SMTP) in AWS Secrets Manager or SSM Parameter Store, loaded into the process environment.
- Optional AWS WAF managed rules (bot control, common attacks, rate limiting on `/admin` and `/api`).

## B8. Monitoring and operations

| Need | Approach |
|---|---|
| Uptime | CloudWatch Synthetics canary or Route 53 health check on `/next/health` (returns 200 when app and database are reachable) |
| Logs | Application stdout/stderr shipped to CloudWatch Logs (CloudWatch agent) |
| Alarms | EC2 CPU/memory/disk, RDS CPU/connections/storage, CloudFront 5xx rate, health check failures |
| Process | Node process kept alive by a process manager (systemd or PM2) or run as a Docker container; restarts on failure and on reboot |

## B9. Configuration (environment variables)

Integrations switch on when their variables are set, so the same code runs locally (all off) and on AWS (all on). Full list with comments: `web/.env.example`.

| Variable | Purpose | Production value (example) |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection | RDS endpoint, `?sslmode=require` |
| `PAYLOAD_SECRET` | Signs CMS sessions | long random string |
| `NEXT_PUBLIC_SITE_URL` | Public site address | `https://www.<domain>` |
| `PREVIEW_SECRET` | Protects the preview route | long random string |
| `S3_BUCKET`, `S3_REGION`, `S3_PREFIX` | Media storage on S3 (unset = local disk) | bucket name, `me-central-1`, `media` |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Only outside AWS (EC2 uses its IAM role) | — |
| `S3_ENDPOINT` | Only for S3-compatible services other than AWS | — |
| `MEDIA_PUBLIC_URL` | Media URLs point at the CDN instead of the app | `https://media.<domain>` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Clear CDN cache on publish | distribution ID |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` | Outgoing email (unset = printed to console) | SES SMTP endpoint in me-central-1 |

Code locations: `web/src/integrations/storage.ts` (S3), `cdn.ts` (CloudFront), `email.ts` (SMTP).

## B10. Deployment on EC2 (outline)

1. Provision RDS, the S3 bucket, CloudFront distribution (behaviours as in B3), ACM certificate, Route 53 records and the EC2 instance with its IAM role.
2. On the instance: install Node.js 22 LTS; check out the release; `npm ci`.
3. Provide environment variables (Secrets Manager / Parameter Store → environment).
4. `npm run migrate` (applies pending database migrations).
5. `npm run build`, then run `npm run start` under systemd or PM2 (port 3000, behind CloudFront).
6. Check `/next/health`, the home page and `/admin` sign-in; invalidate CloudFront `/*` after the first deploy.
7. First content: run `npm run seed` once against the production database with S3 enabled (uploads go straight to S3), then change the seeded passwords; or enter content in the CMS.

A CI pipeline (e.g. GitHub Actions) can run lint, typecheck and build, then deploy to EC2 via AWS Systems Manager or CodeDeploy.

## B11. Decisions

| Area | Decision | Status |
|---|---|---|
| Application | Next.js + Payload in one deployment | Decided |
| Database engine | PostgreSQL | Decided |
| Local database | Embedded PostgreSQL (no install needed) | Decided |
| Page model | Pages made of reorderable, configurable sections | Decided |
| Cloud & region | AWS, Middle East (UAE) `me-central-1` | **Proposed, development proceeds on it** |
| Server | EC2 running Next.js + Payload | Proposed |
| Database service | RDS for PostgreSQL | Proposed |
| Media | S3 + CloudFront; S3 adapter built in, switched on by `S3_BUCKET` | Proposed; code ready |
| CDN refresh | CloudFront invalidation on publish, switched on by `CLOUDFRONT_DISTRIBUTION_ID` | Proposed; code ready |
| Video | Plain MP4 on S3/CloudFront, optional lighter mobile video; no streaming service at launch | Proposed; code ready |
| Firewall | AWS WAF | Optional |
| Monitoring | CloudWatch, health check `/next/health` | Proposed; endpoint ready |
| Email | Amazon SES (SMTP adapter built in, switched on by `SMTP_HOST`) | Client decision needed; code ready |
| Server sizing & cost | Depends on expected monthly visitors | **Client input needed** |
| Form destinations | CMS inbox now; email/CRM later | Client decision needed |
| Cookie consent & analytics | Platform to be chosen | Client decision needed |
