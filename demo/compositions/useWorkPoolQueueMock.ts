import { useSeeds } from './useSeeds'
import { WorkPoolQueue } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkPoolQueueMock(override?: Partial<WorkPoolQueue>): WorkPoolQueue {
  let workPoolId

  if (override?.workPoolId) {
    // eslint-disable-next-line prefer-destructuring
    workPoolId = override.workPoolId
  } else {
    const workPool = mocker.create('workPool')
    workPoolId = workPool.id
    useSeeds({
      workPools: [workPool],
    })
  }

  const workPoolQueue = mocker.create('workPoolQueue', [{ ...override, workPoolId }])

  useSeeds({
    workPoolQueues: [workPoolQueue],
  })

  return workPoolQueue
}

export function useWorkPoolQueuesMock(count: number, override?: Partial<WorkPoolQueue>): WorkPoolQueue[] {
  return repeat(count, () => useWorkPoolQueueMock(override))
}