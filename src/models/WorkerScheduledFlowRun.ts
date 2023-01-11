import { FlowRun } from '@/models'

export type WorkerScheduledFlowRun = {
  workPoolId: string,
  workPoolQueueId: string,
  flowRun: FlowRun,
}