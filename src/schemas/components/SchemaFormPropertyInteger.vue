<template>
  <component :is="input?.component" v-bind="input?.props" class="schema-form-property-integer" />
</template>

<script lang="ts" setup>
  import { PCombobox, PNumberInput, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { isNumber, withProps } from '@/utilities'
  import { asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty & { type: 'integer' },
    value: number | null | undefined,
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [number | null | undefined],
  }>()

  const { property } = useSchemaProperty(() => props.property)

  const input = computed(() => {
    if (property.value.enum) {
      return withProps(PCombobox, {
        modelValue: props.value,
        state: props.state,
        options: property.value.enum.filter(isNumber),
        'onUpdate:modelValue': (value) => emit('update:value', asType(value, Number)),
      })
    }

    return withProps(PNumberInput, {
      modelValue: asType(props.value, Number),
      step: '1',
      state: props.state,
      'onUpdate:modelValue': value => emit('update:value', value),
    })
  })
</script>