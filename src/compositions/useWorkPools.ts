import { Getter } from '@prefecthq/prefect-design'
import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPool, WorkPoolsFilter } from '@/models'
import { WorkspaceWorkPoolsApi } from '@/services'

type UseWorkPools = {
  subscription: UseSubscription<WorkspaceWorkPoolsApi['getWorkPools']>,
  workPools: ComputedRef<WorkPool[]>,
}

export function useWorkPools(filter: MaybeRefOrGetter<WorkPoolsFilter | null | undefined>, options?: SubscriptionOptions): UseWorkPools {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[WorkPoolsFilter] | null> = () => {
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
  const subscription = useSubscriptionWithDependencies(api.workPools.getWorkPools, parametersRef, options)
  const workPools = computed(() => subscription.response ?? [])

  return {
    subscription,
    workPools,
  }
}