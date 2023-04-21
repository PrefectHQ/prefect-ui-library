import { WritableComputedRef, computed, defineProps, defineEmits } from 'vue'

export type UseModelValueProps<T> = {
  modelValue?: T | undefined,
}

export type UseModelValueEmits<T> = {
  (event: 'update:modelValue', value?: T): void,
}

export type UseModelValue<T> = {
  emit: UseModelValueEmits<T>,
  props: UseModelValueProps<T>,
  value: WritableComputedRef<T>,
}

export function useModelValue<T>(): UseModelValue<T> {
  const props = defineProps<UseModelValueProps<T>>()
  const emit = defineEmits<UseModelValueEmits<T>>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  return { value: internalValue, emit, props }
}