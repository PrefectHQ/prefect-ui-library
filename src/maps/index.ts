import { mapBlockDocumentResponseToBlockDocument } from '@/maps/blockDocument'
import { mapBlockDocumentCreateToBlockCreateRequest } from '@/maps/blockDocumentCreate'
import { mapBlockDocumentFilterToBlockDocumentFilterRequest } from '@/maps/blockDocumentFilter'
import { mapBlockDocumentUpdateToBlockDocumentUpdateRequest } from '@/maps/blockDocumentUpdate'
import { mapBlockSchemaResponseToBlockSchema } from '@/maps/blockSchema'
import { mapBlockSchemaFieldsResponseToBlockSchemaFields } from '@/maps/blockSchemaFields'
import { mapBlockSchemaFilterToBlockSchemaFilterRequest } from '@/maps/blockSchemaFilter'
import { mapBlockTypeResponseToBlockType } from '@/maps/blockType'
import { mapBlockTypeFilterToBlockTypeRequest } from '@/maps/blockTypeFilter'
import { mapCreateFlowRunToCreateFlowRunRequest } from '@/maps/createFlowRun'
import { mapStringToDate, mapDateToString } from '@/maps/date'
import { mapDeploymentToIDeploymentResponse, mapIDeploymentResponseToDeployment } from '@/maps/deployment'
import { mapRunHistoryToDivergingBarChartItem } from '@/maps/divergingBarChartItem'
import { mapEmpiricalPolicyToIEmpiricalPolicyResponse, mapIEmpiricalPolicyResponseToEmpiricalPolicy } from '@/maps/empiricalPolicy'
import { mapFlowToIFlowResponse, mapIFlowResponseToFlow } from '@/maps/flow'
import { mapFlowDataToIFlowDataResponse, mapIFlowDataResponseToFlowData } from '@/maps/flowData'
import { mapFlowRunToIFlowRunResponse, mapIFlowRunResponseToFlowRun } from '@/maps/flowRun'
import { mapGraphNodeToIFlowRunGraphResponse, mapIFlowRunGraphResponseToGraphNode } from '@/maps/flowRunGraph'
import { mapRunHistoryToIFlowRunHistoryResponse, mapIFlowRunHistoryResponseToRunHistory } from '@/maps/flowRunHistory'
import { mapFlowRunnerToIFlowRunnerResponse, mapIFlowRunnerResponseToFlowRunner } from '@/maps/flowRunner'
import { mapLogToILogResponse, mapILogResponseToLog } from '@/maps/logs'
import { mapINotificationResponseToNotification } from '@/maps/notification'
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
  BlockDocumentCreate: { BlockDocumentCreateRequest: mapBlockDocumentCreateToBlockCreateRequest },
  BlockDocumentFilter: { BlockDocumentFilterRequest: mapBlockDocumentFilterToBlockDocumentFilterRequest },
  BlockDocumentResponse: { BlockDocument: mapBlockDocumentResponseToBlockDocument },
  BlockDocumentUpdate: { BlockDocumentUpdateRequest: mapBlockDocumentUpdateToBlockDocumentUpdateRequest },
  BlockSchemaFieldsResponse: { BlockSchemaFields: mapBlockSchemaFieldsResponseToBlockSchemaFields },
  BlockSchemaFilter: { BlockSchemaFilterRequest: mapBlockSchemaFilterToBlockSchemaFilterRequest },
  BlockSchemaResponse: { BlockSchema: mapBlockSchemaResponseToBlockSchema },
  BlockTypeFilter: { BlockTypeFilterRequest: mapBlockTypeFilterToBlockTypeRequest },
  BlockTypeResponse: { BlockType: mapBlockTypeResponseToBlockType },
  CreateFlowRun: { CreateFlowRunRequest: mapCreateFlowRunToCreateFlowRunRequest },
  Date: { string: mapDateToString },
  Deployment: { IDeploymentResponse: mapDeploymentToIDeploymentResponse },
  EmpiricalPolicy: { IEmpiricalPolicyResponse: mapEmpiricalPolicyToIEmpiricalPolicyResponse },
  Flow: { IFlowResponse: mapFlowToIFlowResponse },
  FlowData: { IFlowDataResponse: mapFlowDataToIFlowDataResponse },
  FlowRun: { IFlowRunResponse: mapFlowRunToIFlowRunResponse },
  FlowRunner: { IFlowRunnerResponse: mapFlowRunnerToIFlowRunnerResponse },
  GraphNode: { IFlowRunGraphResponse: mapGraphNodeToIFlowRunGraphResponse },
  IDeploymentResponse: { Deployment: mapIDeploymentResponseToDeployment },
  IEmpiricalPolicyResponse: { EmpiricalPolicy: mapIEmpiricalPolicyResponseToEmpiricalPolicy },
  IFlowDataResponse: { FlowData: mapIFlowDataResponseToFlowData },
  IFlowResponse: { Flow: mapIFlowResponseToFlow },
  IFlowRunGraphResponse: { GraphNode: mapIFlowRunGraphResponseToGraphNode },
  IFlowRunHistoryResponse: { RunHistory: mapIFlowRunHistoryResponseToRunHistory },
  IFlowRunnerResponse: { FlowRunner: mapIFlowRunnerResponseToFlowRunner },
  IFlowRunResponse: { FlowRun: mapIFlowRunResponseToFlowRun },
  ILogResponse: { Log: mapILogResponseToLog },
  INotificationResponse: { Notification: mapINotificationResponseToNotification },
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