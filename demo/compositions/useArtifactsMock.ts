import { useSeeds } from './useSeeds'
import { Artifact } from '@/models'
import { mocker } from '@/services'
import { coinflip, isNotNullish, repeat } from '@/utilities'

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

  useSeeds({
    artifacts: [artifact],
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns: [flowRun],
    taskRuns: [taskRun],
  })

  return artifact
}

export function useArtifactsMock(count: number, override?: Partial<Artifact>): Artifact[] {
  const artifacts = repeat(count, () => useArtifactMock(override))

  const artifactKeys: string[] = [...new Set(artifacts.filter(({ key }) => isNotNullish(key)).map(artifact => artifact.key!))]

  const artifactCollections = artifactKeys.map(key => {
    const matchingArtifacts = artifacts.filter(artifact => artifact.key === key)
    if (!matchingArtifacts.length) {
      throw new Error(`Unable to find artifact with key ${key}`)
    }

    const latestArtifact = matchingArtifacts.reduce((latest, artifact) => {
      if (artifact.created > latest.created) {
        return artifact
      }
      return latest
    })

    return {
      ...latestArtifact,
      key,
      latestId: latestArtifact.id,
    }
  })

  useSeeds({
    artifactCollections,
  })

  return artifacts
}
