import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseDeployment = UseEntitySubscription<WorkspaceDeploymentsApi['getDeployment'], 'deployment'>

export function useDeployment(deploymentId: MaybeRefOrGetter<string | null | undefined>): UseDeployment {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.deployment) {
      return null
    }

    const id = toValue(deploymentId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.deployments.getDeployment, parameters)
  const deployment = computed(() => subscription.response)

  return {
    subscription,
    deployment,
  }
}