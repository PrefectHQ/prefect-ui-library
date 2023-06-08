import { SubscriptionOptions, UseSubscription, useNow, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import max from 'date-fns/max'
import { ComputedRef, MaybeRef, computed, ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolWorkersFilter } from '@/models'
import { WorkspaceWorkPoolWorkersApi } from '@/services'
import { formatDateTimeRelative } from '@/utilities'

export type UseWorkPoolLastPolled = {
  subscription: UseSubscription<WorkspaceWorkPoolWorkersApi['getWorkers']>,
  lastPolled: ComputedRef<string | undefined>,
}

export function useWorkPoolLastPolled(
  workPoolName: MaybeRef<string>,
  filter?: MaybeRef<WorkPoolWorkersFilter | undefined>,
  options?: SubscriptionOptions,
): UseWorkPoolLastPolled {
  const api = useWorkspaceApi()
  const { now } = useNow({ interval: 1000 })

  const workPoolNameRef = ref(workPoolName)
  const filterRef = ref(filter)

  const finalFilters = computed<[string, WorkPoolWorkersFilter] | null>(() => {
    if (!filterRef.value) {
      return null
    }

    return [
      workPoolNameRef.value,
      filterRef.value,
    ]
  })

  const subscription = useSubscriptionWithDependencies(
    api.workPoolWorkers.getWorkers,
    finalFilters,
    options,
  )
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