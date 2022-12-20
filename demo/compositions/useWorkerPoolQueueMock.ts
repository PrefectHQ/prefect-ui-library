import { useSeeds } from '@/../demo/compositions/useSeeds'
import { WorkerPoolQueue } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerPoolQueueMock(override?: Partial<WorkerPoolQueue>): WorkerPoolQueue {
  const workerPoolQueue = mocker.create('workerPoolQueue', [override])

  useSeeds({
    workerPoolQueues: [workerPoolQueue],
  })

  return workerPoolQueue
}

export function useWorkerPoolQueuesMock(count: number, override?: Partial<WorkerPoolQueue>): WorkerPoolQueue[] {
  return repeat(count, () => useWorkerPoolQueueMock(override))
}