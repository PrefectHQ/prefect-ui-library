import { onUnmounted } from 'vue'
import { data } from '../utilities/data'
import { FlowRunGraphMock } from '@/demo/types/flowRunGraphMock'
import { Flow, FlowRun, Deployment, WorkQueue, TaskRun, BlockDocument, BlockType, BlockSchema, ConcurrencyLimit, WorkPool, WorkPoolQueue, WorkPoolWorker } from '@/models'

type Seeds = {
  blockDocuments?: BlockDocument[],
  blockSchemaCapabilities?: string[],
  blockSchemas?: BlockSchema[],
  blockTypes?: BlockType[],
  concurrencyLimit?: ConcurrencyLimit[],
  deployments?: Deployment[],
  flowRunGraphs?: FlowRunGraphMock[],
  flowRuns?: FlowRun[],
  flows?: Flow[],
  taskRuns?: TaskRun[],
  workQueues?: WorkQueue[],
  workPools?: WorkPool[],
  workPoolQueues?: WorkPoolQueue[],
  workPoolWorkers?: WorkPoolWorker[],
}

export function useSeeds(seed: Seeds): void {
  if (seed.flows) {
    const flows = data.flows.createAll(seed.flows)

    const ids = flows.map(flow => flow.id)

    onUnmounted(() => data.flows.deleteAll(ids))
  }

  if (seed.flowRuns) {
    const flowRuns = data.flowRuns.createAll(seed.flowRuns)

    const ids = flowRuns.map(taskRun => taskRun.id)

    onUnmounted(() => data.flowRuns.deleteAll(ids))
  }

  if (seed.flowRunGraphs) {
    const flowRunGraphs = data.flowRunGraphs.createAll(seed.flowRunGraphs)

    const ids = flowRunGraphs.map(flowRunGraph => flowRunGraph.id)

    onUnmounted(() => data.flowRunGraphs.deleteAll(ids))
  }

  if (seed.taskRuns) {
    const taskRuns = data.taskRuns.createAll(seed.taskRuns)

    const ids = taskRuns.map(taskRun => taskRun.id)

    onUnmounted(() => data.taskRuns.deleteAll(ids))
  }

  if (seed.deployments) {
    const deployments = data.deployments.createAll(seed.deployments)

    const ids = deployments.map(deployment => deployment.id)

    onUnmounted(() => data.deployments.deleteAll(ids))
  }

  if (seed.workQueues) {
    const workQueues = data.workQueues.createAll(seed.workQueues)

    const ids = workQueues.map(workQueue => workQueue.id)

    onUnmounted(() => data.workQueues.deleteAll(ids))
  }

  if (seed.blockDocuments) {
    const blockDocuments = data.blockDocuments.createAll(seed.blockDocuments)

    const ids = blockDocuments.map(blockDocument => blockDocument.id)

    onUnmounted(() => data.blockDocuments.deleteAll(ids))
  }

  if (seed.blockTypes) {
    const blockTypes = data.blockTypes.createAll(seed.blockTypes)

    const ids = blockTypes.map(blockType => blockType.id)

    onUnmounted(() => data.blockTypes.deleteAll(ids))
  }

  if (seed.blockSchemas) {
    const blockSchemas = data.blockSchemas.createAll(seed.blockSchemas)

    const ids = blockSchemas.map(blockSchema => blockSchema.id)

    onUnmounted(() => data.blockSchemas.deleteAll(ids))
  }

  if (seed.blockSchemaCapabilities) {
    const blockSchemaCapabilities = data.blockSchemaCapabilities.createAll(seed.blockSchemaCapabilities)

    onUnmounted(() => data.blockSchemaCapabilities.deleteAll(blockSchemaCapabilities))
  }

  if (seed.concurrencyLimit) {
    const concurrencyLimits = data.concurrencyLimits.createAll(seed.concurrencyLimit)
    const ids = concurrencyLimits.map(concurrencyLimit => concurrencyLimit.id)

    onUnmounted(() => data.concurrencyLimits.deleteAll(ids))
  }

  if (seed.workPools) {
    const workPools = data.workPools.createAll(seed.workPools)
    const names = workPools.map(workPool => workPool.name)

    onUnmounted(() => data.workPools.deleteAll(names))
  }

  if (seed.workPoolQueues) {
    const workPoolQueues = data.workPoolQueues.createAll(seed.workPoolQueues)
    const ids = workPoolQueues.map(workPoolQueue => workPoolQueue.id)

    onUnmounted(() => data.workPools.deleteAll(ids))
  }

  if (seed.workPoolWorkers) {
    const workPoolWorkers = data.workPoolWorkers.createAll(seed.workPoolWorkers)
    const ids = workPoolWorkers.map(worker => worker.id)

    onUnmounted(() => data.workPools.deleteAll(ids))
  }
}