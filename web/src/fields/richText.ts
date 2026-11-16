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

/** A deliberately small editor for body copy: paragraphs, bold, italic and links. */
export const simpleEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({ enabledCollections: ['pages'] }),
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
    LinkFeature({ enabledCollections: ['pages'] }),
    UnorderedListFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
