import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { AutomationTrigger } from '@/automations/types/triggers'
import { WorkPoolQueue, WorkPoolQueueCreate, WorkPoolQueueCreateRequest, WorkPoolQueueEdit, WorkPoolQueueEditRequest, WorkPoolQueueResponse, WorkPoolQueueResponseStatus, WorkPoolQueueStatus } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapWorkPoolQueueResponseToWorkPoolQueue: MapFunction<WorkPoolQueueResponse, WorkPoolQueue> = function(source) {
  return new WorkPoolQueue({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    workPoolId: source.work_pool_id,
    workPoolName: source.work_pool_name,
    name: source.name,
    description: source.description,
    isPaused: source.is_paused ?? false,
    concurrencyLimit: source.concurrency_limit,
    priority: source.priority,
    lastPolled: this.map('string', source.last_polled, 'Date'),
    status: (source.status?.toLowerCase() ?? 'not_ready') as Lowercase<WorkPoolQueueResponseStatus>,
  })
}

export const mapWorkPoolQueueToWorkPoolQueueResponse: MapFunction<WorkPoolQueue, WorkPoolQueueResponse> = function(source) {
  return {
    id: source.id,
    created: this.map('Date', source.created, 'string'),
    updated: this.map('Date', source.updated, 'string'),
    work_pool_id: source.workPoolId,
    work_pool_name: source.workPoolName,
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
    last_polled: this.map('Date', source.lastPolled, 'string'),
    status: source.status.toUpperCase() as Uppercase<WorkPoolQueueStatus>,
  }
}

export const mapWorkPoolQueueCreateToWorkPoolQueueCreateRequest: MapFunction<WorkPoolQueueCreate, WorkPoolQueueCreateRequest> = function(source) {
  return {
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
  }
}

export const mapWorkPoolQueueEditToWorkPoolQueueEditRequest: MapFunction<WorkPoolQueueEdit, WorkPoolQueueEditRequest> = function(source) {
  return {
    name: source.name,
    description: source.description,
    is_paused: source.isPaused,
    concurrency_limit: source.concurrencyLimit,
    priority: source.priority,
  }
}

export const mapWorkPoolQueueToAutomationTrigger: MapFunction<WorkPoolQueue, AutomationTrigger> = function(workPoolQueue) {
  return new AutomationTriggerEvent({
    'posture': 'Reactive',
    'match': {
      'prefect.resource.id': `prefect.work-queue.${workPoolQueue.id}`,
    },
    'forEach': ['prefect.resource.id'],
    'expect': ['prefect.work-queue.not-ready'],
  })
}
