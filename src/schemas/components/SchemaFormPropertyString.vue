<template>
  <component :is="input?.component" v-bind="input?.props" class="schema-form-property-string" />
</template>

<script lang="ts" setup>
  import { PCombobox, PCodeInput, PTextarea, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyDate from '@/schemas/components/SchemaFormPropertyDate.vue'
  import SchemaFormPropertyDateTime from '@/schemas/components/SchemaFormPropertyDateTime.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { isString, withProps } from '@/utilities'
  import { asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty & { type: 'string' },
    value: string | undefined,
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [string | undefined],
  }>()

  const { property } = useSchemaProperty(() => props.property)

  const input = computed(() => {
    const { format, enum: stringEnum } = property.value

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

    if (format === 'json-string') {
      return withProps(PCodeInput, {
        lang: 'json',
        modelValue: props.value,
        state: props.state,
        'onUpdate:modelValue': update,
      })
    }

    if (stringEnum) {
      return withProps(PCombobox, {
        modelValue: props.value,
        state: props.state,
        options: stringEnum.filter(isString),
        'onUpdate:modelValue': update,
      })
    }

    return withProps(PTextarea, {
      modelValue: props.value,
      state: props.state,
      rows: 1,
      'onUpdate:modelValue': update,
    })
  })

  function update(value: unknown): void {
    const asStringOrUndefined = asType(value, String)

    if (asStringOrUndefined?.length === 0) {
      emit('update:value', undefined)
      return
    }

    emit('update:value', asStringOrUndefined)
  }
</script>