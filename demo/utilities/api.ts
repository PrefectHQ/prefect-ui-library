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
import { MockWorkspaceWorkerPoolsApi } from '../services/mockWorkspaceWorkerPoolsApi'
import { MockWorkspaceWorkQueuesApi } from '../services/mockWorkspaceWorkQueuesApi'
import { BlockDocument, BlockSchema, BlockType, Deployment, Flow, FlowRun, TaskRun, WorkerPool, WorkQueue } from '@/models'
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
  }
}

export function useWorkspaceApiMock(): Partial<CreateApi> {
  const api = createApiMock()

  provide(workspaceApiKey, api)

  return api
}