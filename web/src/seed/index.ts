/**
 * Seeds the CMS with the Home page content from the HTML prototype.
 * Safe to run again: existing records are updated, not duplicated.
 *
 *   npm run seed
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import type { Page } from '../payload-types'
import { paragraphs } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
/** The prototype's asset folder (repo root /assets). */
const ASSETS = path.resolve(dirname, '../../../assets')
const context = { disableRevalidate: true }

type MediaSeed = { file: string; alt?: string; focalX?: number; focalY?: number }

async function upsertMedia(payload: Payload, { file, alt = '', focalX, focalY }: MediaSeed) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: file } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) return existing.docs[0].id
  const doc = await payload.create({
    collection: 'media',
    data: { alt, ...(focalX != null ? { focalX, focalY } : {}) },
    filePath: path.join(ASSETS, file),
    context,
  })
  payload.logger.info(`  media: ${file}`)
  return doc.id
}

async function upsert<C extends 'partners' | 'case-studies' | 'pages'>(
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
    stat2: await upsertMedia(payload, { file: 'stat-2.webp' }),
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

  // ---------- header & footer ----------
  const nav = (p: number, label: string) => ({ label, type: 'page', page: p })
  await payload.updateGlobal({
    slug: 'site-settings',
    context,
    data: {
      headerLinks: [nav(about, 'About us'), nav(services, 'Service'), nav(ourWork, 'Our Work'), nav(contact, 'Contact')],
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
