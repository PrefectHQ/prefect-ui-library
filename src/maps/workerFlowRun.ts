import { WorkerFlowRun, WorkerFlowRunResponse, WorkerFlowRuns, WorkerFlowRunsRequest } from '@/models'
import { MapFunction } from '@/services'

export const mapWorkerFlowRunResponseToWorkerFlowRun: MapFunction<WorkerFlowRunResponse, WorkerFlowRun> = function(source: WorkerFlowRunResponse): WorkerFlowRun {
  return {
    workerPoolId: source.worker_pool_id,
    workerPoolQueueId: source.worker_pool_queue_id,
    flowRun: this.map('FlowRunResponse', source.flow_run, 'FlowRun'),
  }
}

export const mapWorkerFlowRunsToWorkerFlowRunsRequest: MapFunction<WorkerFlowRuns, WorkerFlowRunsRequest> = function(source: WorkerFlowRuns): WorkerFlowRunsRequest {
  return {
    'worker_pool_queue_names': source.workerPoolQueueNames,
    'scheduled_before': source.scheduledBefore,
    'scheduled_after': source.scheduledAfter,
    'limit': source.limit,
  }
}