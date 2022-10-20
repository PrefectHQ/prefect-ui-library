import { isDate as dateFnsIsDate, isValid, parse, differenceInSeconds, millisecondsToMinutes, minutesToMilliseconds, format as dateFnsFormat, isBefore } from 'date-fns'
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'
import { ref, computed } from 'vue'
import { secondsToApproximateString } from '@/utilities/seconds'

const dateTimeNumericFormat = 'yyyy/MM/dd hh:mm:ss a'
const timeNumericFormat = 'hh:mm:ss a'
const dateFormat = 'MMM do, yyyy'

export const selectedTimezone = ref<string | null>(null)

export const browserUtcOffset = -new Date().getTimezoneOffset()
export const utcOffsetMilliseconds = computed(() => selectedTimezone.value === null ? minutesToMilliseconds(browserUtcOffset) : getTimezoneOffset(selectedTimezone.value))
export const utcOffsetMinutes = computed(() => millisecondsToMinutes(utcOffsetMilliseconds.value))

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

export function formatDate(date: Date | string, format = dateFormat): string {
  const value = new Date(date)

  return selectedTimezone.value ? formatInTimeZone(value, selectedTimezone.value, format) : dateFnsFormat(value, format)
}

export function formatDateTimeNumeric(date: Date | string): string {
  const value = new Date(date)

  return formatDate(value, dateTimeNumericFormat)
}

export function parseDateTimeNumeric(input: string, reference: Date = new Date()): Date {
  return parse(input, dateTimeNumericFormat, reference)
}

export function formatTimeNumeric(date: Date | string): string {
  const value = new Date(date)

  return formatDate(value, timeNumericFormat)
}

export function parseTimeNumeric(input: string, reference: Date = new Date()): Date {
  return parse(input, timeNumericFormat, reference)
}

export function formatDateTimeRelative(date: Date | string, comparedTo?: Date | string): string {
  const value = new Date(date)
  const compareDate = comparedTo ? new Date(comparedTo) : new Date()
  const seconds = differenceInSeconds(compareDate, value)
  const past = isBefore(value, compareDate)
  const formatted = secondsToApproximateString(Math.abs(seconds))

  if (past) {
    return `${formatted} ago`
  }

  return `in ${formatted}`
}