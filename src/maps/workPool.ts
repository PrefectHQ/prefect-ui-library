import { WorkPool, WorkPoolCreateRequest, WorkPoolEdit, WorkPoolEditRequest, WorkPoolResponse, WorkPoolCreate } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapWorkPoolResponseToWorkPool: MapFunction<WorkPoolResponse, WorkPool> = function(source) {
  return new WorkPool({
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

export const mapWorkPoolToWorkPoolResponse: MapFunction<WorkPool, WorkPoolResponse> = function(source) {
  return {
    id: source.id,
    created: this.map('Date', source.created, 'string'),
    updated: this.map('Date', source.updated, 'string'),
    name: source.name,
    description: source.description,
    type: source.type,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    default_queue_id: source.defaultQueueId,
  }
}

export const mapWorkPoolCreateToWorkPoolCreateRequest: MapFunction<WorkPoolCreate, WorkPoolCreateRequest> = function(source) {
  return {
    name: source.name,
    description: source.description,
    type: source.type,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
  }
}

export const mapWorkPoolEditToWorkPoolEditRequest: MapFunction<WorkPoolEdit, WorkPoolEditRequest> = function(source) {
  return {
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
  }
}