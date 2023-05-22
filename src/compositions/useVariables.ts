import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { Ref, computed, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { VariablesFilter } from '@/models'
import { WorkspaceVariablesApi } from '@/services'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'
import { isNullish } from '@/utilities'

export type UseVariables = UseEntitySubscription<WorkspaceVariablesApi['getVariables'], 'variables'>

export function useVariables(filter: MaybeRef<VariablesFilter>): UseVariables
export function useVariables(variableIds: MaybeRef<string[] | null | undefined>): UseVariables
export function useVariables(filter?: MaybeRef<string[] | VariablesFilter | null | undefined>): UseVariables {
  const filterRef: Ref<string[] | VariablesFilter | null | undefined> = ref(filter)

  const api = useWorkspaceApi()
  const can = useCan()

  const variablesFilter = computed<[VariablesFilter] | null>(() => {
    if (!can.read.variable) {
      return null
    }

    if (isNullish(filterRef.value)) {
      return [{}]
    }

    if (Array.isArray(filterRef.value)) {
      if (filterRef.value.length === 0) {
        return [{}]
      }

      return [
        {
          variables: {
            id: filterRef.value,
          },
        },
      ]
    }

    return [filterRef.value]
  })

  const subscription = useSubscriptionWithDependencies(api.variables.getVariables, variablesFilter)
  const variables = computed(() => subscription.response ?? [])

  return {
    subscription,
    variables,
  }
}