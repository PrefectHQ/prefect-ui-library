import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { ComputedRef, ref, Ref } from 'vue'
import { useFilter } from './useFilter'
import { FlowRunSortValues, UnionFilters } from '@/types'

export type UseFlowRunFilterArgs = {
  flows?: Ref<string[]> | string[],
  flowName?: Ref<string> | string,
  deployments?: Ref<string[]> | string[],
  tags?: Ref<string[]> | string[],
  states?: Ref<string[]> | string[],
  startDate?: Ref<Date> | Date,
  endDate?: Ref<Date> | Date,
  sort?: Ref<FlowRunSortValues> | FlowRunSortValues,
  name?: Ref<string> | string,
  workQueues?: Ref<string[]> | string[],
}

export function useFlowRunFilter(filters: UseFlowRunFilterArgs): ComputedRef<UnionFilters> {
  return useFilter(filters)
}

export type UseRecentFlowRunFilterArgs = Omit<UseFlowRunFilterArgs, 'startDate' | 'endDate'>

export function useRecentFlowRunFilter(filters: UseRecentFlowRunFilterArgs): Ref<UnionFilters> {
  const refs = { ...filters }
  const startDate = ref<Date>(subDays(startOfToday(), 7))
  const endDate = ref<Date>(addDays(endOfToday(), 1))

  refs.sort ??= ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')

  return useFlowRunFilter({ startDate, endDate, ...refs })
}