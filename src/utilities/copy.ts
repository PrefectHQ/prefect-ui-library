import { showToast } from '@prefecthq/prefect-design'

export function copyId(id: string): void {
  navigator.clipboard.writeText(id)

  showToast('ID copied to clipboard!', 'success', undefined, 3000)
}