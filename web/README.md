# PLG Acachet website

Next.js 16 (App Router, TypeScript) with Payload CMS 3 in the same app, on PostgreSQL.
The static HTML prototype in the repository root is the visual reference; this app rebuilds it page by page.

**Status:** step 1 — foundation + Home page. Other pages exist as empty placeholders so links work.

More documentation:
- [`../CLAUDE.md`](../CLAUDE.md) — internal knowledge base: architecture, conventions, decisions log, known gotchas, planned blocks.
- [`../docs/technical-documentation.md`](../docs/technical-documentation.md) — client-shareable technical documentation.
- [`../docs/architecture.md`](../docs/architecture.md) — application and server architecture, with diagrams.

## Run it locally

Needs Node 20.18+ (22 recommended).

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
- Publishing revalidates the page; changing header/footer, logos or case studies revalidates the whole site.

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
  blocks/RenderBlocks.tsx blockType → component map
  collections/           Pages, CaseStudies, Partners, Media, FormSubmissions, Users
  globals/SiteSettings   header & footer
  fields/                reusable field groups: link, linkArray, sectionHeader, sectionSettings, richText, media, slug
  components/layout/     Header (+ mobile menu), Footer, Logo, SkipLink
  components/ui/         primitives with no CMS knowledge: Button, CMSLink, Media, RichText, SectionHeader,
                         Section, Slider, Marquee, CustomCursor, RevealObserver
  hooks/                 useRafScroll (one shared, frame-batched scroll loop), useReducedMotion
  lib/                   payload queries, link resolving, preview, revalidation, routes
  styles/                global tokens, reset and shared type only
  seed/                  prototype content → CMS
  migrations/            database migrations
```

### Block library (step 1)

| Block (CMS name) | Used on Home for | Built to be reused for |
|---|---|---|
| `hero` (Banner) | showreel banner | inner-page banners — add a `page` variant |
| `mediaText` (Text with image) | Who we are | About sections; image left/right |
| `cardCarousel` (Cards) | What we do | About "Three pillars" — add a `pillar` card style |
| `stackedPanels` (Stacking panels) | Global Bridge / Mujtamae | — |
| `statsCarousel` (Key numbers) | stats | — |
| `logoMarquee` (Logo strip) | partner logos | Our Work logos (has an optional label) |
| `caseStudyGallery` (Case study showcase) | case studies | — |
| `statement` (Statement) | brand statement | Join Us statement (`none` animation) |
| `form` (Form) | contact form | Contact page; Join Us — add an `application` form type |

**Rule for new pages:** reuse a block → otherwise add a variant/option to an existing block → only then create a new block.

### Adding a block

1. Create `src/blocks/<Name>/config.ts` (build fields from `src/fields/*`, set `interfaceName`, end with `...sectionSettings()`).
2. Create `Component.tsx` + `Component.module.css` (use `ui/` primitives; wrap in `<Section>`).
3. Register it in `src/blocks/index.ts` and `src/blocks/RenderBlocks.tsx`.
4. `npm run generate:types`, then `npm run migrate:create -- add-<name>`.

## Styling

CSS Modules per component. Only tokens, reset, `.eyebrow` / `.h1` / `.grad` / `.body`, the `.arr` icon and `[data-reveal]` are global.
Add `data-reveal` (or `data-reveal="scale"`) to any element to fade it in on scroll; `--d` sets the delay.
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

- Other pages (About, Our Story, Team, Join Us, Services, Our Work, Contact, Legal) and their blocks.
- Full case study content and the case study overlay (Our Work page).
- Email notifications / CRM for form messages; email adapter for password resets.
- Cloud storage for uploads (currently `media/` on disk) and the production database.
- Thumbnails for the block picker.
- Social links in the footer are placeholders (instagram.com / linkedin.com).
