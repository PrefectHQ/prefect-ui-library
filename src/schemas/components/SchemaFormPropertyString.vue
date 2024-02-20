<template>
  <component :is="input?.component" v-bind="input?.props" class="schema-form-property-string" />
</template>

<script lang="ts" setup>
  import { PCodeInput, PTextInput, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyDate from '@/schemas/components/SchemaFormPropertyDate.vue'
  import SchemaFormPropertyDateTime from '@/schemas/components/SchemaFormPropertyDateTime.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { withProps } from '@/utilities'

  const props = defineProps<{
    property: SchemaProperty & { type: 'string' },
    value: string | null | undefined,
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null | undefined],
  }>()

  const { property } = useSchemaProperty(() => props.property)

  const input = computed(() => {
    const { format } = property.value

    if (format === 'date') {
      return withProps(SchemaFormPropertyDate, {
        value: props.value,
        state: props.state,
        'onUpdate:value': update,
      })
    }

    if (format === 'date-time') {
      return withProps(SchemaFormPropertyDateTime, {
        value: props.value,
        state: props.state,
        'onUpdate:value': update,
      })
    }

    if (format === 'password') {
      return withProps(PTextInput, {
        type: 'password',
        modelValue: props.value,
        state: props.state,
        'onUpdate:modelValue': update,
      })
    }

    if (format === 'json-string') {
      return withProps(PCodeInput, {
        lang: 'json',
        modelValue: props.value,
        state: props.state,
        'onUpdate:modelValue': update,
      })
    }

    return withProps(PTextInput, {
      modelValue: props.value,
      state: props.state,
      'onUpdate:modelValue': update,
    })
  })

  function update(value: string | null | undefined): void {
    if (!value) {
      emit('update:value', undefined)
      return
    }

    emit('update:value', value)
  }
</script>