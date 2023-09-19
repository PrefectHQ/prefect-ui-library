import { Action, UseSubscription } from '@prefecthq/vue-compositions'
import { computed, reactive } from 'vue'

type ExtractAction<T extends readonly UseSubscription<Action>[]> =
  { [K in keyof T]: T[K] extends UseSubscription<infer V> ? V : never }

export type UseSubscriptions<T extends Action> = {
  subscriptions: Omit<UseSubscription<T>, 'promise' | 'response' | 'error'> & {
    responses: UseSubscription<T>['response'][],
    errors: UseSubscription<T>['error'][],
  },
}

export function useSubscriptions<T extends UseSubscription<Action>[]>(subscriptions: T): UseSubscriptions<ExtractAction<T>[number]> {
  const loading = computed(() => subscriptions.some(subscription => subscription.loading))
  const errored = computed(() => subscriptions.some(subscription => subscription.errored))
  const errors = computed(() => subscriptions.map(subscription => subscription.error))
  const executed = computed(() => subscriptions.length > 0 && subscriptions.every(subscription => subscription.executed))
  const responses = computed(() => subscriptions.map(subscription => subscription.response))

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

  const response: UseSubscriptions<ExtractAction<T>[number]>['subscriptions'] = reactive({
    loading,
    errored,
    errors,
    executed,
    responses,
    unsubscribe,
    refresh,
    isSubscribed,
  })

  return { subscriptions: response }
}