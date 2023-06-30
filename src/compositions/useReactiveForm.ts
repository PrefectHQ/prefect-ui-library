import { Ref, watch } from 'vue'
import { useForm } from '@/compositions/useForm'

// using any here to mirror vee-validate's useForm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useReactiveForm<T extends Record<string, any>>(sourceRef: Ref<T>, ...[opts = {}]: Parameters<typeof useForm<T>>): ReturnType<typeof useForm<T>> {
  const form = useForm<T>({
    ...opts,
  })

  watch(() => form.values, fieldValue => {
    sourceRef.value = { ...fieldValue }
  }, { deep: true })

  watch(sourceRef, sourceValue => {
    // This is a pretty brute-force comparison and will strip out any non-JSON encodable data when doing the comparison
    if (JSON.stringify(sourceValue) !== JSON.stringify(form.values)) {
      form.setValues(sourceValue)
    }
  })

  return form
}