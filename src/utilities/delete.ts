import { showToast } from '@prefecthq/prefect-design'

export type itemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue'

export async function deleteItem(id: string, endpoint: (arg: string) => any, type: itemType): Promise<void> {
  try {
    await endpoint(id)
    showToast(`${type} deleted successfully!`, 'success', undefined, 3000)
  } catch (error) {
    showToast(`Failed to delete ${type.toLowerCase()}`, 'error', undefined, 3000)
    console.error(error)
  }
}