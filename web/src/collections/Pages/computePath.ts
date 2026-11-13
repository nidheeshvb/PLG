import type { FieldHook } from 'payload'

type Breadcrumb = { url?: string | null }

/** The page's public path: "/" for the home page, otherwise the nested-docs breadcrumb URL. */
export const computePath: FieldHook = ({ siblingData }) => {
  const slug = siblingData?.slug as string | undefined
  const parent = siblingData?.parent
  if (slug === 'home' && !parent) return '/'
  const crumbs = (siblingData?.breadcrumbs ?? []) as Breadcrumb[]
  const last = crumbs.at(-1)?.url
  return last || (slug ? `/${slug}` : undefined)
}
