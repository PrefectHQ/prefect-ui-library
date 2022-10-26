import { WorkQueueStatus, WorkQueueStatusResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapWorkQueueStatusResponseToWorkQueueStatus: MapFunction<WorkQueueStatusResponse, WorkQueueStatus> = function(source: WorkQueueStatusResponse): WorkQueueStatus {
  return new WorkQueueStatus({
    healthy: source.healthy,
    lateRuns: source.late_runs,
    lastPolled: this.map('string', source.last_polled, 'Date'),
    healthCheckPolicy: this.map('WorkQueueHealthPolicyResponse', source.health_check_policy, 'WorkQueueHealthPolicy'),
  })
}