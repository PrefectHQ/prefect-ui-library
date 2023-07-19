import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceVariablesApi } from '@/services/WorkspaceVariablesApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseVariable = UseEntitySubscription<WorkspaceVariablesApi['getVariable'], 'variable'>

export function useVariable(variableId: MaybeRefOrGetter<string | null | undefined>): UseVariable {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.variable) {
      return null
    }

    const id = toValue(variableId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.variables.getVariable, parameters)
  const variable = computed(() => subscription.response)

  return {
    subscription,
    variable,
  }
}