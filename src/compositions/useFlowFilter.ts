import { useRouteQueryParam, useDebouncedRef } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useFilter, UseFilterArgs } from './useFilter'
import { FlowSortValues, isFlowSortValue, MaybeRef, UnionFilters } from '@/types'

export type UseFlowFilterArgs = UseFilterArgs<FlowSortValues>

export function useFlowFilter(filters: MaybeRef<UseFlowFilterArgs>): ComputedRef<UnionFilters> {
  return useFilter(filters)
}

export type UseFlowFilterFromRoute = {
  deployments: Ref<string[]>,
  name: Ref<string>,
  sort: Ref<FlowSortValues>,
  filter: ComputedRef<UnionFilters>,
  tags: Ref<string[]>,
}

export function useFlowFilterFromRoute(filter?: MaybeRef<UseFlowFilterArgs>): UseFlowFilterFromRoute {
  const deployments = useRouteQueryParam('flow-deployments', [])
  const name = useRouteQueryParam('flow-name', '')
  const nameDebounced = useDebouncedRef(name, 500)
  const sort = useRouteQueryParam('flow-sort', 'CREATED_DESC') as Ref<FlowSortValues>
  const tags = useRouteQueryParam('flow-tags', [])
  const filtersRef = ref(filter)

  const flowFilter = computed<UseFlowFilterArgs>(() => {
    const filter: UseFlowFilterArgs = { ...filtersRef.value }

    if (nameDebounced.value.length) {
      filter.flowName = nameDebounced
    }

    if (deployments.value.length) {
      filter.deployments = deployments
    }

    if (tags.value.length) {
      // filter.deploymentTags = tags
      filter.taskRunTags = tags
    }

    if (isFlowSortValue(sort)) {
      filter.sort = sort
    }
    return filter
  })

  const unionFilter = useFlowFilter(flowFilter)

  return {
    deployments,
    name,
    sort,
    tags,
    filter: unionFilter,
  }
}