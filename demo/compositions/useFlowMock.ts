import { useSeeds } from './useSeeds'
import { Flow } from '@/models'
import { mocker } from '@/services'
import { choice, repeat } from '@/utilities'

export type FlowMockOptions = {
  deploymentsCount: number,
}

export function useFlowMock(override?: Partial<Flow>, options?: Partial<FlowMockOptions>): Flow {
  const {
    deploymentsCount = mocker.create('number', [0, 8]),
  } = options ?? {}

  const flow = mocker.create('flow', [override])

  const workPools = mocker.createMany('workPool', mocker.create('number', [0, 2]))
  const workPoolNames = [...workPools.map((workPool) => workPool.name), null]

  const deployments = []
  for (let i = 0; i < deploymentsCount; i++) {
    const deployment = mocker.create('deployment', [
      {
        flowId: flow.id,
        workPoolName: choice(workPoolNames),
      },
    ])

    deployments.push(deployment)
  }

  const deploymentIds = [...deployments.map((deployment) => deployment.id), null]

  const flowRuns = []
  for (const deploymentId of deploymentIds) {
    const deploymentFlowRuns = mocker.createMany('flowRun',
      mocker.create('number'),
      [
        {
          flowId: flow.id,
          deploymentId: deploymentId,
          workPoolName: choice(workPoolNames),
        },
      ])

    flowRuns.push(...deploymentFlowRuns)
  }


  useSeeds({
    flows: [flow],
    deployments,
    workPools,
    flowRuns,
  })

  return flow
}

export function useFlowsMock(count: number, override?: Partial<Flow>): Flow[] {
  return repeat(count, () => useFlowMock(override))
}