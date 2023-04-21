import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, isRef, ref } from 'vue'
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
  const filterRef = isRef(filter) ? filter : ref<string[] | FlowsFilter | null | undefined>(filter)

  const api = useWorkspaceApi()
  const can = useCan()

  console.log('filter is ref', isRef(filter), filter)
  // last flow run state
  const flowsFilter = computed<[FlowsFilter] | null>(() => {
    console.log('flowsFilter updating', filterRef.value)
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