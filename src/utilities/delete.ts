import { showToast } from '@prefecthq/prefect-design'
import { localization } from '@/localization'

export type itemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue' | 'Block' | 'Notification' | 'Task run' | 'Concurrency Limit' | 'Worker pool' | 'Worker pool queue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeleteItemEndpointArgs = any[] | any
export type DeleteItemEndpoint = (...args: DeleteItemEndpointArgs[]) => Promise<void>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteItem(args: DeleteItemEndpointArgs, endpoint: DeleteItemEndpoint, type: itemType): Promise<void> {
  try {
    const endpointArgs = Array.isArray(args) ? args : [args]
    await endpoint(...endpointArgs)

    showToast(localization.success.delete(type), 'success')
  } catch (error) {
    showToast(localization.error.delete(type.toLowerCase()), 'error')

    console.error(error)
  }
}