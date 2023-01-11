import { useSeeds } from './useSeeds'
import { Flow } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useFlowMock(override?: Partial<Flow>): Flow {
  const flow = mocker.create('flow', [override])
  const workQueue = mocker.create('workQueue')
  const deployment = mocker.create('deployment', [
    {
      flowId: flow.id,
      workQueueName: workQueue.name,
    },
  ])
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