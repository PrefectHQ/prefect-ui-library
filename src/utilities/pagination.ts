import { MaybeRefOrGetter } from 'vue'
import { useWorkspaceApi } from '..'
import { DeploymentsFilter } from '@/models/Filters'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'

type PaginationFilter = {
  limit?: number,
  offset?: number,
}

type PaginationAction = (filter: PaginationFilter) => unknown

type UsePagination<T extends PaginationAction> = (filter: Parameters<T>[0]) => {

}

export function usePagination<T extends PaginationAction>(action: T, filter: MaybeRefOrGetter<Parameters<T>[0]>): UsePagination<T> {

}

function useDeployments(filter?: MaybeRefOrGetter<DeploymentsFilter>): UsePagination<WorkspaceDeploymentsApi['getDeployments']> {
  const api = useWorkspaceApi()

  return usePagination(api.deployments.getDeployments, filter)
}