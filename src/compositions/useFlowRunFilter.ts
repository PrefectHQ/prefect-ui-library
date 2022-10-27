import { ComputedRef, ref, Ref } from 'vue'
import { useFilter, UseFilterArgs } from './useFilter'
import { FlowRunSortValues, MaybeRef, UnionFilters } from '@/types'
import { dateFnsTz } from '@/utilities/dates'

export type UseFlowRunFilterArgs = UseFilterArgs<FlowRunSortValues>

export function useFlowRunFilter(filters: MaybeRef<UseFlowRunFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}

export type UseRecentFlowRunFilterArgs = Omit<UseFlowRunFilterArgs, 'startDate' | 'endDate'>

export function useRecentFlowRunFilter(filters: UseRecentFlowRunFilterArgs): Ref<UnionFilters> {
  const refs = { ...filters }
  const startDate = ref<Date>(dateFnsTz.subDays(dateFnsTz.startOfToday(), 7))
  const endDate = ref<Date>(dateFnsTz.addDays(dateFnsTz.endOfToday(), 1))

  refs.sort ??= ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')

  return useFlowRunFilter({ startDate, endDate, ...refs })
}