import { useSeeds } from './useSeeds'
import { WorkerPool } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerPoolMock(override?: Partial<WorkerPool>): WorkerPool {
  const workerPool = mocker.create('workerPool', [override])

  useSeeds({
    workerPools: [workerPool],
  })

  return workerPool
}

export function useWorkerPoolsMock(count: number, override?: Partial<WorkerPool>): WorkerPool[] {
  return repeat(count, () => useWorkerPoolMock(override))
}
