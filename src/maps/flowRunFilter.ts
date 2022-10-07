import { parseDateTimeNumeric } from '@prefecthq/prefect-design'
import { UseFlowRunFilterArgs } from '@/compositions/useFlowRunFilter'
import { SavedSearchFilter } from '@/models/SavedSearch'
import { MapFunction } from '@/services/Mapper'
import { asArray } from '@/utilities/arrays'
import { isString } from '@/utilities/strings'

export const mapSavedSearchFilterToUseFlowRunFilterArgs: MapFunction<SavedSearchFilter, UseFlowRunFilterArgs> = function(source: SavedSearchFilter): UseFlowRunFilterArgs {
  return {
    flows: source.flow ? asArray(source.flow) : undefined,
    deployments: source.deployment ? asArray(source.deployment) : undefined,
    tags: source.tag ? asArray(source.tag) : undefined,
    states: source.state ? asArray(source.state) : undefined,
    startDate: isString(source.startDate) ? parseDateTimeNumeric(source.startDate) : undefined,
    endDate: isString(source.endDate) ? parseDateTimeNumeric(source.endDate) : undefined,
  }
}