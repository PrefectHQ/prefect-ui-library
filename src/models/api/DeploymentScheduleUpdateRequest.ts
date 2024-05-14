import { ScheduleResponse } from '@/models'

export type DeploymentScheduleUpdateRequest = {
  active?: boolean,
  schedule?: ScheduleResponse,
  job_variables?: Record<string, unknown>,
  max_active_runs: number | null,
  catchup?: boolean,
}
