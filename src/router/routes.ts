import { InjectionKey } from 'vue'
import { RouteComponent, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { inject } from '@/utilities'

export type Route = Exclude<RouteLocationRaw, string>

type CreateWorkspaceRoutesConfig = {
  accountId: string,
  workspaceId: string,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createWorkspaceRoutes(config?: CreateWorkspaceRoutesConfig) {
  const { accountId, workspaceId } = config ?? {}

  return {
    flowRuns: () => ({ name: 'workspace.flow-runs', params: { accountId, workspaceId } }) as const,
    flowRun: (flowRunId: string) => ({ name: 'workspace.flow-runs.flow-run', params: { flowRunId, accountId, workspaceId } }) as const,
    flowRunRadar: (flowRunId: string) => ({ name: 'workspace.flow-runs.flow-run-radar', params: { flowRunId, accountId, workspaceId } }) as const,
    taskRun: (taskRunId: string) => ({ name: 'workspace.flow-runs.task-run', params: { flowRunId: taskRunId, accountId, workspaceId } }) as const,
    flows: () => ({ name: 'workspace.flows', params: { accountId, workspaceId } }) as const,
    flow: (flowId: string) => ({ name: 'workspace.flows.flow', params: { flowId, accountId, workspaceId } }) as const,
    deployments: () => ({ name: 'workspace.deployments', params: { accountId, workspaceId } }) as const,
    deployment: (deploymentId: string) => ({ name: 'workspace.deployments.deployment', params: { deploymentId, accountId, workspaceId } }) as const,
    deploymentEdit: (deploymentId: string) => ({ name: 'workspace.deployments.deployment-edit', params: { deploymentId, accountId, workspaceId } }) as const,
    deploymentFlowRunCreate: (deploymentId: string) => ({ name: 'workspace.deployments.deployment-flow-run-create', params: { deploymentId, accountId, workspaceId } }) as const,
    workQueues: () => ({ name: 'workspace.work-queues', params: { accountId, workspaceId } }) as const,
    workQueue: (workQueueId: string) => ({ name: 'workspace.work-queues.work-queue', params: { workQueueId, accountId, workspaceId } }) as const,
    workQueueCreate: () => ({ name: 'workspace.work-queues.work-queue-create', params: { accountId, workspaceId } }) as const,
    workQueueEdit: (workQueueId: string) => ({ name: 'workspace.work-queues.work-queue-edit', params: { workQueueId, accountId, workspaceId } }) as const,
    blocks: () => ({ name: 'workspace.blocks', params: { accountId, workspaceId } }) as const,
    blocksCatalog: () => ({ name: 'workspace.blocks.catalog', params: { accountId, workspaceId } }) as const,
    blocksCatalogView: (blockTypeSlug: string) => ({ name: 'workspace.blocks.catalog-view', params: { blockTypeSlug, accountId, workspaceId } }) as const,
    blockCreate: (blockTypeSlug: string) => ({ name: 'workspace.blocks.block-create', params: { blockTypeSlug, accountId, workspaceId } }) as const,
    block: (blockDocumentId: string) => ({ name: 'workspace.blocks.block', params: { blockDocumentId, accountId, workspaceId } }) as const,
    blockEdit: (blockDocumentId: string) => ({ name: 'workspace.blocks.block-edit', params: { blockDocumentId, accountId, workspaceId } }) as const,
    notifications: () => ({ name: 'workspace.notifications', params: { accountId, workspaceId } }) as const,
    notificationCreate: () => ({ name: 'workspace.notifications.create', params: { accountId, workspaceId } }) as const,
    notificationEdit: (notificationId: string) => ({ name: 'workspace.notifications.notification-edit', params: { notificationId, accountId, workspaceId } }) as const,
  }
}

type WorkspaceRoutes = ReturnType<typeof createWorkspaceRoutes>
type WorkspaceRouteKey = keyof WorkspaceRoutes
type WorkspaceRoute = ReturnType<WorkspaceRoutes[WorkspaceRouteKey]>
type WorkspaceNamedRoute = WorkspaceRoute['name']

type WorkspaceRouteRecordParent = { name?: WorkspaceNamedRoute, children: WorkspaceRouteRecord[] }
type WorkspaceRouteRecordChild = { name: WorkspaceNamedRoute }
type WorkspaceRouteRecord = Omit<RouteRecordRaw, 'name' | 'children'> & WorkspaceRouteRecordParent | WorkspaceRouteRecordChild

export const workspaceRoutesKey: InjectionKey<WorkspaceRoutes> = Symbol('WorkspaceRoutes')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWorkspaceRoutes() {
  return inject(workspaceRoutesKey)
}

type WorkspaceComponent = () => Promise<RouteComponent>

export type WorkspaceRouteComponents = Record<WorkspaceRouteKey, WorkspaceComponent>

export function createWorkspaceRouteRecords(components: WorkspaceRouteComponents): WorkspaceRouteRecord[] {
  return [
    {
      path: 'flow-runs',
      meta: {
        can: 'read:flow_run',
      },
      children: [
        {
          name: 'workspace.flow-runs',
          path: '',
          component: components.flowRuns,
        },
        {
          name: 'workspace.flow-runs.flow-run',
          path: 'flow-run/:flowRunId',
          component: components.flowRun,
        },
        {
          name: 'workspace.flow-runs.flow-run-radar',
          path: 'flow-run/:flowRunId/radar',
          component: components.flowRun,
        },
        {
          name: 'workspace.flow-runs.task-run',
          path: 'task-run/:taskRunId',
          component: components.taskRun,
        },
      ],
    },
    {
      path: 'flows',
      meta: {
        can: 'read:flow',
      },
      children: [
        {
          name: 'workspace.flows',
          path: '',
          component: components.flows,
        },
        {
          name: 'workspace.flows.flow',
          path: 'flow/:flowId',
          component: components.flow,
        },
      ],
    },
    {
      path: 'deployments',
      meta: {
        can: 'read:deployment',
      },
      children: [
        {
          name: 'workspace.deployments',
          path: '',
          component: components.deployments,
        },
        {
          name: 'workspace.deployments.deployment',
          path: 'deployment/:deploymentId',
          component: components.deployment,
        },
        {
          name: 'workspace.deployments.deployment-edit',
          path: 'deployment/:deploymentId/edit',
          component: components.deploymentEdit,
          meta: {
            can: 'update:deployment',
          },
        },
        {
          name: 'workspace.deployments.deployment-flow-run-create',
          path: 'deployment/:deploymentId/run',
          component: components.deploymentFlowRunCreate,
          meta: {
            can: 'run:deployment',
          },
        },
      ],
    },
    {
      path: 'work-queues',
      meta: {
        can: 'read:work_queue',
      },
      children: [
        {
          name: 'workspace.work-queues',
          path: '',
          component: components.workQueues,
        },
        {
          name: 'workspace.work-queues.work-queue-create',
          path: 'create',
          component: components.workQueueCreate,
          meta: {
            can: 'create:work_queue',
          },
        },
        {
          name: 'workspace.work-queues.work-queue',
          path: 'work-queue/:workQueueId',
          component: components.workQueue,
        },
        {
          name: 'workspace.work-queues.work-queue-edit',
          path: 'work-queue/:workQueueId/edit',
          component: components.workQueueEdit,
          meta: {
            can: 'update:work_queue',
          },
        },
      ],
    },
    {
      path: 'blocks',
      meta: {
        can: 'read:block',
      },
      children: [
        {
          name: 'workspace.blocks',
          path: '',
          component: components.blocks,
        },
        {
          name: 'workspace.blocks.catalog',
          path: 'catalog',
          component: components.blocksCatalog,
          meta: {
            can: 'create:block',
          },
        },
        {
          name: 'workspace.blocks.catalog-view',
          path: 'catalog/:blockTypeSlug',
          component: components.blocksCatalogView,
          meta: {
            can: 'create:block',
          },
        },
        {
          name: 'workspace.blocks.block-create',
          path: 'catalog/:blockTypeSlug/create',
          component: components.blockCreate,
          meta: {
            can: 'create:block',
          },
        },
        {
          name: 'workspace.blocks.block',
          path: 'block/:blockDocumentId',
          component: components.block,
        },
        {
          name: 'workspace.blocks.block-edit',
          path: 'block/:blockDocumentId/edit',
          component: components.blockEdit,
          meta: {
            can: 'update:block',
          },
        },
      ],
    },
    {
      path: 'notifications',
      meta: {
        can: 'read:notification_policy',
      },
      children: [
        {
          name: 'workspace.notifications',
          path: '',
          component: components.notifications,
        },
        {
          name: 'workspace.notifications.create',
          path: 'create',
          component: components.notificationCreate,
          meta: {
            can: 'create:notification_policy',
          },
        },
        {
          name: 'workspace.notifications.notification-edit',
          path: ':notificationId/edit',
          component: components.notificationEdit,
          meta: {
            can: 'update:notification_policy',
          },
        },
      ],
    },
  ]
}