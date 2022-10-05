import { useForm } from 'vee-validate'
import { Ref, watch } from 'vue'

// using any here to mirror vee-validate's useForm
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useReactiveForm<T extends Record<string, any>>(sourceRef: Ref<T>, ...[opts = {}]: Parameters<typeof useForm<T>>): ReturnType<typeof useForm<T>> {
  const form = useForm<T>({
    ...opts,
  })

  const { values } = form

  watch(() => values, fieldValue => {
    sourceRef.value = { ...fieldValue }
  }, { deep: true })

  watch(sourceRef, sourceValue => {
    // This is a pretty brute-force comparision and will strip out any non-JSON encodeable data when doing the comparison
    if (JSON.stringify(sourceValue) !== JSON.stringify(values)) {
      form.values = { ...sourceValue }
    }
  })

  return form
}