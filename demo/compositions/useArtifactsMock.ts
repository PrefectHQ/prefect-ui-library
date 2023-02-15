import { useSeeds } from './useSeeds'
import { Artifact } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities/arrays'

export function useArtifactMock(override?: Partial<Artifact>): Artifact {
  const flow = mocker.create('flow')
  const deployment = mocker.create('deployment')
  const workQueue = mocker.create('workQueue')
  const flowRun = mocker.create('flowRun', [
    {
      flowId: flow.id,
      deploymentId: deployment.id,
      workQueueName: workQueue.name,
    },
  ])

  const artifact = mocker.create('artifact', [{ ...override }])

  useSeeds({
    artifacts: [artifact],
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns: [flowRun],
  })

  return artifact
}

export function useArtifactsMock(count: number, override?: Partial<Artifact>): Artifact[] {
  return repeat(count, () => useArtifactMock(override))
}