import { useSeeds } from './useSeeds'
import { Flow } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useFlowMock(override?: Partial<Flow>): Flow {
  const flow = mocker.create('flow', [override])
  const workPool = mocker.create('workPool')
  const deployment = mocker.create('deployment', [
    {
      flowId: flow.id,
      workPoolName: workPool.name,
    },
  ])
  const flowRuns = mocker.createMany('flowRun', mocker.create('number'), [
    {
      flowId: flow.id,
      deploymentId: deployment.id,
      workPoolName: workPool.name,
    },
  ])

  useSeeds({
    flows: [flow],
    deployments: [deployment],
    workPools: [workPool],
    flowRuns,
  })

  return flow
}

export function useFlowsMock(count: number, override?: Partial<Flow>): Flow[] {
  return repeat(count, () => useFlowMock(override))
}