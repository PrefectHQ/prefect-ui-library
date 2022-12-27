import { useSeeds } from './useSeeds'
import { useWorkerPoolMock } from './useWorkerPoolMock'
import { WorkerPoolWorker } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerMock(override?: Partial<WorkerPoolWorker>): WorkerPoolWorker {
  const workerPool = useWorkerPoolMock()
  const worker = mocker.create('worker', [{ ...override, workerPoolId: workerPool.id }])

  useSeeds({
    workerPoolWorkers: [worker],
    workerPools: [workerPool],
  })

  return worker
}

export function useWorkersMock(count: number, override?: () => Partial<WorkerPoolWorker>): WorkerPoolWorker[] {
  const workerPool = useWorkerPoolMock()

  const workerPoolWorkers = repeat(count, () => {
    return mocker.create('worker', [
      {
        workerPoolId: workerPool.id,
        ...override?.(),
      },
    ])
  })

  useSeeds({
    workerPoolWorkers,
  })

  return workerPoolWorkers
}