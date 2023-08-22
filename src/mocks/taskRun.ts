import { TaskRun } from '@/models/TaskRun'
import { MockFunction } from '@/services/Mocker'

export const randomTaskRun: MockFunction<TaskRun, [Partial<TaskRun>?]> = function(overrides = {}) {
  const state = this.create('state')
  return new TaskRun({
    id: this.create('id'),
    flowRunId: this.create('boolean') ? this.create('id') : null,
    cacheExpiration: this.create('string'),
    cacheKey: this.create('string'),
    created: this.create('date'),
    dynamicKey: this.create('string'),
    empiricalPolicy: null,
    estimatedRunTime: this.create('number'),
    estimatedStartTimeDelta: this.create('number'),
    totalRunTime: this.create('number'),
    expectedStartTime: this.create('date'),
    nextScheduledStartTime: this.create('boolean') ? this.create('string') : null,
    runCount: this.create('number'),
    name: this.create('runName'),
    taskInputs: {},
    taskKey: this.create('string'),
    taskVersion: this.create('string'),
    updated: this.create('date'),
    startTime: this.create('date'),
    endTime: this.create('date'),
    stateId: state.id,
    stateType: state.type,
    state: state,
    tags: this.createMany('noun', this.create('number', [0, 10])),
    ...overrides,
  })
}