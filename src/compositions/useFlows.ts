import { SubscriptionOptions, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { MaybeRefOrGetter, computed, getCurrentInstance, onUnmounted, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services'
import { Getter } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlows = UseEntitySubscription<WorkspaceFlowsApi['getFlows'], 'flows'>

export function useFlows(filter: MaybeRefOrGetter<FlowsFilter | null | undefined>, options?: SubscriptionOptions): UseFlows
export function useFlows(flowIds: MaybeRefOrGetter<string[] | null | undefined>, options?: SubscriptionOptions): UseFlows
export function useFlows(filterOrFlowIds?: MaybeRefOrGetter<string[] | FlowsFilter | null | undefined>, options?: SubscriptionOptions): UseFlows {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[FlowsFilter] | null> = () => {
    if (!can.read.flow) {
      return null
    }

    const value = toValue(filterOrFlowIds)

    if (!value) {
      return null
    }

    if (Array.isArray(value)) {
      const filter: FlowsFilter = {
        flows: {
          id: value,
        },
      }

      return [filter]
    }

    return [value]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.flows.getFlows, parameters, options)
  const flows = computed(() => subscription.response ?? [])

  if (getCurrentInstance()) {
    onUnmounted(() => {
      subscription.unsubscribe()
    })
  }

  return {
    subscription,
    flows,
  }
}