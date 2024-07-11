import { Getter } from '@prefecthq/prefect-design'
import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolQueue, WorkQueuesFilter } from '@/models'
import { WorkspaceWorkQueuesApi } from '@/services'

type UseWorkQueues = {
  subscription: UseSubscription<WorkspaceWorkQueuesApi['getWorkQueues']>,
  workQueues: ComputedRef<WorkPoolQueue[]>,
}

export function useWorkQueues(filter: MaybeRefOrGetter<WorkQueuesFilter | null | undefined>, options?: SubscriptionOptions): UseWorkQueues {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[WorkQueuesFilter] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [merge({}, value)]
  }

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.workQueues.getWorkQueues, parametersRef, options)
  const workQueues = computed(() => subscription.response ?? [])

  return {
    subscription,
    workQueues,
  }
}