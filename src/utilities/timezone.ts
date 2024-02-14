import * as dateFns from 'date-fns'
import { formatInTimeZone, getTimezoneOffset, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { ref, computed } from 'vue'
import { isDate } from '@/utilities/dates'

export const selectedTimezone = ref<string | null>(null)

export const utcTimezone = 'Etc/UTC'
export function timezoneIsUtc(timezone: string): timezone is typeof utcTimezone {
  return timezone === utcTimezone
}

export const browserUtcOffset = -new Date().getTimezoneOffset()
export const utcOffsetMilliseconds = computed(() => selectedTimezone.value === null ? dateFns.minutesToMilliseconds(browserUtcOffset) : getTimezoneOffset(selectedTimezone.value))
export const utcOffsetMinutes = computed(() => dateFns.millisecondsToMinutes(utcOffsetMilliseconds.value))

export function assignTimezone(date: Date, timezone = selectedTimezone.value): Date {
  if (date.timezone) {
    date = unassignTimezone(date, date.timezone)
  }

  if (timezone) {
    const value = utcToZonedTime(date, timezone)

    value.timezone = timezone

    return value
  }

  return date
}

export function unassignTimezone(date: Date, timezone = selectedTimezone.value): Date {
  if (timezone) {
    const value = zonedTimeToUtc(date, timezone)

    value.timezone = undefined

    return value
  }

  return date
}

export function toDate(value: Date | string | null | undefined): Date {
  if (!value) {
    return new Date()
  }

  if (typeof value === 'string') {
    return new Date(value)
  }

  if (value.timezone) {
    return unassignTimezone(value)
  }

  return value
}

export function formatDateInTimezone(date: Date, format: string, timezone = selectedTimezone.value): string {
  if (date.timezone || !timezone) {
    return dateFns.format(date, format)
  }

  return formatInTimeZone(date, timezone, format)
}

function isRelativeDateFunction(args: unknown[]): boolean {
  return args.length === 0
}

export function now(): Date {
  return assignTimezone(new Date())
}

export function secondsFromEpoch(date?: Date | string): number {
  const value = date ? new Date(date) : now()

  return value.getTime()
}

export const dateFunctions = new Proxy({ ...dateFns }, {
  get(target, prop, receiver) {
    const property = Reflect.get(target, prop, receiver)

    if (typeof property !== 'function') {
      return property
    }

    return (...args: unknown[]) => {
      const anyDateArgsUnapplied = args.map(arg => {
        if (isDate(arg) && arg.timezone) {
          return unassignTimezone(arg, arg.timezone)
        }

        return arg
      })

      const value = property.apply(this, anyDateArgsUnapplied)

      if (!isDate(value)) {
        return value
      }

      if (isRelativeDateFunction(args)) {
        return unassignTimezone(value)
      }

      return assignTimezone(value)
    }
  },
})

/**
 * Converts a date in local time into the same date/time in a different timezone
 *
 * @param {Date} date - The date to be converted.
 * @param {string} timezone - The timezone the date should be offset to.
 * @returns {Date}
 */
export function setTimezone(date: Date, timezone: string): Date {
  const offset = date.getHours() - assignTimezone(date, timezone).getHours()
  const offsetDate = dateFns.addHours(date, offset)

  return offsetDate
}

/**
 * Converts a date in a timezone into the same date/time in a local date
 *
 * @param {Date} date - The date to be converted.
 * @param {string} timezone - The timezone the date should be offset from.
 * @returns {Date}
 */
export function unsetTimezone(date: Date, timezone: string): Date {
  const offset = date.getHours() - assignTimezone(date, timezone).getHours()
  const offsetDate = dateFns.subHours(date, offset)

  return offsetDate
}