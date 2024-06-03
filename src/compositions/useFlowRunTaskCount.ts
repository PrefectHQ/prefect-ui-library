import { Getter } from '@prefecthq/prefect-design'
import { SubscriptionOptions, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { UiApi } from '@/services'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowRunTaskCount = UseEntitySubscription<UiApi['getFlowRunTaskCount'], 'count'>

export function useFlowRunTaskCount(flowRunId: MaybeRefOrGetter<string | null | undefined>, options?: SubscriptionOptions): UseFlowRunTaskCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const id = toValue(flowRunId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)

  const subscription = useSubscriptionWithDependencies(api.ui.getFlowRunTaskCount, parameters, options)
  const count = computed(() => subscription.response)

  return {
    count,
    subscription,
  }
}