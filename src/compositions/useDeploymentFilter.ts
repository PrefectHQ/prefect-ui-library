import { useRouteQueryParam, useDebouncedRef } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, ref, Ref } from 'vue'
import { useFilter, UseFilterArgs } from './useFilter'
import { DeploymentSortValues, isDeploymentSortValue, MaybeRef, UnionFilters } from '@/types'

export type UseDeploymentFilterArgs = UseFilterArgs<DeploymentSortValues>

export function useDeploymentFilter(filters: MaybeRef<UseDeploymentFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}

export type UseDeploymentFilterFromRoute = {
  flows: Ref<string[]>,
  name: Ref<string>,
  sort: Ref<DeploymentSortValues>,
  filter: ComputedRef<UnionFilters>,
}

export function useDeploymentFilterFromRoute(filter?: MaybeRef<UseDeploymentFilterArgs>): UseDeploymentFilterFromRoute {
  const flows = useRouteQueryParam('deployment-flows', [])
  const name = useRouteQueryParam('deployment-name', '')
  const nameDebounced = useDebouncedRef(name, 500)
  const sort = useRouteQueryParam('deployment-sort', 'CREATED_DESC') as Ref<DeploymentSortValues>
  const filterRef = ref(filter)

  const deploymentFilter = computed<UseDeploymentFilterArgs>(() => {
    const filter: UseDeploymentFilterArgs = { ...filterRef.value }

    if (nameDebounced.value.length) {
      filter.deploymentName = nameDebounced
    }

    if (flows.value.length) {
      filter.flows = flows
    }

    if (isDeploymentSortValue(sort)) {
      filter.sort = sort
    }

    return filter
  })

  const unionFilter = useDeploymentFilter(deploymentFilter)

  return {
    flows,
    name,
    sort,
    filter: unionFilter,
  }
}