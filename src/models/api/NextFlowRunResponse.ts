import { ServerStateType } from '@/models/StateType'
import { DateString } from '@/types/dates'
import { PrefectStateNames } from '@/types/states'

export type NextFlowRunResponse = {
  id: string,
  flow_id: string,
  state_name: PrefectStateNames | null,
  state_type: ServerStateType | null,
  next_scheduled_start_time: DateString | null,
}