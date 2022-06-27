import { IntervalSchedule, CronSchedule, RRuleSchedule, Schedule } from '@/models'
import { MockFunction } from '@/services/Mocker'
import { uniform } from '@/utilities/math'

const intervalSchedules = [1, 30, 60, 900, 1800, 3600, 86400]

const cronSchedules = [
  '* * * * *',
  '0 0 * * *',
  '@daily',
  '@hourly',
]

const rruleSchedules = [
  'DTSTART:20120201T023000ZRRULE:FREQ=MONTHLY;COUNT=5',
  'DTSTART:20120201T023000ZRRULE:FREQ=DAILY;COUNT=30',
]

export const randomSchedule: MockFunction<Schedule, [Partial<Schedule>?]> = function() {
  const coinFlip = uniform(0, 100)

  if (coinFlip > 55) {
    const interval = intervalSchedules[uniform(0, intervalSchedules.length - 1)]
    return new IntervalSchedule({ interval, timezone: null, anchorDate: this.create('date') })
  }

  if (coinFlip > 10) {
    const cron = cronSchedules[uniform(0, cronSchedules.length - 1)]
    return new CronSchedule({ cron, timezone: null, dayOr: false })
  }

  const rrule = rruleSchedules[uniform(0, rruleSchedules.length - 1)]

  return new RRuleSchedule({ rrule, timezone: null })
}