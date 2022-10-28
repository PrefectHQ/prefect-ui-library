import { WorkQueueStatus } from '@/models/WorkQueueStatus'
import { MockFunction } from '@/services/Mocker'
import { random } from '@/utilities/math'

export const randomWorkQueueStatus: MockFunction<WorkQueueStatus, [Partial<WorkQueueStatus>?]> = function(overrides = {}) {

  return new WorkQueueStatus({
    healthy: this.create('boolean'),
    lateRunsCount: this.create('number', [0, 3]),
    lastPolled: random() > 0.8 ? this.create('date') : null,
    healthCheckPolicy: this.create('workQueueHealthPolicy'),
    ...overrides,
  })
}