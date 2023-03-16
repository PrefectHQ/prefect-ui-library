import { useSeeds } from './useSeeds'
import { FlowRun } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities/arrays'

export function useFlowRunMock(override?: Partial<FlowRun>): FlowRun {
  const flow = mocker.create('flow')
  const deployment = mocker.create('deployment')
  const workQueue = mocker.create('workQueue')
  const flowRun = mocker.create('flowRun', [
    {
      flowId: flow.id,
      deploymentId: deployment.id,
      workQueueName: workQueue.name,
      ...override,
    },
  ])
  const result = mocker.create('artifact', [
    {
      type: 'result',
      taskRunId: null,
      flowRunId: flowRun.id,
      description: `${mocker.create('adjective')} ${mocker.create('runName')} ${mocker.create('markdownCodeSpanString')}`,
    },
  ])

  useSeeds({
    artifacts: [result],
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns: [flowRun],
  })

  return flowRun
}

export function useFlowRunsMock(count: number, override?: Partial<FlowRun>): FlowRun[] {
  return repeat(count, () => useFlowRunMock(override))
}