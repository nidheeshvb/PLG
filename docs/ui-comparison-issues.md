# UI comparison: prototype vs website

Last updated: 2026-11-17

This report compares every page of the static prototype (the visual source of truth) with the Next.js website, at five screen widths. Use it to check each result and fix the issues one at a time. When an issue is fixed, set its **Status** to Fixed and re-measure that page.

- **Prototype**: http://localhost:8000 (repo-root `*.html`, served by the `plg-site` launch config)
- **Website**: http://localhost:3000 (`web/`, `npm run dev`)
- **Widths**: Desktop 1440 · Small desktop 1280 · Tablet landscape 1024 · Tablet portrait 768 · Mobile 375
- **How it was measured** (Claude in Chrome):
  - Each page is loaded in a hidden iframe of exactly that width, so the page's media queries see the real width.
  - After 2.5s, the script records, for every direct child of `<main>`, its top and its height.
  - It also records the footer height, the total page height and the size of every button in `<main>`.
  - Prototype and website are measured the same way. A difference of more than 1px counts as a mismatch.
  - Where numbers match, the layout is the same. Colours, images and hover effects need the screenshot or "Checked" notes.
- **Progress**: the issue table below shows each issue's status (Open → In progress → Fixed, re-measured). The **Fix log** at the end of the issues section records every change with the date, the files changed and the re-measure result. The summary grid and full results are regenerated after each fix, so they always show the latest measurements.
- **Not covered by numbers**: colours, text content, hover/animation timing. Those are listed under each page's "Checked" note when I looked at them.

## Summary

✅ = every section top/height, the total page height and the button sizes match (±1px). ❌ = something differs: see the issues and the full results.

| Page | Desktop 1440 | Small desktop 1280 | Tablet landscape 1024 | Tablet portrait 768 | Mobile 375 | Issues |
|---|---|---|---|---|---|---|
| [Home](#home) | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| [About](#about) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Our Story](#our-story) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [The Team](#team) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Join Us](#join) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Services](#services) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Our Work](#our-work) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Our Work: case study view](#case-study) | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| [Contact](#contact) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Legal: Terms & Conditions](#terms) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Legal: Privacy Policy](#privacy) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |
| [Legal: Cookies](#cookies) | ✅ | ✅ | ✅ | ✅ | ✅ | FOOT-2 |

## Issues to fix

| ID | Status | Pages | Widths | Summary |
|---|---|---|---|---|
| [FOOT-1](#foot-1) | ✅ **Fixed** (re-measured) | All inner pages (every page except Home) | all | Footer uses Home's compact style; inner prototype pages have a larger footer with a top border |
| [FOOT-2](#foot-2) | Open (to decide, in [backlog](backlog.md) #5) | All inner pages | all | Legal link wording differs between prototype pages |
| [CONTACT-1](#contact-1) | ✅ **Fixed** (re-measured) | Contact | 1440 | Interest chips wrap into one row fewer: the enquiry section is 52px shorter |
| [GLOB-1](#glob-1) | ✅ **Fixed** (re-measured) | All (pseudo-elements) | all | Reset makes `::before`/`::after` border-box; the prototype leaves them content-box (cause of CONTACT-1) |
| [LEGAL-1](#legal-1) | ✅ **Fixed** (re-measured) | Terms, Privacy Policy, Cookies | ≤900 (visible at 768) | Button labels are 18px on phones/tablets; the prototype uses 16px like every other inner page |
| [GLOB-2](#glob-2) | ✅ **Fixed** (checked) | All inner pages | all | Reveal animation: the prototype shows on-screen-at-load elements instantly, the app animates every one |

**Progress (2026-11-17):**
- **Fixed and re-measured, in this order**: FOOT-1 → LEGAL-1 → GLOB-1 (which also fixed CONTACT-1) → GLOB-2.
- **After the last fix**, every page and the case study view match the prototype at all five widths.
- **Still open**: **FOOT-2**, a content decision for PLG on the legal link wording. Nothing to fix in code.

<a id="foot-1"></a>
### FOOT-1: inner pages need the larger footer

- **Status**: ✅ Fixed on 2026-11-17 and re-measured: every inner page's footer and total page height now match at all five widths. See the fix log.
  - **What changed**:
    - The prototype's inner-page footer is now the default (`Footer.module.css`).
    - Home's compact footer applies when the page starts with the showreel banner: `main:has([data-hero='showreel'])`, an attribute set in `ShowreelHero.tsx`.
    - Side padding follows the page gutter (72/48/24px), like six of the seven inner prototype pages. Only about.html uses 84/85px.
    - Copyright and legal link colour is `#6a6d68`, like those six pages; about.html uses `#888`.
  - **Not changed**: the legal link wording, see [FOOT-2](#foot-2).

  Original finding below.
- **Pages**: every inner page: About, Our Story, The Team, Join Us, Services, Our Work, Contact, and the 3 Legal pages. Home is correct.
- **Widths**: all. App minus prototype, total page height:

  | Width | Total height diff |
  |---|---|
  | 1440 | −47px |
  | 1280 | −46px |
  | 1024 | −10px |
  | 768 | −55px |
  | 375 | −85px |

  Every section in `<main>` matches, so the whole difference is the footer.
- **What's different** (About at 1440):
  - **Footer height**: prototype 118px, app 71px.
  - **Footer text**: prototype links are 16px with 30px line height, gap 40px; the app uses 14px/24px, gap 28px.
  - **Copyright and legal links**: prototype 16px/30px, app 13px/24px.
  - **Social icons**: prototype 30px, app 24px.
  - **Gaps**: prototype row gap `16px 24px`, app `12px 20px`.
  - **Border**: the prototype has a 1px `#eee` top border, the app has none.
  - **Layout**: in the prototype, the larger type wraps the footer onto two lines at 1440; the app stays on one line.
  - **Phones (≤900px)**:
    - prototype: copyright 14px, nav and legal links 16px;
    - app: copyright 12px, nav 14px, legal links 12px.
- **Cause**:
  - `index.html:543-550` is a Home-only override ("smaller type so logo, links, social… sit on one row").
  - `web/src/components/layout/Footer/Footer.module.css` ported that override for every page.
  - The inner pages (`about.html:335-347`, `team.html:167-179` and the others) have the base rules only, plus `border-top:1px solid #eee`.
  - On inner pages other than About, the footer padding is `padding-block:14px 13px` with `.wrap` gutters instead of `84px/85px`.
- **Suggested fix**: make the inner-page footer the default and Home's compact one a variant. Possible approaches:
  - the existing `main:has(PageHero)` pattern (already used for `--btn-label`, see CLAUDE.md gotchas),
  - a `compact` prop set by the layout when the path is `/`.

  Then re-measure every page.

<a id="foot-2"></a>
### FOOT-2: legal link wording in the footer

- **Status**: Closed 2026-11-19: keep the Home/About wording (matches the approved design; PLG can change it in the CMS). Was backlog item 5: [backlog-footer-legal-wording.md](backlog-footer-legal-wording.md).
- **What's different**:
  - `index.html` and `about.html` say "Privacy · Terms & Conditions · Cookies".
  - `team.html` (and the other later inner pages) say "Privacy Policy · Terms and Conditions · Cookies".
  - The app shows the Home wording everywhere. These labels come from **Site settings → Footer → Legal links**, so the wording is editable, not a bug.
- **Layout effect** (found while fixing FOOT-1): at 1440 and below, both wordings give the same footer height. In wider windows they don't. At 1536px:
  - `team.html` (long wording) wraps the legal links onto a second line;
  - `about.html` and the website (short wording) fit everything on one line.
- **Suggested action**: pick one wording with PLG. Six of the seven later inner prototype pages use "Privacy Policy · Terms and Conditions", so that's the likely intended one. If so, change the two labels in **Site settings → Footer → Legal links** (and in the seed), then re-check the footer at 1536+.

<a id="contact-1"></a>
### CONTACT-1: Contact interest chips wrap differently at 1440

- **Status**: ✅ Fixed on 2026-11-17 by the GLOB-1 change, and re-measured.
  - All 10 chips now have the prototype's widths and positions (first chip 330px, 6 rows).
  - The enquiry section is 1142px and the page 2840px at 1440, both the same as the prototype.

  Original finding below.
- **Page / width**: Contact (`/contact`), Desktop 1440. 1280 and smaller match.
- **Numbers**: the enquiry section is 1142px in the prototype and 1090px in the app (−52px). The chip box is 300 vs 248px: 6 rows of chips vs 5.
- **What's different**:
  - Every chip is 2px narrower in the app ("Bring a brand, rights or IP into the UAE": 330 → 328px).
  - In the prototype, the first two chips don't fit on one line (330+10+343 = 683 > 681px). In the app they do (328+10+341 = 679), so everything below moves up a row.
- **Cause**: [GLOB-1](#glob-1). The chip's 14px circle (`.chip span::before`, `web/src/blocks/Form/Contact.module.css:233`) has a 1px border. In the prototype it's content-box, so 16px wide; in the app it's border-box, so 14px wide.
- **Suggested fix**: fix GLOB-1, or locally add `box-sizing: content-box` to `.chip span::before`. Re-measure Contact at all widths.

<a id="legal-1"></a>
### LEGAL-1: Legal page button labels on phones and tablets

- **Status**: ✅ Fixed on 2026-11-17 and re-measured.
  - **Change**: `web/src/blocks/LegalDocument/Component.module.css` sets `--btn-label: 16px` on `main:has(.lhero)` at ≤900px, the same way PageHero does for the other inner pages.
  - **Checked**: all buttons on the three pages have 16px labels at 768 and 375 and 18px at 1440. "Manage Cookie Preferences" at 768 is 335px, the same as the prototype.

  Original finding below.
- **Pages / widths**: `/legal/terms`, `/legal/privacy-policy`, `/legal/cookies`, at ≤900px.
- **Numbers**:
  - At 768, "Manage Cookie Preferences" is 367px wide in the app and 335px in the prototype; the label is 18px vs 16px.
  - At 375 the buttons are full-width, so the widths match but the label is still 18px. The same goes for "Contact Us" (the "Questions?" box) on all three pages.
- **Cause**:
  - The prototype gives every inner page `.btn__label{font-size:16px}` at ≤900.
  - The app does this through `--btn-label: 16px` set by `main:has(.hero)` in `web/src/blocks/Hero/variants/PageHero.module.css:259-263`.
  - Legal pages have no PageHero: the `legalDocument` block renders its own header, so the variable is never set.
- **Suggested fix**: also set `--btn-label: 16px` for pages with a `legalDocument` block, e.g. the same `:global(main):has(.lhero)` rule in the legal block's CSS module. Then re-measure the three legal pages at 768 and 375.

<a id="glob-1"></a>
### GLOB-1: `::before` / `::after` box-sizing

- **Status**: ✅ Fixed on 2026-11-17 and re-measured.
  - **Change**: `web/src/styles/base.css` now resets `*` only, like the prototype.
  - **Affected elements**: a scan of every CSS module found two pseudo-elements with a size and a border or padding. Both now match the prototype:
    - the Contact chip circle;
    - the Our Story lane dots (`LeadText .lane::after`, now content-box: 12px + border, same as the prototype).
  - **Re-measure**: all 11 pages × 5 widths match the prototype.

  Original finding below.
- **What's different**:
  - The prototype reset is `*{box-sizing:border-box;margin:0;padding:0}` (e.g. `contact.html:38`), so pseudo-elements keep the browser default, content-box.
  - The app reset (`web/src/styles/base.css:2-8`) is `*, *::before, *::after { box-sizing: border-box; … }`.
  - So any pseudo-element that has a width/height **and** a border or padding is smaller in the app.
- **Seen so far**: Contact chips ([CONTACT-1](#contact-1)), the only one that changed a section height. Others may differ by 1–2px without changing section heights (icons, dots, underlines).
- **Suggested fix**: match the prototype by removing `*::before, *::after` from the reset rule (keep margin/padding reset on `*`). Then re-measure **every** page at all widths (this report) to confirm nothing else moved.
  - If something else breaks, fall back to the local fix in CONTACT-1.

<a id="glob-2"></a>
### GLOB-2: reveal animation on elements visible at load (inner pages)

- **Status**: ✅ Fixed on 2026-11-17 and checked.
  - **Inner pages**:
    - `[data-reveal]` elements on screen at load now show straight away;
    - elements below the fold get `.pre` (hidden at once) and animate in when scrolled to;
    - threshold `.12`, all as in the prototype's inner pages.
  - **Home** keeps hiding every reveal element until it scrolls in (threshold `.15`), like index.html.
  - **Files**: `web/src/components/ui/RevealObserver.tsx`, `web/src/styles/base.css`.
  - **Specificity**: the hidden-state selectors use `:where()`, so their specificity is unchanged and block overrides still win.
  - **Checked** (1440×900):
    - Contact: eyebrow and title visible at load (opacity 1, no transform), the same as `contact.html`; lede and list hidden with `.pre`. After scrolling, they get `.in` and fade in.
    - The Team: the intro is visible, the person cards are hidden until scrolled to.
    - Home: hidden until scrolled, unchanged.
    - Full re-measure afterwards: see the fix log.
  - **Known limitation**: if React re-renders a hidden element before it scrolls into view, it can lose `.pre` and simply show, without the animation. Same as `.in` today (CLAUDE.md gotcha).

  Original finding below.
- **What's different**:
  - **Prototype inner pages** (`about.html`, `contact.html`, `join.html`, `our-story.html`, `our-work.html`, `services.html`, `team.html`, e.g. `contact.html:705-706`): only elements **below the fold at load** get `.pre` (hidden) and animate in. Anything already on screen shows straight away. Observer threshold `.12`.
  - **App** (`web/src/components/ui/RevealObserver.tsx`, `web/src/styles/base.css:75-86`): every `[data-reveal]` element starts hidden and animates in when observed, including those already on screen. Threshold `.15`. This matches the Home prototype (`index.html:347`), not the inner pages.
- **Effect**: on a short screen, a section that starts inside the first view loads hidden and then slides up in the app, where the prototype shows it immediately. Example: Contact at 1440×900, where the enquiry heading starts at 840px. The heroes look the same in both (screenshot at 1067×687).
- **Suggested fix**: decide whether to match. If yes:
  - in `RevealObserver`, on inner pages (not Home), add `.in` straight away to elements whose top is ≤ the viewport height at load;
  - use threshold `.12`.

## Fix log

Newest last. Each entry: what changed, files, and the re-measure result.

| # | Date | Issue | Change | Files | Re-measured |
|---|---|---|---|---|---|
| 1 | 2026-11-17 | — | Comparison report created (all pages, 5 widths) | `docs/ui-comparison-issues.md` | — |
| 2 | 2026-11-17 | FOOT-1 | Inner-page footer is now the default; Home's compact footer switches on via `main:has([data-hero='showreel'])` | `web/src/components/layout/Footer/Footer.module.css`, `web/src/blocks/Hero/variants/ShowreelHero.tsx` | ✅ All 11 pages × 5 widths. Inner footers 118/118/118/243/273px = prototype; Home unchanged (71/71/107/188/188). Totals match everywhere except Contact 1440 (CONTACT-1, unrelated) |

| 3 | 2026-11-17 | LEGAL-1 | 16px button labels on phones/tablets for pages with a legal document | `web/src/blocks/LegalDocument/Component.module.css` | ✅ Terms, Privacy Policy, Cookies × 5 widths match; labels 16px at 768/375, 18px at 1440 |
| 4 | 2026-11-17 | GLOB-1 / CONTACT-1 | Reset no longer forces border-box on `::before`/`::after` (prototype reset). Only two pseudo-elements in the code are affected: Contact chip circle and the Lead paragraph lane dot (`LeadText .lane::after`) | `web/src/styles/base.css` | ✅ Contact 1440 chips identical to the prototype (6 rows); enquiry 1142px, page 2840px. Full re-measure: all 11 pages × 5 widths match the prototype (sections, buttons, footer, totals) |
| 5 | 2026-11-17 | GLOB-2 | Inner pages show reveal elements that are on screen at load straight away; below-the-fold ones get `.pre` and animate in (threshold .12). Home unchanged | `web/src/components/ui/RevealObserver.tsx`, `web/src/styles/base.css` | ✅ Behaviour checked on Contact, The Team, Home (see GLOB-2). Final full re-measure: **all 11 pages × 5 widths match the prototype** (sections, buttons, footer, totals) |

## Known intentional differences (not bugs)

- **Legal**: the prototype is one page with `#terms`, `#privacy-policy` and `#cookies` tabs. The website has three real pages (`/legal/terms`, …) that link to each other.
- **Contact**: no call-to-action banner, as in the prototype.
- **Hydration warning in the console** (`fdprocessedid` on form fields): a form-filling browser extension in the test Chrome profile adds these. Not a website bug.
- **Section names**: the app's `<main>` children carry CSS-module class names (e.g. `PageHero.hero`) where the prototype has ids or plain classes. Only the sizes are compared.

## Full results, page by page

Every section of `<main>`, in order. Numbers are `top / height` in px (top measured from the top of the page). Δ = app − prototype. Total = full page height, so it includes the header and footer, which sit outside `<main>`. Buttons = width×height of every button in `<main>`, in order.

<a id="home"></a>
### Home

Prototype `/index.html` · App `/`

**Checked**:
- Every section, the total page height and all 7 buttons match at all five widths.
- The footer matches too: Home is the one page that uses the compact footer, and it was re-measured after the FOOT-1 fix (71/71/107/188/188px, unchanged).
- The prototype footer heights in the table were worked out from the identical page totals, not measured separately.
- No issues.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 859 | 0 / 859 | 0 / 0 | ✅ |
| 2 | about | 859 / 599 | 859 / 599 | 0 / 0 | ✅ |
| 3 | services | 1458 / 738 | 1458 / 738 | 0 / 0 | ✅ |
| 4 | stack | 2197 / 1800 | 2197 / 1800 | 0 / 0 | ✅ |
| 5 | stats | 3997 / 880 | 3997 / 880 | 0 / 0 | ✅ |
| 6 | logos | 4877 / 226 | 4877 / 226 | 0 / 0 | ✅ |
| 7 | work | 5103 / 3064 | 5103 / 3064 | 0 / 0 | ✅ |
| 8 | statement | 8166 / 487 | 8166 / 487 | 0 / 0 | ✅ |
| 9 | contact | 8652 / 702 | 8652 / 702 | 0 / 0 | ✅ |
| | Footer height (outside main) | 71 | 71 | 0 | ✅ |
| | **Total page height** | 9426 | 9426 | 0 | ✅ |

Buttons: ✅ same. Prototype `270x44,192x44,197x52,197x52,278x52,218x52,185x52` · App `270x44,192x44,197x52,197x52,278x52,218x52,185x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 859 | 0 / 859 | 0 / 0 | ✅ |
| 2 | about | 859 / 547 | 859 / 547 | 0 / 0 | ✅ |
| 3 | services | 1406 / 738 | 1406 / 738 | 0 / 0 | ✅ |
| 4 | stack | 2144 / 1800 | 2144 / 1800 | 0 / 0 | ✅ |
| 5 | stats | 3944 / 880 | 3944 / 880 | 0 / 0 | ✅ |
| 6 | logos | 4824 / 226 | 4824 / 226 | 0 / 0 | ✅ |
| 7 | work | 5050 / 2788 | 5050 / 2788 | 0 / 0 | ✅ |
| 8 | statement | 7838 / 487 | 7838 / 487 | 0 / 0 | ✅ |
| 9 | contact | 8324 / 702 | 8324 / 702 | 0 / 0 | ✅ |
| | Footer height (outside main) | 71 | 71 | 0 | ✅ |
| | **Total page height** | 9098 | 9098 | 0 | ✅ |

Buttons: ✅ same. Prototype `270x44,192x44,197x52,197x52,278x52,218x52,185x52` · App `270x44,192x44,197x52,197x52,278x52,218x52,185x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 859 | 0 / 859 | 0 / 0 | ✅ |
| 2 | about | 859 / 1172 | 859 / 1172 | 0 / 0 | ✅ |
| 3 | services | 2031 / 896 | 2031 / 896 | 0 / 0 | ✅ |
| 4 | stack | 2927 / 1825 | 2927 / 1825 | 0 / 0 | ✅ |
| 5 | stats | 4752 / 880 | 4752 / 880 | 0 / 0 | ✅ |
| 6 | logos | 5632 / 226 | 5632 / 226 | 0 / 0 | ✅ |
| 7 | work | 5858 / 977 | 5858 / 977 | 0 / 0 | ✅ |
| 8 | statement | 6836 / 487 | 6836 / 487 | 0 / 0 | ✅ |
| 9 | contact | 7322 / 702 | 7322 / 702 | 0 / 0 | ✅ |
| | Footer height (outside main) | 107 | 107 | 0 | ✅ |
| | **Total page height** | 8130 | 8130 | 0 | ✅ |

Buttons: ✅ same. Prototype `270x44,192x44,197x52,197x52,278x52,218x52,185x52` · App `270x44,192x44,197x52,197x52,278x52,218x52,185x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 640 | 0 / 640 | 0 / 0 | ✅ |
| 2 | about | 640 / 952 | 640 / 952 | 0 / 0 | ✅ |
| 3 | services | 1592 / 694 | 1592 / 694 | 0 / 0 | ✅ |
| 4 | stack | 2286 / 1800 | 2286 / 1800 | 0 / 0 | ✅ |
| 5 | stats | 4086 / 680 | 4086 / 680 | 0 / 0 | ✅ |
| 6 | logos | 4766 / 70 | 4766 / 70 | 0 / 0 | ✅ |
| 7 | work | 4836 / 711 | 4836 / 711 | 0 / 0 | ✅ |
| 8 | statement | 5548 / 148 | 5548 / 148 | 0 / 0 | ✅ |
| 9 | contact | 5694 / 934 | 5694 / 934 | 0 / 0 | ✅ |
| | Footer height (outside main) | 188 | 188 | 0 | ✅ |
| | **Total page height** | 6816 | 6816 | 0 | ✅ |

Buttons: ✅ same. Prototype `270x44,192x44,197x52,197x52,278x52,218x52,185x52` · App `270x44,192x44,197x52,197x52,278x52,218x52,185x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 640 | 0 / 640 | 0 / 0 | ✅ |
| 2 | about | 640 / 870 | 640 / 870 | 0 / 0 | ✅ |
| 3 | services | 1510 / 733 | 1510 / 733 | 0 / 0 | ✅ |
| 4 | stack | 2243 / 1800 | 2243 / 1800 | 0 / 0 | ✅ |
| 5 | stats | 4043 / 680 | 4043 / 680 | 0 / 0 | ✅ |
| 6 | logos | 4723 / 70 | 4723 / 70 | 0 / 0 | ✅ |
| 7 | work | 4793 / 789 | 4793 / 789 | 0 / 0 | ✅ |
| 8 | statement | 5582 / 249 | 5582 / 249 | 0 / 0 | ✅ |
| 9 | contact | 5830 / 988 | 5830 / 988 | 0 / 0 | ✅ |
| | Footer height (outside main) | 188 | 188 | 0 | ✅ |
| | **Total page height** | 7006 | 7006 | 0 | ✅ |

Buttons: ✅ same. Prototype `270x44,192x44,197x52,197x52,278x52,218x52,185x52` · App `270x44,192x44,197x52,197x52,278x52,218x52,185x52`

</details>


<a id="about"></a>
### About

Prototype `/about.html` · App `/about`

**Checked**:
- All 10 sections and all 4 buttons match at all five widths.
- The footer differed (the total was 11–85px shorter in the app, depending on width; [FOOT-1](#foot-1)). Fixed and re-measured on 2026-11-17: it now matches.
- Footer items compared one by one at 1440: the prototype's links are 30px tall, the app's 24px; the footer is 118px vs 71px.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | overview | 784 / 1073 | 784 / 1073 | 0 / 0 | ✅ |
| 4 | pillars | 1857 / 932 | 1857 / 932 | 0 / 0 | ✅ |
| 5 | mujtamae | 2789 / 945 | 2789 / 945 | 0 / 0 | ✅ |
| 6 | vision | 3734 / 673 | 3734 / 673 | 0 / 0 | ✅ |
| 7 | uae | 4407 / 760 | 4407 / 760 | 0 / 0 | ✅ |
| 8 | ownership | 5167 / 788 | 5167 / 788 | 0 / 0 | ✅ |
| 9 | more | 5955 / 872 | 5955 / 872 | 0 / 0 | ✅ |
| 10 | contact | 6828 / 553 | 6828 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 7498 | 7498 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,164x46,336x52,185x52` · App `192x46,164x46,336x52,185x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | overview | 784 / 1123 | 784 / 1123 | 0 / 0 | ✅ |
| 4 | pillars | 1907 / 900 | 1907 / 900 | 0 / 0 | ✅ |
| 5 | mujtamae | 2807 / 969 | 2807 / 969 | 0 / 0 | ✅ |
| 6 | vision | 3776 / 720 | 3776 / 720 | 0 / 0 | ✅ |
| 7 | uae | 4496 / 760 | 4496 / 760 | 0 / 0 | ✅ |
| 8 | ownership | 5256 / 876 | 5256 / 876 | 0 / 0 | ✅ |
| 9 | more | 6132 / 872 | 6132 / 872 | 0 / 0 | ✅ |
| 10 | contact | 7005 / 553 | 7005 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 7675 | 7675 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,164x46,336x52,185x52` · App `192x46,164x46,336x52,185x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 760 | 0 / 760 | 0 / 0 | ✅ |
| 2 | subnav | 760 / 64 | 760 / 64 | 0 / 0 | ✅ |
| 3 | overview | 824 / 1068 | 824 / 1068 | 0 / 0 | ✅ |
| 4 | pillars | 1893 / 1043 | 1893 / 1043 | 0 / 0 | ✅ |
| 5 | mujtamae | 2936 / 1379 | 2936 / 1379 | 0 / 0 | ✅ |
| 6 | vision | 4315 / 723 | 4315 / 723 | 0 / 0 | ✅ |
| 7 | uae | 5038 / 760 | 5038 / 760 | 0 / 0 | ✅ |
| 8 | ownership | 5798 / 1148 | 5798 / 1148 | 0 / 0 | ✅ |
| 9 | more | 6945 / 937 | 6945 / 937 | 0 / 0 | ✅ |
| 10 | contact | 7882 / 553 | 7882 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 8553 | 8553 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,164x46,336x52,185x52` · App `192x46,164x46,336x52,185x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 573 | 0 / 573 | 0 / 0 | ✅ |
| 2 | subnav | 573 / 64 | 573 / 64 | 0 / 0 | ✅ |
| 3 | overview | 637 / 1028 | 637 / 1028 | 0 / 0 | ✅ |
| 4 | pillars | 1665 / 759 | 1665 / 759 | 0 / 0 | ✅ |
| 5 | mujtamae | 2424 / 1125 | 2424 / 1125 | 0 / 0 | ✅ |
| 6 | vision | 3549 / 525 | 3549 / 525 | 0 / 0 | ✅ |
| 7 | uae | 4074 / 606 | 4074 / 606 | 0 / 0 | ✅ |
| 8 | ownership | 4680 / 1037 | 4680 / 1037 | 0 / 0 | ✅ |
| 9 | more | 5716 / 1031 | 5716 / 1031 | 0 / 0 | ✅ |
| 10 | contact | 6747 / 376 | 6747 / 376 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 7366 | 7366 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,164x46,308x52,174x52` · App `192x46,164x46,308x52,174x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 600 | 0 / 600 | 0 / 0 | ✅ |
| 2 | subnav | 600 / 64 | 600 / 64 | 0 / 0 | ✅ |
| 3 | overview | 664 / 1297 | 664 / 1297 | 0 / 0 | ✅ |
| 4 | pillars | 1961 / 819 | 1961 / 819 | 0 / 0 | ✅ |
| 5 | mujtamae | 2780 / 1367 | 2780 / 1367 | 0 / 0 | ✅ |
| 6 | vision | 4147 / 705 | 4147 / 705 | 0 / 0 | ✅ |
| 7 | uae | 4851 / 762 | 4851 / 762 | 0 / 0 | ✅ |
| 8 | ownership | 5613 / 1428 | 5613 / 1428 | 0 / 0 | ✅ |
| 9 | more | 7042 / 1070 | 7042 / 1070 | 0 / 0 | ✅ |
| 10 | contact | 8112 / 440 | 8112 / 440 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 8825 | 8825 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,164x46,308x52,174x52` · App `192x46,164x46,308x52,174x52`

</details>


<a id="our-story"></a>
### Our Story

Prototype `/our-story.html` · App `/about/our-story`

**Checked**:
- All 5 sections and all 4 buttons match at all five widths.
- The footer differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | combination | 784 / 1447 | 784 / 1447 | 0 / 0 | ✅ |
| 4 | more | 2231 / 792 | 2231 / 792 | 0 / 0 | ✅ |
| 5 | contact | 3024 / 553 | 3024 / 553 | 0 / 0 | ✅ |
| | **Total page height** | 3694 | 3694 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,202x46,218x52,185x52` · App `192x46,202x46,218x52,185x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | combination | 784 / 1545 | 784 / 1545 | 0 / 0 | ✅ |
| 4 | more | 2329 / 792 | 2329 / 792 | 0 / 0 | ✅ |
| 5 | contact | 3122 / 553 | 3122 / 553 | 0 / 0 | ✅ |
| | **Total page height** | 3792 | 3792 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,202x46,218x52,185x52` · App `192x46,202x46,218x52,185x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | combination | 784 / 1452 | 784 / 1452 | 0 / 0 | ✅ |
| 4 | more | 2236 / 792 | 2236 / 792 | 0 / 0 | ✅ |
| 5 | contact | 3029 / 553 | 3029 / 553 | 0 / 0 | ✅ |
| | **Total page height** | 3699 | 3699 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,202x46,218x52,185x52` · App `192x46,202x46,218x52,185x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 428 | 0 / 428 | 0 / 0 | ✅ |
| 2 | subnav | 428 / 64 | 428 / 64 | 0 / 0 | ✅ |
| 3 | combination | 492 / 1126 | 492 / 1126 | 0 / 0 | ✅ |
| 4 | more | 1618 / 715 | 1618 / 715 | 0 / 0 | ✅ |
| 5 | contact | 2333 / 376 | 2333 / 376 | 0 / 0 | ✅ |
| | **Total page height** | 2951 | 2951 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,202x46,202x52,174x52` · App `192x46,202x46,202x52,174x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 492 | 0 / 492 | 0 / 0 | ✅ |
| 2 | subnav | 492 / 64 | 492 / 64 | 0 / 0 | ✅ |
| 3 | combination | 556 / 1613 | 556 / 1613 | 0 / 0 | ✅ |
| 4 | more | 2168 / 754 | 2168 / 754 | 0 / 0 | ✅ |
| 5 | contact | 2923 / 440 | 2923 / 440 | 0 / 0 | ✅ |
| | **Total page height** | 3635 | 3635 | 0 | ✅ |

Buttons: ✅ same. Prototype `192x46,202x46,202x52,174x52` · App `192x46,202x46,202x52,174x52`

</details>


<a id="team"></a>
### The Team

Prototype `/team.html` · App `/about/team`

**Checked**:
- All 6 sections match at all five widths, in the grid view (the default).
- Buttons match, including the "Show All" filter dropdown: 133×46 at 15px on both. The app's class `ddBtn` was missed by the first automatic pass and checked by hand at 1440.
- Since the re-measure, the automatic button list also picks up the app's 11 member cards (their class contains "Btn") but not the prototype's. The cards aren't buttons in this sense and the people section's height matches, so the table lists only the real buttons.
- The footer differed (prototype 118 / 243 / 273px, app 71 / 188 / 188px; [FOOT-1](#foot-1)). Fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | people | 784 / 2195 | 784 / 2195 | 0 / 0 | ✅ |
| 4 | group | 2979 / 370 | 2979 / 370 | 0 / 0 | ✅ |
| 5 | more | 3349 / 792 | 3349 / 792 | 0 / 0 | ✅ |
| 6 | contact | 4142 / 553 | 4142 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4812 | 4812 | 0 | ✅ |

Buttons: ✅ same. Prototype `254x46,134x46,133x46,185x52` · App `254x46,134x46,133x46,185x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | people | 784 / 2139 | 784 / 2139 | 0 / 0 | ✅ |
| 4 | group | 2923 / 370 | 2923 / 370 | 0 / 0 | ✅ |
| 5 | more | 3293 / 792 | 3293 / 792 | 0 / 0 | ✅ |
| 6 | contact | 4086 / 553 | 4086 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4756 | 4756 | 0 | ✅ |

Buttons: ✅ same. Prototype `254x46,134x46,133x46,185x52` · App `254x46,134x46,133x46,185x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | people | 784 / 1892 | 784 / 1892 | 0 / 0 | ✅ |
| 4 | group | 2676 / 416 | 2676 / 416 | 0 / 0 | ✅ |
| 5 | more | 3092 / 792 | 3092 / 792 | 0 / 0 | ✅ |
| 6 | contact | 3885 / 553 | 3885 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4555 | 4555 | 0 | ✅ |

Buttons: ✅ same. Prototype `254x46,134x46,133x46,185x52` · App `254x46,134x46,133x46,185x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 474 | 0 / 474 | 0 / 0 | ✅ |
| 2 | subnav | 474 / 64 | 474 / 64 | 0 / 0 | ✅ |
| 3 | people | 538 / 3837 | 538 / 3837 | 0 / 0 | ✅ |
| 4 | group | 4375 / 346 | 4375 / 346 | 0 / 0 | ✅ |
| 5 | more | 4721 / 715 | 4721 / 715 | 0 / 0 | ✅ |
| 6 | contact | 5437 / 376 | 5437 / 376 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 6055 | 6055 | 0 | ✅ |

Buttons: ✅ same. Prototype `254x46,134x46,133x46,174x52` · App `254x46,134x46,133x46,174x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 542 | 0 / 542 | 0 / 0 | ✅ |
| 2 | subnav | 542 / 64 | 542 / 64 | 0 / 0 | ✅ |
| 3 | people | 606 / 2616 | 606 / 2616 | 0 / 0 | ✅ |
| 4 | group | 3222 / 490 | 3222 / 490 | 0 / 0 | ✅ |
| 5 | more | 3711 / 754 | 3711 / 754 | 0 / 0 | ✅ |
| 6 | contact | 4465 / 440 | 4465 / 440 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 5178 | 5178 | 0 | ✅ |

Buttons: ✅ same. Prototype `254x46,134x46,133x46,174x52` · App `254x46,134x46,133x46,174x52`

</details>


<a id="join"></a>
### Join Us

Prototype `/join.html` · App `/about/join`

**Checked**:
- All 7 sections match at all five widths.
- All 18 buttons match: hero links, the 6 role rows and their "Apply" buttons, the dropdowns and Send.
- The footer differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.
- Measured with every role closed (the default). Opening a role was checked in step 5 and not re-checked here.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | why | 784 / 1275 | 784 / 1275 | 0 / 0 | ✅ |
| 4 | state / Component.band | 2059 / 401 | 2059 / 401 | 0 / 0 | ✅ |
| 5 | roles | 2460 / 1104 | 2460 / 1104 | 0 / 0 | ✅ |
| 6 | apply | 3564 / 885 | 3564 / 885 | 0 / 0 | ✅ |
| 7 | more | 4450 / 792 | 4450 / 792 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5360 | 5360 | 0 | ✅ |

Buttons: ✅ same. Prototype `276x46,259x46,1281x100,277x52,1281x100,277x52,1281x100,277x52,1281x100,277x52,1281x100,277x52,1281x114,277x52,293x52,314x51,314x51,208x52` · App `276x46,259x46,1281x100,277x52,1281x100,277x52,1281x100,277x52,1281x100,277x52,1281x100,277x52,1281x114,277x52,293x52,314x51,314x51,208x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | why | 784 / 1275 | 784 / 1275 | 0 / 0 | ✅ |
| 4 | state / Component.band | 2059 / 401 | 2059 / 401 | 0 / 0 | ✅ |
| 5 | roles | 2460 / 1104 | 2460 / 1104 | 0 / 0 | ✅ |
| 6 | apply | 3564 / 885 | 3564 / 885 | 0 / 0 | ✅ |
| 7 | more | 4450 / 792 | 4450 / 792 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5360 | 5360 | 0 | ✅ |

Buttons: ✅ same. Prototype `276x46,259x46,1169x100,277x52,1169x100,277x52,1169x100,277x52,1169x100,277x52,1169x100,277x52,1169x114,277x52,293x52,283x51,283x51,208x52` · App `276x46,259x46,1169x100,277x52,1169x100,277x52,1169x100,277x52,1169x100,277x52,1169x100,277x52,1169x114,277x52,293x52,283x51,283x51,208x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | subnav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 3 | why | 784 / 1309 | 784 / 1309 | 0 / 0 | ✅ |
| 4 | state / Component.band | 2093 / 367 | 2093 / 367 | 0 / 0 | ✅ |
| 5 | roles | 2459 / 1154 | 2459 / 1154 | 0 / 0 | ✅ |
| 6 | apply | 3614 / 1218 | 3614 / 1218 | 0 / 0 | ✅ |
| 7 | more | 4831 / 792 | 4831 / 792 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5742 | 5742 | 0 | ✅ |

Buttons: ✅ same. Prototype `276x46,259x46,913x100,277x52,913x100,277x52,913x100,277x52,913x100,277x52,913x100,277x52,913x100,277x52,293x52,444x51,444x51,208x52` · App `276x46,259x46,913x100,277x52,913x100,277x52,913x100,277x52,913x100,277x52,913x100,277x52,913x100,277x52,293x52,444x51,444x51,208x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 474 | 0 / 474 | 0 / 0 | ✅ |
| 2 | subnav | 474 / 64 | 474 / 64 | 0 / 0 | ✅ |
| 3 | why | 538 / 1072 | 538 / 1072 | 0 / 0 | ✅ |
| 4 | state / Component.band | 1610 / 226 | 1610 / 226 | 0 / 0 | ✅ |
| 5 | roles | 1836 / 969 | 1836 / 969 | 0 / 0 | ✅ |
| 6 | apply | 2805 / 1206 | 2805 / 1206 | 0 / 0 | ✅ |
| 7 | more | 4011 / 715 | 4011 / 715 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 4969 | 4969 | 0 | ✅ |

Buttons: ✅ same. Prototype `276x46,259x46,705x92,255x52,705x92,255x52,705x92,255x52,705x92,255x52,705x92,255x52,705x92,255x52,269x52,705x51,705x51,193x52` · App `276x46,259x46,705x92,255x52,705x92,255x52,705x92,255x52,705x92,255x52,705x92,255x52,705x92,255x52,269x52,705x51,705x51,193x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 542 | 0 / 542 | 0 / 0 | ✅ |
| 2 | subnav | 542 / 64 | 542 / 64 | 0 / 0 | ✅ |
| 3 | why | 606 / 1331 | 606 / 1331 | 0 / 0 | ✅ |
| 4 | state / Component.band | 1937 / 291 | 1937 / 291 | 0 / 0 | ✅ |
| 5 | roles | 2228 / 1092 | 2228 / 1092 | 0 / 0 | ✅ |
| 6 | apply | 3319 / 1346 | 3319 / 1346 | 0 / 0 | ✅ |
| 7 | more | 4665 / 754 | 4665 / 754 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 5692 | 5692 | 0 | ✅ |

Buttons: ✅ same. Prototype `276x46,259x46,312x92,255x52,312x114,255x52,312x114,255x52,312x92,255x52,312x92,255x52,312x114,255x52,269x52,312x51,312x51,193x52` · App `276x46,259x46,312x92,255x52,312x114,255x52,312x114,255x52,312x92,255x52,312x92,255x52,312x114,255x52,269x52,312x51,312x51,193x52`

</details>


<a id="services"></a>
### Services

Prototype `/services.html` · App `/services`

**Checked**:
- All 10 sections match at all five widths, including the 0-height sticky-bar marker and the sticky chapter bar.
- All 8 buttons match. Phones get 16px button labels, so the buttons are narrower at 768/375 on both sites.
- The footer differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | snavMark / div | 720 / 0 | 720 / 0 | 0 / 0 | ✅ |
| 3 | snav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 4 | categories | 784 / 947 | 784 / 947 | 0 / 0 | ✅ |
| 5 | approach | 1731 / 592 | 1731 / 592 | 0 / 0 | ✅ |
| 6 | strategy | 2322 / 1873 | 2322 / 1873 | 0 / 0 | ✅ |
| 7 | events | 4196 / 1320 | 4196 / 1320 | 0 / 0 | ✅ |
| 8 | media | 5516 / 1401 | 5516 / 1401 | 0 / 0 | ✅ |
| 9 | creative | 6917 / 892 | 6917 / 892 | 0 / 0 | ✅ |
| 10 | contact | 7809 / 553 | 7809 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 8479 | 8479 | 0 | ✅ |

Buttons: ✅ same. Prototype `324x46,164x46,226x52,218x52,189x52,219x52,218x52,185x52` · App `324x46,164x46,226x52,218x52,189x52,219x52,218x52,185x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | snavMark / div | 720 / 0 | 720 / 0 | 0 / 0 | ✅ |
| 3 | snav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 4 | categories | 784 / 947 | 784 / 947 | 0 / 0 | ✅ |
| 5 | approach | 1731 / 616 | 1731 / 616 | 0 / 0 | ✅ |
| 6 | strategy | 2347 / 1946 | 2347 / 1946 | 0 / 0 | ✅ |
| 7 | events | 4293 / 1284 | 4293 / 1284 | 0 / 0 | ✅ |
| 8 | media | 5577 / 1389 | 5577 / 1389 | 0 / 0 | ✅ |
| 9 | creative | 6966 / 892 | 6966 / 892 | 0 / 0 | ✅ |
| 10 | contact | 7857 / 553 | 7857 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 8528 | 8528 | 0 | ✅ |

Buttons: ✅ same. Prototype `324x46,164x46,226x52,218x52,189x52,219x52,218x52,185x52` · App `324x46,164x46,226x52,218x52,189x52,219x52,218x52,185x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 730 | 0 / 730 | 0 / 0 | ✅ |
| 2 | snavMark / div | 730 / 0 | 730 / 0 | 0 / 0 | ✅ |
| 3 | snav | 730 / 64 | 730 / 64 | 0 / 0 | ✅ |
| 4 | categories | 794 / 933 | 794 / 933 | 0 / 0 | ✅ |
| 5 | approach | 1727 / 662 | 1727 / 662 | 0 / 0 | ✅ |
| 6 | strategy | 2389 / 2161 | 2389 / 2161 | 0 / 0 | ✅ |
| 7 | events | 4550 / 1700 | 4550 / 1700 | 0 / 0 | ✅ |
| 8 | media | 6250 / 2049 | 6250 / 2049 | 0 / 0 | ✅ |
| 9 | creative | 8298 / 1292 | 8298 / 1292 | 0 / 0 | ✅ |
| 10 | contact | 9590 / 553 | 9590 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 10261 | 10261 | 0 | ✅ |

Buttons: ✅ same. Prototype `324x46,164x46,226x52,218x52,189x52,219x52,218x52,185x52` · App `324x46,164x46,226x52,218x52,189x52,219x52,218x52,185x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 548 | 0 / 548 | 0 / 0 | ✅ |
| 2 | snavMark / div | 548 / 0 | 548 / 0 | 0 / 0 | ✅ |
| 3 | snav | 548 / 64 | 548 / 64 | 0 / 0 | ✅ |
| 4 | categories | 612 / 1442 | 612 / 1442 | 0 / 0 | ✅ |
| 5 | approach | 2054 / 419 | 2054 / 419 | 0 / 0 | ✅ |
| 6 | strategy | 2473 / 2001 | 2473 / 2001 | 0 / 0 | ✅ |
| 7 | events | 4474 / 1482 | 4474 / 1482 | 0 / 0 | ✅ |
| 8 | media | 5956 / 1744 | 5956 / 1744 | 0 / 0 | ✅ |
| 9 | creative | 7700 / 1386 | 7700 / 1386 | 0 / 0 | ✅ |
| 10 | contact | 9086 / 376 | 9086 / 376 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 9704 | 9704 | 0 | ✅ |

Buttons: ✅ same. Prototype `324x46,164x46,210x52,203x52,177x52,204x52,202x52,174x52` · App `324x46,164x46,210x52,203x52,177x52,204x52,202x52,174x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 565 | 0 / 565 | 0 / 0 | ✅ |
| 2 | snavMark / div | 565 / 0 | 565 / 0 | 0 / 0 | ✅ |
| 3 | snav | 565 / 64 | 565 / 64 | 0 / 0 | ✅ |
| 4 | categories | 629 / 1481 | 629 / 1481 | 0 / 0 | ✅ |
| 5 | approach | 2110 / 592 | 2110 / 592 | 0 / 0 | ✅ |
| 6 | strategy | 2702 / 2132 | 2702 / 2132 | 0 / 0 | ✅ |
| 7 | events | 4834 / 1434 | 4834 / 1434 | 0 / 0 | ✅ |
| 8 | media | 6268 / 1650 | 6268 / 1650 | 0 / 0 | ✅ |
| 9 | creative | 7918 / 995 | 7918 / 995 | 0 / 0 | ✅ |
| 10 | contact | 8913 / 440 | 8913 / 440 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 9626 | 9626 | 0 | ✅ |

Buttons: ✅ same. Prototype `324x46,164x46,210x52,203x52,177x52,204x52,202x52,174x52` · App `324x46,164x46,210x52,203x52,177x52,204x52,202x52,174x52`

</details>


<a id="our-work"></a>
### Our Work

Prototype `/our-work.html` · App `/our-work`

**Checked**:
- All 6 sections and all 3 buttons match at all five widths, in the "All" filter view: the case grid, the filter bar and the logo strip.
- The case tiles are `<button>`s without a "btn" class, so they aren't in the button list. The grid height matching covers them.
- The footer differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | snavMark / div | 720 / 0 | 720 / 0 | 0 / 0 | ✅ |
| 3 | snav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 4 | cases | 784 / 4066 | 784 / 4066 | 0 / 0 | ✅ |
| 5 | logos | 4850 / 200 | 4850 / 200 | 0 / 0 | ✅ |
| 6 | contact | 5050 / 553 | 5050 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5720 | 5720 | 0 | ✅ |

Buttons: ✅ same. Prototype `232x46,164x46,185x52` · App `232x46,164x46,185x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | snavMark / div | 720 / 0 | 720 / 0 | 0 / 0 | ✅ |
| 3 | snav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 4 | cases | 784 / 3680 | 784 / 3680 | 0 / 0 | ✅ |
| 5 | logos | 4464 / 200 | 4464 / 200 | 0 / 0 | ✅ |
| 6 | contact | 4664 / 553 | 4664 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5334 | 5334 | 0 | ✅ |

Buttons: ✅ same. Prototype `232x46,164x46,185x52` · App `232x46,164x46,185x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | snavMark / div | 720 / 0 | 720 / 0 | 0 / 0 | ✅ |
| 3 | snav | 720 / 64 | 720 / 64 | 0 / 0 | ✅ |
| 4 | cases | 784 / 3014 | 784 / 3014 | 0 / 0 | ✅ |
| 5 | logos | 3798 / 200 | 3798 / 200 | 0 / 0 | ✅ |
| 6 | contact | 3998 / 553 | 3998 / 553 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4669 | 4669 | 0 | ✅ |

Buttons: ✅ same. Prototype `232x46,164x46,185x52` · App `232x46,164x46,185x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 452 | 0 / 452 | 0 / 0 | ✅ |
| 2 | snavMark / div | 452 / 0 | 452 / 0 | 0 / 0 | ✅ |
| 3 | snav | 452 / 54 | 452 / 54 | 0 / 0 | ✅ |
| 4 | cases | 506 / 4092 | 506 / 4092 | 0 / 0 | ✅ |
| 5 | logos | 4598 / 110 | 4598 / 110 | 0 / 0 | ✅ |
| 6 | contact | 4708 / 376 | 4708 / 376 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 5326 | 5326 | 0 | ✅ |

Buttons: ✅ same. Prototype `232x46,164x46,174x52` · App `232x46,164x46,174x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 502 | 0 / 502 | 0 / 0 | ✅ |
| 2 | snavMark / div | 502 / 0 | 502 / 0 | 0 / 0 | ✅ |
| 3 | snav | 502 / 54 | 502 / 54 | 0 / 0 | ✅ |
| 4 | cases | 557 / 4092 | 557 / 4092 | 0 / 0 | ✅ |
| 5 | logos | 4649 / 110 | 4649 / 110 | 0 / 0 | ✅ |
| 6 | contact | 4759 / 440 | 4759 / 440 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 5472 | 5472 | 0 | ✅ |

Buttons: ✅ same. Prototype `232x46,164x46,174x52` · App `232x46,164x46,174x52`

</details>


<a id="case-study"></a>
### Our Work: case study view

Prototype `/our-work.html#case-games-of-the-future-2025` · App `/our-work#case-games-of-the-future-2025`

**Checked**:
- The case study overlay (`role="dialog"`) opened by its direct link.
- Its visible top-level parts were measured inside the overlay: the top bar (sticky, which is why it shares top 0 with the hero), the hero and the content wrapper.
- "Total" here is the overlay's scroll height, not the page's.
- Everything matches exactly at all five widths.
- At 768 the content is much taller than at 375 (6667 vs 4243px) on **both** sites, so that's how the prototype is built, not a website bug. Worth a visual look at 768 if the tablet layout matters to PLG.- Re-checked after all fixes (2026-11-17): unchanged, still an exact match.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | bar | 0 / 80 | 0 / 80 | 0 / 0 | ✅ |
| 2 | hero | 0 / 702 | 0 / 702 | 0 / 0 | ✅ |
| 3 | content | 702 / 4430 | 702 / 4430 | 0 / 0 | ✅ |
| | **Total page height** | 5132 | 5132 | 0 | ✅ |

Buttons: ✅ same. Prototype `none` · App `none`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | bar | 0 / 80 | 0 / 80 | 0 / 0 | ✅ |
| 2 | hero | 0 / 702 | 0 / 702 | 0 / 0 | ✅ |
| 3 | content | 702 / 4110 | 702 / 4110 | 0 / 0 | ✅ |
| | **Total page height** | 4812 | 4812 | 0 | ✅ |

Buttons: ✅ same. Prototype `none` · App `none`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | bar | 0 / 80 | 0 / 80 | 0 / 0 | ✅ |
| 2 | hero | 0 / 702 | 0 / 702 | 0 / 0 | ✅ |
| 3 | content | 702 / 3862 | 702 / 3862 | 0 / 0 | ✅ |
| | **Total page height** | 4564 | 4564 | 0 | ✅ |

Buttons: ✅ same. Prototype `none` · App `none`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | bar | 0 / 76 | 0 / 76 | 0 / 0 | ✅ |
| 2 | hero | 0 / 558 | 0 / 558 | 0 / 0 | ✅ |
| 3 | content | 558 / 6667 | 558 / 6667 | 0 / 0 | ✅ |
| | **Total page height** | 7225 | 7225 | 0 | ✅ |

Buttons: ✅ same. Prototype `none` · App `none`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | bar | 0 / 76 | 0 / 76 | 0 / 0 | ✅ |
| 2 | hero | 0 / 558 | 0 / 558 | 0 / 0 | ✅ |
| 3 | content | 558 / 4243 | 558 / 4243 | 0 / 0 | ✅ |
| | **Total page height** | 4801 | 4801 | 0 | ✅ |

Buttons: ✅ same. Prototype `none` · App `none`

</details>


<a id="contact"></a>
### Contact

Prototype `/contact.html` · App `/contact`

**Checked**:
- **Desktop 1440**: the enquiry section was **52px shorter** in the app, because the interest chips wrapped into 5 rows instead of 6. Each chip was 2px narrower: the 14px circle before each label was border-box ([CONTACT-1](#contact-1), [GLOB-1](#glob-1)). Font, text width (272.54px for the first chip label on both), padding and chip CSS were already identical. **Fixed and re-measured on 2026-11-17**: all chips are the prototype's size and positions; the section is 1142px.
- **1280 and smaller**: all sections match.
- **Buttons**: the "Start the conversation" button matches at all widths.
- **Footer**: differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.
- **Reveal**: the column's eyebrow/title sat 32px lower in the app during measurement: hidden by the reveal animation, where the prototype shows them at once ([GLOB-2](#glob-2)). **Fixed on 2026-11-17**: now visible at load like the prototype.
- **Console**: one React hydration warning about `fdprocessedid` attributes on the form inputs. A form-filling browser extension in this Chrome profile adds those. It isn't a website bug and won't happen for visitors without that extension.
- **Screenshot**: the hero at 1067×687 looks the same in both.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | enquiry | 720 / 1142 | 720 / 1142 | 0 / 0 | ✅ |
| 3 | offices | 1862 / 860 | 1862 / 860 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 2840 | 2840 | 0 | ✅ |

Buttons: ✅ same. Prototype `328x52` · App `328x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | enquiry | 720 / 1142 | 720 / 1142 | 0 / 0 | ✅ |
| 3 | offices | 1862 / 860 | 1862 / 860 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 2840 | 2840 | 0 | ✅ |

Buttons: ✅ same. Prototype `328x52` · App `328x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 720 | 0 / 720 | 0 / 0 | ✅ |
| 2 | enquiry | 720 / 1676 | 720 / 1676 | 0 / 0 | ✅ |
| 3 | offices | 2396 / 1414 | 2396 / 1414 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 3928 | 3928 | 0 | ✅ |

Buttons: ✅ same. Prototype `328x52` · App `328x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 482 | 0 / 482 | 0 / 0 | ✅ |
| 2 | enquiry | 482 / 1633 | 482 / 1633 | 0 / 0 | ✅ |
| 3 | offices | 2114 / 1630 | 2114 / 1630 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 3986 | 3986 | 0 | ✅ |

Buttons: ✅ same. Prototype `300x52` · App `300x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | hero | 0 / 441 | 0 / 441 | 0 / 0 | ✅ |
| 2 | enquiry | 441 / 2136 | 441 / 2136 | 0 / 0 | ✅ |
| 3 | offices | 2577 / 1177 | 2577 / 1177 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 4026 | 4026 | 0 | ✅ |

Buttons: ✅ same. Prototype `300x52` · App `300x52`

</details>


<a id="terms"></a>
### Legal: Terms & Conditions

Prototype `/legal.html#terms` · App `/legal/terms`

**Checked**:
- All 4 parts match at all five widths: hero, tab-bar marker, tab bar and document (contents, sections, "Questions?" box). The "Questions?" button matches too.
- The footer differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 512 | 0 / 512 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 512 / 0 | 512 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 512 / 64 | 512 / 64 | 0 / 0 | ✅ |
| 4 | doc | 576 / 3258 | 576 / 3258 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 3952 | 3952 | 0 | ✅ |

Buttons: ✅ same. Prototype `198x52` · App `198x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 499 | 0 / 499 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 499 / 0 | 499 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 499 / 64 | 499 / 64 | 0 / 0 | ✅ |
| 4 | doc | 563 / 3396 | 563 / 3396 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4077 | 4077 | 0 | ✅ |

Buttons: ✅ same. Prototype `198x52` · App `198x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 499 | 0 / 499 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 499 / 0 | 499 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 499 / 64 | 499 / 64 | 0 / 0 | ✅ |
| 4 | doc | 563 / 3594 | 563 / 3594 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4274 | 4274 | 0 | ✅ |

Buttons: ✅ same. Prototype `198x52` · App `198x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 386 | 0 / 386 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 386 / 0 | 386 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 386 / 54 | 386 / 54 | 0 / 0 | ✅ |
| 4 | doc | 441 / 4093 | 441 / 4093 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 4776 | 4776 | 0 | ✅ |

Buttons: ✅ same. Prototype `665x52` · App `665x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 501 | 0 / 501 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 501 / 0 | 501 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 501 / 54 | 501 / 54 | 0 / 0 | ✅ |
| 4 | doc | 556 / 5372 | 556 / 5372 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 6200 | 6200 | 0 | ✅ |

Buttons: ✅ same. Prototype `272x52` · App `272x52`

</details>


<a id="privacy"></a>
### Legal: Privacy Policy

Prototype `/legal.html#privacy-policy` · App `/legal/privacy-policy`

**Checked**:
- All 4 parts and the "Questions?" button match at all five widths. That includes the contact card from Site settings → Company details.
- The footer differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 540 | 0 / 540 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 540 / 0 | 540 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 540 / 64 | 540 / 64 | 0 / 0 | ✅ |
| 4 | doc | 604 / 4160 | 604 / 4160 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 4882 | 4882 | 0 | ✅ |

Buttons: ✅ same. Prototype `198x52` · App `198x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 527 | 0 / 527 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 527 / 0 | 527 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 527 / 64 | 527 / 64 | 0 / 0 | ✅ |
| 4 | doc | 591 / 4327 | 591 / 4327 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5036 | 5036 | 0 | ✅ |

Buttons: ✅ same. Prototype `198x52` · App `198x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 527 | 0 / 527 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 527 / 0 | 527 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 527 / 64 | 527 / 64 | 0 / 0 | ✅ |
| 4 | doc | 591 / 4531 | 591 / 4531 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 5240 | 5240 | 0 | ✅ |

Buttons: ✅ same. Prototype `198x52` · App `198x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 410 | 0 / 410 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 410 / 0 | 410 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 410 / 54 | 410 / 54 | 0 / 0 | ✅ |
| 4 | doc | 465 / 5116 | 465 / 5116 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 5823 | 5823 | 0 | ✅ |

Buttons: ✅ same. Prototype `665x52` · App `665x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 481 | 0 / 481 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 481 / 0 | 481 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 481 / 54 | 481 / 54 | 0 / 0 | ✅ |
| 4 | doc | 535 / 6821 | 535 / 6821 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 7629 | 7629 | 0 | ✅ |

Buttons: ✅ same. Prototype `272x52` · App `272x52`

</details>


<a id="cookies"></a>
### Legal: Cookies

Prototype `/legal.html#cookies` · App `/legal/cookies`

**Checked**:
- All 4 parts match at all five widths, including the cookie table.
- **Buttons**: at 768, "Manage Cookie Preferences" was 367px in the app vs 335px in the prototype, because the label was 18px vs 16px ([LEGAL-1](#legal-1)). Fixed and re-measured on 2026-11-17:
  - 335px with a 16px label at 768;
  - 16px labels at 375 on all three Legal pages, "Contact Us" included.
- **Footer**: differed ([FOOT-1](#foot-1)); fixed and re-measured on 2026-11-17: it now matches.

<details><summary><b>Desktop 1440</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 540 | 0 / 540 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 540 / 0 | 540 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 540 / 64 | 540 / 64 | 0 / 0 | ✅ |
| 4 | doc | 604 / 2695 | 604 / 2695 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 3418 | 3418 | 0 | ✅ |

Buttons: ✅ same. Prototype `367x52,198x52` · App `367x52,198x52`

</details>

<details><summary><b>Small desktop 1280</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 527 | 0 / 527 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 527 / 0 | 527 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 527 / 64 | 527 / 64 | 0 / 0 | ✅ |
| 4 | doc | 591 / 2795 | 591 / 2795 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 3504 | 3504 | 0 | ✅ |

Buttons: ✅ same. Prototype `367x52,198x52` · App `367x52,198x52`

</details>

<details><summary><b>Tablet landscape 1024</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 527 | 0 / 527 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 527 / 0 | 527 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 527 / 64 | 527 / 64 | 0 / 0 | ✅ |
| 4 | doc | 591 / 2960 | 591 / 2960 | 0 / 0 | ✅ |
| | Footer height (outside main) | 118 | 118 | 0 | ✅ |
| | **Total page height** | 3669 | 3669 | 0 | ✅ |

Buttons: ✅ same. Prototype `367x52,198x52` · App `367x52,198x52`

</details>

<details><summary><b>Tablet portrait 768</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 410 | 0 / 410 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 410 / 0 | 410 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 410 / 54 | 410 / 54 | 0 / 0 | ✅ |
| 4 | doc | 465 / 3390 | 465 / 3390 | 0 / 0 | ✅ |
| | Footer height (outside main) | 243 | 243 | 0 | ✅ |
| | **Total page height** | 4098 | 4098 | 0 | ✅ |

Buttons: ✅ same. Prototype `335x52,665x52` · App `335x52,665x52`

</details>

<details><summary><b>Mobile 375</b>: ✅ match</summary>

| # | Section (prototype / app) | Prototype | App | Δ top / height | |
|---|---|---|---|---|---|
| 1 | lhero | 0 / 481 | 0 / 481 | 0 / 0 | ✅ |
| 2 | tabsMark / div | 481 / 0 | 481 / 0 | 0 / 0 | ✅ |
| 3 | ltabs / StickyBar.snav | 481 / 54 | 481 / 54 | 0 / 0 | ✅ |
| 4 | doc | 535 / 4282 | 535 / 4282 | 0 / 0 | ✅ |
| | Footer height (outside main) | 273 | 273 | 0 | ✅ |
| | **Total page height** | 5090 | 5090 | 0 | ✅ |

Buttons: ✅ same. Prototype `312x52,272x52` · App `312x52,272x52`

</details>



