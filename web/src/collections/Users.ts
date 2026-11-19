import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email'],
    group: 'Settings',
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
  },
  auth: true,
  access: {
    create: isAdmin,
    delete: isAdmin,
    // Everyone signed in can read/update their own account; admins can manage all.
    read: ({ req }) =>
      (req.user as { role?: string } | null)?.role === 'admin' || (req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) =>
      (req.user as { role?: string } | null)?.role === 'admin' || (req.user ? { id: { equals: req.user.id } } : false),
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      // Decision 2026-11-19: everyone PLG adds gets full access, so new users are admins and the choice is
      // hidden. The editor role stays in the code (access helpers, seed test account) in case it's needed later.
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      admin: { hidden: true },
      options: [
        { label: 'Admin (everything, including users)', value: 'admin' },
        { label: 'Editor (website content)', value: 'editor' },
      ],
      access: { create: isAdminField, update: isAdminField },
    },
  ],
}
