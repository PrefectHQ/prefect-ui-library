import { SubscriptionOptions, UseSubscription, useNow, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import max from 'date-fns/max'
import { ComputedRef, MaybeRef, computed, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceWorkPoolWorkersApi } from '@/services'
import { formatDateTimeRelative } from '@/utilities'

export type UseWorkPoolLastPolled = {
  subscription: UseSubscription<WorkspaceWorkPoolWorkersApi['getWorkers']>,
  lastPolled: ComputedRef<string | undefined>,
}

export function useWorkPoolLastPolled(workPoolName: MaybeRef<string | null | undefined>, options?: SubscriptionOptions): UseWorkPoolLastPolled {
  const api = useWorkspaceApi()
  const can = useCan()
  const workPoolNameRef = ref(workPoolName)
  const { now } = useNow({ interval: 1000 })

  const finalFilters = computed<[string] | null>(() => {
    if (!can.read.work_pool) {
      return null
    }

    if (!workPoolNameRef.value) {
      return null
    }

    return [workPoolNameRef.value]
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