import { createActions } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { CollectionsApi } from '@/services/CollectionsApi'
import { HealthApi } from '@/services/HealthApi'
import { UiApi } from '@/services/UiApi'
import { WorkspaceApiConfig } from '@/services/WorkspaceApi'
import { WorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'
import { WorkspaceBlockCapabilitiesApi } from '@/services/WorkspaceBlockCapabilitiesApi'
import { WorkspaceBlockDocumentsApi } from '@/services/WorkspaceBlockDocumentsApi'
import { WorkspaceBlockSchemasApi } from '@/services/WorkspaceBlockSchemasApi'
import { WorkspaceBlockTypesApi } from '@/services/WorkspaceBlockTypesApi'
import { WorkspaceConcurrencyLimitsApi } from '@/services/WorkspaceConcurrencyLimitsApi'
import { WorkspaceConcurrencyV2LimitsApi } from '@/services/WorkspaceConcurrencyLimitsV2API'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { WorkspaceDeploymentScheduleApi } from '@/services/WorkspaceDeploymentScheduleApi'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { WorkspaceLogsApi } from '@/services/WorkspaceLogsApi'
import { WorkspaceNotificationsApi } from '@/services/WorkspaceNotificationsApi'
import { WorkspaceSavedSearchesApi } from '@/services/WorkspaceSavedSearchesApi'
import { WorkspaceSchemasWorkspaceApi } from '@/services/WorkspaceSchemasWorkspaceApi'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { WorkspaceVariablesApi } from '@/services/WorkspaceVariablesApi'
import { WorkspaceWorkPoolQueuesApi } from '@/services/WorkspaceWorkPoolQueuesApi'
import { WorkspaceWorkPoolsApi } from '@/services/WorkspaceWorkPoolsApi'
import { WorkspaceWorkPoolWorkersApi } from '@/services/WorkspaceWorkPoolWorkersApi'
import { WorkspaceWorkQueuesApi } from '@/services/WorkspaceWorkQueuesApi'

// We want the return type to be inferred
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createApi(workspaceConfig: WorkspaceApiConfig) {
  return {
    artifacts: createActions(new WorkspaceArtifactsApi(workspaceConfig)),
    blockCapabilities: createActions(new WorkspaceBlockCapabilitiesApi(workspaceConfig)),
    blockDocuments: createActions(new WorkspaceBlockDocumentsApi(workspaceConfig)),
    blockSchemas: createActions(new WorkspaceBlockSchemasApi(workspaceConfig)),
    blockTypes: createActions(new WorkspaceBlockTypesApi(workspaceConfig)),
    collections: createActions(new CollectionsApi(workspaceConfig)),
    concurrencyLimits: createActions(new WorkspaceConcurrencyLimitsApi(workspaceConfig)),
    concurrencyV2Limits: createActions(new WorkspaceConcurrencyV2LimitsApi(workspaceConfig)),
    deployments: createActions(new WorkspaceDeploymentsApi(workspaceConfig)),
    deploymentSchedules: createActions(new WorkspaceDeploymentScheduleApi(workspaceConfig)),
    flowRuns: createActions(new WorkspaceFlowRunsApi(workspaceConfig)),
    flows: createActions(new WorkspaceFlowsApi(workspaceConfig)),
    health: createActions(new HealthApi(workspaceConfig)),
    logs: createActions(new WorkspaceLogsApi(workspaceConfig)),
    notifications: createActions(new WorkspaceNotificationsApi(workspaceConfig)),
    savedSearches: createActions(new WorkspaceSavedSearchesApi(workspaceConfig)),
    taskRuns: createActions(new WorkspaceTaskRunsApi(workspaceConfig)),
    ui: createActions(new UiApi(workspaceConfig)),
    variables: createActions(new WorkspaceVariablesApi(workspaceConfig)),
    workPoolQueues: createActions(new WorkspaceWorkPoolQueuesApi(workspaceConfig)),
    workPools: createActions(new WorkspaceWorkPoolsApi(workspaceConfig)),
    workPoolWorkers: createActions(new WorkspaceWorkPoolWorkersApi(workspaceConfig)),
    workQueues: createActions(new WorkspaceWorkQueuesApi(workspaceConfig)),
    schemas: createActions(new WorkspaceSchemasWorkspaceApi(workspaceConfig)),
  }
}

export type CreateApi = ReturnType<typeof createApi>

export const workspaceApiKey: InjectionKey<CreateApi> = Symbol('WorkspaceApi')
