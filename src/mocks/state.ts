import { State } from '@/models/State'
import { MockFunction } from '@/services/Mocker'
import { capitalize } from '@/utilities'
import { random } from '@/utilities/math'

export const randomState: MockFunction<State, [Partial<State>?]> = function(overrides = {}) {
  const type = this.create('stateType')
  const name = capitalize(overrides.type ?? type)

  return {
    id: this.create('id'),
    type: type,
    message: this.create('sentence'),
    stateDetails: {
      flowRunId: this.create('id'),
      taskRunId: this.create('id'),
      childFlowRunId: random() > 0.9 ? this.create('id') : null,
      scheduledTime: this.create('date'),
      cacheKey: this.create('string'),
      cacheExpiration: this.create('date'),
    },
    data: {
      encoding: this.create('string'),
      blob: this.create('string'),
    },
    timestamp: this.create('string'),
    name: name,
    ...overrides,
  }
}