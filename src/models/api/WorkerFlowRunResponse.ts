import { FlowRunResponse } from '@/models'

export type WorkerFlowRunResponse = {
  worker_pool_id: string,
  worker_pool_queue_id: string,
  flow_run: FlowRunResponse,
}
