/**
 * The four services, used to tag case studies (Our Work filter, tags on tiles and case studies).
 * Kept free of imports so client components can use it.
 */
export const SERVICES = [
  { label: 'Strategy & Consulting', value: 'strategy' },
  { label: 'Events & Activations', value: 'events' },
  { label: 'Media', value: 'media' },
  { label: 'Creative', value: 'creative' },
] as const

export type ServiceKey = (typeof SERVICES)[number]['value']

export const serviceLabel = (v?: string | null) => SERVICES.find((s) => s.value === v)?.label ?? ''
