# Backlog: extra case study sections (switched off in the design)

_Status: **closed 2026-11-19**: not built. The approved design keeps these parts switched off and the site matches it, so PLG is not asked. Kept for reference in case PLG asks for them later. Last updated: 2026-11-19._

The Our Work prototype (`our-work.html`) includes styles for several extra parts of the full case study view.
Its own script keeps them hidden or never fills them in. The built site matches what the prototype actually
shows, and these parts are not built. If PLG wants any of them, each becomes a case study field and a part of
the view.

| Extra | What it would show | Prototype trace | Notes |
|---|---|---|---|
| "Measured through Mujtamae" link | An orange pill under The Impact that links to About → Mujtamae | `#csMuj` (always `hidden`) | Would be a "Measured through Mujtamae" tick box per case study |
| Idea line | A bold one-liner at the top of The Approach ("The idea: …") | `#csIdea` (hidden) | Text field |
| Operating model | A 5-step numbered row ("model__steps"), with the steps used on this project highlighted | `.model` CSS, no markup | Fixed list of steps plus "used" tick boxes per case study |
| Intro paragraph | A large paragraph under the client / services row | `#csIntro` (hidden) | Textarea |
| "At a glance" / outcomes list | Headline figures repeated near the top, plus a numbered outcomes list | `.glance`, `.outs` CSS, no markup | Probably redundant with The Impact |

## What is built today

The case study view shows: banner (key visual or clip, services, title, one-liner), client / services / market / year,
01 The Brief, 02 The Approach (+ disciplines), a 5-photo gallery, 03 The Impact (2–4 headline figures and other
results), a photo and the film, the next case study and the closing button. The [square brackets] "to confirm"
highlight is built.

## Questions for PLG

1. Do any of these extras add value for your audience? Which ones?
2. For the Mujtamae link: which case studies were measured through Mujtamae?
3. For the operating model: what are the five steps, in your own words?

## If approved

Add the fields to `collections/CaseStudies.ts` ("Case study" tab), render them in
`blocks/CaseStudyGrid/CaseStudyView.tsx` (copy the prototype CSS from `our-work.html`: `.muj`, `.cs__idea`, `.model`,
`.cs__intro`), seed them, then run `generate:types` and `migrate:create`. Update the editor guide (case studies section)
and the other docs per the checklist in `CLAUDE.md`.
