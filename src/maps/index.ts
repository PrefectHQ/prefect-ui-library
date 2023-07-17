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
import { mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy } from '@/maps/createdOrUpdatedBy'
import {
  mapWorkspaceDashboardFilterToTaskRunsFilter,
  mapWorkspaceDashboardFilterToTaskRunsHistoryFilter,
  mapWorkspaceDashboardFilterToWorkPoolWorkersFilter,
  mapWorkspaceDashboardFilterToFlowRunsFilter
} from '@/maps/dashboard'
import { mapStringToDate, mapDateToString } from '@/maps/date'
import { mapDeploymentResponseToDeployment, mapDeploymentUpdateToDeploymentUpdateRequest, mapDeploymentFlowRunCreateToDeploymentFlowRunRequest } from '@/maps/deployment'
import { mapRunHistoryToDivergingBarChartItem } from '@/maps/divergingBarChartItem'
import { mapEmpiricalPolicyToEmpiricalPolicyResponse, mapEmpiricalPolicyResponseToEmpiricalPolicy, mapEmpiricalPolicyToEmpiricalPolicyRequest } from '@/maps/empiricalPolicy'
import { mapFlowFilter, mapDeploymentFilter, mapFlowRunFilter, mapStateFilter, mapFlowsFilter, mapDeploymentsFilter, mapFlowRunsFilter, mapTagFilter, mapTaskRunFilter, mapTaskRunsFilter, mapBlockDocumentFilter, mapBlockSchemaFilter, mapBlockTypeFilter, mapBlockDocumentsFilter, mapBlockSchemasFilter, mapBlockTypesFilter, mapWorkPoolsFilter, mapWorkPoolFilter, mapWorkPoolQueueFilter, mapFlowRunsHistoryFilter, mapLogsFilter, mapNotificationsFilter, mapSavedSearchesFilter, mapWorkQueuesFilter, mapWorkPoolWorkersFilter, mapWorkPoolQueuesFilter, mapArtifactFilter, mapArtifactsFilter, mapVariablesFilter, mapVariableFilter, mapTaskRunsHistoryFilter } from '@/maps/filters'
import { mapFlowToFlowResponse, mapFlowResponseToFlow } from '@/maps/flow'
import { mapFlowRunResponseToFlowRun } from '@/maps/flowRun'
import { mapSavedSearchFilterToFlowRunFilters } from '@/maps/flowRunFilter'
import { mapGraphNodeToFlowRunGraphResponse, mapFlowRunGraphResponseToGraphNode } from '@/maps/flowRunGraph'
import { mapRunHistoryToFlowRunHistoryResponse, mapFlowRunHistoryResponseToRunHistory } from '@/maps/flowRunHistory'
import { mapFlowRunGraphResponseToTimelineNode } from '@/maps/flowRunTimeline'
import { mapFlowStatsFilterToFlowRunsFilter, mapFlowStatsFilterToTaskRunsFilter } from '@/maps/flowStatsFilter'
import { mapLogToLogResponse, mapLogResponseToLog } from '@/maps/logs'
import { mapNotificationResponseToNotification } from '@/maps/notification'
import { mapNotificationCreateToNotificationCreateRequest } from '@/maps/notificationCreate'
import { mapNotificationUpdateToNotificationUpdateRequest } from '@/maps/notificationUpdate'
import { mapNumberToString, mapStringToNumber } from '@/maps/number'
import { mapSavedSearchResponseToSavedSearch } from '@/maps/savedSearch'
import { mapSavedSearchCreateToSavedSearchCreateRequest } from '@/maps/savedSearchCreate'
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
import { mapVariableResponseToVariable, mapVariableEditToVariableEditRequest, mapVariableCreateToVariableCreateRequest } from '@/maps/variable'
import { mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray, mapWorkerSchemaValuesToWorkerSchemaValuesRequest } from '@/maps/workerCollection'
import { mapWorkerScheduledFlowRunResponseToWorkerScheduledFlowRun, mapWorkerScheduledFlowRunsToWorkerScheduledFlowRunsRequest } from '@/maps/workerScheduledFlowRun'
import { mapWorkPoolCreateToWorkPoolCreateRequest, mapWorkPoolEditToWorkPoolEditRequest, mapWorkPoolResponseToWorkPool, mapWorkPoolToWorkPoolResponse } from '@/maps/workPool'
import { mapWorkPoolQueueCreateToWorkPoolQueueCreateRequest, mapWorkPoolQueueEditToWorkPoolQueueEditRequest, mapWorkPoolQueueResponseToWorkPoolQueue, mapWorkPoolQueueToWorkPoolQueueResponse } from '@/maps/workPoolQueue'
import { mapWorkPoolWorkerResponseToWorkPoolWorker } from '@/maps/workPoolWorker'
import { mapWorkQueueToWorkQueueResponse, mapWorkQueueResponseToWorkQueue, mapWorkQueueCreateToWorkQueueCreateRequest, mapWorkQueueEditToWorkQueueEditRequest } from '@/maps/workQueue'
import { mapWorkQueueFilterToWorkQueueFilterResponse, mapWorkQueueFilterResponseToWorkQueueFilter } from '@/maps/workQueueFilter'
import { mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy } from '@/maps/workQueueHealthPolicy'
import { mapWorkQueueStatusResponseToWorkQueueStatus } from '@/maps/workQueueStatus'

export const maps = {
  ArtifactFilter: { ArtifactFilterRequest: mapArtifactFilter },
  ArtifactResponse: { Artifact: mapArtifactResponseToArtifact },
  ArtifactCollectionResponse: { ArtifactCollection: mapArtifactCollectionResponseToArtifactCollection },
  ArtifactsFilter: { ArtifactsFilterRequest: mapArtifactsFilter },
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
  CreatedOrUpdatedByResponse: { CreatedOrUpdatedBy: mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy },
  Date: { string: mapDateToString },
  DeploymentFilter: { DeploymentFilterRequest: mapDeploymentFilter },
  DeploymentFlowRunCreate: { DeploymentFlowRunRequest: mapDeploymentFlowRunCreateToDeploymentFlowRunRequest },
  DeploymentResponse: { Deployment: mapDeploymentResponseToDeployment },
  DeploymentsFilter: { DeploymentsFilterRequest: mapDeploymentsFilter },
  DeploymentUpdate: { DeploymentUpdateRequest: mapDeploymentUpdateToDeploymentUpdateRequest },
  EmpiricalPolicy: { EmpiricalPolicyResponse: mapEmpiricalPolicyToEmpiricalPolicyResponse, EmpiricalPolicyRequest: mapEmpiricalPolicyToEmpiricalPolicyRequest },
  EmpiricalPolicyResponse: { EmpiricalPolicy: mapEmpiricalPolicyResponseToEmpiricalPolicy },
  Flow: { FlowResponse: mapFlowToFlowResponse },
  FlowFilter: { FlowFilterRequest: mapFlowFilter },
  FlowResponse: { Flow: mapFlowResponseToFlow },
  FlowRunFilter: { FlowRunFilterRequest: mapFlowRunFilter },
  FlowRunGraphResponse: { GraphNode: mapFlowRunGraphResponseToGraphNode, TimelineNode: mapFlowRunGraphResponseToTimelineNode },
  FlowRunHistoryResponse: { RunHistory: mapFlowRunHistoryResponseToRunHistory },
  FlowRunResponse: { FlowRun: mapFlowRunResponseToFlowRun },
  FlowRunsFilter: { FlowRunsFilterRequest: mapFlowRunsFilter },
  FlowRunsHistoryFilter: { FlowRunsHistoryFilterRequest: mapFlowRunsHistoryFilter },
  FlowsFilter: { FlowsFilterRequest: mapFlowsFilter },
  FlowStatsFilter: {
    FlowRunsFilter: mapFlowStatsFilterToFlowRunsFilter,
    TaskRunsFilter: mapFlowStatsFilterToTaskRunsFilter,
  },
  GraphNode: { FlowRunGraphResponse: mapGraphNodeToFlowRunGraphResponse },
  Log: { LogResponse: mapLogToLogResponse },
  LogResponse: { Log: mapLogResponseToLog },
  LogsFilter: { LogsFilterRequest: mapLogsFilter },
  NotificationCreate: { NotificationCreateRequest: mapNotificationCreateToNotificationCreateRequest },
  NotificationResponse: { Notification: mapNotificationResponseToNotification },
  NotificationsFilter: { NotificationsFilterRequest: mapNotificationsFilter },
  NotificationUpdate: { NotificationUpdateRequest: mapNotificationUpdateToNotificationUpdateRequest },
  number: { string: mapNumberToString },
  PrefectWorkerCollectionResponse: { WorkerCollectionItem: mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray },
  RunHistory: { FlowRunHistoryResponse: mapRunHistoryToFlowRunHistoryResponse, DivergingBarChartItem: mapRunHistoryToDivergingBarChartItem },
  SavedSearchCreate: { SavedSearchCreateRequest: mapSavedSearchCreateToSavedSearchCreateRequest },
  SavedSearchesFilter: { SavedSearchesFilterRequest: mapSavedSearchesFilter },
  SavedSearchFilter: { FlowRunFilters: mapSavedSearchFilterToFlowRunFilters },
  SavedSearchResponse: { SavedSearch: mapSavedSearchResponseToSavedSearch },
  Schedule: { ScheduleResponse: mapScheduleToScheduleResponse, ScheduleRequest: mapScheduleToScheduleRequest },
  ScheduleResponse: { Schedule: mapScheduleResponseToSchedule },
  SchemaDefinitionsResponse: { SchemaDefinitions: mapSchemaDefinitionsResponseToSchemaDefinitions },
  SchemaPropertiesResponse: { SchemaProperties: mapSchemaPropertiesResponseToSchemaProperties },
  SchemaPropertyResponse: { SchemaProperty: mapSchemaPropertyResponseToSchemaProperty },
  SchemaResponse: { Schema: mapSchemaResponseToSchema },
  SchemaValues: { SchemaValuesRequest: mapSchemaValuesToSchemaValuesRequest },
  SchemaValuesResponse: { SchemaValues: mapSchemaValuesResponseToSchemaValues },
  ServerStateType: { StateType: mapServerStateTypeToStateType },
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
  WorkPoolWorkerResponse: { WorkPoolWorker: mapWorkPoolWorkerResponseToWorkPoolWorker },
  WorkPoolWorkersFilter: { WorkPoolWorkersFilterRequest: mapWorkPoolWorkersFilter },
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
}
