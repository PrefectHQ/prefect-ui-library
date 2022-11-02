import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { MockWorkspaceBlockCapabilitiesApi } from '../services/mockWorkspaceBlockCapabilitiesApi'
import { MockWorkspaceBlockDocumentsApi } from '../services/mockWorkspaceBlockDocumentsApi'
import { MockWorkspaceBlockSchemasApi } from '../services/mockWorkspaceBlockSchemasApi'
import { MockWorkspaceBlockTypesApi } from '../services/mockWorkspaceBlockTypesApi'
import { MockWorkspaceDeploymentsApi } from '../services/mockWorkspaceDeploymentsApi'
import { MockWorkspaceFlowRunsApi } from '../services/mockWorkspaceFlowRunsApi'
import { MockWorkspaceFlowsApi } from '../services/mockWorkspaceFlowsApi'
import { MockWorkspaceTaskRunsApi } from '../services/mockWorkspaceTaskRunsApi'
import { MockWorkspaceWorkQueuesApi } from '../services/mockWorkspaceWorkQueuesApi'
import { BlockDocument, BlockSchema, BlockType, Deployment, Flow, FlowRun, TaskRun, WorkQueue } from '@/models'
import { CreateApi, workspaceApiKey } from '@/utilities'

export type ApiMockSeeds = {
  flows?: Flow[],
  flowRuns?: FlowRun[],
  blockDocuments?: BlockDocument[],
  blockSchemas?: BlockSchema[],
  blockTypes?: BlockType[],
  taskRuns?: TaskRun[],
  deployments?: Deployment[],
  workQueues?: WorkQueue[],
  blockCapabilities?: string[],
}

function createApiMock(): Partial<CreateApi> {
  return {
    flows: createActions(new MockWorkspaceFlowsApi()),
    flowRuns: createActions(new MockWorkspaceFlowRunsApi()),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi()),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi()),
    blockTypes: createActions(new MockWorkspaceBlockTypesApi()),
    blockCapabilities: createActions(new MockWorkspaceBlockCapabilitiesApi()),
    taskRuns: createActions(new MockWorkspaceTaskRunsApi()),
    deployments: createActions(new MockWorkspaceDeploymentsApi()),
    workQueues: createActions(new MockWorkspaceWorkQueuesApi()),
  }
}

export function useWorkspaceApiMock(): Partial<CreateApi> {
  const api = createApiMock()

  provide(workspaceApiKey, api)

  return api
}