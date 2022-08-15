import { showToast, Toast, ToastOptions, ToastType } from '@prefecthq/prefect-design'
import { onUnmounted, Component } from 'vue'

/**
 * The useShowToast composition takes the same arguments as showToast but also dismisses the toast when the caller component is unmounted
 * @param message string | Component
 * @param type ToastType
 * @param options ToastOptions
 * @returns Toast
 */
export function useShowToast(message: string | Component, type?: ToastType, options?: ToastOptions): Toast {
  const toast = showToast(message, type, options)

  onUnmounted(() => {
    toast.dismiss()
  })

  return toast
}