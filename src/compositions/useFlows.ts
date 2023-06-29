import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, getCurrentInstance, onUnmounted, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlows = UseEntitySubscription<WorkspaceFlowsApi['getFlows'], 'flows'>

export function useFlows(filter: MaybeRef<FlowsFilter | null | undefined>): UseFlows
export function useFlows(flowIds: MaybeRef<string[] | null | undefined>): UseFlows
export function useFlows(filter?: MaybeRef<string[] | FlowsFilter | null | undefined>): UseFlows {
  const api = useWorkspaceApi()
  const can = useCan()
  const filterRef = ref(filter)

  const parameters = computed<[FlowsFilter] | null>(() => {
    if (!filterRef.value) {
      return null
    }

    if (!can.read.flow) {
      return null
    }

    if (Array.isArray(filterRef.value)) {
      const filter: FlowsFilter = {
        flows: {
          id: filterRef.value,
        },
      }

      return [filter]
    }

    return [filterRef.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flows.getFlows, parameters)
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