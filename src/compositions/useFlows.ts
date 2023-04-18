import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { Ref, computed, ref, unref } from 'vue'
import { isNullish } from '..'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'


export type UseFlows = UseEntitySubscription<WorkspaceFlowsApi['getFlows'], 'flows'>

export function useFlows(filter: MaybeRef<FlowsFilter>): UseFlows
export function useFlows(flowIds: MaybeRef<string[] | null | undefined>): UseFlows
export function useFlows(filter?: MaybeRef<string[] | FlowsFilter | null | undefined>): UseFlows {
  const unrefFilter = unref(filter)
  let filterRef: Ref<string[] | FlowsFilter | null | undefined>
  if (Array.isArray(unrefFilter)) {
    filterRef = ref(filter ?? [])
  }

  if (typeof unrefFilter === 'object') {
    filterRef = ref(filter ?? {})
  }

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