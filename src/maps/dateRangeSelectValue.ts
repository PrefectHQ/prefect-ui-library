import { DateRangeSelectValue, mapDateRangeSelectValueToDateRange as map } from '@prefecthq/prefect-design'
import { MapFunction } from '@/services/Mapper'

type Source = NonNullable<DateRangeSelectValue>
type Target = NonNullable<ReturnType<typeof map>>

export const mapDateRangeSelectValueToDateRange: MapFunction<Source, Target> = (source) => {
  const value = map(source)

  if (!value) {
    throw new Error('Failed to map date range because value is null')
  }

  return value
}