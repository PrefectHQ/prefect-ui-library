import { WorkQueueHealthPolicy } from '@/models/WorkQueueHealthPolicy'
import { MockFunction } from '@/services/Mocker'

export const randomWorkQueueHealthPolicy: MockFunction<WorkQueueHealthPolicy, [Partial<WorkQueueHealthPolicy>?]> = function(overrides = {}) {

  return {
    maximumLateRuns: 0,
    maximumSecondsSinceLastPolled: 60,
    ...overrides,
  }
}