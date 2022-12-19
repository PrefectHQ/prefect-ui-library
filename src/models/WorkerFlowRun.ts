import { FlowRun } from '@/models'

export type WorkerFlowRun = {
  workerPoolId: string,
  workerPoolQueueId: string,
  flowRun: FlowRun,
}