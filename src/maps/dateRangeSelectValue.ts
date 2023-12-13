import { DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue } from '@prefecthq/prefect-design'
import { differenceInSeconds, addSeconds } from 'date-fns'
import { MapFunction } from '@/services/Mapper'
import { sortDates } from '@/utilities/dates'

function nowWithoutMilliseconds(): Date {
  const now = new Date()

  now.setMilliseconds(0)

  return now
}

type DateRange = {
  startDate: Date,
  endDate: Date,
  timeSpanInSeconds: number,
}

function mapDateRangeSelectRangeValue({ startDate, endDate }: DateRangeSelectRangeValue): DateRange {
  const timeSpanInSeconds = differenceInSeconds(endDate, startDate)

  return { startDate, endDate, timeSpanInSeconds }
}

function mapDateRangeSelectSpanValue({ seconds }: DateRangeSelectSpanValue): DateRange {
  const now = nowWithoutMilliseconds()
  const then = addSeconds(now, seconds)
  const [startDate, endDate] = [now, then].sort(sortDates)

  return { startDate, endDate, timeSpanInSeconds: seconds }
}

export const mapDateRangeSelectValueToDateRange: MapFunction<NonNullable<DateRangeSelectValue>, DateRange> = (source) => {
  switch (source.type) {
    case 'range':
      return mapDateRangeSelectRangeValue(source)
    case 'span':
      return mapDateRangeSelectSpanValue(source)
    default:
      const exhaustive: never = source
      throw new Error(`No handler for DateRangeSelectValue.type: ${exhaustive}`)
  }
}