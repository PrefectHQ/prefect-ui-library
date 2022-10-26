import { isDate as dateFnsIsDate, isValid, parse, differenceInSeconds, millisecondsToMinutes, minutesToMilliseconds, format as dateFnsFormat, isBefore } from 'date-fns'
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'
import { ref, computed } from 'vue'
import { secondsToApproximateString } from '@/utilities/seconds'

const dateTimeNumericFormat = 'yyyy/MM/dd hh:mm:ss a'
const timeNumericFormat = 'hh:mm:ss a'
const dateFormat = 'MMM do, yyyy'

export const selectedTimezone = ref<string | null>(null)

export const utcTimezone = '-00:00'
export function timezoneIsUtc(timezone: string): timezone is typeof utcTimezone {
  return timezone === utcTimezone
}

export const browserUtcOffset = -new Date().getTimezoneOffset()
export const utcOffsetMilliseconds = computed(() => selectedTimezone.value === null ? minutesToMilliseconds(browserUtcOffset) : getTimezoneOffset(selectedTimezone.value))
export const utcOffsetMinutes = computed(() => millisecondsToMinutes(utcOffsetMilliseconds.value))

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
  return selectedTimezone.value ? formatInTimeZone(value, selectedTimezone.value, format) : dateFnsFormat(new Date(value), format)
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

export function parseTimeNumeric(value: string, reference: Date = new Date()): Date {
  return parse(value, timeNumericFormat, reference)
}

export function formatDateTimeRelative(value: Date | string, comparedTo: Date | string = new Date()): string {
  const valueDate = new Date(value)
  const compareDate = comparedTo ? new Date(comparedTo) : new Date()
  const seconds = differenceInSeconds(compareDate, valueDate)
  const past = isBefore(valueDate, compareDate)
  const formatted = secondsToApproximateString(Math.abs(seconds))

  if (past) {
    return `${formatted} ago`
  }

  return `in ${formatted}`
}