import { WorkQueueResponse } from '@/models/WorkQueueResponse'
import { WorkQueue } from '@/models/WorkQueue'
import { MapFunction } from '@/services/Mapper'

export const mapWorkQueueResponseToWorkQueue: MapFunction<WorkQueueResponse, WorkQueue> = function(source: WorkQueueResponse): WorkQueue {
  return new WorkQueue({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    filter: this.map('WorkQueueFilterResponse', source.filter, 'WorkQueueFilter'),
    description: source.description,
    isPaused: source.is_paused ?? false,
    concurrencyLimit: source.concurrency_limit,
  })
}

export const mapWorkQueueToWorkQueueResponse: MapFunction<WorkQueue, WorkQueueResponse> = function(source: WorkQueue): WorkQueueResponse {
  return {
    'id': source.id,
    'created': this.map('Date', source.created, 'string'),
    'updated': this.map('Date', source.updated, 'string'),
    'name': source.name,
    'filter': this.map('WorkQueueFilter', source.filter, 'WorkQueueFilterResponse'),
    'description': source.description,
    'is_paused': source.isPaused,
    'concurrency_limit': source.concurrencyLimit,
  }
}