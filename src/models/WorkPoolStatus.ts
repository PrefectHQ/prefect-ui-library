import { createTuple } from '@/utilities/tuples'

export const { values: workPoolStatus, isValue: isWorkPoolStatus } = createTuple(['ready', 'not_ready', 'paused'])
export type WorkPoolStatus = typeof workPoolStatus[number]

export const { values: serverWorkPoolStatus, isValue: isServerWorkPoolStatus } = createTuple(['READY', 'NOT_READY', 'PAUSED'])
export type ServerWorkPoolStatus = typeof serverWorkPoolStatus[number]