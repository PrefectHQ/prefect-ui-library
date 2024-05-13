import { DateRangeSelectValue } from '@prefecthq/prefect-design'
import {FlowRunFilter} from "@/models";

export type WorkspaceDashboardFilter = {
  range: NonNullable<DateRangeSelectValue>,
  tags: string[],
  hideSubflows?: boolean,
}