import { FlowRun } from '@/models/FlowRun'
import { MockFunction } from '@/services/Mocker'

export const randomFlowRun: MockFunction<FlowRun, [Partial<FlowRun>?]> = function(overrides = {}) {
  return new FlowRun({
    id: this.create('id'),
    flowId: this.create('id'),
    deploymentId: this.create('id'),
    flowVersion: this.create('string'),
    idempotencyKey: this.create('string'),
    expectedStartTime: this.create('date'),
    nextScheduledStartTime: this.create('string'),
    parameters: {},
    autoScheduled: this.create('boolean'),
    context: {},
    empiricalConfig: {},
    empiricalPolicy: {},
    estimatedRunTime: this.create('number'),
    estimatedStartTimeDelta: this.create('number'),
    totalRunTime: this.create('number'),
    startTime: this.create('date'),
    endTime: this.create('date'),
    name: this.create('runName'),
    parentTaskRunId: this.create('string'),
    stateId: this.create('id'),
    stateType: this.create('stateType'),
    state: this.create('state'),
    tags: this.createMany('noun', this.create('number', [0, 10])),
    runCount: this.create('number'),
    created: this.create('date'),
    updated: this.create('date'),
    ...overrides,
  })
}