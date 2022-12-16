export type ScheduleResponse = RRuleScheduleResponse | CronScheduleResponse | IntervalScheduleResponse

export type RRuleScheduleResponse = {
  rrule: string,
  timezone: string | null,
}

export type CronScheduleResponse = {
  cron: string,
  timezone: string | null,
  day_or: boolean,
}

export type IntervalScheduleResponse = {
  interval: number,
  timezone: string | null,
  anchor_date: string | null,
}

export function isRRuleScheduleResponse(schedule: ScheduleResponse): schedule is RRuleScheduleResponse {
  const rruleScheduleResponse = schedule as RRuleScheduleResponse
  return !!rruleScheduleResponse.rrule
}

export function isCronScheduleResponse(schedule: ScheduleResponse): schedule is CronScheduleResponse {
  const cronScheduleResponse = schedule as CronScheduleResponse
  return !!cronScheduleResponse.cron
}

export function isIntervalScheduleResponse(schedule: ScheduleResponse): schedule is IntervalScheduleResponse {
  const intervalScheduleResponse = schedule as IntervalScheduleResponse
  return !!intervalScheduleResponse.interval
}
