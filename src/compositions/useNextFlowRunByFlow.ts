import { SubscriptionOptions, UseSubscription, useSubscription } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, MaybeRef, MaybeRefOrGetter, toRef } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { NextFlowRun } from '@/models/NextFlowRun'
import { UiApi } from '@/services'

export type UseNextFlowRunByFlow = {
  subscription: UseSubscription<UiApi['getNextRunByFlow']>,
  flowRun: ComputedRef<NextFlowRun | undefined>,
}

export function useNextFlowRunByFlow(flowId: MaybeRefOrGetter<string>, options?: MaybeRef<SubscriptionOptions>): UseNextFlowRunByFlow {
  const api = useWorkspaceApi()
  const flowIdRef = toRef(flowId)
  const subscription = useSubscription(api.ui.getNextRunByFlow, [flowIdRef], options)
  const flowRun = computed(() => subscription.response)

  return {
    subscription,
    flowRun,
  }
}