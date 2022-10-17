import { ComputedRef } from 'vue'
import { useFilter, UseFilterArgs } from './useFilter'
import { DeploymentSortValues, MaybeRef, UnionFilters } from '@/types'

export type UseDeploymentFilterArgs = UseFilterArgs<DeploymentSortValues>

export function useDeploymentFilter(filters: MaybeRef<UseDeploymentFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}