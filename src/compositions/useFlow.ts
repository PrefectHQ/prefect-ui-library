import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Flow } from '@/models/Flow'

export function useFlow(flowId: string | Ref<string | null | undefined>): ComputedRef<Flow | undefined> {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(flowId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.flow) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flows.getFlow, parameters)
  const flow = computed(() => subscription.response)

  return flow
}