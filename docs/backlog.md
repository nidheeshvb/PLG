# Backlog: features waiting for a decision

_Last updated: 19 November 2026_

**Client-facing version:** [client-action-items.md](client-action-items.md) is the plain-language list PLG answers (reviewed with the user on 2026-11-19): what each form should do, the CV box, Cookiebot + Google Analytics accounts, footer social links, and the first CMS account.

**Rule:** when a section or feature is pending or waiting for a decision, we still build its **UI exactly as designed**, skip only the logic behind it, and list it here. Nothing blocked is dropped from a page, and nothing deferred is forgotten.

Each item links to a detail doc. That doc covers what is built, what is skipped, the open questions, the proposed implementation and the acceptance criteria. Remove an item only when it is fully done, and update the docs listed in `CLAUDE.md` when you do.

| # | Feature | Where | UI on the site | What is skipped | Waiting for | Detail |
|---|---|---|---|---|---|---|
| 1 | CV upload | Join Us → "Send us your profile" form | ✅ Drop zone shown (file name and size after picking) | The file is not sent, stored or shown in Form messages | Client: retention, access, consent, ATS; AWS: private S3 bucket | [backlog-cv-upload.md](backlog-cv-upload.md) |
| 2 | Form notifications / CRM hand-off | All forms (Home enquiry, Contact detailed enquiry, job application) | ✅ Forms work; messages saved to Inbox → Form messages | No email to PLG, no HubSpot (CRM) or careers-system hand-off | Client: what each form should do (HubSpot, an email address, a recruiting system), then access / addresses / SES details | Asked in [client-action-items.md](client-action-items.md) section 1 (one row per form); detail doc to write when picked up (SMTP adapter is already env-gated: `integrations/email.ts`; HubSpot goes in `integrations/hubspot.ts` behind an env var) |
| 3 | Cookie consent and analytics | Whole site; Legal → Cookies | ✅ "Manage Cookie Preferences" button and cookie table on the Cookies page (button shows a "not connected yet" note); no consent banner (not in the prototype) | Consent banner, opening the preferences panel, analytics tags, the real cookie list | **Decided 2026-11-19:** Google Analytics 4 + Cookiebot (free plan), no ad tags. Waiting for PLG to create both accounts and add us (and to name any other tracking tools) | Detail doc to write when picked up (Cookiebot free: 1 domain, ≤50 pages, consent renewed monthly, manual blocking; GA4 through Google Consent Mode) |

## Closed

| # | Feature | Closed | Decision |
|---|---|---|---|
| 4 | Extra case study sections | 2026-11-19 | Not built: the approved design keeps them switched off, and the site matches it. See [backlog-case-study-extras.md](backlog-case-study-extras.md) if PLG asks for them later |
| 5 | Footer legal link wording | 2026-11-19 | Keep "Privacy · Terms & Conditions · Cookies" (the Home/About design wording). PLG can change it in the CMS. See [backlog-footer-legal-wording.md](backlog-footer-legal-wording.md) |

## Adding an item

1. Build the UI as the prototype shows it. Make it inert in a way developers can see: for example, an input without a `name`, or a button with no action, plus a code comment that points to the detail doc.
2. Add a row above and create `docs/backlog-<feature>.md`, using [backlog-cv-upload.md](backlog-cv-upload.md) as the template.
3. Note any risk to visitors (e.g. "applicants may think the CV was sent") in the detail doc.
4. Mention the item in the client-facing docs where relevant (technical documentation, "Items needed from PLG Acachet"; editor guide if editors would notice).
