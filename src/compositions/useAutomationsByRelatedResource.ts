import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { UseEntitySubscription, WorkspaceAutomationsApi } from '..'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'

export type UseResourceAutomations = UseEntitySubscription<WorkspaceAutomationsApi['getResourceAutomations'], 'automations'>

export function useAutomationsByRelatedResource(resourceId: MaybeRefOrGetter<string>): UseResourceAutomations {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters = computed<[string] | null>(() => {
    const id = toValue(resourceId)
    if (!id) {
      return null
    }

    if (!can.read.automation) {
      return null
    }

    return [id]
  })
  const subscription = useSubscriptionWithDependencies(api.automations.getResourceAutomations, parameters)
  const automations = computed(() => subscription.response)

  return {
    subscription,
    automations,
  }
}