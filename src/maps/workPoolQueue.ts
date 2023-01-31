import { WorkPoolQueue, WorkPoolQueueCreate, WorkPoolQueueCreateRequest, WorkPoolQueueEdit, WorkPoolQueueEditRequest, WorkPoolQueueResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapWorkPoolQueueResponseToWorkPoolQueue: MapFunction<WorkPoolQueueResponse, WorkPoolQueue> = function(source: WorkPoolQueueResponse): WorkPoolQueue {
  return new WorkPoolQueue({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    workPoolId: source.work_pool_id,
    name: source.name,
    description: source.description,
    isPaused: source.is_paused ?? false,
    concurrencyLimit: source.concurrency_limit,
    priority: source.priority,
  })
}

export const mapWorkPoolQueueToWorkPoolQueueResponse: MapFunction<WorkPoolQueue, WorkPoolQueueResponse> = function(source: WorkPoolQueue): WorkPoolQueueResponse {
  return {
    id: source.id,
    created: this.map('Date', source.created, 'string'),
    updated: this.map('Date', source.updated, 'string'),
    work_pool_id: source.workPoolId,
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
  }
}

export const mapWorkPoolQueueCreateToWorkPoolQueueCreateRequest: MapFunction<WorkPoolQueueCreate, WorkPoolQueueCreateRequest> = function(source: WorkPoolQueueCreate): WorkPoolQueueCreateRequest {
  return {
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
  }
}

export const mapWorkPoolQueueEditToWorkPoolQueueEditRequest: MapFunction<WorkPoolQueueEdit, WorkPoolQueueEditRequest> = function(source: WorkPoolQueueEdit): WorkPoolQueueEditRequest {
  return {
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
  }
}