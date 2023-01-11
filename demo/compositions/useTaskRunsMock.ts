import { useSeeds } from './useSeeds'
import { TaskRun } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useTaskRunMock(override?: Partial<TaskRun>): TaskRun {
  const flow = mocker.create('flow')
  const deployment = mocker.create('deployment', [{ flowId: flow.id }])
  const workQueue = mocker.create('workQueue')
  const flowRun = mocker.create('flowRun', [
    {
      id: override?.flowRunId,
      flowId: flow.id,
      deploymentId: deployment.id,
      workQueueName: workQueue.name,
    },
  ])
  const taskRun = mocker.create('taskRun', [
    {
      flowRunId: flowRun.id,
      ...override,
    },
  ])

  useSeeds({
    flows: [flow],
    deployments: [deployment],
    workQueues: [workQueue],
    flowRuns: [flowRun],
    taskRuns: [taskRun],
  })


  return taskRun
}

export function useTaskRunsMock(count: number, override?: Partial<TaskRun>): TaskRun[] {
  return repeat(count, () => useTaskRunMock(override))
}