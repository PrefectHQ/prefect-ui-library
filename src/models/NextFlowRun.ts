import { StateType } from '@/models/StateType'
import { PrefectStateNames } from '@/types/states'

export type NextFlowRun = {
  id: string,
  flowId: string,
  name: string,
  stateName: PrefectStateNames | null,
  stateType: StateType | null,
  nextScheduledStartTime: Date | null,
}