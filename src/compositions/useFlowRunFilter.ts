import { ComputedRef, ref, Ref } from 'vue'
import { useFilter, UseFilterArgs } from '@/compositions/useFilter'
import { UnionFilters } from '@/models/api/UnionFilters'
import { FlowRunSortValues, MaybeRef } from '@/types'
import { dateFunctions } from '@/utilities/timezone'

export type UseFlowRunFilterArgs = UseFilterArgs<FlowRunSortValues>

export function useFlowRunFilter(filters: MaybeRef<UseFlowRunFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}

export type UseRecentFlowRunFilterArgs = Omit<UseFlowRunFilterArgs, 'startDate' | 'endDate'>

export function useRecentFlowRunFilter(filters: UseRecentFlowRunFilterArgs): Ref<UnionFilters> {
  const refs = { ...filters }
  const startDate = ref<Date>(dateFunctions.subDays(dateFunctions.startOfToday(), 7))
  const endDate = ref<Date>(dateFunctions.addDays(dateFunctions.endOfToday(), 1))

  refs.sort ??= ref<FlowRunSortValues>('START_TIME_DESC')

  return useFlowRunFilter({ startDate, endDate, ...refs })
}