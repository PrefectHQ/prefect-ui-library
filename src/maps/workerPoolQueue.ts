import { WorkerPoolQueue, WorkerPoolQueueCreate, WorkerPoolQueueCreateRequest, WorkerPoolQueueEdit, WorkerPoolQueueEditRequest, WorkerPoolQueueResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities/mapping'

export const mapWorkerPoolQueueResponseToWorkerPoolQueue: MapFunction<WorkerPoolQueueResponse, WorkerPoolQueue> = function(source: WorkerPoolQueueResponse): WorkerPoolQueue {
  return new WorkerPoolQueue({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    workerPoolId: source.worker_pool_id,
    name: source.name,
    description: source.description,
    isPaused: source.is_paused ?? false,
    concurrencyLimit: source.concurrency_limit,
    priority: source.priority,
  })
}

export const mapWorkerPoolQueueToWorkerPoolQueueResponse: MapFunction<WorkerPoolQueue, WorkerPoolQueueResponse> = function(source: WorkerPoolQueue): WorkerPoolQueueResponse {
  return {
    'id': source.id,
    'created': this.map('Date', source.created, 'string'),
    'updated': this.map('Date', source.updated, 'string'),
    'worker_pool_id': source.workerPoolId,
    'name': source.name,
    'description': source.description,
    'is_paused': source.isPaused,
    'concurrency_limit': source.concurrencyLimit,
    'priority': source.priority,
  }
}

export const mapWorkerPoolQueueCreateToWorkerPoolQueueCreateRequest: MapFunction<WorkerPoolQueueCreate, WorkerPoolQueueCreateRequest> = function(source: WorkerPoolQueueCreate): WorkerPoolQueueCreateRequest {
  return {
    ...mapCamelToSnakeCase(source),
  }
}

export const mapWorkerPoolQueueEditToWorkerPoolQueueEditRequest: MapFunction<WorkerPoolQueueEdit, WorkerPoolQueueEditRequest> = function(source: WorkerPoolQueueEdit): WorkerPoolQueueEditRequest {
  return {
    ...mapCamelToSnakeCase(source),
  }
}