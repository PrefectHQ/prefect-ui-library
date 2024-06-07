import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue, watch, watchEffect } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRun, FlowRunsPaginationFilter } from '@/models'
import { WorkspaceFlowRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

type UsePaginatedFlowRuns = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRunsPaginated']>,
  flowRuns: ComputedRef<FlowRun[]>,
  count: ComputedRef<number>,
  limit: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: ComputedRef<number>,
}

export function usePaginatedFlowRuns(filter: MaybeRefOrGetter<FlowRunsPaginationFilter | null | undefined> = {}, options?: SubscriptionOptions): UsePaginatedFlowRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[FlowRunsPaginationFilter] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    return [merge({}, value)]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRunsPaginated, parameters, options)

  const flowRuns = computed(() => subscription.response?.results ?? [])
  const pages = computed(() => subscription.response?.pages ?? 0)
  const limit = computed(() => subscription.response?.limit ?? 0)
  const count = computed(() => subscription.response?.count ?? 0)
  const page = computed(() => subscription.response?.page ?? 1)

  return {
    subscription,
    flowRuns,
    pages,
    page,
    limit,
    count,
  }
}