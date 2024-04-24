<template>
  <p-content class="schema-input" v-bind="$attrs">
    <template v-if="$slots.header">
      <slot name="header" :schema :values :kind :set-kind />
    </template>

    <component :is="input.component" v-bind="input.props" />
  </p-content>
</template>

<script lang="ts" setup>
  import { computed, provide } from 'vue'
  import { schemaInjectionKey } from '@/schemas/compositions/useSchema'
  import { schemaFormKindsInjectionKey } from '@/schemas/compositions/useSchemaFormKinds'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { useSchemaValue } from '@/schemas/compositions/useSchemaValue'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues | undefined,
    errors: SchemaValueError[],
    kinds: PrefectKind[],
  }>()

  provide(schemaInjectionKey, props.schema)
  provide(schemaFormKindsInjectionKey, props.kinds)

  const emit = defineEmits<{
    'update:values': [SchemaValues | undefined],
  }>()

  defineSlots<{
    header: (props: {
      values: SchemaValues | undefined,
      schema: Schema,
      kind: PrefectKind,
      setKind: (kind: PrefectKind) => void,
    }) => unknown,
  }>()

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })

  const { input } = useSchemaPropertyInput(() => props.schema, values, () => props.errors)

  const { kind } = useSchemaValue({
    value: values,
    property: () => props.schema,
  })

  function setKind(value: PrefectKind): void {
    kind.value = value
  }
</script>