import { CronSchedule, IntervalSchedule, RRuleSchedule, Schedule } from '@/models'
import { ScheduleResponse, isCronScheduleResponse, isIntervalScheduleResponse, isRRuleScheduleResponse } from '@/models/ScheduleResponse'
import { MapFunction } from '@/services/Mapper'

export const mapScheduleResponseToSchedule: MapFunction<ScheduleResponse, Schedule> = function(source: ScheduleResponse): Schedule {
  if (isRRuleScheduleResponse(source)) {
    return new RRuleSchedule({
      timezone: source.timezone,
      rrule: source.rrule,
    })
  }

  if (isCronScheduleResponse(source)) {
    return new CronSchedule({
      timezone: source.timezone,
      cron: source.cron,
      dayOr: source.day_or,
    })
  }

  if (isIntervalScheduleResponse(source)) {
    return new IntervalSchedule({
      timezone: source.timezone,
      interval: source.interval,
      anchorDate: this.map('string', source.anchor_date, 'Date'),
    })
  }

  throw 'Invalid ScheduleResponse'
}

export const mapScheduleToScheduleResponse: MapFunction<Schedule, ScheduleResponse> = function(source: Schedule): ScheduleResponse {
  return {
    'timezone': source.timezone,
    'rrule': (source as RRuleSchedule).rrule,
    'cron': (source as CronSchedule).cron,
    'day_or': (source as CronSchedule).dayOr,
    'interval': (source as IntervalSchedule).interval,
    'anchor_date': this.map('Date', (source as IntervalSchedule).anchorDate, 'string'),
  }
}