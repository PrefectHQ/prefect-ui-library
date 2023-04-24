import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, getCurrentInstance, onUnmounted, ref, unref, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'
import { isNullish } from '@/utilities'

export type UseFlows = UseEntitySubscription<WorkspaceFlowsApi['getFlows'], 'flows'>

export function useFlows(filter: MaybeRef<FlowsFilter>): UseFlows
export function useFlows(flowIds: MaybeRef<string[] | null | undefined>): UseFlows
export function useFlows(filter?: MaybeRef<string[] | FlowsFilter | null | undefined>): UseFlows {
  const api = useWorkspaceApi()
  const can = useCan()
  const filterRef = ref<[FlowsFilter] | null>(null)

  const unwatch = watch([filter], ([filter]) => {
    filter = unref(filter)

    if (!can.read.flow) {
      filterRef.value = null
      return
    }

    if (isNullish(filter)) {
      filterRef.value = [{}]
      return
    }

    if (Array.isArray(filter)) {
      if (filter.length === 0) {
        filterRef.value = [{}]
        return
      }

      filterRef.value = [
        {
          flows: {
            id: filter,
          },
        },
      ]
      return
    }

    filterRef.value = [filter]
  }, { immediate: true, deep: true })


  const subscription = useSubscriptionWithDependencies(api.flows.getFlows, filterRef)
  const flows = computed(() => subscription.response ?? [])


  if (getCurrentInstance()) {
    onUnmounted(() => {
      subscription.unsubscribe()
      unwatch()
    })
  }

  return {
    subscription,
    flows,
  }
}