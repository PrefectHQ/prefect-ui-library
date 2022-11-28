import { onUnmounted } from 'vue'
import { data } from '../utilities/data'
import { Flow, FlowRun, Deployment, WorkQueue, TaskRun, BlockDocument, BlockType, BlockSchema } from '@/models'

type Seeds = {
  blockDocuments?: BlockDocument[],
  blockSchemaCapabilities?: string[],
  blockSchemas?: BlockSchema[],
  blockTypes?: BlockType[],
  deployments?: Deployment[],
  flowRuns?: FlowRun[],
  flows?: Flow[],
  taskRuns?: TaskRun[],
  workQueues?: WorkQueue[],
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
}