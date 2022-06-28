import { useField } from 'vee-validate'
import { Ref, watch } from 'vue'

export function useReactiveField<T>(sourceRef: Ref<T>, ...[name, rules, opts = {}]: Parameters<typeof useField<T>>): ReturnType<typeof useField> {
  const field = useField<T>(name, rules, {
    ...opts,
    initialValue: sourceRef,
  })

  const { value: fieldRef } = field

  watch(fieldRef, fieldValue => sourceRef.value = fieldValue)

  watch(sourceRef, sourceValue => {
    if (sourceValue !== fieldRef.value) {
      fieldRef.value = sourceValue
    }
  })

  return field
}