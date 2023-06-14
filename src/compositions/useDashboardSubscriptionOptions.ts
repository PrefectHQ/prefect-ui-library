import { SubscriptionOptions } from '@prefecthq/vue-compositions'

export function useDashboardSubscriptionOptions(): SubscriptionOptions {
  return {
    interval: 30000,
  }
}
