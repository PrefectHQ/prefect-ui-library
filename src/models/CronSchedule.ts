/* eslint-disable max-classes-per-file */
import { default as Cron } from 'cronstrue'
import { Options as CronstrueOptions } from 'cronstrue/dist/options'
import cronstrue from 'cronstrue/i18n'
import { Schedule } from '@/models'
import { CronKeyword, isCronKeyword, containsCronRandomExpression, cronKeywordMap } from '@/types/cron'
import { capitalize } from '@/utilities'


export interface ICronScheduleRaw {
  timezone: string | null,
  cron: string,
  dayOr: boolean | null,
}

export type ICronSchedule = ICronScheduleRaw & Schedule

// This class modifies the underlying Cron class to expose string utilities as public methods
class PublicCron extends Cron {
  public getFullDescription(): string {
    try {
      return super.getFullDescription()
    } catch {
      return ''
    }
  }

  public getSecondsDescription(): string {
    try {
      return super.getSecondsDescription()
    } catch {
      return ''
    }
  }

  public getMinutesDescription(): string {
    try {
      return super.getMinutesDescription()
    } catch {
      return ''
    }
  }

  public getHoursDescription(): string {
    try {
      return super.getHoursDescription()
    } catch {
      return ''
    }
  }

  public getTimeOfDayDescription(): string {
    try {
      return super.getTimeOfDayDescription()
    } catch {
      return ''
    }
  }

  public getDayOfMonthDescription(): string | null {
    try {
      return super.getDayOfMonthDescription()
    } catch {
      return ''
    }
  }

  public getMonthDescription(): string {
    try {
      return super.getMonthDescription()
    } catch {
      return ''
    }
  }

  public getDayOfWeekDescription(): string {
    try {
      return super.getDayOfWeekDescription()
    } catch {
      return ''
    }
  }

  public getYearDescription(): string {
    try {
      return super.getYearDescription()
    } catch {
      return ''
    }
  }

  public transformVerbosity(description: string, useVerboseFormat: boolean): string {
    return super.transformVerbosity(description, useVerboseFormat)
  }

  public constructor(expression: string, options: CronstrueOptions) {
    super(expression, options)
    this.getFullDescription()
  }
}


export class CronSchedule implements ICronSchedule {
  public timezone: string | null
  public cron: string | CronKeyword
  public dayOr: boolean | null

  public toString(
    options?: { verbose?: boolean },
  ): string {
    const { verbose = false } = options ?? {}

    let parsed = ''
    const cronInstance = new PublicCron(this.cron, {})
    const parts = this.cron.trim().split(' ')

    if (isCronKeyword(this.cron)) {
      return cronKeywordMap[this.cron]
    }

    try {
      if (parts.length < 5) {
        throw Error('Cron statement is too short')
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

  public constructor(schedule: ICronScheduleRaw) {
    this.timezone = schedule.timezone
    this.cron = schedule.cron
    this.dayOr = schedule.dayOr
  }
}
