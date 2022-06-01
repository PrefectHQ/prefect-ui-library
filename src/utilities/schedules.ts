import { toPluralString } from '@prefecthq/prefect-design'
import { CronSchedule, IntervalSchedule, RRuleSchedule, Schedule } from '@/models/Schedule'

export function formatSchedule(schedule: Schedule | null): string | null {
  if (schedule instanceof IntervalSchedule) {
    return `${schedule.interval.toLocaleString()} ${toPluralString('second', schedule.interval)}`
  }

  if (schedule instanceof CronSchedule) {
    return schedule.cron.toString()
  }

  if (schedule instanceof RRuleSchedule) {
    return schedule.rrule.toString()
  }

  return schedule
}