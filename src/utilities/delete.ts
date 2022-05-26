import { showToast } from '@prefecthq/prefect-design'
import { deploymentsApiKey } from '@/services/deploymentsApi'
import { flowRunsApiKey } from '@/services/flowRunsApi'
import { flowsApiKey } from '@/services/flowsApi'
import { workQueuesApiKey } from '@/services/WorkQueuesApi'
import { inject } from '@/utilities/inject'

export type itemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue'

export async function deleteItem(id: string, type: itemType): Promise<void> {
  try {
    switch (type) {
      case 'Flow': {
        const workQueuesApi = inject(workQueuesApiKey)
        await workQueuesApi.deleteWorkQueue(id)
        break
      }
      case 'Flow run': {
        const FlowRunsApi = inject(flowRunsApiKey)
        await FlowRunsApi.deleteFlowRun(id)
        break
      }
      case 'Deployment': {
        const DeploymentsApi = inject(deploymentsApiKey)
        await DeploymentsApi.deleteDeployment(id)
        break
      }
      case 'Work queue': {
        const workQueuesApi = inject(workQueuesApiKey)
        await workQueuesApi.deleteWorkQueue(id)
      }
    }

    showToast(`${type} deleted successfully!`, 'success', undefined, 3000)
  } catch (error) {
    showToast(`Failed to delete ${type.toLowerCase()}`, 'error', undefined, 3000)
    console.error(error)
  }
}