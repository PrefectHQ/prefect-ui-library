import { FlowRunResponse } from '@/models/api/FlowRunResponse'
import { FlowRun } from '@/models/FlowRun'
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
    stateName: source.state_name,
    stateType: this.map('ServerStateType', source.state_type, 'StateType'),
    state: this.map('StateResponse', source.state, 'State'),
    tags: source.tags,
    runCount: source.run_count,
    created: this.map('string', source.created, 'Date'),
    createdBy: this.map('CreatedOrUpdatedByResponse', source.created_by, 'CreatedOrUpdatedBy'),
    updated: this.map('string', source.updated, 'Date'),
    workQueueName: source.work_queue_name,
    workerPoolName: source.worker_pool_name,
    workerPoolQueueName: source.worker_pool_queue_name,
  })
}