import { WorkQueueCreate } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomWorkQueueCreate: MockFunction<WorkQueueCreate, [Partial<WorkQueueCreate>?]> = function(overrides = {}) {
  const { name, description, isPaused, concurrencyLimit } = this.create('workQueue')

  return {
    name,
    description,
    isPaused,
    concurrencyLimit,
    ...overrides,
  }
}