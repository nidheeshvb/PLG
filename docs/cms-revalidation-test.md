# CMS → website test: content, options and revalidation

Last updated: 2026-11-20 (fix log #5: REVAL-1, CMS-1, CMS-2, CMS-3, CMS-5 fixed; CMS-4 covered by an editor-guide tip)

This report checks that every change made in the CMS (Payload admin or REST API) reaches the website correctly and how quickly. It covers:

- every page and section;
- shared content (Header & footer, case studies, partner logos, team members, open roles, images);
- page-level actions: drafts, publishing, renaming, URL changes, unpublishing, deleting, forwarding, versions, live preview, scheduled publishing.

Fix the issues one at a time; when one is fixed, set its **Status** to Fixed, re-run the matching test and add a row to the fix log.

## How it was tested

- **Build**: production. `npm run build` + `npm run start` on http://localhost:3000, with the local embedded Postgres.
  - All 12 site pages are pre-rendered and served from the cache (`x-nextjs-cache: HIT`, `Cache-Control: s-maxage=31536000`), so a change can only appear through revalidation.
  - Dev mode would hide caching problems, so it wasn't used.
- **Admin UI (Claude in Chrome)**, signed in as the seed admin (and once as the seed editor). Done on every page, plus Header & footer, an open role and an image. Covered:
  - editing headlines and titles;
  - switches and radio options;
  - moving list rows and whole sections up;
  - removing a row;
  - hiding a section;
  - autosaved drafts;
  - live preview;
  - Publish;
  - Versions → Restore;
  - Schedule Publish.
- **REST API** (`/api/...`, signed in as admin or editor), for exhaustive coverage:
  - every text field of every page (section A);
  - every option of every page (section B);
  - every text field of the shared content (section C);
  - the revalidation scenarios (section D).
- **Timing**: after each save, the live page was requested every 0.4s until the change showed, or up to 20–60s. "First request" means the very first request after saving already showed the change. The website rebuilds the page on demand; it never served an old copy first.
- **Clean-up**: every change was reverted right after its check. The local database, media folder and `.next` folder were backed up before testing and restored afterwards (see "Restore" at the end).

## Summary

| Area | Result |
|---|---|
| Page content: every text, rich-text and SEO field on all 11 pages (683 fields) | ✅ All reach the page on the **first request after publishing** (0.12–0.19 s). The legal "Text after the tag" note is now only offered when the section has a tag (CMS-1, fixed 2026-11-20) |
| Page options: every select, radio and checkbox on all 11 pages (452 changes) | ✅ Every option that applies to the section changes the page at once. Invalid link combinations are refused by the CMS. "Open in a new tab" now works everywhere it is offered (CMS-2, fixed 2026-11-20) |
| Admin UI editing on every page: edit, options, reorder, remove, hide, publish | ✅ Live on the first request (0.4–0.6 s). A Publish click during autosave is silently ignored (CMS-4: tip added to the editor guide, 2026-11-20) |
| Drafts and autosave | ✅ Never reach the live site. Live preview follows typing within about 3 s |
| Versions → Restore | ✅ Live within about 1.5 s; content identical to the restored version |
| Header & footer (27 fields) | ✅ Whole site updates on the first request (about 1 s for 8 pages) |
| Case studies, partner logos, team members, open roles: edit, create, reorder, show/hide | ✅ First request (0.2–0.5 s) |
| Deleting a partner logo, team member, open role or case study | ✅ Fixed 2026-11-18: gone on the first request (REVAL-2) |
| Images & videos: alt text, focal point | ✅ Fixed 2026-11-20: the new alt text is on the page on the first request after saving (REVAL-1) |
| Changing a page's URL name (slug) | ✅ Fixed 2026-11-18: the page moves and links on every page follow at once (REVAL-3) |
| Unpublishing a page | ✅ Fixed 2026-11-18: 404 and out of the sitemap at once (REVAL-4) |
| Renaming a page | ✅ Fixed 2026-11-18: other pages showing its name (Legal switcher) update at once (REVAL-5) |
| New page, delete page, forward-to, sitemap | ✅ First request |
| Scheduled publish | ❌ Never published (REVAL-6) |
| Access: editors vs admins, preview secret, form messages | ✅ As designed: editors can't see or create users; nobody can create form messages through the API; a wrong preview secret is refused (403). Question: editors can delete pages (CMS-6) |
| Page weight | ✅ Fixed 2026-11-20: linked pages only bring their name and address (Home 231 → 111 KB, About 125 → 75 KB, Terms 94 → 44 KB of HTML) (CMS-3) |

## Issues to fix

| ID | Status | Severity | Summary |
|---|---|---|---|
| [REVAL-1](#reval-1) | ✅ Fixed | High | Image changes (alt text, focal point, replaced file) don't refresh the pages that use the image |
| [REVAL-2](#reval-2) | ✅ Fixed | High | Deleting a partner logo, team member, open role or case study doesn't refresh the website |
| [REVAL-3](#reval-3) | ✅ Fixed | High | After a page's URL name changes, menus and buttons on other pages still link to the old URL (404) |
| [REVAL-4](#reval-4) | ✅ Fixed | High | Unpublishing a page leaves it live |
| [REVAL-5](#reval-5) | ✅ Fixed | Medium | Renaming a page doesn't update other pages that show its title (Legal document switcher) |
| [REVAL-6](#reval-6) | ✅ Closed 2026-11-19 (scheduling switched off) | Medium | Scheduled publishing never happens: the queued job is never run (no jobs runner configured) |
| [CMS-1](#cms-1) | ✅ Fixed | Low | Legal "Text after the tag" can be filled in without a tag, but is then never shown |
| [CMS-2](#cms-2) | ✅ Fixed | Medium | "Open in a new tab" is ignored on cards, link tiles (page links), the case study button, the Contact careers note and section menu links |
| [CMS-3](#cms-3) | ✅ Fixed | Medium | Pages are fetched with depth 2, so every page embeds the full content of every page it links to (Home: 231 KB HTML, 40 KB visible) |
| [CMS-4](#cms-4) | ✅ Editor-guide tip | Low | "Publish changes" is disabled for a moment after typing (autosave); a click then does nothing, without a message |
| [CMS-5](#cms-5) | ✅ Fixed | Low | Breadcrumbs (URL, label) appear as editable fields on every page, but are overwritten on save |
| [CMS-6](#cms-6) | ✅ Closed 2026-11-19 (everyone is an admin) | — | Editors can delete pages (and other content). Intended? |

**Suggested order:**
1. REVAL-1 to REVAL-5: small hook changes, with a big effect for editors.
2. CMS-2 and CMS-3.
3. The low-severity admin tweaks (CMS-1, CMS-4, CMS-5).
4. REVAL-6 and CMS-6 need a decision first.

<a id="reval-1"></a>
### REVAL-1: image changes don't reach the pages

- **Status**: ✅ Fixed 2026-11-20 (fix log #5). Media has `afterChange: revalidateSiteAfterUpdate` (edits only: a new upload isn't on any page yet) and `afterDelete: revalidateSiteAfterDelete`, so the whole site (and CloudFront, when connected) is refreshed. Re-tested on a production build with a warm cache (`HIT`): `bridge.webp` alt text changed → new text on `/about` on the first request after 1.2 s; alt text put back
- **Steps**:
  1. Load `/about` (it's now cached).
  2. In **Images & videos**, open `bridge.webp` (shown on About), change **Description (alt text)** and Save.
  3. Reload `/about`.
- **Expected**: the new alt text, within a second.
- **Actual**: the old alt text stays for as long as I polled (30 s through the admin, 20 s through the API), and would stay until something else refreshes About.
  - The **focal point** behaves the same way.
  - Re-publishing the page shows the change at once (0.2 s).
  - Replacing the file is expected to behave the same way. It wasn't tried, to keep the media folder untouched.
- **Cause**: `web/src/collections/Media.ts` has no `afterChange` / `afterDelete` hook, so no page is revalidated when an image changes.
- **Suggested fix**: add `hooks: { afterChange: [revalidateSiteAfterChange], afterDelete: [...] }` to Media (`lib/revalidate.ts`). It refreshes the whole site; images are shared, so that's the simple, safe choice.

<a id="reval-2"></a>
### REVAL-2: deleting shared items doesn't refresh the website

- **Status**: ✅ Fixed 2026-11-18 (fix log #3). Re-tested on a production build with warm caches: see "Re-test after fix #3" below.
- **Steps**: create a partner logo, team member, open role or case study (it appears at once), then delete it.
- **Expected**: it disappears from Home / The Team / Join Us / Our Work.
- **Actual**: it stays (checked 20 s for each of the four). It only goes away when some other change happens to refresh the whole site.
  - A deleted case study's tile also still links to its overlay, with all its data.
- **Cause**: `Partners.ts:18`, `TeamMembers.ts:23`, `Roles.ts:21` and `CaseStudies.ts:27` only have `afterChange: [revalidateSiteAfterChange]`. There's no `afterDelete`.
- **Suggested fix**: add `revalidateSiteAfterDelete` (same body as `revalidateSiteAfterChange`) to `lib/revalidate.ts`, and register it as `afterDelete` on those four collections (and on Media, REVAL-1).

<a id="reval-3"></a>
### REVAL-3: links on other pages keep a page's old URL

- **Status**: ✅ Fixed 2026-11-18 (fix log #2). Re-tested on a production build with warm caches: see "Re-test after fix #2" below.
- **Steps**:
  1. Change Services' **URL name** to `qz-services` and publish.
  2. Look at `/about`.
- **Expected**: header menu and buttons link to `/qz-services`.
- **Actual**:
  - `/qz-services` works at once.
  - `/services` gives 404 (correct).
  - The sitemap updates.
  - But `/about` still has 3 links to `/services` (header menu, footer and buttons) after 20 s, and every other page does too, so visitors hit a 404.
- **Cause**: `collections/Pages/revalidate.ts:10-13` revalidates only the page's new path and its old path. Menus (Header & footer) and link fields on other pages resolve the page's path when *they* render, and those pages stay cached.
- **Suggested fix**: when the path changes (`previousDoc.path !== doc.path`), call `revalidateEverything()` instead of the two single paths. Path changes are rare, so a site-wide refresh is cheap.

<a id="reval-4"></a>
### REVAL-4: unpublishing a page leaves it live

- **Status**: ✅ Fixed 2026-11-18 (fix log #2). Re-tested on a production build with warm caches: see "Re-test after fix #2" below.
- **Steps**: set Our Story to draft (unpublish) through the API, the equivalent of **Unpublish** in the admin.
- **Expected**: `/about/our-story` returns 404 (and disappears from menus and sitemap).
- **Actual**: it's still served (200) after 20 s. Publishing again works.
- **Cause**: `collections/Pages/revalidate.ts:10` only revalidates when `doc._status === 'published'`. Line 11 only covers a moved path.
- **Suggested fix**: also revalidate `previousDoc.path` when `previousDoc._status === 'published' && doc._status !== 'published'`. Make that site-wide, because menus, tiles and the sitemap may link to the page.

<a id="reval-5"></a>
### REVAL-5: renaming a page doesn't update other pages that show its title

- **Status**: ✅ Fixed 2026-11-18 (fix log #2). Re-tested on a production build with warm caches: see "Re-test after fix #2" below.
- **Steps**:
  1. Load `/legal/privacy-policy` (cached).
  2. Rename **Terms & Conditions** (the page name) and publish.
- **Expected**: the document switcher on Privacy Policy and Cookies shows the new name.
- **Actual**: unchanged after 20 s.
  - Renaming a *parent* page works (0.1 s): the page tree re-saves its children (Our Story, The Team…), which refreshes their breadcrumbs and "Back to…" link.
  - Header menu labels are typed in Header & footer, so they aren't affected.
- **Cause**: the same as REVAL-3. Only the renamed page itself is revalidated.
- **Suggested fix**: when `title` changes on a published page, call `revalidateEverything()`. Or, more narrowly, revalidate the pages that reference it. That's harder to keep correct, so the site-wide refresh is recommended.

<a id="reval-6"></a>
### REVAL-6: scheduled publishing

- **Status**: ✅ Closed 2026-11-19 (fix log #4). **Decision: scheduling is not used**, so `schedulePublish` was removed from Pages instead of adding a jobs runner. "Publish changes" has no Schedule Publish option any more
- **Steps**:
  1. Our Story: change the headline (autosaved draft).
  2. **Publish changes ▾ → Schedule Publish → Publish**, 17 Nov 2026 11:45 PM, then Save.
  3. The event appears under "Upcoming Events".
- **Expected**: the live page shows the new headline shortly after 11:45 PM.
- **Actual**: **never published**. At 11:48:48 PM (almost 4 minutes after the scheduled time) the live page still showed the old headline, the CMS still had it as an unpublished draft, and the server log had no job activity. 998 requests over 7 minutes, all served the old page.
- **Cause**: `Pages` has `drafts: { schedulePublish: true }` (`collections/Pages/index.ts`). Payload stores the schedule as a job in `payload-jobs`, but the config (`payload.config.ts`) has no `jobs` setting (no `autoRun` and no cron), so nothing runs the queued job.
- **Suggested fix**: decide whether scheduling is needed for launch. If it is, add `jobs: { autoRun: [{ cron: '* * * * *', queue: 'default' }] }` (EC2 runs a long-lived `next start`, so autoRun works). The published page is then revalidated by the existing hook. Re-test with a 2-minute schedule.

<a id="cms-1"></a>
### CMS-1: legal "Text after the tag" is shown only with a tag

- **Status**: ✅ Fixed 2026-11-20 (fix log #5). "Text after the tag" only appears in the admin once **Orange tag** is filled in. Re-tested in the admin on a temporary page: hidden for a section without a tag, shown with one, appears as soon as a tag is typed; the tag and its text publish
- **What happens**: every legal section has **Text after the tag** (prefilled "Counsel to confirm scope."). It's only shown when **Tag** (`mustLabel`) is filled in, as in the prototype. 30 of the 33 sections have no tag, so editing that text there changes nothing.
- **Where**: `web/src/blocks/LegalDocument/config.ts:112` (field) and `Component.tsx:118` (rendered only with a tag).
- **Suggested fix**: in the admin, show the field only when a tag is set: `admin: { condition: (_, s) => Boolean(s?.mustLabel) }`.

<a id="cms-2"></a>
### CMS-2: "Open in a new tab" is ignored in six places

- **Status**: ✅ Fixed 2026-11-20 (fix log #5). One helper (`newTabProps` in `lib/links.ts`) adds `target="_blank" rel="noopener noreferrer"` in all six places. In the admin the option only shows for web-address links, as before. Re-tested 20 Nov in all six places (link set to a web address with the box ticked, published, page checked in Chrome, content put back): 6/6 open in a new tab
- **What happens**: ticking **Open in a new tab** on these links changes nothing on the page; the generic button/link (`CMSLink`) handles it correctly.
- **Where**:
  - `blocks/CardCarousel/ServiceCard.tsx:14,39` and `PillarCard.tsx:14,35`: cards.
  - `blocks/LinkTiles/Component.tsx:63-70`: only for web addresses and `#` links, not page links.
  - `blocks/CaseStudyGrid/Component.tsx:12`: the button in the case study view.
  - `blocks/Form/Component.tsx:73`: the Contact form's careers note link.
  - `blocks/SectionNav/Component.tsx:17`: section menu links copied from the main menu.
- **Suggested fix**: pass `link.newTab` through and add `target="_blank" rel="noopener noreferrer"` like `CMSLink`. Or hide the option on links where a new tab makes no sense (in-page sections).

<a id="cms-3"></a>
### CMS-3: every page embeds the pages it links to

- **Status**: ✅ Fixed 2026-11-20 (fix log #5). Pages have `defaultPopulate: { title, slug, path, breadcrumbs }`, so a linked page only brings what links need. Re-measured HTML: Home 231 → 111 KB, About 125 → 75 KB, Terms 94 → 44 KB. Links on About still resolve; every page measures exactly as before at 1440, 1000 and 375
- **What happens**: `getPageByPath` (`web/src/lib/payload.ts:24`) uses `depth: 2`. Every page link in a section (buttons, tiles, cards, Legal switcher) therefore comes back as the **whole linked page, including all its sections**, and is sent to the browser in the page's data.
  - **Home**: 231 KB HTML, of which 40 KB is the visible page; 17 page layouts embedded.
  - **About / Services**: 125 / 122 KB, 7 embedded.
  - **Legal Terms**: 94 KB vs 14 KB visible.
  - **Staleness**: the embedded copies also go stale. Not visible, but confusing when debugging: for example, The Team still contained Join Us's old headline in its data.
- **Suggested fix**: limit what a page link returns. For example, `defaultPopulate: { title: true, slug: true, path: true, breadcrumbs: true }` on the Pages collection, or `populate` on the query. Then re-measure page weight and re-run the UI comparison.

<a id="cms-4"></a>
### CMS-4: Publish clicked during autosave does nothing

- **Status**: ✅ Covered 2026-11-20 by a tip in the editor guide (Publishing): wait for "Last saved", then publish, and check the status says Published. No code change
- **What happens**: for about 1–3 s after typing, **Publish changes** is greyed out while the draft autosaves (`autosave.interval: 600`). A click in that moment is ignored without a message, so an editor may believe they published.
  - It happened to me twice: Home and Our Work.
  - The status line keeps saying "Changed", which is the clue.
- **Suggested fix**: an editor-guide tip ("wait until the status says *Last saved*, then publish; check that the status changes to *Published*"). Optionally, a longer autosave interval.

<a id="cms-5"></a>
### CMS-5: breadcrumbs appear as editable fields

- **Status**: ✅ Fixed 2026-11-20 (fix log #5). Pages declare the page tree plugin's breadcrumbs field themselves (`createBreadcrumbsField('pages', { admin: { hidden: true } })`), so the plugin uses it and it is hidden in the admin; same field, same data, no migration. Re-tested: no Breadcrumbs in the page form; breadcrumbs on the site unchanged
- **What happens**: at the bottom of every page's form, **Breadcrumbs** (URL, Label) are shown as normal editable fields. The page tree plugin recalculates them on every save, so edits are silently lost.
- **Suggested fix**: hide them or make them read-only in the admin (override the plugin's `breadcrumbs` field with `admin: { readOnly: true }` or `hidden: true`).

<a id="cms-6"></a>
### CMS-6 (question): editors can delete pages

- **Status**: ✅ Closed 2026-11-19 (fix log #4). **Decision: no separate editor role**: everyone PLG adds gets full (admin) access, deleting included. New users default to Admin and the role choice is hidden
- **What happens**: the seed editor can delete a page through the API (`Pages` `access.delete: isLoggedIn`, `collections/Pages/index.ts:30`). It's the same for the other content collections. The test deleted the Contact page in the local test database this way; it was restored from the backup.
- **Question**: should deleting pages (and perhaps case studies, roles…) be admin-only? Editors could still hide sections or unpublish (once REVAL-4 is fixed).

## Not issues (checked)

- **Draft and autosave**: never reach the live site. Checked through the API after 3 s and in the admin while typing.
- **Live preview**: shows the draft and follows typing within about 3 s.
- **Page validation**: the CMS refuses saving a link whose type is switched without choosing its page or web address (22 attempts across the pages).
- **Access**:
  - editors don't see Users (menu hidden, `/admin/collections/users` says Not Found);
  - editors can't create users (403);
  - editors only read their own account;
  - visitors and editors can't create form messages through the API (403);
  - visitors only get published pages from the API;
  - a wrong preview secret is refused (403).
- **Caching**: pages are cached for a year (`s-maxage=31536000`). Locally the cache is cleared by revalidation; in production the CloudFront integration (`integrations/cdn.ts`) does the same at the CDN, so the issues above also apply there.
- **Speed**: no delays. Every successful change showed on the first request after saving (0.1–1.1 s, including rendering). Nothing needed a second request or a wait.

## Full results

### A. Every text field on every page (API, one publish per page)

Every non-empty text, textarea and rich-text value of every section, plus the page name and SEO title/description, was replaced with a unique marker in **one** publish. The script then:

- timed the first request that showed any marker;
- checked each marker on the live page;
- restored the page and compared it with the original.

Result legend:

- **visible**: the new text shows on the page.
- **data-only**: the text is sent with the page but only drawn after an interaction, or belongs to an option that isn't active on this page.
- **missing**: not on the page at all.

| Page | Fields changed | First live request after publish | Visible | Data-only | Missing | Restored identical |
|---|---|---|---|---|---|---|
| [Home](#m-home) | 65 | ✅ 188 ms, 1 request (MISS) | 58 | 7 | 0 | ✅ |
| [About](#m-about) | 117 | ✅ 125 ms, 1 request (MISS) | 113 | 4 | 0 | ✅ |
| [Our Story](#m-about-our-story) | 35 | ✅ 175 ms, 1 request (MISS) | 34 | 1 | 0 | ✅ |
| [The Team](#m-about-team) | 29 | ✅ 179 ms, 1 request (MISS) | 28 | 1 | 0 | ✅ |
| [Join Us](#m-about-join) | 69 | ✅ 152 ms, 1 request (MISS) | 57 | 12 | 0 | ✅ |
| [Services](#m-services) | 94 | ✅ 123 ms, 1 request (MISS) | 91 | 3 | 0 | ✅ |
| [Our Work](#m-our-work) | 18 | ✅ 119 ms, 1 request (MISS) | 15 | 3 | 0 | ✅ |
| [Contact](#m-contact) | 49 | ✅ 131 ms, 1 request (MISS) | 44 | 5 | 0 | ✅ |
| [Legal: Terms](#m-legal-terms) | 63 | ✅ 151 ms, 1 request (MISS) | 52 | 0 | 11 | ✅ |
| [Legal: Privacy Policy](#m-legal-privacy-policy) | 79 | ✅ 142 ms, 1 request (MISS) | 67 | 0 | 12 | ✅ |
| [Legal: Cookies](#m-legal-cookies) | 65 | ✅ 126 ms, 1 request (MISS) | 58 | 0 | 7 | ✅ |

<a id="m-home"></a>
<details><summary><b>Home</b> (/): 65 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ➖ data-only | Expected: Home has no breadcrumb; its tab title comes from SEO. |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].lede` | textarea | ✅ visible |  |
| 4 | `layout[hero].links[].label` | text | ✅ visible |  |
| 5 | `layout[hero].links[].section` | text | ✅ visible |  |
| 6 | `layout[hero].links[].label` | text | ✅ visible |  |
| 7 | `layout[mediaText].eyebrow` | text | ✅ visible |  |
| 8 | `layout[mediaText].title` | textarea | ✅ visible |  |
| 9 | `layout[mediaText].body` | richText | ✅ visible |  |
| 10 | `layout[mediaText].body` | richText | ✅ visible |  |
| 11 | `layout[mediaText].anchorId` | text | ✅ visible |  |
| 12 | `layout[mediaText].link.label` | text | ✅ visible |  |
| 13 | `layout[mediaText].report.badge` | text | ➖ data-only | Expected: the report card belongs to the "card" look; Home uses "fade". |
| 14 | `layout[cardCarousel].eyebrow` | text | ✅ visible |  |
| 15 | `layout[cardCarousel].title` | textarea | ✅ visible |  |
| 16 | `layout[cardCarousel].anchorId` | text | ✅ visible |  |
| 17 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 18 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 19 | `layout[cardCarousel].cards[].link.section` | text | ✅ visible |  |
| 20 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 21 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 22 | `layout[cardCarousel].cards[].link.section` | text | ✅ visible |  |
| 23 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 24 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 25 | `layout[cardCarousel].cards[].link.section` | text | ✅ visible |  |
| 26 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 27 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 28 | `layout[cardCarousel].cards[].link.section` | text | ✅ visible |  |
| 29 | `layout[stackedPanels].anchorId` | text | ✅ visible |  |
| 30 | `layout[stackedPanels].panels[].eyebrow` | text | ✅ visible |  |
| 31 | `layout[stackedPanels].panels[].title` | textarea | ✅ visible |  |
| 32 | `layout[stackedPanels].panels[].text` | textarea | ✅ visible |  |
| 33 | `layout[stackedPanels].panels[].link.label` | text | ✅ visible |  |
| 34 | `layout[stackedPanels].panels[].link.section` | text | ✅ visible |  |
| 35 | `layout[stackedPanels].panels[].eyebrow` | text | ✅ visible |  |
| 36 | `layout[stackedPanels].panels[].title` | textarea | ✅ visible |  |
| 37 | `layout[stackedPanels].panels[].text` | textarea | ✅ visible |  |
| 38 | `layout[stackedPanels].panels[].link.label` | text | ✅ visible |  |
| 39 | `layout[stackedPanels].panels[].link.section` | text | ✅ visible |  |
| 40 | `layout[statsCarousel].anchorId` | text | ✅ visible |  |
| 41 | `layout[statsCarousel].stats[].label` | text | ✅ visible |  |
| 42 | `layout[statsCarousel].stats[].suffix` | text | ✅ visible |  |
| 43 | `layout[statsCarousel].stats[].label` | text | ✅ visible |  |
| 44 | `layout[statsCarousel].stats[].suffix` | text | ✅ visible |  |
| 45 | `layout[statsCarousel].stats[].label` | text | ✅ visible |  |
| 46 | `layout[statsCarousel].stats[].label` | text | ✅ visible |  |
| 47 | `layout[caseStudyGallery].eyebrow` | text | ✅ visible |  |
| 48 | `layout[caseStudyGallery].title` | textarea | ✅ visible |  |
| 49 | `layout[caseStudyGallery].anchorId` | text | ✅ visible |  |
| 50 | `layout[caseStudyGallery].link.label` | text | ✅ visible |  |
| 51 | `layout[statement].text` | textarea | ✅ visible |  |
| 52 | `layout[statement].anchorId` | text | ✅ visible |  |
| 53 | `layout[form].eyebrow` | text | ✅ visible |  |
| 54 | `layout[form].title` | textarea | ✅ visible |  |
| 55 | `layout[form].lede` | textarea | ✅ visible |  |
| 56 | `layout[form].submitLabel` | text | ✅ visible |  |
| 57 | `layout[form].successMessage` | text | ✅ visible |  |
| 58 | `layout[form].interestsLabel` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 59 | `layout[form].interestsHint` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 60 | `layout[form].messageLabel` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 61 | `layout[form].consentText` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 62 | `layout[form].successTitle` | text | ➖ data-only | Expected: shown after the form is sent (client side). |
| 63 | `layout[form].anchorId` | text | ✅ visible |  |
| 64 | `meta.title` | text | ✅ visible |  |
| 65 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzhome64x` and the meta description `qzhome65x`, so both SEO fields reached the page.

</details>

<a id="m-about"></a>
<details><summary><b>About</b> (/about): 117 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[hero].links[].label` | text | ✅ visible |  |
| 6 | `layout[hero].links[].label` | text | ✅ visible |  |
| 7 | `layout[hero].links[].section` | text | ✅ visible |  |
| 8 | `layout[sectionNav].note` | text | ✅ visible |  |
| 9 | `layout[leadText].eyebrow` | text | ✅ visible |  |
| 10 | `layout[leadText].text` | textarea | ✅ visible |  |
| 11 | `layout[leadText].highlight` | text | ➖ data-only | Expected: this is the phrase to highlight, not text that is shown. |
| 12 | `layout[leadText].weaveStartLabel` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 13 | `layout[leadText].weaveEndLabel` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 14 | `layout[leadText].weaveResult` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 15 | `layout[leadText].anchorId` | text | ✅ visible |  |
| 16 | `layout[leadText].navLabel` | text | ✅ visible |  |
| 17 | `layout[leadText].mergeItems[].label` | text | ✅ visible |  |
| 18 | `layout[leadText].mergeItems[].name` | text | ✅ visible |  |
| 19 | `layout[leadText].mergeItems[].text` | textarea | ✅ visible |  |
| 20 | `layout[leadText].mergeItems[].label` | text | ✅ visible |  |
| 21 | `layout[leadText].mergeItems[].name` | text | ✅ visible |  |
| 22 | `layout[leadText].mergeItems[].text` | textarea | ✅ visible |  |
| 23 | `layout[leadText].mergeItems[].label` | text | ✅ visible |  |
| 24 | `layout[leadText].mergeItems[].name` | text | ✅ visible |  |
| 25 | `layout[leadText].mergeItems[].text` | textarea | ✅ visible |  |
| 26 | `layout[cardCarousel].eyebrow` | text | ✅ visible |  |
| 27 | `layout[cardCarousel].title` | textarea | ✅ visible |  |
| 28 | `layout[cardCarousel].note` | textarea | ✅ visible |  |
| 29 | `layout[cardCarousel].anchorId` | text | ✅ visible |  |
| 30 | `layout[cardCarousel].navLabel` | text | ✅ visible |  |
| 31 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 32 | `layout[cardCarousel].cards[].tag` | text | ✅ visible |  |
| 33 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 34 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 35 | `layout[cardCarousel].cards[].tag` | text | ✅ visible |  |
| 36 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 37 | `layout[cardCarousel].cards[].title` | text | ✅ visible |  |
| 38 | `layout[cardCarousel].cards[].tag` | text | ✅ visible |  |
| 39 | `layout[cardCarousel].cards[].text` | textarea | ✅ visible |  |
| 40 | `layout[mediaText].eyebrow` | text | ✅ visible |  |
| 41 | `layout[mediaText].title` | textarea | ✅ visible |  |
| 42 | `layout[mediaText].body` | richText | ✅ visible |  |
| 43 | `layout[mediaText].listHeading` | text | ✅ visible |  |
| 44 | `layout[mediaText].anchorId` | text | ✅ visible |  |
| 45 | `layout[mediaText].navLabel` | text | ✅ visible |  |
| 46 | `layout[mediaText].listItems[].title` | text | ✅ visible |  |
| 47 | `layout[mediaText].listItems[].text` | textarea | ✅ visible |  |
| 48 | `layout[mediaText].listItems[].title` | text | ✅ visible |  |
| 49 | `layout[mediaText].listItems[].text` | textarea | ✅ visible |  |
| 50 | `layout[mediaText].link.label` | text | ✅ visible |  |
| 51 | `layout[mediaText].link.section` | text | ✅ visible |  |
| 52 | `layout[mediaText].report.title` | text | ✅ visible |  |
| 53 | `layout[mediaText].report.badge` | text | ✅ visible |  |
| 54 | `layout[mediaText].report.bars[].label` | text | ✅ visible |  |
| 55 | `layout[mediaText].report.bars[].label` | text | ✅ visible |  |
| 56 | `layout[mediaText].report.bars[].label` | text | ✅ visible |  |
| 57 | `layout[mediaText].report.caption` | text | ✅ visible |  |
| 58 | `layout[statements].eyebrow` | text | ✅ visible |  |
| 59 | `layout[statements].title` | textarea | ✅ visible |  |
| 60 | `layout[statements].anchorId` | text | ✅ visible |  |
| 61 | `layout[statements].navLabel` | text | ✅ visible |  |
| 62 | `layout[statements].items[].label` | text | ✅ visible |  |
| 63 | `layout[statements].items[].text` | textarea | ✅ visible |  |
| 64 | `layout[statements].items[].label` | text | ✅ visible |  |
| 65 | `layout[statements].items[].text` | textarea | ✅ visible |  |
| 66 | `layout[backgroundText].eyebrow` | text | ✅ visible |  |
| 67 | `layout[backgroundText].title` | textarea | ✅ visible |  |
| 68 | `layout[backgroundText].text` | textarea | ✅ visible |  |
| 69 | `layout[backgroundText].anchorId` | text | ✅ visible |  |
| 70 | `layout[backgroundText].navLabel` | text | ✅ visible |  |
| 71 | `layout[backgroundText].ticker[].text` | text | ✅ visible |  |
| 72 | `layout[backgroundText].ticker[].text` | text | ✅ visible |  |
| 73 | `layout[backgroundText].ticker[].text` | text | ✅ visible |  |
| 74 | `layout[backgroundText].ticker[].text` | text | ✅ visible |  |
| 75 | `layout[ownership].eyebrow` | text | ✅ visible |  |
| 76 | `layout[ownership].title` | textarea | ✅ visible |  |
| 77 | `layout[ownership].body` | richText | ✅ visible |  |
| 78 | `layout[ownership].closing` | richText | ✅ visible |  |
| 79 | `layout[ownership].closing` | richText | ✅ visible |  |
| 80 | `layout[ownership].anchorId` | text | ✅ visible |  |
| 81 | `layout[ownership].navLabel` | text | ✅ visible |  |
| 82 | `layout[ownership].facts[].value` | text | ✅ visible |  |
| 83 | `layout[ownership].facts[].label` | text | ✅ visible |  |
| 84 | `layout[ownership].facts[].value` | text | ✅ visible |  |
| 85 | `layout[ownership].facts[].label` | text | ✅ visible |  |
| 86 | `layout[ownership].facts[].value` | text | ✅ visible |  |
| 87 | `layout[ownership].facts[].label` | text | ✅ visible |  |
| 88 | `layout[ownership].levels[].name` | text | ✅ visible |  |
| 89 | `layout[ownership].levels[].tag` | text | ✅ visible |  |
| 90 | `layout[ownership].levels[].detail` | text | ✅ visible |  |
| 91 | `layout[ownership].levels[].text` | textarea | ✅ visible |  |
| 92 | `layout[ownership].levels[].figure` | text | ✅ visible |  |
| 93 | `layout[ownership].levels[].figureLabel` | text | ✅ visible |  |
| 94 | `layout[ownership].levels[].name` | text | ✅ visible |  |
| 95 | `layout[ownership].levels[].tag` | text | ✅ visible |  |
| 96 | `layout[ownership].levels[].detail` | text | ✅ visible |  |
| 97 | `layout[ownership].levels[].text` | textarea | ✅ visible |  |
| 98 | `layout[ownership].levels[].figure` | text | ✅ visible |  |
| 99 | `layout[ownership].levels[].figureLabel` | text | ✅ visible |  |
| 100 | `layout[ownership].levels[].name` | text | ✅ visible |  |
| 101 | `layout[ownership].levels[].tag` | text | ✅ visible |  |
| 102 | `layout[ownership].levels[].detail` | text | ✅ visible |  |
| 103 | `layout[ownership].levels[].text` | textarea | ✅ visible |  |
| 104 | `layout[ownership].levels[].figure` | text | ✅ visible |  |
| 105 | `layout[ownership].levels[].figureLabel` | text | ✅ visible |  |
| 106 | `layout[linkTiles].eyebrow` | text | ✅ visible |  |
| 107 | `layout[linkTiles].title` | textarea | ✅ visible |  |
| 108 | `layout[linkTiles].anchorId` | text | ✅ visible |  |
| 109 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 110 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 111 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 112 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 113 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 114 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 115 | `layout[ctaBanner].anchorId` | text | ✅ visible |  |
| 116 | `meta.title` | text | ✅ visible |  |
| 117 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzabout116x` and the meta description `qzabout117x`, so both SEO fields reached the page.

</details>

<a id="m-about-our-story"></a>
<details><summary><b>Our Story</b> (/about/our-story): 35 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[hero].links[].label` | text | ✅ visible |  |
| 6 | `layout[hero].links[].label` | text | ✅ visible |  |
| 7 | `layout[leadText].eyebrow` | text | ✅ visible |  |
| 8 | `layout[leadText].text` | textarea | ✅ visible |  |
| 9 | `layout[leadText].highlight` | text | ➖ data-only | Expected: this is the phrase to highlight, not text that is shown. |
| 10 | `layout[leadText].weaveStartLabel` | text | ✅ visible |  |
| 11 | `layout[leadText].weaveEndLabel` | text | ✅ visible |  |
| 12 | `layout[leadText].weaveResult` | text | ✅ visible |  |
| 13 | `layout[leadText].weaveNote` | text | ✅ visible |  |
| 14 | `layout[leadText].closingText` | textarea | ✅ visible |  |
| 15 | `layout[leadText].anchorId` | text | ✅ visible |  |
| 16 | `layout[leadText].weaveItems[].name` | text | ✅ visible |  |
| 17 | `layout[leadText].weaveItems[].tag` | text | ✅ visible |  |
| 18 | `layout[leadText].weaveItems[].text` | textarea | ✅ visible |  |
| 19 | `layout[leadText].weaveItems[].name` | text | ✅ visible |  |
| 20 | `layout[leadText].weaveItems[].tag` | text | ✅ visible |  |
| 21 | `layout[leadText].weaveItems[].text` | textarea | ✅ visible |  |
| 22 | `layout[leadText].weaveItems[].name` | text | ✅ visible |  |
| 23 | `layout[leadText].weaveItems[].tag` | text | ✅ visible |  |
| 24 | `layout[leadText].weaveItems[].text` | textarea | ✅ visible |  |
| 25 | `layout[leadText].closingLink.label` | text | ✅ visible |  |
| 26 | `layout[linkTiles].eyebrow` | text | ✅ visible |  |
| 27 | `layout[linkTiles].title` | textarea | ✅ visible |  |
| 28 | `layout[linkTiles].anchorId` | text | ✅ visible |  |
| 29 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 30 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 31 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 32 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 33 | `layout[ctaBanner].anchorId` | text | ✅ visible |  |
| 34 | `meta.title` | text | ✅ visible |  |
| 35 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzaboutourstory34x` and the meta description `qzaboutourstory35x`, so both SEO fields reached the page.

</details>

<a id="m-about-team"></a>
<details><summary><b>The Team</b> (/about/team): 29 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[hero].links[].label` | text | ✅ visible |  |
| 6 | `layout[hero].links[].section` | text | ✅ visible |  |
| 7 | `layout[hero].links[].label` | text | ✅ visible |  |
| 8 | `layout[teamDirectory].eyebrow` | text | ✅ visible |  |
| 9 | `layout[teamDirectory].intro` | textarea | ✅ visible |  |
| 10 | `layout[teamDirectory].highlight` | text | ➖ data-only | Expected: this is the phrase to highlight, not text that is shown. |
| 11 | `layout[teamDirectory].anchorId` | text | ✅ visible |  |
| 12 | `layout[groupScale].eyebrow` | text | ✅ visible |  |
| 13 | `layout[groupScale].text` | textarea | ✅ visible |  |
| 14 | `layout[groupScale].anchorId` | text | ✅ visible |  |
| 15 | `layout[groupScale].chain[].name` | text | ✅ visible |  |
| 16 | `layout[groupScale].chain[].name` | text | ✅ visible |  |
| 17 | `layout[groupScale].chain[].name` | text | ✅ visible |  |
| 18 | `layout[groupScale].link.label` | text | ✅ visible |  |
| 19 | `layout[groupScale].link.section` | text | ✅ visible |  |
| 20 | `layout[linkTiles].eyebrow` | text | ✅ visible |  |
| 21 | `layout[linkTiles].title` | textarea | ✅ visible |  |
| 22 | `layout[linkTiles].anchorId` | text | ✅ visible |  |
| 23 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 24 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 25 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 26 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 27 | `layout[ctaBanner].anchorId` | text | ✅ visible |  |
| 28 | `meta.title` | text | ✅ visible |  |
| 29 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzaboutteam28x` and the meta description `qzaboutteam29x`, so both SEO fields reached the page.

</details>

<a id="m-about-join"></a>
<details><summary><b>Join Us</b> (/about/join): 69 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[hero].links[].label` | text | ✅ visible |  |
| 6 | `layout[hero].links[].section` | text | ✅ visible |  |
| 7 | `layout[hero].links[].label` | text | ✅ visible |  |
| 8 | `layout[hero].links[].section` | text | ✅ visible |  |
| 9 | `layout[leadText].eyebrow` | text | ✅ visible |  |
| 10 | `layout[leadText].text` | textarea | ✅ visible |  |
| 11 | `layout[leadText].highlight` | text | ➖ data-only | Expected: this is the phrase to highlight, not text that is shown. |
| 12 | `layout[leadText].weaveStartLabel` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 13 | `layout[leadText].weaveEndLabel` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 14 | `layout[leadText].weaveResult` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 15 | `layout[leadText].detailsHeading` | text | ✅ visible |  |
| 16 | `layout[leadText].detailsText` | textarea | ✅ visible |  |
| 17 | `layout[leadText].anchorId` | text | ✅ visible |  |
| 18 | `layout[leadText].crossItems[].label` | text | ✅ visible |  |
| 19 | `layout[leadText].crossItems[].name` | text | ✅ visible |  |
| 20 | `layout[leadText].crossItems[].text` | textarea | ✅ visible |  |
| 21 | `layout[leadText].crossItems[].label` | text | ✅ visible |  |
| 22 | `layout[leadText].crossItems[].name` | text | ✅ visible |  |
| 23 | `layout[leadText].crossItems[].text` | textarea | ✅ visible |  |
| 24 | `layout[leadText].crossItems[].label` | text | ✅ visible |  |
| 25 | `layout[leadText].crossItems[].name` | text | ✅ visible |  |
| 26 | `layout[leadText].crossItems[].text` | textarea | ✅ visible |  |
| 27 | `layout[leadText].crossItems[].label` | text | ✅ visible |  |
| 28 | `layout[leadText].crossItems[].name` | text | ✅ visible |  |
| 29 | `layout[leadText].crossItems[].text` | textarea | ✅ visible |  |
| 30 | `layout[leadText].detailsList[].name` | text | ✅ visible |  |
| 31 | `layout[leadText].detailsList[].tag` | text | ✅ visible |  |
| 32 | `layout[leadText].detailsList[].name` | text | ✅ visible |  |
| 33 | `layout[leadText].detailsList[].tag` | text | ✅ visible |  |
| 34 | `layout[leadText].detailsList[].name` | text | ✅ visible |  |
| 35 | `layout[leadText].detailsList[].tag` | text | ✅ visible |  |
| 36 | `layout[leadText].detailsList[].name` | text | ✅ visible |  |
| 37 | `layout[leadText].detailsList[].tag` | text | ✅ visible |  |
| 38 | `layout[statement].text` | textarea | ✅ visible |  |
| 39 | `layout[statement].highlight` | text | ➖ data-only | Expected: this is the phrase to highlight, not text that is shown. |
| 40 | `layout[openRoles].eyebrow` | text | ✅ visible |  |
| 41 | `layout[openRoles].title` | textarea | ✅ visible |  |
| 42 | `layout[openRoles].applyLabel` | text | ✅ visible |  |
| 43 | `layout[openRoles].applySection` | text | ✅ visible |  |
| 44 | `layout[openRoles].emptyText` | text | ➖ data-only | Expected: shown only when a filter has no results. |
| 45 | `layout[openRoles].footerText` | text | ✅ visible |  |
| 46 | `layout[openRoles].anchorId` | text | ✅ visible |  |
| 47 | `layout[openRoles].footerLink.label` | text | ✅ visible |  |
| 48 | `layout[openRoles].footerLink.section` | text | ✅ visible |  |
| 49 | `layout[form].eyebrow` | text | ✅ visible |  |
| 50 | `layout[form].title` | textarea | ✅ visible |  |
| 51 | `layout[form].lede` | textarea | ✅ visible |  |
| 52 | `layout[form].submitLabel` | text | ✅ visible |  |
| 53 | `layout[form].successMessage` | text | ➖ data-only | Expected: shown after the form is sent (client side). |
| 54 | `layout[form].interestsLabel` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 55 | `layout[form].interestsHint` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 56 | `layout[form].messageLabel` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 57 | `layout[form].consentText` | text | ➖ data-only | Expected: Contact-form-only field (hidden in the admin for this form type). |
| 58 | `layout[form].successTitle` | text | ➖ data-only | Expected: shown after the form is sent (client side). |
| 59 | `layout[form].note` | text | ✅ visible |  |
| 60 | `layout[form].anchorId` | text | ✅ visible |  |
| 61 | `layout[linkTiles].eyebrow` | text | ✅ visible |  |
| 62 | `layout[linkTiles].title` | textarea | ✅ visible |  |
| 63 | `layout[linkTiles].anchorId` | text | ✅ visible |  |
| 64 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 65 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 66 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 67 | `layout[linkTiles].tiles[].text` | textarea | ✅ visible |  |
| 68 | `meta.title` | text | ✅ visible |  |
| 69 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzaboutjoin68x` and the meta description `qzaboutjoin69x`, so both SEO fields reached the page.

</details>

<a id="m-services"></a>
<details><summary><b>Services</b> (/services): 94 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[hero].links[].label` | text | ✅ visible |  |
| 6 | `layout[hero].links[].section` | text | ✅ visible |  |
| 7 | `layout[hero].links[].label` | text | ✅ visible |  |
| 8 | `layout[linkTiles].eyebrow` | text | ✅ visible |  |
| 9 | `layout[linkTiles].title` | textarea | ✅ visible |  |
| 10 | `layout[linkTiles].anchorId` | text | ✅ visible |  |
| 11 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 12 | `layout[linkTiles].tiles[].link.section` | text | ✅ visible |  |
| 13 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 14 | `layout[linkTiles].tiles[].link.section` | text | ✅ visible |  |
| 15 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 16 | `layout[linkTiles].tiles[].link.section` | text | ✅ visible |  |
| 17 | `layout[linkTiles].tiles[].title` | text | ✅ visible |  |
| 18 | `layout[linkTiles].tiles[].link.section` | text | ✅ visible |  |
| 19 | `layout[leadText].eyebrow` | text | ✅ visible |  |
| 20 | `layout[leadText].heading` | textarea | ✅ visible |  |
| 21 | `layout[leadText].text` | textarea | ✅ visible |  |
| 22 | `layout[leadText].weaveStartLabel` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 23 | `layout[leadText].weaveEndLabel` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 24 | `layout[leadText].weaveResult` | text | ➖ data-only | Expected: "Lanes into one" diagram fields; this section uses another diagram. |
| 25 | `layout[leadText].anchorId` | text | ✅ visible |  |
| 26 | `layout[leadText].notes[].text` | text | ✅ visible |  |
| 27 | `layout[leadText].notes[].text` | text | ✅ visible |  |
| 28 | `layout[serviceDetail].title` | text | ✅ visible |  |
| 29 | `layout[serviceDetail].lead` | textarea | ✅ visible |  |
| 30 | `layout[serviceDetail].anchorId` | text | ✅ visible |  |
| 31 | `layout[serviceDetail].navLabel` | text | ✅ visible |  |
| 32 | `layout[serviceDetail].links[].label` | text | ✅ visible |  |
| 33 | `layout[serviceDetail].content[svcImage].caption` | text | ✅ visible |  |
| 34 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 35 | `layout[serviceDetail].content[svcList].items[].tag` | text | ✅ visible |  |
| 36 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 37 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 38 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 39 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 40 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 41 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 42 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 43 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 44 | `layout[serviceDetail].content[svcList].items[].tag` | text | ✅ visible |  |
| 45 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 46 | `layout[serviceDetail].content[svcList].items[].link.label` | text | ✅ visible |  |
| 47 | `layout[serviceDetail].content[svcList].items[].link.section` | text | ✅ visible |  |
| 48 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 49 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 50 | `layout[serviceDetail].title` | text | ✅ visible |  |
| 51 | `layout[serviceDetail].lead` | textarea | ✅ visible |  |
| 52 | `layout[serviceDetail].anchorId` | text | ✅ visible |  |
| 53 | `layout[serviceDetail].navLabel` | text | ✅ visible |  |
| 54 | `layout[serviceDetail].links[].label` | text | ✅ visible |  |
| 55 | `layout[serviceDetail].content[svcImage].caption` | text | ✅ visible |  |
| 56 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 57 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 58 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 59 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 60 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 61 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 62 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 63 | `layout[serviceDetail].content[svcList].items[].tag` | text | ✅ visible |  |
| 64 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 65 | `layout[serviceDetail].title` | text | ✅ visible |  |
| 66 | `layout[serviceDetail].hook` | text | ✅ visible |  |
| 67 | `layout[serviceDetail].lead` | textarea | ✅ visible |  |
| 68 | `layout[serviceDetail].anchorId` | text | ✅ visible |  |
| 69 | `layout[serviceDetail].navLabel` | text | ✅ visible |  |
| 70 | `layout[serviceDetail].links[].label` | text | ✅ visible |  |
| 71 | `layout[serviceDetail].content[svcHighlight].label` | text | ✅ visible |  |
| 72 | `layout[serviceDetail].content[svcHighlight].name` | text | ✅ visible |  |
| 73 | `layout[serviceDetail].content[svcHighlight].note` | text | ✅ visible |  |
| 74 | `layout[serviceDetail].content[svcHighlight].text` | textarea | ✅ visible |  |
| 75 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 76 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 77 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 78 | `layout[serviceDetail].content[svcList].items[].tag` | text | ✅ visible |  |
| 79 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 80 | `layout[serviceDetail].content[svcList].items[].title` | text | ✅ visible |  |
| 81 | `layout[serviceDetail].content[svcList].items[].text` | textarea | ✅ visible |  |
| 82 | `layout[serviceDetail].content[svcList].items[].link.label` | text | ✅ visible |  |
| 83 | `layout[serviceDetail].content[svcList].items[].link.section` | text | ✅ visible |  |
| 84 | `layout[serviceDetail].content[svcImage].caption` | text | ✅ visible |  |
| 85 | `layout[serviceDetail].title` | text | ✅ visible |  |
| 86 | `layout[serviceDetail].hook` | text | ✅ visible |  |
| 87 | `layout[serviceDetail].lead` | textarea | ✅ visible |  |
| 88 | `layout[serviceDetail].anchorId` | text | ✅ visible |  |
| 89 | `layout[serviceDetail].navLabel` | text | ✅ visible |  |
| 90 | `layout[serviceDetail].links[].label` | text | ✅ visible |  |
| 91 | `layout[serviceDetail].links[].label` | text | ✅ visible |  |
| 92 | `layout[ctaBanner].anchorId` | text | ✅ visible |  |
| 93 | `meta.title` | text | ✅ visible |  |
| 94 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzservices93x` and the meta description `qzservices94x`, so both SEO fields reached the page.

</details>

<a id="m-our-work"></a>
<details><summary><b>Our Work</b> (/our-work): 18 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[hero].links[].label` | text | ✅ visible |  |
| 6 | `layout[hero].links[].section` | text | ✅ visible |  |
| 7 | `layout[hero].links[].label` | text | ✅ visible |  |
| 8 | `layout[caseStudyGrid].filterLabel` | text | ✅ visible |  |
| 9 | `layout[caseStudyGrid].allLabel` | text | ✅ visible |  |
| 10 | `layout[caseStudyGrid].exploreLabel` | text | ✅ visible |  |
| 11 | `layout[caseStudyGrid].emptyText` | text | ➖ data-only | Expected: shown only when a filter has no results. |
| 12 | `layout[caseStudyGrid].nextLabel` | text | ➖ data-only | Expected: shown inside the open case study (client side). |
| 13 | `layout[caseStudyGrid].anchorId` | text | ✅ visible |  |
| 14 | `layout[caseStudyGrid].ctaLink.label` | text | ➖ data-only | Expected: shown inside the open case study (client side). |
| 15 | `layout[logoMarquee].label` | text | ✅ visible |  |
| 16 | `layout[ctaBanner].anchorId` | text | ✅ visible |  |
| 17 | `meta.title` | text | ✅ visible |  |
| 18 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzourwork17x` and the meta description `qzourwork18x`, so both SEO fields reached the page.

</details>

<a id="m-contact"></a>
<details><summary><b>Contact</b> (/contact): 49 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[hero].title` | textarea | ✅ visible |  |
| 3 | `layout[hero].intro` | richText | ✅ visible |  |
| 4 | `layout[hero].intro` | richText | ✅ visible |  |
| 5 | `layout[form].eyebrow` | text | ✅ visible |  |
| 6 | `layout[form].title` | textarea | ✅ visible |  |
| 7 | `layout[form].lede` | textarea | ✅ visible |  |
| 8 | `layout[form].submitLabel` | text | ✅ visible |  |
| 9 | `layout[form].successMessage` | text | ➖ data-only | Expected: shown after the form is sent (client side). |
| 10 | `layout[form].asideText` | text | ✅ visible |  |
| 11 | `layout[form].interestsLabel` | text | ✅ visible |  |
| 12 | `layout[form].interestsHint` | text | ✅ visible |  |
| 13 | `layout[form].interestNote` | text | ➖ data-only | Expected: shown after a visitor ticks a "careers" choice (client side). |
| 14 | `layout[form].messageLabel` | text | ✅ visible |  |
| 15 | `layout[form].messagePlaceholder` | text | ✅ visible |  |
| 16 | `layout[form].consentText` | text | ✅ visible |  |
| 17 | `layout[form].successTitle` | text | ➖ data-only | Expected: shown after the form is sent (client side). |
| 18 | `layout[form].anchorId` | text | ✅ visible |  |
| 19 | `layout[form].promises[].title` | text | ✅ visible |  |
| 20 | `layout[form].promises[].text` | text | ✅ visible |  |
| 21 | `layout[form].promises[].title` | text | ✅ visible |  |
| 22 | `layout[form].promises[].text` | text | ✅ visible |  |
| 23 | `layout[form].promises[].title` | text | ✅ visible |  |
| 24 | `layout[form].promises[].text` | text | ✅ visible |  |
| 25 | `layout[form].interests[].label` | text | ✅ visible |  |
| 26 | `layout[form].interests[].label` | text | ✅ visible |  |
| 27 | `layout[form].interests[].label` | text | ✅ visible |  |
| 28 | `layout[form].interests[].label` | text | ✅ visible |  |
| 29 | `layout[form].interests[].label` | text | ✅ visible |  |
| 30 | `layout[form].interests[].label` | text | ✅ visible |  |
| 31 | `layout[form].interests[].label` | text | ✅ visible |  |
| 32 | `layout[form].interests[].label` | text | ✅ visible |  |
| 33 | `layout[form].interests[].label` | text | ✅ visible |  |
| 34 | `layout[form].interests[].label` | text | ✅ visible |  |
| 35 | `layout[form].asideLink.label` | text | ✅ visible |  |
| 36 | `layout[form].interestNoteLink.label` | text | ➖ data-only | Expected: shown after a visitor ticks a "careers" choice (client side). |
| 37 | `layout[form].interestNoteLink.section` | text | ➖ data-only | Expected: shown after a visitor ticks a "careers" choice (client side). |
| 38 | `layout[offices].eyebrow` | text | ✅ visible |  |
| 39 | `layout[offices].title` | textarea | ✅ visible |  |
| 40 | `layout[offices].lede` | textarea | ✅ visible |  |
| 41 | `layout[offices].tag` | text | ✅ visible |  |
| 42 | `layout[offices].city` | text | ✅ visible |  |
| 43 | `layout[offices].phone` | text | ✅ visible |  |
| 44 | `layout[offices].address` | textarea | ✅ visible |  |
| 45 | `layout[offices].directionsQuery` | text | ✅ visible |  |
| 46 | `layout[offices].hours` | textarea | ✅ visible |  |
| 47 | `layout[offices].anchorId` | text | ✅ visible |  |
| 48 | `meta.title` | text | ✅ visible |  |
| 49 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzcontact48x` and the meta description `qzcontact49x`, so both SEO fields reached the page.

</details>

<a id="m-legal-terms"></a>
<details><summary><b>Legal: Terms</b> (/legal/terms): 63 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[legalDocument].title` | text | ✅ visible |  |
| 3 | `layout[legalDocument].subtitle` | textarea | ✅ visible |  |
| 4 | `layout[legalDocument].switcherLabel` | text | ✅ visible |  |
| 5 | `layout[legalDocument].noticeTitle` | text | ✅ visible |  |
| 6 | `layout[legalDocument].noticeText` | textarea | ✅ visible |  |
| 7 | `layout[legalDocument].intro` | textarea | ✅ visible |  |
| 8 | `layout[legalDocument].askTitle` | text | ✅ visible |  |
| 9 | `layout[legalDocument].anchorId` | text | ✅ visible |  |
| 10 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 11 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 12 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 13 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 14 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 15 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 16 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 17 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 18 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 19 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 20 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 21 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 22 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 23 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 24 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 25 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 26 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 27 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 28 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 29 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 30 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 31 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 32 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 33 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 34 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 35 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 36 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 37 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 38 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 39 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 40 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 41 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 42 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 43 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 44 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 45 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 46 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 47 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 48 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 49 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 50 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 51 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 52 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 53 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 54 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 55 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 56 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 57 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 58 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 59 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 60 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 61 | `layout[legalDocument].askLink.label` | text | ✅ visible |  |
| 62 | `meta.title` | text | ✅ visible |  |
| 63 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzlegalterms62x` and the meta description `qzlegalterms63x`, so both SEO fields reached the page.

</details>

<a id="m-legal-privacy-policy"></a>
<details><summary><b>Legal: Privacy Policy</b> (/legal/privacy-policy): 79 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[legalDocument].title` | text | ✅ visible |  |
| 3 | `layout[legalDocument].subtitle` | textarea | ✅ visible |  |
| 4 | `layout[legalDocument].switcherLabel` | text | ✅ visible |  |
| 5 | `layout[legalDocument].noticeTitle` | text | ✅ visible |  |
| 6 | `layout[legalDocument].noticeText` | textarea | ✅ visible |  |
| 7 | `layout[legalDocument].intro` | textarea | ✅ visible |  |
| 8 | `layout[legalDocument].askTitle` | text | ✅ visible |  |
| 9 | `layout[legalDocument].anchorId` | text | ✅ visible |  |
| 10 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 11 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 12 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 13 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 14 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 15 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 16 | `layout[legalDocument].noticePoints[].text` | text | ✅ visible |  |
| 17 | `layout[legalDocument].noticePoints[].text` | text | ✅ visible |  |
| 18 | `layout[legalDocument].noticePoints[].text` | text | ✅ visible |  |
| 19 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 20 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 21 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 22 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 23 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 24 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 25 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 26 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 27 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 28 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 29 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 30 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 31 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 32 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 33 | `layout[legalDocument].sections[].mustLabel` | text | ✅ visible |  |
| 34 | `layout[legalDocument].sections[].mustNote` | text | ✅ visible |  |
| 35 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 36 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 37 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 38 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 39 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 40 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 41 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 42 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 43 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 44 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 45 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 46 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 47 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 48 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 49 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 50 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 51 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 52 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 53 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 54 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 55 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 56 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 57 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 58 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 59 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 60 | `layout[legalDocument].sections[].mustLabel` | text | ✅ visible |  |
| 61 | `layout[legalDocument].sections[].mustNote` | text | ✅ visible |  |
| 62 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 63 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 64 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 65 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 66 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 67 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 68 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 69 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 70 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 71 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 72 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 73 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 74 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 75 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 76 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 77 | `layout[legalDocument].askLink.label` | text | ✅ visible |  |
| 78 | `meta.title` | text | ✅ visible |  |
| 79 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzlegalprivacypolicy78x` and the meta description `qzlegalprivacypolicy79x`, so both SEO fields reached the page.

</details>

<a id="m-legal-cookies"></a>
<details><summary><b>Legal: Cookies</b> (/legal/cookies): 65 fields</summary>

| # | Field | Kind | Result | Note |
|---|---|---|---|---|
| 1 | `title` | text | ✅ visible |  |
| 2 | `layout[legalDocument].title` | text | ✅ visible |  |
| 3 | `layout[legalDocument].subtitle` | textarea | ✅ visible |  |
| 4 | `layout[legalDocument].switcherLabel` | text | ✅ visible |  |
| 5 | `layout[legalDocument].noticeTitle` | text | ✅ visible |  |
| 6 | `layout[legalDocument].noticeText` | textarea | ✅ visible |  |
| 7 | `layout[legalDocument].intro` | textarea | ✅ visible |  |
| 8 | `layout[legalDocument].askTitle` | text | ✅ visible |  |
| 9 | `layout[legalDocument].anchorId` | text | ✅ visible |  |
| 10 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 11 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 12 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 13 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 14 | `layout[legalDocument].facts[].label` | text | ✅ visible |  |
| 15 | `layout[legalDocument].facts[].value` | text | ✅ visible |  |
| 16 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 17 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 18 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 19 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 20 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 21 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 22 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 23 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 24 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 25 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 26 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 27 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 28 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 29 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 30 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 31 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 32 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 33 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 34 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 35 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 36 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 37 | `layout[legalDocument].sections[].cookieTable[].name` | text | ✅ visible |  |
| 38 | `layout[legalDocument].sections[].cookieTable[].provider` | text | ✅ visible |  |
| 39 | `layout[legalDocument].sections[].cookieTable[].duration` | text | ✅ visible |  |
| 40 | `layout[legalDocument].sections[].cookieTable[].purpose` | text | ✅ visible |  |
| 41 | `layout[legalDocument].sections[].cookieTable[].name` | text | ✅ visible |  |
| 42 | `layout[legalDocument].sections[].cookieTable[].provider` | text | ✅ visible |  |
| 43 | `layout[legalDocument].sections[].cookieTable[].duration` | text | ✅ visible |  |
| 44 | `layout[legalDocument].sections[].cookieTable[].purpose` | text | ✅ visible |  |
| 45 | `layout[legalDocument].sections[].cookieTable[].name` | text | ✅ visible |  |
| 46 | `layout[legalDocument].sections[].cookieTable[].provider` | text | ✅ visible |  |
| 47 | `layout[legalDocument].sections[].cookieTable[].duration` | text | ✅ visible |  |
| 48 | `layout[legalDocument].sections[].cookieTable[].purpose` | text | ✅ visible |  |
| 49 | `layout[legalDocument].sections[].cookieTable[].name` | text | ✅ visible |  |
| 50 | `layout[legalDocument].sections[].cookieTable[].provider` | text | ✅ visible |  |
| 51 | `layout[legalDocument].sections[].cookieTable[].duration` | text | ✅ visible |  |
| 52 | `layout[legalDocument].sections[].cookieTable[].purpose` | text | ✅ visible |  |
| 53 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 54 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 55 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 56 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 57 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 58 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 59 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 60 | `layout[legalDocument].sections[].title` | text | ✅ visible |  |
| 61 | `layout[legalDocument].sections[].mustNote` | text | ❌ missing | Not shown: the note only appears next to a tag ("Text after the tag"), and this section has no tag. See CMS-1. |
| 62 | `layout[legalDocument].sections[].body` | richText | ✅ visible |  |
| 63 | `layout[legalDocument].askLink.label` | text | ✅ visible |  |
| 64 | `meta.title` | text | ✅ visible |  |
| 65 | `meta.description` | textarea | ✅ visible |  |

SEO check: the browser tab title became `qzlegalcookies64x` and the meta description `qzlegalcookies65x`, so both SEO fields reached the page.

</details>

### B. Every option on every page (API, one change per publish)

Every select, radio and checkbox field of every section (first row of each list) was switched to each other value, one at a time. Each change was published and the live page checked against the baseline, then the page was restored.

Result legend:

- **changed**: the live page changed.
- **no visible change**: expected where the option belongs to another variant or is only used after an interaction (see the notes).
- **save refused**: the CMS correctly blocked an invalid combination, such as a link type switched without its page/URL.

| Page | Option changes | Changed | No visible change | Save refused (validation) | Restored |
|---|---|---|---|---|---|
| [Home](#o-home) | 64 | 45 | 14 | 5 | ✅ |
| [About](#o-about) | 74 | 53 | 18 | 3 | ✅ |
| [Our Story](#o-about-our-story) | 50 | 40 | 9 | 1 | ✅ |
| [The Team](#o-about-team) | 40 | 29 | 8 | 3 | ✅ |
| [Join Us](#o-about-join) | 65 | 48 | 15 | 2 | ✅ |
| [Services](#o-services) | 74 | 50 | 18 | 6 | ✅ |
| [Our Work](#o-our-work) | 30 | 17 | 11 | 2 | ✅ |
| [Contact](#o-contact) | 25 | 21 | 4 | 0 | ✅ |
| [Legal: Terms](#o-legal-terms) | 10 | 10 | 0 | 0 | ✅ |
| [Legal: Privacy Policy](#o-legal-privacy-policy) | 10 | 10 | 0 | 0 | ✅ |
| [Legal: Cookies](#o-legal-cookies) | 10 | 10 | 0 | 0 | ✅ |

<a id="o-home"></a>
<details><summary><b>Home</b> (/): 64 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"showreel"` → `"page"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 3 | `layout[hero].largerOnPhones` | `false` → `true` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 4 | `layout[hero].smallerOnPhones` | `false` → `true` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 5 | `layout[hero].headlineSize` | `"wrap"` → `"oneLine"` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 6 | `layout[hero].headlineSize` | `"wrap"` → `"fitted"` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ✅ changed |  |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ➖ no visible change | Expected: inner-page banner option; Home uses the showreel banner. |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"section"` → `"page"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 14 | `layout[hero].links[].type` | `"section"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[mediaText].variant` | `"fade"` → `"card"` | ✅ changed |  |
| 17 | `layout[mediaText].gradientTitle` | `true` → `false` | ✅ changed |  |
| 18 | `layout[mediaText].showButton` | `true` → `false` | ✅ changed |  |
| 19 | `layout[mediaText].imagePosition` | `"right"` → `"left"` | ✅ changed |  |
| 20 | `layout[mediaText].fadeImageEdge` | `true` → `false` | ✅ changed |  |
| 21 | `layout[mediaText].hideSection` | `false` → `true` | ✅ changed |  |
| 22 | `layout[mediaText].link.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 23 | `layout[mediaText].link.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 24 | `layout[mediaText].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 25 | `layout[mediaText].link.type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 26 | `layout[mediaText].link.newTab` | `null` → `true` | ✅ changed |  |
| 27 | `layout[cardCarousel].cardStyle` | `"service"` → `"pillar"` | ✅ changed |  |
| 28 | `layout[cardCarousel].theme` | `"light"` → `"dark"` | ✅ changed |  |
| 29 | `layout[cardCarousel].hideSection` | `false` → `true` | ✅ changed |  |
| 30 | `layout[cardCarousel].cards[].hasLink` | `true` → `false` | ✅ changed |  |
| 31 | `layout[cardCarousel].cards[].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 32 | `layout[cardCarousel].cards[].link.type` | `"page"` → `"url"` | ✅ changed |  |
| 33 | `layout[cardCarousel].cards[].link.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 34 | `layout[stackedPanels].hideSection` | `false` → `true` | ✅ changed |  |
| 35 | `layout[stackedPanels].panels[].gradientTitle` | `true` → `false` | ✅ changed |  |
| 36 | `layout[stackedPanels].panels[].showButton` | `true` → `false` | ✅ changed |  |
| 37 | `layout[stackedPanels].panels[].link.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 38 | `layout[stackedPanels].panels[].link.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 39 | `layout[stackedPanels].panels[].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 40 | `layout[stackedPanels].panels[].link.type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 41 | `layout[stackedPanels].panels[].link.newTab` | `null` → `true` | ✅ changed |  |
| 42 | `layout[statsCarousel].hideSection` | `false` → `true` | ✅ changed |  |
| 43 | `layout[logoMarquee].hideSection` | `false` → `true` | ✅ changed |  |
| 44 | `layout[caseStudyGallery].showButton` | `true` → `false` | ✅ changed |  |
| 45 | `layout[caseStudyGallery].hideSection` | `false` → `true` | ✅ changed |  |
| 46 | `layout[caseStudyGallery].items[].fullWidth` | `null` → `true` | ✅ changed |  |
| 47 | `layout[caseStudyGallery].link.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 48 | `layout[caseStudyGallery].link.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 49 | `layout[caseStudyGallery].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 50 | `layout[caseStudyGallery].link.type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 51 | `layout[caseStudyGallery].link.newTab` | `null` → `true` | ✅ changed |  |
| 52 | `layout[statement].style` | `"centered"` → `"band"` | ✅ changed |  |
| 53 | `layout[statement].animation` | `"scrollReveal"` → `"none"` | ✅ changed |  |
| 54 | `layout[statement].showBrandMarks` | `true` → `false` | ✅ changed |  |
| 55 | `layout[statement].hideSection` | `false` → `true` | ✅ changed |  |
| 56 | `layout[form].formType` | `"enquiry"` → `"application"` | ✅ changed |  |
| 57 | `layout[form].formType` | `"enquiry"` → `"contact"` | ✅ changed |  |
| 58 | `layout[form].hideSection` | `false` → `true` | ✅ changed |  |
| 59 | `layout[form].asideLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 60 | `layout[form].asideLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 61 | `layout[form].asideLink.newTab` | `null` → `true` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 62 | `layout[form].interestNoteLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 63 | `layout[form].interestNoteLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 64 | `layout[form].interestNoteLink.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |

</details>

<a id="o-about"></a>
<details><summary><b>About</b> (/about): 74 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `false` → `true` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `false` → `true` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"fitted"` → `"wrap"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"fitted"` → `"oneLine"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"bright"` → `"dim"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `true` → `false` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"page"` → `"section"` | ✅ changed |  |
| 14 | `layout[hero].links[].type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[sectionNav].source` | `"sections"` → `"menu"` | ✅ changed |  |
| 17 | `layout[sectionNav].barStyle` | `"bar"` → `"sticky"` | ✅ changed |  |
| 18 | `layout[sectionNav].hideSection` | `false` → `true` | ✅ changed |  |
| 19 | `layout[leadText].textSize` | `"lg"` → `"md"` | ✅ changed |  |
| 20 | `layout[leadText].textSize` | `"lg"` → `"sm"` | ✅ changed |  |
| 21 | `layout[leadText].animation` | `"scrollReveal"` → `"none"` | ✅ changed |  |
| 22 | `layout[leadText].band` | `false` → `true` | ✅ changed |  |
| 23 | `layout[leadText].highlightMode` | `"tail"` → `"none"` | ✅ changed |  |
| 24 | `layout[leadText].highlightMode` | `"tail"` → `"words"` | ✅ changed |  |
| 25 | `layout[leadText].highlightMode` | `"tail"` → `"phrase"` | ✅ changed |  |
| 26 | `layout[leadText].diagram` | `"merge"` → `"none"` | ✅ changed |  |
| 27 | `layout[leadText].diagram` | `"merge"` → `"weave"` | ✅ changed |  |
| 28 | `layout[leadText].diagram` | `"merge"` → `"cross"` | ✅ changed |  |
| 29 | `layout[leadText].showDetails` | `false` → `true` | ➖ no visible change | Expected: the details row has no content on this page. |
| 30 | `layout[leadText].showClosing` | `false` → `true` | ✅ changed |  |
| 31 | `layout[leadText].hideSection` | `false` → `true` | ✅ changed |  |
| 32 | `layout[leadText].closingLink.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 33 | `layout[leadText].closingLink.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 34 | `layout[leadText].closingLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 35 | `layout[leadText].closingLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 36 | `layout[leadText].closingLink.newTab` | `null` → `true` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 37 | `layout[cardCarousel].cardStyle` | `"pillar"` → `"service"` | ✅ changed |  |
| 38 | `layout[cardCarousel].theme` | `"light"` → `"dark"` | ✅ changed |  |
| 39 | `layout[cardCarousel].hideSection` | `false` → `true` | ✅ changed |  |
| 40 | `layout[cardCarousel].cards[].hasLink` | `false` → `true` | ➖ no visible change | Expected: the card has no link target set. |
| 41 | `layout[cardCarousel].cards[].link.type` | `"page"` → `"section"` | ➖ no visible change |  |
| 42 | `layout[cardCarousel].cards[].link.type` | `"page"` → `"url"` | ➖ no visible change |  |
| 43 | `layout[cardCarousel].cards[].link.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 44 | `layout[mediaText].variant` | `"card"` → `"fade"` | ✅ changed |  |
| 45 | `layout[mediaText].gradientTitle` | `true` → `false` | ✅ changed |  |
| 46 | `layout[mediaText].showButton` | `true` → `false` | ✅ changed |  |
| 47 | `layout[mediaText].imagePosition` | `"left"` → `"right"` | ✅ changed |  |
| 48 | `layout[mediaText].fadeImageEdge` | `true` → `false` | ➖ no visible change | Expected: fade-look option; this section uses the card look. |
| 49 | `layout[mediaText].hideSection` | `false` → `true` | ✅ changed |  |
| 50 | `layout[mediaText].link.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 51 | `layout[mediaText].link.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 52 | `layout[mediaText].link.type` | `"section"` → `"page"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 53 | `layout[mediaText].link.type` | `"section"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 54 | `layout[mediaText].link.newTab` | `null` → `true` | ✅ changed |  |
| 55 | `layout[statements].gradientTitle` | `true` → `false` | ✅ changed |  |
| 56 | `layout[statements].showBrandMark` | `true` → `false` | ✅ changed |  |
| 57 | `layout[statements].hideSection` | `false` → `true` | ✅ changed |  |
| 58 | `layout[backgroundText].gradientTitle` | `true` → `false` | ✅ changed |  |
| 59 | `layout[backgroundText].hideSection` | `false` → `true` | ✅ changed |  |
| 60 | `layout[ownership].hideSection` | `false` → `true` | ✅ changed |  |
| 61 | `layout[linkTiles].gradientTitle` | `false` → `true` | ✅ changed |  |
| 62 | `layout[linkTiles].tileStyle` | `"tall"` → `"standard"` | ✅ changed |  |
| 63 | `layout[linkTiles].tileStyle` | `"tall"` → `"numbered"` | ✅ changed |  |
| 64 | `layout[linkTiles].hideSection` | `false` → `true` | ✅ changed |  |
| 65 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 66 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"url"` | ✅ changed |  |
| 67 | `layout[linkTiles].tiles[].link.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 68 | `layout[ctaBanner].useDefault` | `true` → `false` | ✅ changed |  |
| 69 | `layout[ctaBanner].hideSection` | `false` → `true` | ✅ changed |  |
| 70 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 71 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 72 | `layout[ctaBanner].custom.link.type` | `"page"` → `"section"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 73 | `layout[ctaBanner].custom.link.type` | `"page"` → `"url"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 74 | `layout[ctaBanner].custom.link.newTab` | `null` → `true` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |

</details>

<a id="o-about-our-story"></a>
<details><summary><b>Our Story</b> (/about/our-story): 50 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `false` → `true` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `false` → `true` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"oneLine"` → `"wrap"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"oneLine"` → `"fitted"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"page"` → `"section"` | ✅ changed |  |
| 14 | `layout[hero].links[].type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[sectionNav].source` | `"menu"` → `"sections"` | ✅ changed |  |
| 17 | `layout[sectionNav].barStyle` | `"bar"` → `"sticky"` | ➖ no visible change | Expected: the look option only applies to the "sections" source; this menu copies the main menu. |
| 18 | `layout[sectionNav].hideSection` | `false` → `true` | ✅ changed |  |
| 19 | `layout[leadText].textSize` | `"md"` → `"lg"` | ✅ changed |  |
| 20 | `layout[leadText].textSize` | `"md"` → `"sm"` | ✅ changed |  |
| 21 | `layout[leadText].animation` | `"scrollReveal"` → `"none"` | ✅ changed |  |
| 22 | `layout[leadText].band` | `false` → `true` | ✅ changed |  |
| 23 | `layout[leadText].highlightMode` | `"words"` → `"none"` | ✅ changed |  |
| 24 | `layout[leadText].highlightMode` | `"words"` → `"tail"` | ✅ changed |  |
| 25 | `layout[leadText].highlightMode` | `"words"` → `"phrase"` | ✅ changed |  |
| 26 | `layout[leadText].diagram` | `"weave"` → `"none"` | ✅ changed |  |
| 27 | `layout[leadText].diagram` | `"weave"` → `"merge"` | ✅ changed |  |
| 28 | `layout[leadText].diagram` | `"weave"` → `"cross"` | ✅ changed |  |
| 29 | `layout[leadText].showDetails` | `false` → `true` | ➖ no visible change | Expected: the details row has no content on this page. |
| 30 | `layout[leadText].showClosing` | `true` → `false` | ✅ changed |  |
| 31 | `layout[leadText].hideSection` | `false` → `true` | ✅ changed |  |
| 32 | `layout[leadText].closingLink.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 33 | `layout[leadText].closingLink.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 34 | `layout[leadText].closingLink.type` | `"page"` → `"section"` | ✅ changed |  |
| 35 | `layout[leadText].closingLink.type` | `"page"` → `"url"` | ✅ changed |  |
| 36 | `layout[leadText].closingLink.newTab` | `null` → `true` | ✅ changed |  |
| 37 | `layout[linkTiles].gradientTitle` | `false` → `true` | ✅ changed |  |
| 38 | `layout[linkTiles].tileStyle` | `"standard"` → `"tall"` | ✅ changed |  |
| 39 | `layout[linkTiles].tileStyle` | `"standard"` → `"numbered"` | ✅ changed |  |
| 40 | `layout[linkTiles].hideSection` | `false` → `true` | ✅ changed |  |
| 41 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 42 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"url"` | ✅ changed |  |
| 43 | `layout[linkTiles].tiles[].link.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 44 | `layout[ctaBanner].useDefault` | `true` → `false` | ✅ changed |  |
| 45 | `layout[ctaBanner].hideSection` | `false` → `true` | ✅ changed |  |
| 46 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 47 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 48 | `layout[ctaBanner].custom.link.type` | `"page"` → `"section"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 49 | `layout[ctaBanner].custom.link.type` | `"page"` → `"url"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 50 | `layout[ctaBanner].custom.link.newTab` | `null` → `true` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |

</details>

<a id="o-about-team"></a>
<details><summary><b>The Team</b> (/about/team): 40 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `true` → `false` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `false` → `true` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"wrap"` → `"oneLine"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"wrap"` → `"fitted"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"section"` → `"page"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 14 | `layout[hero].links[].type` | `"section"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[sectionNav].source` | `"menu"` → `"sections"` | ✅ changed |  |
| 17 | `layout[sectionNav].barStyle` | `"bar"` → `"sticky"` | ➖ no visible change | Expected: the look option only applies to the "sections" source; this menu copies the main menu. |
| 18 | `layout[sectionNav].hideSection` | `false` → `true` | ✅ changed |  |
| 19 | `layout[teamDirectory].showOrgChart` | `true` → `false` | ✅ changed |  |
| 20 | `layout[teamDirectory].showFilter` | `true` → `false` | ✅ changed |  |
| 21 | `layout[teamDirectory].hideSection` | `false` → `true` | ✅ changed |  |
| 22 | `layout[groupScale].showLink` | `true` → `false` | ✅ changed |  |
| 23 | `layout[groupScale].hideSection` | `false` → `true` | ✅ changed |  |
| 24 | `layout[groupScale].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 25 | `layout[groupScale].link.type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 26 | `layout[groupScale].link.newTab` | `null` → `true` | ✅ changed |  |
| 27 | `layout[linkTiles].gradientTitle` | `false` → `true` | ✅ changed |  |
| 28 | `layout[linkTiles].tileStyle` | `"standard"` → `"tall"` | ✅ changed |  |
| 29 | `layout[linkTiles].tileStyle` | `"standard"` → `"numbered"` | ✅ changed |  |
| 30 | `layout[linkTiles].hideSection` | `false` → `true` | ✅ changed |  |
| 31 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 32 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"url"` | ✅ changed |  |
| 33 | `layout[linkTiles].tiles[].link.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 34 | `layout[ctaBanner].useDefault` | `true` → `false` | ✅ changed |  |
| 35 | `layout[ctaBanner].hideSection` | `false` → `true` | ✅ changed |  |
| 36 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 37 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 38 | `layout[ctaBanner].custom.link.type` | `"page"` → `"section"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 39 | `layout[ctaBanner].custom.link.type` | `"page"` → `"url"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 40 | `layout[ctaBanner].custom.link.newTab` | `null` → `true` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |

</details>

<a id="o-about-join"></a>
<details><summary><b>Join Us</b> (/about/join): 65 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `true` → `false` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `false` → `true` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"wrap"` → `"oneLine"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"wrap"` → `"fitted"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"section"` → `"page"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 14 | `layout[hero].links[].type` | `"section"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[sectionNav].source` | `"menu"` → `"sections"` | ✅ changed |  |
| 17 | `layout[sectionNav].barStyle` | `"bar"` → `"sticky"` | ➖ no visible change | Expected: the look option only applies to the "sections" source; this menu copies the main menu. |
| 18 | `layout[sectionNav].hideSection` | `false` → `true` | ✅ changed |  |
| 19 | `layout[leadText].textSize` | `"md"` → `"lg"` | ✅ changed |  |
| 20 | `layout[leadText].textSize` | `"md"` → `"sm"` | ✅ changed |  |
| 21 | `layout[leadText].animation` | `"scrollReveal"` → `"none"` | ✅ changed |  |
| 22 | `layout[leadText].band` | `false` → `true` | ✅ changed |  |
| 23 | `layout[leadText].highlightMode` | `"phrase"` → `"none"` | ✅ changed |  |
| 24 | `layout[leadText].highlightMode` | `"phrase"` → `"tail"` | ✅ changed |  |
| 25 | `layout[leadText].highlightMode` | `"phrase"` → `"words"` | ✅ changed |  |
| 26 | `layout[leadText].diagram` | `"cross"` → `"none"` | ✅ changed |  |
| 27 | `layout[leadText].diagram` | `"cross"` → `"merge"` | ✅ changed |  |
| 28 | `layout[leadText].diagram` | `"cross"` → `"weave"` | ✅ changed |  |
| 29 | `layout[leadText].showDetails` | `true` → `false` | ✅ changed |  |
| 30 | `layout[leadText].showClosing` | `false` → `true` | ✅ changed |  |
| 31 | `layout[leadText].hideSection` | `false` → `true` | ✅ changed |  |
| 32 | `layout[leadText].detailsList[].highlight` | `true` → `false` | ✅ changed |  |
| 33 | `layout[leadText].closingLink.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 34 | `layout[leadText].closingLink.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 35 | `layout[leadText].closingLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 36 | `layout[leadText].closingLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 37 | `layout[leadText].closingLink.newTab` | `null` → `true` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 38 | `layout[statement].style` | `"band"` → `"centered"` | ✅ changed |  |
| 39 | `layout[statement].animation` | `"none"` → `"scrollReveal"` | ✅ changed |  |
| 40 | `layout[statement].showBrandMarks` | `false` → `true` | ➖ no visible change | Expected: brand marks only apply to the centred look. |
| 41 | `layout[statement].hideSection` | `false` → `true` | ✅ changed |  |
| 42 | `layout[openRoles].gradientTitle` | `true` → `false` | ✅ changed |  |
| 43 | `layout[openRoles].showFilter` | `true` → `false` | ✅ changed |  |
| 44 | `layout[openRoles].hideSection` | `false` → `true` | ✅ changed |  |
| 45 | `layout[openRoles].footerLink.appearance` | `"ghost"` → `"primary"` | ✅ changed |  |
| 46 | `layout[openRoles].footerLink.appearance` | `"ghost"` → `"dark"` | ✅ changed |  |
| 47 | `layout[openRoles].footerLink.type` | `"section"` → `"page"` | ✅ changed |  |
| 48 | `layout[openRoles].footerLink.type` | `"section"` → `"url"` | ✅ changed |  |
| 49 | `layout[openRoles].footerLink.newTab` | `null` → `true` | ✅ changed |  |
| 50 | `layout[form].formType` | `"application"` → `"enquiry"` | ✅ changed |  |
| 51 | `layout[form].formType` | `"application"` → `"contact"` | ✅ changed |  |
| 52 | `layout[form].hideSection` | `false` → `true` | ✅ changed |  |
| 53 | `layout[form].asideLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 54 | `layout[form].asideLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 55 | `layout[form].asideLink.newTab` | `null` → `true` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 56 | `layout[form].interestNoteLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 57 | `layout[form].interestNoteLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 58 | `layout[form].interestNoteLink.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 59 | `layout[linkTiles].gradientTitle` | `false` → `true` | ✅ changed |  |
| 60 | `layout[linkTiles].tileStyle` | `"standard"` → `"tall"` | ✅ changed |  |
| 61 | `layout[linkTiles].tileStyle` | `"standard"` → `"numbered"` | ✅ changed |  |
| 62 | `layout[linkTiles].hideSection` | `false` → `true` | ✅ changed |  |
| 63 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"section"` | ✅ changed |  |
| 64 | `layout[linkTiles].tiles[].link.type` | `"page"` → `"url"` | ✅ changed |  |
| 65 | `layout[linkTiles].tiles[].link.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |

</details>

<a id="o-services"></a>
<details><summary><b>Services</b> (/services): 74 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `false` → `true` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `true` → `false` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"fitted"` → `"wrap"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"fitted"` → `"oneLine"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"section"` → `"page"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 14 | `layout[hero].links[].type` | `"section"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[sectionNav].source` | `"sections"` → `"menu"` | ✅ changed |  |
| 17 | `layout[sectionNav].barStyle` | `"sticky"` → `"bar"` | ✅ changed |  |
| 18 | `layout[sectionNav].hideSection` | `false` → `true` | ✅ changed |  |
| 19 | `layout[linkTiles].gradientTitle` | `true` → `false` | ✅ changed |  |
| 20 | `layout[linkTiles].tileStyle` | `"numbered"` → `"standard"` | ✅ changed |  |
| 21 | `layout[linkTiles].tileStyle` | `"numbered"` → `"tall"` | ✅ changed |  |
| 22 | `layout[linkTiles].hideSection` | `false` → `true` | ✅ changed |  |
| 23 | `layout[linkTiles].tiles[].link.type` | `"section"` → `"page"` | ✅ changed |  |
| 24 | `layout[linkTiles].tiles[].link.type` | `"section"` → `"url"` | ✅ changed |  |
| 25 | `layout[linkTiles].tiles[].link.newTab` | `null` → `true` | ✅ changed |  |
| 26 | `layout[leadText].textSize` | `"sm"` → `"lg"` | ✅ changed |  |
| 27 | `layout[leadText].textSize` | `"sm"` → `"md"` | ✅ changed |  |
| 28 | `layout[leadText].animation` | `"scrollReveal"` → `"none"` | ✅ changed |  |
| 29 | `layout[leadText].band` | `true` → `false` | ✅ changed |  |
| 30 | `layout[leadText].highlightMode` | `"none"` → `"tail"` | ➖ no visible change | Expected: the mode/diagram needs its own content (highlight text, diagram items), which this page doesn't have. |
| 31 | `layout[leadText].highlightMode` | `"none"` → `"words"` | ➖ no visible change | Expected: the mode/diagram needs its own content (highlight text, diagram items), which this page doesn't have. |
| 32 | `layout[leadText].highlightMode` | `"none"` → `"phrase"` | ➖ no visible change | Expected: the mode/diagram needs its own content (highlight text, diagram items), which this page doesn't have. |
| 33 | `layout[leadText].diagram` | `"none"` → `"merge"` | ➖ no visible change | Expected: the mode/diagram needs its own content (highlight text, diagram items), which this page doesn't have. |
| 34 | `layout[leadText].diagram` | `"none"` → `"weave"` | ➖ no visible change | Expected: the mode/diagram needs its own content (highlight text, diagram items), which this page doesn't have. |
| 35 | `layout[leadText].diagram` | `"none"` → `"cross"` | ➖ no visible change | Expected: the mode/diagram needs its own content (highlight text, diagram items), which this page doesn't have. |
| 36 | `layout[leadText].showDetails` | `false` → `true` | ➖ no visible change | Expected: the details row has no content on this page. |
| 37 | `layout[leadText].showClosing` | `false` → `true` | ✅ changed |  |
| 38 | `layout[leadText].hideSection` | `false` → `true` | ✅ changed |  |
| 39 | `layout[leadText].closingLink.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 40 | `layout[leadText].closingLink.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 41 | `layout[leadText].closingLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 42 | `layout[leadText].closingLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 43 | `layout[leadText].closingLink.newTab` | `null` → `true` | ➖ no visible change | Expected: "Show a closing line" is off. |
| 44 | `layout[serviceDetail].hideSection` | `false` → `true` | ✅ changed |  |
| 45 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 46 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 47 | `layout[serviceDetail].links[].type` | `"page"` → `"section"` | ✅ changed |  |
| 48 | `layout[serviceDetail].links[].type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 49 | `layout[serviceDetail].links[].newTab` | `null` → `true` | ✅ changed |  |
| 50 | `layout[serviceDetail].hideSection` | `false` → `true` | ✅ changed |  |
| 51 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 52 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 53 | `layout[serviceDetail].links[].type` | `"page"` → `"section"` | ✅ changed |  |
| 54 | `layout[serviceDetail].links[].type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 55 | `layout[serviceDetail].links[].newTab` | `null` → `true` | ✅ changed |  |
| 56 | `layout[serviceDetail].hideSection` | `false` → `true` | ✅ changed |  |
| 57 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 58 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 59 | `layout[serviceDetail].links[].type` | `"page"` → `"section"` | ✅ changed |  |
| 60 | `layout[serviceDetail].links[].type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 61 | `layout[serviceDetail].links[].newTab` | `null` → `true` | ✅ changed |  |
| 62 | `layout[serviceDetail].hideSection` | `false` → `true` | ✅ changed |  |
| 63 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 64 | `layout[serviceDetail].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 65 | `layout[serviceDetail].links[].type` | `"page"` → `"section"` | ✅ changed |  |
| 66 | `layout[serviceDetail].links[].type` | `"page"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 67 | `layout[serviceDetail].links[].newTab` | `null` → `true` | ✅ changed |  |
| 68 | `layout[ctaBanner].useDefault` | `true` → `false` | ✅ changed |  |
| 69 | `layout[ctaBanner].hideSection` | `false` → `true` | ✅ changed |  |
| 70 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 71 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 72 | `layout[ctaBanner].custom.link.type` | `"page"` → `"section"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 73 | `layout[ctaBanner].custom.link.type` | `"page"` → `"url"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 74 | `layout[ctaBanner].custom.link.newTab` | `null` → `true` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |

</details>

<a id="o-our-work"></a>
<details><summary><b>Our Work</b> (/our-work): 30 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `false` → `true` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `true` → `false` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"fitted"` → `"wrap"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"fitted"` → `"oneLine"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[hero].links[].appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 12 | `layout[hero].links[].appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 13 | `layout[hero].links[].type` | `"section"` → `"page"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 14 | `layout[hero].links[].type` | `"section"` → `"url"` | 🛡️ save refused | Correct: the CMS refuses a link type without its target (page / web address). |
| 15 | `layout[hero].links[].newTab` | `null` → `true` | ✅ changed |  |
| 16 | `layout[caseStudyGrid].showFilter` | `true` → `false` | ✅ changed |  |
| 17 | `layout[caseStudyGrid].hideSection` | `false` → `true` | ✅ changed |  |
| 18 | `layout[caseStudyGrid].ctaLink.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: shown inside the open case study (client side). |
| 19 | `layout[caseStudyGrid].ctaLink.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: shown inside the open case study (client side). |
| 20 | `layout[caseStudyGrid].ctaLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: shown inside the open case study (client side). |
| 21 | `layout[caseStudyGrid].ctaLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: shown inside the open case study (client side). |
| 22 | `layout[caseStudyGrid].ctaLink.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 23 | `layout[logoMarquee].hideSection` | `false` → `true` | ✅ changed |  |
| 24 | `layout[ctaBanner].useDefault` | `true` → `false` | ✅ changed |  |
| 25 | `layout[ctaBanner].hideSection` | `false` → `true` | ✅ changed |  |
| 26 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"ghost"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 27 | `layout[ctaBanner].custom.link.appearance` | `"primary"` → `"dark"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 28 | `layout[ctaBanner].custom.link.type` | `"page"` → `"section"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 29 | `layout[ctaBanner].custom.link.type` | `"page"` → `"url"` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |
| 30 | `layout[ctaBanner].custom.link.newTab` | `null` → `true` | ➖ no visible change | Expected: the page uses the site-wide banner, so the custom link isn't shown. |

</details>

<a id="o-contact"></a>
<details><summary><b>Contact</b> (/contact): 25 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[hero].variant` | `"page"` → `"showreel"` | ✅ changed |  |
| 2 | `layout[hero].highlightLastWord` | `true` → `false` | ✅ changed |  |
| 3 | `layout[hero].largerOnPhones` | `false` → `true` | ✅ changed |  |
| 4 | `layout[hero].smallerOnPhones` | `true` → `false` | ✅ changed |  |
| 5 | `layout[hero].headlineSize` | `"fitted"` → `"wrap"` | ✅ changed |  |
| 6 | `layout[hero].headlineSize` | `"fitted"` → `"oneLine"` | ✅ changed |  |
| 7 | `layout[hero].imageStyle` | `"dim"` → `"bright"` | ✅ changed |  |
| 8 | `layout[hero].showScrollCue` | `true` → `false` | ➖ no visible change | Expected: the scroll cue belongs to the showreel banner. |
| 9 | `layout[hero].showBrandMark` | `false` → `true` | ✅ changed |  |
| 10 | `layout[hero].hideSection` | `false` → `true` | ✅ changed |  |
| 11 | `layout[form].formType` | `"contact"` → `"enquiry"` | ✅ changed |  |
| 12 | `layout[form].formType` | `"contact"` → `"application"` | ✅ changed |  |
| 13 | `layout[form].hideSection` | `false` → `true` | ✅ changed |  |
| 14 | `layout[form].interests[].showsNote` | `false` → `true` | ✅ changed |  |
| 15 | `layout[form].asideLink.type` | `"page"` → `"section"` | ✅ changed |  |
| 16 | `layout[form].asideLink.type` | `"page"` → `"url"` | ✅ changed |  |
| 17 | `layout[form].asideLink.newTab` | `null` → `true` | ✅ changed |  |
| 18 | `layout[form].interestNoteLink.type` | `"page"` → `"section"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 19 | `layout[form].interestNoteLink.type` | `"page"` → `"url"` | ➖ no visible change | Expected: Contact-form-only, or shown after an interaction. |
| 20 | `layout[form].interestNoteLink.newTab` | `null` → `true` | ➖ no visible change | CMS-2: "Open in a new tab" is ignored here. |
| 21 | `layout[offices].gradientTitle` | `true` → `false` | ✅ changed |  |
| 22 | `layout[offices].timeZone` | `"Asia/Dubai"` → `"none"` | ✅ changed |  |
| 23 | `layout[offices].timeZone` | `"Asia/Dubai"` → `"Asia/Riyadh"` | ✅ changed |  |
| 24 | `layout[offices].timeZone` | `"Asia/Dubai"` → `"Europe/London"` | ✅ changed |  |
| 25 | `layout[offices].hideSection` | `false` → `true` | ✅ changed |  |

</details>

<a id="o-legal-terms"></a>
<details><summary><b>Legal: Terms</b> (/legal/terms): 10 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[legalDocument].showBrandMark` | `true` → `false` | ✅ changed |  |
| 2 | `layout[legalDocument].hideSection` | `false` → `true` | ✅ changed |  |
| 3 | `layout[legalDocument].sections[].highlight` | `false` → `true` | ✅ changed |  |
| 4 | `layout[legalDocument].sections[].showContactCard` | `false` → `true` | ✅ changed |  |
| 5 | `layout[legalDocument].sections[].showPreferencesButton` | `false` → `true` | ✅ changed |  |
| 6 | `layout[legalDocument].askLink.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 7 | `layout[legalDocument].askLink.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 8 | `layout[legalDocument].askLink.type` | `"page"` → `"section"` | ✅ changed |  |
| 9 | `layout[legalDocument].askLink.type` | `"page"` → `"url"` | ✅ changed |  |
| 10 | `layout[legalDocument].askLink.newTab` | `null` → `true` | ✅ changed |  |

</details>

<a id="o-legal-privacy-policy"></a>
<details><summary><b>Legal: Privacy Policy</b> (/legal/privacy-policy): 10 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[legalDocument].showBrandMark` | `true` → `false` | ✅ changed |  |
| 2 | `layout[legalDocument].hideSection` | `false` → `true` | ✅ changed |  |
| 3 | `layout[legalDocument].sections[].highlight` | `false` → `true` | ✅ changed |  |
| 4 | `layout[legalDocument].sections[].showContactCard` | `false` → `true` | ✅ changed |  |
| 5 | `layout[legalDocument].sections[].showPreferencesButton` | `false` → `true` | ✅ changed |  |
| 6 | `layout[legalDocument].askLink.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 7 | `layout[legalDocument].askLink.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 8 | `layout[legalDocument].askLink.type` | `"page"` → `"section"` | ✅ changed |  |
| 9 | `layout[legalDocument].askLink.type` | `"page"` → `"url"` | ✅ changed |  |
| 10 | `layout[legalDocument].askLink.newTab` | `null` → `true` | ✅ changed |  |

</details>

<a id="o-legal-cookies"></a>
<details><summary><b>Legal: Cookies</b> (/legal/cookies): 10 option changes</summary>

| # | Field | From → to | Result | Note |
|---|---|---|---|---|
| 1 | `layout[legalDocument].showBrandMark` | `true` → `false` | ✅ changed |  |
| 2 | `layout[legalDocument].hideSection` | `false` → `true` | ✅ changed |  |
| 3 | `layout[legalDocument].sections[].highlight` | `false` → `true` | ✅ changed |  |
| 4 | `layout[legalDocument].sections[].showContactCard` | `false` → `true` | ✅ changed |  |
| 5 | `layout[legalDocument].sections[].showPreferencesButton` | `false` → `true` | ✅ changed |  |
| 6 | `layout[legalDocument].askLink.appearance` | `"primary"` → `"ghost"` | ✅ changed |  |
| 7 | `layout[legalDocument].askLink.appearance` | `"primary"` → `"dark"` | ✅ changed |  |
| 8 | `layout[legalDocument].askLink.type` | `"page"` → `"section"` | ✅ changed |  |
| 9 | `layout[legalDocument].askLink.type` | `"page"` → `"url"` | ✅ changed |  |
| 10 | `layout[legalDocument].askLink.newTab` | `null` → `true` | ✅ changed |  |

</details>

### C. Shared content (API): Header & footer and one item per collection

Every non-empty text field of the item was given a marker in one save. The pages that use it were then timed and checked, and the item restored.

| Item | Fields | Pages checked → time to show | Restored identical |
|---|---|---|---|
| global:site-settings | 27 | /contact ✅ 1.0s · /legal/terms ✅ 1.1s · /legal/privacy-policy ✅ 1.1s · /our-work ✅ 1.1s · /services ✅ 1.1s · /about ✅ 1.1s · /about/team ✅ 1.1s · / ✅ 1.1s | ✅ |
| collection:case-studies:4 | 16 | / ✅ 0.3s · /our-work ✅ 0.3s | ✅ |
| collection:partners:1 | 1 | /our-work ✅ 0.2s · / ✅ 0.2s | ✅ |
| collection:team-members:1 | 5 | /about/team ✅ 0.2s | ✅ |
| collection:roles:1 | 2 | /about/join ✅ 0.2s | ✅ |

Field by field: Header & footer, all 27 fields visible. Partner, team member and open role: all fields visible.

Case study (EA Sports): the tile fields are visible on Home and Our Work. The full case study fields (market, year, brief, approach, results ×3, photo and film captions, search description) are drawn when the overlay opens, so I checked them in Chrome with `/our-work#case-ea-sports-fifa-world-cup` open: all 11 showed, and the browser description updated.

### D. Revalidation scenarios (API and admin)

"Warm" means the page under test was loaded into the cache before the change, which is how a real visitor would hit it. A result measured right after a site-wide refresh can pass by accident: I re-ran the rename and media tests warm, and the table below shows the warm results.

| Scenario | Result | Time / detail |
|---|---|---|
| Media alt text change shows on a page using it (/about, bridge.webp) | ❌ | not after 20s (48 req) |
|   …shows after re-publishing the page | ✅ | 0.2s 1req MISS |
| Media focal point change shows (object-position) | ❌ | not after 20s (48 req) |
| Media restored | ✅ | alt/focal back (fx was 50) |
| Partner logo: create shows on Home | ✅ | 0.2s 1req MISS |
| Partner logo: delete removes it from Home | ❌ | not after 20s (48 req) |
| Team member: create shows on The Team | ✅ | 0.4s 1req MISS |
| Team member: delete removes it from The Team | ❌ | not after 20s (48 req) |
| Partner logo: changing the order changes the strip | ✅ | 0.4s 1req MISS (Intel after Sony) |
| Open role: create shows on Join Us (list + form role dropdown) | ✅ | 0.2s 1req MISS |
| Open role: switching "Show on the website" off hides it | ✅ | 0.2s 1req MISS |
| Open role: delete removes it from Join Us | ❌ | not after 20s |
| Case study: create shows on Our Work | ✅ | 0.5s 1req MISS |
| Case study: delete removes it from Our Work | ❌ | not after 20s |
|   …deleted case study tile still opens its overlay data | ✅ | html still contains its slug |
| Change a slug: page is served at the new URL | ✅ | 0.1s 1req MISS |
| Change a slug: old URL no longer serves the page | ✅ | status 404 MISS |
| Change a slug: links on other pages (header menu, buttons) point to the new URL | ❌ | not after 20s (48 req) |
|   …/about still links to | ❌ | "/services" x3, "/qz-services" x0 |
| Change a slug: sitemap lists the new URL | ✅ | sitemap checked |
| Slug restored: /services served again | ✅ | 0.3s 1req MISS |
| Slug restored: temporary URL gone | ✅ | status 404 |
| Save as draft: live page unchanged | ✅ | checked 3s later (MISS) |
| Preview link with a wrong secret is refused | ✅ | status 403 |
| Publish the draft: live page updates | ✅ | 0.2s 1req MISS |
| Unpublish a page: it stops being served | ❌ | not after 20s (48 req) |
|   …status still | ❌ | 200 |
| Re-publish: served again | ✅ | 0.5s 1req MISS |
| Create and publish a new page: served at its URL | ✅ | 0.1s 1req MISS |
| New page: in the sitemap | ✅ |  |
| Delete a page: its URL stops being served | ✅ | 0.1s 1req MISS |
| Forward to: changing the target changes the redirect | ✅ | 0.2s 1req MISS |
| Forward to restored | ✅ | 0.2s 1req MISS |
| Rename a parent page (cached child): child breadcrumb / "Back to" updates | ✅ | 0.1s 1req MISS |
|   …second child (The Team) | ✅ | 0.1s 1req MISS |
| Rename a legal page (cached others): switcher on the other legal pages updates | ❌ | not after 20s |

### E. Admin UI checks (Claude in Chrome)

| Page / item | What I did in the admin | Live result |
|---|---|---|
| Home | Headline typed (autosaved draft): live site unchanged, live preview showed it and followed further typing (about 3 s). Then: removed a list row, moved the KFC tile up, turned "Show a button" off, moved the Brand statement section up, Animation → Fade in, brand marks off → Publish | ✅ 0.4 s: headline, tile order, no button, section order, fade look, no marks |
| Home | Section settings → Hide this section → Publish (the first click fell in the autosave window, CMS-4) | ✅ 0.4 s: section gone |
| Home | Versions → 11:08 PM version → Restore this version → Confirm | ✅ about 1.5 s, content identical to the snapshot |
| About | Headline + "Show the last word in orange" off → Publish | ✅ 0.4 s: new headline, no orange word |
| Our Story, The Team, Join Us, Services, Contact | Banner headline → Publish | ✅ 0.4–0.6 s each |
| Our Work | Banner headline → Publish (first click during autosave was ignored, CMS-4; second worked) | ✅ 0.5 s |
| Legal: Cookies | Document title, brand mark off, "Version" fact moved up → Publish | ✅ 0.4 s: title and fact order |
| Legal: Terms, Privacy Policy | Document title → Publish | ✅ 0.5–0.6 s |
| Header & footer | Copyright line → Save | ✅ 0.9 s on all 5 checked pages |
| Open roles | Job title + description → Save; then "Show on the website" off → Save | ✅ 0.4–0.5 s; hidden at 0.2 s |
| Images & videos | `bridge.webp` alt text → Save (About cached) | ❌ not after 30 s (REVAL-1) |
| Our Story | Schedule Publish → Publish at 11:45 PM (listed under Upcoming Events) | ❌ not published by 11:48:48 PM (REVAL-6) |
| Editor account | Dashboard and `/admin/collections/users` | ✅ no Users menu; Users "Not Found" |

### Re-test after fix #2 (REVAL-3, 4, 5)

Production build, every page warmed to a cache HIT before each change, API changes made the way the admin makes them (autosave draft, then Publish; Unpublish = save without draft). Everything was undone and the database restored from a backup afterwards.

| Check | Result | Time / detail |
|---|---|---|
| Draft save: live page unchanged | ✅ | save 200, /services HIT |
| Draft save: other pages stay cached (no site-wide refresh) | ✅ | /about HIT |
| Content publish: page updates | ✅ | 0.6s, 1 request(s), cache MISS |
| Content publish: other pages stay cached | ✅ | /about HIT |
| REVAL-3: /about links follow the new URL | ✅ | 0.2s, 1 request(s), cache MISS |
| REVAL-3: Home links follow the new URL | ✅ | 0.2s, 1 request(s), cache MISS |
| REVAL-3: new URL works | ✅ | 0.2s, 1 request(s), cache MISS |
| REVAL-3: old URL is 404 | ✅ | 0.1s, 1 request(s), cache MISS |
| REVAL-3: links back after undo | ✅ | 0.1s, 1 request(s), cache MISS |
| REVAL-4: unpublished page is 404 | ✅ | 0.1s, 1 request(s), cache MISS |
| REVAL-4: other pages refreshed (site-wide) | ✅ | 0.1s, 1 request(s), cache MISS |
| REVAL-4: not in sitemap | ✅ | sitemap checked |
| REVAL-4: republish brings it back | ✅ | 0.2s, 1 request(s), cache MISS |
| REVAL-5: draft rename not live | ✅ | /legal/privacy-policy HIT |
| REVAL-5: switcher on Privacy Policy shows new name | ✅ | 0.1s, 1 request(s), cache MISS |
| REVAL-5: switcher on Cookies shows new name | ✅ | 0.1s, 1 request(s), cache MISS |
| REVAL-5: name back after undo | ✅ | 0.1s, 1 request(s), cache MISS |
| Restored services | ✅ | identical |
| Restored terms | ✅ | identical |
| Restored story | ✅ | identical |

The draft and content-only checks confirm the fix keeps caching tight: autosaves refresh nothing, and publishing ordinary content refreshes only that page.

### Re-test after fix #3 (REVAL-2)

Production build. For each kind of item: create a test item, check it shows, load the pages until they are cached (HIT), delete it through the API (what the admin **Delete** does), and time until it is gone. The database was restored from a backup afterwards.

| Check | Result | Time / detail |
|---|---|---|
| Partner logo: create shows on / | ✅ | 0.9s, 1 request(s), cache MISS |
| Partner logo: create shows on /our-work | ✅ | 0.2s, 1 request(s), cache MISS |
| Partner logo: delete removes it from / (warm cache: / HIT, /our-work HIT) | ✅ | 0.2s, 1 request(s), cache MISS |
| Partner logo: delete removes it from /our-work (warm cache: / HIT, /our-work HIT) | ✅ | 0.1s, 1 request(s), cache MISS |
| Team member: create shows on /about/team | ✅ | 0.2s, 1 request(s), cache MISS |
| Team member: delete removes it from /about/team (warm cache: /about/team HIT) | ✅ | 0.2s, 1 request(s), cache MISS |
| Open role: create shows on /about/join | ✅ | 0.2s, 1 request(s), cache MISS |
| Open role: delete removes it from /about/join (warm cache: /about/join HIT) | ✅ | 0.2s, 1 request(s), cache MISS |
| Case study: create shows on /our-work | ✅ | 0.2s, 1 request(s), cache MISS |
| Case study: delete removes it from /our-work (warm cache: /our-work HIT) | ✅ | 0.1s, 1 request(s), cache MISS |
| Item counts back to before | ✅ | {"partners":6,"team-members":11,"roles":6,"case-studies":8} |

## Fix log

| # | Date | Issue | Change | Files | Re-tested |
|---|---|---|---|---|---|
| 1 | 2026-11-17 | — | Test run and report created. No code changes | `docs/cms-revalidation-test.md` | — |
| 2 | 2026-11-18 | REVAL-3, REVAL-4, REVAL-5 | Pages compare the page's live (main) record before and after each save. A first publish, unpublish, URL/parent change, rename or new forwarding refreshes the whole site; a content-only publish refreshes that page; draft saves refresh nothing. Deleting a published page also refreshes the whole site | `web/src/collections/Pages/revalidate.ts`, `web/src/collections/Pages/index.ts` | ✅ 20/20 checks, 0.1–0.6 s |
| 4 | 2026-11-19 | REVAL-6, CMS-6 | Pages: `schedulePublish` removed. Users: `role` defaults to `admin` and is hidden in the admin UI. Migration `20261119_174010_users_admin_default_no_scheduling` drops the unused `payload_jobs` tables and changes the default | `web/src/collections/Pages/index.ts`, `web/src/collections/Users.ts`, `web/src/migrations/` | ✅ user created without a role → admin; user form shows Email, Password, Name only; page "Publish changes" has no schedule option (headless Chrome, dev) |
| 5 | 2026-11-20 | REVAL-1, CMS-1, CMS-2, CMS-3, CMS-5 (+ CMS-4 tip) | Media refreshes the site when edited or deleted; linked pages only bring title/slug/path/breadcrumbs; "Open in a new tab" honoured in 6 more places; legal tag note conditional; breadcrumbs hidden in the admin. Done with the E2E fix #3 (see `e2e-test-plan.md`) | `collections/Media.ts`, `lib/revalidate.ts`, `collections/Pages/index.ts`, `lib/links.ts`, `CardCarousel`, `LinkTiles`, `CaseStudyGrid`, `Form`, `SectionNav`, `blocks/context.ts`, `LegalDocument/config.ts` | ✅ REVAL-1 on the first request; page weight re-measured; layout identical at 1440/1000/375; no Breadcrumbs in the page form (production build, headless Chrome) |
| 3 | 2026-11-18 | REVAL-2 | New `revalidateSiteAfterDelete` hook refreshes the whole site, registered as `afterDelete` on Partners, Team members, Open roles and Case studies | `web/src/lib/revalidate.ts`, `web/src/collections/{Partners,TeamMembers,Roles,CaseStudies}.ts` | ✅ 11/11 checks, 0.1–0.2 s |

## Restore (what was put back after testing)

Every test change was reverted right after its check, and the whole local state was then restored from the backup taken before testing:

- **Database**: `web/.postgres` restored from the backup. That covers all content, the version history added by the tests, the editor name changed by the access check, and the Contact page deleted by the editor check (CMS-6).
- **Media**: `web/media` restored.
- **Build output**: `web/.next` restored.
- **Processes**: the database and the dev server were restarted.

Then the "before" values were compared (see the restore check in the session notes): 12 pages, 8 case studies, 6 partner logos, 11 team members, 6 roles, 41 media files with the same checksum, the Home headline, the footer and legal links, and the first open role.
