import { WorkQueueCreateRequest, WorkQueueEditRequest, WorkQueueCreate, WorkQueueEdit, WorkQueue, WorkQueueResponse, WorkPoolQueueResponseStatus } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapWorkQueueResponseToWorkQueue: MapFunction<WorkQueueResponse, WorkQueue> = function(source) {
  return new WorkQueue({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    filter: this.map('WorkQueueFilterResponse', source.filter, 'WorkQueueFilter'),
    description: source.description,
    isPaused: source.is_paused ?? false,
    concurrencyLimit: source.concurrency_limit,
    priority: source.priority,
    workPoolId: source.work_pool_id,
    workPoolName: source.work_pool_name,
    status: (source.status?.toLowerCase() ?? 'not_ready') as Lowercase<WorkPoolQueueResponseStatus>,
  })
}

export const mapWorkQueueToWorkQueueResponse: MapFunction<WorkQueue, WorkQueueResponse> = function(source) {
  return {
    id: source.id,
    created: this.map('Date', source.created, 'string'),
    updated: this.map('Date', source.updated, 'string'),
    name: source.name,
    filter: this.map('WorkQueueFilter', source.filter, 'WorkQueueFilterResponse'),
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
    work_pool_id: source.workPoolId,
    work_pool_name: source.workPoolName,
  }
}

export const mapWorkQueueCreateToWorkQueueCreateRequest: MapFunction<WorkQueueCreate, WorkQueueCreateRequest> = function(source) {
  return {
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
  }
}

export const mapWorkQueueEditToWorkQueueEditRequest: MapFunction<WorkQueueEdit, WorkQueueEditRequest> = function(source) {
  return {
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
  }
}