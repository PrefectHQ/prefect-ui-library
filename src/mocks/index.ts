import { randomDeploymentVersion } from './deploymentVersion'
import { randomAny } from '@/mocks/any'
import { randomArtifact } from '@/mocks/artifact'
import { randomBlockDocument } from '@/mocks/blockDocument'
import { randomBlockDocumentData } from '@/mocks/blockDocumentData'
import { randomBlockSchema } from '@/mocks/blockSchema'
import { randomBlockSchemaCapabilities } from '@/mocks/blockSchemaCapabilities'
import { randomBlockSchemaCapability } from '@/mocks/blockSchemaCapability'
import { randomBlockType } from '@/mocks/blockType'
import { randomBlockTypeSnippet } from '@/mocks/blockTypeSnippet'
import { randomBoolean } from '@/mocks/boolean'
import { randomCollectionItem } from '@/mocks/collectionItem'
import { randomConcurrencyLimit } from '@/mocks/concurrencyLimit'
import { randomConcurrencyV2Limit } from '@/mocks/concurrencyV2Limit'
import { randomCreatedOrUpdatedBy } from '@/mocks/createdOrUpdatedBy'
import { randomDate, randomDateString } from '@/mocks/date'
import { randomDeployment } from '@/mocks/deployment'
import { randomDeploymentSchedules } from '@/mocks/deploymentSchedule'
import { randomDeploymentStatus } from '@/mocks/deploymentStatus'
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
import { randomMarkdownString, randomMarkdownCodeBlockString, randomMarkdownCodeSpanString, randomMarkdownContentString, randomMarkdownHeaderString, randomMarkdownQuoteString, randomMarkdownTableString } from '@/mocks/markdown'
import { randomNotification } from '@/mocks/notification'
import { randomNotificationCreate } from '@/mocks/notificationCreate'
import { randomNumber } from '@/mocks/number'
import { randomParameters } from '@/mocks/parameters'
import { randomSchedule } from '@/mocks/schedule'
import { randomSchema, randomSchemaProperties, randomSchemaProperty } from '@/mocks/schemas'
import { randomState } from '@/mocks/state'
import { randomStateType } from '@/mocks/stateType'
import { randomChar, randomString, randomSentence, randomParagraph, randomRunName, randomNoun, randomAdjective } from '@/mocks/string'
import { randomTable } from '@/mocks/table'
import { randomTaskRun } from '@/mocks/taskRun'
import { randomUiFlowRunHistory } from '@/mocks/UiFlowRunHistory'
import { randomUrl } from '@/mocks/url'
import { randomWorker } from '@/mocks/worker'
import { randomWorkerStatus } from '@/mocks/workerStatus'
import { randomWorkPool } from '@/mocks/workPool'
import { randomWorkPoolQueue } from '@/mocks/workPoolQueue'
import { randomWorkPoolStatus } from '@/mocks/workPoolStatus'

export const mocks = {
  adjective: randomAdjective,
  any: randomAny,
  artifact: randomArtifact,
  blockDocument: randomBlockDocument,
  blockDocumentData: randomBlockDocumentData,
  blockSchema: randomBlockSchema,
  blockSchemaCapabilities: randomBlockSchemaCapabilities,
  blockSchemaCapability: randomBlockSchemaCapability,
  blockType: randomBlockType,
  blockTypeSnippet: randomBlockTypeSnippet,
  boolean: randomBoolean,
  char: randomChar,
  collectionItem: randomCollectionItem,
  concurrencyLimit: randomConcurrencyLimit,
  concurrencyV2Limit: randomConcurrencyV2Limit,
  createdOrUpdatedBy: randomCreatedOrUpdatedBy,
  date: randomDate,
  dateString: randomDateString,
  deployment: randomDeployment,
  deploymentSchedules: randomDeploymentSchedules,
  deploymentStatus: randomDeploymentStatus,
  deploymentVersion: randomDeploymentVersion,
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
  markdownCodeBlockString: randomMarkdownCodeBlockString,
  markdownCodeSpanString: randomMarkdownCodeSpanString,
  markdownContentString: randomMarkdownContentString,
  markdownHeaderString: randomMarkdownHeaderString,
  markdownQuoteString: randomMarkdownQuoteString,
  markdownString: randomMarkdownString,
  markdownTableString: randomMarkdownTableString,
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
  table: randomTable,
  taskRun: randomTaskRun,
  uiFlowRunHistory: randomUiFlowRunHistory,
  url: randomUrl,
  worker: randomWorker,
  workerStatus: randomWorkerStatus,
  workPool: randomWorkPool,
  workPoolQueue: randomWorkPoolQueue,
  workPoolStatus: randomWorkPoolStatus,
}