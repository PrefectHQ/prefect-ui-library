import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Flow, FlowsPaginationFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services'
import { Getter } from '@/types/reactivity'

type UseFlows = {
  subscription: UseSubscription<WorkspaceFlowsApi['getFlowsPaginated']>,
  flows: ComputedRef<Flow[]>,
  count: ComputedRef<number>,
  limit: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: ComputedRef<number>,
}

export function useFlows(filter?: MaybeRefOrGetter<FlowsPaginationFilter | null | undefined>, options?: SubscriptionOptions): UseFlows {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[FlowsPaginationFilter] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.flows.getFlowsPaginated, parameters, options)

  const flows = computed(() => subscription.response?.results ?? [])
  const pages = computed(() => subscription.response?.pages ?? 0)
  const limit = computed(() => subscription.response?.limit ?? 0)
  const count = computed(() => subscription.response?.count ?? 0)
  const page = computed(() => subscription.response?.page ?? 1)

  return {
    subscription,
    flows,
    pages,
    page,
    limit,
    count,
  }
}