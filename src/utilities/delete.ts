import { showToast } from '@prefecthq/prefect-design'
import { localization } from '@/localization'

export type itemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue' | 'Block' | 'Notification' | 'Task run' | 'Concurrency Limit'

export async function deleteItem(id: string, endpoint: (arg: string) => void, type: itemType): Promise<void> {
  try {
    await endpoint(id)

    showToast(localization.success.delete(type), 'success')
  } catch (error) {
    showToast(localization.error.delete(type.toLowerCase()), 'error')

    console.error(error)
  }
}