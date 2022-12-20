import { useSeeds } from '@/../demo/compositions/useSeeds'
import { WorkerPoolQueue } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerPoolQueueMock(override?: Partial<WorkerPoolQueue>): WorkerPoolQueue {
  const workerPool = mocker.create('workerPool')
  const workerPoolQueue = mocker.create('workerPoolQueue', [{ ...override, workerPoolId: workerPool.id }])

  useSeeds({
    workerPoolQueues: [workerPoolQueue],
    workerPools: [workerPool],
  })

  return workerPoolQueue
}

export function useWorkerPoolQueuesMock(count: number, override?: Partial<WorkerPoolQueue>): WorkerPoolQueue[] {
  return repeat(count, () => useWorkerPoolQueueMock(override))
}