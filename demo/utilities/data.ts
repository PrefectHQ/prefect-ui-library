import { DataStore } from '../services/dataStore'
import { ApiMockSeeds } from './api'
import { Flow, FlowRun, BlockDocument, BlockSchema, TaskRun, Deployment, WorkQueue } from '@/models'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createDataStores(seeds: ApiMockSeeds = {}) {
  return {
    flows: new DataStore({ seeds: seeds.flows, hydrate: flow => new Flow(flow) }),
    flowRuns: new DataStore({ seeds: seeds.flowRuns, hydrate: flowRun => new FlowRun(flowRun) }),
    blockDocuments: new DataStore({ seeds: seeds.blockDocuments, hydrate: blockDocument => new BlockDocument(blockDocument) }),
    blockSchemas: new DataStore({ seeds: seeds.blockSchemas, hydrate: blockSchema => new BlockSchema(blockSchema) }),
    taskRuns: new DataStore({ seeds: seeds.taskRuns, hydrate: taskRun => new TaskRun(taskRun) }),
    deployments: new DataStore({ seeds: seeds.deployments, hydrate: deployment => new Deployment(deployment) }),
    workQueues: new DataStore({ seeds: seeds.workQueues, hydrate: workQueue => new WorkQueue(workQueue) }),
  }
}

export type CreateDataStores = ReturnType<typeof createDataStores>

export const data = createDataStores()