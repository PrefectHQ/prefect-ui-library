import { InjectionKey } from 'vue'
import { RouteComponent, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { createWorkspaceRoutes } from '@/router/routes'

export { createWorkspaceRoutes }
export type Route = Exclude<RouteLocationRaw, string>

type WorkspaceRoutes = ReturnType<typeof createWorkspaceRoutes>
type WorkspaceRouteKey = keyof WorkspaceRoutes
type WorkspaceRoute = ReturnType<WorkspaceRoutes[WorkspaceRouteKey]>
type WorkspaceNamedRoute = WorkspaceRoute['name']

type WorkspaceRouteRecordParent = { name?: WorkspaceNamedRoute, children: WorkspaceRouteRecord[] }
type WorkspaceRouteRecordChild = { name: WorkspaceNamedRoute }
type WorkspaceRouteRecord = Omit<RouteRecordRaw, 'name' | 'children'> & WorkspaceRouteRecordParent | WorkspaceRouteRecordChild

export const workspaceRoutesKey: InjectionKey<WorkspaceRoutes> = Symbol('WorkspaceRoutes')

type WorkspaceComponent = () => Promise<RouteComponent>
type WorkspaceRouteComponents = Record<WorkspaceRouteKey, WorkspaceComponent>

export function createWorkspaceRouteRecords(components: Partial<WorkspaceRouteComponents>): WorkspaceRouteRecord[] {
  return [
    {
      path: 'dashboard',
      name: 'workspace.dashboard',
      component: components.dashboard,
    },
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
        {
          path: 'collections',
          children: [
            {
              name: 'workspace.flows.collections',
              path: '',
              component: components.flowCollections,
            },
            {
              name: 'workspace.flows.collections.collection',
              path: ':name',
              component: components.flowCollection,
            },
          ],
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
    {
      path: 'concurrency-limits',
      meta: {
        can: 'read:concurrency_limit',
      },
      children: [
        {
          name: 'workspace.concurrency-limits',
          path: '',
          component: components.concurrencyLimits,
        },
        {
          name: 'workspace.concurrency-limits.concurrency-limit',
          path: 'concurrency-limit/:concurrencyLimitId',
          component: components.concurrencyLimit,
        },
      ],
    },
    {
      path: 'artifacts',
      children: [
        {
          name: 'workspace.artifacts',
          path: '',
          component: components.artifacts,
        },
        {
          name: 'workspace.artifacts.artifact.key',
          path: 'key/:artifactKey',
          component: components.artifactKey,
        },
        {
          name: 'workspace.artifacts.artifact',
          path: 'artifact/:artifactId',
          component: components.artifact,
        },
      ],
    },
    {
      name: 'workspace.variables',
      path: 'variables',
      meta: {
        can: 'read:variable',
      },
      component: components.variables,
    },
    {
      path: 'work-pools',
      meta: {
        can: 'read:work_pool',
      },
      children: [
        {
          name: 'workspace.work-pools',
          path: '',
          component: components.workPools,
        },
        {
          path: 'work-pool/:workPoolName',
          children: [
            {
              name: 'workspace.work-pools.work-pool',
              path: '',
              component: components.workPool,
            },
            {
              name: 'workspace.work-pools.work-pool.work-pool-queue',
              path: 'queue/:workPoolQueueName',
              component: components.workPoolQueue,
              meta: {
                can: 'read:work_queue',
              },
            },
            {
              name: 'workspace.work-pools.work-pool.work-pool-queue-create',
              path: 'queue/create',
              component: components.workPoolQueueCreate,
              meta: {
                can: 'create:work_queue',
              },
            },
            {
              name: 'workspace.work-pools.work-pool.work-pool-queue-edit',
              path: 'queue/:workPoolQueueName/edit',
              component: components.workPoolQueueEdit,
              meta: {
                can: 'update:work_queue',
              },
            },
          ],
        },
        {
          name: 'workspace.work-pools.work-pool-create',
          path: 'create',
          component: components.workPoolCreate,
          meta: {
            can: 'create:work_pool',
          },
        },
        {
          name: 'workspace.work-pools.work-pool-edit',
          path: 'work-pool/:workPoolName/edit',
          component: components.workPoolEdit,
          meta: {
            can: 'update:work_pool',
          },
        },
      ],
    },
  ]
}
