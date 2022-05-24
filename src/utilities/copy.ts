import { showToast } from '@prefecthq/prefect-design'

export async function copyId(id: string): Promise<void> {
  await navigator.clipboard.writeText(id)

  showToast('ID copied to clipboard!', 'success', undefined, 3000)
}