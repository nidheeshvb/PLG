# Local setup guide

How to get the PLG Acachet website (Next.js + Payload CMS) running on your own computer, from a fresh machine to a working site and CMS.

_Last updated: 16 November 2026_

**Time needed:** about 15–20 minutes (most of it is downloading packages).
**Result:** the website at <http://localhost:3000> and the CMS at <http://localhost:3000/admin>, filled with the Home page content.

---

## 1. Requirements

| Tool | Version | Check with | Notes |
|---|---|---|---|
| Git | any recent | `git --version` | <https://git-scm.com/downloads> |
| Node.js | **20.18 or newer** (22 LTS recommended) | `node -v` | <https://nodejs.org> (LTS). The project uses Payload 3.91, the newest release that supports Node 22.17; newer Payload versions need Node ≥ 22.23 |
| npm | 10 or newer (comes with Node) | `npm -v` | Use npm, not pnpm/yarn: the lock file is `package-lock.json` |
| PostgreSQL | **not required** | — | A local PostgreSQL server is downloaded with the packages and started with one command. You can use your own PostgreSQL 14+ instead (step 5, option B) |
| Disk space | ~2 GB | | packages, local database, uploaded media |
| Free ports | 3000 (website) and 5433 (local database) | | change them if they are taken (see Troubleshooting) |

Works on Windows 10/11, macOS (Intel and Apple Silicon) and Linux (x64/arm64).

> **Windows tip:** keep the project in a normal folder such as `C:\dev\plg`, not inside OneDrive/Dropbox. Syncing `node_modules` and the local database makes everything slow and can lock files.

## 2. Get the code

```bash
git clone https://github.com/nidheeshvb/PLG.git
cd PLG
git checkout dev
```

You need read access to the repository; ask the project owner if `git clone` asks for permission.

What's in the repository:

| Folder | What it is |
|---|---|
| `web/` | The application. All commands below run inside it |
| `assets/`, `*.html` | The original HTML prototype and its images/videos. The seed step (step 7) imports media from `assets/` |
| `docs/` | Documentation (this guide, architecture, hosting plan, technical documentation) |
| `CLAUDE.md` | Developer knowledge base: conventions, decisions, known issues |

## 3. Install packages

```bash
cd web
npm ci
```

- `npm ci` installs the exact versions from `package-lock.json` (use `npm install` only when adding or upgrading a package).
- It also downloads the local PostgreSQL binaries for your operating system (`embedded-postgres`).
- Warnings such as `deprecated` or `EBADENGINE` for build tools are expected; an **error** is not (see Troubleshooting).

## 4. Create your settings file

Copy the example settings and fill in the blanks:

```bash
cp .env.example .env
```

(Windows Command Prompt: `copy .env.example .env`.)

Open `web/.env` and set:

| Setting | What to put |
|---|---|
| `DATABASE_URL` | Leave as is for the built-in local database: `postgres://postgres:postgres@127.0.0.1:5433/plg` |
| `PAYLOAD_SECRET` | A long random string (generate below) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |
| `PREVIEW_SECRET` | Another random string |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Your local admin login (any email format works, e.g. `admin@plg.test`) |
| `SEED_EDITOR_EMAIL` / `SEED_EDITOR_PASSWORD` | A local editor login for testing the editor view |
| Everything under "Production integrations" | **Leave empty.** S3, CloudFront and email stay off locally; files are saved to `web/media/` and emails are printed in the terminal |

Generate random strings with Node:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

`.env` is ignored by git. Never commit it or share it.

## 5. Start the database

### Option A — built-in local PostgreSQL (recommended)

Open a **second terminal**, go to `web/` and run:

```bash
npm run db
```

- The first run creates the database cluster in `web/.postgres` and a database called `plg`.
- Wait for: `PostgreSQL ready: postgres://postgres:postgres@127.0.0.1:5433/plg`.
- **Keep this terminal open** while you work. Stop it with `Ctrl+C`.
- Change the port with `PG_PORT=5434 npm run db` (and update `DATABASE_URL` to match).

### Option B — your own PostgreSQL

If you already run PostgreSQL 14+ (installed locally or a cloud database):

```sql
CREATE DATABASE plg;
```

Then set `DATABASE_URL` in `.env`, for example `postgres://USER:PASSWORD@localhost:5432/plg`. For cloud databases that require TLS add `?sslmode=require`. Skip `npm run db`.

### Option C — PostgreSQL in Docker

```bash
docker run --name plg-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=plg -p 5433:5432 -d postgres:16
```

Keep the default `DATABASE_URL`. Start it again later with `docker start plg-postgres`.

## 6. Create the database tables

Nothing to run in local development: the first command that connects (the seed in step 7, or `npm run dev`) creates and updates the tables automatically from the CMS configuration (you'll see "Pulling schema from database…").

> Shared and production databases use versioned migrations instead (`npm run migrate`). Don't run `npm run migrate` against your local database unless you're testing a migration; if Payload asks whether to continue because the database was created in development mode, answer **no** for a normal local setup.

## 7. Load the content (seed)

With the database running, in your first terminal (inside `web/`):

```bash
npm run seed
```

This:
- creates the admin and editor users from your `SEED_*` settings,
- uploads the Home, About and Team images (including `assets/team/` portraits), videos and logos from the prototype's `assets/` folder (and fills in alt text added to the seed later, unless an editor already wrote one),
- creates the partner logos, the eight case studies (with their full content), the 11 team members, the 6 open roles, the **Home**, **About**, **Our Story**, **The Team**, **Join Us**, **Services**, **Our Work** and **Contact** pages and the three **Legal** documents (Terms, Privacy Policy, Cookies) with all their sections; the **Legal** page forwards to Terms. Also the company details used by the legal pages, the header/footer links (including the About sub-links in the mobile menu) and the site-wide call to action.

It ends with `Done.` It's safe to run again: it updates existing records instead of duplicating them (it never changes an existing user's password).

## 8. Start the website

```bash
npm run dev
```

Open:
- Website: <http://localhost:3000>
- CMS: <http://localhost:3000/admin> — sign in with the admin or editor email and password from your `.env`
- Health check: <http://localhost:3000/next/health> → `{"status":"ok","db":"ok"}`

The first page load compiles the app and can take 15–30 seconds; after that it's fast and reloads automatically when you edit code.

## 9. Check that everything works

- [ ] The Home page shows the showreel, then all sections down to the contact form and footer.
- [ ] Resizing the browser to phone width shows the mobile menu and swipeable cards.
- [ ] <http://localhost:3000/about> shows the About page: banner with breadcrumb, section menu, and every section down to the white "Start a conversation" banner.
- [ ] <http://localhost:3000/about/our-story> shows Our Story: breadcrumb "Home / About Us / Our Story", the section menu with "Back to About Us", and the lines of the diagram drawing as you scroll.
- [ ] <http://localhost:3000/about/team> shows The Team: the portrait grid, the **Org chart** switch, the **Show** filter (All 11 / Management 4 / Creative 4), and a profile panel when a name is clicked.
- [ ] In the CMS, **Pages → Home** lists nine sections, **Pages → About Us** ten, **Pages → Our Story** five and **Pages → The Team** six, and **Content → Team members** lists 11 people; editing text and clicking the eye icon shows a live preview.
- [ ] Submitting the contact form shows "Sent", and the message appears under **Inbox → Form messages**.

## 10. Everyday use

Start working:

```bash
# terminal 1 (inside web/)
npm run db
# terminal 2 (inside web/)
npm run dev
```

After pulling new changes from git:

```bash
git pull
npm ci                 # only needed if package-lock.json changed
npm run dev            # the local database schema updates itself
```

If the new changes include new pages or content in the seed, run `npm run seed` again.

### Commands

| Command | What it does |
|---|---|
| `npm run db` | Start the local PostgreSQL |
| `npm run dev` | Start the website + CMS in development mode |
| `npm run seed` | Load/refresh prototype content and create local users |
| `npm run lint` | Check code style and React rules |
| `npm run typecheck` | Check TypeScript types |
| `npm run build` | Production build (database must be running) |
| `npm run start` | Run the production build on port 3000 |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing any CMS collection, global or block |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |
| `npm run migrate:create -- <name>` | Create a database migration after a schema change (commit it) |
| `npm run migrate` | Apply migrations (shared/staging/production databases) |

### Try the production build locally

```bash
npm run build
npm run start
```

Then open <http://localhost:3000>. Stop `npm run dev` first; both use port 3000.

### Start again with a clean database

Stop `npm run db` and `npm run dev`, then delete the local data and reload it:

```bash
# inside web/  (Windows PowerShell: Remove-Item -Recurse -Force .postgres, media)
rm -rf .postgres media
npm run db       # terminal 1
npm run seed     # terminal 2
npm run dev
```

## 11. Optional: test the production integrations locally

The production setup (see `docs/hosting-architecture.md`) uses Amazon S3, CloudFront and SES. Each switches on when its settings are filled in `.env`:

| To test | Set |
|---|---|
| S3 media storage | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` (a test bucket and an IAM user with access to it). For an S3-compatible local server such as MinIO also set `S3_ENDPOINT` |
| Media from a CDN | `MEDIA_PUBLIC_URL` (restart `npm run dev` afterwards) |
| Email | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM_ADDRESS` |
| CDN refresh on publish | `CLOUDFRONT_DISTRIBUTION_ID` plus AWS credentials in your environment |

Restart `npm run dev` after changing `.env`. Files uploaded while S3 is on live in the bucket, not in `web/media/`.

## 12. Troubleshooting

| Problem | Fix |
|---|---|
| `EBADENGINE` error or Payload refuses to start | Check `node -v` is 20.18+ (22 LTS recommended) |
| `npm run db`: "port 5433 already in use" | Another PostgreSQL is running. Use `PG_PORT=5434 npm run db` and change `DATABASE_URL` to `:5434` |
| `npm run db` fails on Windows | Install the latest "Microsoft Visual C++ Redistributable (x64)" and try again; or use option B/C in step 5 |
| `npm run dev`: port 3000 in use | `npx next dev -p 3001` and set `NEXT_PUBLIC_SITE_URL=http://localhost:3001` |
| `ECONNREFUSED 127.0.0.1:5433` | The database isn't running: start `npm run db` (or check your `DATABASE_URL`) |
| Seed fails with "file not found" | Run it inside `web/` from a full clone; it reads images from the repository's `assets/` folder |
| Can't sign in to `/admin` | Use the `SEED_*` email/password from `.env`. The seed doesn't change existing passwords: to reset, delete the user in the CMS as admin, or use "Forgot password" (the reset email appears in the `npm run dev` terminal) |
| The CMS shows a blank page or "component not found" | `npm run generate:importmap`, then restart `npm run dev` |
| TypeScript errors about CMS fields | `npm run generate:types` |
| Images fail with "hostname is not configured" | `MEDIA_PUBLIC_URL` is set to a domain that isn't serving the files; leave it empty locally |
| Everything is very slow on Windows | Move the project out of OneDrive/Dropbox and exclude it from antivirus real-time scanning |
| "Pulling schema" asks to confirm data loss | A field was removed or renamed in the code. For local data you don't need, answer yes; otherwise answer no and ask the team |
| `npm run dev` hangs on the first request after pulling (no error) | The schema sync is waiting for an answer to a "created or renamed?" question in the `npm run dev` terminal. Look at that terminal and pick the first option (create) unless you know a field was renamed. Usually caused by a field renamed in the code after your local database already had the old name |
