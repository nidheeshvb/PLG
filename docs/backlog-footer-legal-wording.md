# Backlog: footer legal link wording

_Status: **closed 2026-11-19**: keep "Privacy · Terms & Conditions · Cookies" (Home/About design wording). The site matches the approved design, so PLG is not asked; they can change the labels in the CMS. Last updated: 2026-11-19._

The footer's small legal links at the bottom of every page currently read **"Privacy · Terms & Conditions · Cookies"**. The prototype pages don't agree on the wording, so PLG Acachet needs to choose one. Found in the UI comparison as **FOOT-2** (`docs/ui-comparison-issues.md`).

## What the prototype shows

| Wording | Prototype pages |
|---|---|
| Privacy · Terms & Conditions · Cookies | `index.html` (Home), `about.html` |
| Privacy Policy · Terms and Conditions · Cookies | `our-story.html`, `team.html`, `join.html`, `services.html`, `our-work.html`, `contact.html`, `legal.html` |

The website shows the first wording on every page. It comes from the seed (`web/src/seed/index.ts`, `legalLinks`) and can be edited in the CMS.

## Why it matters

- **Consistency**: the same footer appears on every page, so there should be one wording.
- **Layout on wide screens**: at 1440px and below, both wordings give the same footer height. In wider windows they don't. At 1536px, the longer wording wraps the legal links onto a second footer line, as on `team.html`; the shorter one fits on one line, as on `about.html` and the website.

## Question for the client

| # | Question | Default if no answer |
|---|---|---|
| 1 | Which wording do you want for the footer legal links? | Keep "Privacy · Terms & Conditions · Cookies" |

**Recommendation**: "Privacy Policy · Terms and Conditions · Cookies". Six of the seven later inner prototype pages use it, and it matches the page titles (`/legal/privacy-policy`, "Terms and Conditions").

## How to apply the decision (no code change)

1. In the CMS: **Site settings → Footer → Legal links**, change the two labels and publish.
2. In the seed, so a fresh install matches: `web/src/seed/index.ts`, the `legalLinks` labels.
3. Re-check the footer at 1440 and 1536+ against `team.html`, and update FOOT-2 in `docs/ui-comparison-issues.md`.

## Acceptance criteria

- One wording on every page, as chosen by PLG.
- The footer height matches the matching prototype page at 1440, 1280, 1024, 768 and 375, and at 1536.
- The seed produces the same labels as the CMS.
- Remove this item from `docs/backlog.md`.
