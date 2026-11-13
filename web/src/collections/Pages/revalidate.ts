import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidate } from '@/lib/revalidate'

type PageDoc = { id: number | string; path?: string | null; _status?: 'draft' | 'published' | null }

/** Refresh the published page (and its old address, if it moved) after a save. */
export const revalidatePage: CollectionAfterChangeHook<PageDoc> = ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc
  if (doc._status === 'published' && doc.path) safeRevalidate(doc.path, req.payload.logger)
  if (previousDoc?._status === 'published' && previousDoc.path && previousDoc.path !== doc.path) {
    safeRevalidate(previousDoc.path, req.payload.logger)
  }
  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook<PageDoc> = ({ doc, req }) => {
  if (!req.context?.disableRevalidate && doc?.path) safeRevalidate(doc.path, req.payload.logger)
  return doc
}
