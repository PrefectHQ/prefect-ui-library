import { showToast, Toast, ToastOptions } from '@prefecthq/prefect-design'
import { onUnmounted } from 'vue'

export function useShowToast(options: ToastOptions): Toast {
  const toast = showToast(options)

  onUnmounted(() => {
    toast.dismiss()
  })

  return toast
}