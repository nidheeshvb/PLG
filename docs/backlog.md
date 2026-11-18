# Backlog: features waiting for a decision

_Last updated: 18 November 2026_

**Client-facing version:** [client-action-items.md](client-action-items.md) lists every pending decision and content item (this backlog plus CMS questions, hosting and content) in plain language, for PLG to answer.

**Rule:** when a section or feature is pending or waiting for a decision, we still build its **UI exactly as designed**, skip only the logic behind it, and list it here. Nothing blocked is dropped from a page, and nothing deferred is forgotten.

Each item links to a detail doc. That doc covers what is built, what is skipped, the open questions, the proposed implementation and the acceptance criteria. Remove an item only when it is fully done, and update the docs listed in `CLAUDE.md` when you do.

| # | Feature | Where | UI on the site | What is skipped | Waiting for | Detail |
|---|---|---|---|---|---|---|
| 1 | CV upload | Join Us → "Send us your profile" form | ✅ Drop zone shown (file name and size after picking) | The file is not sent, stored or shown in Form messages | Client: retention, access, consent, ATS; AWS: private S3 bucket | [backlog-cv-upload.md](backlog-cv-upload.md) |
| 2 | Form notifications / CRM hand-off | All forms (Home enquiry, Contact detailed enquiry, job application) | ✅ Forms work; messages saved to Inbox → Form messages | No email to PLG, no HubSpot (CRM) or careers-system hand-off | Client: HubSpot access + field mapping + consent, recipient addresses, ATS; SES/SMTP details | Questions in [client-action-items.md](client-action-items.md) A1–A2; detail doc to write when picked up (SMTP adapter is already env-gated: `integrations/email.ts`; HubSpot goes in `integrations/hubspot.ts` behind an env var) |
| 3 | Cookie consent and analytics | Whole site; Legal → Cookies | ✅ "Manage Cookie Preferences" button and cookie table on the Cookies page (button shows a "not connected yet" note); no consent banner (not in the prototype) | Consent banner, opening the preferences panel, analytics tags, the real cookie list | Client: consent platform and analytics tool (go-live step) | Detail doc to write when picked up |
| 4 | Extra case study sections (Mujtamae link, idea line, operating model, intro, at a glance) | Our Work → full case study | ➖ Not shown (the prototype hides them too) | The fields and their parts of the view | Client: are they wanted, and with which content | [backlog-case-study-extras.md](backlog-case-study-extras.md) |
| 5 | Footer legal link wording | Footer on every page (Site settings → Footer → Legal links) | ✅ Links shown as "Privacy · Terms & Conditions · Cookies" (Home/About prototype wording) | Nothing in code: content choice only. The later inner prototype pages say "Privacy Policy · Terms and Conditions · Cookies"; at ≥1536px the longer wording wraps the footer onto two lines | Client: which wording | [backlog-footer-legal-wording.md](backlog-footer-legal-wording.md) |

## Adding an item

1. Build the UI as the prototype shows it. Make it inert in a way developers can see: for example, an input without a `name`, or a button with no action, plus a code comment that points to the detail doc.
2. Add a row above and create `docs/backlog-<feature>.md`, using [backlog-cv-upload.md](backlog-cv-upload.md) as the template.
3. Note any risk to visitors (e.g. "applicants may think the CV was sent") in the detail doc.
4. Mention the item in the client-facing docs where relevant (technical documentation, "Items needed from PLG Acachet"; editor guide if editors would notice).
