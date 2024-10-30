import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkPoolWorker, WorkPoolWorkersPaginationFilter } from '@/models'
import { WorkspaceWorkPoolWorkersApi } from '@/services'
import { Getter } from '@/types/reactivity'

type UsePaginatedWorkPoolWorkers = {
  subscription: UseSubscription<WorkspaceWorkPoolWorkersApi['getWorkersPaginated']>,
  workers: ComputedRef<WorkPoolWorker[]>,
  count: ComputedRef<number>,
  limit: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: ComputedRef<number>,
}

export function usePaginatedWorkPoolWorkers(workPoolName: MaybeRefOrGetter<string>, filter: MaybeRefOrGetter<WorkPoolWorkersPaginationFilter | null | undefined> = {}, options?: SubscriptionOptions): UsePaginatedWorkPoolWorkers {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string, WorkPoolWorkersPaginationFilter] | null> = () => {
    if (!can.read.work_pool) {
      return null
    }

    const value = toValue(filter)
    const workPoolNameValue = toValue(workPoolName)

    if (!value) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    return [workPoolNameValue, merge({}, value)]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.workPoolWorkers.getWorkersPaginated, parameters, options)

  const workers = computed(() => subscription.response?.workers ?? [])
  const pages = computed(() => subscription.response?.pages ?? 0)
  const limit = computed(() => subscription.response?.limit ?? 0)
  const count = computed(() => subscription.response?.count ?? 0)
  const page = computed(() => subscription.response?.page ?? 1)

  return {
    subscription,
    workers,
    pages,
    page,
    limit,
    count,
  }
}