import { showToast } from '@prefecthq/prefect-design'

export function copyToClipboard(text: string, message: string = 'Copied to clipboard!'): void {
  navigator.clipboard.writeText(text)

  showToast(message, 'success')
}