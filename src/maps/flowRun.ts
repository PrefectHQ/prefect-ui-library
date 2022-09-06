import { FlowRun } from '@/models/FlowRun'
import { FlowRunResponse } from '@/models/FlowRunResponse'
import { MapFunction } from '@/services/Mapper'

export const mapFlowRunResponseToFlowRun: MapFunction<FlowRunResponse, FlowRun> = function(source: FlowRunResponse): FlowRun {
  return new FlowRun({
    id: source.id,
    deploymentId: source.deployment_id,
    flowId: source.flow_id,
    flowVersion: source.flow_version,
    idempotencyKey: source.idempotency_key,
    expectedStartTime: this.map('string', source.expected_start_time, 'Date'),
    nextScheduledStartTime: source.next_scheduled_start_time,
    parameters: source.parameters,
    autoScheduled: source.auto_scheduled,
    context: source.context,
    empiricalConfig: source.empirical_config,
    empiricalPolicy: source.empirical_policy,
    estimatedRunTime: source.estimated_run_time,
    estimatedStartTimeDelta: source.estimated_start_time_delta,
    totalRunTime: source.total_run_time,
    startTime: this.map('string', source.start_time, 'Date'),
    endTime: this.map('string', source.end_time, 'Date'),
    name: source.name,
    parentTaskRunId: source.parent_task_run_id,
    stateId: source.state_id,
    stateType: this.map('ServerStateType', source.state_type, 'StateType'),
    state: this.map('StateResponse', source.state, 'State'),
    tags: source.tags,
    runCount: source.run_count,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    workQueueName: source.work_queue_name,
  })
}

export const mapFlowRunToFlowRunResponse: MapFunction<FlowRun, FlowRunResponse> = function(source: FlowRun): FlowRunResponse {
  return {
    'id': source.id,
    'deployment_id': source.deploymentId,
    'flow_id': source.flowId,
    'flow_version': source.flowVersion,
    'idempotency_key': source.idempotencyKey,
    'expected_start_time': this.map('Date', source.expectedStartTime, 'string'),
    'next_scheduled_start_time': source.nextScheduledStartTime,
    'parameters': source.parameters,
    'auto_scheduled': source.autoScheduled,
    'context': source.context,
    'empirical_config': source.empiricalConfig,
    'empirical_policy': source.empiricalPolicy,
    'estimated_run_time': source.estimatedRunTime,
    'estimated_start_time_delta': source.estimatedStartTimeDelta,
    'total_run_time': source.totalRunTime,
    'start_time': this.map('Date', source.startTime, 'string'),
    'end_time': this.map('Date', source.endTime, 'string'),
    'name': source.name,
    'parent_task_run_id': source.parentTaskRunId,
    'state_id': source.stateId,
    'state_type': this.map('StateType', source.stateType, 'ServerStateType'),
    'state': this.map('State', source.state, 'StateResponse'),
    'tags': source.tags,
    'run_count': source.runCount,
    'created': this.map('Date', source.created, 'string'),
    'updated': this.map('Date', source.updated, 'string'),
    'work_queue_name': source.workQueueName,
  }
}