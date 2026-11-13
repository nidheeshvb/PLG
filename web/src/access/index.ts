import type { Access, FieldAccess } from 'payload'

type UserWithRole = { role?: 'admin' | 'editor' | null } | null | undefined

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => (req.user as UserWithRole)?.role === 'admin'

export const isAdminField: FieldAccess = ({ req }) => (req.user as UserWithRole)?.role === 'admin'

export const anyone: Access = () => true

/** Public sees published documents only; signed-in users also see drafts. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
