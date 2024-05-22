import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceAutomationsApi } from '@/services/WorkspaceAutomationsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseAutomation = UseEntitySubscription<WorkspaceAutomationsApi['getAutomation'], 'automation'>

export function useAutomation(automationId: MaybeRefOrGetter<string | null | undefined>): UseAutomation {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters = computed<[string] | null>(() => {
    const automationIdValue = toValue(automationId)

    if (!automationIdValue) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [automationIdValue]
  })

  const subscription = useSubscriptionWithDependencies(api.automations.getAutomation, parameters)
  const automation = computed(() => subscription.response)

  return {
    subscription,
    automation,
  }
}