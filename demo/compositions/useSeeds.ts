import { onUnmounted } from 'vue'
import { data } from '../utilities/data'
import { FlowRunGraphMock } from '@/demo/types/flowRunGraphMock'
import { Flow, FlowRun, Deployment, WorkQueue, TaskRun, BlockDocument, BlockType, BlockSchema, ConcurrencyLimit, WorkerPool, WorkerPoolQueue, WorkerPoolWorker, GraphNode } from '@/models'

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
  workerPools?: WorkerPool[],
  workerPoolQueues?: WorkerPoolQueue[],
  workerPoolWorkers?: WorkerPoolWorker[],
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

  if (seed.workerPools) {
    const workerPools = data.workerPools.createAll(seed.workerPools)
    const names = workerPools.map(workerPool => workerPool.name)

    onUnmounted(() => data.workerPools.deleteAll(names))
  }

  if (seed.workerPoolQueues) {
    const workerPoolQueues = data.workerPoolQueues.createAll(seed.workerPoolQueues)
    const ids = workerPoolQueues.map(workerPoolQueue => workerPoolQueue.id)

    onUnmounted(() => data.workerPools.deleteAll(ids))
  }

  if (seed.workerPoolWorkers) {
    const workerPoolWorkers = data.workerPoolWorkers.createAll(seed.workerPoolWorkers)
    const ids = workerPoolWorkers.map(worker => worker.id)

    onUnmounted(() => data.workerPools.deleteAll(ids))
  }
}