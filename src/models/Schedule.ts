/* eslint-disable max-classes-per-file */
import { minutesInHour, secondsInMinute } from 'date-fns'
import { floor } from '@/utilities/math'

export type ISchedule = IRRuleSchedule | ICronSchedule | IIntervalSchedule

export interface Schedule {
  toString: () => string,
}

export interface IRRuleSchedule extends Schedule {
  timezone: string | null,
  rrule: string,
}

export interface ICronSchedule extends Schedule {
  timezone: string | null,
  cron: string,
  dayOr: boolean | null,
}

export interface IIntervalSchedule extends Schedule {
  timezone: string | null,
  interval: number,
  anchorDate: Date | null,
}

export class RRuleSchedule implements IRRuleSchedule {
  public timezone: string | null
  public rrule: string

  public constructor(schedule: IRRuleSchedule) {
    this.timezone = schedule.timezone
    this.rrule = schedule.rrule
  }
}

export class CronSchedule implements ICronSchedule {
  public timezone: string | null
  public cron: string
  public dayOr: boolean | null

  public constructor(schedule: ICronSchedule) {
    this.timezone = schedule.timezone
    this.cron = schedule.cron
    this.dayOr = schedule.dayOr
  }
}

export class IntervalSchedule implements IIntervalSchedule {
  public timezone: string | null
  public interval: number
  public anchorDate: Date | null

  public toString(): string {
    let remainder = this.interval

    const seconds = this.interval % secondsInMinute
    remainder = floor(remainder / secondsInMinute)

    const minutes = remainder % minutesInHour
    remainder = floor(remainder / minutesInHour)

    const hours = remainder % 24
    remainder = floor(remainder / 24)

    const days = remainder % 365
    remainder = floor(remainder / 365)

    const years = remainder

    return `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
  }

  public constructor(schedule: IIntervalSchedule) {
    this.timezone = schedule.timezone
    this.interval = schedule.interval
    this.anchorDate = schedule.anchorDate
  }
}