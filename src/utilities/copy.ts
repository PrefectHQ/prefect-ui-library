import { showToast } from '@prefecthq/prefect-design'

export function copyToClipboard(text: string, message: string ='ID copied to clipboard!'): void {
  navigator.clipboard.writeText(text)

  showToast(message, 'success', undefined, 3000)
}