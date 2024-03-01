<template>
  <component :is="input.component" v-bind="input.props" class="schema-input" />
</template>

<script lang="ts" setup>
  import { computed, provide } from 'vue'
  import { schemaInjectionKey } from '@/schemas/compositions/useSchema'
  import { schemaFormKindsInjectionKey } from '@/schemas/compositions/useSchemaFormKinds'
  import { useSchemaPropertyInput } from '@/schemas/compositions/useSchemaPropertyInput'
  import { Schema } from '@/schemas/types/schema'
  import { PrefectKind, SchemaValues } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'

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

  const values = computed({
    get() {
      return props.values
    },
    set(values) {
      emit('update:values', values)
    },
  })

  const { input } = useSchemaPropertyInput(() => props.schema, values, () => props.errors)
</script>