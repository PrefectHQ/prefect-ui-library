import { createTuple } from '@/utilities/tuples'

export const { values: workPoolStatus, isValue: isWorkPoolStatus } = createTuple(['ready', 'not_ready', 'paused'])
export type WorkPoolStatus = typeof workPoolStatus[number]

export const { values: serverWorkPoolStatus, isValue: isServerWorkPoolStatus } = createTuple(['READY', 'NOT_READY', 'PAUSED'])
export type ServerWorkPoolStatus = typeof serverWorkPoolStatus[number]

export function getWorkPoolStatusLabel(status: WorkPoolStatus): string {
  switch (status) {
    case 'not_ready':
      return 'Not Ready'
    case 'paused':
      return 'Paused'
    case 'ready':
      return 'Ready'
    default:
      const exhaustive: never = status
      throw new Error(`getWorkPoolStatusLabel missing case for ${exhaustive}`)
  }
}