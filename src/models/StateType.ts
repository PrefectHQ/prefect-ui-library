export const stateType = [
  'completed',
  'running',
  'scheduled',
  'pending',
  'failed',
  'cancelled',
  'cancelling',
  'crashed',
  'paused',
] as const

export type StateType = typeof stateType[number]
export type ServerStateType = Uppercase<StateType>

export function isStateType(value: unknown): value is StateType {
  return typeof value === 'string' && stateType.includes(value as StateType)
}

export function isServerStateType(value: unknown): value is ServerStateType {
  return typeof value === 'string' && stateType.includes(value.toLowerCase() as StateType)
}

export const pendingStateType = ['scheduled', 'pending']
export type PendingStateType = typeof pendingStateType[number]

export function isPendingStateType(value: unknown): value is PendingStateType {
  return typeof value === 'string' && pendingStateType.includes(value as PendingStateType)
}

export const terminalStateType = [
  'completed',
  'cancelled',
  'failed',
  'crashed',
]

export type TerminalStateType = typeof terminalStateType[number]
export type ServerTerminalStateType = Uppercase<TerminalStateType>

export function isTerminalStateType(value: unknown): value is TerminalStateType {
  return typeof value === 'string' && terminalStateType.includes(value as TerminalStateType)
}

export const stuckStateTypes = ['running', 'scheduled', 'pending', 'paused']
export type StuckStateType = typeof stuckStateTypes[number]

export function isStuckStateType(value: string): value is StuckStateType {
  return stuckStateTypes.includes(value as StuckStateType)
}

export function isPausedStateType(value: unknown): boolean {
  return typeof value === 'string' && value === 'paused'
}

export function isRunningStateType(value: unknown): boolean {
  return typeof value === 'string' && value === 'running'
}