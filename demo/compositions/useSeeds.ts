import { onBeforeRouteLeave } from 'vue-router'
import { data } from '../utilities/data'
import { Flow, FlowRun, Deployment, WorkQueue, TaskRun, BlockDocument } from '@/models'

type Seeds = {
  flows?: Flow[],
  flowRuns?: FlowRun[],
  deployments?: Deployment[],
  workQueues?: WorkQueue[],
  taskRuns?: TaskRun[],
  blockDocuments?: BlockDocument[],
}

export function useSeeds(seed: Seeds): void {
  if (seed.flows) {
    const flows = data.flows.createAll(seed.flows)

    const ids = flows.map(flow => flow.id)

    onBeforeRouteLeave(() => data.flows.deleteAll(ids))
  }

  if (seed.flowRuns) {
    const flowRuns = data.flowRuns.createAll(seed.flowRuns)

    const ids = flowRuns.map(taskRun => taskRun.id)

    onBeforeRouteLeave(() => data.flowRuns.deleteAll(ids))
  }

  if (seed.taskRuns) {
    const taskRuns = data.taskRuns.createAll(seed.taskRuns)

    const ids = taskRuns.map(taskRun => taskRun.id)

    onBeforeRouteLeave(() => data.taskRuns.deleteAll(ids))
  }

  if (seed.deployments) {
    const deployments = data.deployments.createAll(seed.deployments)

    const ids = deployments.map(deployment => deployment.id)

    onBeforeRouteLeave(() => data.deployments.deleteAll(ids))
  }

  if (seed.workQueues) {
    const workQueues = data.workQueues.createAll(seed.workQueues)

    const ids = workQueues.map(workQueue => workQueue.id)

    onBeforeRouteLeave(() => data.workQueues.deleteAll(ids))
  }

  if (seed.blockDocuments) {
    const blockDocuments = data.blockDocuments.createAll(seed.blockDocuments)

    const ids = blockDocuments.map(blockDocument => blockDocument.id)

    onBeforeRouteLeave(() => data.blockDocuments.deleteAll(ids))
  }
}