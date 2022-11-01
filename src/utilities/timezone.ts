import * as dateFns from 'date-fns'
import { getTimezoneOffset, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { ref, computed } from 'vue'
import { isDate } from '@/utilities/dates'

export const selectedTimezone = ref<string | null>(null)

export const utcTimezone = '-00:00'
export function timezoneIsUtc(timezone: string): timezone is typeof utcTimezone {
  return timezone === utcTimezone
}

export const browserUtcOffset = -new Date().getTimezoneOffset()
export const utcOffsetMilliseconds = computed(() => selectedTimezone.value === null ? dateFns.minutesToMilliseconds(browserUtcOffset) : getTimezoneOffset(selectedTimezone.value))
export const utcOffsetMinutes = computed(() => dateFns.millisecondsToMinutes(utcOffsetMilliseconds.value))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any
type AssignTimezoneFunction = (date: Date, timezone?: string | null) => Date

export const assignTimezone: AssignTimezoneFunction = (date, timezone = selectedTimezone.value) => {
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

export const unassignTimezone: AssignTimezoneFunction = (date, timezone = selectedTimezone.value) => {
  if (timezone) {
    const value = zonedTimeToUtc(date, timezone)

    value.timezone = undefined

    return value
  }

  return date
}

function isRelativeAndAlreadyInDesiredTimezone(args: unknown[]): boolean {
  return args.length === 0
}

function proxyDateFunction(dateFunction: AnyFunction): AnyFunction {
  return new Proxy(dateFunction, {
    get(target, prop, receiver) {
      const method = Reflect.get(target, prop, receiver)

      return (...args: unknown[]) => {
        const anyDateArgsUnapplied = args.map(arg => {
          if (isDate(arg) && arg.timezone) {
            return unassignTimezone(arg, arg.timezone)
          }

          return arg
        })

        const value = method.assign(this, anyDateArgsUnapplied)

        if (isRelativeAndAlreadyInDesiredTimezone(args)) {
          return unassignTimezone(value)
        }

        return assignTimezone(value)
      }
    },
  })
}

export function now(): Date {
  return assignTimezone(new Date())
}

export function secondsFromEpoch(date?: Date | string): number {
  const value = date ? new Date(date) : now()

  return value.getTime()
}

export const { secondsInMinute, minutesInHour } = dateFns
export const hoursInDay = 24

export const add = proxyDateFunction(dateFns.add)
export const addBusinessDays = proxyDateFunction(dateFns.addBusinessDays)
export const addDays = proxyDateFunction(dateFns.addDays)
export const addHours = proxyDateFunction(dateFns.addHours)
export const addISOWeekYears = proxyDateFunction(dateFns.addISOWeekYears)
export const addMilliseconds = proxyDateFunction(dateFns.addMilliseconds)
export const addMinutes = proxyDateFunction(dateFns.addMinutes)
export const addMonths = proxyDateFunction(dateFns.addMonths)
export const addQuarters = proxyDateFunction(dateFns.addQuarters)
export const addSeconds = proxyDateFunction(dateFns.addSeconds)
export const addWeeks = proxyDateFunction(dateFns.addWeeks)
export const addYears = proxyDateFunction(dateFns.addYears)
export const areIntervalsOverlapping = proxyDateFunction(dateFns.areIntervalsOverlapping)
export const clamp = proxyDateFunction(dateFns.clamp)
export const closestIndexTo = proxyDateFunction(dateFns.closestIndexTo)
export const closestTo = proxyDateFunction(dateFns.closestTo)
export const compareAsc = proxyDateFunction(dateFns.compareAsc)
export const compareDesc = proxyDateFunction(dateFns.compareDesc)
export const daysToWeeks = proxyDateFunction(dateFns.daysToWeeks)
export const differenceInBusinessDays = proxyDateFunction(dateFns.differenceInBusinessDays)
export const differenceInCalendarDays = proxyDateFunction(dateFns.differenceInCalendarDays)
export const differenceInCalendarISOWeeks = proxyDateFunction(dateFns.differenceInCalendarISOWeeks)
export const differenceInCalendarISOWeekYears = proxyDateFunction(dateFns.differenceInCalendarISOWeekYears)
export const differenceInCalendarMonths = proxyDateFunction(dateFns.differenceInCalendarMonths)
export const differenceInCalendarQuarters = proxyDateFunction(dateFns.differenceInCalendarQuarters)
export const differenceInCalendarWeeks = proxyDateFunction(dateFns.differenceInCalendarWeeks)
export const differenceInCalendarYears = proxyDateFunction(dateFns.differenceInCalendarYears)
export const differenceInDays = proxyDateFunction(dateFns.differenceInDays)
export const differenceInHours = proxyDateFunction(dateFns.differenceInHours)
export const differenceInISOWeekYears = proxyDateFunction(dateFns.differenceInISOWeekYears)
export const differenceInMilliseconds = proxyDateFunction(dateFns.differenceInMilliseconds)
export const differenceInMinutes = proxyDateFunction(dateFns.differenceInMinutes)
export const differenceInMonths = proxyDateFunction(dateFns.differenceInMonths)
export const differenceInQuarters = proxyDateFunction(dateFns.differenceInQuarters)
export const differenceInSeconds = proxyDateFunction(dateFns.differenceInSeconds)
export const differenceInWeeks = proxyDateFunction(dateFns.differenceInWeeks)
export const differenceInYears = proxyDateFunction(dateFns.differenceInYears)
export const eachDayOfInterval = proxyDateFunction(dateFns.eachDayOfInterval)
export const eachHourOfInterval = proxyDateFunction(dateFns.eachHourOfInterval)
export const eachMinuteOfInterval = proxyDateFunction(dateFns.eachMinuteOfInterval)
export const eachMonthOfInterval = proxyDateFunction(dateFns.eachMonthOfInterval)
export const eachQuarterOfInterval = proxyDateFunction(dateFns.eachQuarterOfInterval)
export const eachWeekendOfInterval = proxyDateFunction(dateFns.eachWeekendOfInterval)
export const eachWeekendOfMonth = proxyDateFunction(dateFns.eachWeekendOfMonth)
export const eachWeekendOfYear = proxyDateFunction(dateFns.eachWeekendOfYear)
export const eachWeekOfInterval = proxyDateFunction(dateFns.eachWeekOfInterval)
export const eachYearOfInterval = proxyDateFunction(dateFns.eachYearOfInterval)
export const endOfDay = proxyDateFunction(dateFns.endOfDay)
export const endOfDecade = proxyDateFunction(dateFns.endOfDecade)
export const endOfHour = proxyDateFunction(dateFns.endOfHour)
export const endOfISOWeek = proxyDateFunction(dateFns.endOfISOWeek)
export const endOfISOWeekYear = proxyDateFunction(dateFns.endOfISOWeekYear)
export const endOfMinute = proxyDateFunction(dateFns.endOfMinute)
export const endOfMonth = proxyDateFunction(dateFns.endOfMonth)
export const endOfQuarter = proxyDateFunction(dateFns.endOfQuarter)
export const endOfSecond = proxyDateFunction(dateFns.endOfSecond)
export const endOfToday = proxyDateFunction(dateFns.endOfToday)
export const endOfTomorrow = proxyDateFunction(dateFns.endOfTomorrow)
export const endOfWeek = proxyDateFunction(dateFns.endOfWeek)
export const endOfYear = proxyDateFunction(dateFns.endOfYear)
export const endOfYesterday = proxyDateFunction(dateFns.endOfYesterday)
export const format = proxyDateFunction(dateFns.format)
export const formatDistance = proxyDateFunction(dateFns.formatDistance)
export const formatDistanceStrict = proxyDateFunction(dateFns.formatDistanceStrict)
export const formatDistanceToNow = proxyDateFunction(dateFns.formatDistanceToNow)
export const formatDistanceToNowStrict = proxyDateFunction(dateFns.formatDistanceToNowStrict)
export const formatDuration = proxyDateFunction(dateFns.formatDuration)
export const formatISO = proxyDateFunction(dateFns.formatISO)
export const formatISO9075 = proxyDateFunction(dateFns.formatISO9075)
export const formatISODuration = proxyDateFunction(dateFns.formatISODuration)
export const formatRelative = proxyDateFunction(dateFns.formatRelative)
export const formatRFC3339 = proxyDateFunction(dateFns.formatRFC3339)
export const formatRFC7231 = proxyDateFunction(dateFns.formatRFC7231)
export const fromUnixTime = proxyDateFunction(dateFns.fromUnixTime)
export const getDate = proxyDateFunction(dateFns.getDate)
export const getDay = proxyDateFunction(dateFns.getDay)
export const getDayOfYear = proxyDateFunction(dateFns.getDayOfYear)
export const getDaysInMonth = proxyDateFunction(dateFns.getDaysInMonth)
export const getDaysInYear = proxyDateFunction(dateFns.getDaysInYear)
export const getDecade = proxyDateFunction(dateFns.getDecade)
export const getDefaultOptions = proxyDateFunction(dateFns.getDefaultOptions)
export const getHours = proxyDateFunction(dateFns.getHours)
export const getISODay = proxyDateFunction(dateFns.getISODay)
export const getISOWeek = proxyDateFunction(dateFns.getISOWeek)
export const getISOWeeksInYear = proxyDateFunction(dateFns.getISOWeeksInYear)
export const getISOWeekYear = proxyDateFunction(dateFns.getISOWeekYear)
export const getMilliseconds = proxyDateFunction(dateFns.getMilliseconds)
export const getMinutes = proxyDateFunction(dateFns.getMinutes)
export const getMonth = proxyDateFunction(dateFns.getMonth)
export const getOverlappingDaysInIntervals = proxyDateFunction(dateFns.getOverlappingDaysInIntervals)
export const getQuarter = proxyDateFunction(dateFns.getQuarter)
export const getSeconds = proxyDateFunction(dateFns.getSeconds)
export const getTime = proxyDateFunction(dateFns.getTime)
export const getUnixTime = proxyDateFunction(dateFns.getUnixTime)
export const getWeek = proxyDateFunction(dateFns.getWeek)
export const getWeekOfMonth = proxyDateFunction(dateFns.getWeekOfMonth)
export const getWeeksInMonth = proxyDateFunction(dateFns.getWeeksInMonth)
export const getWeekYear = proxyDateFunction(dateFns.getWeekYear)
export const getYear = proxyDateFunction(dateFns.getYear)
export const hoursToMilliseconds = proxyDateFunction(dateFns.hoursToMilliseconds)
export const hoursToMinutes = proxyDateFunction(dateFns.hoursToMinutes)
export const hoursToSeconds = proxyDateFunction(dateFns.hoursToSeconds)
export const intervalToDuration = proxyDateFunction(dateFns.intervalToDuration)
export const intlFormat = proxyDateFunction(dateFns.intlFormat)
export const intlFormatDistance = proxyDateFunction(dateFns.intlFormatDistance)
export const isAfter = proxyDateFunction(dateFns.isAfter)
export const isBefore = proxyDateFunction(dateFns.isBefore)
export const isEqual = proxyDateFunction(dateFns.isEqual)
export const isExists = proxyDateFunction(dateFns.isExists)
export const isFirstDayOfMonth = proxyDateFunction(dateFns.isFirstDayOfMonth)
export const isFriday = proxyDateFunction(dateFns.isFriday)
export const isFuture = proxyDateFunction(dateFns.isFuture)
export const isLastDayOfMonth = proxyDateFunction(dateFns.isLastDayOfMonth)
export const isLeapYear = proxyDateFunction(dateFns.isLeapYear)
export const isMatch = proxyDateFunction(dateFns.isMatch)
export const isMonday = proxyDateFunction(dateFns.isMonday)
export const isPast = proxyDateFunction(dateFns.isPast)
export const isSameDay = proxyDateFunction(dateFns.isSameDay)
export const isSameHour = proxyDateFunction(dateFns.isSameHour)
export const isSameISOWeek = proxyDateFunction(dateFns.isSameISOWeek)
export const isSameISOWeekYear = proxyDateFunction(dateFns.isSameISOWeekYear)
export const isSameMinute = proxyDateFunction(dateFns.isSameMinute)
export const isSameMonth = proxyDateFunction(dateFns.isSameMonth)
export const isSameQuarter = proxyDateFunction(dateFns.isSameQuarter)
export const isSameSecond = proxyDateFunction(dateFns.isSameSecond)
export const isSameWeek = proxyDateFunction(dateFns.isSameWeek)
export const isSameYear = proxyDateFunction(dateFns.isSameYear)
export const isSaturday = proxyDateFunction(dateFns.isSaturday)
export const isSunday = proxyDateFunction(dateFns.isSunday)
export const isThisHour = proxyDateFunction(dateFns.isThisHour)
export const isThisISOWeek = proxyDateFunction(dateFns.isThisISOWeek)
export const isThisMinute = proxyDateFunction(dateFns.isThisMinute)
export const isThisMonth = proxyDateFunction(dateFns.isThisMonth)
export const isThisQuarter = proxyDateFunction(dateFns.isThisQuarter)
export const isThisSecond = proxyDateFunction(dateFns.isThisSecond)
export const isThisWeek = proxyDateFunction(dateFns.isThisWeek)
export const isThisYear = proxyDateFunction(dateFns.isThisYear)
export const isThursday = proxyDateFunction(dateFns.isThursday)
export const isToday = proxyDateFunction(dateFns.isToday)
export const isTomorrow = proxyDateFunction(dateFns.isTomorrow)
export const isTuesday = proxyDateFunction(dateFns.isTuesday)
export const isValid = proxyDateFunction(dateFns.isValid)
export const isWednesday = proxyDateFunction(dateFns.isWednesday)
export const isWeekend = proxyDateFunction(dateFns.isWeekend)
export const isWithinInterval = proxyDateFunction(dateFns.isWithinInterval)
export const isYesterday = proxyDateFunction(dateFns.isYesterday)
export const lastDayOfDecade = proxyDateFunction(dateFns.lastDayOfDecade)
export const lastDayOfISOWeek = proxyDateFunction(dateFns.lastDayOfISOWeek)
export const lastDayOfISOWeekYear = proxyDateFunction(dateFns.lastDayOfISOWeekYear)
export const lastDayOfMonth = proxyDateFunction(dateFns.lastDayOfMonth)
export const lastDayOfQuarter = proxyDateFunction(dateFns.lastDayOfQuarter)
export const lastDayOfWeek = proxyDateFunction(dateFns.lastDayOfWeek)
export const lastDayOfYear = proxyDateFunction(dateFns.lastDayOfYear)
export const lightFormat = proxyDateFunction(dateFns.lightFormat)
export const max = proxyDateFunction(dateFns.max)
export const milliseconds = proxyDateFunction(dateFns.milliseconds)
export const millisecondsToHours = proxyDateFunction(dateFns.millisecondsToHours)
export const millisecondsToMinutes = proxyDateFunction(dateFns.millisecondsToMinutes)
export const millisecondsToSeconds = proxyDateFunction(dateFns.millisecondsToSeconds)
export const min = proxyDateFunction(dateFns.min)
export const minutesToHours = proxyDateFunction(dateFns.minutesToHours)
export const minutesToMilliseconds = proxyDateFunction(dateFns.minutesToMilliseconds)
export const minutesToSeconds = proxyDateFunction(dateFns.minutesToSeconds)
export const monthsToQuarters = proxyDateFunction(dateFns.monthsToQuarters)
export const monthsToYears = proxyDateFunction(dateFns.monthsToYears)
export const nextDay = proxyDateFunction(dateFns.nextDay)
export const nextFriday = proxyDateFunction(dateFns.nextFriday)
export const nextMonday = proxyDateFunction(dateFns.nextMonday)
export const nextSaturday = proxyDateFunction(dateFns.nextSaturday)
export const nextSunday = proxyDateFunction(dateFns.nextSunday)
export const nextThursday = proxyDateFunction(dateFns.nextThursday)
export const nextTuesday = proxyDateFunction(dateFns.nextTuesday)
export const nextWednesday = proxyDateFunction(dateFns.nextWednesday)
export const parse = proxyDateFunction(dateFns.parse)
export const parseISO = proxyDateFunction(dateFns.parseISO)
export const parseJSON = proxyDateFunction(dateFns.parseJSON)
export const previousDay = proxyDateFunction(dateFns.previousDay)
export const previousFriday = proxyDateFunction(dateFns.previousFriday)
export const previousMonday = proxyDateFunction(dateFns.previousMonday)
export const previousSaturday = proxyDateFunction(dateFns.previousSaturday)
export const previousSunday = proxyDateFunction(dateFns.previousSunday)
export const previousThursday = proxyDateFunction(dateFns.previousThursday)
export const previousTuesday = proxyDateFunction(dateFns.previousTuesday)
export const previousWednesday = proxyDateFunction(dateFns.previousWednesday)
export const quartersToMonths = proxyDateFunction(dateFns.quartersToMonths)
export const quartersToYears = proxyDateFunction(dateFns.quartersToYears)
export const roundToNearestMinutes = proxyDateFunction(dateFns.roundToNearestMinutes)
export const secondsToHours = proxyDateFunction(dateFns.secondsToHours)
export const secondsToMilliseconds = proxyDateFunction(dateFns.secondsToMilliseconds)
export const secondsToMinutes = proxyDateFunction(dateFns.secondsToMinutes)
export const set = proxyDateFunction(dateFns.set)
export const setDate = proxyDateFunction(dateFns.setDate)
export const setDay = proxyDateFunction(dateFns.setDay)
export const setDayOfYear = proxyDateFunction(dateFns.setDayOfYear)
export const setDefaultOptions = proxyDateFunction(dateFns.setDefaultOptions)
export const setHours = proxyDateFunction(dateFns.setHours)
export const setISODay = proxyDateFunction(dateFns.setISODay)
export const setISOWeek = proxyDateFunction(dateFns.setISOWeek)
export const setISOWeekYear = proxyDateFunction(dateFns.setISOWeekYear)
export const setMilliseconds = proxyDateFunction(dateFns.setMilliseconds)
export const setMinutes = proxyDateFunction(dateFns.setMinutes)
export const setMonth = proxyDateFunction(dateFns.setMonth)
export const setQuarter = proxyDateFunction(dateFns.setQuarter)
export const setSeconds = proxyDateFunction(dateFns.setSeconds)
export const setWeek = proxyDateFunction(dateFns.setWeek)
export const setWeekYear = proxyDateFunction(dateFns.setWeekYear)
export const setYear = proxyDateFunction(dateFns.setYear)
export const startOfDay = proxyDateFunction(dateFns.startOfDay)
export const startOfDecade = proxyDateFunction(dateFns.startOfDecade)
export const startOfHour = proxyDateFunction(dateFns.startOfHour)
export const startOfISOWeek = proxyDateFunction(dateFns.startOfISOWeek)
export const startOfISOWeekYear = proxyDateFunction(dateFns.startOfISOWeekYear)
export const startOfMinute = proxyDateFunction(dateFns.startOfMinute)
export const startOfMonth = proxyDateFunction(dateFns.startOfMonth)
export const startOfQuarter = proxyDateFunction(dateFns.startOfQuarter)
export const startOfSecond = proxyDateFunction(dateFns.startOfSecond)
export const startOfToday = proxyDateFunction(dateFns.startOfToday)
export const startOfTomorrow = proxyDateFunction(dateFns.startOfTomorrow)
export const startOfWeek = proxyDateFunction(dateFns.startOfWeek)
export const startOfWeekYear = proxyDateFunction(dateFns.startOfWeekYear)
export const startOfYear = proxyDateFunction(dateFns.startOfYear)
export const startOfYesterday = proxyDateFunction(dateFns.startOfYesterday)
export const sub = proxyDateFunction(dateFns.sub)
export const subBusinessDays = proxyDateFunction(dateFns.subBusinessDays)
export const subDays = proxyDateFunction(dateFns.subDays)
export const subHours = proxyDateFunction(dateFns.subHours)
export const subISOWeekYears = proxyDateFunction(dateFns.subISOWeekYears)
export const subMilliseconds = proxyDateFunction(dateFns.subMilliseconds)
export const subMinutes = proxyDateFunction(dateFns.subMinutes)
export const subMonths = proxyDateFunction(dateFns.subMonths)
export const subQuarters = proxyDateFunction(dateFns.subQuarters)
export const subSeconds = proxyDateFunction(dateFns.subSeconds)
export const subWeeks = proxyDateFunction(dateFns.subWeeks)
export const subYears = proxyDateFunction(dateFns.subYears)
export const toDate = proxyDateFunction(dateFns.toDate)
export const weeksToDays = proxyDateFunction(dateFns.weeksToDays)
export const yearsToMonths = proxyDateFunction(dateFns.yearsToMonths)
export const yearsToQuarters = proxyDateFunction(dateFns.yearsToQuarters)