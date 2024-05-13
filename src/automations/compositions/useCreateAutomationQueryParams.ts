import { DateRouteParam, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { AutomationAction, isAutomationAction } from '@/automations/types/actions'
import { AutomationTrigger } from '@/automations/types/triggers'
import { useWorkspaceApi } from '@/compositions'
import { JSONRouteParam } from '@/formatters/JsonRouteParam'
import { mapper } from '@/services/Mapper'

type UseCreateAutomationQueryParams = {
  getActions: () => Promise<AutomationAction[] | null>,
  getTrigger: () => Promise<AutomationTrigger | null>,
}

export function useCreateAutomationQueryParams(): UseCreateAutomationQueryParams {
  const api = useWorkspaceApi()

  // action
  const { value: actions } = useRouteQueryParam('actions', [JSONRouteParam], [])

  // trigger
  const { value: from } = useRouteQueryParam('from')

  // event trigger
  const { value: eventId } = useRouteQueryParam('eventId')
  const { value: occurred } = useRouteQueryParam('occurred', DateRouteParam)

  // flow trigger
  const { value: flowId } = useRouteQueryParam('flowId')

  // work pool queue
  const { value: workPoolQueueId } = useRouteQueryParam('workPoolQueueId')

  async function getTrigger(): Promise<AutomationTrigger | null> {
    switch (from) {
      case 'event':
        return await getEventTriggerTemplate()
      case 'flow':
        return await getFlowTriggerTemplate()
      case 'workPoolQueue':
        return await getWorkPoolQueueTriggerTemplate()
      default:
        return null
    }
  }

  async function getActions(): Promise<AutomationAction[] | null> {
    const validActions = actions.filter(isAutomationAction)

    if (validActions.length) {
      return validActions
    }

    return await null
  }

  async function getEventTriggerTemplate(): Promise<AutomationTrigger> {
    if (!eventId) {
      throw new Error('Failed creating automation trigger from event. Missing eventId query param.')
    }

    if (!occurred) {
      throw new Error('Failed creating automation trigger from event. Missing occurred query param.')
    }

    const event = await api.events.getEvent(eventId, occurred)

    return mapper.map('WorkspaceEvent', event, 'AutomationTrigger')
  }

  async function getFlowTriggerTemplate(): Promise<AutomationTrigger> {
    if (!flowId) {
      throw new Error('Failed creating automation trigger from flow. Missing flowId query param.')
    }

    const flow = await api.flows.getFlow(flowId)

    return mapper.map('Flow', flow, 'AutomationTrigger')
  }

  async function getWorkPoolQueueTriggerTemplate(): Promise<AutomationTrigger> {

    if (!workPoolQueueId) {
      throw new Error('Failed creating automation trigger from work pool queue. Missing workPoolQueueId query param.')
    }

    const workPoolQueue = await api.workQueues.getWorkQueue(workPoolQueueId)

    return mapper.map('WorkPoolQueue', workPoolQueue, 'AutomationTrigger')
  }

  return {
    getTrigger,
    getActions,
  }
}