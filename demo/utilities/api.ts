import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { DataStore } from '../services/dataStore'
import { MockWorkspaceBlockDocumentsApi } from '../services/mockWorkspaceBlockDocumentsApi'
import { MockWorkspaceBlockSchemasApi } from '../services/mockWorkspaceBlockSchemasApi'
import { MockWorkspaceDeploymentsApi } from '../services/mockWorkspaceDeploymentsApi'
import { MockWorkspaceFlowRunsApi } from '../services/mockWorkspaceFlowRunsApi'
import { MockWorkspaceFlowsApi } from '../services/mockWorkspaceFlowsApi'
import { MockWorkspaceTaskRunsApi } from '../services/mockWorkspaceTaskRunsApi'
import { MockWorkspaceWorkQueuesApi } from '../services/mockWorkspaceWorkQueuesApi'
import { BlockDocument, BlockSchema, Deployment, Flow, FlowRun, TaskRun, WorkQueue } from '@/models'
import { MaybeArray } from '@/types/utilities'
import { CreateApi, workspaceApiKey } from '@/utilities'


type ApiMockSeeds = {
  flows?: MaybeArray<Flow>,
  flowRuns?: MaybeArray<FlowRun>,
  blockDocuments?: MaybeArray<BlockDocument>,
  blockSchemas?: MaybeArray<BlockSchema>,
  taskRuns?: MaybeArray<TaskRun>,
  deployments?: MaybeArray<Deployment>,
  workQueues?: MaybeArray<WorkQueue>,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createDataStores(seeds: ApiMockSeeds = {}) {
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

export type DataStores = ReturnType<typeof createDataStores>

function createApiMock(seeds: ApiMockSeeds = {}): Partial<CreateApi> {
  const data = createDataStores(seeds)

  return {
    flows: createActions(new MockWorkspaceFlowsApi(data)),
    flowRuns: createActions(new MockWorkspaceFlowRunsApi(data)),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi(data)),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi(data)),
    taskRuns: createActions(new MockWorkspaceTaskRunsApi(data)),
    deployments: createActions(new MockWorkspaceDeploymentsApi(data)),
    workQueues: createActions(new MockWorkspaceWorkQueuesApi(data)),
  }
}

export function useWorkspaceApiMock(seeds: ApiMockSeeds = {}): Partial<CreateApi> {
  const api = createApiMock(seeds)

  provide(workspaceApiKey, api)

  return api
}