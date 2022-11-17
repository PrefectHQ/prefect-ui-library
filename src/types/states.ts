export const prefectStateNames = ['Scheduled', 'Late', 'Pending', 'Running', 'Cancelled', 'Crashed', 'Failed', 'Completed'] as const
export type PrefectStateNames = typeof prefectStateNames[number]