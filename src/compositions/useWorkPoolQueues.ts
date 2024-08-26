import { Getter } from '@prefecthq/prefect-design'
import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolQueue } from '@/models/WorkPoolQueue'
import { WorkspaceWorkPoolQueuesApi } from '@/services'

type UseWorkPoolQueues = {
  subscription: UseSubscription<WorkspaceWorkPoolQueuesApi['getWorkPoolQueues']>,
  workQueues: ComputedRef<WorkPoolQueue[]>,
}

export function useWorkPoolQueues(workPoolName: MaybeRefOrGetter<string | null | undefined>, options?: SubscriptionOptions): UseWorkPoolQueues {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[string] | null> = () => {
    if (!can.read.work_queue) {
      return null
    }

    const value = toValue(workPoolName)

    if (!value) {
      return null
    }

    return [value]
  }

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueues, parametersRef, options)
  const workQueues = computed(() => subscription.response ?? [])

  return {
    subscription,
    workQueues,
  }
}