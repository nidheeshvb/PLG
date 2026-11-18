import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  PayloadRequest,
} from 'payload'

import { revalidateEverything, safeRevalidate } from '@/lib/revalidate'

type PageDoc = {
  id: number | string
  path?: string | null
  title?: string | null
  forwardTo?: unknown
  _status?: 'draft' | 'published' | null
}

/** What visitors see of a page: the main (published) record, not the latest draft. */
type LiveState = { status: string | null; path: string | null; title: string | null; forwardTo: string | null }

const LIVE_KEY = 'pagesLiveBefore'

const idOf = (v: unknown) => (v && typeof v === 'object' && 'id' in v ? String((v as { id: unknown }).id) : v == null ? null : String(v))

/**
 * Reads the page's main record straight from the database. Draft saves (autosave, "Save draft") only add a
 * version and leave this record alone; publishing, unpublishing and restoring a version rewrite it. Comparing
 * it before and after a save tells exactly what changed on the live site.
 */
const readLive = async (id: number | string, req: PayloadRequest): Promise<LiveState | null> => {
  const doc = (await req.payload.db.findOne({ collection: 'pages', where: { id: { equals: id } }, req })) as PageDoc | null
  if (!doc) return null
  return { status: doc._status ?? null, path: doc.path ?? null, title: doc.title ?? null, forwardTo: idOf(doc.forwardTo) }
}

/** Remember the live record before the save (see revalidatePage). */
export const rememberLivePage: CollectionBeforeChangeHook<PageDoc> = async ({ data, operation, originalDoc, req }) => {
  if (operation === 'update' && originalDoc?.id != null && !req.context?.disableRevalidate) {
    const before = (req.context[LIVE_KEY] as Record<string, LiveState | null> | undefined) ?? {}
    before[String(originalDoc.id)] = await readLive(originalDoc.id, req)
    req.context[LIVE_KEY] = before
  }
  return data
}

/**
 * Refresh the website after a page is saved.
 * - Draft saves: nothing (the live record didn't change).
 * - Content published, same address and name: only this page.
 * - Published for the first time, unpublished, moved (URL name / parent), renamed or forwarded elsewhere:
 *   the whole site, because menus, buttons, tiles, the Legal switcher and the sitemap on other pages show
 *   this page's address or name (REVAL-3, REVAL-4, REVAL-5).
 */
export const revalidatePage: CollectionAfterChangeHook<PageDoc> = async ({ doc, operation, req }) => {
  if (req.context?.disableRevalidate) return doc
  const logger = req.payload.logger
  const before = (req.context[LIVE_KEY] as Record<string, LiveState | null> | undefined)?.[String(doc.id)]
  const after = await readLive(doc.id, req)
  if (!after) return doc

  const wasLive = before?.status === 'published'
  const isLive = after.status === 'published'
  if (!wasLive && !isLive) return doc // never on the website

  const unknownBefore = operation === 'update' && before === undefined // e.g. a code path without beforeChange
  const changedForOthers =
    unknownBefore ||
    wasLive !== isLive ||
    before?.path !== after.path ||
    before?.title !== after.title ||
    before?.forwardTo !== after.forwardTo

  if (changedForOthers) {
    revalidateEverything(logger)
    // Also clear the exact old and new addresses (CDN invalidation lists them explicitly).
    if (before?.path && before.path !== after.path) safeRevalidate(before.path, logger)
  } else if (doc._status === 'published' && after.path) {
    // Only this page's content was published. (A draft save returns the draft, so it never gets here.)
    safeRevalidate(after.path, logger)
  }
  return doc
}

/** A deleted page may still be linked from menus, tiles and the sitemap on other pages. */
export const revalidatePageDelete: CollectionAfterDeleteHook<PageDoc> = ({ doc, req }) => {
  if (req.context?.disableRevalidate || !doc) return doc
  if (doc._status === 'published') revalidateEverything(req.payload.logger)
  if (doc.path) safeRevalidate(doc.path, req.payload.logger)
  return doc
}
