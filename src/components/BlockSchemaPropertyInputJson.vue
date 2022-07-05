<template>
  <JsonEditor v-model="model" class="block-schema-property-input-json" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import JsonEditor from '@/components/JsonEditor.vue'

  const props = defineProps<{
    modelValue: unknown,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const model = computed<string>({
    get() {
      if (typeof props.modelValue === 'string') {
        return props.modelValue
      }

      return JSON.stringify(props.modelValue)
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