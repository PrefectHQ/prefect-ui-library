import { randomAny } from './any'
import { randomBlockDocument } from './blockDocument'
import { randomBlockDocumentData } from './blockDocumentData'
import { blockDocumentsApiMockFactory } from './blockDocumentsApi'
import { randomBlockSchema } from './blockSchema'
import { randomBlockSchemaCapabilities } from './blockSchemaCapabilities'
import { randomBlockSchemaCapability } from './blockSchemaCapability'
import { blockSchemasApiFactory } from './blockSchemasApi'
import { randomBlockType } from './blockType'
import { blockTypesApiFactory } from './blockTypesApi'
import { randomBoolean } from './boolean'
import { randomCreatedOrUpdatedBy } from './createdOrUpdatedBy'
import { randomDate, randomDateString } from './date'
import { randomDeployment } from './deployment'
import { randomEmail } from './email'
import { randomFlow } from './flow'
import { randomFlowRun } from './flowRun'
import { randomFlowRunGraph, randomGraphNode } from './flowRunGraph'
import { randomFlowRunHistory } from './flowRunHistory'
import { randomFlowRunStateHistory } from './flowRunStateHistory'
import { randomId } from './id'
import { randomImage } from './image'
import { randomLogLevel, randomLog } from './log'
import { randomNotification } from './notification'
import { randomNotificationCreate } from './notificationCreate'
import { randomNumber } from './number'
import { randomParameters } from './parameters'
import { randomSchedule } from './schedule'
import { randomSchema, randomSchemaProperties, randomSchemaProperty } from './schemas'
import { randomState } from './state'
import { randomStateType } from './stateType'
import { randomChar, randomString, randomSentence, randomParagraph, randomRunName, randomNoun } from './string'
import { randomTaskRun } from './taskRun'
import { randomUiFlowRunHistory } from './UiFlowRunHistory'
import { randomUrl } from './url'
import { randomWorkQueue, randomWorkQueueFilter } from './workQueue'
import { randomWorkQueueCreate } from './workQueueCreate'
import { randomWorkQueueHealthPolicy } from './workQueueHealthPolicy'
import { randomWorkQueueStatus } from './workQueueStatus'

export const mocks = {
  any: randomAny,
  blockDocument: randomBlockDocument,
  blockDocumentData: randomBlockDocumentData,
  blockDocumentsApi: blockDocumentsApiMockFactory,
  blockSchema: randomBlockSchema,
  blockSchemaCapabilities: randomBlockSchemaCapabilities,
  blockSchemaCapability: randomBlockSchemaCapability,
  blockSchemasApi: blockSchemasApiFactory,
  blockType: randomBlockType,
  blockTypesApi: blockTypesApiFactory,
  boolean: randomBoolean,
  char: randomChar,
  createdOrUpdatedBy: randomCreatedOrUpdatedBy,
  date: randomDate,
  dateString: randomDateString,
  deployment: randomDeployment,
  email: randomEmail,
  flow: randomFlow,
  flowRun: randomFlowRun,
  flowRunGraph: randomFlowRunGraph,
  flowRunHistory: randomFlowRunHistory,
  flowRunStateHistory: randomFlowRunStateHistory,
  graphNode: randomGraphNode,
  id: randomId,
  image: randomImage,
  log: randomLog,
  logLevel: randomLogLevel,
  notification: randomNotification,
  notificationCreate: randomNotificationCreate,
  noun: randomNoun,
  number: randomNumber,
  paragraph: randomParagraph,
  parameters: randomParameters,
  runName: randomRunName,
  schedule: randomSchedule,
  schema: randomSchema,
  schemaProperties: randomSchemaProperties,
  schemaProperty: randomSchemaProperty,
  sentence: randomSentence,
  state: randomState,
  stateType: randomStateType,
  string: randomString,
  taskRun: randomTaskRun,
  uiFlowRunHistory: randomUiFlowRunHistory,
  url: randomUrl,
  workQueue: randomWorkQueue,
  workQueueCreate: randomWorkQueueCreate,
  workQueueFilter: randomWorkQueueFilter,
  workQueueHealthPolicy: randomWorkQueueHealthPolicy,
  workQueueStatus: randomWorkQueueStatus,
}