import { formatDate, formatTimeNumeric, toPluralString } from '@prefecthq/prefect-design'
import { minutesInHour, secondsInMinute } from 'date-fns'
import { ISchedule } from '@/models'
import { floor } from '@/utilities/math'


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
}