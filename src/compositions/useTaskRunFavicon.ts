import { MaybeRefOrGetter, computed, toValue } from 'vue'
import { useFavicon } from '@/compositions/useFavicon'
import { useTaskRun } from '@/compositions/useTaskRun'
import { backgroundSubscriptionManager } from '@/utilities/subscriptions'

export function useTaskRunFavicon(taskRunId: MaybeRefOrGetter<string>): void {
  const interval = 5000
  const { taskRun, subscription } = useTaskRun(taskRunId, { interval })
  const { taskRun: backgroundTaskRun } = useTaskRun(() => {
    if (subscription.paused) {
      return toValue(taskRunId)
    }

    return null
  }, { interval, manager: backgroundSubscriptionManager })

  const state = computed(() => backgroundTaskRun.value?.stateType ?? taskRun.value?.stateType)

  useFavicon(state)
}