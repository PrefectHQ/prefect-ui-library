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
  const rrule = schedule as unknown as RRuleScheduleRequest['rrule']
  return !!rrule
}

export function isCronScheduleRequest(schedule: ScheduleRequest): schedule is CronScheduleRequest {
  const cron = schedule as unknown as CronScheduleRequest['cron']
  return !!cron
}

export function isIntervalScheduleRequest(schedule: ScheduleRequest): schedule is IntervalScheduleRequest {
  const interval = schedule as unknown as IntervalScheduleRequest['interval']
  return !!interval
}
