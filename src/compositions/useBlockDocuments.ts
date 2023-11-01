import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { BlockDocumentsFilter } from '@/models'
import { WorkspaceBlockDocumentsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseBlockDocuments = UsePaginationEntity<
WorkspaceBlockDocumentsApi['getBlockDocuments'],
WorkspaceBlockDocumentsApi['getBlockDocumentsCount'],
'blockDocuments'
>

export function useBlockDocuments(filter?: MaybeRefOrGetter<BlockDocumentsFilter | null | undefined>, options?: PaginationOptions): UseBlockDocuments {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[BlockDocumentsFilter?] | null> = () => {
    if (!can.read.block) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const pagination = usePagination({
    fetchMethod: api.blockDocuments.getBlockDocuments,
    fetchParameters: parameters,
    countMethod: api.blockDocuments.getBlockDocumentsCount,
    countParameters: parameters,
    options,
  })

  return {
    ...pagination,
    blockDocuments: pagination.results,
  }
}