import { IScheduleResponse } from '@/models'

export interface Schedule {
  timezone: string | null,
  toString: () => string,
  toResponse: () => IScheduleResponse,
}
