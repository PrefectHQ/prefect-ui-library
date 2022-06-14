import { randomAny } from './any'
import { randomBoolean } from './boolean'
import { randomDate } from './date'
import { randomDeployment } from './deployment'
import { randomFlow } from './flow'
import { randomFlowRun } from './flowRun'
import { randomFlowRunGraph, randomGraphNode } from './flowRunGraph'
import { randomFlowRunHistory } from './flowRunHistory'
import { randomFlowRunner } from './flowRunner'
import { randomFlowRunnerType } from './flowRunnerType'
import { randomFlowRunStateHistory } from './flowRunStateHistory'
import { randomId } from './id'
import { randomImage } from './image'
import { randomLogLevel, randomLog } from './log'
import { randomNotification } from './notification'
import { randomNumber } from './number'
import { randomParameters } from './parameters'
import { randomState } from './state'
import { randomStateType } from './stateType'
import { randomChar, randomString, randomSentence, randomParagraph, randomRunName, randomNoun } from './string'
import { randomTaskRun } from './taskRun'
import { randomUiFlowRunHistory } from './UiFlowRunHistory'
import { randomWorkQueue, randomWorkQueueFilter } from './workQueue'

export const mocks = {
  boolean: randomBoolean,
  char: randomChar,
  date: randomDate,
  deployment: randomDeployment,
  flow: randomFlow,
  flowRun: randomFlowRun,
  flowRunGraph: randomFlowRunGraph,
  graphNode: randomGraphNode,
  id: randomId,
  logLevel: randomLogLevel,
  log: randomLog,
  notification: randomNotification,
  number: randomNumber,
  paragraph: randomParagraph,
  sentence: randomSentence,
  state: randomState,
  stateType: randomStateType,
  string: randomString,
  runName: randomRunName,
  taskRun: randomTaskRun,
  workQueue: randomWorkQueue,
  workQueueFilter: randomWorkQueueFilter,
  flowRunnerType: randomFlowRunnerType,
  flowRunner: randomFlowRunner,
  flowRunHistory: randomFlowRunHistory,
  flowRunStateHistory: randomFlowRunStateHistory,
  noun: randomNoun,
  uiFlowRunHistory: randomUiFlowRunHistory,
  parameters: randomParameters,
  any: randomAny,
  image: randomImage,
}