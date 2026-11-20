import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'

import { withSafeUrl } from './safeUrl'

// rich-text links refuse `javascript:` and other unsafe addresses (E2E-11-4)
const safeLinks = () => LinkFeature({ enabledCollections: ['pages'], fields: ({ defaultFields }) => withSafeUrl(defaultFields) })

/** A deliberately small editor for body copy: paragraphs, bold, italic and links. */
export const simpleEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    safeLinks(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export const richText = (overrides: Partial<RichTextField> = {}): RichTextField =>
  ({
    name: 'body',
    label: 'Text',
    type: 'richText',
    editor: simpleEditor,
    ...overrides,
  }) as RichTextField

/** Editor for long documents (legal pages): paragraphs, bold, italic, links and bullet lists. */
export const documentEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    safeLinks(),
    UnorderedListFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
