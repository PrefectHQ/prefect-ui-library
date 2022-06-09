/* eslint-disable max-classes-per-file */
import { formatDate, formatTimeNumeric, toPluralString } from '@prefecthq/prefect-design'
import { minutesInHour, secondsInMinute } from 'date-fns'
import { floor } from '@/utilities/math'

export type ISchedule = IRRuleSchedule | ICronSchedule | IIntervalSchedule

export type Intervals = {
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
}
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

  public getIntervals(): Intervals {
    let remainder = this.interval

    const intervals = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    }

    intervals.seconds = remainder % secondsInMinute
    remainder = floor(remainder / secondsInMinute)

    intervals.minutes = remainder % minutesInHour
    remainder = floor(remainder / minutesInHour)

    intervals.hours = remainder % 24
    remainder = floor(remainder / 24)

    intervals.days = remainder

    return intervals
  }

  public toProseString(): string {
    let str = this.toString()

    if (str == '') {
      return 'None'
    }

    str = `Every ${str}`

    if (this.anchorDate) {
      str += ` from ${formatDate(this.anchorDate)} at ${formatTimeNumeric(this.anchorDate)} ${this.timezone ?? 'UTC'}`
    }

    return str
  }

  public toString(): string {
    const { seconds, minutes, hours } = this.getIntervals()
    const strings: string[] = []

    if (seconds) {
      strings.push(`${seconds} ${toPluralString('second', seconds)}`)
    }

    if (minutes) {
      strings.push(`${minutes} ${toPluralString('minute', minutes)}`)
    }

    if (hours) {
      strings.push(`${hours} ${toPluralString('hour', hours)}`)
    }

    return strings.reverse().join(', ')
  }

  public constructor(schedule: IIntervalSchedule) {
    this.timezone = schedule.timezone
    this.interval = schedule.interval
    this.anchorDate = schedule.anchorDate
  }
}