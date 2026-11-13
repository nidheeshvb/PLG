import { Fragment } from 'react'

/** Renders text typed in a textarea, turning line breaks into <br>. */
export function MultilineText({ text }: { text?: string | null }) {
  if (!text) return null
  const lines = text.split(/\r?\n/)
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  )
}
