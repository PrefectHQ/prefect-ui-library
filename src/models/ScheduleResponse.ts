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
  const rrule = schedule as unknown as RRuleScheduleResponse['rrule']
  return !!rrule
}

export function isCronScheduleResponse(schedule: ScheduleResponse): schedule is CronScheduleResponse {
  const cron = schedule as unknown as CronScheduleResponse['cron']
  return !!cron
}

export function isIntervalScheduleResponse(schedule: ScheduleResponse): schedule is IntervalScheduleResponse {
  const interval = schedule as unknown as IntervalScheduleResponse['interval']
  return !!interval
}
