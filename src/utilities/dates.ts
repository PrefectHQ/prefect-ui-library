import * as DateFns from 'date-fns'
import { formatInTimeZone, getTimezoneOffset, utcToZonedTime as dateFnsUtcToZonedTime, zonedTimeToUtc as dateFnsZonedTimeToUtc } from 'date-fns-tz'
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
export const utcOffsetMilliseconds = computed(() => selectedTimezone.value === null ? DateFns.minutesToMilliseconds(browserUtcOffset) : getTimezoneOffset(selectedTimezone.value))
export const utcOffsetMinutes = computed(() => DateFns.millisecondsToMinutes(utcOffsetMilliseconds.value))

export function utcToZonedTime(date: Date, timezone = selectedTimezone.value): Date {
  console.log({ date, timezone })
  return timezone ? dateFnsUtcToZonedTime(date, timezone) : date
}

export function zonedTimeToUtc(date: Date, timezone = selectedTimezone.value): Date {
  return timezone ? dateFnsZonedTimeToUtc(date, timezone) : date
}

export const dateFnsTz = new Proxy({ ...DateFns }, {
  get(target, prop, receiver) {
    const method = Reflect.get(target, prop, receiver)

    return (...args: unknown[]) => {
      const unadjusted = args.map(arg => {
        if (isDate(arg) && arg.isAdjusted) {
          return utcToZonedTime(arg)
        }

        return arg
      })
      const value = method.apply(this, unadjusted)
      const adjusted = zonedTimeToUtc(value)

      adjusted.isAdjusted = true

      return adjusted
    }
  },
})

export function parseDate(value: string, reference: Date = new Date()): Date {
  return DateFns.parse(value, dateFormat, reference)
}

export function isDate(value: unknown): value is Date {
  return DateFns.isDate(value)
}

export function isInvalidDate(value: unknown): boolean {
  return isDate(value) && !DateFns.isValid(value)
}

export function sortDates(itemA: Date, itemB: Date): number {
  return itemA.getTime() - itemB.getTime()
}

export function formatDate(value: Date | string, format = dateFormat): string {
  return selectedTimezone.value ? formatInTimeZone(value, selectedTimezone.value, format) : DateFns.format(new Date(value), format)
}

export function formatDateTimeNumeric(value: Date | string): string {
  return formatDate(value, dateTimeNumericFormat)
}

export function parseDateTimeNumeric(value: string, reference: Date = new Date()): Date {
  return DateFns.parse(value, dateTimeNumericFormat, reference)
}

export function formatTimeNumeric(value: Date | string): string {
  return formatDate(value, timeNumericFormat)
}

export function parseTimeNumeric(value: string, reference: Date = new Date()): Date {
  return DateFns.parse(value, timeNumericFormat, reference)
}

export function formatDateTimeRelative(value: Date | string, comparedTo: Date | string = new Date()): string {
  const valueDate = new Date(value)
  const compareDate = comparedTo ? new Date(comparedTo) : new Date()
  const seconds = DateFns.differenceInSeconds(compareDate, valueDate)
  const past = DateFns.isBefore(valueDate, compareDate)
  const formatted = secondsToApproximateString(Math.abs(seconds))

  if (past) {
    return `${formatted} ago`
  }

  return `in ${formatted}`
}