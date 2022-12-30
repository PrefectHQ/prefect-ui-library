import { FlowRun } from '@/models'

export type WorkerScheduledFlowRun = {
  workerPoolId: string,
  workerPoolQueueId: string,
  flowRun: FlowRun,
}