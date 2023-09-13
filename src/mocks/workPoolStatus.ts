import { WorkPoolStatus, workPoolStatus } from '@/models/WorkPoolStatus'
import { MockFunction } from '@/services/Mocker'

export const randomWorkPoolStatus: MockFunction<WorkPoolStatus, []> =
  function() {
    const choices = [...workPoolStatus, null] as const
    return choices[Math.floor(Math.random() * workPoolStatus.length)]
  }
