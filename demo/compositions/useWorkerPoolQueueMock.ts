import { useSeeds } from '@/../demo/compositions/useSeeds'
import { WorkerPoolQueue } from '@/models'
import { mocker } from '@/services'


export function useWorkerPoolQueueMock(override?: Partial<WorkerPoolQueue>): WorkerPoolQueue {
  const workerPoolQueue = mocker.create('workerPoolQueue', [override])

  useSeeds({
    workerPoolQueues: [workerPoolQueue],
  })

  return workerPoolQueue
}
