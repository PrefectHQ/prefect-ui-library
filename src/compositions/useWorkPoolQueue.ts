import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolQueue } from '@/models/WorkPoolQueue'

export function useWorkPoolQueue(workPoolQueueId: string | Ref<string | null | undefined>): ComputedRef<WorkPoolQueue | undefined> {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(workPoolQueueId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.workQueues.getWorkQueue, parameters)
  const workPoolQueue = computed(() => subscription.response)

  return workPoolQueue
}