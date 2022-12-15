import { mapBlockDocumentResponseToBlockDocument, mapBlockDocumentToSelectOption } from '@/maps/blockDocument'
import { mapBlockDocumentCreateToBlockDocumentCreateRequest } from '@/maps/blockDocumentCreate'
import { mapBlockDocumentFilterToBlockDocumentFilterRequest } from '@/maps/blockDocumentFilter'
import { mapBlockDocumentResponseReferencesToBlockDocumentReferences } from '@/maps/blockDocumentReferences'
import { mapBlockDocumentUpdateToBlockDocumentUpdateRequest } from '@/maps/blockDocumentUpdate'
import { mapBlockSchemaResponseToBlockSchema } from '@/maps/blockSchema'
import { mapBlockSchemaFilterToBlockSchemaFilterRequest } from '@/maps/blockSchemaFilter'
import { mapBlockSchemaReferencesResponseToBlockSchemaReferences } from '@/maps/blockSchemaReferences'
import { mapBlockTypeResponseToBlockType } from '@/maps/blockType'
import { mapBlockTypeFilterToBlockTypeFilterRequest } from '@/maps/blockTypeFilter'
import { mapConcurrencyLimitResponseToConcurrencyLimit } from '@/maps/concurrencyLimit'
import { mapConcurrencyLimitCreateToConcurrencyLimitCreateRequest } from '@/maps/concurrencyLimitCreate'
import { mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy } from '@/maps/createdOrUpdatedBy'
import { mapStringToDate, mapDateToString } from '@/maps/date'
import { mapDeploymentResponseToDeployment, mapDeploymentUpdateToDeploymentUpdateRequest, mapDeploymentFlowRunCreateToDeploymentFlowRunRequest } from '@/maps/deployment'
import { mapRunHistoryToDivergingBarChartItem } from '@/maps/divergingBarChartItem'
import { mapEmpiricalPolicyToEmpiricalPolicyResponse, mapEmpiricalPolicyResponseToEmpiricalPolicy } from '@/maps/empiricalPolicy'
import { mapFlowToFlowResponse, mapFlowResponseToFlow } from '@/maps/flow'
import { mapFlowRunResponseToFlowRun } from '@/maps/flowRun'
import { mapSavedSearchFilterToFlowRunFilters } from '@/maps/flowRunFilter'
import { mapGraphNodeToFlowRunGraphResponse, mapFlowRunGraphResponseToGraphNode } from '@/maps/flowRunGraph'
import { mapRunHistoryToFlowRunHistoryResponse, mapFlowRunHistoryResponseToRunHistory } from '@/maps/flowRunHistory'
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
import { mapUiFlowRunHistoryResponseToUiFlowRunHistory } from '@/maps/uiFlowRunHistory'
import { mapWorkQueueToWorkQueueResponse, mapWorkQueueResponseToWorkQueue, mapWorkQueueCreateToWorkQueueCreateRequest, mapWorkQueueEditToWorkQueueEditRequest } from '@/maps/workQueue'
import { mapWorkQueueFilterToWorkQueueFilterResponse, mapWorkQueueFilterResponseToWorkQueueFilter } from '@/maps/workQueueFilter'
import { mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy } from '@/maps/workQueueHealthPolicy'
import { mapWorkQueueStatusResponseToWorkQueueStatus } from '@/maps/workQueueStatus'

export const maps = {
  BlockDocument: { SelectOption: mapBlockDocumentToSelectOption },
  BlockDocumentCreate: { BlockDocumentCreateRequest: mapBlockDocumentCreateToBlockDocumentCreateRequest },
  BlockDocumentFilter: { BlockDocumentFilterRequest: mapBlockDocumentFilterToBlockDocumentFilterRequest },
  BlockDocumentReferencesResponse: { BlockDocumentReferences: mapBlockDocumentResponseReferencesToBlockDocumentReferences },
  BlockDocumentResponse: { BlockDocument: mapBlockDocumentResponseToBlockDocument },
  BlockDocumentUpdate: { BlockDocumentUpdateRequest: mapBlockDocumentUpdateToBlockDocumentUpdateRequest },
  BlockSchemaFilter: { BlockSchemaFilterRequest: mapBlockSchemaFilterToBlockSchemaFilterRequest },
  BlockSchemaReferencesResponse: { BlockSchemaReferences: mapBlockSchemaReferencesResponseToBlockSchemaReferences },
  BlockSchemaResponse: { BlockSchema: mapBlockSchemaResponseToBlockSchema },
  BlockTypeFilter: { BlockTypeFilterRequest: mapBlockTypeFilterToBlockTypeFilterRequest },
  BlockTypeResponse: { BlockType: mapBlockTypeResponseToBlockType },
  ConcurrencyLimitResponse: { ConcurrencyLimit: mapConcurrencyLimitResponseToConcurrencyLimit },
  ConcurrencyLimitCreate: { ConcurrencyLimitCreateRequest: mapConcurrencyLimitCreateToConcurrencyLimitCreateRequest },
  CreatedOrUpdatedByResponse: { CreatedOrUpdatedBy: mapCreatedOrUpdatedByResponseToCreatedOrUpdatedBy },
  Date: { string: mapDateToString },
  DeploymentFlowRunCreate: { DeploymentFlowRunRequest: mapDeploymentFlowRunCreateToDeploymentFlowRunRequest },
  DeploymentResponse: { Deployment: mapDeploymentResponseToDeployment },
  DeploymentUpdate: { DeploymentUpdateRequest: mapDeploymentUpdateToDeploymentUpdateRequest },
  EmpiricalPolicy: { EmpiricalPolicyResponse: mapEmpiricalPolicyToEmpiricalPolicyResponse },
  EmpiricalPolicyResponse: { EmpiricalPolicy: mapEmpiricalPolicyResponseToEmpiricalPolicy },
  Flow: { FlowResponse: mapFlowToFlowResponse },
  FlowResponse: { Flow: mapFlowResponseToFlow },
  FlowRunGraphResponse: { GraphNode: mapFlowRunGraphResponseToGraphNode },
  FlowRunHistoryResponse: { RunHistory: mapFlowRunHistoryResponseToRunHistory },
  FlowRunResponse: { FlowRun: mapFlowRunResponseToFlowRun },
  GraphNode: { FlowRunGraphResponse: mapGraphNodeToFlowRunGraphResponse },
  Log: { LogResponse: mapLogToLogResponse },
  LogResponse: { Log: mapLogResponseToLog },
  NotificationCreate: { NotificationCreateRequest: mapNotificationCreateToNotificationCreateRequest },
  NotificationResponse: { Notification: mapNotificationResponseToNotification },
  NotificationUpdate: { NotificationUpdateRequest: mapNotificationUpdateToNotificationUpdateRequest },
  number: { string: mapNumberToString },
  RunHistory: { FlowRunHistoryResponse: mapRunHistoryToFlowRunHistoryResponse, DivergingBarChartItem: mapRunHistoryToDivergingBarChartItem },
  SavedSearchCreate: { SavedSearchCreateRequest: mapSavedSearchCreateToSavedSearchCreateRequest },
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
  StateHistory: { StateHistoryResponse: mapStateHistoryToStateHistoryResponse },
  StateHistoryResponse: { StateHistory: mapStateHistoryResponseToStateHistory },
  StateResponse: { State: mapStateResponseToState },
  StateType: { ServerStateType: mapStateTypeToServerStateType },
  StateUpdate: { StateUpdateRequest: mapStateUpdateToStateUpdateRequest },
  string: { Date: mapStringToDate, number: mapStringToNumber },
  TaskInput: { TaskInputResponse: mapTaskInputToTaskInputResponse },
  TaskInputResponse: { TaskInput: mapTaskInputResponseToTaskInput },
  TaskRun: { TaskRunResponse: mapTaskRunToTaskRunResponse },
  TaskRunResponse: { TaskRun: mapTaskRunResponseToTaskRun },
  UiFlowRunHistory: { ScatterPlotItem: mapUiFlowRunHistoryToScatterPlotItem },
  UiFlowRunHistoryResponse: { UiFlowRunHistory: mapUiFlowRunHistoryResponseToUiFlowRunHistory },
  WorkQueue: { WorkQueueResponse: mapWorkQueueToWorkQueueResponse },
  WorkQueueCreate: { WorkQueueCreateRequest: mapWorkQueueCreateToWorkQueueCreateRequest },
  WorkQueueEdit: { WorkQueueEditRequest: mapWorkQueueEditToWorkQueueEditRequest },
  WorkQueueFilter: { WorkQueueFilterResponse: mapWorkQueueFilterToWorkQueueFilterResponse },
  WorkQueueFilterResponse: { WorkQueueFilter: mapWorkQueueFilterResponseToWorkQueueFilter },
  WorkQueueHealthPolicyResponse: { WorkQueueHealthPolicy: mapWorkQueueHealthPolicyResponseToWorkQueueHealthPolicy },
  WorkQueueResponse: { WorkQueue: mapWorkQueueResponseToWorkQueue },
  WorkQueueStatusResponse: { WorkQueueStatus: mapWorkQueueStatusResponseToWorkQueueStatus },
}