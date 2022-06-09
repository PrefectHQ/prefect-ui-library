/* eslint-disable max-classes-per-file */
import { formatDate, formatTimeNumeric, toPluralString } from '@prefecthq/prefect-design'
import { toString as cronToString } from 'cronstrue'
import { minutesInHour, secondsInMinute } from 'date-fns'
import { rrulestr as stringToRRule, RRule } from 'rrule'
import { capitalize } from '@/utilities'
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
  toProseString: () => string,
}

export interface IRRuleScheduleRaw {
  timezone: string | null,
  rrule: string,
}

export type IRRuleSchedule = IRRuleScheduleRaw & Schedule

export interface ICronScheduleRaw {
  timezone: string | null,
  cron: string,
  dayOr: boolean | null,
}

export type ICronSchedule = ICronScheduleRaw & Schedule


export interface IIntervalScheduleRaw {
  interval: number,
  timezone: string | null,
  anchorDate: Date | null,
}

export type IIntervalSchedule = { getIntervals?: () => Intervals } & IIntervalScheduleRaw & Schedule

export class RRuleSchedule implements IRRuleSchedule {
  public timezone: string | null
  public rrule: string

  public getRRule(): RRule {
    if (!this.rrule) {
      return new RRule()
    }

    try {
      return RRule.fromString(this.rrule)
    } catch {
      return new RRule()
    }
  }

  public toString(): string {
    return capitalize(this.getRRule().toText())
  }

  public toProseString(): string {
    return capitalize(this.getRRule().toText())
  }

  public constructor(schedule: IRRuleScheduleRaw) {
    this.timezone = schedule.timezone
    this.rrule = schedule.rrule
  }
}

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

    console.log(intervals)

    return intervals
  }

  public toProseString(neat: boolean = true): string {
    let str = this.toString(neat)

    if (str == '') {
      return 'None'
    }

    if (!str.includes('Every') && !str.includes('Daily') && !str.includes('Hourly')) {
      str = `Every ${str}`
    }

    if (this.anchorDate) {
      str += ` from ${formatDate(this.anchorDate)} at ${formatTimeNumeric(this.anchorDate)} (${this.timezone ?? 'UTC'})`
    }

    return str
  }

  public toString(neat: boolean = true): string {
    const { seconds, minutes, hours, days } = this.getIntervals()
    const strings: string[] = []

    if (seconds) {
      if (neat && seconds === 1 && !minutes && !hours && !days) {
        strings.push('Every second')
      } else {
        strings.push(`${seconds} ${toPluralString('second', seconds)}`)
      }
    }

    if (minutes) {
      if (neat && minutes === 1 && !seconds && !hours && !days) {
        strings.push('Every minute')
      } else {
        strings.push(`${minutes} ${toPluralString('minute', minutes)}`)
      }
    }

    if (hours) {
      if (neat && hours === 1 && !seconds && !minutes && !days) {
        strings.push('Hourly')
      } else {
        strings.push(`${hours} ${toPluralString('hour', hours)}`)
      }
    }

    if (days) {
      if (neat && days === 1 && !seconds && !minutes && !hours) {
        strings.push('Daily')
      } else {
        strings.push(`${days} ${toPluralString('day', days)}`)
      }
    }

    return strings.reverse().join(', ')
  }

  public constructor(schedule: IIntervalScheduleRaw) {
    this.timezone = schedule.timezone
    this.interval = schedule.interval
    this.anchorDate = schedule.anchorDate
  }
}