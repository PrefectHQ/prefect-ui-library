import { SubscriptionOptions } from '@prefecthq/vue-compositions'
import { InjectionKey, inject } from 'vue'

export type UseInterval = Pick<SubscriptionOptions, 'interval'>

export const subscriptionIntervalKey: InjectionKey<UseInterval> = Symbol('SubscriptionIntervalKey')

export function useInterval(defaults?: UseInterval): UseInterval | undefined {
  return inject(subscriptionIntervalKey, defaults)
}