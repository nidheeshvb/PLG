# PLG Acachet website

Next.js 16 (App Router, TypeScript) with Payload CMS 3 in the same app, on PostgreSQL.
The static HTML prototype in the repository root is the visual reference; this app rebuilds it page by page.

**Status:** step 9: every page is built (Home, About, Our Story, The Team, Join Us, Services, Our Work, Contact, Legal). The other pages exist as empty placeholders so links work.

More documentation:
- [`../CLAUDE.md`](../CLAUDE.md) — internal knowledge base: architecture, conventions, decisions log, known gotchas, planned blocks.
- [`../docs/technical-documentation.md`](../docs/technical-documentation.md) — client-shareable technical documentation.
- [`../docs/architecture.md`](../docs/architecture.md) — application and server architecture, with diagrams.
- [`../docs/backlog.md`](../docs/backlog.md): index of deferred features. Their UI is built and the logic is skipped while they wait for a decision.
- [`../docs/backlog-cv-upload.md`](../docs/backlog-cv-upload.md): on-hold CV upload for the Join Us form (client questions, proposed implementation).
- [`../docs/hosting-architecture.md`](../docs/hosting-architecture.md) — proposed AWS production hosting (the target this app is built for).
- [`../docs/local-setup.md`](../docs/local-setup.md) — detailed local installation guide.
- [`../docs/editor-guide.md`](../docs/editor-guide.md) — plain-language CMS guide for content editors.

Every new feature, page or section must update all related docs in the same change (checklist in `CLAUDE.md`).

## Production integrations

The production target is AWS me-central-1 (EC2, RDS PostgreSQL, S3, CloudFront). Each external service is switched on by environment variables and is off locally — see `src/integrations/` and the "Production integrations" block in `.env.example`:

| Service | Switch | Local default |
|---|---|---|
| S3 media storage | `S3_BUCKET` (+ region, prefix, optional keys) | files in `media/` |
| Media from CDN | `MEDIA_PUBLIC_URL` | served by the app |
| CloudFront refresh on publish | `CLOUDFRONT_DISTRIBUTION_ID` | off |
| Email (SMTP / Amazon SES) | `SMTP_HOST` (+ credentials) | printed to the console |

Health check for monitoring: `GET /next/health`.

## Run it locally

Full step-by-step guide (requirements, database options, troubleshooting): [`../docs/local-setup.md`](../docs/local-setup.md). Short version, with Node 20.18+ (22 recommended):

```bash
npm install
cp .env.example .env        # then fill in the secrets and seed passwords
npm run db                  # terminal 1: local PostgreSQL on port 5433 (data in .postgres/)
npm run seed                # first time only: loads the Home page content and creates users
npm run dev                 # terminal 2: http://localhost:3000  ·  CMS: http://localhost:3000/admin
```

`npm run db` runs a real PostgreSQL server from `node_modules` (no install or Docker needed).
For staging/production, point `DATABASE_URL` at a normal Postgres and run `npm run migrate`.

| Script | What it does |
|---|---|
| `npm run db` | Start the local database |
| `npm run seed` | Load prototype content into the CMS (safe to re-run; updates instead of duplicating) |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | Checks |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing any CMS config |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |
| `npm run migrate:create -- <name>` / `migrate` | Database migrations (see below) |

## How pages work

A **page** is a document in the `Pages` collection. Its `layout` is an ordered list of **sections (blocks)**.
Editors add, remove, reorder and hide sections and change their options; the site renders whatever the list says.

```
CMS page.layout ─► RenderBlocks ─► one React component per blockType
```

- One route renders every page: `src/app/(frontend)/[[...slug]]/page.tsx` (`/`, `/about`, `/legal/terms`, …).
- The page address comes from the page's URL name and parent page (nested pages via the nested-docs plugin); Home has the URL name `home`.
- Drafts + autosave + live preview: the admin preview opens `/next/preview`, which turns on Next.js draft mode.
- Publishing revalidates the page; changing header/footer, logos, case studies or team members, or publishing a page whose address, name, forwarding or published state changed (incl. unpublish and delete), revalidates the whole site. Draft saves revalidate nothing.
- Every block also receives the **page context** (`blocks/context.ts`): the page's title, path and breadcrumbs, and the section-menu items derived from the sections' `anchorId` + `navLabel`. The Banner breadcrumb and the Section menu use it, so editors never type them.
- Our Story, The Team and Join Us are child pages of About (`/about/our-story`, …).

## Code layout

```
src/
  app/(frontend)/        website: layout (header, footer), page route, form action, preview routes
  app/(payload)/         Payload admin + API (generated; leave as is)
  blocks/<Name>/         one folder per section type:
    config.ts            ← CMS fields (what editors see)
    Component.tsx        ← how it renders
    Component.module.css ← its styles
  blocks/index.ts        list of block configs offered to editors
  blocks/RenderBlocks.tsx blockType → component map (+ page context for every block)
  blocks/context.ts      page context type + section-menu item derivation
  collections/           Pages, CaseStudies, Partners, TeamMembers (+ teamOptions), Media, FormSubmissions, Users
  globals/SiteSettings   header & footer
  fields/                reusable field groups: link, linkArray, sectionHeader, sectionSettings, richText, media, slug, ctaFields
  components/layout/     Header (+ mobile menu), Footer, Logo, SkipLink
  components/ui/         primitives with no CMS knowledge: Button, CMSLink, Media, RichText, SectionHeader,
                         Section, Slider, Marquee, Parallax, WordReveal, CustomCursor, RevealObserver
  hooks/                 useRafScroll (one shared, frame-batched scroll loop), useReducedMotion
  lib/                   payload queries, link resolving, preview, revalidation, routes
  styles/                global tokens, reset and shared type only
  seed/                  prototype content → CMS
  migrations/            database migrations
```

### Block library (steps 1–9)

| Block (CMS name) | Variants / options | Used for | Planned reuse |
|---|---|---|---|
| `hero` (Banner) | `variant`: `showreel` · `page` (auto breadcrumb, orange last word, intro rich text, brand mark, `headlineSize` wrap/oneLine/fitted, `largerOnPhones` (11vw), `imageStyle` dim/bright) | Home showreel; About, Our Story, Team, Join, Services banners (`smallerOnPhones` for Services) | every inner page (`page`) |
| `sectionNav` (Section menu) | `source`: `sections` (from sections' `anchorId` + `navLabel`, scroll-spy, note) · `menu` (main-menu sub-links of the page's group + "Back to …") | About (sections); Our Story, Team, Join (menu); Services (sections, `barStyle: sticky`: numbered, sticks, progress line, gives way to the header) | — |
| `leadText` (Lead paragraph) | `textSize` lg/md, `highlightMode` tail/words/phrase, scroll reveal, `diagram`: `none` · `merge` · `weave` (lanes into one) · `cross` (one line across 2–4 lanes), details row (heading + text + labelled list), `heading`, `textSize` sm, `band`, `notes`, closing line + button | About overview; Our Story combination; Join "Why join"; Services approach | — |
| `mediaText` (Text with image) | `variant`: `fade` · `card` (list, report card with bars) | Home "Who we are"; About Mujtamae | — |
| `cardCarousel` (Cards) | `cardStyle`: `service` · `pillar` (card `tag`, note in header) | Home "What we do"; About pillars | — |
| `stackedPanels` (Stacking panels) | 1–4 panels | Home | — |
| `statements` (Side-by-side statements) | 1–3 items, brand mark | About vision & mission | — |
| `backgroundText` (Text over image) | parallax image, ticker | About why the UAE | — |
| `statsCarousel` (Key numbers) | autoplay | Home | — |
| `logoMarquee` (Logo strip) | optional label (→ slim strip, label in the corner) | Home; Our Work | — |
| `caseStudyGallery` (Case study showcase) | full-width tiles, optional per-tile photo | Home | — |
| `caseStudyGrid` (Case study grid) | sticky filter by service, numbered tiles (clip on hover), full case study view at `#case-<slug>` | Our Work | — |
| `ownership` (Group structure) | facts (count-up), closing, nested levels | About ownership | — |
| `teamDirectory` (Team directory) | intro + orange words, `members` (empty = all from `team-members`), `showOrgChart`, `showFilter`; client grid ↔ org chart, filter with counts, profile drawer (portal) | Team "Leadership" | — |
| `groupScale` (Group chain) | statement, 1–5 chain names (first highlighted), optional text link | Team "Group scale" | — |
| `openRoles` (Open roles) | header, `roles` (empty = all open from `roles`), team filter with counts, expandable rows, "Apply" prefills the application form (`APPLY_ROLE_EVENT`), empty text, line + button under | Join "Open roles" | — |
| `statement` (Statement) | `style` centered/band, orange tail `highlight`, scroll reveal / fade in | Home; Join "Who we look for" | — |
| `linkTiles` (Link tiles) | `tileStyle`: `standard` (grey band) · `tall` (About); 1–4 expanding tiles | About, Our Story, Team, Join "More about us"; Services categories (`numbered`) | — |
| `serviceDetail` (Service detail) | name, hook, intro, ≤2 buttons; `content` nested pieces: photo (scroll zoom), highlight, list of sub-services, collage; number + band from position | Services ×4 | — |
| `ctaBanner` (Call to action banner) | site-wide default (`site-settings.cta`) or page override | About, Our Story, Team | Join, Services, Our Work… |
| `form` (Form) | `formType`: `enquiry` · `contact` (detailed enquiry: company, work email, choices with an optional note, 1500-character message, consent; promises beside it) · `application` (role + discipline dropdowns, link, CV drop zone (UI only, file not sent yet), message) | Home; Contact; Join | — |
| `legalDocument` (Legal document) | header + facts, sticky document switcher (`StickyBar` tabs), numbered contents with scroll-spy, sections (rich text with lists, cookie table, contact card, preferences button: UI only) | Legal ×3 | — |
| `offices` (Office) | photo with live local time, email / phone with Copy, address with Directions, hours | Contact | — |

**Rule for new pages:** reuse a block → otherwise add a variant/option to an existing block → only then create a new block.

### Adding a block

1. Create `src/blocks/<Name>/config.ts` (build fields from `src/fields/*`, set `interfaceName`, end with `...sectionSettings()`).
2. Create `Component.tsx` + `Component.module.css` (use `ui/` primitives; wrap in `<Section>`).
3. Register it in `src/blocks/index.ts` and `src/blocks/RenderBlocks.tsx`.
4. `npm run generate:types`, then `npm run migrate:create -- add-<name>`.

## Styling

CSS Modules per component. Only tokens, reset, `.eyebrow` / `.h1` / `.grad` / `.body`, the `.arr` icon and `[data-reveal]` are global.
Add `data-reveal` (or `data-reveal="scale"`) to any element to fade it in on scroll; `--d` sets the delay.
Add `data-inview` to get the `.in` class with no styling, to start a block's own animation (diagram lines, report bars, nested frames).
Sections marked `tone="light"` switch the header logo to dark while it is over them.

## Database migrations

In development Payload syncs the schema automatically. Before deploying a schema change:

```bash
npm run migrate:create -- <short-name>   # commit the generated files in src/migrations
npm run migrate                          # on the target database
```

## Accounts

`npm run seed` creates an **admin** (everything, including users) and an **editor** (content only) from the
`SEED_*` values in `.env`. Change these passwords before sharing any environment.

## Not done yet

- Legal wording (placeholder outline until counsel supplies it).
- CV upload logic on the Join Us application form (the field is shown but the file is not sent): on hold, see `docs/backlog-cv-upload.md`.
- Open role descriptions (the six seeded roles from the prototype have none).
- Team bios and social profile links (seeded as placeholders: no bios, platform home pages); photos for two people.
- Case study key visuals (G42, Pizza Hut, Red Bull) and gallery photos are library placeholders; extra case study sections are on the backlog (`docs/backlog-case-study-extras.md`).
- Email notifications / CRM for form messages (the SMTP adapter is ready; it needs SES/SMTP details).
- Provisioning the AWS environment (adapters for S3, CloudFront and email are built and switched on by env vars).
- Thumbnails for the block picker.
- Social links in the footer are placeholders (instagram.com / linkedin.com).
