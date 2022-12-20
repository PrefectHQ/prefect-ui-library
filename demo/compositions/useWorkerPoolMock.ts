import { useSeeds } from '@/../demo/compositions/useSeeds'
import { WorkerPool } from '@/models'
import { mocker } from '@/services'


export function useWorkerPoolMock(override?: Partial<WorkerPool>): WorkerPool {
  const workerPool = mocker.create('workerPool', [override])

  useSeeds({
    workerPools: [workerPool],
  })

  return workerPool
}

