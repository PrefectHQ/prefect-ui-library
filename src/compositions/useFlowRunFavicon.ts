import { MaybeRefOrGetter, computed, toValue } from 'vue'
import { useFavicon } from '@/compositions/useFavicon'
import { useFlowRun } from '@/compositions/useFlowRun'
import { backgroundSubscriptionManager } from '@/utilities/subscriptions'

export function useFlowRunFavicon(flowRunId: MaybeRefOrGetter<string>): void {
  const interval = 5000
  const { flowRun, subscription } = useFlowRun(flowRunId, { interval })
  const { flowRun: backgroundFlowRun } = useFlowRun(() => {
    if (subscription.paused) {
      return toValue(flowRunId)
    }

    return null
  }, { interval, manager: backgroundSubscriptionManager })

  const state = computed(() => backgroundFlowRun.value?.stateType ?? flowRun.value?.stateType)

  useFavicon(state)
}