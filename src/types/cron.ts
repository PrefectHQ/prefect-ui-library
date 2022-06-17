import { AnyCase, NumberRange } from '@/types'

export const CronKeywords = [
  '@midnight',
  '@hourly',
  '@daily',
  '@weekly',
  '@monthly',
  '@yearly',
  '@annually',
] as const

const MonthValuesShort = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const

const MonthValuesLong = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
] as const

export type CronMonthValuesAlt = AnyCase<typeof MonthValuesShort[number] | typeof MonthValuesLong[number]>

export type CronWildcard = '*'
export type CronList = ','
export type CronRange = '-'
export type CronStep = '/'

export type CronMinuteValueMin = 0
export type CronMinuteValueMax = 59
export type CronMinuteValue = NumberRange<CronMinuteValueMin, CronMinuteValueMax>[number]

export type CronHourValueMin = 0
export type CronHourValueMax = 23
export type CronHourValue = NumberRange<CronHourValueMin, CronHourValueMax>[number]

export type CronDayMonthValueMin = 1
export type CronDayMonthValueMax = 31
export type CronDayMonthValue = NumberRange<CronDayMonthValueMin, CronDayMonthValueMax>[number]

export type CronMonthValueMin = 1
export type CronMonthValueMax = 12
export type CronMonthValue = NumberRange<CronMonthValueMin, CronMonthValueMax>[number]

export type CronDayWeekValueMin = 0
export type CronDayWeekValueMax = 6
export type CronDayWeekValue = NumberRange<CronDayWeekValueMin, CronDayWeekValueMax>[number]


export const CronMinuteValues = [] as const

export type CronKeyword = typeof CronKeywords[number]
export type CronRandomExpression = AnyCase<'R' | 'RANDOM'>
export type CronString = string | CronKeyword

export type CronKeywordMap = Record<CronKeyword, string>

export const cronKeywordMap: CronKeywordMap = {
  '@midnight': 'Daily',
  '@hourly': 'Hourly',
  '@daily': 'Daily',
  '@weekly': 'Weekly',
  '@monthly': 'Monthly',
  '@yearly': 'Yearly',
  '@annually': 'Yearly',
} as const

export function isCronKeyword(cron: string | CronKeyword): cron is CronKeyword {
  return cron in cronKeywordMap
}

export function containsCronRandomExpression(cron: CronString): boolean {
  if (!cron) {
    return false
  }
  const parts = cron.split(' ')
  return parts.some((part): part is CronRandomExpression => part.toUpperCase() == 'R' || part.toUpperCase() == 'RANDOM')
}