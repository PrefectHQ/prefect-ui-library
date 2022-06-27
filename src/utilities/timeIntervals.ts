import { minutesInHour, secondsInMinute } from 'date-fns'

export const hoursInDay = 24

export type IntervalOption = 'Seconds' | 'Minutes' | 'Hours' | 'Days'

export const intervalOptionsToSecondsMap: Record<IntervalOption, number> = {
  'Seconds': 1,
  'Minutes': secondsInMinute,
  'Hours': secondsInMinute * minutesInHour,
  'Days': secondsInMinute * minutesInHour * hoursInDay,
}

export const secondsToClosestIntervalValue = (interval: number): number => {
  const days = interval / intervalOptionsToSecondsMap.Days
  const hours = interval / intervalOptionsToSecondsMap.Hours
  const minutes = interval / intervalOptionsToSecondsMap.Minutes
  const seconds = interval / intervalOptionsToSecondsMap.Seconds

  if (days > 1) {
    return days
  } else if (hours > 1) {
    return hours
  } else if (minutes > 1) {
    return minutes
  }

  return seconds
}

export const secondsToClosestIntervalOption = (interval: number): IntervalOption => {
  const days = interval / intervalOptionsToSecondsMap.Days
  const hours = interval / intervalOptionsToSecondsMap.Hours
  const minutes = interval / intervalOptionsToSecondsMap.Minutes

  if (days > 1) {
    return 'Days'
  } else if (hours > 1) {
    return 'Hours'
  } else if (minutes > 1) {
    return 'Minutes'
  }
  return 'Seconds'
}
