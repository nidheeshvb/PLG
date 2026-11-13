import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
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
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin (everything, including users)', value: 'admin' },
        { label: 'Editor (website content)', value: 'editor' },
      ],
      access: { create: isAdminField, update: isAdminField },
    },
  ],
}
