export const stateType = [
  'completed',
  'running',
  'scheduled',
  'pending',
  'failed',
  'cancelled',
  'crashed',
] as const

export type StateType = typeof stateType[number]
export type ServerStateType = Uppercase<StateType>

export function isStateType(value: string): value is StateType {
  return stateType.includes(value as StateType)
}