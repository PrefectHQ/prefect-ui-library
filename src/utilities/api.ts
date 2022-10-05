import { createActions } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { WorkspaceApiConfig } from '@/services/WorkspaceApi'
import { WorkspaceBlockCapabilitiesApi } from '@/services/WorkspaceBlockCapabilitiesApi'
import { WorkspaceBlockDocumentsApi } from '@/services/WorkspaceBlockDocumentsApi'
import { WorkspaceBlockSchemasApi } from '@/services/WorkspaceBlockSchemasApi'
import { WorkspaceBlockTypesApi } from '@/services/WorkspaceBlockTypesApi'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { WorkspaceLogsApi } from '@/services/WorkspaceLogsApi'
import { WorkspaceNotificationsApi } from '@/services/WorkspaceNotificationsApi'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { WorkspaceWorkQueuesApi } from '@/services/WorkspaceWorkQueuesApi'

// We want the return type to be inferred
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createApi(workspaceConfig: WorkspaceApiConfig) {
  return {
    blockCapabilities: createActions(new WorkspaceBlockCapabilitiesApi(workspaceConfig)),
    blockDocuments: createActions(new WorkspaceBlockDocumentsApi(workspaceConfig)),
    blockSchemas: createActions(new WorkspaceBlockSchemasApi(workspaceConfig)),
    blockTypes: createActions(new WorkspaceBlockTypesApi(workspaceConfig)),
    deployments: createActions(new WorkspaceDeploymentsApi(workspaceConfig)),
    flowRuns: createActions(new WorkspaceFlowRunsApi(workspaceConfig)),
    flows: createActions(new WorkspaceFlowsApi(workspaceConfig)),
    logs: createActions(new WorkspaceLogsApi(workspaceConfig)),
    notifications: createActions(new WorkspaceNotificationsApi(workspaceConfig)),
    taskRuns: createActions(new WorkspaceTaskRunsApi(workspaceConfig)),
    workQueues: createActions(new WorkspaceWorkQueuesApi(workspaceConfig)),
  }
}

export const workspaceApiKey: InjectionKey<ReturnType<typeof createApi>> = Symbol('WorkspaceApi')
