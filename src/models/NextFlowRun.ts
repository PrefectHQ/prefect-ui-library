import { StateType } from '@/models/StateType'
import { PrefectStateNames } from '@/types/states'

export type NextFlowRun = {
  id: string,
  flowId: string,
  stateName: PrefectStateNames | null,
  stateType: StateType | null,
  nextScheduledStartTime: Date | null,
}