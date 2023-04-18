import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { Ref, computed, ref } from 'vue'
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
  const filterRef: Ref<string[] | FlowsFilter | null | undefined> = ref(filter)

  const api = useWorkspaceApi()
  const can = useCan()

  const flowsFilter = computed<[FlowsFilter] | null>(() => {
    if (!can.read.flow) {
      return null
    }

    if (isNullish(filterRef.value)) {
      return [{}]
    }

    if (Array.isArray(filterRef.value)) {
      if (filterRef.value.length === 0) {
        return [{}]
      }

      return [
        {
          flows: {
            id: filterRef.value,
          },
        },
      ]
    }

    return [filterRef.value]
  })


  const subscription = useSubscriptionWithDependencies(api.flows.getFlows, flowsFilter)
  const flows = computed(() => subscription.response ?? [])

  return {
    subscription,
    flows,
  }
}