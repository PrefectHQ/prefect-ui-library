import { useSeeds } from './useSeeds'
import { WorkPool } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkPoolMock(override?: Partial<WorkPool>): WorkPool {
  const workPool = mocker.create('workPool', [override])

  useSeeds({
    workPools: [workPool],
  })

  return workPool
}

export function useWorkPoolsMock(count: number, override?: Partial<WorkPool>): WorkPool[] {
  return repeat(count, () => useWorkPoolMock(override))
}
