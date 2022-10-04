import { showToast } from '@prefecthq/prefect-design'
import { UseSubscription } from '@prefecthq/vue-compositions'
import { computed } from 'vue'
import { FlowRunsApi } from './../services/FlowRunsApi'
import { UsePaginatedSubscription } from '@/compositions'
import { localization } from '@/localization'
import { FlowRun } from '@/models'
import { UnionFilters } from '@/types'

export type itemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue' | 'Block' | 'Notification' | 'Task run'

export async function deleteItem(id: string, endpoint: (arg: string) => void, type: itemType): Promise<void> {
  try {
    await endpoint(id)

    showToast(localization.success.delete(type), 'success')
  } catch (error) {
    showToast(localization.error.delete(type.toLowerCase()), 'error')

    console.error(error)
  }
}

export async function deleteFlowRunsWithSubscriptionRefresh(flowRuns: string[], flowRunsApi: FlowRunsApi, subscriptions: (UseSubscription<(filter: UnionFilters) => Promise<number>> | UsePaginatedSubscription<(filter: UnionFilters) => Promise<FlowRun[]>>)[]): Promise<void> {
  const toastMessage = computed(() => {
    if (flowRuns.length === 1) {
      return 'Flow run deleted'
    }
    return `${flowRuns.length} flow runs deleted`
  })

  try {
    const deleteFlowRuns = flowRuns.map(flowRunsApi.deleteFlowRun)
    await Promise.all(deleteFlowRuns)

    showToast(toastMessage, 'success')

    await Promise.all(subscriptions.map(subscription => subscription.refresh()))
  } catch (error) {
    showToast(localization.error.delete('Flow Run'), 'error')
  }
}

