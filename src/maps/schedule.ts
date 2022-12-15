import { CronSchedule, IntervalSchedule, RRuleSchedule, Schedule, ScheduleRequest, ScheduleResponse, isCronScheduleResponse, isIntervalScheduleResponse, isRRuleScheduleResponse, isIntervalSchedule, isRRuleSchedule, isCronSchedule, IntervalScheduleRequest, RRuleScheduleRequest, CronScheduleRequest } from '@/models'
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

export const mapScheduleToScheduleRequest: MapFunction<Schedule, ScheduleResponse> = function(source: Schedule): ScheduleRequest {
  if (isRRuleSchedule(source)) {
    return {
      'timezone': source.timezone,
      'rrule': source.rrule,
    } as RRuleScheduleRequest
  }

  if (isCronSchedule(source)) {
    return {
      'timezone': source.timezone,
      'cron': source.cron,
      'day_or': source.dayOr,
    } as CronScheduleRequest
  }

  if (isIntervalSchedule(source)) {
    return {
      'timezone': source.timezone,
      'interval': source.interval,
      'anchor_date': source.anchorDate ? this.map('Date', source.anchorDate, 'string') : null,
    } as IntervalScheduleRequest
  }

  throw 'Invalid ScheduleRequest'
}

export const mapScheduleToScheduleResponse: MapFunction<Schedule, ScheduleResponse> = function(source: Schedule): ScheduleResponse {
  return {
    'timezone': source.timezone,
    'rrule': source as unknown as RRuleSchedule['rrule'],
    'cron': source as unknown as CronSchedule['cron'],
    'day_or': source as unknown as CronSchedule['dayOr'],
    'interval': source as unknown as IntervalSchedule['interval'],
    'anchor_date': this.map('Date', source as unknown as IntervalSchedule['anchorDate'], 'string'),
  }
}