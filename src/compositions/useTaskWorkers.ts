import { MaybeReadonly } from '@prefecthq/prefect-design'
import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { TaskWorker, TaskWorkerFilter } from '@/models'
import { WorkspaceTaskWorkersApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseTaskRuns = {
  subscription: UseSubscription<WorkspaceTaskWorkersApi['getTaskWorkers']>,
  workers: ComputedRef<TaskWorker[]>,
}

export function useTaskWorkers(filter?: MaybeRefOrGetter<MaybeReadonly<TaskWorkerFilter> | null | undefined>, options?: PaginationOptions): UseTaskRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[TaskWorkerFilter] | null> = () => {
    if (!can.read.workers) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.taskWorkers.getTaskWorkers, parametersRef, options)
  const workers = computed(() => subscription.response ?? [])

  return {
    subscription,
    workers,
  }
}

const vals = [
  'read:account_role',
  'bypass:sso',
  'delete:account_role',
  'update:billing',
  'read:team',
  'create:audit_event',
  'delete:workspace_role',
  'update:invitation',
  'read:sso',
  'delete:bot',
  'update:account',
  'create:account_role',
  'update:team',
  'update:workspace_invitation',
  'create:workspace_invitation',
  'read:workspace_role',
  'read:workspace',
  'update:bot',
  'delete:account_membership',
  'read:audit_event',
  'read:invitation',
  'read:billing',
  'delete:account',
  'update:workspace_role',
  'create:workspace',
  'delete:team',
  'delete:workspace',
  'create:team',
  'create:invitation',
  'read:bot',
  'create:bot',
  'administrate:sso',
  'update:account_role',
  'update:account_membership',
  'read:account_membership',
  'administrate:workspace',
  'create:workspace_role',
  'read:workspace_invitation',
  'read:account',
]

const vals2 = [
  'see_flows',
  'manage_saved_search',
  'run_flows',
  'manage_flows',
  'run_tasks',
  'see_blocks',
  'see_secret_blocks',
  'manage_blocks',
  'see_deployments',
  'run_deployments',
  'write_deployments',
  'manage_deployments',
  'see_notifications',
  'write_notifications',
  'manage_notifications',
  'see_workspace_settings',
  'write_workspace_settings',
  'manage_workspace_settings',
  'see_workspace_users',
  'manage_workspace_users',
  'see_workspace_service_accounts',
  'manage_workspace_service_accounts',
  'manage_workspace_teams',
  'see_work_queues',
  'write_work_queues',
  'manage_work_queues',
  'see_concurrency_limits',
  'manage_concurrency_limits',
  'see_events',
  'manage_events',
  'see_automations',
  'manage_automations',
  'see_work_pools',
  'write_work_pools',
  'manage_work_pools',
  'see_workers',
  'write_workers',
  'manage_workers',
  'see_artifacts',
  'write_artifacts',
  'manage_artifacts',
  'see_variables',
  'write_variables',
  'manage_variables',
  'manage_acls',
  'see_incidents',
  'write_incidents',
  'manage_incidents',
]