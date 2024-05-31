import { DateRangeSelectValue } from '@prefecthq/prefect-design'

export type WorkspaceDashboardFilter = {
  range: NonNullable<DateRangeSelectValue>,
  tags: string[],
  hideSubflows?: boolean,
}