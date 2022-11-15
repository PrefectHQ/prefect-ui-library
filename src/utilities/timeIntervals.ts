import { secondsInMinute, minutesInHour, hoursInDay } from '@/utilities/dates'

export type IntervalOption = 'Seconds' | 'Minutes' | 'Hours' | 'Days'

export const intervalOptionsToSecondsMap: Record<IntervalOption, number> = {
  'Seconds': 1,
  'Minutes': secondsInMinute,
  'Hours': secondsInMinute * minutesInHour,
  'Days': secondsInMinute * minutesInHour * hoursInDay,
}


type IntervalAndRemainder = Record<'value' | 'remainder', number>
type IntervalsAndRemainders = Record<Lowercase<IntervalOption>, IntervalAndRemainder>

const calculateIntervalsAndRemainders = (interval: number): IntervalsAndRemainders => {
  const _days = interval % intervalOptionsToSecondsMap.Days
  const _hours = interval % intervalOptionsToSecondsMap.Hours
  const _minutes = interval % intervalOptionsToSecondsMap.Minutes
  const _seconds = interval % intervalOptionsToSecondsMap.Seconds

  const days = interval / intervalOptionsToSecondsMap.Days
  const hours = interval / intervalOptionsToSecondsMap.Hours
  const minutes = interval / intervalOptionsToSecondsMap.Minutes
  const seconds = interval / intervalOptionsToSecondsMap.Seconds

  return {
    days: { value: days, remainder: _days },
    hours: { value: hours, remainder: _hours },
    minutes: { value: minutes, remainder: _minutes },
    seconds: { value: seconds, remainder: _seconds },
  }
}

export const secondsToClosestIntervalValue = (interval: number): number => {
  const { days, hours, minutes, seconds } = calculateIntervalsAndRemainders(interval)

  if (days.value > 1 && !days.remainder) {
    return days.value
  } else if (hours.value > 1 && !hours.remainder) {
    return hours.value
  } else if (minutes.value > 1 && !minutes.remainder) {
    return minutes.value
  }

  return seconds.value
}

export const secondsToClosestIntervalOption = (interval: number): IntervalOption => {
  const { days, hours, minutes } = calculateIntervalsAndRemainders(interval)

  if (days.value > 1 && !days.remainder) {
    return 'Days'
  } else if (hours.value > 1 && !hours.remainder) {
    return 'Hours'
  } else if (minutes.value > 1 && !minutes.remainder) {
    return 'Minutes'
  }
  return 'Seconds'
}
