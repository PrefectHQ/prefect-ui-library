import { ComputedRef } from 'vue'
import { useFilter, UseFilterArgs } from './useFilter'
import { FlowSortValues, MaybeRef, UnionFilters } from '@/types'

export type UseFlowFilterArgs = UseFilterArgs<FlowSortValues>

export function useFlowFilter(filters: MaybeRef<UseFlowFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}