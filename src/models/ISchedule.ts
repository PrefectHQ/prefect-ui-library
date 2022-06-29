import { IScheduleResponse } from '@/models'

export type ISchedule = {
  raw: string | number | null | undefined,
  timezone: string | null,
  toString: () => string,
  toResponse: () => IScheduleResponse,
}
