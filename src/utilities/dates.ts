import { parse, isValid, isDate as dateFnsIsDate } from 'date-fns'
import { localization } from '@/localization'
import { secondsToApproximateString } from '@/utilities/seconds'
import { dateFunctions, toDate, formatDateInTimezone } from '@/utilities/timezone'

const dateTimeNumericFormat = 'yyyy/MM/dd hh:mm:ss a'
const timeNumericFormat = 'hh:mm:ss a'
const timeNumericShortFormat = 'hh:mm a'
const dateFormat = 'MMM do, yyyy'
const dateMonthDayFormat = 'MMM d'
const dateMonthDayYearFormat = 'MMM d, yyyy'
const dateNumericFormat = 'yyyy/MM/dd'

export {
  daysInWeek,
  daysInYear,
  maxTime,
  millisecondsInMinute,
  millisecondsInHour,
  millisecondsInSecond,
  minTime,
  minutesInHour,
  monthsInQuarter,
  monthsInYear,
  quartersInYear,
  secondsInHour,
  secondsInMinute,
  secondsInDay,
  secondsInWeek,
  secondsInYear,
  secondsInMonth,
  secondsInQuarter
} from 'date-fns'
export const hoursInDay = 24

export function parseDate(value: string, reference: Date = new Date()): Date {
  return parse(value, dateFormat, reference)
}

export function isDate(value: unknown): value is Date {
  return dateFnsIsDate(value)
}

export function isInvalidDate(value: unknown): boolean {
  return isDate(value) && !isValid(value)
}

export function sortDates(itemA: Date, itemB: Date): number {
  return itemA.getTime() - itemB.getTime()
}

export function formatDate(value: Date | string, format = dateFormat): string {
  const date = toDate(value)

  return formatDateInTimezone(date, format)
}

export function formatDateNumeric(value: Date): string {
  return formatDate(value, dateNumericFormat)
}

export function formatDateTimeNumeric(value: Date | string): string {
  return formatDate(value, dateTimeNumericFormat)
}

export function parseDateTimeNumeric(value: string, reference: Date = new Date()): Date {
  return parse(value, dateTimeNumericFormat, reference)
}

export function formatTimeNumeric(value: Date | string): string {
  return formatDate(value, timeNumericFormat)
}

export function formatTimeShortNumeric(value: Date | string): string {
  return formatDate(value, timeNumericShortFormat)
}

export function parseTimeNumeric(value: string, reference: Date = new Date()): Date {
  return parse(value, timeNumericFormat, reference)
}

export function formatDateTimeRelative(value: Date | string, comparedTo: Date | string = new Date()): string {
  const valueDate = toDate(value)
  const compareDate = toDate(comparedTo)
  const seconds = dateFunctions.differenceInSeconds(compareDate, valueDate)
  const past = dateFunctions.isBefore(valueDate, compareDate)
  const formatted = secondsToApproximateString(Math.abs(seconds))

  if (past) {
    return `${formatted} ago`
  }

  return `in ${formatted}`
}

export function formatDateTime(value: Date | string, formatTime = timeNumericShortFormat): string {
  const date = toDate(value)
  const today = new Date()
  const isToday = dateFunctions.isSameDay(date, today)
  const isTomorrow = dateFunctions.isTomorrow(date)
  const isYesterday = dateFunctions.isYesterday(date)
  const isThisYear = dateFunctions.isSameYear(date, today)

  let format: string
  let prefix = ''

  if (isThisYear) {
    if (isToday || isTomorrow || isYesterday) {
      format = formatTime

      if (isToday) {
        prefix = localization.info.today
      } else if (isTomorrow) {
        prefix = localization.info.tomorrow
      } else if (isYesterday) {
        prefix = localization.info.yesterday
      }
    } else {
      format = dateMonthDayFormat
    }
  } else {
    format = dateMonthDayYearFormat
  }

  return [prefix, formatDateInTimezone(date, format)].join(' ')
}