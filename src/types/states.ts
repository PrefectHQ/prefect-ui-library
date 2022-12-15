// intentionally grouped by state type progression
// this order determines the other these show up in the ui
export const prefectStateNames = [
  'Scheduled',
  'Late',
  'Resuming',
  'Pending',
  'Paused',
  'Running',
  'Completed',
  'Cancelled',
  'Cancelling',
  'Crashed',
  'Failed',
  'TimedOut',
] as const
export type PrefectStateNames = typeof prefectStateNames[number]