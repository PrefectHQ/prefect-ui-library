import cronstrue from 'cronstrue/i18n'
import { CronScheduleResponse, ISchedule } from '@/models'
import { CronStringLengthError } from '@/models/CronStringLengthError'
import { PublicCron } from '@/models/PublicCron'
import { CronKeyword, isCronKeyword, containsCronRandomExpression, cronKeywordMap } from '@/types/cron'
import { capitalize } from '@/utilities'


export interface ICronSchedule extends ISchedule {
  timezone: string | null,
  cron: string,
  dayOr: boolean,
}

export class CronSchedule implements ICronSchedule {
  public timezone: string | null
  public cron: string | CronKeyword
  public dayOr: boolean

  public constructor(schedule: Pick<ICronSchedule, 'cron' | 'timezone' | 'dayOr'>) {
    this.timezone = schedule.timezone
    this.cron = schedule.cron
    this.dayOr = schedule.dayOr
  }

  public get raw(): string | CronKeyword {
    return this.cron
  }

  public toString(
    { verbose = false }: { verbose?: boolean } = {},
  ): string {
    let parsed = ''
    const cronInstance = new PublicCron(this.cron, {})
    const parts = this.cron.trim().split(' ')

    if (isCronKeyword(this.cron)) {
      return cronKeywordMap[this.cron]
    }

    try {
      if (parts.length < 5) {
        throw new CronStringLengthError(parts.length)
      }


      const includesSeconds = parts.length > 5
      const startIndex = includesSeconds ? 0 : -1

      const newCron = parts.map(part => containsCronRandomExpression(part) ? '*' : part).join(' ')
      const ephemeralInstance = new PublicCron(newCron, {})

      const _time = cronInstance.getTimeOfDayDescription()
      const _dayOfMonth = cronInstance.getDayOfMonthDescription()
      const _month = cronInstance.getMonthDescription()
      const _dayOfWeek = cronInstance.getDayOfWeekDescription()

      const secondsIsRandom = includesSeconds && containsCronRandomExpression(parts[0])
      const minutesIsRandom = containsCronRandomExpression(parts[startIndex + 1])
      const hoursIsRandom = containsCronRandomExpression(parts[startIndex + 2])
      const anyTimeIsRandom = secondsIsRandom || minutesIsRandom || hoursIsRandom
      const allTimeIsRandom = includesSeconds && secondsIsRandom && minutesIsRandom && hoursIsRandom || minutesIsRandom && hoursIsRandom

      const dayOfMonthIsRandom = containsCronRandomExpression(parts[startIndex + 3])
      const monthIsRandom = containsCronRandomExpression(parts[startIndex + 4])
      const dayOfWeekIsRandom = containsCronRandomExpression(parts[startIndex + 5])
      const anyDateIsRandom = dayOfMonthIsRandom || monthIsRandom || dayOfWeekIsRandom
      const allDateIsRandom = dayOfMonthIsRandom && monthIsRandom && dayOfWeekIsRandom

      let time = anyTimeIsRandom ? ephemeralInstance.getTimeOfDayDescription() : _time
      let dayOfMonth = dayOfMonthIsRandom ? ephemeralInstance.getDayOfMonthDescription() : _dayOfMonth
      let month = monthIsRandom ? ephemeralInstance.getMonthDescription() : _month
      let dayOfWeek = dayOfWeekIsRandom ? ephemeralInstance.getDayOfWeekDescription() : _dayOfWeek

      timeRandom: if (anyTimeIsRandom) {
        const _seconds = ephemeralInstance.getSecondsDescription()
        const _minutes = ephemeralInstance.getMinutesDescription()
        const _hours = ephemeralInstance.getHoursDescription()

        if (allTimeIsRandom) {
          time = 'at a random time'
          break timeRandom
        }

        if (secondsIsRandom) {
          if (minutesIsRandom) {
            time = `at random time ${_hours}`
          } else if (hoursIsRandom) {
            time = `at random time ${_minutes}`
          } else {
            time = `at random second ${_minutes}, ${_hours}`
          }

          break timeRandom
        }

        if (minutesIsRandom) {
          if (hoursIsRandom) {
            time = `${_seconds} at a random minute and hour`
          } else {
            time = `${_seconds} at a random time ${_hours}`
          }

          break timeRandom
        }

        if (hoursIsRandom) {
          if (_seconds == 'every hour' || _minutes == 'every hour') {
            time = 'at a random hour'
          } else {
            time = `${_seconds}${_minutes} of a random hour`
          }

          break timeRandom
        }
      }

      dateRandom: if (anyDateIsRandom) {
        if (allDateIsRandom) {
          dayOfMonth = ''
          month = ''
          dayOfWeek = 'of a random day'

          break dateRandom
        }

        if (dayOfMonthIsRandom) {
          if (monthIsRandom) {
            dayOfMonth = 'of a random day'
            month = 'and month'
          } else {
            dayOfMonth = 'of a random day'
          }

          break dateRandom
        }

        if (monthIsRandom) {
          if (dayOfWeekIsRandom) {
            dayOfWeek = 'of a random day of the week'
          }

          month = 'in a random month'

          break dateRandom
        }

        if (dayOfWeekIsRandom) {
          dayOfWeek = 'of a random day of the week'

          break dateRandom
        }
      }

      const descriptionParts = []

      if (time) {
        descriptionParts.push(time)
      }

      if (dayOfWeek) {
        dayOfWeek = dayOfWeek.replace(', and', '')
      }

      if (dayOfMonth) {
        dayOfMonth = dayOfMonth.replace(', ', '')
      }

      if (dayOfWeek && dayOfMonth) {
        if (this.dayOr) {
          descriptionParts.push(dayOfWeek)
          descriptionParts.push('or')
          descriptionParts.push(dayOfMonth)
        } else {
          descriptionParts.push(dayOfWeek)
          descriptionParts.push('and')
          descriptionParts.push(dayOfMonth)
        }
      } else {
        if (dayOfWeek) {
          descriptionParts.push(dayOfWeek)
        }

        if (dayOfMonth) {
          descriptionParts.push(dayOfMonth)
        }
      }


      if (month) {
        descriptionParts.push(month)
      }

      let description

      description = descriptionParts.reduce((whole, part) => {
        if (part.startsWith(', ')) {
          whole = `${whole}${part}`
        } else {
          whole = `${whole} ${part}`
        }

        return whole.trim()
      }, '')

      description = cronInstance.transformVerbosity(description, false)
      description = capitalize(description.trim())

      parsed = description
    } catch {
      try {
        parsed = cronstrue.toString(this.cron)
      } catch {
        parsed = 'Invalid'

        return parsed
      }
    } finally {
      if (verbose) {
        parsed = `${parsed}${this.timezone ? ` (${this.timezone})` : ' (UTC)'}`
      }
    }


    return parsed
  }

  public toResponse(): CronScheduleResponse {
    return {
      'cron': this.cron,
      'timezone': this.timezone,
      'day_or': this.dayOr,
    }
  }
}
