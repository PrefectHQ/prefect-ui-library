import { createTuple } from '@/utilities/tuples'

export const { values: workPoolStatus, isValue: isWorkPoolStatus } = createTuple(['ready', 'not_ready', 'paused'])
export type WorkPoolStatus = typeof workPoolStatus[number]

export const { values: serverWorkPoolStatus, isValue: isServerWorkPoolStatus } = createTuple(['READY', 'NOT_READY', 'PAUSED'])
export type ServerWorkPoolStatus = typeof serverWorkPoolStatus[number]

export function getWorkPoolStatusLabel(status: WorkPoolStatus): string {
  switch (status) {
    case 'not_ready':
      return 'not ready'
    case 'paused':
      return 'paused'
    case 'ready':
      return 'ready'
    default:
      const exhaustive: never = status
      throw new Error(`getWorkPoolStatusLabe missing case for ${exhaustive}`)
  }
}