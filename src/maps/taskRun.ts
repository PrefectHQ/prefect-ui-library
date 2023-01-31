import { TaskRunResponse } from '@/models/api/TaskRunResponse'
import { TaskRun } from '@/models/TaskRun'
import { MapFunction } from '@/services/Mapper'

export const mapTaskRunResponseToTaskRun: MapFunction<TaskRunResponse, TaskRun> = function(source) {
  return new TaskRun({
    id: source.id,
    flowRunId: source.flow_run_id,
    cacheExpiration: source.cache_expiration,
    cacheKey: source.cache_key,
    created: this.map('string', source.created, 'Date'),
    dynamicKey: source.dynamic_key,
    empiricalPolicy: this.map('EmpiricalPolicyResponse', source.empirical_policy, 'EmpiricalPolicy'),
    estimatedRunTime: source.estimated_run_time,
    estimatedStartTimeDelta: source.estimated_start_time_delta,
    totalRunTime: source.total_run_time,
    expectedStartTime: this.map('string', source.expected_start_time, 'Date'),
    nextScheduledStartTime: source.next_scheduled_start_time,
    runCount: source.run_count,
    name: source.name,
    taskInputs: this.mapEntries('TaskInputResponse', source.task_inputs, 'TaskInput'),
    taskKey: source.task_key,
    taskVersion: source.task_version,
    updated: this.map('string', source.updated, 'Date'),
    startTime: this.map('string', source.start_time, 'Date'),
    endTime: this.map('string', source.end_time, 'Date'),
    stateId: source.state_id,
    stateType: this.map('ServerStateType', source.state_type, 'StateType'),
    state: this.map('StateResponse', source.state, 'State'),
    tags: source.tags,
  })
}

export const mapTaskRunToTaskRunResponse: MapFunction<TaskRun, TaskRunResponse> = function(source) {
  return {
    id: source.id,
    flow_run_id: source.flowRunId,
    cache_expiration: source.cacheExpiration,
    cache_key: source.cacheKey,
    created: this.map('Date', source.created, 'string'),
    dynamic_key: source.dynamicKey,
    empirical_policy: this.map('EmpiricalPolicy', source.empiricalPolicy, 'EmpiricalPolicyResponse'),
    estimated_run_time: source.estimatedRunTime,
    estimated_start_time_delta: source.estimatedStartTimeDelta,
    total_run_time: source.totalRunTime,
    expected_start_time: this.map('Date', source.expectedStartTime, 'string'),
    next_scheduled_start_time: source.nextScheduledStartTime,
    run_count: source.runCount,
    name: source.name,
    task_inputs: this.mapEntries('TaskInput', source.taskInputs, 'TaskInputResponse'),
    task_key: source.taskKey,
    task_version: source.taskVersion,
    updated: this.map('Date', source.updated, 'string'),
    start_time: this.map('Date', source.startTime, 'string'),
    end_time: this.map('Date', source.endTime, 'string'),
    state_id: source.stateId,
    state_type: this.map('StateType', source.stateType, 'ServerStateType'),
    state: this.map('State', source.state, 'StateResponse'),
    tags: source.tags,
  }
}