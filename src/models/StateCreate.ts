import { StateType, StateDetailsCreate } from '@/models'

export type StateCreate = {
  type: StateType,
} & Partial<{
  message: string,
  stateDetails: StateDetailsCreate | null,
  data: Record<string, unknown>,
  timestamp: string,
  name: string,
}>