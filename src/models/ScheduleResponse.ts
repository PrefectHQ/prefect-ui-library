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
  return !!(schedule as RRuleScheduleResponse).rrule
}

export function isCronScheduleResponse(schedule: ScheduleResponse): schedule is CronScheduleResponse {
  return !!(schedule as CronScheduleResponse).cron
}

export function isIntervalScheduleResponse(schedule: ScheduleResponse): schedule is IntervalScheduleResponse {
  return !!(schedule as IntervalScheduleResponse).interval
}
