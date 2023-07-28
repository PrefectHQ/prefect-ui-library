import { SubscriptionOptions } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef } from 'vue'
import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { FlowRunsFilter } from '@/models/Filters'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'
import { Getter } from '@/types/reactivity'
import { toPercent } from '@/utilities/numbers'

type FlowRunsAction = WorkspaceFlowRunsApi['getFlowRunsCount'] | (() => undefined)

export type UseFlowRunsCompleteness = {
  completeness: ComputedRef<number | undefined>,
  subscriptions: UseSubscriptions<FlowRunsAction>,
}

export function useFlowRunCompleteness(filter: MaybeRefOrGetter<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRunsCompleteness {
  const filterRef = toRef(filter)

  const allRunsCountFilter: Getter<FlowRunsFilter> = () => {
    const filter: FlowRunsFilter = {
      flowRuns: {
        state: {
          type: ['COMPLETED', 'FAILED', 'CRASHED'],
        },
      },
    }
    return merge({}, filterRef.value, filter)
  }
  const { count: allRunsCount, subscription: allFlowRunsCountSubscription } = useFlowRunsCount(allRunsCountFilter, options)

  const completeRunsCountFilter: Getter<FlowRunsFilter> = () => {
    const filter: FlowRunsFilter = {
      flowRuns: {
        state: {
          type: ['COMPLETED'],
        },
      },
    }
    return merge({}, filterRef.value, filter)
  }
  const { count: completeRunsCount, subscription: completeFlowRunsSubscription } = useFlowRunsCount(completeRunsCountFilter, options)

  const completeness = computed(() => {
    if (!completeRunsCount.value || !allRunsCount.value) {
      return undefined
    }

    return toPercent(completeRunsCount.value, allRunsCount.value)
  })

  const subscriptions = useSubscriptions([
    allFlowRunsCountSubscription,
    completeFlowRunsSubscription,
  ])

  return {
    completeness,
    subscriptions,
  }
}