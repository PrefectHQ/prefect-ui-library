import { FlowRunResponse } from '@/models'

export type WorkerScheduledFlowRunResponse = {
  work_pool_id: string,
  work_pool_queue_id: string,
  flow_run: FlowRunResponse,
}
