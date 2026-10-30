# PLG Acachet: site prototype

Static HTML prototype. Updated 30 October 2026.

## Open it
Double-click `pages.html` for the index of every page, or `index.html` for the homepage.
For the most reliable result (video autoplay, page links), serve the folder locally:

    python3 -m http.server 8000      # then visit http://localhost:8000/pages.html

## Pages
| File | Page | Planned URL |
|---|---|---|
| index.html | Home | / |
| about.html | About Us | /about |
| our-story.html | Our Story | /about/our-story |
| team.html | The Team | /about/team |
| join.html | Join Us | /about/join-us |
| services.html | Services | /services |
| our-work.html | Our Work (case studies open at `#case-<name>`) | /our-work |
| contact.html | Contact | /contact |
| legal.html | Legal: `#terms`, `#privacy-policy`, `#cookies` | /legal/terms, /legal/privacy-policy, /legal/cookies |
| pages.html | Page index (not part of the live site) | — |

Each page is self-contained: CSS and JS are inline; images, video, favicon and the share image are in `assets/`.
Fonts load from Google Fonts (Inter).

## Optimisation pass (30 Oct 2026)
- Standalone documents: `lang="en"`, charset and viewport, page titles in the "Page | PLG Acachet" pattern, real meta descriptions.
- Favicon, Apple touch icon, theme colour, Open Graph / Twitter share tags (share image `assets/og-image.jpg`).
- Banner image preloaded with high priority; images below the first screen lazy-load; all images decode asynchronously.
- Homepage images load directly (the old script-based image loader is removed).
- Logo resized to its display size (8 KB → 3 KB).
- "Skip to content" link on every page for keyboard users.
- All internal links checked: every page and section link resolves.

## Before launch
- Share tags use relative image paths; switch to absolute URLs once the domain is set. Add canonical URLs then too.
- Copy, figures and case-study content marked as placeholders still need PLG's approved text.
- Office address, email and phone on Contact are placeholders.
- Forms (Contact, Join Us, homepage) do not send anything yet: connect them to the CRM / careers system.
- Legal wording must be drafted and approved by qualified counsel; confirm the cookie / consent platform.
- The UCI Championship tile video is a stand-in cut from the showreel.
