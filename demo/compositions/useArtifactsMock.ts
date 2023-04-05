import { useSeeds } from './useSeeds'
import { Artifact, ArtifactCollection } from '@/models'
import { mocker } from '@/services'
import { coinflip, repeat } from '@/utilities'

export function useArtifactMock(override?: Partial<Artifact>, useTaskRun: boolean = coinflip(0.5)): Artifact {
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

  const taskRun = mocker.create('taskRun', [
    {
      flowRunId: flowRun.id,
    },
  ])

  const artifact = mocker.create('artifact', [
    {
      flowRunId: flowRun.id,
      taskRunId: useTaskRun ? taskRun.id : null,
      ...override,
    },
  ])

  let artifactCollection: ArtifactCollection | undefined = undefined
  if (artifact.key) {
    artifactCollection = {
      ...artifact,
      // This seems necessary to infer that the key exists... the spread above doesn't seem to do it.
      key: artifact.key,
      latestId: artifact.id,
    }
  }

  useSeeds({
    artifacts: [artifact],
    artifactCollections: artifactCollection ? [artifactCollection] : [],
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns: [flowRun],
    taskRuns: [taskRun],
  })

  return artifact
}

export function useArtifactsMock(count: number, override?: Partial<Artifact>): Artifact[] {
  return repeat(count, () => useArtifactMock(override))
}
