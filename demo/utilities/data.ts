import { KeyedDataStore } from '../services/KeyedDataStore'
import { SimpleDataStore } from '../services/SimpleDataStore'
import { ApiMockSeeds } from './api'
import { Flow, FlowRun, BlockDocument, BlockSchema, TaskRun, Deployment, WorkQueue, BlockType } from '@/models'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createDataStores(seeds: ApiMockSeeds = {}) {
  return {
    flows: new KeyedDataStore({ seeds: seeds.flows, hydrate: flow => new Flow(flow) }),
    flowRuns: new KeyedDataStore({ seeds: seeds.flowRuns, hydrate: flowRun => new FlowRun(flowRun) }),
    blockDocuments: new KeyedDataStore({ seeds: seeds.blockDocuments, hydrate: blockDocument => new BlockDocument(blockDocument) }),
    blockSchemas: new KeyedDataStore({ seeds: seeds.blockSchemas, hydrate: blockSchema => new BlockSchema(blockSchema) }),
    taskRuns: new KeyedDataStore({ seeds: seeds.taskRuns, hydrate: taskRun => new TaskRun(taskRun) }),
    deployments: new KeyedDataStore({ seeds: seeds.deployments, hydrate: deployment => new Deployment(deployment) }),
    workQueues: new KeyedDataStore({ seeds: seeds.workQueues, hydrate: workQueue => new WorkQueue(workQueue) }),
    blockTypes: new KeyedDataStore({ seeds: seeds.blockTypes, hydrate: blockType => new BlockType(blockType) }),
    blockSchemaCapabilities: new SimpleDataStore({ seeds: seeds.blockCapabilities }),
  }
}

export type CreateDataStores = ReturnType<typeof createDataStores>

export const data = createDataStores()