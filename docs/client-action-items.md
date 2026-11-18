# PLG Acachet website: decisions and content we need from you

_Last updated: 18 November 2026 · For: PLG Acachet · From: the website team_

All pages from the approved design are built and editable in the CMS. A few parts of the site are **built and visible, but waiting on a decision, an account or content from you** before they can work fully. Nothing has been removed from the design while we wait: where the logic is pending, the part is shown as designed and simply does not do its final job yet.

This document lists every one of those items, what we need from you, and what happens if we get no answer before launch.

**Priority key**
- 🔴 **Needed before launch**: the site should not go live without it.
- 🟠 **Strongly recommended for launch**: the site works without it, but something visitors or your team expect is missing.
- 🟢 **Can follow after launch**.

---

## 1. Summary

| # | Item | Where on the site | Priority | What we need from you |
|---|---|---|---|---|
| A1 | Send form enquiries to **HubSpot** | Home enquiry form, Contact form | 🔴 | HubSpot account access, which forms go to HubSpot, field mapping, consent settings |
| A2 | **Email alerts** for new form messages | All forms | 🔴 | Who receives each type of message; sender address; auto-reply wanted? |
| A3 | **CV upload** on job applications | Join Us → "Send us your profile" | 🟠 | Whether to accept CVs, who can see them, how long they are kept, consent wording, ATS |
| A4 | **Cookie consent and analytics** | Whole site; Legal → Cookies | 🔴 (if any tracking is used) | Consent platform, analytics tool, list of cookies |
| A5 | **Legal wording** | Terms, Privacy Policy, Cookies | 🔴 | Counsel-approved text, dates and version |
| A6 | **Scheduled publishing** in the CMS | CMS | 🟢 | Is it needed at launch? |
| A7 | **Who may delete content** in the CMS | CMS | 🟠 | Should editors be able to delete pages, or only admins? |
| A8 | **Arabic version** | Whole site | 🟢 | Is one planned, and when? |
| A9 | **Old website addresses** | Domain | 🔴 (if you have a current site) | List of current URLs to redirect |
| A10 | **Hosting approval** | AWS | 🔴 | Approval, AWS account access, domain, expected traffic |
| A11 | **CMS accounts** | CMS | 🔴 | Names, emails and roles of the people who will edit |
| B1–B9 | **Content to supply or confirm** | Most pages | 🔴 / 🟠 | See section 3 |
| C1 | Footer legal link wording | Footer | 🟢 | Pick one of two wordings |
| C2 | Extra case study sections | Our Work → case study | 🟢 | Are they wanted? |

---

## 2. Integrations and decisions

### A1. HubSpot: send enquiries to your CRM 🔴

**Today:** the Home enquiry form and the Contact page form work: they check the visitor's details and save every message in the CMS (**Inbox → Form messages**). Nothing is sent to HubSpot yet.

**What we will build:** each enquiry is sent to HubSpot as a contact (and form submission) the moment it is received. A copy stays in the CMS so nothing is lost if HubSpot is briefly unavailable.

**What we need from you:**

| # | Question / item | Notes |
|---|---|---|
| 1 | Your **HubSpot account** (portal ID) and a team member who can create access for us | We will need a *private app* access token with permission to create contacts / submit forms. Please share it through a password manager or your IT team, **never by email**. |
| 2 | Which forms go to HubSpot? | Home enquiry · Contact detailed enquiry · job applications (or do applications go elsewhere, see A3)? |
| 3 | Do you want us to use **HubSpot forms** (you create the forms in HubSpot and we send to them) or create contacts directly? | HubSpot forms are recommended: your team sees submissions in HubSpot's form reports and can add workflows without us. |
| 4 | **Field mapping**: where should each field land? | Name, email, phone, company, message, *"What are you looking to unlock?"* choices (Strategy, Media, Delivery, Careers…), page the form was sent from. The choices probably need a custom HubSpot property. |
| 5 | **Consent**: which HubSpot subscription types / legal basis should a submission carry? | The Contact form has a consent tick box ("use my details to reply"). Do you also want an optional "send me news" tick box for marketing? |
| 6 | After a submission: lead owner, lead status, lifecycle stage, internal notification? | Can be done by HubSpot workflows on your side. |
| 7 | Do you want the **HubSpot tracking code** on the site? | It sets cookies, so it must wait for visitor consent (see A4). |

**If no answer by launch:** messages stay in the CMS inbox only, and someone must check it regularly (see A2 for email alerts).

### A2. Email alerts for new form messages 🔴

**Today:** messages are saved in the CMS, but **nobody is notified**. A new enquiry or job application is only seen if someone opens the CMS.

**What we need from you:**
1. Who should receive an email for each type: **enquiries** (Home, Contact) and **job applications**? One address each, or a shared inbox (e.g. hello@ / careers@)?
2. The address emails are sent **from** (e.g. no-reply@plgacachet.com). Your IT team will need to add a few DNS records (SPF, DKIM, DMARC) so emails don't land in spam. We will send the exact records.
3. Should visitors get an **automatic confirmation email** ("Thanks, we've got your message")? If yes, approve the wording.

If HubSpot (A1) sends these notifications for you, we only need the job-application recipient here.

### A3. CV upload on job applications 🟠

**Today:** the Join Us form shows the CV drop zone as designed (visitors can pick a file and see its name), but **the file is not sent or stored**. The rest of the form works, including the LinkedIn / portfolio link.

> Risk if the site launches before this is done: applicants may think their CV was sent. If needed, we can add a short note under the field such as "CV uploads are coming soon: add your LinkedIn link above".

CVs are personal data, so they must be stored privately (not with the website's public images) and handled under UAE data protection law (and GDPR for EU applicants).

**What we need from you:**

| # | Question |
|---|---|
| 1 | Do you want CV uploads at launch, or is the LinkedIn / portfolio link enough for now? |
| 2 | Who may download CVs: CMS admins only, or editors too? |
| 3 | How long should CVs be kept? Delete automatically after that? |
| 4 | Consent wording on the form (e.g. "I agree that PLG Acachet keeps my profile on file for [x] months"). |
| 5 | Should applications go to an applicant-tracking system (ATS) or HR mailbox instead of, or as well as, the CMS? Which one? |
| 6 | File rules as designed: PDF or Word, up to 10 MB? |
| 7 | Do uploads need virus scanning (small extra AWS cost)? |
| 8 | A private storage location on your AWS account (we will specify it; part of A10). |

### A4. Cookie consent and analytics 🔴 if any tracking is used

**Today:** the Cookies page shows the **Manage Cookie Preferences** button and a cookie table, as designed. The button shows a "not connected yet" note. There is **no analytics** and **no consent banner** on the site (the design has no banner). The site currently sets no tracking cookies, so it is compliant as it stands.

**What we need from you:**
1. Do you want **analytics**? Which tool (e.g. Google Analytics 4, HubSpot analytics, a cookie-free tool such as Plausible)?
2. Which **consent platform** (e.g. Cookiebot, OneTrust, HubSpot's cookie banner)? It provides the banner and the preferences panel the button will open. A banner is required as soon as any non-essential cookie (analytics, HubSpot tracking, ads) is added.
3. Any **marketing tags** (LinkedIn Insight, Meta Pixel…)?
4. The final **cookie list** for the Cookies page (the consent platform usually produces it after a scan).

### A5. Legal wording 🔴

**Today:** Terms & Conditions, Privacy Policy and Cookies pages are built with the design's outline and **placeholder text**, plus a notice box saying counsel must write them.

**What we need from you:** counsel-approved wording for the three documents, the "last updated" / "effective from" dates and version number. The Privacy Policy should also cover HubSpot (A1), CVs (A3) and analytics (A4) once decided. Your team can paste the text straight into the CMS; we can help with formatting.

### A6. Scheduled publishing 🟢

The CMS shows a **Schedule Publish** option (publish a change at a set date and time). It is not switched on yet, so a scheduled change never goes live. Do you need scheduling at launch? If yes, we will switch it on; if not, we will hide the option so nobody relies on it.

### A7. Who may delete content 🟠

Today, **editors can delete pages**, case studies, team members and open roles, the same as admins. Editors can always hide sections or unpublish a page instead. Should deleting be **admin-only**? (Recommended: yes for pages.)

### A8. Arabic version 🟢

The site is English only. Is an Arabic version planned? It affects layout (right-to-left), fonts, the CMS (each field in two languages) and URLs, so it is best to know early, even if it comes later.

### A9. Old website addresses 🔴 if you have a current site

If plgacachet.com (or another domain) has a site today, please send the list of its main addresses (or access to it). We will redirect each one to the matching new page so links and Google rankings are kept.

### A10. Hosting approval 🔴

As described in the hosting proposal (AWS, Middle East – UAE region). We need:
- your approval of the proposed setup;
- an AWS account (or access to yours) and who owns billing;
- the **domain** and access to its DNS;
- expected monthly visitors, to size the server and confirm cost;
- confirmation that **one server** is enough at launch (several servers need an extra shared cache; we recommend one, with automatic recovery).

### A11. CMS accounts 🔴

Names and email addresses of the people who will edit the site, and whether each is an **Admin** (everything, including users) or an **Editor** (content only).

---

## 3. Content to supply or confirm

The site was filled with the design's content so every page looks finished. These are the parts that are **placeholders or need your confirmation**. Your team can update all of them in the CMS; we are happy to load them for you if you send them.

| # | Page / section | What is there now | What we need |
|---|---|---|---|
| B1 | **Contact** → office details | Email, phone, address and opening hours from the design | Confirm or correct them |
| B2 | **Footer** and **team members** → social links | Placeholder links to the Instagram / LinkedIn / X home pages | Your real company profiles, and each team member's LinkedIn / Instagram / X (or tell us to hide them) |
| B3 | **The Team** → people | Names and titles from the design; no bios; **no photos for Sherif Saed and Emma Valdez** (silhouette shown) | Bios (50–70 words each), the two missing photos, confirmation of the org chart (who reports where, heads of department) |
| B4 | **Join Us** → open roles | The design's six roles, with no descriptions | The real open roles: title, team, location, contract type, short summary and key points |
| B5 | **Our Work** → case studies | Key visuals for **G42, Pizza Hut and Red Bull** are library photos ("Key visual to come"); galleries use library shots; some facts in **[square brackets]** (e.g. years) are marked "to confirm" | Key visuals, project photos for each gallery, confirmation of every bracketed fact, approval of figures and quotes |
| B6 | **About** → Mujtamae report card | An illustrative mock-up (figures and wording) | Confirm the figures/wording or send real ones |
| B7 | **Home / About / Services** → figures and copy | Figures and text from the design (stats, years, counts) | A final read-through and sign-off of all copy and numbers |
| B8 | **Legal** pages | Placeholder text | See A5 |
| B9 | **Home** showreel and banner videos | The videos supplied with the design | Confirm these are the final edits (and send a lighter phone version if you have one) |

---

## 4. Small design choices

### C1. Footer legal link wording 🟢
The design's pages use two wordings: "Privacy · Terms & Conditions · Cookies" (current) or "Privacy Policy · Terms and Conditions · Cookies" (most pages of the design, matches the page titles; **our recommendation**). Please pick one. It is a CMS change, no development needed.

### C2. Extra case study sections 🟢
The design contains a few case study parts that it keeps switched off: a "Measured through Mujtamae" link, an "idea" one-liner, a 5-step operating model, an intro paragraph, and an "at a glance" list. Do you want any of them? If yes: which case studies were measured through Mujtamae, and what are the five operating-model steps?

---

## 5. What happens next

1. Please reply to the items in sections 2–4 (a short answer per number is enough; e.g. "A1-2: Home and Contact only").
2. Send content (section 3) by email or a shared folder; large files (photos, videos) through a shared drive.
3. Send credentials (HubSpot token, AWS access, DNS) **only through a password manager or your IT team**, never by email or chat.
4. We build each item as its answer arrives, test it on a staging site, and then you review before launch.
