/**
 * Open role options, shared by the Roles collection, the Open roles block and the application form.
 * Kept free of imports so it can be bundled for the browser.
 */

/** Teams a role belongs to: the filter buttons on Join Us, in this order. */
export const ROLE_TEAMS = [
  { label: 'Commercial', value: 'commercial' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Creative', value: 'creative' },
  { label: 'Analytics', value: 'analytics' },
] as const

export const EMPLOYMENT_TYPES = [
  { label: 'Full-time', value: 'fullTime' },
  { label: 'Part-time', value: 'partTime' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
] as const

/** "Your discipline" choices on the application form: the teams plus a catch-all. */
export const DISCIPLINES = [...ROLE_TEAMS.map((t) => t.label), 'Something else'] as const

export type RoleTeam = (typeof ROLE_TEAMS)[number]['value']

export const roleTeamLabel = (v?: string | null) => ROLE_TEAMS.find((t) => t.value === v)?.label ?? ''
export const employmentTypeLabel = (v?: string | null) => EMPLOYMENT_TYPES.find((t) => t.value === v)?.label ?? ''
