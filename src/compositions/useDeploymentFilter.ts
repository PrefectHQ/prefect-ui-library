import { useRouteQueryParam, useDebouncedRef } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFilter, UseFilterArgs } from './useFilter'
import { DeploymentSortValues, isDeploymentSortValue, MaybeRef, UnionFilters } from '@/types'

export type UseDeploymentFilterArgs = UseFilterArgs<DeploymentSortValues>

export function useDeploymentFilter(filters: MaybeRef<UseDeploymentFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}

export type UseDeploymentFilterFromRoute = {
  flows: Ref<string[]>,
  name: Ref<string>,
  tags: Ref<string[]>,
  sort: Ref<DeploymentSortValues>,
  filter: ComputedRef<UnionFilters>,
  hasFilters: Ref<boolean>,
  clearFilters: () => Promise<void>,
}

export function useDeploymentFilterFromRoute(filter?: MaybeRef<UseDeploymentFilterArgs>): UseDeploymentFilterFromRoute {
  const router = useRouter()
  const flows = useRouteQueryParam('deployment-flows', [])
  const name = useRouteQueryParam('deployment-name', '')
  const tags = useRouteQueryParam('deployment-tags', [])
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

    if (tags.value.length) {
      filter.deploymentTags = tags
    }

    if (isDeploymentSortValue(sort)) {
      filter.sort = sort
    }

    return filter
  })

  const hasFilters = computed(() => {
    return !!name.value.length ||
    !!flows.value.length ||
    !!tags.value.length
  })

  async function clearFilters(): Promise<void> {
    await router.push({ query: {} })
  }

  const unionFilter = useDeploymentFilter(deploymentFilter)

  return {
    flows,
    name,
    tags,
    sort,
    filter: unionFilter,
    hasFilters,
    clearFilters,
  }
}