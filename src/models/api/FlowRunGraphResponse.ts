import { StateResponse } from '@/models/api/StateResponse'
import { TaskRunInputType } from '@/models/GraphNode'
import { DateString } from '@/types/dates'

export type FlowRunGraphResponse = {
  id: string,
  name?: string,
  upstream_dependencies: {
    id: string,
    input_type: TaskRunInputType,
  }[],
  state: StateResponse,
  expected_start_time: DateString | null,
  start_time: DateString | null,
  end_time: DateString | null,
  total_run_time: number | null,
  estimated_run_time: number | null,
}
