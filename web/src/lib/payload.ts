import 'server-only'

import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Page, SiteSetting } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config })

/** Path from route segments: [] → "/", ["about","team"] → "/about/team". */
export const pathFromSegments = (segments?: string[]) =>
  segments?.length ? `/${segments.map(decodeURIComponent).join('/')}` : '/'

/** A page by its public path. In draft mode (live preview) the latest draft is returned. */
export const getPageByPath = cache(async (path: string): Promise<Page | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { path: { equals: path } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return docs[0] ?? null
})

/** Published pages that show their own content (not forwarding to another page), for the sitemap. */
export const getSitemapPaths = async (): Promise<string[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { and: [{ _status: { equals: 'published' } }, { forwardTo: { exists: false } }] },
    limit: 1000,
    depth: 0,
    pagination: false,
    select: { path: true },
  })
  return docs.map((d) => d.path).filter((p): p is string => Boolean(p))
}

/** Every published page path, for static generation. */
export const getAllPagePaths = async (): Promise<string[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
    pagination: false,
    select: { path: true },
  })
  return docs.map((d) => d.path).filter((p): p is string => Boolean(p))
}

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})

/** Partner logos: the chosen ones in their chosen order, or all of them. */
export const getPartners = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'partners',
    sort: 'sortOrder',
    limit: 100,
    depth: 1,
    pagination: false,
  })
  return docs
})

/** Team members in their set order (The Team page). */
export const getTeamMembers = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team-members',
    sort: 'sortOrder',
    limit: 200,
    depth: 1,
    pagination: false,
  })
  return docs
})

/** Roles shown on the website (Join Us), in their set order. */
export const getOpenRoles = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'roles',
    where: { isOpen: { equals: true } },
    sort: 'sortOrder',
    limit: 200,
    depth: 0,
    pagination: false,
  })
  return docs
})

/** All case studies in their set order (Our Work grid and case study view). */
export const getCaseStudies = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'case-studies',
    sort: 'sortOrder',
    limit: 200,
    depth: 1,
    pagination: false,
  })
  return docs
})
