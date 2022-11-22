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
  return {
    flowRuns: () => ({ name: 'workspace.flow-runs', params: config }),
    flowRun: (flowRunId: string) => ({ name: 'workspace.flow-runs.flow-run', params: { flowRunId, ...config } }),
    flowRunRadar: (flowRunId: string) => ({ name: 'workspace.flow-runs.flow-run-radar', params: { flowRunId, ...config } }),
    taskRun: (taskRunId: string) => ({ name: 'workspace.flow-runs.task-run', params: { flowRunId: taskRunId, ...config } }),
    flows: () => ({ name: 'workspace.flows', params: config }),
    flow: (flowId: string) => ({ name: 'workspace.flows.flow', params: { flowId, ...config } }),
    deployments: () => ({ name: 'workspace.deployments', params: config }),
    deployment: (deploymentId: string) => ({ name: 'workspace.deployments.deployment', params: { deploymentId, ...config } }),
    deploymentEdit: (deploymentId: string) => ({ name: 'workspace.deployments.deployment-edit', params: { deploymentId, ...config } }),
    deploymentFlowRunCreate: (deploymentId: string) => ({ name: 'workspace.deployments.deployment-flow-run-create', params: { deploymentId, ...config } }),
    workQueues: () => ({ name: 'workspace.work-queues', params: config }),
    workQueue: (workQueueId: string) => ({ name: 'workspace.work-queues.work-queue', params: { workQueueId, ...config } }),
    workQueueCreate: () => ({ name: 'workspace.work-queues.work-queue-create', params: config }),
    workQueueEdit: (workQueueId: string) => ({ name: 'workspace.work-queues.work-queue-edit', params: { workQueueId, ...config } }),
    blocks: () => ({ name: 'workspace.blocks', params: config }),
    blocksCatalog: () => ({ name: 'workspace.blocks.catalog', params: config }),
    blocksCatalogView: (blockTypeSlug: string) => ({ name: 'workspace.blocks.catalog-view', params: { blockTypeSlug, ...config } }),
    blockCreate: (blockTypeSlug: string) => ({ name: 'workspace.blocks.block-create', params: { blockTypeSlug, ...config } }),
    block: (blockDocumentId: string) => ({ name: 'workspace.blocks.block', params: { blockDocumentId, ...config } }),
    blockEdit: (blockDocumentId: string) => ({ name: 'workspace.blocks.block-edit', params: { blockDocumentId, ...config } }),
    notifications: () => ({ name: 'workspace.notifications', params: config }),
    notificationCreate: () => ({ name: 'workspace.notifications.create', params: config }),
    notificationEdit: (notificationId: string) => ({ name: 'workspace.notifications.notification-edit', params: { notificationId, ...config } }),
  }
}

export type CreateWorkspaceRoutes = ReturnType<typeof createWorkspaceRoutes>
export const workspaceRoutesKey: InjectionKey<CreateWorkspaceRoutes> = Symbol('WorkspaceRoutes')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWorkspaceRoutes() {
  return inject(workspaceRoutesKey)
}

type WorkspaceComponent = () => Promise<RouteComponent>
type WorkspaceRoute = keyof CreateWorkspaceRoutes

export type WorkspaceRouteComponents = Record<WorkspaceRoute, WorkspaceComponent>

export function createWorkspaceRouteRecords(components: WorkspaceRouteComponents): RouteRecordRaw[] {
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