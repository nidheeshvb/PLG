# PLG Acachet website — project knowledge base

Read this before adding a feature. It's meant to replace reading the whole codebase: it records how things are built, why, and the traps already hit.
**Keep it current:** every change that adds a block, collection, field pattern, decision or gotcha updates this file (and `docs/technical-documentation.md` / `docs/architecture.md` if the client would care) in the same change.

## Repo layout
- `/*.html`, `/assets/` — **static HTML prototype = visual source of truth.** Never edit. Each page has inline CSS (`<style>`) and inline JS. Serve it with the `plg-site` launch config (port 8000) to compare.
- `/New/` — older near-copy of the prototype. Ignore.
- `/web/` — the app (Next.js 16 App Router + Payload CMS 3 + PostgreSQL). All work happens here.
- `/docs/architecture.md` — application architecture (layers, content model, request/editing/form flows, release pipeline) and server architecture (AWS topology, CloudFront behaviours, environments, data, caching, security, monitoring, env vars, EC2 deployment, decisions). Client-shareable. Update it when a flow, collection, environment or hosting decision changes.
- `/docs/hosting-architecture.md` — local copy of the client-facing Google Doc "PLG Acachet: Proposed Hosting Architecture" (https://docs.google.com/document/d/14CcWwoTUNQkkwt1IuCfE7VIPfJSv9roqHMVf5_4o5S4/edit). **This is the production target; build everything to work on it.** If the Google Doc changes, update the copy + architecture.md Part B.
- `/docs/local-setup.md` — step-by-step local installation guide (clone, Node version, npm ci, .env, database options, seed, run, troubleshooting). Update it when setup steps, env vars or requirements change.
- `/docs/technical-documentation.md` — client-shareable technical doc (no secrets). Source of truth.
- `/docs/technical-documentation.html` — the same content as a page, published as a private artifact for sharing: https://claude.ai/artifact/KbSfFWQBra4jU5UoRLDUQM . When the .md changes, update the .html too and republish it **to that URL** (pass `url` from a new conversation) so the shared link stays the same.
- `.claude/launch.json` — `web` (dev server, :3000) and `plg-site` (prototype, :8000).

## Status
- **Done (step 1):** foundation + Home page, fully CMS-driven. Reviewed with user pending.
- **Next:** remaining pages in this order: About → Our Story → Team → Join Us → Services → Our Work → Contact → Legal. Do one page per step, user reviews between steps.
- Placeholder (empty) pages already exist in the DB for about, services, our-work, contact, legal (+ legal/terms, privacy-policy, cookies) so links resolve; they render `EmptyPage`.

## Stack & versions (and why)
| Thing | Version | Why |
|---|---|---|
| Node | 22.17 on this machine | — |
| Payload | **3.91.0 pinned** | 3.92+ requires Node ≥22.23.4; 3.91 is the newest that runs here. Upgrade Payload only after Node is upgraded. All `@payloadcms/*` must be the same version. |
| Next.js | 16.4.6 | Payload 3.91 peer range `>=16.3.3 <17`. |
| React | 19.2.9 | |
| DB | Postgres via `@payloadcms/db-postgres` | User's choice. |
| Local DB | `embedded-postgres` (devDep, `npm run db`, port **5433**, data in `web/.postgres`) | No Postgres/Docker on the machine; user chose this. Must be running for dev, build (generateStaticParams), seed, migrate. |
| Styling | CSS Modules | User's choice. No Tailwind. |
| Lint | ESLint 9 flat config importing `eslint-config-next/core-web-vitals` + `/typescript` directly | FlatCompat crashed with Next 16 config. React-hooks rules are strict (see gotchas). |

## Production target & integrations
Proposed production (decisions may change; keep everything swappable): **AWS me-central-1** — Route 53, ACM, CloudFront (caches whole site + media), **EC2** running `next start` (long-running Node, not serverless), **RDS PostgreSQL**, **S3** media, optional WAF, CloudWatch. Videos: plain MP4 on S3/CloudFront, no streaming service at launch (Bunny Stream/MediaConvert only if long videos with a player are needed later).

Every external service is an **env-gated integration** in `web/src/integrations/` — off locally, on in production, no code change:
| File | Switch | Does |
|---|---|---|
| `storage.ts` | `S3_BUCKET` (+ `S3_REGION` default me-central-1, `S3_PREFIX` default `media`, optional keys/endpoint) | `@payloadcms/storage-s3` for the `media` collection. `alwaysInsertFields: true` so the schema (media `prefix`, `_objectkey`) is identical with S3 on or off. `MEDIA_PUBLIC_URL` → file URLs point at the CDN (`disablePayloadAccessControl`) and next.config adds it to `images.remotePatterns` |
| `cdn.ts` | `CLOUDFRONT_DISTRIBUTION_ID` | `invalidateCdn(paths)`; called from `lib/revalidate.ts` `safeRevalidate` (page path, or `/*` for layout-wide changes) |
| `email.ts` | `SMTP_HOST` (+ port/user/pass/from) | `@payloadcms/email-nodemailer` (SES SMTP on AWS); unset → Payload logs emails to console |
Rules for new work: any new external service goes in `integrations/` behind an env var, is documented in `web/.env.example`, `docs/architecture.md` B9 and `docs/local-setup.md` §11, and must leave local dev working with the var unset. Don't assume serverless (EC2 is the target) or local disk persistence in production (media is on S3). Keep `/next/*`, `/admin`, `/api` uncacheable (CloudFront behaviours in architecture.md B3). Health check: `/next/health` (DB ping, `no-store`).
Images: `next/image` with `formats: ['image/avif','image/webp']`, 30-day `minimumCacheTTL`. Hero has optional `videoMobile` (`<source media="(max-width: 900px)">`) per the hosting plan.

## Commands (run inside `web/`)
`npm run db` (keep running) · `npm run dev` · `npm run seed` · `npm run lint` · `npm run typecheck` · `npm run build` · `npm run generate:types` (after any CMS config change) · `npm run generate:importmap` (after adding admin components referenced by path string) · `npm run migrate:create -- <name>` · `npm run migrate`.
Local logins: `web/.env` `SEED_ADMIN_*` / `SEED_EDITOR_*` (never paste values into chat or docs).

## Architecture in one picture
```
Pages collection doc ── layout: Block[] ──► src/app/(frontend)/[[...slug]]/page.tsx
                                              └─ getPageByPath(path) ─► <RenderBlocks> ─► blocks/<Name>/Component.tsx
SiteSettings global ──► (frontend)/layout.tsx ─► Header / Footer
```
- **Route groups:** `src/app/(payload)` = generated admin/API (don't edit except via generate:importmap). `src/app/(frontend)` = site, own root layout. `src/app/robots.ts` must sit at app root (in a route group it 404s). `sitemap.ts` works inside `(frontend)`.
- **One catch-all page route** for every page. Path lookup: `pages.path` field.
- **`path` field** (`collections/Pages/computePath.ts`, field-level beforeChange): `/` for slug `home` without parent, else last nested-docs breadcrumb URL. Nested pages via `@payloadcms/plugin-nested-docs` (`parent`, `breadcrumbs`).
- **SEO:** `@payloadcms/plugin-seo` with `tabbedUI` — it requires the Pages collection's **first field to be a `tabs` field** (it appends an "SEO" tab). `title` + `layout` live in the "Page sections" tab; `slug`, `path` are sidebar fields after the tabs.
- **Drafts/live preview:** Pages have drafts + autosave (600ms) + schedulePublish. Admin preview URL = `/next/preview?path=…&secret=PREVIEW_SECRET` (route in `(frontend)/next/preview`, can't live under `/api` because Payload owns `/api/*`), enables Next draftMode → `getPageByPath` fetches `draft: true`; `LivePreviewListener` (RefreshRouteOnSave) refreshes on save. Exit: `/next/exit-preview`.
- **Revalidation:** Pages afterChange → `revalidatePath(doc.path)` when published (and old path if moved). SiteSettings, Partners, CaseStudies afterChange → revalidate whole layout. `lib/revalidate.ts` `safeRevalidate` swallows errors because scripts (seed) run outside Next. Seed passes `context: { disableRevalidate: true }`.
- **Data access:** only `src/lib/payload.ts` (server-only): `getPageByPath`, `getAllPagePaths`, `getSiteSettings`, `getPartners`. Add new getters there. Components take props; data-driven blocks (e.g. LogoMarquee) may be async server components that call getters.
- **Types:** `src/payload-types.ts` generated. Every block config sets `interfaceName: '<Name>Block'` so components import `XBlock` types. Link fields have **no** interfaceName (shapes differ per options → would collide); use `LinkData` from `lib/links.ts`.

## The three reuse layers (don't skip a layer)
1. **UI primitives** `src/components/ui/` — no CMS knowledge:
   `Button` (pill + rotating arrow; `primary|ghost|dark`, `size sm`, `reveal`, `revealDelay`), `CMSLink` (resolves CMS link → Button or plain link via `as="text"`), `Media` (Payload media doc → next/image; SVG → plain img; focal point → object-position; `fill` mode), `RichText` (Lexical renderer, internal links → page path), `MultilineText` (textarea newlines → `<br>`), `SectionHeader` (eyebrow + `.h1` title, gradient toggle, reveal delays, `bare` = no wrapper div), `Section` (id + `tone="light"` → `data-nav-tone`), `Slider` (≤1100px snap slider, drag+momentum, arrows; `tone`, `dots` default off), `Marquee` (renders set twice), `CustomCursor` (global; shows over `[data-cursor]`), `RevealObserver` (global; adds `.in` to `[data-reveal]`/`[data-panel]`, also watches DOM mutations).
2. **Field groups** `src/fields/`: `link()` / `linkArray()` (label, appearance, type page|section|url, page, section, url, newTab; conditional fields), `sectionHeader()` (eyebrow, title textarea, gradientTitle), `sectionSettings({ theme, defaultTheme })` (collapsible: anchorId, navLabel, theme, hideSection — **end every block with it**), `richText()` (small Lexical editor: paragraph/bold/italic/link), `mediaField({ accept })`, `slugField(from)`. Row labels: `@/fields/LinkRowLabel#LinkRowLabel` / `#ItemRowLabel`.
3. **Blocks** `src/blocks/<Name>/{config.ts, Component.tsx, Component.module.css, …}`; registered in `blocks/index.ts` (configs, picker order) and `blocks/RenderBlocks.tsx` (component map, typed so a missing entry is a TS error). `RenderBlocks` skips `hideSection`.

**Rule for every new page:** reuse a block → else add a variant/option to an existing block → only then a new block. Variants are a `select` (`variant`, `cardStyle`, `formType`) and a `switch` in the component (see `Hero/Component.tsx` → `variants/`).

## Block catalogue
| blockType | CMS label | Options | Home use | Planned reuse |
|---|---|---|---|---|
| `hero` | Banner (top of page) | `variant`: showreel (title words, lede, ≤2 links, video+poster, scroll cue) | showreel | add `page` variant: auto breadcrumb, title lines w/ highlighted word (`<em>`), subtitle, ≤2 buttons, image or video bg, brand mark toggle — all inner pages |
| `mediaText` | Text with image | header, body (richText), button toggle, image, imagePosition L/R, fadeImageEdge | Who we are | About Mujtamae (needs optional "where it fits" list + overlay card), Ownership copy |
| `stackedPanels` | Stacking panels | 1–4 panels (header, text, image, button) | Global Bridge/Mujtamae | — |
| `cardCarousel` | Cards | header, `cardStyle`: service; cards (title, text, image, link); note; theme light/dark | What we do | add `pillar` style for About three pillars |
| `statsCarousel` | Key numbers | stats (value, suffix, label, image), autoplaySeconds | stats | — |
| `logoMarquee` | Logo strip | optional label, partners (empty = all) | partners | Our Work ("Brands we've worked with") |
| `caseStudyGallery` | Case study showcase | header, items (caseStudy, fullWidth), button | case studies | — |
| `statement` | Statement | text, animation scrollReveal/none, brand marks | brand statement | Join statement (`none`, maybe light variant) |
| `form` | Form | `formType`: enquiry; header, lede, bg image, submit label, success msg | contact | Contact page (enquiry), Join (`application`: role select, discipline, link, CV upload) |

### Planned blocks for remaining pages (from prototype analysis — confirm with user per page)
`sectionNav` (variants: auto from block `navLabel`s / manual links + back link + note / sticky numbered with scroll-spy — About, Story, Team, Join subnavs + Services/Our Work sticky bar), `leadText` (eyebrow + large paragraph with scroll word highlight — about overview, story combination, join why, services approach), `linkTiles` (2–4 image tiles, optional number — "More about us" ×4 pages, services categories), `ctaBanner` (site-wide default CTA in SiteSettings + override — 6 pages), `twoColumnStatements` (vision/mission), `backgroundText` (bg image + text + ticker — why UAE), `diagram` (variants merge/weave/crossLanes — about overview, story, join; items editable, visuals fixed), `ownership` (facts + nested structure), `serviceDetail` (number auto from order; media: image/FUZE callout/collage; sub-items with tag), `teamDirectory` (+ `teamMembers` collection; grid/org view, filter, drawer), `groupScale`, `tagList` (join markets), `openRoles` (+ `roles` collection), `caseStudyGrid` (filters + full-screen overlay at `#case-<slug>`; extend CaseStudies with brief/approach/impact/stats/gallery/services), `offices`, `legalDocument` (richText sections; tabs = sibling legal pages). Prototype data arrays to import: `DOCS` (legal.html), `cases` (our-work.html), `people` (team.html), `roles` (join.html).

## Frontend conventions
- **CSS:** globals only in `src/styles/` (tokens, reset, `.eyebrow .h1 .grad .body`, `.arr` icon, `[data-reveal]`, `fadeIn` keyframes). Everything else in the component's module. Port prototype rules as-is, renaming selectors; state classes (`.in`, `.on`, `.is-hidden`) become module classes toggled in JS or `:global(.in)` when set by RevealObserver.
- Breakpoints from prototype: 1280, 1100 (sliders kick in), 900 (mobile). `--gutter` 72/48/24.
- Reveal: `data-reveal=""` (or `"scale"`/`"fade"`), delay via `style={{'--d': '.16s'}}`. Buttons: `reveal revealDelay={0.24}`.
- Header tone: sections with white background must pass `tone="light"` to `<Section>` (or set `data-nav-tone="light"`); footer already does.
- Scroll effects: use `useRafScroll(read, write)` — one shared rAF loop, all reads before writes. Never add raw scroll listeners for visual effects.
- Client components only for behaviour; keep markup rendering in server components where possible (e.g. `StackedPanels/Component.tsx` server + `StackedPanelsScroll.tsx` client wrapper).
- Section wrapper ids come from `anchorId` (editor-set). Seed sets the prototype's ids (`about`, `services`, `stack`, `stats`, `work`, `statement`, `contact`).
- Fixed routes the code knows: `lib/routes.ts` (`caseStudyHref(slug)` → `/our-work#case-<slug>`).
- Forms: server action `src/app/(frontend)/actions.ts` (`submitEnquiry`) validates + saves to `form-submissions` with `overrideAccess`; honeypot field `company_website`. Client form uses `useActionState`; no setState-in-effect.

## CMS conventions (editor experience = non-technical users)
- Friendly labels/descriptions on every field; selects/radios/checkboxes instead of free values; sensible defaults; `initCollapsed` arrays with row labels.
- Every block ends with `...sectionSettings()`; offer `theme` only if the section is designed in both colours.
- Numbering (01/04…), breadcrumbs, section-nav links must be **derived** from order/page tree, never typed by editors.
- Seed sets `blockName` per section so the admin list isn't "Untitled".
- Collections: `pages` (drafts), `case-studies`, `partners` (sortOrder, height, mobileHeight), `media` (alt, focal point, images + mp4/webm, staticDir `media/`), `form-submissions` (create only via server; editors read), `users` (role admin|editor; Users hidden from editors). Global: `site-settings` (headerLinks, mobileMenuNote, footerLinks, legalLinks, social, copyright).
- Access helpers: `src/access/index.ts`.
- Admin groups: Content, Inbox, Settings.

## Seed (`src/seed/index.ts`, `npm run seed`)
- Idempotent: media matched by filename, docs by slug/name; updates publish (`draft: false`).
- Reads files from repo-root `assets/`. `paragraphs()` in `seed/lexical.ts` builds rich text.
- **Must use top-level `await`** — `payload run` exits as soon as the module finishes loading.
- Add each new page's content + media here when building that page.

## Migrations
Dev uses Payload's automatic schema push. Before handing over/deploying a schema change: `npm run migrate:create -- <name>` and commit `src/migrations/*`. Migrations so far: `20261113_150619_initial`, `20261113_154236_media_storage_and_mobile_video`.

## Gotchas already hit (don't repeat)
- `serverURL` in payload config makes media URLs absolute → next/image "unconfigured host" error. It's removed; keep URLs relative.
- `payload run` + non-awaited promise = script silently does nothing.
- React-hooks lint: no ref writes during render (update refs in an effect), no setState inside effects (derive state / "adjust state on prop change" pattern / useActionState wrapper), no reassigning variables inside render callbacks.
- Header className is React-managed but scroll classes are toggled imperatively → after `open` changes, call `requestScrollUpdate()` to re-apply them.
- Block CSS (`width: 100%`, padding) beat Slider CSS by load order → Slider forces `display/width/margin-inline` with `!important`; blocks tune slider spacing only through `--slider-*` variables. Don't set padding on a slider track except in a `min-width: 1101px` query.
- Prototype CSS quirks we intentionally match: mobile swipe dots never show (later rule overrides) → `Slider dots` default false; footer mobile gap is `12px 20px` (later rule overrides 24px); button label "roll" animation is disabled by later rules (arrow just rotates 45°).
- `robots.ts` inside a route group → 404.
- Browser-pane screenshots of background tabs are throttled/mid-transition; front the tab and wait before judging visuals.
- No Python on this machine; use node/sed for scripted edits. Use the session scratchpad for temp files, not `/tmp`.

## Verifying a page
1. `npm run lint && npm run typecheck && npm run build` (DB running).
2. Compare with prototype at 1440, 1000 and 375 widths: run in both tabs
   `[...document.querySelectorAll('main > *')].map(e => Math.round(e.getBoundingClientRect().top+scrollY)+'/'+e.offsetHeight)` — section tops/heights should match exactly; then screenshot key sections.
3. Exercise interactions; check console + server logs.
4. In `/admin` as editor: edit, reorder, hide, live preview, publish.

## Decisions log
| Date | Decision | Reason |
|---|---|---|
| 2026-11-12 | App in `web/`, prototype untouched | Keep reference for visual comparison |
| 2026-11-12 | CSS Modules, direct port of prototype CSS | User choice; fidelity |
| 2026-11-13 | Payload in same Next app, built page by page starting with Home | Avoid throwaway local content layer; user reviews CMS early |
| 2026-11-13 | Pages = ordered blocks with variants | Non-technical editors must reorder/add/configure sections; maximum component reuse |
| 2026-11-13 | PostgreSQL; embedded-postgres for local dev | User choice; no local Postgres/Docker |
| 2026-11-13 | Payload 3.91.0 pinned | Node 22.17 on machine |
| 2026-11-13 | Case studies open on Our Work as `#case-<slug>` overlay | Matches prototype URLs |
| 2026-11-13 | Brand/design assets (logo mark, brand marks, fade, icons) in `public/brand`, not CMS | Design, not content; can move to CMS if client wants |
| 2026-11-13 | Two docs: this file (internal) + `docs/technical-documentation.md` (client-shareable) | User request |
| 2026-11-13 | Production target = AWS me-central-1 (EC2 + RDS + S3 + CloudFront) per `docs/hosting-architecture.md`; may change | Client-facing hosting proposal; user asked to build for it |
| 2026-11-13 | External services are env-gated integrations (S3, CloudFront invalidation, SMTP); off locally | Production tools must be connectable at deploy time without code changes |
| 2026-11-13 | Images via next/image (AVIF/WebP) cached at CloudFront, not Payload imageSizes | Same outcome as the hosting doc's "several sizes in modern formats", no frontend srcset rework |
| 2026-11-13 | Work stays on the `dev` branch; no push/merge to `main` unless asked | User instruction |
