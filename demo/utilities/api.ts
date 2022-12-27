import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { MockWorkspaceBlockCapabilitiesApi } from '../services/mockWorkspaceBlockCapabilitiesApi'
import { MockWorkspaceBlockDocumentsApi } from '../services/mockWorkspaceBlockDocumentsApi'
import { MockWorkspaceBlockSchemasApi } from '../services/mockWorkspaceBlockSchemasApi'
import { MockWorkspaceBlockTypesApi } from '../services/mockWorkspaceBlockTypesApi'
import { MockWorkspaceConcurrencyLimitsApi } from '../services/mockWorkspaceConcurrencyLimitsApi'
import { MockWorkspaceDeploymentsApi } from '../services/mockWorkspaceDeploymentsApi'
import { MockWorkspaceFlowRunsApi } from '../services/mockWorkspaceFlowRunsApi'
import { MockWorkspaceFlowsApi } from '../services/mockWorkspaceFlowsApi'
import { MockWorkspaceTaskRunsApi } from '../services/mockWorkspaceTaskRunsApi'
import { MockWorkspaceWorkerPoolQueuesApi } from '../services/mockWorkspaceWorkerPoolQueuesApi'
import { MockWorkspaceWorkerPoolsApi } from '../services/mockWorkspaceWorkerPoolsApi'
import { MockWorkspaceWorkerPoolWorkerApi } from '../services/mockWorkspaceWorkerPoolWorkerApi'
import { MockWorkspaceWorkQueuesApi } from '../services/mockWorkspaceWorkQueuesApi'
import { BlockDocument, BlockSchema, BlockType, Deployment, Flow, FlowRun, TaskRun, WorkerPool, WorkerPoolQueue, WorkQueue, WorkerPoolWorker } from '@/models'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { CreateApi, workspaceApiKey } from '@/utilities'

export type ApiMockSeeds = {
  flows?: Flow[],
  flowRuns?: FlowRun[],
  blockDocuments?: BlockDocument[],
  blockSchemas?: BlockSchema[],
  blockTypes?: BlockType[],
  concurrencyLimits?: ConcurrencyLimit[],
  taskRuns?: TaskRun[],
  deployments?: Deployment[],
  workQueues?: WorkQueue[],
  blockCapabilities?: string[],
  workerPools?: WorkerPool[],
  workerPoolQueues?: WorkerPoolQueue[],
  workerPoolWorkers?: WorkerPoolWorker[],
}

function createApiMock(): Partial<CreateApi> {
  return {
    flows: createActions(new MockWorkspaceFlowsApi()),
    flowRuns: createActions(new MockWorkspaceFlowRunsApi()),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi()),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi()),
    blockTypes: createActions(new MockWorkspaceBlockTypesApi()),
    blockCapabilities: createActions(new MockWorkspaceBlockCapabilitiesApi()),
    concurrencyLimits: createActions(new MockWorkspaceConcurrencyLimitsApi),
    taskRuns: createActions(new MockWorkspaceTaskRunsApi()),
    deployments: createActions(new MockWorkspaceDeploymentsApi()),
    workQueues: createActions(new MockWorkspaceWorkQueuesApi()),
    workerPools: createActions(new MockWorkspaceWorkerPoolsApi()),
    workerPoolQueues: createActions(new MockWorkspaceWorkerPoolQueuesApi()),
    workerPoolWorkers: createActions(new MockWorkspaceWorkerPoolWorkerApi()),
  }
}

export function useWorkspaceApiMock(): Partial<CreateApi> {
  const api = createApiMock()

  provide(workspaceApiKey, api)

  return api
}