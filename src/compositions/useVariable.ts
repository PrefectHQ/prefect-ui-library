import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceVariablesApi } from '@/services/WorkspaceVariablesApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseVariable = UseEntitySubscription<WorkspaceVariablesApi['getVariable'], 'variable'>

export function useVariable(variableId: string | Ref<string | null | undefined>): UseVariable {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(variableId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.deployment) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.variables.getVariable, parameters)
  const variable = computed(() => subscription.response)

  return {
    subscription,
    variable,
  }
}