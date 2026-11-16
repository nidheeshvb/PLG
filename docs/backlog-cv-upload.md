# Backlog: CV upload on the Join Us application form

_Status: **on hold**: waiting for client confirmation and AWS S3 access. Last updated: 2026-11-16._

The Join Us page ("Send us your profile" form) shows the CV field as designed (drop zone, picked file name and
size, drag highlight), but **the file is not sent or stored**: the `<input type="file">` has no `name`, so it is
not part of the submitted form. Everything else works: name, email, role, discipline, LinkedIn/portfolio link
and message are saved to **Inbox → Form messages** in the CMS.

> Risk while on hold: applicants may think their CV was sent. Consider a short note under the field
> (e.g. "CV uploads are coming soon; add your LinkedIn link above") if the page goes live before this is done. This document collects what we need to add the CV upload later.

## What the prototype shows

- A "CV" field under the link field: a dashed drop zone that says "Upload your CV" and "PDF or Word, up to 10 MB".
- It accepts `.pdf`, `.doc` and `.docx` files, by click or drag-and-drop.
- After a file is chosen, it shows the file name and size, with "choose again to replace".
- The field is optional. Only name, email and discipline are required.

## Why it is on hold

CVs are personal data, so they can't be handled like website images.

1. **Storage needs AWS S3 access.** CVs must be stored privately, never in the public media bucket or behind
   CloudFront. We need either a private bucket or a private prefix in the planned bucket, plus IAM credentials
   for the EC2 role. The application server's disk is not an option, because it doesn't persist across
   deployments.
2. **The client must confirm the data-handling rules** (questions below).

## Questions for the client

| # | Question | Why it matters |
|---|---|---|
| 1 | Do you want CV uploads, or is a LinkedIn/portfolio link enough for now? | The link field already works. |
| 2 | Who may download CVs? Admins only, or editors too? | Sets CMS access rules. |
| 3 | How long should CVs be kept, and should they be deleted automatically? | Retention and privacy policy (UAE PDPL / GDPR for EU applicants). |
| 4 | Should the form ask for consent, e.g. "I agree that PLG Acachet keeps my profile on file"? | Legal wording for the privacy policy and the form. |
| 5 | Should applications go into an applicant-tracking system (ATS) or HR email, not just the CMS? | Could replace CMS storage entirely. |
| 6 | Should someone be emailed when an application arrives? To which address? | Uses the SMTP/SES integration (already env-gated). |
| 7 | File rules: PDF/Word only, up to 10 MB, as in the prototype? | Validation limits. |
| 8 | Do uploads need virus scanning (e.g. Amazon GuardDuty Malware Protection for S3)? | Extra AWS service and cost. |

## What we need from the client / AWS

- A private S3 bucket (or private prefix) in **me-central-1**, with block-public-access on.
- An IAM policy for the EC2 instance role: `s3:PutObject`, `s3:GetObject` and `s3:DeleteObject` on that bucket/prefix only.
- Answers to the questions above, and an update to the privacy policy text.

## Proposed implementation (when unblocked)

1. **Collection** `application-files`: a Payload upload collection with `.pdf/.doc/.docx` MIME types and
   a 10 MB limit. Access: `create` false (server only), `read` per answer 2, `delete` admin. It is not
   publicly readable, and files are served only through Payload's authenticated `/api/application-files/file/...`.
2. **Storage**: a second collection entry in `integrations/storage.ts` behind its own env var
   (e.g. `S3_PRIVATE_BUCKET`). It does **not** use `disablePayloadAccessControl`, so downloads go through
   Payload's access checks. With the env var unset, files use local disk (dev only).
3. **Form**:
   - The drop zone already exists in `blocks/Form/ApplicationForm.tsx` (styles `.file`, `.fileIc`, `.fileT` in `Application.module.css`). Give the input `name="cv"`, add client-side type/size checks and an error line.
   - The `submitApplication` server action (`app/(frontend)/actions.ts`) checks size and type on the server and checks the file's magic bytes, not only its extension.
   - It then creates the file doc and links it from the submission.
   - Raise `serverActions.bodySizeLimit` in `next.config` to about 11 MB.
4. **Form messages**: add a `cv` upload field (relationship to `application-files`) to `form-submissions`,
   shown only for job applications.
5. **Abuse protection**: keep the existing honeypot, add per-IP rate limiting (or AWS WAF rate rules) and
   optionally a CAPTCHA.
6. **Retention**: a scheduled job (Payload jobs queue or a cron on EC2) that deletes CVs older than the agreed
   period (answer 3).
7. **CloudFront**: `/api/*` is already uncached; no public path serves CVs.
8. **Docs**: update the editor guide (where to find CVs), architecture.md (B9 integrations, env vars),
   local-setup.md, technical-documentation, `.env.example` and CLAUDE.md.

## Acceptance criteria

- An applicant can attach one PDF/Word file up to 10 MB. Wrong types or sizes show a clear message in the
  browser and are also rejected on the server.
- The CV is stored privately in S3. A logged-out request for its URL is refused.
- Allowed CMS users can open the CV from the form message.
- The site works locally with the S3 variable unset.
