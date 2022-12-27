import { KeyedDataStore } from '../services/KeyedDataStore'
import { SimpleDataStore } from '../services/SimpleDataStore'
import { ApiMockSeeds } from './api'
import { Flow, FlowRun, BlockDocument, BlockSchema, TaskRun, Deployment, WorkQueue, BlockType, WorkerPool, WorkerPoolQueue, WorkerPoolWorker } from '@/models'
import { resolveSchema } from '@/services/schemas/resolvers/schemas'

function hydrateBlockSchema(blockSchema: BlockSchema): BlockSchema {
  const fields = resolveSchema(blockSchema.fields)

  return new BlockSchema({
    ...blockSchema,
    fields,
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createDataStores(seeds: ApiMockSeeds = {}) {
  return {
    flows: new KeyedDataStore({ seeds: seeds.flows, hydrate: flow => new Flow(flow) }),
    flowRuns: new KeyedDataStore({ seeds: seeds.flowRuns, hydrate: flowRun => new FlowRun(flowRun) }),
    blockDocuments: new KeyedDataStore({ seeds: seeds.blockDocuments, hydrate: blockDocument => new BlockDocument(blockDocument) }),
    blockSchemas: new KeyedDataStore({ seeds: seeds.blockSchemas, hydrate: hydrateBlockSchema }),
    concurrencyLimits: new KeyedDataStore({ seeds: seeds.concurrencyLimits, hydrate: concurrencyLimit => concurrencyLimit }),
    taskRuns: new KeyedDataStore({ seeds: seeds.taskRuns, hydrate: taskRun => new TaskRun(taskRun) }),
    deployments: new KeyedDataStore({ seeds: seeds.deployments, hydrate: deployment => new Deployment(deployment) }),
    workQueues: new KeyedDataStore({ seeds: seeds.workQueues, hydrate: workQueue => new WorkQueue(workQueue) }),
    blockTypes: new KeyedDataStore({ seeds: seeds.blockTypes, hydrate: blockType => new BlockType(blockType) }),
    blockSchemaCapabilities: new SimpleDataStore({ seeds: seeds.blockCapabilities }),
    workerPools: new KeyedDataStore({ seeds: seeds.workerPools, hydrate: workerPool => new WorkerPool(workerPool) }),
    workerPoolQueues: new KeyedDataStore({ seeds: seeds.workerPoolQueues, hydrate: workerPoolQueue => new WorkerPoolQueue(workerPoolQueue) }),
    workerPoolWorkers: new KeyedDataStore({ seeds: seeds.workerPoolWorkers, hydrate: workerPoolWorker => new WorkerPoolWorker(workerPoolWorker) }),
  }
}

export type CreateDataStores = ReturnType<typeof createDataStores>

export const data = createDataStores()