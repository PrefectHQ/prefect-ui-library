import { Action, UseSubscription } from '@prefecthq/vue-compositions'
import { ComputedRef } from 'vue'

export type UseEntitySubscription<T extends Action> = {
  subscription: UseSubscription<T | (() => undefined)>,
  flowRun: ComputedRef<UseSubscription<T | (() => undefined)>['response']>,
}