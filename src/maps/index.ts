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
import { mapEmpiricalPolicyToIEmpiricalPolicyResponse, mapIEmpiricalPolicyResponseToEmpiricalPolicy } from '@/maps/empiricalPolicy'
import { mapFlowToIFlowResponse, mapIFlowResponseToFlow } from '@/maps/flow'
import { mapFlowRunToIFlowRunResponse, mapIFlowRunResponseToFlowRun } from '@/maps/flowRun'
import { mapGraphNodeToIFlowRunGraphResponse, mapIFlowRunGraphResponseToGraphNode } from '@/maps/flowRunGraph'
import { mapRunHistoryToIFlowRunHistoryResponse, mapIFlowRunHistoryResponseToRunHistory } from '@/maps/flowRunHistory'
import { mapLogToILogResponse, mapILogResponseToLog } from '@/maps/logs'
import { mapNotificationResponseToNotification } from '@/maps/notification'
import { mapNumberToString, mapStringToNumber } from '@/maps/number'
import { mapUiFlowRunHistoryToScatterPlotItem } from '@/maps/scatterPlotItem'
import { mapScheduleToIScheduleResponse, mapIScheduleResponseToSchedule } from '@/maps/schedule'
import { mapIStateResponseToIState, mapIStateToIStateResponse } from '@/maps/state'
import { mapIStateDetailsResponseToIStateDetails, mapIStateDetailsToIStateDetailsResponse } from '@/maps/stateDetails'
import { mapStateHistoryToIStateHistoryResponse, mapIStateHistoryResponseToStateHistory } from '@/maps/stateHistory'
import { mapServerStateTypeToStateType, mapStateTypeToServerStateType } from '@/maps/stateType'
import { mapTaskInputToITaskInputResponse, mapITaskInputResponseToTaskInput } from '@/maps/taskInput'
import { mapTaskRunToITaskRunResponse, mapITaskRunResponseToTaskRun } from '@/maps/taskRun'
import { mapUiFlowRunHistoryResponseToUiFlowRunHistory } from '@/maps/uiFlowRunHistory'
import { mapWorkQueueToIWorkQueueResponse, mapIWorkQueueResponseToWorkQueue } from '@/maps/workQueue'
import { mapWorkQueueFilterToIWorkQueueFilterResponse, mapIWorkQueueFilterResponseToWorkQueueFilter } from '@/maps/workQueueFilter'

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
  EmpiricalPolicy: { IEmpiricalPolicyResponse: mapEmpiricalPolicyToIEmpiricalPolicyResponse },
  Flow: { IFlowResponse: mapFlowToIFlowResponse },
  FlowRun: { IFlowRunResponse: mapFlowRunToIFlowRunResponse },
  GraphNode: { IFlowRunGraphResponse: mapGraphNodeToIFlowRunGraphResponse },
  DeploymentResponse: { Deployment: mapDeploymentResponseToDeployment },
  IEmpiricalPolicyResponse: { EmpiricalPolicy: mapIEmpiricalPolicyResponseToEmpiricalPolicy },
  IFlowResponse: { Flow: mapIFlowResponseToFlow },
  IFlowRunGraphResponse: { GraphNode: mapIFlowRunGraphResponseToGraphNode },
  IFlowRunHistoryResponse: { RunHistory: mapIFlowRunHistoryResponseToRunHistory },
  IFlowRunResponse: { FlowRun: mapIFlowRunResponseToFlowRun },
  ILogResponse: { Log: mapILogResponseToLog },
  NotificationResponse: { Notification: mapNotificationResponseToNotification },
  NotificationCreate: { NotificationCreateRequest: mapNotificationCreateToNotificationCreateRequest },
  NotificationUpdate: { NotificationUpdateRequest: mapNotificationUpdateToNotificationUpdateRequest },
  IScheduleResponse: { Schedule: mapIScheduleResponseToSchedule },
  IState: { IStateResponse: mapIStateToIStateResponse },
  IStateDetails: { IStateDetailsResponse: mapIStateDetailsToIStateDetailsResponse },
  IStateDetailsResponse: { IStateDetails: mapIStateDetailsResponseToIStateDetails },
  IStateHistoryResponse: { StateHistory: mapIStateHistoryResponseToStateHistory },
  IStateResponse: { IState: mapIStateResponseToIState },
  ITaskInputResponse: { TaskInput: mapITaskInputResponseToTaskInput },
  ITaskRunResponse: { TaskRun: mapITaskRunResponseToTaskRun },
  IWorkQueueFilterResponse: { WorkQueueFilter: mapIWorkQueueFilterResponseToWorkQueueFilter },
  IWorkQueueResponse: { WorkQueue: mapIWorkQueueResponseToWorkQueue },
  Log: { ILogResponse: mapLogToILogResponse },
  number: { string: mapNumberToString },
  RunHistory: { IFlowRunHistoryResponse: mapRunHistoryToIFlowRunHistoryResponse, DivergingBarChartItem: mapRunHistoryToDivergingBarChartItem },
  Schedule: { IScheduleResponse: mapScheduleToIScheduleResponse },
  ServerStateType: { StateType: mapServerStateTypeToStateType },
  StateHistory: { IStateHistoryResponse: mapStateHistoryToIStateHistoryResponse },
  StateType: { ServerStateType: mapStateTypeToServerStateType },
  string: { Date: mapStringToDate, number: mapStringToNumber },
  TaskInput: { ITaskInputResponse: mapTaskInputToITaskInputResponse },
  TaskRun: { ITaskRunResponse: mapTaskRunToITaskRunResponse },
  UiFlowRunHistory: { ScatterPlotItem: mapUiFlowRunHistoryToScatterPlotItem },
  UiFlowRunHistoryResponse: { UiFlowRunHistory: mapUiFlowRunHistoryResponseToUiFlowRunHistory },
  WorkQueue: { IWorkQueueResponse: mapWorkQueueToIWorkQueueResponse },
  WorkQueueFilter: { IWorkQueueFilterResponse: mapWorkQueueFilterToIWorkQueueFilterResponse },
}