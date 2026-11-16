# PLG Acachet website — project knowledge base

Read this before adding a feature. It's meant to replace reading the whole codebase: it records how things are built, why, and the traps already hit.
## Documentation rule (user requirement — mandatory)
**Every new feature, page, section/block, field, option, collection, integration, setting or decision updates ALL related documents in the same change.** A feature is not done until its docs are. Before finishing any task, go through this checklist and update each document the change touches:

| Document | Audience | Update when… |
|---|---|---|
| `CLAUDE.md` (this file) | Developers / Claude | Anything: blocks, fields, conventions, decisions, gotchas, status, commands |
| `docs/editor-guide.md` | **Client's content editors (non-technical)** | Any new or changed page, section, field, option, button style, collection, global, role, or editing behaviour. Use the exact CMS labels; add a row to "I want to…" and to "what affects what" where relevant; keep it plain-language |
| `docs/technical-documentation.md` **and** `.html` (republish to https://claude.ai/artifact/KbSfFWQBra4jU5UoRLDUQM) | Client (technical overview) | Sections list, content model, features, security, hosting, roadmap/status, items needed from client |
| `docs/architecture.md` | Client + developers | Flows, collections/content model, stack/packages, integrations, environments, env vars, deployment, decisions |
| `docs/hosting-architecture.md` | Client | Only when the client's hosting Google Doc changes (keep it a faithful copy) |
| `docs/local-setup.md` | Developers | Requirements, install steps, env vars, commands, seed behaviour, troubleshooting |
| `web/README.md` | Developers | Scripts, block catalogue, integrations, structure, "not done yet" |
| `web/.env.example` | Developers | Any new env var (with a comment) |

Also update "Last updated" dates on the docs you touch. In the wrap-up, list which docs were updated.

## Repo layout
- `/*.html`, `/assets/` — **static HTML prototype = visual source of truth.** Never edit. Each page has inline CSS (`<style>`) and inline JS. Serve it with the `plg-site` launch config (port 8000) to compare.
- `/New/` — older near-copy of the prototype. Ignore.
- `/web/` — the app (Next.js 16 App Router + Payload CMS 3 + PostgreSQL). All work happens here.
- `/docs/architecture.md` — application architecture (layers, content model, request/editing/form flows, release pipeline) and server architecture (AWS topology, CloudFront behaviours, environments, data, caching, security, monitoring, env vars, EC2 deployment, decisions). Client-shareable. Update it when a flow, collection, environment or hosting decision changes.
- `/docs/hosting-architecture.md` — local copy of the client-facing Google Doc "PLG Acachet: Proposed Hosting Architecture" (https://docs.google.com/document/d/14CcWwoTUNQkkwt1IuCfE7VIPfJSv9roqHMVf5_4o5S4/edit). **This is the production target; build everything to work on it.** If the Google Doc changes, update the copy + architecture.md Part B.
- `/docs/editor-guide.md` — plain-language CMS guide for the client's content editors ("I want to…" table, sections field by field, buttons, images, publishing, effects of changes). To be shared with the client at the end of phase 1.
- `/docs/backlog-cv-upload.md` — **on-hold feature**: CV upload on the Join Us form (needs client answers + private S3 access). Questions for the client, proposed implementation, acceptance criteria. Revisit before adding any file upload.
- `/docs/local-setup.md` — step-by-step local installation guide (clone, Node version, npm ci, .env, database options, seed, run, troubleshooting). Update it when setup steps, env vars or requirements change.
- `/docs/technical-documentation.md` — client-shareable technical doc (no secrets). Source of truth.
- `/docs/technical-documentation.html` — the same content as a page, published as a private artifact for sharing: https://claude.ai/artifact/KbSfFWQBra4jU5UoRLDUQM . When the .md changes, update the .html too and republish it **to that URL** (pass `url` from a new conversation) so the shared link stays the same.
- `.claude/launch.json` — `web` (dev server, :3000) and `plg-site` (prototype, :8000).

## Status
- **Done (step 1):** foundation + Home page, fully CMS-driven. Review with user pending.
- **Done (step 2):** About page (`/about`): section tops/heights match the prototype exactly at 1440/1000/375. Review with user pending.
- **Done (step 3):** Our Story (`/about/our-story`): exact match at 1440/1000/375; About and Home re-verified unchanged. Review with user pending.
- **Done (step 4):** The Team (`/about/team`): exact match at 1440/1000/375 in both grid and org-chart views; filter, org chart and drawer behaviour match (headless Chrome). Review with user pending. Admin editing of the new blocks/collection not yet clicked through as editor.
- **Done (step 5):** Join Us (`/about/join`): exact match at 1440/1000/375 (all sections). The CV field is **UI only**: the drop zone is shown and shows the picked file, but the file is not sent (upload on the backlog, `docs/backlog-cv-upload.md`). Filter, accordion, "Apply for this role" → form prefill, validation and sending checked (headless Chrome). Home/About/Story/Team re-verified unchanged. Roles have no descriptions yet (PLG to supply). Review with user pending.
- **Next:** Services → Our Work → Contact → Legal. Do one page per step, user reviews between steps.
- Placeholder (empty) pages exist so links resolve (render `EmptyPage`): services, our-work, contact, legal (+ legal/terms, privacy-policy, cookies).

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
- **Revalidation:** Pages afterChange → `revalidatePath(doc.path)` when published (and old path if moved). SiteSettings, Partners, CaseStudies, TeamMembers, Roles afterChange → revalidate whole layout. `lib/revalidate.ts` `safeRevalidate` swallows errors because scripts (seed) run outside Next. Seed passes `context: { disableRevalidate: true }`.
- **Data access:** only `src/lib/payload.ts` (server-only): `getPageByPath`, `getAllPagePaths`, `getSiteSettings`, `getPartners`, `getTeamMembers`, `getOpenRoles` (roles with `isOpen`). Add new getters there. Components take props; data-driven blocks (e.g. LogoMarquee) may be async server components that call getters.
- **Types:** `src/payload-types.ts` generated. Every block config sets `interfaceName: '<Name>Block'` so components import `XBlock` types. Link fields have **no** interfaceName (shapes differ per options → would collide); use `LinkData` from `lib/links.ts`.

## The three reuse layers (don't skip a layer)
1. **UI primitives** `src/components/ui/` — no CMS knowledge:
   `Button` (pill + rotating arrow; `primary|ghost|dark`, `size sm`, `reveal`, `revealDelay`), `CMSLink` (resolves CMS link → Button or plain link via `as="text"`), `Media` (Payload media doc → next/image; SVG → plain img; focal point → object-position; `fill` mode), `RichText` (Lexical renderer, internal links → page path), `MultilineText` (textarea newlines → `<br>`), `SectionHeader` (eyebrow + `.h1` title, gradient toggle, reveal delays, `bare` = no wrapper div), `Section` (id + `tone="light"` → `data-nav-tone`), `Parallax` (`mode="top"` banner y×factor / `mode="section"` drifts ±range/2 as its parent section crosses the screen), `WordReveal` (words light up with scroll; `highlightFrom` + `start`/`span` tuning), `Slider` (≤1100px snap slider, drag+momentum, arrows; `tone`, `dots` default off, `barClassName`), `Marquee` (renders set twice), `CustomCursor` (global; shows over `[data-cursor]`), `RevealObserver` (global; adds `.in` to `[data-reveal]`/`[data-panel]`/`[data-inview]`, also watches DOM mutations; `data-inview` has no styles: use it to start a block's own `.in` animation).
2. **Field groups** `src/fields/`: `link()` / `linkArray()` (label, appearance, type page|section|url, page, section, url, newTab; conditional fields), `sectionHeader()` (eyebrow, title textarea, gradientTitle), `sectionSettings({ theme, defaultTheme })` (collapsible: anchorId, navLabel, theme, hideSection — **end every block with it**), `richText()` (small Lexical editor: paragraph/bold/italic/link), `mediaField({ accept })`, `slugField(from)`, `ctaFields({ required })` (call-to-action content: used by `site-settings.cta` and `ctaBanner.custom`). Row labels: `@/fields/LinkRowLabel#LinkRowLabel` / `#ItemRowLabel`.
3. **Blocks** `src/blocks/<Name>/{config.ts, Component.tsx, Component.module.css, …}`; registered in `blocks/index.ts` (configs, picker order) and `blocks/RenderBlocks.tsx` (component map, typed so a missing entry is a TS error). `RenderBlocks` skips `hideSection` and passes every block the **page context** (`blocks/context.ts` `BlockContext`: `page` {title, path, breadcrumbs} + `navItems` derived from visible blocks with `anchorId` && `navLabel`). Components type props as `XBlock & BlockContext` when they need it.

**Rule for every new page:** reuse a block → else add a variant/option to an existing block → only then a new block. Variants are a `select` (`variant`, `cardStyle`, `formType`) and a `switch` in the component (see `Hero/Component.tsx` → `variants/`).

## Block catalogue
| blockType | CMS label | Options | Home use | Planned reuse |
|---|---|---|---|---|
| `hero` | Banner (top of page) | `variant`: `page` (default for new: breadcrumb from `page.breadcrumbs`, title lines split on \n, `highlightLastWord` → `<em>`, `largerOnPhones` (Team/Join: mobile min(54,11vw)), `headlineSize` wrap (standard: 86/76, .1em, mobile min(54,10.5vw)) / oneLine (Story: nowrap, .18em, max-content column ≥1241) / fitted (About: nowrap, .16em, min(86,5.4vw) ≥1241, mobile 8.6vw), `imageStyle` dim (standard: opacity .42, 50% 40%, saturate .85, standard fade) / bright (About: .55, 60% 50%, .9, About fade), `intro` richText (bold = white), ≤2 links (46px), poster or video, `showBrandMark`, parallax) / `showreel` (title words, `lede`, video+poster, scroll cue). Conditional fields per variant | showreel | About (fitted+bright), Our Story (oneLine+dim), Team + Join (wrap+dim+largerOnPhones) |
| `sectionNav` | Section menu | `source`: `sections` (links from `navItems`, scroll-spy IO rootMargin -45%/-50%, `note`) / `menu` (async server component: `getSiteSettings().headerLinks` item whose `subLinks` contain `page.path` → its sub-links, current page highlighted, "Back to <group page title>" link, hidden ≤900); drag + edge-fade mask ≤900; client admin help (`SectionNav/AdminHelp`, reads sibling `source` via `useFormFields` + `path` prop) | — | About (sections), Our Story + Team + Join (menu); sticky numbered (Services) later |
| `leadText` | Lead paragraph | eyebrow, text, `textSize` lg (About 38px) / md (Story 36px, padding 130/120, max 30em), animation scrollReveal/none, `highlightMode` none/tail (exact tail match, `.hl` always orange)/words (comma list, punctuation-insensitive, `.nm` orange once lit)/phrase (first exact match, `.nm`) — indexes computed server-side and passed to `WordReveal` `highlighted`; `diagram`: none / merge (`mergeItems` ×3) / weave (`WeaveDiagram.tsx` client: `weaveItems` 2–4 {name, tag, text, image}, start/end labels, `weaveResult`, `weaveNote`; paths laid out from real marker positions via ResizeObserver, drawn by `useRafScroll` progress; mobile = vertical rail via --rt/--rh/--p) / cross (`CrossDiagram.tsx` client: `crossItems` 2–4 {label, name, text}; wave path generated for n lanes (n=4 reproduces the prototype path exactly), redrawn in px via ResizeObserver, dash drawn by `useRafScroll`, dots light as the head passes; ≤900 2×2 board with per-lane `.lit` marker; section gets `.withCross` → grid row-gap 16 at ≤1100); `showDetails` (`detailsHeading`, `detailsText`, `detailsList` {name, tag, highlight}: 3-col row, Join "Where the work goes"); `showClosing` + `closingText` + `closingLink` | — | About overview, Our Story combination, Join why (md + phrase + cross + details) |
| `mediaText` | Text with image | `variant`: `fade` (Home) / `card` (`CardLayout.tsx`: grey band, rounded zooming image, `listHeading`+`listItems`, `report` {title, badge, bars[label,value%], caption}); header, body, button toggle, image, imagePosition, fadeImageEdge (fade only) | Who we are (fade) | About Mujtamae (card) |
| `stackedPanels` | Stacking panels | 1–4 panels (header, text, image, button) | Global Bridge/Mujtamae | — |
| `cardCarousel` | Cards | header, `cardStyle`: service / `pillar` (`PillarCard.tsx`; card `tag`; `note` sits in the header); cards (title, tag, text, image, link); theme light/dark | What we do | About pillars |
| `statements` | Side-by-side statements | header, items (label, text) 1–3, showBrandMark | — | About vision & mission |
| `backgroundText` | Text over image | header, text, image (Parallax section mode), `ticker` (Marquee, 30s fixed, no hover pause) | — | About why the UAE |
| `ownership` | Group structure | header, body, facts (value/label; `FactValue` counts up "1852" from −60, "50+" from 0; "A · B" text with sep hidden ≤900), closing richText, levels 1–4 nested (`Ledger`, innermost hot, pointer/focus moves highlight) | — | About ownership |
| `linkTiles` | Link tiles | header, `tileStyle` standard (bg-2, 440px, ink arrow, mobile 240) / tall (About: black, 520px, white arrow, mobile 260), tiles 1–4 (title, text, image, link) expanding flex panels | — | About (tall), Our Story + Team + Join (standard); Services categories (540/480 heights, numbers) |
| `teamDirectory` | Team directory | eyebrow, `intro` + `highlight` (exact phrase → `<em>`), `members` (empty = `getTeamMembers()`), `showOrgChart`, `showFilter`. Async server component (lead) + `TeamDirectoryClient` (tools/grid/org/drawer). Filter options = All + `TEAM_GROUPS` with `filter: true` that have people; tags same. Org: `department: top` = lead, other departments = columns (`--cols` drives grid + connector line), `headOfDepartment` first (else first in column). Filter animation toggles `styles.out`/`in`/`hidden` imperatively on cards (like prototype); views restart `viewIn` via display none→block; drawer portalled to body, body overflow locked while open, focus trap + Esc. Local tokens `--muted #8a8d88`, `--soft`, `--line-2` on `.team`/`.drawer` | — | Team "Leadership" |
| `groupScale` | Group chain | eyebrow, text, `chain` 1–5 names (first orange border), `showLink` + `link` → text link with arrow (`.textlink`) | — | Team "Group scale" |
| `openRoles` | Open roles | header (gradient default on), `roles` (empty = `getOpenRoles()`), `showFilter`, `applyLabel`, `applySection` (form's anchorId, default `apply`), `emptyText`, `footerText` + `footerLink`. Async server component + `OpenRolesClient` (chips = All + `ROLE_TEAMS` with roles, counts; filter fade like prototype via imperative `styles.out`/`hidden`; accordion with `grid-template-rows` and `inert`; open state is `data-open`, NOT a className, so React re-renders don't wipe RevealObserver's `.in`). Apply button dispatches `APPLY_ROLE_EVENT` (`blocks/Form/applyEvent.ts`) → application form selects role + discipline. Chips drag via `useDragScroll` | — | Join "Open roles" |
| `ctaBanner` | Call to action banner | `useDefault` (→ `getSiteSettings().cta`, async server component) or `custom` (ctaFields); anchorId `contact` by convention; text column max-width calc(760px + gutter) (all pages; About's narrower 760 gave identical layout) | — | every inner page except Contact and Join Us (prototype has none) |
| `statsCarousel` | Key numbers | stats (value, suffix, label, image), autoplaySeconds | stats | — |
| `logoMarquee` | Logo strip | optional label, partners (empty = all) | partners | Our Work ("Brands we've worked with") |
| `caseStudyGallery` | Case study showcase | header, items (caseStudy, fullWidth), button | case studies | — |
| `statement` | Statement | text, `style` centered (Home: brand marks, centred 46px) / band (Join: bg-2 band with borders, left 52px, `data-reveal`), `highlight` (exact tail → `<em>`/`.hl` orange), animation scrollReveal/none ("Fade in"), showBrandMarks (centered only) | brand statement | Join "Who we look for" (band, none) |
| `form` | Form | `formType`: enquiry (header, lede, bg image, submit, success) / application (async: `getOpenRoles()` → `ApplicationForm.tsx`: name, email, role + discipline as styled `Select.tsx` listbox (role=combobox, keyboard, hidden input), link, message, honeypot; `note` beside the dark submit; done panel "Thanks, {first}." + restart via key remount; `Application.module.css`). Server action `submitApplication`. CV drop zone is **UI only** (`.file` port; the `<input type=file>` has no `name`, so FormData never includes it; shows picked name/size, drag highlight); wiring it up = backlog doc. Async → cast in RenderBlocks | contact | Contact page (enquiry), Join (application) |

### Planned blocks for remaining pages (from prototype analysis — confirm with user per page)
Extend first: `sectionNav` (sticky numbered with scroll-spy for Services/Our Work), `linkTiles` (optional number + heights for services categories). New: `serviceDetail` (number auto from order; media: image/FUZE callout/collage; sub-items with tag), `caseStudyGrid` (filters + full-screen overlay at `#case-<slug>`; extend CaseStudies with brief/approach/impact/stats/gallery/services), `offices`, `legalDocument` (richText sections; tabs = sibling legal pages). Prototype data arrays to import: `DOCS` (legal.html), `cases` (our-work.html). (`people` from team.html and `roles` from join.html are imported.)

## Frontend conventions
- **CSS:** globals only in `src/styles/` (tokens, reset, `.eyebrow .h1 .grad .body`, `.arr` icon, `[data-reveal]`, `fadeIn` keyframes). Everything else in the component's module. Port prototype rules as-is, renaming selectors; state classes (`.in`, `.on`, `.is-hidden`) become module classes toggled in JS or `:global(.in)` when set by RevealObserver.
- Breakpoints from prototype: 1280, 1100 (sliders kick in), 900 (mobile). `--gutter` 72/48/24.
- Reveal: `data-reveal=""` (or `"scale"`/`"fade"`), delay via `style={{'--d': '.16s'}}`. Buttons: `reveal revealDelay={0.24}`.
- Header tone: sections with white background must pass `tone="light"` to `<Section>` (or set `data-nav-tone="light"`); footer already does.
- Sideways drag rows (section menu, filter chips): `hooks/useDragScroll(ref, draggingClass, fadePx)` → mouse drag, click swallowing, `--fl/--fr` edge-fade vars; returns a `dragging` ref.
- Never let React own the className of an element that RevealObserver/imperative code also toggles classes on (it rewrites the whole attribute on re-render): put changing state in a `data-*` attribute instead (see `openRoles` `data-open`).
- Scroll effects: use `useRafScroll(read, write)` — one shared rAF loop, all reads before writes. Never add raw scroll listeners for visual effects.
- Client components only for behaviour; keep markup rendering in server components where possible (e.g. `StackedPanels/Component.tsx` server + `StackedPanelsScroll.tsx` client wrapper).
- Section wrapper ids come from `anchorId` (editor-set). Seed sets the prototype's ids (`about`, `services`, `stack`, `stats`, `work`, `statement`, `contact`).
- Fixed routes the code knows: `lib/routes.ts` (`caseStudyHref(slug)` → `/our-work#case-<slug>`).
- Forms: server actions in `src/app/(frontend)/actions.ts` (`submitEnquiry`, `submitApplication`) validate + save to `form-submissions` with `overrideAccess`; honeypot field `company_website`. `submitApplication` checks discipline against `DISCIPLINES`, link must be http(s), and stores the role **title** only if the posted id is a role with `isOpen` (else "General application"). Client forms use `useActionState`; no setState-in-effect. File uploads: see `docs/backlog-cv-upload.md` before adding any (private S3, not the media bucket).

## CMS conventions (editor experience = non-technical users)
- Friendly labels/descriptions on every field; selects/radios/checkboxes instead of free values; sensible defaults; `initCollapsed` arrays with row labels.
- Every block ends with `...sectionSettings()`; offer `theme` only if the section is designed in both colours.
- Numbering (01/04…), breadcrumbs, section-nav links must be **derived** from order/page tree, never typed by editors.
- Seed sets `blockName` per section so the admin list isn't "Untitled".
- Admin-only explanatory text inside a block: a `type: 'ui'` field with `admin.components.Field` pointing at a small component (see `SectionNav/AdminHelp.tsx`); run `generate:importmap`.
- Collections: `pages` (drafts), `case-studies`, `partners` (sortOrder, height, mobileHeight), `media` (alt, focal point, images + mp4/webm, staticDir `media/`), `team-members` (name, jobTitle, photo, group management|creative|staff, department top|commercial|delivery|operations, headOfDepartment, accountOwner, bio, linkedin/instagram/x, sortOrder; options in `collections/teamOptions.ts` — import-free so the client bundle can use it, never import the collection config into client code), `roles` ("Open roles": title, team commercial|delivery|creative|analytics, location, employmentType, summary, points[], isOpen, sortOrder; options in `collections/roleOptions.ts`, import-free for client code, incl. `DISCIPLINES` = team labels + "Something else"), `form-submissions` (create only via server; editors read; `form` enquiry|application; application fields `role`, `discipline`, `profileLink` shown only for applications), `users` (role admin|editor; Users hidden from editors). Global: `site-settings` (tabs Header: headerLinks[+subLinks, shown indented in the mobile menu], mobileMenuNote · Call to action: `cta` group · Footer: footerLinks, legalLinks, social, copyright).
- Header highlights the current menu link (`isCurrent`: path equals the link path or starts with it + `/`; `aria-current="page"` only on exact match). Mobile menu row delays come from `--md` per row (the sub-links block takes a slot), not nth-child.
- Access helpers: `src/access/index.ts`.
- Admin groups: Content, Inbox, Settings.

## Seed (`src/seed/index.ts`, `npm run seed`)
- Idempotent: media matched by filename, docs by slug/name; updates publish (`draft: false`).
- Reads files from repo-root `assets/`. `paragraphs()` in `seed/lexical.ts` builds rich text.
- **Must use top-level `await`** — `payload run` exits as soon as the module finishes loading.
- Add each new page's content + media here when building that page. Media in subfolders (`team/x.webp`) is matched by basename. Team members: photos focal 50/20 (the prototype's object-position; Media's inline focal style overrides CSS object-position), social URLs are platform-home placeholders, no bios (prototype hides its lorem bios). `upsertMedia` fills a missing alt on existing media (never overwrites one). `richParagraph('plain ', { bold: 'bold' })` builds rich text with bold runs. Open roles: the prototype's 6 (title/team/location, Full-time), no descriptions (prototype has lorem).

## Migrations
Dev uses Payload's automatic schema push. Before handing over/deploying a schema change: `npm run migrate:create -- <name>` and commit `src/migrations/*`. Migrations so far: `20261113_150619_initial`, `20261113_154236_media_storage_and_mobile_video`, `20261113_194317_about_page_blocks`, `20261114_021140_our_story_options`, `20261114_080037_team_page`, `20261116_150707_join_page`.

## Gotchas already hit (don't repeat)
- `serverURL` in payload config makes media URLs absolute → next/image "unconfigured host" error. It's removed; keep URLs relative.
- `payload run` + non-awaited promise = script silently does nothing.
- React-hooks lint: no ref writes during render (update refs in an effect), no setState inside effects (derive state / "adjust state on prop change" pattern / useActionState wrapper), no reassigning variables inside render callbacks.
- Header className is React-managed but scroll classes are toggled imperatively → after `open` changes, call `requestScrollUpdate()` to re-apply them.
- Block CSS (`width: 100%`, padding) beat Slider CSS by load order → Slider forces `display/width/margin-inline` with `!important`; blocks tune slider spacing only through `--slider-*` variables. Don't set padding on a slider track except in a `min-width: 1101px` query.
- Prototype CSS quirks we intentionally match: mobile swipe dots never show (later rule overrides) → `Slider dots` default false; footer mobile gap is `12px 20px` (later rule overrides 24px); button label "roll" animation is disabled by later rules (arrow just rotates 45°).
- `robots.ts` inside a route group → 404.
- Browser-pane screenshots of background tabs are throttled/mid-transition; front the tab and wait before judging visuals.
- No Python on this machine; use node/sed for scripted edits. Use the session scratchpad for temp files, not `/tmp`. Scripts with JS template literals or many quotes: write them to a scratchpad file and run it (inline `node -e` / heredocs in the Bash tool mangle backticks and `${}`).
- **Bash tool heredocs/inline node strip backslashes** (`\n`, `\s`) and mangle backticks: for scripted edits write the script with the Write tool into the scratchpad and run `node <file>`, or use Edit.
- A dev server stopped by Claude Code's memory reaper may leave the Next child process running on :3000 (new `npm run dev` then exits "port in use"). Find it with `Get-NetTCPConnection -LocalPort 3000` and kill its parent `next dev`.
- **Dev schema push can hang silently**: when a field is renamed after the dev server already pushed it, drizzle asks "created or renamed?" on the dev server's stdin and every request hangs. The launch-config dev server's console isn't visible, so run `npm run dev` yourself with output to a log, or drop the stale column/enum in the local DB, then restart. Pick final field names before the first dev request.
- Prototype `.h1` has `text-wrap:balance` on every page except index.html; it's global in `typography.css` (Home heights verified unchanged).
- Prototype quirks matched on About: the ownership frames' text has no desktop styles (browser-default h3/p; meta renders "Parent groupEst. 1852" with no gap); the pillar card hover lift uses the reveal transition (1.1s + delay).
- Browser pane hidden → its screenshots are stale and timers/transitions throttle (filter test read opacity 0). Use headless puppeteer for interaction checks then.
- CSS module class names are per file: don't reuse one name for two meanings in a module (`.open` for both a state and an element broke the dropdown).
- Prototype quirk matched on Join: `.lane2:last-child` never matches (the SVG and dots follow the lanes), so the last lane has no right dashed border and the mobile `last-child` reset does nothing.
- Inline node scripts: a JS template literal turns `\s` into `s` (regex breaks silently). Put regexes in normal strings or edit with the Edit tool.
- Visual compare without a browser tool: puppeteer-core from the npx cache + local Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`); in Git Bash set `MSYS_NO_PATHCONV=1` when passing `/` paths as env vars. The `_npx/8300d30af912e003` copy is broken (missing proxy-agent); `_npx/c0b21ac6fcf0b232/node_modules/puppeteer-core` works.

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
| 2026-11-13 | Editor guide for non-technical client editors; every change updates all related docs (checklist above) | User instruction |
| 2026-11-14 | Our Story / The Team / Join Us are children of About (`/about/our-story` …) | Prototype breadcrumb "Home / About Us / Our Story"; breadcrumbs derive from the page tree |
| 2026-11-14 | Section menu links derived from sections' Section ID + "Name in section menu" | Editors never type the menu twice; reorder sections = reorder menu |
| 2026-11-14 | One site-wide call-to-action banner (Header & footer → Call to action) with per-page override | Same banner on ~6 pages |
| 2026-11-14 | Mobile menu sub-links under About on every page (incl. Home) | All inner prototype pages have them; the Home prototype predates them |
| 2026-11-14 | The look shared by all inner prototype pages is each block's default; About's differences are options (hero `bright`/`fitted`, tiles `tall`) | About is the odd one out in the prototype |
| 2026-11-14 | Team members are a collection (`team-members`), not page fields; org chart + filter derived from group/department | Edited once; reorder/regroup without touching the page |
| 2026-11-14 | Team social links seeded as platform-home placeholders, bios empty | Prototype has `#` links and hidden lorem bios; real ones from PLG |
| 2026-11-14 | Our Story/Team/Join section menu copies the main menu's About sub-links (`source: menu`) | One place to edit; matches prototype (Overview · Our Story · The Team · Join Us + Back to About Us) |
| 2026-11-16 | CV upload on the Join Us form deferred to a backlog doc (`docs/backlog-cv-upload.md`) | Needs client confirmation (retention, access, consent, ATS) and private S3 access; personal data must not go in the public media bucket |
| 2026-11-16 | Keep the CV field visible on the form (UI only, file not sent) | User request: the design stays complete while the upload logic waits |
| 2026-11-16 | Open roles are a collection (`roles`) with a "Show on the website" switch; the application form's role list and the roles block both read it | One place to post/close a job; closed jobs can be reopened |
| 2026-11-16 | Join "Why join" markets list is a `leadText` details row, not a separate `tagList` block | It sits inside the same prototype section (shared padding); keeps section tops identical |
| 2026-11-16 | "Apply for this role" → form prefill via a window CustomEvent (`APPLY_ROLE_EVENT`) | Blocks stay independent; works with any application form on the page |
