import { StateType } from '@/models/StateType'

export type StateIcon = `pi-${Lowercase<StateType>}`
export type StateColor = `var(--${Lowercase<StateType>})`

export const SubStates = ['Late', 'Crashed'] as const
export type SubState = typeof SubStates[number]

export class States {
  public static readonly COMPLETED = 'COMPLETED'
  public static readonly RUNNING = 'RUNNING'
  public static readonly SCHEDULED = 'SCHEDULED'
  public static readonly PENDING = 'PENDING'
  public static readonly FAILED = 'FAILED'
  public static readonly CANCELLED = 'CANCELLED'
}

export const StateIcons: ReadonlyMap<StateType, StateIcon> = new Map([
  [States.COMPLETED, 'pi-completed'],
  [States.RUNNING, 'pi-running'],
  [States.SCHEDULED, 'pi-scheduled'],
  [States.PENDING, 'pi-pending'],
  [States.FAILED, 'pi-failed'],
  [States.CANCELLED, 'pi-cancelled'],
])

export const StateColors: ReadonlyMap<StateType, StateColor> = new Map([
  [States.COMPLETED, 'var(--completed)'],
  [States.RUNNING, 'var(--running)'],
  [States.SCHEDULED, 'var(--scheduled)'],
  [States.PENDING, 'var(--pending)'],
  [States.FAILED, 'var(--failed)'],
  [States.CANCELLED, 'var(--cancelled)'],
])

export function isState(value: unknown): value is StateType {
  return Object.values(States).includes(value)
}

export function isSubState(value: unknown): value is SubState {
  return SubStates.includes(value as SubState)
}