import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { MockCollectionsApi } from '../services/mockCollectionsApi'
import { MockHealthApi } from '../services/mockHealthApi'
import { MockUiApi } from '../services/mockUiApi'
import { MockWorkspaceArtifactsApi } from '../services/mockWorkspaceArtifactsApi'
import { MockWorkspaceBlockCapabilitiesApi } from '../services/mockWorkspaceBlockCapabilitiesApi'
import { MockWorkspaceBlockDocumentsApi } from '../services/mockWorkspaceBlockDocumentsApi'
import { MockWorkspaceBlockSchemasApi } from '../services/mockWorkspaceBlockSchemasApi'
import { MockWorkspaceBlockTypesApi } from '../services/mockWorkspaceBlockTypesApi'
import { MockWorkspaceConcurrencyLimitsApi } from '../services/mockWorkspaceConcurrencyLimitsApi'
import { MockWorkspaceConcurrencyV2LimitsApi } from '../services/mockWorkspaceConcurrencyV2LimitsAPI'
import { MockWorkspaceDeploymentsApi } from '../services/mockWorkspaceDeploymentsApi'
import { MockWorkspaceFlowRunsApi } from '../services/mockWorkspaceFlowRunsApi'
import { MockWorkspaceFlowsApi } from '../services/mockWorkspaceFlowsApi'
import { MockWorkspaceLogsApi } from '../services/mockWorkspaceLogs'
import { MockWorkspaceNotificationsApi } from '../services/mockWorkspaceNotificationsApi'
import { MockWorkspaceSavedSearchesApi } from '../services/mockWorkspaceSavedSearchesApi'
import { MockWorkspaceTaskRunsApi } from '../services/mockWorkspaceTaskRunsApi'
import { MockWorkspaceVariablesApi } from '../services/mockWorkspaceVariablesApi'
import { MockWorkspaceWorkPoolQueuesApi } from '../services/mockWorkspaceWorkPoolQueuesApi'
import { MockWorkspaceWorkPoolsApi } from '../services/mockWorkspaceWorkPoolsApi'
import { MockWorkspaceWorkPoolWorkerApi } from '../services/mockWorkspaceWorkPoolWorkerApi'
import { MockWorkspaceWorkQueuesApi } from '../services/mockWorkspaceWorkQueuesApi'
import { FlowRunGraphMock } from '@/demo/types/flowRunGraphMock'
import { Artifact, BlockDocument, BlockSchema, BlockType, Deployment, Flow, FlowRun, TaskRun, WorkPool, WorkPoolQueue, WorkQueue, WorkPoolWorker, ArtifactCollection } from '@/models'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { ConcurrencyV2ActiveSlots } from '@/models/ConcurrencyV2ActiveSlots'
import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { CreateApi, workspaceApiKey } from '@/utilities'

export type ApiMockSeeds = {
  artifacts?: Artifact[],
  artifactCollections?: ArtifactCollection[],
  flows?: Flow[],
  flowRuns?: FlowRun[],
  flowRunGraphs?: FlowRunGraphMock[],
  blockDocuments?: BlockDocument[],
  blockSchemas?: BlockSchema[],
  blockTypes?: BlockType[],
  concurrencyLimits?: ConcurrencyLimit[],
  concurrencyV2Limits?: ConcurrencyV2Limit[],
  concurrencyV2ActiveSlots?: ConcurrencyV2ActiveSlots,
  taskRuns?: TaskRun[],
  deployments?: Deployment[],
  workQueues?: WorkQueue[],
  blockCapabilities?: string[],
  workPools?: WorkPool[],
  workPoolQueues?: WorkPoolQueue[],
  workPoolWorkers?: WorkPoolWorker[],
}

function createApiMock(): CreateApi {
  return {
    artifacts: createActions(new MockWorkspaceArtifactsApi()),
    blockCapabilities: createActions(new MockWorkspaceBlockCapabilitiesApi()),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi()),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi()),
    blockTypes: createActions(new MockWorkspaceBlockTypesApi()),
    collections: createActions(new MockCollectionsApi()),
    concurrencyLimits: createActions(new MockWorkspaceConcurrencyLimitsApi),
    concurrencyV2Limits: createActions(new MockWorkspaceConcurrencyV2LimitsApi),
    deployments: createActions(new MockWorkspaceDeploymentsApi()),
    flowRuns: createActions(new MockWorkspaceFlowRunsApi()),
    flows: createActions(new MockWorkspaceFlowsApi()),
    health: createActions(new MockHealthApi()),
    logs: createActions(new MockWorkspaceLogsApi()),
    notifications: createActions(new MockWorkspaceNotificationsApi()),
    savedSearches: createActions(new MockWorkspaceSavedSearchesApi()),
    taskRuns: createActions(new MockWorkspaceTaskRunsApi()),
    ui: createActions(new MockUiApi()),
    variables: createActions(new MockWorkspaceVariablesApi()),
    workPoolQueues: createActions(new MockWorkspaceWorkPoolQueuesApi()),
    workPools: createActions(new MockWorkspaceWorkPoolsApi()),
    workPoolWorkers: createActions(new MockWorkspaceWorkPoolWorkerApi()),
    workQueues: createActions(new MockWorkspaceWorkQueuesApi()),
  }
}

export function useWorkspaceApiMock(): CreateApi {
  const api = createApiMock()

  provide(workspaceApiKey, api)

  return api
}
