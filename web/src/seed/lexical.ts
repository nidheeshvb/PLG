/** A piece of a paragraph: plain text, or `{ bold: '…' }`. */
type Segment = string | { bold: string }

const textNode = (seg: Segment) => ({
  type: 'text',
  text: typeof seg === 'string' ? seg : seg.bold,
  format: typeof seg === 'string' ? 0 : 1, // 1 = bold
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const root = (paras: Segment[][]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paras.map((segments) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      textStyle: '',
      children: segments.map(textNode),
    })),
  },
})

/** Builds rich-text (Lexical) content from plain paragraphs, for seeding. */
export const paragraphs = (...texts: string[]) => root(texts.map((t) => [t]))

/** One paragraph mixing plain and bold text: `richParagraph('Plain ', { bold: 'bold' })`. */
export const richParagraph = (...segments: Segment[]) => root([segments])

/** Document content for seeding: paragraphs and bullet lists; text can be plain, bold or a link to a page. */
type DocSeg = string | { bold: string } | { link: string; page: number }
type DocBlock = { p: DocSeg[] } | { ul: DocSeg[][] }

const docText = (seg: DocSeg) => {
  if (typeof seg === 'object' && 'link' in seg)
    return {
      type: 'link',
      version: 3,
      format: '',
      indent: 0,
      direction: 'ltr',
      fields: { linkType: 'internal', newTab: false, doc: { relationTo: 'pages', value: seg.page } },
      children: [textNode(seg.link)],
    }
  return textNode(seg)
}

export const docBody = (...blocks: DocBlock[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: blocks.map((b) =>
      'p' in b
        ? { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, textStyle: '', children: b.p.map(docText) }
        : {
            type: 'list',
            listType: 'bullet',
            tag: 'ul',
            start: 1,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: b.ul.map((segs, i) => ({
              type: 'listitem',
              value: i + 1,
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: segs.map(docText),
            })),
          },
    ),
  },
})
