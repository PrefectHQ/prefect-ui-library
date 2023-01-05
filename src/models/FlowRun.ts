import { CreatedOrUpdatedBy } from '@/models/CreatedOrUpdatedBy'
import { State } from '@/models/State'
import { StateType } from '@/models/StateType'
import { PrefectStateNames } from '@/types'
import { SchemaValues } from '@/types/schemas'
import { secondsToApproximateString } from '@/utilities/seconds'

export interface IFlowRun {
  id: string,
  flowId: string,
  deploymentId: string | null,
  flowVersion: string | null,
  idempotencyKey: string | null,
  expectedStartTime: Date | null,
  nextScheduledStartTime: string | null,
  parameters: SchemaValues,
  autoScheduled: boolean | null,
  context: unknown,
  empiricalConfig: unknown,
  empiricalPolicy: unknown,
  estimatedRunTime: number,
  estimatedStartTimeDelta: number | null,
  totalRunTime: number,
  startTime: Date | null,
  endTime: Date | null,
  name: string | null,
  parentTaskRunId: string | null,
  stateId: string | null,
  stateName: PrefectStateNames | null,
  stateType: StateType | null,
  state: State | null,
  tags: string[] | null,
  runCount: number | null,
  created: Date,
  createdBy: CreatedOrUpdatedBy | null,
  updated: Date,
  workQueueName: string | null,
  workerPoolName: string | null,
  workerPoolQueueName: string | null,
}

export class FlowRun implements IFlowRun {
  public readonly id: string
  public readonly flowId: string
  public readonly deploymentId: string | null
  public readonly workQueueName: string | null
  public flowVersion: string | null
  public idempotencyKey: string | null
  public expectedStartTime: Date | null
  public nextScheduledStartTime: string | null
  public parameters: SchemaValues
  public autoScheduled: boolean | null
  public context: unknown
  public empiricalConfig: unknown
  public empiricalPolicy: unknown
  public estimatedRunTime: number
  public estimatedStartTimeDelta: number | null
  public totalRunTime: number
  public startTime: Date | null
  public endTime: Date | null
  public name: string | null
  public parentTaskRunId: string | null
  public stateId: string | null
  public stateName: PrefectStateNames | null
  public stateType: StateType | null
  public state: State | null
  public tags: string[] | null
  public runCount: number | null
  public created: Date
  public createdBy: CreatedOrUpdatedBy | null
  public updated: Date
  public workerPoolName: string | null
  public workerPoolQueueName: string | null

  public constructor(flowRun: IFlowRun) {
    this.id = flowRun.id
    this.deploymentId = flowRun.deploymentId
    this.flowId = flowRun.flowId
    this.flowVersion = flowRun.flowVersion
    this.idempotencyKey = flowRun.idempotencyKey
    this.expectedStartTime = flowRun.expectedStartTime
    this.nextScheduledStartTime = flowRun.nextScheduledStartTime
    this.parameters = flowRun.parameters
    this.autoScheduled = flowRun.autoScheduled
    this.context = flowRun.context
    this.empiricalConfig = flowRun.empiricalConfig
    this.empiricalPolicy = flowRun.empiricalPolicy
    this.estimatedRunTime = flowRun.estimatedRunTime
    this.estimatedStartTimeDelta = flowRun.estimatedStartTimeDelta
    this.totalRunTime = flowRun.totalRunTime
    this.startTime = flowRun.startTime
    this.endTime = flowRun.endTime
    this.name = flowRun.name
    this.parentTaskRunId = flowRun.parentTaskRunId
    this.stateId = flowRun.stateId
    this.stateName = flowRun.stateName
    this.stateType = flowRun.stateType
    this.state = flowRun.state
    this.tags = flowRun.tags
    this.runCount = flowRun.runCount
    this.created = flowRun.created
    this.createdBy = flowRun.createdBy
    this.updated = flowRun.updated
    this.workQueueName = flowRun.workQueueName
    this.workerPoolName = flowRun.workerPoolName
    this.workerPoolQueueName = flowRun.workerPoolQueueName
  }

  public get duration(): number {
    return this.totalRunTime || this.estimatedRunTime
  }

  public isScheduled(): this is FlowRun & { expectedStartTime: Date } {
    return this.stateType === 'scheduled'
  }

  public get delta(): string | null {
    if (!this.estimatedStartTimeDelta || this.estimatedStartTimeDelta <= 60) {
      return null
    }

    return `(${secondsToApproximateString(this.estimatedStartTimeDelta)} late)`
  }
}
