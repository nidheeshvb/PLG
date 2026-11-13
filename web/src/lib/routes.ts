/**
 * Fixed site routes the code needs to know about.
 * Case studies open as a full-screen view on the Our Work page (built in a later step).
 */
export const routes = {
  home: '/',
  ourWork: '/our-work',
} as const

export const caseStudyHref = (slug?: string | null) =>
  slug ? `${routes.ourWork}#case-${slug}` : routes.ourWork
