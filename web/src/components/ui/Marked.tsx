import { Fragment } from 'react'

/**
 * Text where [square-bracketed] parts are still to be confirmed: they render as <mark> (orange).
 * Editors remove the brackets once the client confirms the wording.
 */
export function Marked({ text }: { text?: string | null }) {
  if (!text) return null
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((p, i) => (p.startsWith('[') && p.endsWith(']') ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))}
    </>
  )
}

/** Splits a textarea into paragraphs on empty lines. */
export const paragraphsOf = (text?: string | null) =>
  (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
