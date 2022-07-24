<template>
  <JsonInput v-model="internalValue" class="block-schema-property-input-json" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import JsonInput from '@/components/JsonInput.vue'

  const props = defineProps<{
    modelValue: unknown,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const internalValue = computed<string>({
    get() {
      if (typeof props.modelValue === 'string') {
        return props.modelValue
      }

      return JSON.stringify(props.modelValue, undefined, 2)
    },
    set(value: string) {
      emit('update:modelValue', parse(value))
    },
  })

  function parse(value: string): unknown {
    try {
      const parsed = JSON.parse(value)

      if (typeof parsed === 'string') {
        return value
      }

      return parsed
    } catch {
      return value
    }
  }
</script>