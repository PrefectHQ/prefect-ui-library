<template>
  <div class="schema-input">
    <template v-if="schema.properties">
      <SchemaFormProperties v-model:values="values" :parent="schema" :properties="schema.properties" :errors="errors" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, provide } from 'vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { schemaInjectionKey } from '@/schemas/compositions/useSchema'
  import { schemaFormKindsInjectionKey } from '@/schemas/compositions/useSchemaFormKinds'
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
</script>