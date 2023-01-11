import { WorkQueueHealthPolicyResponse } from '@/models/api/WorkQueueHealthPolicyResponse'
import { DateString } from '@/types/dates'

export type WorkQueueStatusResponse = {
  healthy: boolean,
  late_runs_count: number,
  last_polled: DateString | null,
  health_check_policy: WorkQueueHealthPolicyResponse,
  agent_detail: never[],
}