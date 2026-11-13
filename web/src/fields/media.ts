import type { UploadField } from 'payload'

type Options = {
  name?: string
  label?: string
  required?: boolean
  description?: string
  /** Restrict to images, videos, or both. */
  accept?: 'image' | 'video' | 'any'
}

export const mediaField = ({
  name = 'image',
  label = 'Image',
  required = false,
  description,
  accept = 'image',
}: Options = {}): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required,
  admin: { description },
  filterOptions:
    accept === 'any' ? undefined : { mimeType: { contains: accept === 'image' ? 'image' : 'video' } },
})
