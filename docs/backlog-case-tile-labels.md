# Backlog: Our Work case study tile labels (accessibility)

_Status: **on hold, by decision** (2026-11-20). The site keeps the prototype's markup exactly. Revisit if PLG asks for an accessibility audit or certification (WCAG 2.1/2.2 AA), or if the prototype changes. Last updated: 2026-11-20._

| | |
|---|---|
| **Raised by** | The development team, from the full automated accessibility scan (axe-core, WCAG 2.0/2.1/2.2 A + AA + best practice) run on 2026-11-20 while confirming the pre-launch fixes. Test report: **E2E-8-5** in `docs/e2e-test-plan.md` |
| **Suggested fix by** | The development team (proposal below) |
| **Decided by** | The project lead, 2026-11-20: **keep it the same as the source HTML** (the approved prototype) |
| **Severity** | Low. Visitors who see the page are not affected; voice-control and some screen-reader users are |
| **Waiting for** | A request from PLG (audit, certification, complaint), or the project lead's go-ahead |

## What happens

Each case study tile on Our Work is a button. The prototype gives it a hidden label for assistive technology (`our-work.html` line 911):

```html
<button type="button" class="case" id="tile-…" … aria-label="${title}: view case study">
```

The site copies this exactly (`web/src/blocks/CaseStudyGrid/CaseStudyGridClient.tsx`, the tile `<button>`: `aria-label={`${c.title}: view case study`}`).

A hidden label **replaces** everything shown on the tile. Sighted visitors see the number ("01"), service tags, the client ("UCI"), the title, a short summary and **"Explore Project"**. Assistive technology only gets "<title>: view case study".

That fails WCAG 2.5.3 **Label in Name** (level A): the name software exposes should contain the words people see.

- **Voice control** (Dragon, Voice Control on iPhone/Mac): people say what they see, e.g. "click Explore Project" or "click UCI". Neither word is in the button's name, so the command may not work.
- **Screen readers**: users hear "view case study", while sighted colleagues talk about "Explore Project".

The axe rule is `label-content-name-mismatch`. It was flagged on 1 tile at 1440 px and 2 at 375 px (the tiles axe checked fully). Expect this finding in every axe run on Our Work until the item is done.

## Why it's on hold

The approved prototype is the source of truth, and the decision was to match it exactly, hidden markup included. Nothing about this is visible on screen.

## Proposed fix (no visible change)

In `CaseStudyGridClient.tsx`:

1. Remove the tile's `aria-label`, so the button's name comes from the text on the tile.
2. Mark the decorative parts `aria-hidden="true"`: the number, the tags, "Key visual to come" and the summary. They all appear again in the case study view when the tile opens.

The name then reads, for example: "UCI · UCI Cycling Esports World Championships 2024 & 2025 · Explore Project".

Option: keep the summary in the name if PLG prefers screen-reader users to hear it on the tile (longer names; voice control works either way).

**Unchanged:** look, layout, hover, filter, video, opening/closing a case study, keyboard focus.

## Acceptance criteria

- axe on Our Work at 1440 and 375: 0 `label-content-name-mismatch`.
- Each tile's accessible name (Chrome accessibility tree) contains the client, the title and "Explore Project".
- Tile → case study → Esc returns focus to the tile, as now.
- Layout comparison of Our Work at 1440, 1000, 375 and 320: 0 differences.
- Update E2E-8-5 in `docs/e2e-test-plan.md`, the decisions log in `CLAUDE.md`, and remove this item from `docs/backlog.md`.
