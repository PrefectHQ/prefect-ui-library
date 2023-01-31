import { WorkerScheduledFlowRun, WorkerScheduledFlowRunResponse, WorkerScheduledFlowRuns, WorkerScheduledFlowRunsRequest } from '@/models'
import { MapFunction } from '@/services'

export const mapWorkerScheduledFlowRunResponseToWorkerScheduledFlowRun: MapFunction<WorkerScheduledFlowRunResponse, WorkerScheduledFlowRun> = function(source) {
  return {
    workPoolId: source.work_pool_id,
    workPoolQueueId: source.work_pool_queue_id,
    flowRun: this.map('FlowRunResponse', source.flow_run, 'FlowRun'),
  }
}

export const mapWorkerScheduledFlowRunsToWorkerScheduledFlowRunsRequest: MapFunction<WorkerScheduledFlowRuns, WorkerScheduledFlowRunsRequest> = function(source) {
  return {
    work_pool_queue_names: source.workPoolQueueNames,
    scheduled_before: source.scheduledBefore,
    scheduled_after: source.scheduledAfter,
    limit: source.limit,
  }
}