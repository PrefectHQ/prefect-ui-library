import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { DeploymentsFilter } from '@/models'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseDeploymentsCount = UseEntitySubscription<WorkspaceDeploymentsApi['getDeploymentsCount'], 'count'>

/** @deprecated prefer to use the dedicated /ui/flows/count-deployments bulk endpoint since this is an expensive bespoke query */
export function useDeploymentsCount(filter?: MaybeRefOrGetter<DeploymentsFilter>): UseDeploymentsCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[DeploymentsFilter] | null> = () => {
    if (!can.read.deployment) {
      return null
    }

    const filterValue = toValue(filter)

    if (!filterValue) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    const parameter = merge({}, filterValue)

    return [parameter]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.deployments.getDeploymentsCount, parameters)
  const count = computed(() => subscription.response)

  return {
    subscription,
    count,
  }
}