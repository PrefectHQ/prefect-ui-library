import { randomAny } from '@/mocks/any'
import { randomBlockDocument } from '@/mocks/blockDocument'
import { randomBlockDocumentData } from '@/mocks/blockDocumentData'
import { randomBlockSchema } from '@/mocks/blockSchema'
import { randomBlockSchemaCapabilities } from '@/mocks/blockSchemaCapabilities'
import { randomBlockSchemaCapability } from '@/mocks/blockSchemaCapability'
import { randomBlockType } from '@/mocks/blockType'
import { randomBlockTypeSnippet } from '@/mocks/blockTypeSnippet'
import { randomBoolean } from '@/mocks/boolean'
import { randomConcurrencyLimit } from '@/mocks/concurrencyLimit'
import { randomCreatedOrUpdatedBy } from '@/mocks/createdOrUpdatedBy'
import { randomDate, randomDateString } from '@/mocks/date'
import { randomDeployment } from '@/mocks/deployment'
import { randomEmail } from '@/mocks/email'
import { randomFlow } from '@/mocks/flow'
import { randomFlowResponse } from '@/mocks/flowResponse'
import { randomFlowRun } from '@/mocks/flowRun'
import { randomFlowRunGraph, randomGraphNode } from '@/mocks/flowRunGraph'
import { randomFlowRunHistory } from '@/mocks/flowRunHistory'
import { randomFlowRunStateHistory } from '@/mocks/flowRunStateHistory'
import { randomId } from '@/mocks/id'
import { randomImage } from '@/mocks/image'
import { randomLogLevel, randomLog } from '@/mocks/log'
import { randomNotification } from '@/mocks/notification'
import { randomNotificationCreate } from '@/mocks/notificationCreate'
import { randomNumber } from '@/mocks/number'
import { randomParameters } from '@/mocks/parameters'
import { randomSchedule } from '@/mocks/schedule'
import { randomSchema, randomSchemaProperties, randomSchemaProperty } from '@/mocks/schemas'
import { randomState } from '@/mocks/state'
import { randomStateType } from '@/mocks/stateType'
import { randomChar, randomString, randomSentence, randomParagraph, randomRunName, randomNoun } from '@/mocks/string'
import { randomTaskRun } from '@/mocks/taskRun'
import { randomUiFlowRunHistory } from '@/mocks/UiFlowRunHistory'
import { randomUrl } from '@/mocks/url'
import { randomWorker } from '@/mocks/worker'
import { randomWorkerPool } from '@/mocks/workerPool'
import { randomWorkerPoolQueue } from '@/mocks/workerPoolQueue'
import { randomWorkQueue, randomWorkQueueFilter } from '@/mocks/workQueue'
import { randomWorkQueueCreate } from '@/mocks/workQueueCreate'
import { randomWorkQueueHealthPolicy } from '@/mocks/workQueueHealthPolicy'
import { randomWorkQueueStatus } from '@/mocks/workQueueStatus'

export const mocks = {
  any: randomAny,
  blockDocument: randomBlockDocument,
  blockDocumentData: randomBlockDocumentData,
  blockSchema: randomBlockSchema,
  blockSchemaCapabilities: randomBlockSchemaCapabilities,
  blockSchemaCapability: randomBlockSchemaCapability,
  blockType: randomBlockType,
  blockTypeSnippet: randomBlockTypeSnippet,
  boolean: randomBoolean,
  char: randomChar,
  concurrencyLimit: randomConcurrencyLimit,
  createdOrUpdatedBy: randomCreatedOrUpdatedBy,
  date: randomDate,
  dateString: randomDateString,
  deployment: randomDeployment,
  email: randomEmail,
  flow: randomFlow,
  flowResponse: randomFlowResponse,
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
  worker: randomWorker,
  workerPool: randomWorkerPool,
  workerPoolQueue: randomWorkerPoolQueue,
  workQueue: randomWorkQueue,
  workQueueCreate: randomWorkQueueCreate,
  workQueueFilter: randomWorkQueueFilter,
  workQueueHealthPolicy: randomWorkQueueHealthPolicy,
  workQueueStatus: randomWorkQueueStatus,
}