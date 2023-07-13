import { StateType } from '@/models/StateType'

// intentionally grouped by state type progression
// this order determines the other these show up in the ui
export const prefectStateNames = [
  'Scheduled',
  'Late',
  'Resuming',
  'AwaitingRetry',
  'Pending',
  'Paused',
  'Running',
  'Retrying',
  'Completed',
  'Cancelled',
  'Cancelling',
  'Crashed',
  'Failed',
  'TimedOut',
] as const
export type PrefectStateNames = typeof prefectStateNames[number]

export const prefectStateNameTypes = {
  'Scheduled': 'scheduled',
  'Late': 'scheduled',
  'Resuming': 'scheduled',
  'AwaitingRetry': 'scheduled',
  'Pending': 'pending',
  'Paused': 'paused',
  'Running': 'running',
  'Retrying': 'running',
  'Completed': 'completed',
  'Cancelled': 'cancelled',
  'Cancelling': 'cancelling',
  'Crashed': 'crashed',
  'Failed': 'failed',
  'TimedOut': 'failed',
} as const satisfies Record<PrefectStateNames, StateType>

export const prefectStateNamesWithoutScheduled = [
  'Pending',
  'Paused',
  'Running',
  'Retrying',
  'Completed',
  'Cancelled',
  'Cancelling',
  'Crashed',
  'Failed',
  'TimedOut',
] as const