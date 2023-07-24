import { SubscriptionOptions, UseSubscription, useNow, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import max from 'date-fns/max'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolWorkersApi } from '@/services'
import { Getter } from '@/types/reactivity'
import { formatDateTimeRelative } from '@/utilities'

export type UseWorkPoolLastPolled = {
  subscription: UseSubscription<WorkspaceWorkPoolWorkersApi['getWorkers']>,
  lastPolled: ComputedRef<string | undefined>,
}

export function useWorkPoolLastPolled(workPoolName: MaybeRefOrGetter<string | null | undefined>, options?: SubscriptionOptions): UseWorkPoolLastPolled {
  const api = useWorkspaceApi()
  const can = useCan()
  const { now } = useNow({ interval: 1000 })

  const getter: Getter<[string] | null> = () => {
    if (!can.read.work_pool) {
      return null
    }

    const name = toValue(workPoolName)

    if (!name) {
      return null
    }

    return [name]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.workPoolWorkers.getWorkers, parameters, options)
  const workPoolWorkers = computed(() => subscription.response ?? [])

  const lastWorkerHeartbeat = computed(() => {
    const heartbeats = workPoolWorkers.value.map(worker => worker.lastHeartbeatTime)

    if (heartbeats.length === 0) {
      return null
    }

    return max(heartbeats)
  })

  const lastPolled = computed(() => {
    if (lastWorkerHeartbeat.value === null) {
      return undefined
    }

    return formatDateTimeRelative(lastWorkerHeartbeat.value, now.value)
  })

  return {
    subscription,
    lastPolled,
  }
}