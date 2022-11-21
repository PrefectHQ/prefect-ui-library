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

export const terminalStateType = [
  'completed',
  'cancelled',
  'failed',
  'crashed',
]

export type TerminalStateType = typeof terminalStateType[number]
export type ServerTerminalStateType = Uppercase<TerminalStateType>

export function isTerminalStateType(value: string): value is TerminalStateType {
  return terminalStateType.includes(value as TerminalStateType)
}

export const stuckStateTypes = ['running', 'scheduled', 'pending']
export type StuckStateType = typeof stuckStateTypes[number]
export function isStuckStateType(value: string): value is StuckStateType {
  return stuckStateTypes.includes(value as StuckStateType)
}

export function isPausedStateName(value: string): boolean {
  return value === 'Paused'
}