import { useSeeds } from './useSeeds'
import { GraphNode } from '@/models'
import { mocker } from '@/services'

export type FlowRunGraphMock = {
  id: string,
  graph: GraphNode[],
}

export function useFlowRunGraphMock(size: number = 3): FlowRunGraphMock {
  const flow = mocker.create('flow')
  const workQueue = mocker.create('workQueue')

  const deployment = mocker.create('deployment', [
    {
      flowId: flow.id,
    },
  ])
  const flowRun = mocker.create('flowRun', [
    {
      flowId: flow.id,
      deploymentId: deployment.id,
      workQueueName: workQueue.name,
    },
  ])
  const taskRuns = mocker.createMany('taskRun', size, [
    {
      flowRunId: flowRun.id,
    },
  ])
  const graph = mocker.create('flowRunGraph', [{ ids: taskRuns.map(taskRun => taskRun.id) }])

  const toSeed = {
    id: flowRun.id,
    graph: graph,
  }

  useSeeds({
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns: [flowRun],
    taskRuns: taskRuns,
    flowRunGraphs: [toSeed],
  })

  return toSeed
}