/**
 * Seeds the CMS with the Home page content from the HTML prototype.
 * Safe to run again: existing records are updated, not duplicated.
 *
 *   npm run seed
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import type { Page } from '../payload-types'
import { paragraphs, richParagraph } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
/** The prototype's asset folder (repo root /assets). */
const ASSETS = path.resolve(dirname, '../../../assets')
const context = { disableRevalidate: true }

/** `as`: store a copy under another file name (e.g. the same photo with its own focal point for one page). */
type MediaSeed = { file: string; alt?: string; focalX?: number; focalY?: number; as?: string }

async function upsertMedia(payload: Payload, { file, alt = '', focalX, focalY, as }: MediaSeed) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: as ?? path.basename(file) } },
    limit: 1,
    depth: 0,
  })
  const found = existing.docs[0]
  if (found) {
    // fill in alt text added to the seed later, without overwriting an editor's own
    if (alt && !found.alt) await payload.update({ collection: 'media', id: found.id, data: { alt }, context })
    return found.id
  }
  const doc = await payload.create({
    collection: 'media',
    data: { alt, ...(focalX != null ? { focalX, focalY } : {}) },
    ...(as
      ? {
          file: {
            data: fs.readFileSync(path.join(ASSETS, file)),
            mimetype: file.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
            name: as,
            size: fs.statSync(path.join(ASSETS, file)).size,
          },
        }
      : { filePath: path.join(ASSETS, file) }),
    context,
  })
  payload.logger.info(`  media: ${as ?? file}`)
  return doc.id
}

async function upsert<C extends 'partners' | 'case-studies' | 'pages' | 'team-members' | 'roles'>(
  payload: Payload,
  collection: C,
  where: Record<string, { equals: unknown }>,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({ collection, where, limit: 1, depth: 0, draft: true })
  const args = { collection, data, context, depth: 0, draft: false } as never
  const doc = existing.docs[0]
    ? await payload.update({ ...(args as object), id: existing.docs[0].id } as never)
    : await payload.create(args)
  return (doc as { id: number }).id
}

async function upsertUser(payload: Payload, email: string | undefined, password: string | undefined, role: 'admin' | 'editor') {
  if (!email || !password) return
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (existing.docs[0]) return
  await payload.create({ collection: 'users', data: { email, password, role, name: role === 'admin' ? 'Admin' : 'Editor' } })
  payload.logger.info(`  user: ${email} (${role})`)
}

async function seed() {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding…')

  await upsertUser(payload, process.env.SEED_ADMIN_EMAIL, process.env.SEED_ADMIN_PASSWORD, 'admin')
  await upsertUser(payload, process.env.SEED_EDITOR_EMAIL, process.env.SEED_EDITOR_PASSWORD, 'editor')

  // ---------- media ----------
  const m = {
    poster: await upsertMedia(payload, { file: 'hero-poster.webp', alt: 'PLG Acachet showreel' }),
    reel: await upsertMedia(payload, { file: 'hero-reel-960.mp4', alt: 'PLG Acachet showreel' }),
    intro: await upsertMedia(payload, { file: 'intro-media.webp', alt: 'PLG programme photograph' }),
    serviceCard: await upsertMedia(payload, { file: 'service-card.webp' }),
    bridge: await upsertMedia(payload, { file: 'bridge.webp', alt: 'UAE skyline programme' }),
    mujtamae: await upsertMedia(payload, { file: 'mujtamae.webp', alt: 'Mujtamae analytics' }),
    stat1: await upsertMedia(payload, { file: 'stat-1.webp' }),
    stat2: await upsertMedia(payload, { file: 'stat-2.webp', alt: 'Athlete in helmet, Mujtamae analytics' }),
    stat3: await upsertMedia(payload, { file: 'stat-3.webp' }),
    stat4: await upsertMedia(payload, { file: 'stat-4.webp', focalX: 50, focalY: 52 }),
    workUci: await upsertMedia(payload, { file: 'work-uci.webp', alt: 'UCI Cycling Esports World Championships' }),
    workUciClip: await upsertMedia(payload, { file: 'work-uci-clip.mp4' }),
    workCod: await upsertMedia(payload, { file: 'work-cod.webp', alt: 'Call of Duty launch event' }),
    workEa: await upsertMedia(payload, { file: 'work-ea.webp', alt: 'EA Sports FIFA World Cup launch' }),
    workKfc: await upsertMedia(payload, { file: 'work-kfc.webp', alt: 'KFC gaming platform' }),
    contactBg: await upsertMedia(payload, { file: 'contact-bg.webp' }),
    og: await upsertMedia(payload, { file: 'og-image.jpg', alt: 'PLG Acachet' }),
  }

  // ---------- partner logos ----------
  const partners: [string, string, number, number][] = [
    ['Intel', 'logo-intel.svg', 38, 15],
    ['Sony', 'logo-sony.svg', 32, 9],
    ['Dell', 'logo-dell.svg', 50, 28],
    ['EA Sports', 'logo-ea.svg', 50, 28],
    ['Logitech', 'logo-logitech.svg', 46, 20],
    ['KFC', 'logo-kfc.svg', 39, 14],
  ]
  for (const [i, [name, file, height, mobileHeight]] of partners.entries()) {
    const logo = await upsertMedia(payload, { file, alt: name })
    await upsert(payload, 'partners', { name: { equals: name } }, { name, logo, height, mobileHeight, sortOrder: i })
  }
  payload.logger.info('  partner logos')

  // ---------- case studies (cards only; full case studies come with the Our Work page) ----------
  const cs = async (slug: string, data: Record<string, unknown>) =>
    upsert(payload, 'case-studies', { slug: { equals: slug } }, { slug, ...data })
  const caseStudies = {
    uci: await cs('uci-cycling-esports-world-championships', {
      title: 'UCI Cycling Esports World Championships 2024 & 2025',
      cardTitle: 'UCI Cycling Esports World Championships',
      summary: 'Two editions of cycling’s official virtual world championships, delivered end to end in Abu Dhabi for MyWhoosh.',
      client: 'MyWhoosh',
      image: m.workUci,
      video: m.workUciClip,
    }),
    gotf: await cs('games-of-the-future-2025', {
      title: 'Games of the Future 2025',
      summary: 'Delivering the world’s largest phygital sports event in Abu Dhabi.',
      client: 'Phygital International, ASPIRE & Ethara',
      image: m.mujtamae,
    }),
    cod: await cs('call-of-duty', {
      title: 'Call of Duty',
      summary: 'A long-standing partnership with Activision, launching multiple Call of Duty titles in the region.',
      client: 'Activision',
      image: m.workCod,
    }),
    ea: await cs('ea-sports-fifa-world-cup', {
      title: 'EA Sports',
      summary: 'Delivering the EA Sports FIFA World Cup 2022 in-game DLC launch event.',
      client: 'EA Sports',
      image: m.workEa,
    }),
    kfc: await cs('kfc', {
      title: 'KFC',
      summary:
        'We built KFC’s gaming platform in Saudi Arabia and brokered its three-year strategic partnership with the Saudi Esports Federation and Esports World Cup.',
      client: 'KFC',
      image: m.workKfc,
    }),
  }
  payload.logger.info('  case studies')

  // ---------- pages the Home page links to (sections are added in later steps) ----------
  const page = async (slug: string, title: string, data: Partial<Page> = {}) =>
    upsert(payload, 'pages', { slug: { equals: slug } }, { slug, title, _status: 'published', ...data })
  const about = await page('about', 'About Us', {
    meta: { description: 'PLG Acachet combines a UAE relationship network, brand activation and media production, and sports analytics, organised around one objective: commercial return.' },
  })
  const services = await page('services', 'Services', {
    meta: { description: 'Four services, one commercial focus: commercial value for the property, and measurable return for the partner.' },
  })
  const ourWork = await page('our-work', 'Our Work', {
    meta: { description: 'Selected work: programmes for rights holders and brands, each measured against commercial objectives.' },
  })
  const contact = await page('contact', 'Contact', {
    meta: { description: 'What should sport do next? Tell PLG Acachet the ambition: a market to enter, a property to take global, an asset to commercialise.' },
  })
  // About's sub-pages (built in the next steps; empty for now so menus and tiles link somewhere)
  const ourStory = await page('our-story', 'Our Story', {
    parent: about,
    meta: { description: 'How PLG Acachet got here: three businesses, one commercial focus.' },
  })
  const team = await page('team', 'The Team', {
    parent: about,
    meta: { description: 'The people behind PLG Acachet’s commercial, delivery and analytics work.' },
  })
  const join = await page('join', 'Join Us', {
    parent: about,
    meta: { description: 'Careers at PLG Acachet: commercial judgement and delivery discipline.' },
  })
  const legal = await page('legal', 'Legal')
  const terms = await page('terms', 'Terms & Conditions', { parent: legal })
  const privacy = await page('privacy-policy', 'Privacy Policy', { parent: legal })
  const cookies = await page('cookies', 'Cookies', { parent: legal })
  payload.logger.info('  placeholder pages')

  // ---------- Home ----------
  const toPage = (p: number, label: string, section?: string, appearance: 'primary' | 'ghost' = 'primary') => ({
    label,
    appearance,
    type: 'page',
    page: p,
    ...(section ? { section } : {}),
  })

  const layout = [
    {
      blockType: 'hero',
      blockName: 'Showreel banner',
      variant: 'showreel',
      title: 'Turning sports IP into commercial value.',
      lede: 'PLG Acachet is a sports, phygital and media consultancy. For rights holders, we commercialise IP through sponsorship sales. For brands, we broker the right deal and activate around it — in the UAE and across global markets.',
      links: [
        { label: 'Start a conversation', appearance: 'primary', type: 'section', section: 'contact' },
        toPage(ourWork, 'See our work', undefined, 'ghost'),
      ],
      video: m.reel,
      poster: m.poster,
      showScrollCue: true,
    },
    {
      blockType: 'mediaText',
      blockName: 'Who we are',
      variant: 'fade',
      anchorId: 'about',
      eyebrow: 'Who we are',
      title: 'Maximizing Brand &\nSponsorship Value',
      gradientTitle: true,
      body: paragraphs(
        'We advise rights holders and brands on how sport, phygital and media properties create value. Then we take that strategy to market: selling sponsorship, activating the brand around the deal and measuring the result.',
        'Our work is built on relationships in the UAE and extends to markets worldwide.',
      ),
      showButton: true,
      link: toPage(about, 'Learn more'),
      image: m.intro,
      imagePosition: 'right',
      fadeImageEdge: true,
    },
    {
      blockType: 'cardCarousel',
      blockName: 'What we do',
      anchorId: 'services',
      theme: 'light',
      eyebrow: 'What we do',
      title: 'Ideas with purpose.',
      cardStyle: 'service',
      cards: [
        ['Strategy & Consulting', 'Sponsorship sales, partnerships, media rights and IP commercialisation for rights holders.', 'strategy'],
        ['Events & Activations', 'Partnerships, brand activations and events that deliver visible value to partners.', 'events'],
        ['Media', 'Creative influencer programmes, delivered through our proprietary FUZE platform and built to deliver tangible results.', 'media'],
        ['Creative', 'Design and creative direction for properties and their partners.', 'creative'],
      ].map(([title, text, section]) => ({
        title,
        text,
        image: m.serviceCard,
        hasLink: true,
        link: { type: 'page', page: services, section },
      })),
    },
    {
      blockType: 'stackedPanels',
      blockName: 'Global Bridge / Mujtamae',
      anchorId: 'stack',
      panels: [
        {
          eyebrow: 'The Global Bridge',
          title: 'UAE to the world. World to the UAE.',
          gradientTitle: true,
          text: 'For rights holders, we take sponsorship to brands in the UAE and in international markets. For international brands, we provide a route into the UAE through established relationships. One consultancy, working in both directions.',
          image: m.bridge,
          showButton: true,
          link: toPage(about, 'Learn more', 'uae'),
        },
        {
          eyebrow: 'Mujtamae',
          title: 'Every programme, measured.',
          gradientTitle: true,
          text: 'Mujtamae is our sports analytics platform, bringing together sports communities and full-spectrum sports analytics. It informs how we price and structure a partnership, and measures the return once it runs.',
          image: m.mujtamae,
          showButton: true,
          link: toPage(about, 'How Mujtamae Fits', 'mujtamae'),
        },
      ],
    },
    {
      blockType: 'statsCarousel',
      blockName: 'Key numbers',
      anchorId: 'stats',
      autoplaySeconds: 4.5,
      stats: [
        { value: 13, label: 'years in market', image: m.stat1 },
        { value: 100, suffix: '+', label: 'Programmes delivered', image: m.stat2 },
        { value: 50, suffix: '+', label: 'Partners', image: m.stat3 },
        { value: 20, label: 'Markets reach', image: m.stat4 },
      ],
    },
    { blockType: 'logoMarquee', blockName: 'Partner logos' },
    {
      blockType: 'caseStudyGallery',
      blockName: 'Case studies',
      anchorId: 'work',
      eyebrow: 'Case Studies',
      title: 'Creative work. Meaningful results.',
      items: [
        { caseStudy: caseStudies.uci },
        { caseStudy: caseStudies.gotf },
        { caseStudy: caseStudies.cod, fullWidth: true },
        { caseStudy: caseStudies.ea },
        { caseStudy: caseStudies.kfc },
      ],
      showButton: true,
      link: toPage(ourWork, 'See our work'),
    },
    {
      blockType: 'statement',
      blockName: 'Brand statement',
      anchorId: 'statement',
      text: 'Programmes delivered for rights holders and brands, each measured against commercial objectives.',
      animation: 'scrollReveal',
      showBrandMarks: true,
    },
    {
      blockType: 'form',
      blockName: 'Contact form',
      anchorId: 'contact',
      formType: 'enquiry',
      eyebrow: 'Let’s Work Together',
      title: 'Your Next move\nStart here',
      lede: 'A rights holder with IP to commercialise. A brand looking for the right property. Tell us what you’re working on.',
      backgroundImage: m.contactBg,
      submitLabel: 'Talk to Us',
      successMessage: 'Thanks — we’ll be in touch shortly.',
    },
  ]

  await page('home', 'Home', {
    layout: layout as Page['layout'],
    meta: {
      title: 'Sports, phygital and media consultancy | PLG Acachet',
      description:
        'PLG Acachet is a sports, phygital and media consultancy, commercialising sports IP for rights holders and brokering the right deal for brands, in the UAE and globally.',
      image: m.og,
    },
  })
  payload.logger.info('  home page')

  // ---------- About ----------
  const aboutLayout = [
    {
      blockType: 'hero',
      blockName: 'Banner',
      variant: 'page',
      title: 'Built to\ncommercialise sport.',
      highlightLastWord: true,
      headlineSize: 'fitted',
      imageStyle: 'bright',
      intro: richParagraph(
        'PLG Acachet combines a UAE relationship network, brand activation and media production capability, and sports analytics — ',
        { bold: 'organised around one objective: commercial return.' },
      ),
      links: [
        toPage(ourWork, 'See Our Work'),
        { label: 'Talk to Us', appearance: 'ghost', type: 'section', section: 'contact' },
      ],
      poster: m.mujtamae,
      showBrandMark: true,
    },
    {
      blockType: 'sectionNav',
      blockName: 'Section menu',
      source: 'sections',
      note: 'Also in About: Our Story · The Team · Join Us',
    },
    {
      blockType: 'leadText',
      blockName: 'Overview',
      anchorId: 'overview',
      navLabel: 'Overview',
      eyebrow: 'Overview',
      text: 'PLG Acachet brings together Acachet’s relationships across UAE government and corporate bodies, PLG’s decade in top tier esports, sports and phygital event and media production, and Mujtamae’s sports analytics platform. The result is a consultancy that can structure a partnership, sell it, deliver it and measure it.',
      textSize: 'lg',
      highlightMode: 'tail',
      highlight: 'structure a partnership, sell it, deliver it and measure it.',
      animation: 'scrollReveal',
      diagram: 'merge',
      mergeItems: [
        { label: 'Relationships', name: 'Acachet', text: 'Relationships across UAE government and corporate bodies.' },
        { label: 'Production', name: 'PLG', text: 'A decade in top tier esports, sports and phygital event and media production.' },
        { label: 'Analytics', name: 'Mujtamae', text: 'The sports analytics platform that measures the return.' },
      ],
    },
    {
      blockType: 'cardCarousel',
      blockName: 'Three pillars',
      anchorId: 'pillars',
      navLabel: 'Three Pillars',
      theme: 'light',
      cardStyle: 'pillar',
      eyebrow: 'Three Pillars',
      title: 'Relationships. Delivery. Proof.',
      note: 'What each programme stands on, from the first introduction to the final report.',
      cards: [
        {
          title: 'Relationships',
          tag: 'Network',
          text: 'An established network across UAE government, sovereign-adjacent institutions and major corporates, built over more than a decade.',
          image: m.bridge,
        },
        {
          title: 'Delivery',
          tag: 'Production',
          text: 'Production, tournament operations and broadcast, delivered to an international standard.',
          image: m.workUci,
        },
        {
          title: 'Proof',
          tag: 'Analytics',
          text: 'An analytics platform that measures the return on every activation we run.',
          image: m.stat4,
        },
      ].map((c) => ({ ...c, hasLink: false })),
    },
    {
      blockType: 'mediaText',
      blockName: 'Mujtamae',
      anchorId: 'mujtamae',
      navLabel: 'Mujtamae',
      variant: 'card',
      eyebrow: 'Mujtamae',
      title: 'The analytics behind the programme.',
      gradientTitle: true,
      body: paragraphs(
        'Mujtamae is PLG Acachet’s sports analytics platform. It brings together sports communities and full-spectrum sports analytics, giving rights holders, brands and partners a measured view of audience, engagement and commercial return across sport, esports and phygital.',
      ),
      listHeading: 'Where it fits',
      listItems: [
        {
          title: 'Strategy & Consulting',
          text: 'Models audience, engagement and commercial return before a partnership is structured and taken to market.',
        },
        {
          title: 'Events & Activations',
          text: 'Measures every activation live and after the event, against the objectives agreed in the deal.',
        },
      ],
      showButton: true,
      link: { label: 'Request a Sample Report', appearance: 'primary', type: 'section', section: 'contact' },
      image: m.stat2,
      imagePosition: 'left',
      report: {
        title: 'Mujtamae · Programme view',
        badge: 'Live',
        bars: [
          { label: 'Audience', value: 78 },
          { label: 'Engagement', value: 64 },
          { label: 'Commercial return', value: 86 },
        ],
        caption: 'Illustrative UI — sport · esports · phygital',
      },
    },
    {
      blockType: 'statements',
      blockName: 'Vision & Mission',
      anchorId: 'vision',
      navLabel: 'Vision & Mission',
      eyebrow: 'Vision & Mission',
      title: 'Why we exist.',
      gradientTitle: true,
      items: [
        {
          label: 'Vision',
          text: 'To be the commercial partner that rights holders and brands trust to move between the UAE and the world.',
        },
        {
          label: 'Mission',
          text: 'To commercialise third-party IP through sponsorship sales, partnerships and media — and to show the return.',
        },
      ],
      showBrandMark: true,
    },
    {
      blockType: 'backgroundText',
      blockName: 'Why the UAE',
      anchorId: 'uae',
      navLabel: 'Why the UAE',
      eyebrow: 'Why The UAE?',
      title: 'A market in its own right. A base for every region.',
      gradientTitle: true,
      text: 'The UAE is one of the world’s fastest-growing sports markets, with major international properties, a young and digitally engaged population, and sustained national investment in technology. It is a significant market in its own right, and a strong base from which to work across regions.',
      image: m.bridge,
      ticker: [
        'One of the fastest-growing sports markets',
        'Major international properties',
        'Young, digitally engaged population',
        'Sustained investment in technology',
      ].map((text) => ({ text })),
    },
    {
      blockType: 'ownership',
      blockName: 'Our ownership',
      anchorId: 'ownership',
      navLabel: 'Our Ownership',
      eyebrow: 'Our Ownership',
      title: 'Part of an established group.',
      body: paragraphs(
        'PLG Acachet is part of Muller & Phipps Middle East Group Holdings (M&P Group ME), a technology distribution group with sales, marketing and distribution operations across the UAE and wider MEA region. M&P Group ME is part of The Getz Group, an international marketing, distribution and sourcing group founded in 1852 and operating in more than 50 countries.',
      ),
      facts: [
        { value: '1852', label: 'Getz Group founded' },
        { value: '50+', label: 'Countries' },
        { value: 'UAE · MEA', label: 'Regional presence' },
      ],
      closing: richParagraph(
        { bold: 'For rights holders and brands,' },
        ' this means regional scale and the backing of an established international group.',
      ),
      levels: [
        {
          name: 'The Getz Group',
          tag: 'Parent group',
          detail: 'Est. 1852',
          text: 'International marketing, sales, distribution, sourcing, manufacturing and licensing, across more than 50 countries.',
          figure: '50+',
          figureLabel: 'Countries',
        },
        {
          name: 'M&P Group ME',
          tag: 'Regional holding',
          detail: 'Technology distribution',
          text: 'Technology distribution across the UAE and MEA. Provides regional scale and presence.',
          figure: 'MEA',
          figureLabel: 'Region',
        },
        {
          name: 'PLG Acachet',
          tag: 'Our company',
          detail: 'Sports, phygital & media',
          text: 'Sports, phygital and media consultancy, based in the UAE.',
          figure: 'UAE',
          figureLabel: 'Home base',
        },
      ],
    },
    {
      blockType: 'linkTiles',
      blockName: 'More about us',
      anchorId: 'more',
      tileStyle: 'tall',
      eyebrow: 'More about us',
      title: 'The story, the people, the roles.',
      tiles: [
        {
          title: 'Our Story',
          text: 'How we got here. Three businesses. One commercial focus.',
          image: m.mujtamae,
          link: { type: 'page', page: ourStory },
        },
        {
          title: 'The Team',
          text: 'The people behind PLG Acachet’s commercial, delivery and analytics work — based in the UAE, working internationally.',
          image: m.stat1,
          link: { type: 'page', page: team },
        },
        {
          title: 'Join Us',
          text: 'We look for commercial judgement and delivery discipline — people who prefer evidence to assertion.',
          image: m.serviceCard,
          link: { type: 'page', page: join },
        },
      ],
    },
    { blockType: 'ctaBanner', blockName: 'Call to action', anchorId: 'contact', useDefault: true },
  ]
  await page('about', 'About Us', {
    layout: aboutLayout as Page['layout'],
    meta: {
      title: 'About Us | PLG Acachet',
      description:
        'PLG Acachet combines a UAE relationship network, brand activation and media production, and sports analytics, organised around one objective: commercial return.',
      image: m.og,
    },
  })
  payload.logger.info('  about page')

  // ---------- Our Story ----------
  const storyLayout = [
    {
      blockType: 'hero',
      blockName: 'Banner',
      variant: 'page',
      title: 'How we got here.',
      highlightLastWord: true,
      headlineSize: 'oneLine',
      imageStyle: 'dim',
      intro: richParagraph({ bold: 'Three businesses.' }, ' One commercial focus.'),
      links: [toPage(ourWork, 'See Our Work'), toPage(team, 'Meet the Team', undefined, 'ghost')],
      poster: m.intro,
      showBrandMark: false,
    },
    { blockType: 'sectionNav', blockName: 'Section menu', source: 'menu' },
    {
      blockType: 'leadText',
      blockName: 'The Combination',
      anchorId: 'combination',
      eyebrow: 'The Combination',
      text: 'PLG Acachet unites three businesses that previously operated separately. Acachet built relationships across UAE government and corporate bodies over more than a decade, delivering city-scale and corporate sport programming. PLG built a decade of esports and phygital delivery — tournaments, broadcast and community programming. Mujtamae built the platform to measure return on sport, esports and phygital activation.',
      textSize: 'md',
      animation: 'scrollReveal',
      highlightMode: 'words',
      highlight: 'Acachet, PLG, Mujtamae',
      diagram: 'weave',
      weaveStartLabel: 'Previously separate',
      weaveEndLabel: 'Now one business',
      weaveItems: [
        {
          name: 'Acachet',
          tag: 'Relationships · 10+ years',
          text: 'UAE government and corporate bodies. City-scale and corporate sport programming.',
          image: m.bridge,
        },
        {
          name: 'PLG',
          tag: 'Delivery · A decade',
          text: 'Esports and phygital. Tournaments, broadcast and community programming.',
          image: m.workUci,
        },
        {
          name: 'Mujtamae',
          tag: 'Measurement · Platform',
          text: 'Measures return on sport, esports and phygital activation.',
          image: m.stat4,
        },
      ],
      weaveResult: 'PLG Acachet',
      weaveNote: 'One commercial focus.',
      showClosing: true,
      closingText: 'The combined business in practice, across sport, esports and phygital programmes.',
      closingLink: toPage(ourWork, 'See our work'),
    },
    {
      blockType: 'linkTiles',
      blockName: 'More about us',
      anchorId: 'more',
      tileStyle: 'standard',
      eyebrow: 'More about us',
      title: 'The people, the roles.',
      tiles: [
        {
          title: 'The Team',
          text: 'The people behind PLG Acachet’s commercial, delivery and analytics work — based in the UAE, working internationally.',
          image: m.stat1,
          link: { type: 'page', page: team },
        },
        {
          title: 'Join Us',
          text: 'We look for commercial judgement and delivery discipline — people who prefer evidence to assertion.',
          image: m.serviceCard,
          link: { type: 'page', page: join },
        },
      ],
    },
    { blockType: 'ctaBanner', blockName: 'Call to action', anchorId: 'contact', useDefault: true },
  ]
  await page('our-story', 'Our Story', {
    parent: about,
    layout: storyLayout as Page['layout'],
    meta: {
      title: 'Our Story | PLG Acachet',
      description: 'How PLG Acachet got here: three businesses that previously operated separately, one commercial focus.',
      image: m.og,
    },
  })
  payload.logger.info('  our story page')

  // ---------- team members (names, titles and photos from the prototype; bios and social handles to follow from PLG) ----------
  type Member = [name: string, jobTitle: string, group: string, department: string, photo?: string, head?: boolean]
  const people: Member[] = [
    ['Matthew Pickering', 'Chief Executive Officer', 'management', 'top', 'matthew'],
    ['Jeraz Pastakia', 'Account Director', 'management', 'commercial', 'jeraz', true],
    ['Gisli Gudnason', 'Technical Director', 'management', 'delivery', 'gisli', true],
    ['Younus Khan', 'Finance Manager', 'management', 'operations', 'younus', true],
    ['Jesse Tasnim Emad', 'Graphic Designer / Artworker', 'creative', 'delivery', 'jesse'],
    ['Omar Gomma', 'Content Creator', 'creative', 'delivery', 'omar'],
    ['Khalid Salim', 'Copy Editor', 'creative', 'delivery', 'khalid'],
    ['Sherif Saed', 'Social Media Manager', 'creative', 'commercial'],
    ['Sami Alam', 'Esports & Community Manager', 'staff', 'commercial', 'sami'],
    ['Emma Valdez', 'Office Manager', 'staff', 'operations'],
    ['Stanley Kinyanjui', 'Office Organizer', 'staff', 'operations', 'stanley'],
  ]
  for (const [i, [name, jobTitle, group, department, photo, head]] of people.entries()) {
    await upsert(payload, 'team-members', { name: { equals: name } }, {
      name,
      jobTitle,
      group,
      department,
      headOfDepartment: Boolean(head),
      accountOwner: group === 'management',
      photo: photo ? await upsertMedia(payload, { file: `team/${photo}.webp`, alt: name, focalX: 50, focalY: 20 }) : null,
      // placeholders until PLG supplies each person's profiles (the prototype links them to "#")
      linkedin: 'https://www.linkedin.com/',
      instagram: 'https://www.instagram.com/',
      x: 'https://x.com/',
      sortOrder: i,
    })
  }
  payload.logger.info('  team members')

  // ---------- The Team ----------
  const teamLayout = [
    {
      blockType: 'hero',
      blockName: 'Banner',
      variant: 'page',
      title: 'The team.',
      highlightLastWord: true,
      largerOnPhones: true,
      headlineSize: 'wrap',
      imageStyle: 'dim',
      intro: richParagraph('The people behind PLG Acachet’s commercial, delivery and analytics work — ', {
        bold: 'based in the UAE, working internationally.',
      }),
      links: [
        { label: 'Meet the Leadership', appearance: 'primary', type: 'section', section: 'people' },
        toPage(join, 'Join Us', undefined, 'ghost'),
      ],
      poster: m.stat1,
      showBrandMark: false,
    },
    { blockType: 'sectionNav', blockName: 'Section menu', source: 'menu' },
    {
      blockType: 'teamDirectory',
      blockName: 'Leadership',
      anchorId: 'people',
      eyebrow: 'Leadership',
      intro:
        'Commercial leaders, producers, creatives, technologists and analysts working as one team around every brief, with a named senior owner on every account.',
      highlight: 'named senior owner',
      showOrgChart: true,
      showFilter: true,
    },
    {
      blockType: 'groupScale',
      blockName: 'Group scale',
      anchorId: 'group',
      eyebrow: 'Group scale',
      text: 'Every account is owned by a senior name, and stands on the balance sheet, governance and reach of Getz Group and M&P Group Middle East behind it.',
      chain: [{ name: 'PLG Acachet' }, { name: 'M&P Group Middle East' }, { name: 'Getz Group' }],
      showLink: true,
      link: { label: 'See the full ownership structure', type: 'page', page: about, section: 'ownership' },
    },
    {
      blockType: 'linkTiles',
      blockName: 'More about us',
      anchorId: 'more',
      tileStyle: 'standard',
      eyebrow: 'More about us',
      title: 'The story, the roles.',
      tiles: [
        {
          title: 'Our Story',
          text: 'Three businesses. One commercial focus.',
          image: m.mujtamae,
          link: { type: 'page', page: ourStory },
        },
        {
          title: 'Join Us',
          text: 'We look for commercial judgement and delivery discipline — people who prefer evidence to assertion.',
          image: m.serviceCard,
          link: { type: 'page', page: join },
        },
      ],
    },
    { blockType: 'ctaBanner', blockName: 'Call to action', anchorId: 'contact', useDefault: true },
  ]
  await page('team', 'The Team', {
    parent: about,
    layout: teamLayout as Page['layout'],
    meta: {
      title: 'The Team | PLG Acachet',
      description: 'The people behind PLG Acachet’s commercial, delivery and analytics work, based in the UAE and working internationally.',
      image: m.og,
    },
  })
  payload.logger.info('  team page')

  // ---------- open roles (titles, teams and locations from the prototype; descriptions to follow from PLG) ----------
  type RoleSeed = [title: string, team: string, location: string]
  const openRoles: RoleSeed[] = [
    ['Partnerships Manager', 'commercial', 'Dubai, UAE'],
    ['Senior Producer, Live Events', 'delivery', 'Dubai, UAE'],
    ['Tournament Operations Lead', 'delivery', 'Dubai, UAE'],
    ['Motion Designer', 'creative', 'Dubai, UAE'],
    ['Data Analyst, Mujtamae', 'analytics', 'Dubai, UAE'],
    ['Business Development Manager, Europe', 'commercial', 'London, UK'],
  ]
  for (const [i, [title, team, location]] of openRoles.entries()) {
    await upsert(payload, 'roles', { title: { equals: title } }, {
      title,
      team,
      location,
      employmentType: 'fullTime',
      isOpen: true,
      sortOrder: i,
    })
  }
  payload.logger.info('  open roles')

  // ---------- Join Us ----------
  const joinLayout = [
    {
      blockType: 'hero',
      blockName: 'Banner',
      variant: 'page',
      title: 'Join us.',
      highlightLastWord: true,
      largerOnPhones: true,
      headlineSize: 'wrap',
      imageStyle: 'dim',
      intro: richParagraph('Work across markets, disciplines and formats — ', {
        bold: 'from strategy to live delivery, and from the physical arena to the digital world.',
      }),
      links: [
        { label: 'Explore Opportunities', appearance: 'primary', type: 'section', section: 'roles' },
        { label: 'Send Us Your Profile', appearance: 'ghost', type: 'section', section: 'apply' },
      ],
      poster: m.serviceCard,
      showBrandMark: false,
    },
    { blockType: 'sectionNav', blockName: 'Section menu', source: 'menu' },
    {
      blockType: 'leadText',
      blockName: 'Why join',
      anchorId: 'why',
      eyebrow: 'Why Join',
      text: 'We are building an agency for people who refuse to stay in a lane: commercial thinking, cultural instinct, production discipline and a habit of measuring what actually happened.',
      textSize: 'md',
      animation: 'scrollReveal',
      highlightMode: 'phrase',
      highlight: 'refuse to stay in a lane:',
      diagram: 'cross',
      crossItems: [
        { label: 'The deal', name: 'Commercial thinking', text: 'Sponsorship sales, partnerships and strategy.' },
        { label: 'The audience', name: 'Cultural instinct', text: 'Sport, esports and the fans around them.' },
        { label: 'The event', name: 'Production discipline', text: 'Live production, broadcast and media.' },
        { label: 'The report', name: 'Measuring what happened', text: 'Evidence for the client, not assertion.' },
      ],
      showDetails: true,
      detailsHeading: 'Where the work goes',
      detailsText:
        'The work is ambitious, international and visible — in the UAE and in the markets we are opening across Asia, Europe and North America.',
      detailsList: [
        { name: 'United Arab Emirates', tag: 'Home base', highlight: true },
        { name: 'Asia', tag: 'Opening' },
        { name: 'Europe', tag: 'Opening' },
        { name: 'North America', tag: 'Opening' },
      ],
      showClosing: false,
    },
    {
      blockType: 'statement',
      blockName: 'Who we look for',
      style: 'band',
      text: 'We look for commercial judgement and delivery discipline — people who prefer evidence to assertion.',
      highlight: 'evidence to assertion.',
      animation: 'none',
      showBrandMarks: false,
    },
    {
      blockType: 'openRoles',
      blockName: 'Open roles',
      anchorId: 'roles',
      eyebrow: 'Open Roles',
      title: 'Current openings.',
      gradientTitle: true,
      showFilter: true,
      applyLabel: 'Apply for this role',
      applySection: 'apply',
      emptyText: 'No open roles in this team right now. Send us your profile and we’ll keep it on file.',
      footerText: 'Don’t see your role? We still want to hear from you.',
      footerLink: { label: 'Send Us Your Profile', appearance: 'ghost', type: 'section', section: 'apply' },
    },
    {
      blockType: 'form',
      blockName: 'Send us your profile',
      anchorId: 'apply',
      formType: 'application',
      eyebrow: 'Send Us Your Profile',
      title: 'Tell us where you fit.',
      lede: 'PLG Acachet works across sponsorship sales, strategy, live production and media. The people who do best here are comfortable moving between a commercial negotiation, a live event and a client report.',
      submitLabel: 'Send Profile',
      successMessage: 'We keep profiles on file and get in touch when a role fits.',
      note: 'We keep profiles on file and get in touch when a role fits.',
    },
    {
      blockType: 'linkTiles',
      blockName: 'More about us',
      anchorId: 'more',
      tileStyle: 'standard',
      eyebrow: 'More about us',
      title: 'The story, the people.',
      tiles: [
        {
          title: 'Our Story',
          text: 'Three businesses. One commercial focus.',
          image: m.mujtamae,
          link: { type: 'page', page: ourStory },
        },
        {
          title: 'The Team',
          text: 'The people behind PLG Acachet’s commercial, delivery and analytics work — based in the UAE, working internationally.',
          image: m.stat1,
          link: { type: 'page', page: team },
        },
      ],
    },
  ]
  await page('join', 'Join Us', {
    parent: about,
    layout: joinLayout as Page['layout'],
    meta: {
      title: 'Join Us | PLG Acachet',
      description: 'Careers at PLG Acachet: work across markets, disciplines and formats, from strategy to live delivery.',
      image: m.og,
    },
  })
  payload.logger.info('  join us page')

  // ---------- Services ----------
  const sm = {
    hero: await upsertMedia(payload, { file: 'services-hero.webp' }),
    // the prototype crops these three differently on Services, so they get their own copies + focal points
    uciMedia: await upsertMedia(payload, { file: 'work-uci.webp', as: 'work-uci-services.webp', alt: 'UCI Cycling Esports World Championships', focalX: 50, focalY: 35 }),
    kfcCollage: await upsertMedia(payload, { file: 'work-kfc.webp', as: 'work-kfc-collage.webp', alt: 'KFC gaming platform', focalX: 50, focalY: 30 }),
    cardCollage: await upsertMedia(payload, { file: 'service-card.webp', as: 'service-card-collage.webp', focalX: 50, focalY: 25 }),
  }
  const sub = (title: string, text: string, extra: Record<string, unknown> = {}) => ({ title, text, ...extra })
  const servicesLayout = [
    {
      blockType: 'hero',
      blockName: 'Banner',
      variant: 'page',
      title: 'Four services.\nOne commercial focus.',
      highlightLastWord: true,
      headlineSize: 'fitted',
      smallerOnPhones: true,
      imageStyle: 'dim',
      intro: richParagraph('Every engagement is built around the same goal: ', {
        bold: 'commercial value for the property, and measurable return for the partner.',
      }),
      links: [
        { label: 'Explore each service below', appearance: 'primary', type: 'section', section: 'categories' },
        toPage(contact, 'Talk to Us', undefined, 'ghost'),
      ],
      poster: sm.hero,
      showBrandMark: false,
    },
    { blockType: 'sectionNav', blockName: 'Services menu', source: 'sections', barStyle: 'sticky' },
    {
      blockType: 'linkTiles',
      blockName: 'Four categories',
      anchorId: 'categories',
      tileStyle: 'numbered',
      eyebrow: 'Four Categories',
      title: 'From the commercial case to the creative.',
      gradientTitle: true,
      tiles: [
        { title: 'Strategy & Consulting', image: m.stat2, link: { type: 'section', section: 'strategy' } },
        { title: 'Events & Activations', image: m.mujtamae, link: { type: 'section', section: 'events' } },
        { title: 'Media', image: m.workUci, link: { type: 'section', section: 'media' } },
        { title: 'Creative', image: m.stat3, link: { type: 'section', section: 'creative' } },
      ],
    },
    {
      blockType: 'leadText',
      blockName: 'Our approach',
      anchorId: 'approach',
      eyebrow: 'Our approach',
      heading: 'Commercial strategy for sports and media IP.',
      text: 'We commercialise rights holders’ IP through sponsorship sales. For brands entering sport and phygital, we broker the deal and secure the strongest terms — in the UAE and in international markets.',
      textSize: 'sm',
      band: true,
      notes: [{ text: 'In the UAE' }, { text: 'In international markets' }],
      animation: 'scrollReveal',
      highlightMode: 'none',
      diagram: 'none',
      showDetails: false,
      showClosing: false,
    },
    {
      blockType: 'serviceDetail',
      blockName: 'Strategy & Consulting',
      anchorId: 'strategy',
      navLabel: 'Strategy & Consulting',
      title: 'Strategy & Consulting',
      lead: 'Sponsorship sales, partnerships, media rights, technology, data and IP commercialisation — the commercial foundation of every programme.',
      links: [toPage(contact, 'Talk Strategy')],
      content: [
        { blockType: 'svcImage', image: m.stat2, caption: 'The commercial foundation' },
        {
          blockType: 'svcList',
          items: [
            sub('Sponsorship', 'We sell sponsorship on behalf of rights holders, events and venues — valuing and packaging inventory, then taking it to brands in the UAE and internationally. Pricing is set against market benchmarks, not aspiration.', { tag: 'Our core service' }),
            sub('Partnerships', 'Structuring partnerships between brands and rights holders. For brands, we broker the deal for maximum brand value, then activate around the sponsorship. Commercial terms are built to outlast a single season.'),
            sub('Media rights', 'Valuation, negotiation and distribution strategy for broadcast and digital media rights, across traditional and emerging platforms.'),
            sub('Technology and innovations', 'Phygital format development — sport that combines physical competition with gaming mechanics, live data and digital interaction — designed with a commercial model from the start.'),
            sub('Data optimisation', 'Our sports analytics platform, applied at the consulting stage — drawing on sports communities and full-spectrum sports analytics to model audience, engagement and commercial return before a programme is committed.', {
              tag: 'Mujtamae',
              showLink: true,
              link: { label: 'How Mujtamae fits', type: 'page', page: about, section: 'mujtamae' },
            }),
            sub('Licensing and IP management', 'Commercialisation of intellectual property through licensing structures, brand protection and long-term value management.'),
          ],
        },
      ],
    },
    {
      blockType: 'serviceDetail',
      blockName: 'Events & Activations',
      anchorId: 'events',
      navLabel: 'Events & Activations',
      title: 'Events & Activations',
      lead: 'Partnership and brand activation, event and tournament delivery that gives sponsors visible, measurable value.',
      links: [toPage(contact, 'Talk Delivery')],
      content: [
        { blockType: 'svcImage', image: m.mujtamae, caption: 'Delivering the partnership on the ground' },
        {
          blockType: 'svcList',
          items: [
            sub('Media production', 'Studio and remote broadcast, content capture and post-production — built for how audiences actually watch.'),
            sub('Event management', 'End-to-end delivery of live events and tournaments — venue, logistics and on-site operations, at any scale.'),
            sub('Brand activations', 'Campaigns created and delivered in line with the sponsorship — physical and phygital brand experiences that activate the partner around the commercial deal.'),
            sub('Data management', 'Live and post-event measurement through our analytics platform, so every activation is reported on against its objectives.', { tag: 'Mujtamae' }),
          ],
        },
      ],
    },
    {
      blockType: 'serviceDetail',
      blockName: 'Media',
      anchorId: 'media',
      navLabel: 'Media',
      title: 'Media',
      hook: 'Influencer programmes, built around the idea.',
      lead: 'Highly creative influencer marketing for sports properties and their partners, planned and delivered through FUZE, our proprietary platform — built to deliver tangible results.',
      links: [toPage(contact, 'Talk Media')],
      content: [
        {
          blockType: 'svcHighlight',
          label: 'Our proprietary platform',
          name: 'FUZE',
          note: 'Influencer platform',
          text: 'Every influencer programme we run is planned and delivered through FUZE — from the first brief to the final report.',
        },
        {
          blockType: 'svcList',
          items: [
            sub('Social media', 'Channel strategy and content for sports and brand partnerships, built to support sponsor objectives.'),
            sub('Influencers', 'Creative-led influencer programmes — talent selection, briefing, content and reporting — delivered through FUZE.', { tag: 'FUZE' }),
            sub('Design and creative strategy', 'The creative thinking behind each programme, developed with our Creative team.', {
              showLink: true,
              link: { label: 'Meet Creative', type: 'section', section: 'creative' },
            }),
          ],
        },
        { blockType: 'svcImage', image: sm.uciMedia, caption: 'Built around the idea' },
      ],
    },
    {
      blockType: 'serviceDetail',
      blockName: 'Creative',
      anchorId: 'creative',
      navLabel: 'Creative',
      title: 'Creative',
      hook: 'Creative that supports the commercial case.',
      lead: 'Design and creative direction that gives sports properties and their partners a distinct identity and a clear message.',
      links: [toPage(contact, 'Talk Creative'), toPage(ourWork, 'See Our Work', undefined, 'ghost')],
      content: [
        {
          blockType: 'svcCollage',
          images: [{ image: m.stat3 }, { image: sm.kfcCollage }, { image: sm.cardCollage }],
        },
      ],
    },
    { blockType: 'ctaBanner', blockName: 'Call to action', anchorId: 'contact', useDefault: true },
  ]
  await page('services', 'Services', {
    layout: servicesLayout as Page['layout'],
    meta: {
      title: 'Services | PLG Acachet',
      description: 'Four services, one commercial focus: commercial value for the property, and measurable return for the partner.',
      image: m.og,
    },
  })
  payload.logger.info('  services page')

  // ---------- header & footer ----------
  const nav = (p: number, label: string, section?: string) => ({ label, type: 'page', page: p, ...(section ? { section } : {}) })
  await payload.updateGlobal({
    slug: 'site-settings',
    context,
    data: {
      headerLinks: [
        {
          ...nav(about, 'About us'),
          subLinks: [nav(about, 'Overview', 'overview'), nav(ourStory, 'Our Story'), nav(team, 'The Team'), nav(join, 'Join Us')],
        },
        nav(services, 'Service'),
        nav(ourWork, 'Our Work'),
        nav(contact, 'Contact'),
      ],
      cta: {
        eyebrow: 'Start a Conversation',
        title: 'Your next move starts here.',
        lede: 'A rights holder with IP to commercialise. A brand looking for the right property. Tell us what you’re working on.',
        link: { label: 'Talk to Us', type: 'page', page: contact },
        image: m.contactBg,
      },
      mobileMenuNote: '© 2026 PLG Acachet',
      footerLinks: [nav(about, 'About'), nav(services, 'Service'), nav(ourWork, 'Our work'), nav(contact, 'Contact')],
      legalLinks: [nav(privacy, 'Privacy'), nav(terms, 'Terms & Conditions'), nav(cookies, 'Cookies')],
      social: [
        { platform: 'instagram', url: 'https://www.instagram.com/' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/' },
      ],
      copyright: '© 2026 PLG Acachet. All rights reserved.',
    } as never,
  })
  payload.logger.info('  header & footer')

  payload.logger.info('Done.')
}

// `payload run` exits once this module finishes loading, so wait for the seed here.
try {
  await seed()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
