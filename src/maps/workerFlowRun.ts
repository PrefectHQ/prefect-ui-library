import { WorkerFlowRun, WorkerFlowRunResponse } from '@/models'
import { MapFunction } from '@/services'

export const mapWorkerFlowRunResponseToWorkerFlowRun: MapFunction<WorkerFlowRunResponse, WorkerFlowRun> = function(source: WorkerFlowRunResponse): WorkerFlowRun {
  return {
    workerPoolId: source.worker_pool_id,
    workerPoolQueueId: source.worker_pool_queue_id,
    flowRun: this.map('FlowRunResponse', source.flow_run, 'FlowRun'),
  }
}