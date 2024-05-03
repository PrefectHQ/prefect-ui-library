import { mapAutomationActionResponseToAutomationAction, mapAutomationActionToAutomationActionRequest } from '@/automations/maps/actions'
import { mapAutomationResponseToAutomation } from '@/automations/maps/automations'
import { mapCreateAutomationActionQueryToLocationQuery, mapCreateAutomationQueryToLocationQuery, mapCreateAutomationTriggerQueryToLocationQuery } from '@/automations/maps/createAutomationQuery'
import { mapAutomationTriggerToDeploymentStatusTrigger, mapDeploymentStatusTriggerToAutomationTrigger } from '@/automations/maps/deploymentStatusTrigger'
import { mapAutomationTriggerToFlowRunStateTrigger, mapFlowRunStateTriggerToAutomationTrigger } from '@/automations/maps/flowRunStateTrigger'
import { mapAutomationTriggerResponseToAutomationTrigger, mapAutomationTriggerToAutomationTriggerRequest } from '@/automations/maps/triggers'
import { mapAutomationTriggerToWorkPoolStatusTrigger, mapWorkPoolStatusTriggerToAutomationTrigger } from '@/automations/maps/workPoolStatusTrigger'
import { mapAutomationTriggerToWorkQueueStatusTrigger, mapWorkQueueStatusTriggerToAutomationTrigger } from '@/automations/maps/workQueueStatusTrigger'
import { mapArtifactCollectionResponseToArtifactCollection, mapArtifactResponseToArtifact } from '@/maps/artifact'
import { mapBlockDocumentResponseToBlockDocument, mapBlockDocumentToSelectOption } from '@/maps/blockDocument'
import { mapBlockDocumentCreateToBlockDocumentCreateRequest } from '@/maps/blockDocumentCreate'
import { mapBlockDocumentResponseReferencesToBlockDocumentReferences } from '@/maps/blockDocumentReferences'
import { mapBlockDocumentUpdateToBlockDocumentUpdateRequest } from '@/maps/blockDocumentUpdate'
import { mapBlockSchemaResponseToBlockSchema } from '@/maps/blockSchema'
import { mapBlockSchemaReferencesResponseToBlockSchemaReferences } from '@/maps/blockSchemaReferences'
import { mapBlockTypeResponseToBlockType } from '@/maps/blockType'
import { mapCollectionItemResponseToCollectionItem, mapCollectionResponseToCollectionItems } from '@/maps/collectionItem'
import { mapConcurrencyLimitResponseToConcurrencyLimit } from '@/maps/concurrencyLimit'
import { mapConcurrencyLimitCreateToConcurrencyLimitCreateRequest } from '@/maps/concurrencyLimitCreate'
import { mapConcurrencyV2ResponseToConcurrencyV2Limit } from '@/maps/concurrencyV2Limit'
import { mapConcurrencyV2CreateToConcurrencyV2CreateRequest } from '@/maps/concurrencyV2LimitCreate'
import { mapConcurrencyV2UpdateToConcurrencyV2UpdateRequest } from '@/maps/concurrencyV2LimitUpdate'
import { mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy } from '@/maps/createdOrUpdatedBy'
import {
  mapWorkspaceDashboardFilterToTaskRunsFilter,
  mapWorkspaceDashboardFilterToTaskRunsHistoryFilter,
  mapWorkspaceDashboardFilterToWorkPoolWorkersFilter,
  mapWorkspaceDashboardFilterToFlowRunsFilter
} from '@/maps/dashboard'
import { mapStringToDate, mapDateToString } from '@/maps/date'
import { mapDateRangeSelectValueToDateRange } from '@/maps/dateRangeSelectValue'
import { mapDeploymentResponseToDeployment, mapDeploymentUpdateToDeploymentUpdateRequest, mapDeploymentFlowRunCreateToDeploymentFlowRunRequest, mapDeploymentFlowRunCreateV2ToDeploymentFlowRunRequest, mapDeploymentUpdateV2ToDeploymentUpdateRequest } from '@/maps/deployment'
import { mapDeploymentScheduleResponseToDeploymentSchedule } from '@/maps/deploymentSchedule'
import { mapDeploymentScheduleCreateToDeploymentScheduleCreateRequest } from '@/maps/deploymentScheduleCreate'
import { mapDeploymentScheduleUpdateToDeploymentScheduleUpdateRequest } from '@/maps/deploymentScheduleUpdate'
import { mapDeploymentStatsFilterToFlowRunsFilter } from '@/maps/deploymentStatsFilter'
import { mapDeploymentStatusToServerDeploymentStatus, mapServerDeploymentStatusToDeploymentStatus } from '@/maps/deploymentStatus'
import { mapRunHistoryToDivergingBarChartItem } from '@/maps/divergingBarChartItem'
import { mapEmpiricalPolicyToEmpiricalPolicyResponse, mapEmpiricalPolicyResponseToEmpiricalPolicy, mapEmpiricalPolicyToEmpiricalPolicyRequest } from '@/maps/empiricalPolicy'
import { mapFlowFilter, mapDeploymentFilter, mapFlowRunFilter, mapStateFilter, mapFlowsFilter, mapDeploymentsFilter, mapFlowRunsFilter, mapTagFilter, mapTaskRunFilter, mapTaskRunsFilter, mapBlockDocumentFilter, mapBlockSchemaFilter, mapBlockTypeFilter, mapBlockDocumentsFilter, mapBlockSchemasFilter, mapBlockTypesFilter, mapWorkPoolsFilter, mapWorkPoolFilter, mapWorkPoolQueueFilter, mapFlowRunsHistoryFilter, mapLogsFilter, mapNotificationsFilter, mapSavedSearchesFilter, mapWorkQueuesFilter, mapWorkPoolWorkersFilter, mapWorkPoolQueuesFilter, mapArtifactFilter, mapArtifactsFilter, mapVariablesFilter, mapVariableFilter, mapTaskRunsHistoryFilter } from '@/maps/filters'
import { mapFlowToFlowResponse, mapFlowResponseToFlow } from '@/maps/flow'
import { mapFlowRunResponseToFlowRun } from '@/maps/flowRun'
import { mapRunHistoryToFlowRunHistoryResponse, mapFlowRunHistoryResponseToRunHistory } from '@/maps/flowRunHistory'
import { mapFlowStatsFilterToFlowRunsFilter, mapFlowStatsFilterToTaskRunsFilter } from '@/maps/flowStatsFilter'
import { mapLogToLogResponse, mapLogResponseToLog } from '@/maps/logs'
import { mapFlowRunInputKeysetResponseToFlowRunInputKeyset, mapFlowRunInputKeysetToFlowRunInputKeysetResponse } from '@/maps/mapFlowRunInputKeysetResponseToFlowRunInputKeyset'
import { mapNotificationResponseToNotification } from '@/maps/notification'
import { mapNotificationCreateToNotificationCreateRequest } from '@/maps/notificationCreate'
import { mapNotificationUpdateToNotificationUpdateRequest } from '@/maps/notificationUpdate'
import { mapNumberToString, mapStringToNumber } from '@/maps/number'
import { mapOrchestrationResultResponseToOrchestrationResult } from '@/maps/orchestrationResult'
import { mapRunGraphDataResponse, mapRunGraphNodeResponse, mapRunGraphArtifactResponse, mapRunGraphStateResponse } from '@/maps/runGraphData'
import { mapSavedSearchResponseToSavedSearch, mapSavedSearchToLocationQuery } from '@/maps/savedSearch'
import { mapSavedSearchCreateToSavedSearchCreateRequest } from '@/maps/savedSearchCreate'
import { mapSavedSearchFilterToFlowRunsFilter } from '@/maps/savedSearchFilter'
import { mapUiFlowRunHistoryToScatterPlotItem } from '@/maps/scatterPlotItem'
import { mapScheduleToScheduleResponse, mapScheduleResponseToSchedule, mapScheduleToScheduleRequest } from '@/maps/schedule'
import { mapSchemaDefinitionsResponseToSchemaDefinitions, mapSchemaPropertiesResponseToSchemaProperties, mapSchemaPropertyResponseToSchemaProperty, mapSchemaResponseToSchema } from '@/maps/schema'
import { mapSchemaValuesToSchemaValuesRequest } from '@/maps/schemaValuesRequest'
import { mapSchemaValuesResponseToSchemaValues } from '@/maps/schemaValuesResponse'
import { mapStateResponseToState, mapStateToStateResponse, mapStateCreateToStateRequest } from '@/maps/state'
import { mapStateDetailsCreateToStateDetailsRequest, mapStateDetailsResponseToStateDetails, mapStateDetailsToStateDetailsRequest, mapStateDetailsToStateDetailsResponse } from '@/maps/stateDetails'
import { mapStateHistoryToStateHistoryResponse, mapStateHistoryResponseToStateHistory } from '@/maps/stateHistory'
import { mapServerStateTypeToStateType, mapStateTypeToServerStateType } from '@/maps/stateType'
import { mapStateUpdateToStateUpdateRequest } from '@/maps/stateUpdate'
import { mapTaskInputToTaskInputResponse, mapTaskInputResponseToTaskInput } from '@/maps/taskInput'
import { mapTaskRunToTaskRunResponse, mapTaskRunResponseToTaskRun } from '@/maps/taskRun'
import { mapTaskRunHistoryResponseToTaskRunHistory, mapTaskRunHistoryStateResponseToTaskRunHistoryState, mapTaskRunsFilterToTaskRunsHistoryFilter } from '@/maps/taskRunHistory'
import { mapUiFlowRunHistoryResponseToUiFlowRunHistory } from '@/maps/uiFlowRunHistory'
import { mapUiTaskRunCountsByStateResponseToUiTaskRunCountsByState } from '@/maps/uiTaskRunCountsByState'
import { mapVariableResponseToVariable, mapVariableEditToVariableEditRequest, mapVariableCreateToVariableCreateRequest } from '@/maps/variable'
import { mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray, mapWorkerSchemaValuesToWorkerSchemaValuesRequest } from '@/maps/workerCollection'
import { mapWorkerScheduledFlowRunResponseToWorkerScheduledFlowRun, mapWorkerScheduledFlowRunsToWorkerScheduledFlowRunsRequest } from '@/maps/workerScheduledFlowRun'
import { mapWorkPoolCreateToWorkPoolCreateRequest, mapWorkPoolEditToWorkPoolEditRequest, mapWorkPoolResponseToWorkPool, mapWorkPoolToWorkPoolResponse } from '@/maps/workPool'
import { mapWorkPoolQueueCreateToWorkPoolQueueCreateRequest, mapWorkPoolQueueEditToWorkPoolQueueEditRequest, mapWorkPoolQueueResponseToWorkPoolQueue, mapWorkPoolQueueToWorkPoolQueueResponse } from '@/maps/workPoolQueue'
import { mapServerWorkPoolStatusToWorkPoolStatus, mapWorkPoolStatusToServerWorkPoolStatus } from '@/maps/workPoolStatus'
import { mapWorkPoolWorkerResponseToWorkPoolWorker } from '@/maps/workPoolWorker'
import { mapWorkPoolWorkerStatusToServerWorkPoolWorkerStatus, mapServerWorkPoolWorkerStatusToWorkPoolWorkerStatus } from '@/maps/workPoolWorkerStatus'
import { mapWorkQueueToWorkQueueResponse, mapWorkQueueResponseToWorkQueue, mapWorkQueueCreateToWorkQueueCreateRequest, mapWorkQueueEditToWorkQueueEditRequest } from '@/maps/workQueue'
import { mapWorkQueueFilterToWorkQueueFilterResponse, mapWorkQueueFilterResponseToWorkQueueFilter } from '@/maps/workQueueFilter'
import { mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy } from '@/maps/workQueueHealthPolicy'
import { mapWorkQueueStatusResponseToWorkQueueStatus } from '@/maps/workQueueStatus'
import { mapWorkspaceEventResponseToWorkspaceEvent } from '@/maps/workspaceEvent'
import { mapWorkspaceEventsResponseToWorkspaceEvents } from '@/maps/workspaceEvents'
import { mapWorkspaceEventsCountResponseToHistogramDataPoint, mapWorkspaceEventsCountResponseToWorkspaceEventsCount } from '@/maps/workspaceEventsCount'
import { mapWorkspaceEventsFilterToWorkspaceEventsFilterRequest } from '@/maps/workspaceEventsFilter'
import { mapEventsHistoryToEventsHistoryRequest } from '@/maps/workspaceEventsHistory'

export const maps = {
  ArtifactFilter: { ArtifactFilterRequest: mapArtifactFilter },
  ArtifactResponse: { Artifact: mapArtifactResponseToArtifact },
  ArtifactCollectionResponse: { ArtifactCollection: mapArtifactCollectionResponseToArtifactCollection },
  ArtifactsFilter: { ArtifactsFilterRequest: mapArtifactsFilter },
  AutomationResponse: { Automation: mapAutomationResponseToAutomation },
  AutomationActionResponse: { AutomationAction: mapAutomationActionResponseToAutomationAction },
  AutomationAction: { AutomationActionRequest: mapAutomationActionToAutomationActionRequest },
  BlockDocument: { SelectOption: mapBlockDocumentToSelectOption },
  BlockDocumentCreate: { BlockDocumentCreateRequest: mapBlockDocumentCreateToBlockDocumentCreateRequest },
  BlockDocumentFilter: { BlockDocumentFilterRequest: mapBlockDocumentFilter },
  BlockDocumentReferencesResponse: { BlockDocumentReferences: mapBlockDocumentResponseReferencesToBlockDocumentReferences },
  BlockDocumentResponse: { BlockDocument: mapBlockDocumentResponseToBlockDocument },
  BlockDocumentsFilter: { BlockDocumentsFilterRequest: mapBlockDocumentsFilter },
  BlockDocumentUpdate: { BlockDocumentUpdateRequest: mapBlockDocumentUpdateToBlockDocumentUpdateRequest },
  BlockSchemaFilter: { BlockSchemaFilterRequest: mapBlockSchemaFilter },
  BlockSchemaReferencesResponse: { BlockSchemaReferences: mapBlockSchemaReferencesResponseToBlockSchemaReferences },
  BlockSchemaResponse: { BlockSchema: mapBlockSchemaResponseToBlockSchema },
  BlockSchemasFilter: { BlockSchemasFilterRequest: mapBlockSchemasFilter },
  BlockTypeFilter: { BlockTypeFilterRequest: mapBlockTypeFilter },
  BlockTypeResponse: { BlockType: mapBlockTypeResponseToBlockType },
  BlockTypesFilter: { BlockTypesFilterRequest: mapBlockTypesFilter },
  CollectionItemResponse: { CollectionItem: mapCollectionItemResponseToCollectionItem },
  CollectionResponse: { CollectionItems: mapCollectionResponseToCollectionItems },
  ConcurrencyLimitCreate: { ConcurrencyLimitCreateRequest: mapConcurrencyLimitCreateToConcurrencyLimitCreateRequest },
  ConcurrencyLimitResponse: { ConcurrencyLimit: mapConcurrencyLimitResponseToConcurrencyLimit },
  ConcurrencyV2LimitResponse: { ConcurrencyV2Limit: mapConcurrencyV2ResponseToConcurrencyV2Limit },
  ConcurrencyV2LimitCreate: { ConcurrencyV2CreateRequest: mapConcurrencyV2CreateToConcurrencyV2CreateRequest },
  ConcurrencyV2LimitUpdate: { ConcurrencyV2UpdateRequest: mapConcurrencyV2UpdateToConcurrencyV2UpdateRequest },
  CreateAutomationQuery: { LocationQuery: mapCreateAutomationQueryToLocationQuery },
  CreateAutomationTriggerQuery: { LocationQuery: mapCreateAutomationTriggerQueryToLocationQuery },
  CreateAutomationActionQuery: { LocationQuery: mapCreateAutomationActionQueryToLocationQuery },
  CreatedOrUpdatedByResponse: { CreatedOrUpdatedBy: mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy },
  Date: { string: mapDateToString },
  DateRangeSelectValue: { DateRange: mapDateRangeSelectValueToDateRange },
  DeploymentFilter: { DeploymentFilterRequest: mapDeploymentFilter },
  DeploymentFlowRunCreate: { DeploymentFlowRunRequest: mapDeploymentFlowRunCreateToDeploymentFlowRunRequest },
  DeploymentFlowRunCreateV2: { DeploymentFlowRunRequest: mapDeploymentFlowRunCreateV2ToDeploymentFlowRunRequest },
  DeploymentResponse: { Deployment: mapDeploymentResponseToDeployment },
  DeploymentScheduleResponse: { DeploymentSchedule: mapDeploymentScheduleResponseToDeploymentSchedule },
  DeploymentScheduleCreate: { DeploymentScheduleCreateRequest: mapDeploymentScheduleCreateToDeploymentScheduleCreateRequest },
  DeploymentScheduleUpdate: { DeploymentScheduleUpdateRequest: mapDeploymentScheduleUpdateToDeploymentScheduleUpdateRequest },
  DeploymentsFilter: { DeploymentsFilterRequest: mapDeploymentsFilter },
  DeploymentStatus: { ServerDeploymentStatus: mapDeploymentStatusToServerDeploymentStatus },
  DeploymentStatsFilter: { FlowRunsFilter: mapDeploymentStatsFilterToFlowRunsFilter },
  DeploymentUpdate: { DeploymentUpdateRequest: mapDeploymentUpdateToDeploymentUpdateRequest },
  DeploymentUpdateV2: { DeploymentUpdateRequest: mapDeploymentUpdateV2ToDeploymentUpdateRequest },
  EmpiricalPolicy: { EmpiricalPolicyResponse: mapEmpiricalPolicyToEmpiricalPolicyResponse, EmpiricalPolicyRequest: mapEmpiricalPolicyToEmpiricalPolicyRequest },
  EmpiricalPolicyResponse: { EmpiricalPolicy: mapEmpiricalPolicyResponseToEmpiricalPolicy },
  Flow: { FlowResponse: mapFlowToFlowResponse },
  FlowFilter: { FlowFilterRequest: mapFlowFilter },
  FlowResponse: { Flow: mapFlowResponseToFlow },
  FlowRunFilter: { FlowRunFilterRequest: mapFlowRunFilter },
  FlowRunHistoryResponse: { RunHistory: mapFlowRunHistoryResponseToRunHistory },
  FlowRunInputKeyset: { FlowRunInputKeysetResponse: mapFlowRunInputKeysetResponseToFlowRunInputKeyset },
  FlowRunInputKeysetResponse: { FlowRunInputKeyset: mapFlowRunInputKeysetToFlowRunInputKeysetResponse },
  FlowRunResponse: { FlowRun: mapFlowRunResponseToFlowRun },
  FlowRunsFilter: { FlowRunsFilterRequest: mapFlowRunsFilter },
  FlowRunsHistoryFilter: { FlowRunsHistoryFilterRequest: mapFlowRunsHistoryFilter },
  FlowsFilter: { FlowsFilterRequest: mapFlowsFilter },
  FlowStatsFilter: {
    FlowRunsFilter: mapFlowStatsFilterToFlowRunsFilter,
    TaskRunsFilter: mapFlowStatsFilterToTaskRunsFilter,
  },
  Log: { LogResponse: mapLogToLogResponse },
  LogResponse: { Log: mapLogResponseToLog },
  LogsFilter: { LogsFilterRequest: mapLogsFilter },
  NotificationCreate: { NotificationCreateRequest: mapNotificationCreateToNotificationCreateRequest },
  NotificationResponse: { Notification: mapNotificationResponseToNotification },
  NotificationsFilter: { NotificationsFilterRequest: mapNotificationsFilter },
  NotificationUpdate: { NotificationUpdateRequest: mapNotificationUpdateToNotificationUpdateRequest },
  number: { string: mapNumberToString },
  OrchestrationResultResponse: { OrchestrationResult: mapOrchestrationResultResponseToOrchestrationResult },
  PrefectWorkerCollectionResponse: { WorkerCollectionItem: mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray },
  RunGraphDataResponse: { RunGraphData: mapRunGraphDataResponse },
  RunGraphNodeResponse: { RunGraphNode: mapRunGraphNodeResponse },
  RunGraphArtifactResponse: { RunGraphArtifact: mapRunGraphArtifactResponse },
  RunGraphStateResponse: { RunGraphStateEvent: mapRunGraphStateResponse },
  RunHistory: { FlowRunHistoryResponse: mapRunHistoryToFlowRunHistoryResponse, DivergingBarChartItem: mapRunHistoryToDivergingBarChartItem },
  SavedSearchCreate: { SavedSearchCreateRequest: mapSavedSearchCreateToSavedSearchCreateRequest },
  SavedSearchesFilter: { SavedSearchesFilterRequest: mapSavedSearchesFilter },
  SavedSearchFilter: {
    FlowRunsFilter: mapSavedSearchFilterToFlowRunsFilter,
    LocationQuery: mapSavedSearchToLocationQuery,
  },
  SavedSearchResponse: { SavedSearch: mapSavedSearchResponseToSavedSearch },
  Schedule: { ScheduleResponse: mapScheduleToScheduleResponse, ScheduleRequest: mapScheduleToScheduleRequest },
  ScheduleResponse: { Schedule: mapScheduleResponseToSchedule },
  SchemaDefinitionsResponse: { SchemaDefinitions: mapSchemaDefinitionsResponseToSchemaDefinitions },
  SchemaPropertiesResponse: { SchemaProperties: mapSchemaPropertiesResponseToSchemaProperties },
  SchemaPropertyResponse: { SchemaProperty: mapSchemaPropertyResponseToSchemaProperty },
  SchemaResponse: { Schema: mapSchemaResponseToSchema },
  SchemaValues: { SchemaValuesRequest: mapSchemaValuesToSchemaValuesRequest },
  SchemaValuesResponse: { SchemaValues: mapSchemaValuesResponseToSchemaValues },
  ServerDeploymentStatus: { DeploymentStatus: mapServerDeploymentStatusToDeploymentStatus },
  ServerStateType: { StateType: mapServerStateTypeToStateType },
  ServerWorkPoolStatus: { WorkPoolStatus: mapServerWorkPoolStatusToWorkPoolStatus },
  ServerWorkPoolWorkerStatus: { WorkPoolWorkerStatus: mapServerWorkPoolWorkerStatusToWorkPoolWorkerStatus },
  State: { StateResponse: mapStateToStateResponse },
  StateCreate: { StateRequest: mapStateCreateToStateRequest },
  StateDetails: { StateDetailsResponse: mapStateDetailsToStateDetailsResponse, StateDetailsRequest: mapStateDetailsToStateDetailsRequest },
  StateDetailsCreate: { StateDetailsRequest: mapStateDetailsCreateToStateDetailsRequest },
  StateDetailsResponse: { StateDetails: mapStateDetailsResponseToStateDetails },
  StateFilter: { StateFilterRequest: mapStateFilter },
  StateHistory: { StateHistoryResponse: mapStateHistoryToStateHistoryResponse },
  StateHistoryResponse: { StateHistory: mapStateHistoryResponseToStateHistory },
  StateResponse: { State: mapStateResponseToState },
  StateType: { ServerStateType: mapStateTypeToServerStateType },
  StateUpdate: { StateUpdateRequest: mapStateUpdateToStateUpdateRequest },
  string: { Date: mapStringToDate, number: mapStringToNumber },
  TagFilter: { TagFilterRequest: mapTagFilter },
  TaskInput: { TaskInputResponse: mapTaskInputToTaskInputResponse },
  TaskInputResponse: { TaskInput: mapTaskInputResponseToTaskInput },
  TaskRun: { TaskRunResponse: mapTaskRunToTaskRunResponse },
  TaskRunFilter: { TaskRunFilterRequest: mapTaskRunFilter },
  TaskRunResponse: { TaskRun: mapTaskRunResponseToTaskRun },
  TaskRunsFilter: {
    TaskRunsFilterRequest: mapTaskRunsFilter,
    TaskRunsHistoryFilter: mapTaskRunsFilterToTaskRunsHistoryFilter,
  },
  TaskRunsHistoryFilter: { TaskRunsHistoryFilterRequest: mapTaskRunsHistoryFilter },
  UiFlowRunHistory: { ScatterPlotItem: mapUiFlowRunHistoryToScatterPlotItem },
  UiFlowRunHistoryResponse: { UiFlowRunHistory: mapUiFlowRunHistoryResponseToUiFlowRunHistory },
  UiTaskRunCountsByStateResponse: { UiTaskRunCountsByState: mapUiTaskRunCountsByStateResponseToUiTaskRunCountsByState },
  VariableCreate: { VariableCreateRequest: mapVariableCreateToVariableCreateRequest },
  VariableEdit: { VariableEditRequest: mapVariableEditToVariableEditRequest },
  VariableFilter: { VariableFilterRequest: mapVariableFilter },
  VariablesFilter: { VariablesFilterRequest: mapVariablesFilter },
  VariableResponse: { Variable: mapVariableResponseToVariable },
  WorkerScheduledFlowRunResponse: { WorkerScheduledFlowRun: mapWorkerScheduledFlowRunResponseToWorkerScheduledFlowRun },
  WorkerScheduledFlowRuns: { WorkerScheduledFlowRunsRequest: mapWorkerScheduledFlowRunsToWorkerScheduledFlowRunsRequest },
  WorkerSchemaProperty: { WorkerSchemaPropertyRequest: mapWorkerSchemaValuesToWorkerSchemaValuesRequest },
  WorkPool: { WorkPoolResponse: mapWorkPoolToWorkPoolResponse },
  WorkPoolCreate: { WorkPoolCreateRequest: mapWorkPoolCreateToWorkPoolCreateRequest },
  WorkPoolEdit: { WorkPoolEditRequest: mapWorkPoolEditToWorkPoolEditRequest },
  WorkPoolFilter: { WorkPoolFilterRequest: mapWorkPoolFilter },
  WorkPoolQueue: { WorkPoolQueueResponse: mapWorkPoolQueueToWorkPoolQueueResponse },
  WorkPoolQueueCreate: { WorkPoolQueueCreateRequest: mapWorkPoolQueueCreateToWorkPoolQueueCreateRequest },
  WorkPoolQueueEdit: { WorkPoolQueueEditRequest: mapWorkPoolQueueEditToWorkPoolQueueEditRequest },
  WorkPoolQueueFilter: { WorkPoolQueueFilterRequest: mapWorkPoolQueueFilter },
  WorkPoolQueueResponse: { WorkPoolQueue: mapWorkPoolQueueResponseToWorkPoolQueue },
  WorkPoolQueuesFilter: { WorkPoolQueuesFilterRequest: mapWorkPoolQueuesFilter },
  WorkPoolResponse: { WorkPool: mapWorkPoolResponseToWorkPool },
  WorkPoolsFilter: { WorkPoolsFilterRequest: mapWorkPoolsFilter },
  WorkPoolStatus: { ServerWorkPoolStatus: mapWorkPoolStatusToServerWorkPoolStatus },
  WorkPoolWorkerResponse: { WorkPoolWorker: mapWorkPoolWorkerResponseToWorkPoolWorker },
  WorkPoolWorkersFilter: { WorkPoolWorkersFilterRequest: mapWorkPoolWorkersFilter },
  WorkPoolWorkerStatus: { ServerWorkPoolWorkerStatus: mapWorkPoolWorkerStatusToServerWorkPoolWorkerStatus },
  WorkQueue: { WorkQueueResponse: mapWorkQueueToWorkQueueResponse },
  WorkQueueCreate: { WorkQueueCreateRequest: mapWorkQueueCreateToWorkQueueCreateRequest },
  WorkQueueEdit: { WorkQueueEditRequest: mapWorkQueueEditToWorkQueueEditRequest },
  WorkQueueFilter: { WorkQueueFilterResponse: mapWorkQueueFilterToWorkQueueFilterResponse },
  WorkQueueFilterResponse: { WorkQueueFilter: mapWorkQueueFilterResponseToWorkQueueFilter },
  WorkQueueHealthPolicyResponse: { WorkQueueHealthPolicy: mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy },
  WorkQueueResponse: { WorkQueue: mapWorkQueueResponseToWorkQueue },
  WorkQueuesFilter: { WorkQueuesFilterRequest: mapWorkQueuesFilter },
  WorkQueueStatusResponse: { WorkQueueStatus: mapWorkQueueStatusResponseToWorkQueueStatus },
  WorkspaceDashboardFilter: {
    TaskRunsFilter: mapWorkspaceDashboardFilterToTaskRunsFilter,
    TaskRunsHistoryFilter: mapWorkspaceDashboardFilterToTaskRunsHistoryFilter,
    FlowRunsFilter: mapWorkspaceDashboardFilterToFlowRunsFilter,
    WorkPoolWorkersFilter: mapWorkspaceDashboardFilterToWorkPoolWorkersFilter,
  },
  TaskRunHistoryStateResponse: { TaskRunHistoryState: mapTaskRunHistoryStateResponseToTaskRunHistoryState },
  TaskRunHistoryResponse: { TaskRunHistory: mapTaskRunHistoryResponseToTaskRunHistory },
  AutomationTrigger: {
    DeploymentStatusTrigger: mapAutomationTriggerToDeploymentStatusTrigger,
    AutomationTriggerRequest: mapAutomationTriggerToAutomationTriggerRequest,
    FlowRunStateTrigger: mapAutomationTriggerToFlowRunStateTrigger,
    WorkPoolStatusTrigger: mapAutomationTriggerToWorkPoolStatusTrigger,
    WorkQueueStatusTrigger: mapAutomationTriggerToWorkQueueStatusTrigger,
  },
  DeploymentStatusTrigger: { AutomationTrigger: mapDeploymentStatusTriggerToAutomationTrigger },
  AutomationTriggerResponse: { AutomationTrigger: mapAutomationTriggerResponseToAutomationTrigger },
  FlowRunStateTrigger: { AutomationTrigger: mapFlowRunStateTriggerToAutomationTrigger },
  WorkPoolStatusTrigger: { AutomationTrigger: mapWorkPoolStatusTriggerToAutomationTrigger },
  WorkQueueStatusTrigger: { AutomationTrigger: mapWorkQueueStatusTriggerToAutomationTrigger },
  WorkspaceEventResponse: { WorkspaceEvent: mapWorkspaceEventResponseToWorkspaceEvent },
  WorkspaceEventsResponse: { WorkspaceEvents: mapWorkspaceEventsResponseToWorkspaceEvents },
  WorkspaceEventsCountResponse: {
    WorkspaceEventsCount: mapWorkspaceEventsCountResponseToWorkspaceEventsCount,
    HistogramDataPoint: mapWorkspaceEventsCountResponseToHistogramDataPoint,
  },
  WorkspaceEventsFilter: { WorkspaceEventsFilterRequest: mapWorkspaceEventsFilterToWorkspaceEventsFilterRequest },
  WorkspaceEventsHistory: { WorkspaceEventsHistoryRequest: mapEventsHistoryToEventsHistoryRequest },
}
