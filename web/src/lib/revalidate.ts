import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'

import { invalidateCdn } from '@/integrations/cdn'

/**
 * Clears a page from Next.js's cache and (in production) from the CloudFront cache.
 * revalidatePath only works inside a Next.js request; scripts such as the seed run outside one,
 * so failures are logged rather than thrown.
 */
export const safeRevalidate = (path: string, logger?: Payload['logger'], type?: 'layout' | 'page') => {
  try {
    revalidatePath(path, type)
  } catch (err) {
    logger?.debug?.({ err, path }, 'Skipped revalidation (not inside a Next.js request)')
  }
  void invalidateCdn(type === 'layout' ? ['/*'] : [path], logger)
}

/** Header, footer and shared content (logos, case studies) appear on every page. */
export const revalidateEverything = (logger?: Payload['logger']) => safeRevalidate('/', logger, 'layout')

/** afterChange hook for shared collections (partner logos, case studies, team members, open roles). */
export const revalidateSiteAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateEverything(req.payload.logger)
  return doc
}

/** afterChange hook that only refreshes on edits, not on creation (media: a new upload isn't used anywhere yet). */
export const revalidateSiteAfterUpdate: CollectionAfterChangeHook = ({ doc, operation, req }) => {
  if (operation === 'update' && !req.context?.disableRevalidate) revalidateEverything(req.payload.logger)
  return doc
}

/** afterDelete hook for the same shared collections: a deleted item must disappear from every page. */
export const revalidateSiteAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateEverything(req.payload.logger)
  return doc
}
