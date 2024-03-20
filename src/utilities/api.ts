import { createActions } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { AxiosInstanceSetupHook } from '@/services/Api'
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
export function createApi(workspaceConfig: WorkspaceApiConfig, instanceSetupHook: AxiosInstanceSetupHook | null = null) {
  return {
    artifacts: createActions(new WorkspaceArtifactsApi(workspaceConfig, instanceSetupHook)),
    blockCapabilities: createActions(new WorkspaceBlockCapabilitiesApi(workspaceConfig, instanceSetupHook)),
    blockDocuments: createActions(new WorkspaceBlockDocumentsApi(workspaceConfig, instanceSetupHook)),
    blockSchemas: createActions(new WorkspaceBlockSchemasApi(workspaceConfig, instanceSetupHook)),
    blockTypes: createActions(new WorkspaceBlockTypesApi(workspaceConfig, instanceSetupHook)),
    collections: createActions(new CollectionsApi(workspaceConfig, instanceSetupHook)),
    concurrencyLimits: createActions(new WorkspaceConcurrencyLimitsApi(workspaceConfig, instanceSetupHook)),
    concurrencyV2Limits: createActions(new WorkspaceConcurrencyV2LimitsApi(workspaceConfig, instanceSetupHook)),
    deployments: createActions(new WorkspaceDeploymentsApi(workspaceConfig, instanceSetupHook)),
    deploymentSchedules: createActions(new WorkspaceDeploymentScheduleApi(workspaceConfig, instanceSetupHook)),
    flowRuns: createActions(new WorkspaceFlowRunsApi(workspaceConfig, instanceSetupHook)),
    flows: createActions(new WorkspaceFlowsApi(workspaceConfig, instanceSetupHook)),
    health: createActions(new HealthApi(workspaceConfig, instanceSetupHook)),
    logs: createActions(new WorkspaceLogsApi(workspaceConfig, instanceSetupHook)),
    notifications: createActions(new WorkspaceNotificationsApi(workspaceConfig, instanceSetupHook)),
    savedSearches: createActions(new WorkspaceSavedSearchesApi(workspaceConfig, instanceSetupHook)),
    taskRuns: createActions(new WorkspaceTaskRunsApi(workspaceConfig, instanceSetupHook)),
    ui: createActions(new UiApi(workspaceConfig, instanceSetupHook)),
    variables: createActions(new WorkspaceVariablesApi(workspaceConfig, instanceSetupHook)),
    workPoolQueues: createActions(new WorkspaceWorkPoolQueuesApi(workspaceConfig, instanceSetupHook)),
    workPools: createActions(new WorkspaceWorkPoolsApi(workspaceConfig, instanceSetupHook)),
    workPoolWorkers: createActions(new WorkspaceWorkPoolWorkersApi(workspaceConfig, instanceSetupHook)),
    workQueues: createActions(new WorkspaceWorkQueuesApi(workspaceConfig, instanceSetupHook)),
    schemas: createActions(new WorkspaceSchemasWorkspaceApi(workspaceConfig, instanceSetupHook)),
  }
}

export type CreateApi = ReturnType<typeof createApi>

export const workspaceApiKey: InjectionKey<CreateApi> = Symbol('WorkspaceApi')
