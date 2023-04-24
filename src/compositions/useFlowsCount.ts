import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, getCurrentInstance, onUnmounted, ref, unref, watch } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'
import { isNullish } from '@/utilities'

export type UseFlowsCount = UseEntitySubscription<WorkspaceFlowsApi['getFlowsCount'], 'count'>

export function useFlowsCount(filter?: MaybeRef<FlowsFilter>): UseFlowsCount {
  const api = useWorkspaceApi()
  const filterRef = ref<[FlowsFilter] | null>(null)
  const can = useCan()

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

    filterRef.value = [filter]
  }, { immediate: true, deep: true })

  if (getCurrentInstance()) {
    onUnmounted(() => {
      subscription.unsubscribe()
      unwatch()
    })
  }

  const subscription = useSubscriptionWithDependencies(api.flows.getFlowsCount, filterRef)
  const count = computed(() => subscription.response)

  return {
    subscription,
    count,
  }
}