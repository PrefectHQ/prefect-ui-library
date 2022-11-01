import { toPluralString } from '@prefecthq/prefect-design'
import { zonedTimeToUtc } from 'date-fns-tz'
import { IntervalScheduleResponse } from './ScheduleResponse'
import { ISchedule } from '@/models'
import { formatDate, formatTimeNumeric } from '@/utilities/dates'
import { floor } from '@/utilities/math'
import { secondsInMinute, minutesInHour } from '@/utilities/timezone'

export type Intervals = {
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
}

export interface IIntervalSchedule extends ISchedule {
  interval: number,
  timezone: string | null,
  anchorDate: Date | null,
  getIntervals?: () => Intervals,
}

export class IntervalSchedule implements IIntervalSchedule {
  public timezone: string | null
  public interval: number
  public anchorDate: Date | null

  public constructor(schedule: Pick<IIntervalSchedule, 'interval' | 'timezone' | 'anchorDate'>) {
    this.timezone = schedule.timezone
    this.interval = schedule.interval
    this.anchorDate = schedule.anchorDate
  }

  public get raw(): number {
    return this.interval
  }

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

  public toString({ verbose = false, neat = true }: { neat?: boolean, verbose?: boolean } = {}): string {
    const { seconds, minutes, hours, days } = this.getIntervals()
    const strings: string[] = []

    if (seconds) {
      if (neat && seconds === 1 && !minutes && !hours && !days) {
        strings.push('second')
      } else {
        strings.push(`${seconds} ${toPluralString('second', seconds)}`)
      }
    }

    if (minutes) {
      if (neat && minutes === 1 && !seconds && !hours && !days) {
        strings.push('minute')
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

    if (!str.includes('Every') && !str.includes('Daily') && !str.includes('Hourly')) {
      str = `Every ${str}`
    }

    if (this.anchorDate && verbose) {
      str += ` from ${formatDate(this.anchorDate)} at ${formatTimeNumeric(this.anchorDate)} (${this.timezone ?? 'UTC'})`
    }

    if (str == '') {
      str = 'None'
    }

    return str
  }

  public toResponse(): IntervalScheduleResponse {
    const date = this.anchorDate ?? new Date()
    const timezone = this.timezone ?? 'UTC'
    const utcDate = zonedTimeToUtc(date, timezone).toISOString()
    return {
      'interval': this.interval,
      'anchor_date': utcDate,
      'timezone': timezone,
    }
  }
}