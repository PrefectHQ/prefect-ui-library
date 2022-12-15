export type ScheduleRequest = RRuleScheduleRequest | CronScheduleRequest | IntervalScheduleRequest

export type RRuleScheduleRequest = {
  rrule: string,
  timezone: string | null,
}

export type CronScheduleRequest = {
  cron: string,
  timezone: string | null,
  day_or: boolean,
}

export type IntervalScheduleRequest = {
  interval: number,
  timezone: string | null,
  anchor_date: string | null,
}

export function isRRuleScheduleRequest(schedule: ScheduleRequest): schedule is RRuleScheduleRequest {
  return !!schedule as RRuleScheduleRequest.rrule
}

export function isCronScheduleRequest(schedule: ScheduleRequest): schedule is CronScheduleRequest {
  return !!schedule as CronScheduleRequest.cron
}

export function isIntervalScheduleRequest(schedule: ScheduleRequest): schedule is IntervalScheduleRequest {
  return !!schedule as IntervalScheduleRequest.interval
}
