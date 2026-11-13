import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

type InternalLinkDoc = { value?: { path?: string | null; slug?: string | null } | number | string }

const internalDocToHref = ({ linkNode }: { linkNode: { fields: { doc?: unknown } } }) => {
  const doc = linkNode.fields.doc as InternalLinkDoc | undefined
  const value = doc?.value
  if (value && typeof value === 'object') return value.path || (value.slug ? `/${value.slug}` : '/')
  return '/'
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  data?: SerializedEditorState | Record<string, unknown> | null
  className?: string
}

/** Body copy from the CMS. Paragraph styling comes from the wrapper's class. */
export function RichText({ data, className }: Props) {
  if (!data) return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      converters={converters}
      className={className}
      disableContainer={false}
    />
  )
}
