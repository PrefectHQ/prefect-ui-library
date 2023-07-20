import { StateDetailsCreate } from '@/models'
import { StateDetailsRequest } from '@/models/api/StateDetailsRequest'
import { StateDetailsResponse } from '@/models/api/StateDetailsResponse'
import { StateDetails } from '@/models/StateDetails'
import { MapFunction } from '@/services/Mapper'

export const mapStateDetailsResponseToStateDetails: MapFunction<StateDetailsResponse, StateDetails> = function(source) {
  return {
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
    childFlowRunId: source.child_flow_run_id,
    cacheKey: source.cache_key,
    scheduledTime: this.map('string', source.scheduled_time, 'Date'),
    cacheExpiration: this.map('string', source.cache_expiration, 'Date'),
    pauseTimeout: this.map('string', source.pause_timeout, 'Date'),
    pauseReschedule: source.pause_reschedule,
  }
}

export const mapStateDetailsToStateDetailsResponse: MapFunction<StateDetails, StateDetailsResponse> = function(source) {
  return {
    flow_run_id: source.flowRunId,
    task_run_id: source.taskRunId,
    child_flow_run_id: source.childFlowRunId,
    cache_key: source.cacheKey,
    scheduled_time: this.map('Date', source.scheduledTime, 'string'),
    cache_expiration: this.map('Date', source.cacheExpiration, 'string'),
    pause_timeout: this.map('Date', source.pauseTimeout, 'string'),
    pause_reschedule: source.pauseReschedule,
  }
}

export const mapStateDetailsCreateToStateDetailsRequest: MapFunction<StateDetailsCreate, StateDetailsRequest> = function(source) {
  return {
    flow_run_id: source.flowRunId,
    task_run_id: source.taskRunId,
    child_flow_run_id: source.childFlowRunId,
    cache_key: source.cacheKey,
    scheduled_time: source.scheduledTime ? this.map('Date', source.scheduledTime, 'string') : null,
    cache_expiration: source.cacheExpiration ? this.map('Date', source.cacheExpiration, 'string') : null,
  }
}

export const mapStateDetailsToStateDetailsRequest: MapFunction<StateDetails, StateDetailsRequest> = function(source) {
  return {
    flow_run_id: source.flowRunId,
    task_run_id: source.taskRunId,
    child_flow_run_id: source.childFlowRunId,
    cache_key: source.cacheKey,
    pause_reschedule: source.pauseReschedule,
    scheduled_time: source.scheduledTime ? this.map('Date', source.scheduledTime, 'string') : null,
    cache_expiration: source.cacheExpiration ? this.map('Date', source.cacheExpiration, 'string') : null,
    pause_timeout: source.pauseTimeout ? this.map('Date', source.pauseTimeout, 'string') : null,
  }
}

