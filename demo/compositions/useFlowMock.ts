import { useSeeds } from './useSeeds'
import { Flow } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useFlowMock(override?: Partial<Flow>): Flow {
  const flow = mocker.create('flow', [override])
  const deployment = mocker.create('deployment')
  const workQueue = mocker.create('workQueue')
  const flowRuns = mocker.createMany('flowRun', mocker.create('number'), [
    {
      flowId: flow.id,
      deploymentId: deployment.id,
      workQueueName: workQueue.name,
    },
  ])

  useSeeds({
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns,
  })

  return flow
}

export function useFlowsMock(count: number, override?: Partial<Flow>): Flow[] {
  return repeat(count, () => useFlowMock(override))
}