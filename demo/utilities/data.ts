import { KeyedDataStore } from '../services/KeyedDataStore'
import { SimpleDataStore } from '../services/SimpleDataStore'
import { ApiMockSeeds } from './api'
import { FlowRunGraphMock } from '@/demo/types/flowRunGraphMock'
import { ScheduleResponse, mapper } from '@/index'
import { Flow, FlowRun, BlockDocument, BlockSchema, TaskRun, Deployment, WorkQueue, BlockType, WorkPool, WorkPoolQueue, WorkPoolWorker, GraphNode, Artifact, ArtifactCollection } from '@/models'
import { resolveSchema } from '@/services/schemas/resolvers/schemas'

function hydrateBlockSchema(blockSchema: BlockSchema): BlockSchema {
  const fields = resolveSchema(blockSchema.fields)
  return new BlockSchema({
    ...blockSchema,
    fields,
  })
}

function hydrateGraph({ id, graph }: FlowRunGraphMock): FlowRunGraphMock {
  return {
    id,
    graph: graph.map(node => new GraphNode(node)),
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createDataStores(seeds: ApiMockSeeds = {}) {
  return {
    artifacts: new KeyedDataStore({ seeds: seeds.artifacts, hydrate: artifact => new Artifact({ ...artifact, created: new Date(artifact.created), updated: new Date(artifact.updated) }) }),
    artifactCollections: new KeyedDataStore({ seeds: seeds.artifactCollections, hydrate: artifactCollection => new ArtifactCollection({ ...artifactCollection, created: new Date(artifactCollection.created), updated: new Date(artifactCollection.updated) }) }),
    flows: new KeyedDataStore({ seeds: seeds.flows, hydrate: flow => new Flow(flow) }),
    flowRuns: new KeyedDataStore({ seeds: seeds.flowRuns, hydrate: flowRun => new FlowRun({ ...flowRun, created: new Date(flowRun.created), updated: new Date(flowRun.updated) }) }),
    flowRunGraphs: new KeyedDataStore({ seeds: seeds.flowRunGraphs, hydrate: hydrateGraph }),
    blockDocuments: new KeyedDataStore({ seeds: seeds.blockDocuments, hydrate: blockDocument => new BlockDocument(blockDocument) }),
    blockSchemas: new KeyedDataStore({ seeds: seeds.blockSchemas, hydrate: hydrateBlockSchema }),
    concurrencyLimits: new KeyedDataStore({ seeds: seeds.concurrencyLimits, hydrate: concurrencyLimit => concurrencyLimit }),
    taskRuns: new KeyedDataStore({ seeds: seeds.taskRuns, hydrate: taskRun => new TaskRun(taskRun) }),
    deployments: new KeyedDataStore({
      seeds: seeds.deployments,
      hydrate: deployment => {
        const schedule = mapper.map('ScheduleResponse', deployment.schedule as unknown as ScheduleResponse, 'Schedule')
        const created = new Date(deployment.created)
        const updated = new Date(deployment.updated)
        return new Deployment({ ...deployment, schedule, created, updated })
      },
    }),
    workQueues: new KeyedDataStore({ seeds: seeds.workQueues, hydrate: workQueue => new WorkQueue(workQueue) }),
    blockTypes: new KeyedDataStore({ seeds: seeds.blockTypes, hydrate: blockType => new BlockType(blockType) }),
    blockSchemaCapabilities: new SimpleDataStore({ seeds: seeds.blockCapabilities }),
    workPools: new KeyedDataStore({ seeds: seeds.workPools, hydrate: workPool => new WorkPool(workPool) }),
    workPoolQueues: new KeyedDataStore({ seeds: seeds.workPoolQueues, hydrate: workPoolQueue => new WorkPoolQueue(workPoolQueue) }),
    workPoolWorkers: new KeyedDataStore({ seeds: seeds.workPoolWorkers, hydrate: workPoolWorker => new WorkPoolWorker(workPoolWorker) }),
  }
}
export type CreateDataStores = ReturnType<typeof createDataStores>
export const data = createDataStores()