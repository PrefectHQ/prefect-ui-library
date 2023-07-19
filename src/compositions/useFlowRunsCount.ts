import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'
import { Getter } from '@/types/reactivity'

export type UseFlowRunsCount = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRunsCount']>,
  count: ComputedRef<number | undefined>,
}

export function useFlowRunsCount(filter: MaybeRefOrGetter<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRunsCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[FlowRunsFilter] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const filterValue = toValue(filter)

    if (!filterValue) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    const parameter = merge({}, filterValue)

    return [parameter]
  }

  const parameters = toRef(getter)

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRunsCount, parameters, options)
  const count = computed(() => subscription.response)

  return {
    count,
    subscription,
  }
}