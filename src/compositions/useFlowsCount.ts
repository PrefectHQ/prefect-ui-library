import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowsCount = UseEntitySubscription<WorkspaceFlowsApi['getFlowsCount'], 'count'>

export function useFlowsCount(filter?: MaybeRefOrGetter<FlowsFilter>): UseFlowsCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[FlowsFilter] | null> = () => {
    if (!can.read.flow) {
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
  const subscription = useSubscriptionWithDependencies(api.flows.getFlowsCount, parameters)
  const count = computed(() => subscription.response)

  return {
    subscription,
    count,
  }
}