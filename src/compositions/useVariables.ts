import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { VariablesFilter } from '@/models'
import { WorkspaceVariablesApi } from '@/services'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'
import { isNullish } from '@/utilities'

export type UseVariables = UseEntitySubscription<WorkspaceVariablesApi['getVariables'], 'variables'>

export function useVariables(filter: MaybeRefOrGetter<VariablesFilter>): UseVariables
export function useVariables(variableIds: MaybeRefOrGetter<string[] | null | undefined>): UseVariables
export function useVariables(filterOrVariableIds?: MaybeRefOrGetter<string[] | VariablesFilter | null | undefined>): UseVariables {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[VariablesFilter] | null> = () => {
    if (!can.read.variable) {
      return null
    }

    const value = toValue(filterOrVariableIds)

    if (isNullish(value)) {
      return [{}]
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return [{}]
      }

      return [
        {
          variables: {
            id: value,
          },
        },
      ]
    }

    return [value]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.variables.getVariables, parameters)
  const variables = computed(() => subscription.response ?? [])

  return {
    subscription,
    variables,
  }
}