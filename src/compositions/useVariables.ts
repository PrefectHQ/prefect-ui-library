import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { VariablesFilter } from '@/models'
import { WorkspaceVariablesApi } from '@/services'
import { Getter } from '@/types/reactivity'
import { isNullish } from '@/utilities'

export type UseVariables = UsePaginationEntity<
WorkspaceVariablesApi['getVariables'],
WorkspaceVariablesApi['getVariablesCount'],
'variables'
>

export function useVariables(filter: MaybeRefOrGetter<VariablesFilter>, options?: PaginationOptions): UseVariables
export function useVariables(variableIds: MaybeRefOrGetter<string[] | null | undefined>, options?: PaginationOptions): UseVariables
export function useVariables(filterOrVariableIds?: MaybeRefOrGetter<string[] | VariablesFilter | null | undefined>, options?: PaginationOptions): UseVariables {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[VariablesFilter] | null> = () => {
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

  const pagination = usePagination({
    fetchMethod: api.variables.getVariables,
    fetchParameters: parameters,
    countMethod: api.variables.getVariablesCount,
    countParameters: parameters,
    options,
  })

  return {
    ...pagination,
    variables: pagination.results,
  }
}