/**
 * Team member options, shared by the collection config and the (client) Team directory.
 * Kept free of imports so it can be bundled for the browser.
 */

/** Groups for the "Show" filter. "Other staff" has no label on the photo and no filter option. */
export const TEAM_GROUPS = [
  { label: 'Management', value: 'management', filter: true },
  { label: 'Creative', value: 'creative', filter: true },
  { label: 'Other staff', value: 'staff', filter: false },
] as const

/** Org chart positions. "top" is the single person above the columns; the rest are columns, left to right. */
export const TEAM_DEPARTMENTS = [
  { label: 'Leads the company (top of the org chart)', value: 'top' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Operations', value: 'operations' },
] as const

export type TeamGroup = (typeof TEAM_GROUPS)[number]['value']
export type TeamDepartment = (typeof TEAM_DEPARTMENTS)[number]['value']
