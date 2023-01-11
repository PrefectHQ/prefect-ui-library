import { useSeeds } from './useSeeds'
import { useWorkPoolMock } from './useWorkPoolMock'
import { WorkPoolWorker } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerMock(override?: Partial<WorkPoolWorker>): WorkPoolWorker {
  const workPool = useWorkPoolMock()
  const worker = mocker.create('worker', [{ ...override, workPoolId: workPool.id }])

  useSeeds({
    workPoolWorkers: [worker],
    workPools: [workPool],
  })

  return worker
}

export function useWorkersMock(count: number, override?: () => Partial<WorkPoolWorker>): WorkPoolWorker[] {
  const workPool = useWorkPoolMock()

  const workPoolWorkers = repeat(count, () => {
    return mocker.create('worker', [
      {
        workPoolId: workPool.id,
        ...override?.(),
      },
    ])
  })

  useSeeds({
    workPools: [workPool],
    workPoolWorkers,
  })

  return workPoolWorkers
}