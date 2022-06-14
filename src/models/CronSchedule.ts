import { default as Cron } from 'cronstrue'
import cronstrue from 'cronstrue/i18n'
import { Schedule } from '@/models'
import { CronKeyword, isCronKeyword, containsCronRandomExpression, cronKeywordMap } from '@/types/cron'


export interface ICronScheduleRaw {
  timezone: string | null,
  cron: string,
  dayOr: boolean | null,
}

export type ICronSchedule = ICronScheduleRaw & Schedule


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

    if (containsCronRandomExpression(this.cron)) {
      return 'RANDOM'
    }

    try {
      return cronstrue.toString(this.cron)
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
