import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseDeployment = UseEntitySubscription<WorkspaceDeploymentsApi['getDeployment'], 'deployment'>

export function useDeployment(deploymentId: string | Ref<string | null | undefined>): UseDeployment {
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

  return {
    subscription,
    deployment,
  }
}