export const stateType = [
  'completed',
  'running',
  'scheduled',
  'pending',
  'failed',
  'cancelled',
] as const

export type StateType = typeof stateType[number]
export type ServerStateType = Uppercase<StateType>