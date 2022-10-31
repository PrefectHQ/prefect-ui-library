import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
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

export type ApiMockSeeds = {
  flows?: MaybeArray<Flow>,
  flowRuns?: MaybeArray<FlowRun>,
  blockDocuments?: MaybeArray<BlockDocument>,
  blockSchemas?: MaybeArray<BlockSchema>,
  taskRuns?: MaybeArray<TaskRun>,
  deployments?: MaybeArray<Deployment>,
  workQueues?: MaybeArray<WorkQueue>,
}

function createApiMock(): Partial<CreateApi> {
  return {
    flows: createActions(new MockWorkspaceFlowsApi()),
    flowRuns: createActions(new MockWorkspaceFlowRunsApi()),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi()),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi()),
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