<template>
  <component :is="input?.component" v-bind="input?.props" class="schema-form-property-string" />
</template>

<script lang="ts" setup>
  import { PTextInput } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { withProps } from '@/utilities'

  const props = defineProps<{
    property: SchemaProperty & { type: 'string' },
    value: string | null,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null],
  }>()

  const property = useSchemaProperty(() => props.property)

  const input = computed(() => {
    const { format } = property.value

    if (format === 'date') {
      return
    }

    if (format === 'date-time') {
      return
    }

    if (format === 'password') {
      return withProps(PTextInput, {
        type: 'password',
        modelValue: props.value,
        'onUpdate:modelValue': update,
      })
    }

    return withProps(PTextInput, {
      modelValue: props.value,
      'onUpdate:modelValue': update,
    })
  })

  function update(value: string | null): void {
    emit('update:value', value)
  }
</script>