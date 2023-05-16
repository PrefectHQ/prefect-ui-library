import { SubscriptionOptions } from '@prefecthq/vue-compositions'
import { ComputedRef, computed, ref } from 'vue'
import { MaybeRef, PrefectStateNames } from '@/types'

type StateResource = {
  stateName: string | null,
}

const stateNamesThatShouldPoll: (string | null)[] = ['Pending', 'Running'] satisfies PrefectStateNames[]

export function useStatePolling(stateName: MaybeRef<string | null>, interval?: number): ComputedRef<SubscriptionOptions>
export function useStatePolling(resource: MaybeRef<StateResource>, interval?: number): ComputedRef<SubscriptionOptions>
export function useStatePolling(resourceOrStateName: MaybeRef<StateResource | string | null>, interval: number = 5000): ComputedRef<SubscriptionOptions> {
  const argRef = ref(resourceOrStateName)

  const shouldPoll = computed(() => {
    const arg = argRef.value

    if (arg === null) {
      return false
    }

    if (typeof arg === 'object') {
      return stateNamesThatShouldPoll.includes(arg.stateName)
    }

    return stateNamesThatShouldPoll.includes(arg)
  })

  return computed<SubscriptionOptions>(() => ({
    interval: shouldPoll.value ? interval : undefined,
  }))
}