import { mapBlockSchemaReferencesResponseToBlockSchemaReferences } from './blockSchemaReferences'
import { mapNotificationCreateToNotificationCreateRequest } from './notificationCreate'
import { mapNotificationUpdateToNotificationUpdateRequest } from './notificationUpdate'
import { mapBlockDocumentResponseToBlockDocument, mapBlockDocumentToSelectOption } from '@/maps/blockDocument'
import { mapBlockDocumentCreateToBlockDocumentCreateRequest, mapBlockDocumentDataToBlockDocumentRequestData } from '@/maps/blockDocumentCreate'
import { mapBlockDocumentResponseDataToBlockDocumentData } from '@/maps/blockDocumentData'
import { mapBlockDocumentFilterToBlockDocumentFilterRequest } from '@/maps/blockDocumentFilter'
import { mapBlockDocumentUpdateToBlockDocumentUpdateRequest } from '@/maps/blockDocumentUpdate'
import { mapBlockSchemaResponseToBlockSchema } from '@/maps/blockSchema'
import { mapBlockSchemaFieldsResponseToBlockSchemaFields } from '@/maps/blockSchemaFields'
import { mapBlockSchemaFilterToBlockSchemaFilterRequest } from '@/maps/blockSchemaFilter'
import { mapBlockTypeResponseToBlockType } from '@/maps/blockType'
import { mapBlockTypeFilterToBlockTypeFilterRequest } from '@/maps/blockTypeFilter'
import { mapStringToDate, mapDateToString } from '@/maps/date'
import { mapDeploymentToDeploymentResponse, mapDeploymentResponseToDeployment } from '@/maps/deployment'
import { mapRunHistoryToDivergingBarChartItem } from '@/maps/divergingBarChartItem'
import { mapEmpiricalPolicyToEmpiricalPolicyResponse, mapEmpiricalPolicyResponseToEmpiricalPolicy } from '@/maps/empiricalPolicy'
import { mapFlowToFlowResponse, mapFlowResponseToFlow } from '@/maps/flow'
import { mapFlowRunToFlowRunResponse, mapFlowRunResponseToFlowRun } from '@/maps/flowRun'
import { mapGraphNodeToFlowRunGraphResponse, mapFlowRunGraphResponseToGraphNode } from '@/maps/flowRunGraph'
import { mapRunHistoryToFlowRunHistoryResponse, mapFlowRunHistoryResponseToRunHistory } from '@/maps/flowRunHistory'
import { mapLogToLogResponse, mapLogResponseToLog } from '@/maps/logs'
import { mapNotificationResponseToNotification } from '@/maps/notification'
import { mapNumberToString, mapStringToNumber } from '@/maps/number'
import { mapUiFlowRunHistoryToScatterPlotItem } from '@/maps/scatterPlotItem'
import { mapScheduleToScheduleResponse, mapScheduleResponseToSchedule } from '@/maps/schedule'
import { mapStateResponseToState, mapStateToStateResponse } from '@/maps/state'
import { mapStateDetailsResponseToStateDetails, mapStateDetailsToStateDetailsResponse } from '@/maps/stateDetails'
import { mapStateHistoryToStateHistoryResponse, mapStateHistoryResponseToStateHistory } from '@/maps/stateHistory'
import { mapServerStateTypeToStateType, mapStateTypeToServerStateType } from '@/maps/stateType'
import { mapTaskInputToTaskInputResponse, mapTaskInputResponseToTaskInput } from '@/maps/taskInput'
import { mapTaskRunToTaskRunResponse, mapTaskRunResponseToTaskRun } from '@/maps/taskRun'
import { mapUiFlowRunHistoryResponseToUiFlowRunHistory } from '@/maps/uiFlowRunHistory'
import { mapWorkQueueToWorkQueueResponse, mapWorkQueueResponseToWorkQueue } from '@/maps/workQueue'
import { mapWorkQueueFilterToWorkQueueFilterResponse, mapWorkQueueFilterResponseToWorkQueueFilter } from '@/maps/workQueueFilter'

export const maps = {
  BlockDocument: { SelectOption: mapBlockDocumentToSelectOption },
  BlockDocumentCreate: { BlockDocumentCreateRequest: mapBlockDocumentCreateToBlockDocumentCreateRequest },
  BlockDocumentData: { BlockDocumentRequestData: mapBlockDocumentDataToBlockDocumentRequestData },
  BlockDocumentFilter: { BlockDocumentFilterRequest: mapBlockDocumentFilterToBlockDocumentFilterRequest },
  BlockDocumentResponse: { BlockDocument: mapBlockDocumentResponseToBlockDocument },
  BlockDocumentResponseDataWithReferences: { BlockDocumentData: mapBlockDocumentResponseDataToBlockDocumentData },
  BlockDocumentUpdate: { BlockDocumentUpdateRequest: mapBlockDocumentUpdateToBlockDocumentUpdateRequest },
  BlockSchemaFieldsResponse: { BlockSchemaFields: mapBlockSchemaFieldsResponseToBlockSchemaFields },
  BlockSchemaFilter: { BlockSchemaFilterRequest: mapBlockSchemaFilterToBlockSchemaFilterRequest },
  BlockSchemaReferencesResponse: { BlockSchemaReferences: mapBlockSchemaReferencesResponseToBlockSchemaReferences },
  BlockSchemaResponse: { BlockSchema: mapBlockSchemaResponseToBlockSchema },
  BlockTypeFilter: { BlockTypeFilterRequest: mapBlockTypeFilterToBlockTypeFilterRequest },
  BlockTypeResponse: { BlockType: mapBlockTypeResponseToBlockType },
  Date: { string: mapDateToString },
  Deployment: { DeploymentResponse: mapDeploymentToDeploymentResponse },
  EmpiricalPolicy: { EmpiricalPolicyResponse: mapEmpiricalPolicyToEmpiricalPolicyResponse },
  Flow: { FlowResponse: mapFlowToFlowResponse },
  FlowRun: { FlowRunResponse: mapFlowRunToFlowRunResponse },
  GraphNode: { FlowRunGraphResponse: mapGraphNodeToFlowRunGraphResponse },
  DeploymentResponse: { Deployment: mapDeploymentResponseToDeployment },
  EmpiricalPolicyResponse: { EmpiricalPolicy: mapEmpiricalPolicyResponseToEmpiricalPolicy },
  FlowResponse: { Flow: mapFlowResponseToFlow },
  FlowRunGraphResponse: { GraphNode: mapFlowRunGraphResponseToGraphNode },
  FlowRunHistoryResponse: { RunHistory: mapFlowRunHistoryResponseToRunHistory },
  FlowRunResponse: { FlowRun: mapFlowRunResponseToFlowRun },
  LogResponse: { Log: mapLogResponseToLog },
  NotificationResponse: { Notification: mapNotificationResponseToNotification },
  NotificationCreate: { NotificationCreateRequest: mapNotificationCreateToNotificationCreateRequest },
  NotificationUpdate: { NotificationUpdateRequest: mapNotificationUpdateToNotificationUpdateRequest },
  ScheduleResponse: { Schedule: mapScheduleResponseToSchedule },
  State: { StateResponse: mapStateToStateResponse },
  StateDetails: { StateDetailsResponse: mapStateDetailsToStateDetailsResponse },
  StateDetailsResponse: { StateDetails: mapStateDetailsResponseToStateDetails },
  StateHistoryResponse: { StateHistory: mapStateHistoryResponseToStateHistory },
  StateResponse: { State: mapStateResponseToState },
  TaskInputResponse: { TaskInput: mapTaskInputResponseToTaskInput },
  TaskRunResponse: { TaskRun: mapTaskRunResponseToTaskRun },
  WorkQueueFilterResponse: { WorkQueueFilter: mapWorkQueueFilterResponseToWorkQueueFilter },
  WorkQueueResponse: { WorkQueue: mapWorkQueueResponseToWorkQueue },
  Log: { LogResponse: mapLogToLogResponse },
  number: { string: mapNumberToString },
  RunHistory: { FlowRunHistoryResponse: mapRunHistoryToFlowRunHistoryResponse, DivergingBarChartItem: mapRunHistoryToDivergingBarChartItem },
  Schedule: { ScheduleResponse: mapScheduleToScheduleResponse },
  ServerStateType: { StateType: mapServerStateTypeToStateType },
  StateHistory: { StateHistoryResponse: mapStateHistoryToStateHistoryResponse },
  StateType: { ServerStateType: mapStateTypeToServerStateType },
  string: { Date: mapStringToDate, number: mapStringToNumber },
  TaskInput: { TaskInputResponse: mapTaskInputToTaskInputResponse },
  TaskRun: { TaskRunResponse: mapTaskRunToTaskRunResponse },
  UiFlowRunHistory: { ScatterPlotItem: mapUiFlowRunHistoryToScatterPlotItem },
  UiFlowRunHistoryResponse: { UiFlowRunHistory: mapUiFlowRunHistoryResponseToUiFlowRunHistory },
  WorkQueue: { WorkQueueResponse: mapWorkQueueToWorkQueueResponse },
  WorkQueueFilter: { WorkQueueFilterResponse: mapWorkQueueFilterToWorkQueueFilterResponse },
}