import { showToast, Toast, ToastOptions, ToastType } from '@prefecthq/prefect-design'
import { onUnmounted, Component } from 'vue'

export function useShowToast(message: string | Component, type?: ToastType, options?: ToastOptions): Toast {
  const toast = showToast(message, type, options)

  onUnmounted(() => {
    toast.dismiss()
  })

  return toast
}