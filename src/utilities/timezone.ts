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
    const method = Reflect.get(target, prop, receiver)

    return (...args: unknown[]) => {
      const anyDateArgsUnapplied = args.map(arg => {
        if (isDate(arg) && arg.timezone) {
          return unassignTimezone(arg, arg.timezone)
        }

        return arg
      })

      const value = method.apply(this, anyDateArgsUnapplied)

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