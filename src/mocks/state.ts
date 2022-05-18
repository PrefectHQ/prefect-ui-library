import { IState } from '@/models/State'
import { MockFunction } from '@/services/Mocker'
import { capitalize } from '@/utilities'

export const randomState: MockFunction<IState> = function(state?: Partial<IState>) {
  const type = this.create('stateType')
  const name = capitalize(state?.type ?? type)

  return {
    id: state?.id ?? this.create('string'),
    type: state?.type ?? type,
    message: state?.message ?? this.create('string'),
    stateDetails: state?.stateDetails ?? {
      flowRunId: this.create('string'),
      taskRunId: this.create('string'),
      childFlowRunId: this.create('string'),
      scheduledTime: this.create('date'),
      cacheKey: this.create('string'),
      cacheExpiration: this.create('date'),
    },
    data: state?.data ?? {
      encoding: this.create('string'),
      blob: this.create('string'),
    },
    timestamp: state?.timestamp ?? this.create('string'),
    name: state?.name ?? name,
  }
}