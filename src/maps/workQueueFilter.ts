import { IWorkQueueFilterResponse } from '@/models/IWorkQueueFilterResponse'
import { WorkQueueFilter } from '@/models/WorkQueueFilter'
import { MapFunction } from '@/services/Mapper'

export const mapIWorkQueueFilterResponseToWorkQueueFilter: MapFunction<IWorkQueueFilterResponse, WorkQueueFilter> = function(source: IWorkQueueFilterResponse): WorkQueueFilter {
  return new WorkQueueFilter({
    tags: source.tags ?? [],
    deploymentIds: source.deployment_ids ?? [],
  })
}

export const mapWorkQueueFilterToIWorkQueueFilterResponse: MapFunction<WorkQueueFilter, IWorkQueueFilterResponse> = function(source: WorkQueueFilter): IWorkQueueFilterResponse {
  return {
    'tags': source.tags,
    'deployment_ids': source.deploymentIds,
  }
}