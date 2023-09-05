import { WorkPoolWorkerStatus, workPoolWorkerStatus } from '@/models/WorkPoolWorkerStatus'
import { MockFunction } from '@/services/Mocker'

export const randomWorkerStatus: MockFunction<WorkPoolWorkerStatus, []> = function() {
  return workPoolWorkerStatus[Math.floor(Math.random() * workPoolWorkerStatus.length)]
}