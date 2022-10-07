import { parseDateTimeNumeric } from '@prefecthq/prefect-design'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { StateType } from '@/models/StateType'
import { MapFunction } from '@/services/Mapper'
import { FlowRunFilters } from '@/types/filter'
import { asArray } from '@/utilities/arrays'
import { isString } from '@/utilities/strings'

export const mapSavedSearchFilterToFlowRunFilters: MapFunction<SavedSearchFilter, FlowRunFilters> = function(source: SavedSearchFilter): FlowRunFilters {
  return {
    flow: source.flow ? asArray(source.flow) : undefined,
    deployment: source.deployment ? asArray(source.deployment) : undefined,
    tag: source.tag ? asArray(source.tag) : undefined,
    state: source.state ? asArray(source.state) as StateType[] : undefined,
    startDate: isString(source.startDate) ? parseDateTimeNumeric(source.startDate) : undefined,
    endDate: isString(source.endDate) ? parseDateTimeNumeric(source.endDate) : undefined,
  }
}