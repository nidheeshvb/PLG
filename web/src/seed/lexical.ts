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
