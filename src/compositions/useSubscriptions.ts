import { Action, UseSubscription } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'

export type UseSubscriptions<T extends Action> = {
  subscription: Omit<UseSubscription<T>, 'promise' | 'response'> & {
    response: UseSubscription<T>['response'][],
  },
}

export function useSubscriptions<T extends Action>(subscriptions: UseSubscription<T>[]): UseSubscriptions<T> {
  const loading = computed(() => subscriptions.some(subscription => subscription.loading))
  const errored = computed(() => subscriptions.some(subscription => subscription.errored))
  const error = computed(() => subscriptions.find(subscription => subscription.errored)?.error)
  const executed = computed(() => subscriptions.some(subscription => subscription.executed))
  const response = computed(() => subscriptions.map(subscription => subscription.response))

  const unsubscribe = (): void => {
    subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  const refresh = async (): Promise<void> => {
    const promises = subscriptions.map(subscription => subscription.refresh())

    await Promise.all(promises)
  }

  const isSubscribed = (): boolean => {
    return subscriptions.every(subscription => subscription.isSubscribed())
  }

  const subscription: UseSubscriptions<T>['subscription'] = reactive({
    loading,
    errored,
    error,
    executed,
    response,
    unsubscribe,
    refresh,
    isSubscribed,
  })

  return { subscription }
}