import { showToast } from '@prefecthq/prefect-design'

export type itemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue' | 'Block' | 'Notification'

export async function deleteItem(id: string, endpoint: (arg: string) => void, type: itemType): Promise<void> {
  try {
    await endpoint(id)
    showToast(`${type} deleted successfully!`, 'success')
  } catch (error) {
    showToast(`Failed to delete ${type.toLowerCase()}`, 'error')
    console.error(error)
  }
}