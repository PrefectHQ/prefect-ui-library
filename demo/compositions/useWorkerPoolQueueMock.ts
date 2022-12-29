import { useSeeds } from './useSeeds'
import { WorkerPoolQueue } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerPoolQueueMock(override?: Partial<WorkerPoolQueue>): WorkerPoolQueue {
  let workerPoolId

  if (override?.workerPoolId) {
    // eslint-disable-next-line prefer-destructuring
    workerPoolId = override.workerPoolId
  } else {
    const workerPool = mocker.create('workerPool')
    workerPoolId = workerPool.id
    useSeeds({
      workerPools: [workerPool],
    })
  }

  const workerPoolQueue = mocker.create('workerPoolQueue', [{ ...override, workerPoolId }])

  useSeeds({
    workerPoolQueues: [workerPoolQueue],
  })

  return workerPoolQueue
}

export function useWorkerPoolQueuesMock(count: number, override?: Partial<WorkerPoolQueue>): WorkerPoolQueue[] {
  return repeat(count, () => useWorkerPoolQueueMock(override))
}