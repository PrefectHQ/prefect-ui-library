import { DateRangeSelectValue } from '@prefecthq/prefect-design'

export type FlowStatsFilter = {
  range: NonNullable<DateRangeSelectValue>,
  flowId: string,
}