import { IntervalSchedule, CronSchedule, RRuleSchedule, Schedule } from '@/models'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities/arrays'
import { uniform } from '@/utilities/math'

const intervalSchedules = [1, 30, 60, 900, 1800, 3600, 86400]

const cronSchedules = [
  '* * * * *',
  '0 0 * * *',
  '@daily',
  '@hourly',
]

const rruleSchedules = [
  'DTSTART:20120201T023000Z RRULE:FREQ=MONTHLY;COUNT=5',
  'DTSTART:20120201T023000Z RRULE:FREQ=DAILY;COUNT=30',
]

type ScheduleType = 'interval' | 'cron' | 'rrule'

export const randomSchedule: MockFunction<Schedule, [{ type?: ScheduleType }?, Partial<Schedule>?]> = function({ type } = {}) {
  let schedule: Schedule

  const interval = intervalSchedules[uniform(0, intervalSchedules.length - 1)]
  const cron = cronSchedules[uniform(0, cronSchedules.length - 1)]
  const rrule = rruleSchedules[uniform(0, rruleSchedules.length - 1)]

  const randomScheduleType = choice<ScheduleType>(['interval', 'cron', 'rrule'])

  switch (type ?? randomScheduleType) {
    case 'interval':
      schedule = new IntervalSchedule({ interval, timezone: null, anchorDate: this.create('date') })
      break
    case 'cron':
      schedule = new CronSchedule({ cron, timezone: null, dayOr: false })
      break
    case 'rrule':
      schedule = new RRuleSchedule({ rrule, timezone: null })
      break
    default:
      throw new Error(`randomSchedule missing case for ${type ?? randomScheduleType}`)
  }

  return schedule
}