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
  const rruleScheduleRequest = schedule as RRuleScheduleRequest
  return !!rruleScheduleRequest.rrule
}

export function isCronScheduleRequest(schedule: ScheduleRequest): schedule is CronScheduleRequest {
  const cronScheduleRequest = schedule as CronScheduleRequest
  return !!cronScheduleRequest.cron
}

export function isIntervalScheduleRequest(schedule: ScheduleRequest): schedule is IntervalScheduleRequest {
  const intervalScheduleRequest = schedule as IntervalScheduleRequest
  return !!intervalScheduleRequest.interval
}
