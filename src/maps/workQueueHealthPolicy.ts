import { WorkQueueHealthPolicy, WorkQueueHealthPolicyResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy: MapFunction<WorkQueueHealthPolicyResponse, WorkQueueHealthPolicy> = function(source) {
  return {
    maximumLateRuns: source.maximum_late_runs,
    maximumSecondsSinceLastPolled: source.maximum_seconds_since_last_polled,
  }
}