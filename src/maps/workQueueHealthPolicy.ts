import { WorkQueueHealthPolicy, WorkQueueHealthPolicyResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities'

export const mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy: MapFunction<WorkQueueHealthPolicyResponse, WorkQueueHealthPolicy> = function(source: WorkQueueHealthPolicyResponse): WorkQueueHealthPolicy {
  return {
    ...mapSnakeToCamelCase(source),
  }
}