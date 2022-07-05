import { RRuleSchedule, CronSchedule, IntervalSchedule } from '@/models'

export type Schedule = RRuleSchedule | CronSchedule | IntervalSchedule

export function isSchedule(schedule: unknown): schedule is Schedule {
  return isRRuleSchedule(schedule) || isCronSchedule(schedule) || isIntervalSchedule(schedule)
}

export function isRRuleSchedule(schedule: unknown): schedule is RRuleSchedule {
  return typeof schedule == 'object' && schedule !== null && 'rrule' in schedule
}

export function isCronSchedule(schedule: unknown): schedule is CronSchedule {
  return typeof schedule == 'object' && schedule !== null && 'cron' in schedule
}

export function isIntervalSchedule(schedule: unknown): schedule is IntervalSchedule {
  return typeof schedule == 'object' && schedule !== null && 'interval' in schedule
}

export const ScheduleTypes = ['rrule', 'cron', 'interval'] as const
export type ScheduleType = typeof ScheduleTypes[number]

export function getScheduleType(schedule?: unknown): ScheduleType | null {
  if (isSchedule(schedule)) {
    if (isRRuleSchedule(schedule)) {
      return 'rrule'
    }

    if (isCronSchedule(schedule)) {
      return 'cron'
    }

    if (isIntervalSchedule(schedule)) {
      return 'interval'
    }
  }

  return null
}