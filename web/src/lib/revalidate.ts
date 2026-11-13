import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, Payload } from 'payload'

/**
 * revalidatePath only works inside a Next.js request; scripts such as the seed run outside one,
 * so failures are logged rather than thrown.
 */
export const safeRevalidate = (
  path: string,
  logger?: Payload['logger'],
  type?: 'layout' | 'page',
) => {
  try {
    revalidatePath(path, type)
  } catch (err) {
    logger?.debug?.({ err, path }, 'Skipped revalidation (not inside a Next.js request)')
  }
}

/** Header, footer and shared content (logos, case studies) appear on every page. */
export const revalidateEverything = (logger?: Payload['logger']) => safeRevalidate('/', logger, 'layout')

/** afterChange hook for shared collections (partner logos, case studies). */
export const revalidateSiteAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateEverything(req.payload.logger)
  return doc
}
