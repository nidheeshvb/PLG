# PLG Acachet: Proposed Hosting Architecture

_Local copy of the Google Doc "PLG Acachet: Proposed Hosting Architecture", prepared 12 November 2026._
_Source: https://docs.google.com/document/d/14CcWwoTUNQkkwt1IuCfE7VIPfJSv9roqHMVf5_4o5S4/edit_
_Copied 13 November 2026. If the Google Doc changes, update this copy and `docs/architecture.md` Part B._

> **Status:** this is the production architecture the project is being built for. Decisions may change later; the application keeps every external service (storage, CDN invalidation, email) behind environment variables so it can be switched without code changes.

---

## Goal

Fast loading of images and videos for visitors in the UAE and the wider region, on a stack that is easy to manage. The website is built with Next.js, with Payload CMS for content management.

**Hosting region:** AWS Middle East (UAE), `me-central-1`. This is the AWS region closest to Dubai.

## Components

| # | Component | Service | Purpose |
|---|---|---|---|
| 1 | DNS | Amazon Route 53 | Domain management and routing |
| 2 | SSL certificate | AWS Certificate Manager | Free HTTPS certificate with automatic renewal |
| 3 | Content delivery network (CDN) | Amazon CloudFront | Caches the whole site (pages, images, videos) on servers close to visitors, including locations in the UAE |
| 4 | Application server | Amazon EC2 | Runs the website (Next.js) and the content management system (Payload CMS) |
| 5 | Database | Amazon RDS for PostgreSQL | Stores CMS content, with automated daily backups |
| 6 | Media storage | Amazon S3 | Stores images, videos and documents uploaded through the CMS |
| 7 | Security (optional) | AWS WAF | Firewall against bots and common attacks |
| 8 | Monitoring | Amazon CloudWatch | Uptime, performance and error alerts |

## How images and videos load fast

- **Images:** the CMS automatically creates several sizes of each uploaded image in modern formats (WebP/AVIF). Each visitor's device downloads only the size it needs, served from the CDN.
- **Videos:** the site's videos are short background clips, so they are stored as optimised MP4 files on S3 and delivered through the CDN. Phones get a lighter mobile version, and a preview image shows instantly while the video loads.
- **Pages:** pages are pre-built and cached at the CDN, so most visits never have to wait for the server.

## Video hosting and Bunny Stream

We reviewed the current site's media. It has two video files, both short:

| Video | Length | Resolution | Size | Used as |
|---|---|---|---|---|
| Homepage hero reel | 50.5 seconds | 960 × 540 | 4.7 MB | Muted background loop on Home and Our Work |
| UCI case-study clip | 2.2 seconds | 1280 × 720 | 0.6 MB | Case-study clip (background loop and with player controls) |

There are no long videos and no YouTube or Vimeo embeds. Short muted clips like these load fastest as plain MP4 files from S3 and CloudFront, so a separate video streaming service is not needed at launch.

Bunny Stream was considered for video delivery. It is built for longer videos with a player: it converts uploads into several qualities automatically and streams them adaptively. For short background loops it adds a player and start-up delay, a second provider and a custom CMS integration, without making the videos load faster.

If the site later needs long videos with a player (for example full case-study films), or the team wants to upload raw footage and have it compressed automatically, we can add Bunny Stream or AWS MediaConvert at that point. The rest of the architecture stays the same.

## Next steps

- Confirm expected monthly visitors so we can size the server and database and prepare a cost estimate.
