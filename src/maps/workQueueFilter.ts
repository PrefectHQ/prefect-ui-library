import { WorkQueueFilterResponse } from '@/models/api/WorkQueueFilterResponse'
import { WorkQueueFilter } from '@/models/WorkQueueFilter'
import { MapFunction } from '@/services/Mapper'

export const mapWorkQueueFilterResponseToWorkQueueFilter: MapFunction<WorkQueueFilterResponse, WorkQueueFilter> = function(source: WorkQueueFilterResponse): WorkQueueFilter {
  return new WorkQueueFilter({
    tags: source.tags ?? [],
    deploymentIds: source.deployment_ids ?? [],
  })
}

export const mapWorkQueueFilterToWorkQueueFilterResponse: MapFunction<WorkQueueFilter, WorkQueueFilterResponse> = function(source: WorkQueueFilter): WorkQueueFilterResponse {
  return {
    tags: source.tags,
    deployment_ids: source.deploymentIds,
  }
}