import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Deployment } from '@/models/Deployment'

export function useDeployment(deploymentId: string | Ref<string | null | undefined>): ComputedRef<Deployment | undefined> {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(deploymentId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.deployment) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.deployments.getDeployment, parameters)
  const deployment = computed(() => subscription.response)

  return deployment
}