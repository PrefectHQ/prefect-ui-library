import { isDate as dateFnsIsDate } from 'date-fns'

export function isDate(value: unknown): value is Date {
  return dateFnsIsDate(value)
}