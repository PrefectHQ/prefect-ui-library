import { WorkerScheduledFlowRun, WorkerScheduledFlowRunResponse, WorkerScheduledFlowRuns, WorkerScheduledFlowRunsRequest } from '@/models'
import { MapFunction } from '@/services'

export const mapWorkerScheduledFlowRunResponseToWorkerScheduledFlowRun: MapFunction<WorkerScheduledFlowRunResponse, WorkerScheduledFlowRun> = function(source: WorkerScheduledFlowRunResponse): WorkerScheduledFlowRun {
  return {
    workerPoolId: source.worker_pool_id,
    workerPoolQueueId: source.worker_pool_queue_id,
    flowRun: this.map('FlowRunResponse', source.flow_run, 'FlowRun'),
  }
}

export const mapWorkerScheduledFlowRunsToWorkerScheduledFlowRunsRequest: MapFunction<WorkerScheduledFlowRuns, WorkerScheduledFlowRunsRequest> = function(source: WorkerScheduledFlowRuns): WorkerScheduledFlowRunsRequest {
  return {
    'worker_pool_queue_names': source.workerPoolQueueNames,
    'scheduled_before': source.scheduledBefore,
    'scheduled_after': source.scheduledAfter,
    'limit': source.limit,
  }
}