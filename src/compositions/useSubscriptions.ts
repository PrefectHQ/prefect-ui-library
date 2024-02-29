import { Action, RefreshChannelOptions, UseSubscription } from '@prefecthq/vue-compositions'
import { MaybeRefOrGetter, computed, reactive, toValue } from 'vue'

type ExtractAction<T extends readonly UseSubscription<Action>[]> =
  { [K in keyof T]: T[K] extends UseSubscription<infer V> ? V : never }

export type UseSubscriptions<T extends Action> = {
  subscriptions: Omit<UseSubscription<T>, 'promise' | 'response' | 'error'> & {
    responses: UseSubscription<T>['response'][],
    errors: UseSubscription<T>['error'][],
  },
}

export function useSubscriptions<T extends UseSubscription<Action>[]>(subscriptions: MaybeRefOrGetter<T>): UseSubscriptions<ExtractAction<T>[number]> {
  const source = computed(() => toValue(subscriptions))
  const loading = computed(() => source.value.some(subscription => subscription.loading))
  const errored = computed(() => source.value.some(subscription => subscription.errored))
  const errors = computed(() => source.value.map(subscription => subscription.error))
  const executed = computed(() => source.value.length > 0 && source.value.every(subscription => subscription.executed))
  const responses = computed(() => source.value.map(subscription => subscription.response))
  const paused = computed(() => source.value.some(subscription => subscription.paused))
  const late = computed(() => source.value.some(subscription => subscription.late))

  const unsubscribe = (): void => {
    source.value.forEach(subscription => subscription.unsubscribe())
  }

  const refresh = async (options?: RefreshChannelOptions): Promise<void> => {
    const promises = source.value.map(subscription => subscription.refresh(options))

    await Promise.all(promises)
  }

  const isSubscribed = (): boolean => {
    return source.value.every(subscription => subscription.isSubscribed())
  }

  const response: UseSubscriptions<ExtractAction<T>[number]>['subscriptions'] = reactive({
    loading,
    errored,
    errors,
    executed,
    paused,
    late,
    responses,
    unsubscribe,
    refresh,
    isSubscribed,
  })

  return { subscriptions: response }
}