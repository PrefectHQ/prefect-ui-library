import { LocationQuery } from 'vue-router'
import { AutomationAction } from '@/automations/types/actions'
import { CreateAutomationQuery } from '@/automations/types/createAutomationQuery'
import { WorkspaceEvent } from '@/models'
import { mapper } from '@/services/Mapper'
import { formatRouteDate } from '@/utilities/dates'

type CreateWorkspaceRoutesConfig = {
  accountId: string,
  workspaceId: string,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createWorkspaceRoutes(config?: CreateWorkspaceRoutesConfig) {
  return {
    automations: () => ({ name: 'workspace.automations', params: { ...config } }) as const,
    automation: (automationId: string) => ({ name: 'workspace.automation.view', params: { ...config, automationId } }) as const,
    automationCreate: (automationQuery?: CreateAutomationQuery) => {
      const query = mapper.map('CreateAutomationQuery', automationQuery, 'LocationQuery')

      return {
        name: 'workspace.automation.create',
        params: { ...config },
        query,
      } as const
    },
    automationEdit: (automationId: string) => ({ name: 'workspace.automation.edit', params: { ...config, automationId } }) as const,
    automateEvent: (event: WorkspaceEvent, actions?: AutomationAction[]) => {
      const query = mapper.map('CreateAutomationQuery', { from: 'event', event, actions }, 'LocationQuery')

      return {
        name: 'workspace.automation.create',
        params: { ...config },
        query,
      } as const
    },
    automateFlow: (flowId: string, actions?: AutomationAction[]) => {
      const query = mapper.map('CreateAutomationQuery', { from: 'flow', flowId, actions }, 'LocationQuery')

      return {
        name: 'workspace.automation.create',
        params: { ...config },
        query,
      } as const
    },
    automateWorkPool: (workPoolId: string, actions?: AutomationAction[]) => {
      const query = mapper.map('CreateAutomationQuery', { from: 'workPool', workPoolId, actions }, 'LocationQuery')

      return {
        name: 'workspace.automation.create',
        params: { ...config },
        query,
      } as const
    },
    automateWorkPoolQueue: (workPoolQueueId: string, actions?: AutomationAction[]) => {
      const query = mapper.map('CreateAutomationQuery', { from: 'workPoolQueue', workPoolQueueId, actions }, 'LocationQuery')

      return {
        name: 'workspace.automation.create',
        params: { ...config },
        query,
      } as const
    },
    events: () => ({ name: 'workspace.events' }) as const,
    event: (eventId: string, eventDate: Date) => {

      return { name: 'workspace.event', params: { eventId, eventDate: formatRouteDate(eventDate) } } as const
    },
    artifact: (artifactId: string) => ({ name: 'workspace.artifacts.artifact', params: { artifactId, ...config } }) as const,
    artifactKey: (artifactKey: string) => ({ name: 'workspace.artifacts.artifact.key', params: { artifactKey, ...config } }) as const,
    artifacts: () => ({ name: 'workspace.artifacts', params: { ...config } }) as const,
    dashboard: () => ({ name: 'workspace.dashboard', params: { ...config } }) as const,
    runs: (query?: { tab?: string }) => ({ name: 'workspace.runs', params: { ...config }, query }) as const,
    /** @deprecated use workspace.runs instead */
    flowRuns: () => ({ name: 'workspace.flow-runs', params: { ...config } }) as const,
    flowRun: (flowRunId: string) => ({ name: 'workspace.runs.flow-run', params: { flowRunId, ...config } }) as const,
    taskRun: (taskRunId: string) => ({ name: 'workspace.runs.task-run', params: { taskRunId, ...config } }) as const,
    flows: () => ({ name: 'workspace.flows', params: { ...config } }) as const,
    flow: (flowId: string) => ({ name: 'workspace.flows.flow', params: { flowId, ...config } }) as const,
    flowCollections: () => ({ name: 'workspace.flows.collections', params: { ...config } }) as const,
    flowCollection: (name: string) => ({ name: 'workspace.flows.collections.collection', params: { name, ...config } }) as const,
    deployments: () => ({ name: 'workspace.deployments', params: { ...config } }) as const,
    deployment: (deploymentId: string, versionId?: string, query?: { tab?: string } & LocationQuery) => ({ name: 'workspace.deployments.deployment', params: { deploymentId, ...config }, query: { versionId, ...query } }) as const,
    deploymentEdit: (deploymentId: string) => ({ name: 'workspace.deployments.deployment-edit', params: { deploymentId, ...config } }) as const,
    deploymentDuplicate: (deploymentId: string) => ({ name: 'workspace.deployments.deployment-duplicate', params: { deploymentId, ...config } }) as const,
    deploymentFlowRunCreate: (deploymentId: string, parameters?: Record<string, unknown>) => {
      const query = parameters ? { parameters: encodeURIComponent(JSON.stringify(parameters)) } : {}
      return { name: 'workspace.deployments.deployment-flow-run-create', params: { deploymentId, ...config }, query } as const
    },
    workQueues: () => ({ name: 'workspace.work-queues', params: { ...config } }) as const,
    workQueue: (workQueueId: string) => ({ name: 'workspace.work-queues.work-queue', params: { workQueueId, ...config } }) as const,
    workQueueCreate: () => ({ name: 'workspace.work-queues.work-queue-create', params: { ...config } }) as const,
    workQueueEdit: (workQueueId: string) => ({ name: 'workspace.work-queues.work-queue-edit', params: { workQueueId, ...config } }) as const,
    blocks: () => ({ name: 'workspace.blocks', params: { ...config } }) as const,
    blocksCatalog: () => ({ name: 'workspace.blocks.catalog', params: { ...config } }) as const,
    blocksCatalogView: (blockTypeSlug: string) => ({ name: 'workspace.blocks.catalog-view', params: { blockTypeSlug, ...config } }) as const,
    blockCreate: (blockTypeSlug: string) => ({ name: 'workspace.blocks.block-create', params: { blockTypeSlug, ...config } }) as const,
    block: (blockDocumentId: string) => ({ name: 'workspace.blocks.block', params: { blockDocumentId, ...config } }) as const,
    blockEdit: (blockDocumentId: string) => ({ name: 'workspace.blocks.block-edit', params: { blockDocumentId, ...config } }) as const,
    notifications: () => ({ name: 'workspace.notifications', params: { ...config } }) as const,
    notificationCreate: () => ({ name: 'workspace.notifications.create', params: { ...config } }) as const,
    notificationEdit: (notificationId: string) => ({ name: 'workspace.notifications.notification-edit', params: { notificationId, ...config } }) as const,
    concurrencyLimit: (concurrencyLimitId: string) => ({ name: 'workspace.concurrency-limits.concurrency-limit', params: { concurrencyLimitId, ...config } }) as const,
    concurrencyLimits: () => ({ name: 'workspace.concurrency-limits', params: { ...config } }) as const,
    concurrencyLimitsV2: () => ({ name: 'workspace.concurrency-limits-v2', params: { ...config } }) as const,
    concurrencyLimitV2: (concurrencyLimitId: string) => ({ name: 'workspace.concurrency-limits-v2.concurrency-limit', params: { concurrencyLimitId, ...config } }) as const,
    variables: () => ({ name: 'workspace.variables', params: { ...config } }) as const,
    workPools: () => ({ name: 'workspace.work-pools', params: { ...config } }) as const,
    workPool: (workPoolName: string) => ({ name: 'workspace.work-pools.work-pool', params: { workPoolName, ...config } }) as const,
    workPoolCreate: () => ({ name: 'workspace.work-pools.work-pool-create', params: { ...config } }) as const,
    workPoolEdit: (workPoolName: string) => ({ name: 'workspace.work-pools.work-pool-edit', params: { workPoolName, ...config } }) as const,
    workPoolQueue: (workPoolName: string, workPoolQueueName: string) => ({ name: 'workspace.work-pools.work-pool.work-pool-queue', params: { workPoolName, workPoolQueueName, ...config } }) as const,
    workPoolQueueCreate: (workPoolName: string) => ({ name: 'workspace.work-pools.work-pool.work-pool-queue-create', params: { workPoolName, ...config } }) as const,
    workPoolQueueEdit: (workPoolName: string, workPoolQueueName: string) => ({ name: 'workspace.work-pools.work-pool.work-pool-queue-edit', params: { workPoolName, workPoolQueueName, ...config } }) as const,
  }
}