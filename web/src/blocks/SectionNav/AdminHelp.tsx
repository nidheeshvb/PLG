'use client'

import { useFormFields } from '@payloadcms/ui'

const style = { margin: '0 0 16px', color: 'var(--theme-elevation-600)', fontSize: 13, lineHeight: 1.5 }

/** Admin-only explanation shown inside the "Section menu" block; follows the chosen "Links" option. */
export const SectionNavHelp = ({ path }: { path?: string }) => {
  const sourcePath = path ? path.replace(/sectionNavHelp$/, 'source') : 'source'
  const source = useFormFields(([fields]) => fields[sourcePath]?.value)
  if (source === 'menu')
    return (
      <p style={style}>
        The links are copied from <b>Header &amp; footer → Header → Menu links</b>: the <b>Sub-links</b> of the menu
        link that includes this page. This page is highlighted, and a “Back to …” link to that menu link’s page is
        added on the right. Edit the sub-links there to change this menu on every page that uses it.
      </p>
    )
  return (
    <p style={style}>
      The links are added automatically. A section appears in this menu when its <b>Section settings</b> have both a{' '}
      <b>Section ID</b> and a <b>Name in section menu</b>. Reorder the sections to reorder the menu.
    </p>
  )
}
