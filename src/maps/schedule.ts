import { CronSchedule, IntervalSchedule, RRuleSchedule, Schedule, ScheduleResponse, isCronScheduleResponse, isIntervalScheduleResponse, isRRuleScheduleResponse, isIntervalSchedule, isRRuleSchedule, isCronSchedule, IntervalScheduleRequest, RRuleScheduleRequest, CronScheduleRequest } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { setTimezone } from '@/utilities/timezone'

export const mapScheduleResponseToSchedule: MapFunction<ScheduleResponse, Schedule> = function(source) {
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
    if (source.anchor_date && source.timezone) {
      return new IntervalSchedule({
        timezone: source.timezone,
        interval: source.interval,
        anchorDate: this.map('string', source.anchor_date, 'Date'),
      })
    }

    return new IntervalSchedule({
      interval: source.interval,
      timezone: null,
      anchorDate: null,
    })
  }

  throw 'Invalid ScheduleResponse'
}

export const mapScheduleToScheduleRequest: MapFunction<Schedule, ScheduleResponse> = function(source) {
  if (isRRuleSchedule(source)) {
    return {
      timezone: source.timezone,
      rrule: source.rrule,
    } satisfies RRuleScheduleRequest
  }

  if (isCronSchedule(source)) {
    return {
      timezone: source.timezone,
      cron: source.cron,
      day_or: source.dayOr,
    } satisfies CronScheduleRequest
  }

  if (isIntervalSchedule(source)) {
    if (source.anchorDate && source.timezone) {
      return {
        timezone: source.timezone,
        interval: source.interval,
        anchor_date: this.map('Date', setTimezone(source.anchorDate, source.timezone), 'string'),
      } satisfies IntervalScheduleRequest
    }

    return {
      interval: source.interval,
      timezone: null,
      anchor_date: null,
    } satisfies IntervalScheduleRequest
  }

  throw 'Invalid ScheduleRequest'
}

export const mapScheduleToScheduleResponse: MapFunction<Schedule, ScheduleResponse> = function(source) {
  return {
    timezone: source.timezone,
    rrule: (source as RRuleSchedule).rrule,
    cron: (source as CronSchedule).cron,
    day_or: (source as CronSchedule).dayOr,
    interval: (source as IntervalSchedule).interval,
    anchor_date: this.map('Date', (source as IntervalSchedule).anchorDate, 'string'),
  }
}