# PLG Acachet Website — Content Editor Guide

How to update the website yourself using the content management system (CMS). No technical knowledge needed.

_Last updated: 16 November 2026 · Covers: Home, About, Our Story, The Team, Join Us, Services, Our Work, Contact and Legal pages, header and footer. More pages are added to this guide as they are built._

---

## Contents

1. [Signing in](#1-signing-in)
2. [Finding your way around](#2-finding-your-way-around)
3. ["I want to…" quick reference](#3-i-want-to-quick-reference)
4. [How a page is built: sections](#4-how-a-page-is-built-sections)
5. [Saving, previewing and publishing](#5-saving-previewing-and-publishing)
6. [Things every section has](#6-things-every-section-has)
7. [Buttons and links](#7-buttons-and-links)
8. [The sections, one by one](#8-the-sections-one-by-one)
9. [Images and videos](#9-images-and-videos)
10. [Case studies](#10-case-studies)
11. [Partner logos](#11-partner-logos)
12. [Team members](#12-team-members)
13. [Open roles](#13-open-roles)
14. [Header and footer](#14-header-and-footer)
15. [Messages from the website](#15-messages-from-the-website)
16. [Users and passwords](#16-users-and-passwords)
17. [Good to know: what affects what](#17-good-to-know-what-affects-what)
18. [Getting help](#18-getting-help)

---

## 1. Signing in

1. Open your website address followed by **`/admin`** (for example `www.yourdomain.com/admin`).
2. Enter your **email** and **password**, then click **Login**.
3. Forgot your password? Click **Forgot password?** on the sign-in page and follow the email.

There are two kinds of account:

| Account | Can do |
|---|---|
| **Editor** | Change everything on the website: pages, images, case studies, logos, menus. Read website messages. |
| **Admin** | Everything an editor can do, plus add or remove user accounts. |

## 2. Finding your way around

After signing in you see the **Dashboard**. The menu on the left (click ☰ if it's hidden) has three groups:

| Group | Item | What it's for |
|---|---|---|
| **Content** | **Pages** | Every page of the website and the sections on it |
| | **Case studies** | The projects shown in the case study tiles |
| | **Partner logos** | The scrolling strip of brand logos |
| | **Team members** | The people shown on The Team page |
| | **Open roles** | The jobs listed on the Join Us page |
| | **Images & videos** | Every picture, logo and video you've uploaded |
| **Inbox** | **Form messages** | Messages and job applications people sent through the website's forms |
| **Settings** | **Header & footer** | The top menu, the site-wide "Start a conversation" banner, footer links and social media links |
| | **Users** *(admins only)* | Who can sign in |

## 3. "I want to…" quick reference

| I want to… | Go to |
|---|---|
| Change a heading or text on the Home page | **Pages → Home →** open the section → edit the text → **Publish changes** |
| Change a button's colour | Open the section → the button → **Button style** → *Orange button*, *Outline button* or *Dark button* ([section 7](#7-buttons-and-links)) |
| Change where a button goes | Open the section → the button → **Goes to** ([section 7](#7-buttons-and-links)) |
| Change a button's words | Open the section → the button → **Text** |
| Replace an image | Open the section → click the image → **Choose from existing** or **Create new** ([section 9](#9-images-and-videos)) |
| Move a section up or down | **Pages →** your page → drag the section by its handle (⠿), or use its **⋯** menu → **Move up / Move down** |
| Hide a section without deleting it | Open the section → **Section settings** → tick **Hide this section on the website** |
| Add a new section | **Pages →** your page → **Add Section** at the bottom of the list (or **⋯ → Add below** on a section) |
| Copy a section | Section **⋯** menu → **Duplicate** |
| Delete a section | Section **⋯** menu → **Remove** (consider hiding instead) |
| Switch a section between white and dark background | Open the section → **Section settings → Background** (only where offered) |
| See my changes before they go live | Click the **eye icon** at the top of the page editor |
| Make my changes live | **Publish changes** (top right) |
| Publish at a later date | Click the small arrow next to **Publish changes → Schedule Publish** |
| Undo a change I already published | **Versions** tab at the top of the page → pick an earlier version → **Restore** |
| Change the numbers (13 years, 100+…) | **Pages → Home → Key numbers** section |
| Add or remove a partner logo | **Partner logos** ([section 11](#11-partner-logos)) |
| Show a different case study on Home | **Pages → Home → Case study showcase** ([section 8](#case-study-showcase)) |
| Add a case study to Our Work | **Content → Case studies → Create New** ([section 10](#10-case-studies)); it appears on Our Work in its **Order** |
| Change the order of case studies on Our Work | **Case studies** → each → **Order** (lower first; numbered 01, 02… automatically) |
| Make a case study tile full width on Our Work | The case study → **Wide tile on Our Work** |
| Edit a full case study (brief, approach, figures, photos) | The case study → **Case study** tab |
| Mark a fact as still to be confirmed | Put it in [square brackets] in the case study text: it shows highlighted in orange until you remove the brackets |
| Link to one case study | Use the web address `/our-work#case-` followed by its **URL name** (e.g. `/our-work#case-kfc`) |
| Change a heading or text on the About page | **Pages → About Us →** open the section → edit → **Publish changes** |
| Make a word in a page banner orange (or not) | Open the **Banner** → **Show the last word in orange** (the last word of the last headline line) |
| Add a section to the About page's section menu | Open the section → **Section settings** → fill in both **Section ID** and **Name in section menu** ([Section menu](#section-menu)) |
| Remove a section from the section menu | Open the section → **Section settings** → empty **Name in section menu** |
| Change the orange words in the Overview paragraph | **Pages → About Us → Lead paragraph** → **Words to show in orange** |
| Change the Vision or Mission | **Pages → About Us → Side-by-side statements** |
| Change the group structure (Getz Group / M&P / PLG Acachet) | **Pages → About Us → Group structure → Group structure (outermost first)** |
| Change the three businesses on Our Story (Acachet, PLG, Mujtamae) | **Pages → Our Story → Lead paragraph → Lanes into one → Rows** |
| Add, edit or remove a person on The Team page | **Team members** ([section 12](#12-team-members)) |
| Change the order of people on The Team page | **Team members** → each person → **Order** (lower first) |
| Change who heads a column in the org chart | **Team members** → the person → **Org chart position** + **Heads this org chart column** |
| Change the "Group scale" names (PLG Acachet → M&P → Getz) | **Pages → The Team → Group chain → Chain of names** |
| Add a job opening to Join Us | **Content → Open roles → Create New** ([section 13](#13-open-roles)) |
| Take a job off the website (keep it for later) | **Open roles** → the role → untick **Show on the website** → **Save** |
| Change a job's description or bullet points | **Open roles** → the role → **Description** / **Key points** |
| Change the order of jobs on Join Us | **Open roles** → each role → **Order** (lower first) |
| Change the four lanes on Join Us ("Commercial thinking"…) | **Pages → Join Us → Lead paragraph → Lanes** |
| Change the markets list (UAE, Asia, Europe…) | **Pages → Join Us → Lead paragraph → Heading, text and list → List** |
| Change the "We look for…" sentence | **Pages → Join Us → Statement** |
| Change the application form's text or button | **Pages → Join Us → Form** (Send us your profile) |
| Read job applications | **Inbox → Form messages** (Form: *Job application*) |
| Change a service's text, sub-services or photos | **Pages → Services →** the **Service detail** section (e.g. *Media*) |
| Add a sub-service (e.g. under Strategy & Consulting) | That **Service detail** → **Content on the right** → the **List of sub-services** → **Add Sub-service** |
| Reorder the photo, list and highlight inside a service | That **Service detail** → **Content on the right** → drag the pieces |
| Add a fifth service | **Pages → Services → Add Section → Service detail**; give it a **Section ID** and **Name in section menu** so it appears in the numbered bar. Numbers (01 / 05…) and grey bands update automatically |
| Change the four category tiles on Services | **Pages → Services → Link tiles** (Four categories) |
| Change which names are orange in a Lead paragraph | Open the **Lead paragraph** → **Orange words** → *Particular words* → list them, separated by commas |
| Change the links in the bar under the Our Story / Team / Join Us banner | **Header & footer → Header → Menu links → About us → Sub-links in the mobile menu** (the bar copies them) |
| Make a page banner's photo brighter, or keep its headline on one line | Open the **Banner** → **Background photo** / **Headline size** |
| Change the "Start a conversation" banner on every page | **Header & footer → Call to action** → **Save** |
| Use a different "Start a conversation" banner on one page | That page → **Call to action banner** → untick **Use the site-wide call to action** → fill in **Content for this page** |
| Change the links under "About us" in the mobile menu | **Header & footer → Header → Menu links → About us → Sub-links in the mobile menu** |
| Change a top-menu link | **Header & footer → Header → Menu links** |
| Change footer or social media links | **Header & footer → Footer** |
| Edit the Terms, Privacy Policy or Cookies text | **Pages → Legal →** the document → **Legal document** → **Sections** |
| Add a section to a legal document | That **Legal document** → **Sections** → **Add Section** (numbered and added to "On this page" automatically) |
| Change the "Last updated" / "Version" facts | That **Legal document** → **Header** → **Facts** |
| Change the company email, phone or address on the legal pages | **Header & footer → Company details** |
| Send visitors from one page to another | That page → **Forward visitors to** (right side) |
| Change how a page appears on Google / when shared | **Pages →** your page → **SEO** tab |
| Read contact form messages and job applications | **Inbox → Form messages** |
| Change the office email, phone, address or hours | **Pages → Contact → Office** → **Contact details** |
| Change the "What are you looking to unlock?" choices | **Pages → Contact → Form** → **Detailed enquiry** → **Choices** |
| Change the promises beside the Contact form | **Pages → Contact → Form** → **Detailed enquiry** → **Promises under the intro** |
| Add a colleague | **Users → Create New** *(admins only)* |

## 4. How a page is built: sections

Every page is a stack of **sections**, shown top to bottom in the order you see them in the CMS.

On **Pages → Home** you'll see a list like:

```
01  Banner (top of page)     Showreel banner
02  Text with image          Who we are
03  Cards                    What we do
04  Stacking panels          Global Bridge / Mujtamae
05  Key numbers              Key numbers
06  Logo strip               Partner logos
07  Case study showcase      Case studies
08  Statement                Brand statement
09  Form                     Contact form
```

On **Pages → About Us**:

```
01  Banner (top of page)     Banner
02  Section menu             Section menu
03  Lead paragraph           Overview
04  Cards                    Three pillars
05  Text with image          Mujtamae
06  Side-by-side statements  Vision & Mission
07  Text over image          Why the UAE
08  Group structure          Our ownership
09  Link tiles               More about us
10  Call to action banner    Call to action
```

On **Pages → Our Story** (under About Us):

```
01  Banner (top of page)     Banner
02  Section menu             Section menu
03  Lead paragraph           The Combination
04  Link tiles               More about us
05  Call to action banner    Call to action
```

On **Pages → The Team** (under About Us):

```
01  Banner (top of page)     Banner
02  Section menu             Section menu
03  Team directory           Leadership
04  Group chain              Group scale
05  Link tiles               More about us
06  Call to action banner    Call to action
```

On **Pages → Join Us** (under About Us):

```
01  Banner (top of page)     Banner
02  Section menu             Section menu
03  Lead paragraph           Why join
04  Statement                Who we look for
05  Open roles               Open roles
06  Form                     Send us your profile
07  Link tiles               More about us
```

On **Pages → Services**:

```
01  Banner (top of page)     Banner
02  Section menu             Services menu
03  Link tiles               Four categories
04  Lead paragraph           Our approach
05  Service detail           Strategy & Consulting
06  Service detail           Events & Activations
07  Service detail           Media
08  Service detail           Creative
09  Call to action banner    Call to action
```

On **Pages → Our Work**:

```
01  Banner (top of page)     Banner
02  Case study grid          Case studies
03  Logo strip               Brands we’ve worked with
04  Call to action banner    Call to action
```

On **Pages → Contact**:

```
01  Banner (top of page)     Banner
02  Form                     Enquiry
03  Office                   Offices
```

On **Pages → Legal → Terms & Conditions** (and the same on **Privacy Policy** and **Cookies**):

```
01  Legal document           Document
```

**Pages → Legal** itself has no sections: its **Forward visitors to** is set to *Terms & Conditions*, so `/legal` opens the Terms.

- The first word is the **kind of section**; the second is its **name** (only you see the name; click it to rename).
- **Click a section** to open it and see its fields. Click again to close it.
- **Collapse All / Show All** (above the list) closes or opens every section at once.
- **Drag** a section by its handle (⠿ on the left) to move it, or use **⋯ → Move up / Move down**.
- **⋯ menu** on each section: *Add below*, *Duplicate*, *Move up/down*, *Remove*.
- **Add Section** (below the list) opens a picker showing every kind of section you can add.

Numbers on cards ("01", "02"…), the breadcrumb at the top of inner pages ("Home / About Us") and the links in a **Section menu** are all worked out automatically from the order and the page tree, so moving things never leaves them wrong.

**Pages inside pages.** A page can sit under another page (the **Parent** field on the right of the page editor). *Our Story*, *The Team* and *Join Us* sit under *About Us*, so their addresses are `/about/our-story`, `/about/team` and `/about/join`, and their breadcrumb reads "Home / About Us / Our Story". All three are built. *Terms & Conditions*, *Privacy Policy* and *Cookies* sit under *Legal* (`/legal/terms` …).

**Forward visitors to (right side of a page).** Pick another page to send visitors there instead; the page's own sections are not shown and it is left out of the sitemap. *Legal* uses it to open *Terms & Conditions*.

## 5. Saving, previewing and publishing

| What you do | What happens on the website |
|---|---|
| Type in a field | **Saved automatically as a draft** after a moment. Visitors **don't** see it yet. |
| Click the **eye icon** | A **live preview** opens beside the editor and updates as you type. Use the size menu at its top to check **Mobile**, **Tablet** and **Desktop**. |
| Click **Publish changes** | Changes go **live within a few seconds**. |
| **Publish changes ▾ → Schedule Publish** | Pick a date and time; changes go live automatically then. |
| Leave without publishing | Your draft stays saved. Visitors keep seeing the last published version. |
| **Versions** tab | Every published and saved version. Open one to compare, then **Restore** to bring it back. |

The **Status** line near the top shows **Published**, **Draft** or **Changed** (published, with unpublished edits).

> Tip: always check the **Mobile** preview before publishing. Long headings and big images behave differently on phones.

## 6. Things every section has

### Headings

Most sections start with:

| Field | What it is | Tip |
|---|---|---|
| **Small heading** | The short orange line above the title (e.g. "Who we are") | Keep it to 2–4 words. Leave empty to hide it. |
| **Title** | The large heading | Press **Enter** to start a new line exactly where you want the break. |
| **Shaded title (white to grey)** | Gives the title a soft white-to-grey fade (dark sections only) | On phones the title is plain white either way. |

### Section settings

At the bottom of every section, **Section settings** is closed by default. Click it to open:

| Setting | What it does | Effect if you change it |
|---|---|---|
| **Section ID** | A short name (e.g. `contact`) that buttons can jump to | Buttons set to jump to the old ID stop working. Use lowercase letters, numbers and dashes. |
| **Name in section menu** | The label used in the page's **Section menu** (e.g. "Vision & Mission") | The section appears in the menu only when it has both a **Section ID** and a name. Empty it to leave the section out of the menu. Only matters on pages with a Section menu (e.g. About). |
| **Background** | **Dark** or **White** (only on sections designed in both) | The whole section switches colour; the logo at the top changes colour automatically when it scrolls over a white section. |
| **Hide this section on the website** | Takes the section off the page but keeps everything in the CMS | Untick it later to bring the section back exactly as it was. |

### Text with formatting

Some text boxes (marked **Text** with a small toolbar) allow:
- **Bold** and *italic*: select words → **B** or **I**.
- **Links**: select words → link icon → choose a page or type a web address.
- New paragraph: press **Enter**.

## 7. Buttons and links

Every button in the CMS has the same fields, wherever it appears:

| Field | Options | What it does |
|---|---|---|
| **Text** | Any words | What the button says. Short is best (2–4 words). |
| **Button style** | **Orange button** · **Outline button** · **Dark button** | The button's colour. *Orange*: the main brand button. *Outline*: white outline on a transparent background (for a second button next to an orange one). *Dark*: navy button (for white backgrounds). |
| **Goes to** | **A page** · **A section on this page** · **A web address** | Where the button takes visitors. |
| **Page** | List of your pages | Shown for *A page*. Pick the destination page. |
| **Section ID** | e.g. `contact` | Shown for *A page* (optional: jumps to that section on the chosen page) and *A section on this page* (required). Must match a section's **Section ID** ([section 6](#section-settings)). |
| **Web address** | e.g. `https://www.example.com` | Shown for *A web address*. Use for other websites. |
| **Open in a new tab** | Tick box | For *A web address* only. |

**Change a button's colour:** open the section → find the button → **Button style** → choose → **Publish changes**.

**Make a button jump down the page:** **Goes to → A section on this page** → **Section ID** → type the ID of the section to jump to (for example `contact` for the contact form on Home).

**Why don't I see more colours?** Colours come from the PLG Acachet design so the site stays consistent. If you need a new button style, ask your developer to add one; it will then appear in this list everywhere.

**Some buttons can be switched off:** sections with an optional button have **Show a button**. Untick it to remove the button (its settings are kept if you turn it back on).

**Menu and footer links** use the same fields without **Button style** (they're plain text links).

## 8. The sections, one by one

### Banner (top of page)
The big banner at the top of a page. Two styles:

- **Inner page** (About and the other inner pages): breadcrumb and headline on the left, intro text and buttons on the right, over a dimmed photo.
- **Showreel** (Home): full-screen video with the headline in the middle.

Some fields only appear for one style.

| Field | Style | What it does |
|---|---|---|
| **Style** | both | *Inner page* or *Showreel*. |
| **Headline** | both | The big text. *Inner page*: press **Enter** for a new line; each line stays on one line. *Showreel*: words appear one by one, then fade so the buttons move to the centre. |
| **Show the last word in orange** | Inner page | Colours the last word of the headline orange (e.g. "commercialise **sport.**"). |
| **Slightly larger headline on phones** | Inner page | For short headlines (The Team: "The team.", Join Us: "Join us."): the headline is a little bigger on phones. Leave unticked for longer headlines. |
| **Smaller headline on phones** | Inner page | For long lines that must stay on one line (Services: "One commercial focus."): the headline is a little smaller on phones. |
| **Headline size** | Inner page | *Large, lines wrap as needed* (standard). *Large, each line stays on one line* (Our Story). *Fitted, each line stays on one line* (About: slightly smaller text for long lines). |
| **Background photo** | Inner page | *Dimmed* (standard) or *Brighter* (About). To choose which part of the photo stays visible, set the photo's focal point ([section 9](#9-images-and-videos)). |
| **Intro text** | both | The paragraph beside (inner page) or under (showreel) the headline. On inner pages, make words **bold** to show them in brighter white. |
| **Buttons** | both | Up to 2 buttons ([section 7](#7-buttons-and-links)). Usually one *Orange*, one *Outline*. |
| **Background video** | both | Muted, looping video. MP4, ideally under 8 MB ([section 9](#9-images-and-videos)). Optional on inner pages (Our Work uses the showreel); a pause button appears automatically in the corner. |
| **Lighter video for phones** | both | Optional smaller video for phones. Leave empty to use the main video. |
| **Background image** | both | Shown instantly while a video loads, and instead of the video if there is none. **Required.** |
| **Show the "scroll down" indicator** | Showreel | The small mouse-shaped icon at the bottom. |
| **Show the brand mark on the right** | Inner page | The large PLG shape over the right side of the photo. |

The **breadcrumb** ("Home / About Us") is written automatically from the page name and its parent page; there's nothing to type. On the Showreel, a pause button appears automatically whenever there's a video.

### Section menu
The bar of links under a banner. On phones the bar can be swiped sideways. You never type its links; choose where they come from with **Links**:

| Links | Used on | Where the links come from |
|---|---|---|
| **The sections of this page** | About (Overview · Three Pillars · Mujtamae · …), Services (01 Strategy & Consulting · 02 Events & Activations · …) | Every section on the same page that has both a **Section ID** and a **Name in section menu** (in its **Section settings**), in page order. The section you're reading is underlined as you scroll. To add, rename or remove a link, change those two settings on the section itself. |
| **Same links as the main menu (sub-links)** | Our Story, The Team, Join Us | The **Sub-links** of the main-menu link that includes this page (**Header & footer → Header → Menu links → About us → Sub-links in the mobile menu**). This page's link is underlined, and **Back to About Us** is added on the right (hidden on phones). Edit the sub-links once and every page using this option updates. |

| Field | What it does |
|---|---|
| **Look** | *Sections of this page* only. *Bar under the banner* (About), or *Numbered, stays at the top while scrolling* (Services): links are numbered 01, 02… in page order; the bar sticks to the top of the screen, the section you're reading is highlighted with a line that fills as you read it, and the bar steps aside whenever the main menu slides back in. |
| **Small text on the right (optional)** | *Sections of this page* with the *Bar* look only. Grey text at the right end of the bar (hidden on phones), e.g. "Also in About: Our Story · The Team · Join Us". |

If there are no links to show, the bar is hidden. A short explanation of the chosen option is shown inside the section in the CMS.

### Lead paragraph
A small heading on the left and one large paragraph whose words light up as you scroll (About "Overview", Our Story "The Combination", Join Us "Why Join", Services "Our approach"), optionally with a heading above it and short notes below it, and followed by a diagram, a row with a heading, text and a labelled list, and a closing line with a button.

| Field | What it does |
|---|---|
| **Small heading** | The orange label on the left. |
| **Heading above the paragraph (optional)** | A large bold heading over the paragraph (Services: "Commercial strategy for sports and media IP."). |
| **Paragraph** | The large text. |
| **Text size** | *Large* (About), *Medium* (Our Story: slightly smaller text and a little more space around the section) or *Small (under a heading)* (Services). |
| **Grey band background** | Puts the section on the dark grey band with thin lines above and below (Services "Our approach"). |
| **Short notes under the paragraph** | Optional small capitals, each with an orange dot (Services: "In the UAE", "In international markets"). |
| **Animation** | **Words light up while scrolling** or **None**. |
| **Orange words** | *None*; *The end of the paragraph* (always orange); *Particular words, wherever they appear*; or *A phrase* (the first place that exact phrase appears). Particular words and phrases turn orange as they light up. |
| **Words to show in orange** | *End of the paragraph*: copy the end exactly (e.g. "structure a partnership, sell it, deliver it and measure it."); everything from there to the end turns orange. *Particular words*: list them separated by commas (e.g. "Acachet, PLG, Mujtamae"). *A phrase*: copy it exactly, including punctuation (e.g. "refuse to stay in a lane:"). Words that don't match the paragraph exactly are simply not coloured. |
| **Diagram below the paragraph** | *None*; *Three into one*: three columns whose lines join into the PLG Acachet logo (About); or *Lanes into one*: rows with round photos whose lines curve into one and run to the result, drawn as you scroll (Our Story); or *One line across lanes*: columns side by side crossed by one orange line that draws as you scroll, lighting a dot in each column (Join Us). The lines and logo are fixed design. |
| **Diagram columns** | *Three into one* only: exactly 3 columns, each with **Small label**, **Name** and **Text**. |
| **Lanes into one** | *Lanes into one* only: **Label above the rows** / **Label above the result** (e.g. "Previously separate" / "Now one business"); **Rows** (2–4, each with **Name**, **Small label**, **Text** and a **Round photo**, shown in black and white until hovered); **Result name** (next to the logo) and **Result note** (small line under it, hidden on tablets and phones). On phones the rows stack and one line fills down to the result. |
| **Lanes** | *One line across lanes* only: 2–4 columns, each with **Small label** (e.g. "The deal"), **Name** and **Text**. On phones they become a 2 × 2 board and each column lights a short orange marker instead of the line. |
| **Add a row with a heading, text and a labelled list** | Tick to add a row under the diagram: **Small heading** (orange, left), **Text** (middle) and a **List** (right) of items, each with a **Name**, a small **Label** in a pill (e.g. "Opening") and **Orange label** to highlight one (Join Us "Where the work goes": the UAE is *Home base*). |
| **Add a closing line with a button** | Tick to add a line of text and a **Closing button** under everything, separated by a thin line (Our Story: "See our work"). |

### Text with image
Heading, text and a button beside a picture. Two styles:

- **Image fades into the background** ("Who we are" on Home).
- **Rounded image on a grey band** ("Mujtamae" on About): adds an optional list and an optional report card over the picture.

| Field | What it does |
|---|---|
| **Style** | One of the two styles above. Some fields below only appear for the *Rounded image* style. |
| **Small heading / Title / Shaded title** | See [Headings](#headings). |
| **Text** | The paragraphs, with bold, italic and links. |
| **List heading / List** | *Rounded image* only. E.g. "Where it fits", then up to 6 rows of **Title** + **Text**. |
| **Show a button / Button** | Optional button. |
| **Image** | The picture. **Required.** |
| **Image position** | **Right** or **Left** of the text. |
| **Fade the image into the background** | *Fade* style only. Softens the image's edge into the dark background. |
| **Report card over the image** | *Rounded image* only. A small illustrative dashboard: **Card title**, **Badge** (pulsing, e.g. "Live"), up to 5 **Bars** (label + fill %, they fill up as the picture scrolls in) and a **Small caption**. Leave **Card title** empty to hide the card. |

### Cards
A row of picture cards ("What we do" on Home, "Three pillars" on About). On tablets and phones they become a swipeable row.

| Field | What it does |
|---|---|
| **Small heading / Title** | Above the cards. |
| **Card style** | *Numbered card*: image with number and title; the text slides up on hover (always shown on phones). *Pillar card*: big word over the image, a small label with an arrow, and the text below. |
| **Cards** | Each card: **Title** (the big word on a pillar card), **Small label** (pillar cards, e.g. "Network"), **Text**, **Image**, **Card links somewhere** + **Card link**. Up to 8 cards. Numbered cards are numbered 01, 02… automatically in order. |
| **Note** | Optional sentence. Numbered cards: below the row. Pillar cards: beside the title. |
| **Section settings → Background** | **White** (default) or **Dark**. |

To reorder cards, drag them inside the **Cards** list.

### Stacking panels
Full-screen panels that slide over each other as you scroll ("Global Bridge" / "Mujtamae").

| Field | What it does |
|---|---|
| **Panels** | 1 to 4 panels. Each: **Small heading**, **Title**, **Shaded title**, **Text**, **Image** (required), **Show a button / Button**. |

### Side-by-side statements
A heading, then two (or three) large statements side by side with a thin line between them (About "Vision & Mission"). They stack on phones.

| Field | What it does |
|---|---|
| **Small heading / Title / Shaded title** | See [Headings](#headings). |
| **Statements** | 1–3 statements, each with a **Small label** (e.g. "Vision") and the **Statement**. |
| **Show the brand mark in the background** | The large PLG shape behind the heading. |

### Text over image
A heading and text over a full-width photo that drifts slowly as you scroll, with an optional strip of short facts scrolling along the bottom (About "Why the UAE").

| Field | What it does |
|---|---|
| **Small heading / Title / Shaded title** | See [Headings](#headings). |
| **Text** | The paragraph. |
| **Background image** | **Required.** The left side is darkened so the text stays readable, so keep the subject of the photo on the right. |
| **Scrolling strip (optional)** | Up to 8 short facts. Leave empty to hide the strip. |

### Group structure
White section with text and key facts on the left and the company structure on the right, drawn as boxes inside boxes (About "Our Ownership").

| Field | What it does |
|---|---|
| **Small heading / Title** | See [Headings](#headings). |
| **Text** | The paragraph. |
| **Key facts** | Up to 4, each a **Value** and a **Label**. Numbers count up when they scroll into view (`1852`, `50+`); the first value is orange. Text values (`UAE · MEA`) stay as written. |
| **Closing line (optional)** | A sentence under the facts. Make the opening words **bold**. |
| **Group structure (outermost first)** | 1–4 levels, from the parent group down to PLG Acachet. Each: **Company name**, **Small label**, **Detail**, **Description**, **Figure** + **Figure label**. Each level is drawn inside the one above it. The last level is highlighted in navy; pointing at another level highlights that one instead. |

### Link tiles
A heading and 2–4 picture tiles that link to other pages; the tile under the mouse widens ("More about us" on About, Our Story, The Team and Join Us).

| Field | What it does |
|---|---|
| **Small heading / Title** | Above the tiles. |
| **Style** | *Standard*: dark grey band (Our Story, The Team, Join Us and most pages). *Tall tiles on black* (About). *Numbered tiles on black* (Services "Four categories"): the heading sits beside the title, tiles are numbered 01, 02… in order, and each tile's **Text** opens when it is pointed at (always shown on phones). |
| **Shaded title** | See [Headings](#headings). |
| **Tiles** | Up to 4, each with **Title**, **Text**, **Image** (required) and **Goes to** (a page, a section or a web address; [section 7](#7-buttons-and-links)). |

### Team directory
The people on The Team page: an intro line, then portraits in a grid with a **Grid / Org chart** switch, a **Show** filter (All / Management / Creative, with counts) and a profile panel that slides in when someone is clicked. The people themselves are managed in **Team members** ([section 12](#12-team-members)).

| Field | What it does |
|---|---|
| **Small heading** | The orange label on the left (e.g. "Leadership"). |
| **Intro paragraph** | The large sentence above the portraits. |
| **Words to show in orange** | Copy the words exactly as in the paragraph (e.g. "named senior owner"). |
| **People** | Leave **empty to show everyone** in Team members (in their set order). Or pick people to show only them, in the order picked. |
| **Offer the "Org chart" view** | Shows the Grid / Org chart switch. Untick to show the grid only. |
| **Show the "Show" filter** | The dropdown that filters by group. Only groups that have people appear in it. |

Photos are black and white until pointed at. People without a photo get a grey silhouette. The org chart is built automatically from each person's **Org chart position**: the person who *leads the company* at the top, then one column each for Commercial, Delivery and Operations, with the column's head first.

### Group chain
A small heading on the left; a statement, a row of company names joined by short lines (the first one highlighted in orange) and a text link on the right (The Team "Group scale").

| Field | What it does |
|---|---|
| **Small heading** | The orange label on the left. |
| **Statement** | The sentence. |
| **Chain of names** | 1–5 names, shown left to right. The first is highlighted. |
| **Show a text link / Text link** | An underlined link with an arrow (e.g. "See the full ownership structure" → About Us, section `ownership`). |

### Service detail
One service on the Services page: the number, name, intro and buttons on the left (they stay in view while you scroll through the service on wide screens), and on the right a stack of **pieces** in the order you choose. The number ("02 / 04") is worked out from the order of the Service detail sections on the page, and every second service sits on the grey band automatically.

| Field | What it does |
|---|---|
| **Service name** | The big title (e.g. "Strategy & Consulting"). |
| **Short headline (optional)** | A bold line under the name (Media: "Influencer programmes, built around the idea."). |
| **Intro** | The paragraph under the name. |
| **Buttons** | Up to 2 ([section 7](#7-buttons-and-links)). |
| **Content on the right** | Add pieces and drag them into order. **Photo**: a wide photo with an optional **Caption**; it settles from a slight zoom as you scroll (set the photo's focal point to choose the crop). **Highlight**: a feature row with a **Small orange label**, a **Big word** (e.g. "FUZE"), a **Small label under the word** and **Text**. **List of sub-services**: each with a **Name**, an optional **Orange tag** (e.g. "Our core service", "Mujtamae") and a **Description**; tick **Add a text link** for an underlined link such as "How Mujtamae fits". **Photo collage**: exactly 3 photos, one tall on the left and two stacked on the right. |
| **Section settings** | Give each service a **Section ID** (e.g. `media`) and a **Name in section menu** so it appears in the numbered bar and the category tiles can jump to it. |

### Open roles
The job list on Join Us: a heading with the number of open roles, filter buttons by team (All, Commercial, Delivery, Creative, Analytics, each with a count), and one row per job. Clicking a row opens its description with an **Apply for this role** button, which jumps to the application form and fills in the job and discipline there. The jobs themselves are managed in **Open roles** ([section 13](#13-open-roles)).

| Field | What it does |
|---|---|
| **Small heading / Title / Shaded title** | See [Headings](#headings). |
| **Roles to show** | Leave **empty to show every role** ticked *Show on the website*, in their set order (recommended). Or pick roles to show only those. |
| **Show the team filter buttons** | Only teams that have open roles get a button. |
| **"Apply" button text** | The words on the button inside each opened role. |
| **"Apply" button goes to section** | The **Section ID** of the application form on the page (`apply` on Join Us). |
| **Text when there are no open roles** | Shown instead of the list when no role is open. |
| **Line under the list / Button under the list** | E.g. "Don't see your role? We still want to hear from you." with a *Send Us Your Profile* button to section `apply`. |

### Call to action banner
The white "Start a conversation" banner near the bottom of a page.

| Field | What it does |
|---|---|
| **Use the site-wide call to action** | Ticked (default): shows the banner from **Header & footer → Call to action**, so one edit there updates every page. |
| **Content for this page** | Appears when you untick the box above: **Small heading**, **Title**, **Text**, **Button** and **Background image**, for this page only. |

The banner's **Section ID** is `contact` on About, so buttons like "Talk to Us" can jump to it.

### Key numbers
Big animated numbers over full-screen pictures, changing automatically.

| Field | What it does |
|---|---|
| **Numbers** | Each: **Number** (e.g. `100`), **After the number** (e.g. `+` or `%`), **Caption** (e.g. "Programmes delivered"), **Background image**. Up to 8. |
| **Seconds per number** | How long each number stays before moving on (default 4.5). |

The number counts up from zero the first time it appears.

### Legal document
One legal page (Terms & Conditions, Privacy Policy or Cookies): a dark header, a bar that switches between the legal documents and sticks to the top, then the document on white with a numbered **On this page** list beside it that follows your reading.

| Field | What it does |
|---|---|
| **Header** | **Title** (the last word is orange, e.g. "Privacy **Policy.**"), **Line under the title**, **Facts** (e.g. *Last updated*, *Effective from*, *Version*), **Show the brand mark**. The breadcrumb is automatic. |
| **Document switcher** | **Label** ("Legal") and **Documents (in order)**: the legal pages in the bar, including this one. The others are also linked at the end of the document. |
| **Notice and introduction** | An optional orange **Notice** box (bold line, text, points), then the **Introduction** paragraph. |
| **Sections** | Each: **Title**; **Show in a highlighted box**; an optional **Orange tag** with **Text after the tag** (e.g. "Must be covered · Counsel to confirm scope."); **Text** (paragraphs, bold, italic, links, bullet lists); an optional **Cookie table** (cookie, provider, category, duration, purpose); **Add the company contact card** (from **Header & footer → Company details**); **Add the "Manage Cookie Preferences" button**. Sections are numbered 01, 02… in order. |
| **End of the document** | The **"Questions?" box title** and its **button**; the text uses the email and phone from **Company details**. |

> The three documents currently contain the design's suggested outline and placeholder text. All wording must be drafted and approved by qualified counsel before the site goes live. The **Manage Cookie Preferences** button is not connected yet: it opens the cookie consent platform once one is chosen.

### Office
The Contact page's office: a tall photo with the city and a live local-time clock, and beside it a heading, intro and the contact details. Empty details are left out.

| Field | What it does |
|---|---|
| **Small heading / Title / Shaded title** | See [Headings](#headings). |
| **Intro** | The paragraph under the title. |
| **Photo** | **Location photo** (set its focal point), **Small label** (e.g. "Head office"), **City**, **Local time shown** (a clock with a green dot; *None* to hide it). |
| **Contact details** | **Email** and **Phone** (each with a **Copy** button; clicking them opens email / calls on phones), **Address** (press Enter for a new line; a **Directions** button opens Google Maps), **Directions: search for** (optional: what Maps searches for instead of the address), **Opening hours**. |

### Logo strip
A continuously scrolling row of partner logos.

| Field | What it does |
|---|---|
| **Small heading (optional)** | A small label in the top-left corner of the strip (Our Work: "Brands we’ve worked with"). With a label the strip is a little slimmer and has thin lines above and below. |
| **Logos** | Leave **empty to show all** partner logos (in their set order). Or pick specific logos; drag to reorder. |

Logos themselves are managed in **Partner logos** ([section 11](#11-partner-logos)).

### Case study grid
Our Work's list of every case study: a filter bar that sticks to the top (**All work** and each service, with counts), then large tiles numbered 01, 02… in the case studies' **Order**. Hovering a tile shows its summary and plays its clip; clicking opens the **full case study** over the page (its address ends in `#case-` + the case study's URL name, so it can be shared). **Esc** or **×** closes it; **Next case study** moves on.

| Field | What it does |
|---|---|
| **Show the filter bar** | The bar with **Filter · All work · Strategy & Consulting · …** Only services used by at least one case study get a button. |
| **Filter bar label** / **"All" button** | The small label and the first button's words. |
| **Tile link text** | The words under the summary on a tile ("Explore Project"). |
| **Text when a filter has no case studies** | Shown when a service has no case studies. |
| **Full case study → "Next" label / Button at the end** | The small label above the next case study's name, and the button at the very end (e.g. "Discuss a Similar Challenge" → Contact). |

Everything else (tiles and full case studies) comes from **Content → Case studies** ([section 10](#10-case-studies)).

### Case study showcase
Large picture tiles linking to case studies. Hovering shows the summary and "Explore Project".

| Field | What it does |
|---|---|
| **Small heading / Title** | Above the tiles. |
| **Case studies** | Pick case studies in the order you want. Tick **Full width** to make a tile span the whole row (others sit two per row). **Different photo for this tile (optional)**: show another photo (or the same photo with a different focal point) here only. |
| **Show a button / Button** | Button under the tiles (e.g. "See our work"). |

The tile picture, title and summary come from the case study itself ([section 10](#10-case-studies)).

### Statement
One large sentence across the page.

| Field | What it does |
|---|---|
| **Sentence** | The text. |
| **Look** | *Centred, large, over the brand marks* (Home) or *Left-aligned on a grey band* (Join Us "Who we look for"). |
| **End of the sentence in orange** | Optional. Copy the end of the sentence exactly (e.g. "evidence to assertion."). |
| **Animation** | **Words light up while scrolling** or **Fade in**. |
| **Show the brand marks behind the text** | *Centred* look only: the large PLG shapes in the background. |

### Form
A website form: the contact form ("Your next move starts here" on Home), the detailed enquiry ("Tell us the ambition" on Contact) or the job application form ("Tell us where you fit" on Join Us).

| Field | What it does |
|---|---|
| **Form** | *Enquiry*: name, email, phone and message, over a photo. *Job application*: full name, email, **Applying for** (a list of the open roles, plus "General application"), **Your discipline** (Commercial, Delivery, Creative, Analytics, Something else), LinkedIn or portfolio link, CV and a message, on a white band. Use one job application form per page. *Detailed enquiry*: name, company, work email, phone (optional), **choices** ("What are you looking to unlock?"), message and a consent tick box, on a white band with the intro and promises beside it. |
| **Small heading / Title** | Above the form (on the left for a job application). |
| **Intro text** | Paragraph under the title. |
| **Background photo** | *Enquiry* only. Shown to the right of the form (below it on phones). |
| **Button text** | The send button's words. |
| **Message after sending** | Shown once the message is sent. For a job application it follows "Thanks, *first name*." |
| **Small note next to the button** | *Job application* only, e.g. "We keep profiles on file and get in touch when a role fits." |
| **Detailed enquiry** | *Detailed enquiry* only. **Promises under the intro** (up to 4, numbered 01, 02… automatically: a bold line and a text under it); **Line at the bottom** + **Its link** (e.g. "Looking for a role? See open roles"); **Choices: question / hint** and the **Choices** (tick **Shows the note below** on a choice such as "Careers" to show the **Note** and **Note link** when it is ticked); **Message: label / hint inside the box**; **Consent tick box** wording; **Heading after sending**. The **Message after sending** follows the visitor's first name ("Sam, your enquiry is with the team."), and the thank-you lists the choices they ticked. |

> The **CV** field is shown on the form, but a chosen file is **not sent or saved yet**: applications in Form messages have no CV attached. Sending CVs is waiting for a decision on how they are stored and who can see them. Until then, rely on the LinkedIn or portfolio link.

Messages arrive in **Inbox → Form messages** ([section 15](#15-messages-from-the-website)).

## 9. Images and videos

### Adding or replacing an image in a section
1. Open the section and find the image field.
2. To **replace**: click the **×** on the current image, then choose a new one.
3. **Choose from existing** picks something already uploaded; **Create new** uploads from your computer (or drag a file onto the field).
4. Fill in **Description (alt text)**: a short description of the picture for people using screen readers ("Crowd at the UCI Cycling Esports final"). Leave it empty only for purely decorative images.
5. **Publish changes**.

### Choosing what stays visible when images are cropped
Images are cropped differently on phones and computers. Open the image in **Images & videos**, click **Edit image** and set the **focal point** (click on the most important part, such as a face). Crops keep that point in view.

### Recommended files

| Use | Format | Size |
|---|---|---|
| Full-screen backgrounds (Banner, Key numbers) | JPG or WebP | about 1920 px wide, under 500 KB |
| Section and card pictures | JPG or WebP | about 1200–1600 px wide, under 400 KB |
| Partner logos | **SVG** (best) or PNG with transparent background, **white** logo | — |
| Background videos | MP4 (H.264), no sound needed | under 8 MB; about 1280 px wide |
| Lighter phone video | MP4 | under 3 MB; about 720 px wide |

The website automatically creates smaller versions of every picture for each device, so upload good-quality originals and don't shrink them yourself below these sizes.

### The media library
**Content → Images & videos** lists every upload. You can search, edit the description and focal point, or delete files.

> Deleting a file that's in use leaves an empty space on the website. Replace it in the section first.

## 10. Case studies

**Content → Case studies.** One record per project: its tile (Home, Our Work) and its full case study (opens over Our Work). Two tabs:

**Tile**

| Field | Shown where |
|---|---|
| **Title** | Tile and full case study title |
| **Short title** | Home tiles, "Next case study", the breadcrumb and the browser tab (the full title otherwise) |
| **One-line summary** | On tiles when hovering, and under the title in the full case study |
| **Client** / **Services** | Orange client name on the tile; the services are the tags on tiles and in the case study, and decide which filter buttons show it on Our Work |
| **Key visual** | Tile photo, case study banner and first gallery photo (**required**). Set its focal point to choose the crop |
| **Short clip (optional)** | Plays on the Our Work tile on hover and in the case study banner |
| **Wide tile on Our Work** | Spans the full width (others sit two per row) |
| **Show "Key visual to come"** | A small label on the tile, for case studies still using a library photo |

**Case study**

| Field | Shown where |
|---|---|
| **Market** / **Year** | The details row under the banner |
| **01 The Brief** / **02 The Approach** | The two text sections. Leave an empty line between paragraphs |
| **03 The Impact: headline figures** | 1–4 big figures with what they measure (e.g. "15,000" / "Attendees across six days") |
| **Other results (optional)** | A bullet list under the figures |
| **Gallery photos** | Up to 4, after the key visual: two halves, one full width, two halves |
| **Photo after the impact** / **Film after the impact** | A photo and a film side by side, each with a small caption. Without a film, the short clip is used |
| **Search description** | The page description while the case study is open (about 150 characters) |
| **URL name**, **Order** (right side) | The address `/our-work#case-<URL name>`, and the position on Our Work (lower first) |

**To be confirmed:** write anything not yet confirmed by PLG in [square brackets], e.g. "Year: [2023–2026]". It shows highlighted in orange on the site until you remove the brackets.

Editing a case study updates it **everywhere** it's shown, after you click **Save** (case studies have no drafts).

To show a case study on Home: **Pages → Home → Case study showcase → Case studies → Add Case study**.

> The G42, Pizza Hut and Red Bull case studies use library photos ("Key visual to come"), and the gallery photos are library shots until PLG supplies project photos.

## 11. Partner logos

**Content → Partner logos.**

| Field | What it does |
|---|---|
| **Name** | The brand name (also used as the logo's description) |
| **Logo** | White logo on a transparent background (SVG or PNG) |
| **Logo height on desktop (px)** | Logos have different shapes; adjust so they look equally sized (default 40) |
| **Logo height on mobile (px)** | Leave empty to use 45% of the desktop height |
| **Order** | Lower numbers appear first |

**Add a logo:** **Create New** → fill in → **Save**. It appears in every logo strip that shows all logos.

## 12. Team members

**Content → Team members.** The people on The Team page (grid, org chart and profile panel). Changes show on the website after **Save** (team members have no drafts).

| Field | What it does |
|---|---|
| **Name** / **Job title** | Shown under the photo, in the org chart and in the profile panel. |
| **Photo** | Portrait, ideally 4:5 (taller than wide). Set the **focal point** on the face so it stays in view ([section 9](#9-images-and-videos)). Leave empty for a grey silhouette. |
| **Group (for the "Show" filter)** | *Management*, *Creative* or *Other staff*. Management and Creative get a small label on the photo and their own filter option; *Other staff* only appear under *All*. |
| **Org chart position** | *Leads the company* (one person, at the top), or the *Commercial*, *Delivery* or *Operations* column. |
| **Heads this org chart column** | The person shown first in their column, joined to the top. If nobody in a column is ticked, the first person in it is used. |
| **Show the "Senior account owner" label** | Adds the orange label in the profile panel. |
| **Short biography** | Optional, 50–70 words: open with the value this person brings to a client, then their experience. Shown in the profile panel; leave empty to show none. Leave an empty line between paragraphs. |
| **Social profiles** | Optional LinkedIn, Instagram and X addresses. Only the filled-in ones show as icons. |
| **Order** (right side) | Lower numbers appear first in the grid and in each org chart column. |

**Add a person:** **Create New** → fill in → **Save**. They appear on The Team page straight away (unless the page's **Team directory** lists specific people).

> The social links currently point to the platforms' home pages as placeholders, and the bios are empty, until PLG supplies the real profiles and copy.

## 13. Open roles

**Content → Open roles.** The jobs on the Join Us page and in its application form's **Applying for** list. Changes show on the website after **Save** (open roles have no drafts).

| Field | What it does |
|---|---|
| **Job title** | The row title and the name in the **Applying for** list. |
| **Team** | *Commercial*, *Delivery*, *Creative* or *Analytics*. Sets the filter button the job appears under and the discipline filled in when someone clicks **Apply for this role**. |
| **Location** / **Type** | E.g. "Dubai, UAE" and *Full-time* (also *Part-time*, *Contract*, *Internship*). Shown on the row (wide screens) and inside the opened role. |
| **Description** | A short paragraph shown when the role is opened. |
| **Key points** | Optional bullet list under the description (responsibilities or requirements). |
| **Show on the website** (right side) | Untick to take the job down without deleting it; tick again to bring it back. |
| **Order** (right side) | Lower numbers appear first. |

**Add a job:** **Create New** → fill in → **Save**. It appears on Join Us and in the application form straight away.

> The six jobs on the site come from the design and have no descriptions yet; PLG supplies the real openings and texts.

## 14. Header and footer

**Settings → Header & footer** (changes apply to every page after **Save**).

| Tab | Field | What it is |
|---|---|---|
| **Header** | **Menu links** | Top menu and mobile menu (up to 6). Drag to reorder. The link of the page being viewed (or of its parent page, e.g. *About us* on Our Story) is highlighted automatically. |
| | **Menu links → Sub-links in the mobile menu** | Optional. Shown indented under that link in the phone menu (e.g. *About us* → Overview, Our Story, The Team, Join Us). |
| | **Small text at the bottom of the mobile menu** | e.g. "© 2026 PLG Acachet" |
| **Company details** | **Company name, Email, Address, Phone** | Used by the legal documents (contact card and "Questions?" box). |
| **Call to action** | **Small heading, Title, Text, Button, Background image** | The white "Start a conversation" banner shown by every page's **Call to action banner** section (unless the page uses its own text). |
| **Footer** | **Footer links** | Links next to the logo in the footer |
| | **Legal links** | Small links such as Privacy, Terms and Cookies |
| | **Social media** | Pick a platform (Instagram, LinkedIn, X, YouTube, Facebook, TikTok) and paste the profile address. The icon appears automatically. |
| | **Copyright line** | The small copyright text |

## 15. Messages from the website

**Inbox → Form messages** lists every message sent through the website's forms, newest first. The **Form** column says whether it is an *Enquiry* (name, email, phone, message; from the Contact page also **Company**, **Looking to unlock** and the consent tick) or a *Job application* (name, email, **Applying for**, **Discipline**, **LinkedIn or portfolio link**, message). Each also shows which page it was sent from. Click one to read it.

Messages can't be edited. Admins can delete them.

## 16. Users and passwords

*Admins only.* **Settings → Users**:
- **Add a person:** **Create New** → email, name, password, **Role** (*Editor* for content, *Admin* for everything) → **Save**. Give them the password securely and ask them to change it.
- **Remove a person:** open the user → **⋯ → Delete**.
- **Change your own password:** click your profile picture (top right) → **Account** → new password → **Save**.

## 17. Good to know: what affects what

| If you… | Then… |
|---|---|
| Edit a page without publishing | Nothing changes for visitors. Your draft is kept. |
| Publish | The page updates for visitors within seconds. |
| Change **Header & footer**, a **case study**, a **partner logo**, a **team member** or an **open role** and save | Every page showing it updates. |
| Change a case study's **URL name** | Its address `/our-work#case-…` changes; Home's tile follows automatically, but shared links to the old address open Our Work without the case study. |
| Untick **Show on the website** on an open role | The job disappears from Join Us and from the application form's **Applying for** list. |
| Change a page's **URL name** | Its web address changes. Buttons and menu links inside the CMS follow automatically, but old bookmarks and links from other websites or emails stop working. Avoid changing it once the site is live. |
| Change a section's **Section ID** | Buttons jumping to the old ID stop working. Update them too. The **Section menu** follows automatically. |
| Change a section's **Name in section menu** | The Section menu on that page updates automatically. |
| Add, remove, hide or reorder a **Service detail** | The services renumber themselves (01 / 04…), the grey bands alternate again, and the numbered bar follows. |
| Change **Header & footer → Header → Menu links → Sub-links** | The phone menu and every **Section menu** set to *Same links as the main menu* (Our Story, The Team, Join Us) update. |
| Change **Header & footer → Call to action** | Every page whose Call to action banner uses the site-wide version updates. |
| Rename a page or move it under another page | Its breadcrumb (and web address) follows automatically. |
| Set **Forward visitors to** on a page | Visitors to that page land on the chosen page instead. |
| Change **Header & footer → Company details** | The contact card and "Questions?" box on every legal document update. |
| **Hide** a section | It disappears from the website; everything is kept. Untick to restore. |
| **Remove** a section | It's deleted from the page. You can still get it back from **Versions → Restore**. |
| Delete a **page** | Buttons and menu links pointing to it disappear from the website. |
| Delete an **image or video** that's in use | An empty space appears where it was. |
| Leave a required field (*) empty | The CMS won't publish and highlights the field in red. |
| Upload a very large video | The page loads slowly, especially on phones. Keep to the sizes in [section 9](#9-images-and-videos). |

## 18. Getting help

- Something looks wrong after publishing? Open **Versions** and **Restore** the previous version, then contact your developer.
- Need a new kind of section, a new button style or a new option? Ask your developer; once added, it appears in the CMS for everyone.

---

### All pages are built
Every page of the design is now in the CMS. This guide is updated whenever a section or option is added or changed.
