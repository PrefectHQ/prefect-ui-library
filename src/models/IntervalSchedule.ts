import { formatDate, formatTimeNumeric, toPluralString } from '@prefecthq/prefect-design'
import { minutesInHour, secondsInMinute } from 'date-fns'
import { IIntervalScheduleResponse } from './IScheduleResponse'
import { Schedule } from '@/models'
import { floor } from '@/utilities/math'


export type Intervals = {
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
}

export interface IIntervalScheduleRaw {
  interval: number,
  timezone: string | null,
  anchorDate: Date | null,
}

export type IIntervalSchedule = { getIntervals?: () => Intervals } & IIntervalScheduleRaw & Schedule

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

  public toString(options?: { neat?: boolean, verbose?: boolean }): string {
    const { neat = true, verbose = false } = options ?? {}
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

    let str = strings.reverse().join(', ')

    if (!verbose) {
      return str
    }

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

  public toResponse(): IIntervalScheduleResponse {
    return {
      'interval': this.interval,
      'anchor_date': this.anchorDate?.toISOString() ?? null,
      'timezone': this.timezone,
    }
  }

  public constructor(schedule: IIntervalScheduleRaw) {
    this.timezone = schedule.timezone
    this.interval = schedule.interval
    this.anchorDate = schedule.anchorDate
  }
}