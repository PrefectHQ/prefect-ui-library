import { WorkerPool, WorkerPoolCreateRequest, WorkerPoolEdit, WorkerPoolEditRequest, WorkerPoolResponse, WorkerPoolCreate } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapWorkerPoolResponseToWorkerPool: MapFunction<WorkerPoolResponse, WorkerPool> = function(source: WorkerPoolResponse): WorkerPool {
  return new WorkerPool({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    description: source.description,
    type: source.type,
    isPaused: source.is_paused ?? false,
    concurrencyLimit: source.concurrency_limit,
    defaultQueueId: source.default_queue_id,
  })
}

export const mapWorkerPoolToWorkerPoolResponse: MapFunction<WorkerPool, WorkerPoolResponse> = function(source: WorkerPool): WorkerPoolResponse {
  return {
    'id': source.id,
    'created': this.map('Date', source.created, 'string'),
    'updated': this.map('Date', source.updated, 'string'),
    'name': source.name,
    'description': source.description,
    'type': source.type,
    'is_paused': source.isPaused,
    'concurrency_limit': source.concurrencyLimit,
    'default_queue_id': source.defaultQueueId,
  }
}

export const mapWorkerPoolCreateToWorkerPoolCreateRequest: MapFunction<WorkerPoolCreate, WorkerPoolCreateRequest> = function(source: WorkerPoolCreate): WorkerPoolCreateRequest {
  return {
    ...mapCamelToSnakeCase(source),
  }
}

export const mapWorkerPoolEditToWorkerPoolEditRequest: MapFunction<WorkerPoolEdit, WorkerPoolEditRequest> = function(source: WorkerPoolEdit): WorkerPoolEditRequest {
  return {
    ...mapCamelToSnakeCase(source),
  }
}