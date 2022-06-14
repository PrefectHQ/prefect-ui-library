import { toString as cronToString } from 'cronstrue'
import { Schedule } from '@/models'

export interface ICronScheduleRaw {
  timezone: string | null,
  cron: string,
  dayOr: boolean | null,
}

export type ICronSchedule = ICronScheduleRaw & Schedule

export class CronSchedule implements ICronSchedule {
  public timezone: string | null
  public cron: string
  public dayOr: boolean | null

  public toString(): string {
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
