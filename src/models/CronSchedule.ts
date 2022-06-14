import { toString as cronToString, default as Cron } from 'cronstrue'
import { Schedule } from '@/models'

export const cronKeywords = [
  '@midnight',
  '@hourly',
  '@daily',
  '@weekly',
  '@monthly',
  '@yearly',
  '@annually',
] as const

export type CronKeyword = typeof cronKeywords[number]

export type CronKeywordMap = Record<CronKeyword, string>

export const cronKeywordMap = {
  '@midnight': 'Daily',
  '@hourly': 'Hourly',
  '@daily': 'Daily',
  '@weekly': 'Weekly',
  '@monthly': 'Monthly',
  '@yearly': 'Yearly',
  '@annually': 'Yearly',
} as const

export interface ICronScheduleRaw {
  timezone: string | null,
  cron: string,
  dayOr: boolean | null,
}

export type ICronSchedule = ICronScheduleRaw & Schedule

function isCronKeyword(cron: string | CronKeyword): cron is CronKeyword {
  return cron in cronKeywordMap
}

export class CronSchedule implements ICronSchedule {
  public timezone: string | null
  public cron: string | CronKeyword
  public dayOr: boolean | null

  public getCron(): Cron | null {
    try {
      return new Cron(this.cron, {})
    } catch {
      return null
    }
  }

  public toString(): string {
    if (isCronKeyword(this.cron)) {
      return cronKeywordMap[this.cron]
    }

    try {
      return cronToString(this.cron)
    } catch {
      return 'Invalid'
    }
  }

  public toProseString(): string {
    const str = this.toString()

    if (str == 'Invalid') {
      return str
    }

    if (str == '') {
      return 'None'
    }

    return `${str} (${this.timezone ?? 'UTC'})`
  }

  public constructor(schedule: ICronScheduleRaw) {
    this.timezone = schedule.timezone
    this.cron = schedule.cron
    this.dayOr = schedule.dayOr
  }
}
