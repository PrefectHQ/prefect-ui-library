import { isDate as dateFnsIsDate, isValid, format, parse, differenceInSeconds } from 'date-fns'
import { useAdjustedDate } from '@/compositions/useAdjustedDate'
import { secondsToApproximateString } from '@/utilities/seconds'

const dateTimeNumericFormat = 'yyyy/MM/dd hh:mm:ss a'
const timeNumericFormat = 'hh:mm:ss a'
const dateFormat = 'MMM do, yyyy'

export function parseDate(input: string, reference: Date = new Date()): Date {
  return parse(input, dateFormat, reference)
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

export function formatDate(date: Date | string): string {
  const parsed = new Date(date)
  const adjusted = useAdjustedDate(parsed)

  return format(adjusted, dateFormat)
}

export function formatDateTimeNumeric(date: Date | string): string {
  const parsed = new Date(date)
  const adjusted = useAdjustedDate(parsed)

  return format(adjusted, dateTimeNumericFormat)
}

export function parseDateTimeNumeric(input: string, reference: Date = new Date()): Date {
  return parse(input, dateTimeNumericFormat, reference)
}

export function formatTimeNumeric(date: Date | string): string {
  const parsed = new Date(date)
  const adjusted = useAdjustedDate(parsed)

  return format(adjusted, timeNumericFormat)
}

export function parseTimeNumeric(input: string, reference: Date = new Date()): Date {
  return parse(input, timeNumericFormat, reference)
}

export function formatDateTimeRelative(date: Date | string): string {
  const parsed = new Date(date)
  const seconds = differenceInSeconds(new Date(), parsed)
  const past = seconds < 0
  const formatted = secondsToApproximateString(Math.abs(seconds))

  if (past) {
    return `${formatted} ago`
  }

  return `in ${formatted}`
}