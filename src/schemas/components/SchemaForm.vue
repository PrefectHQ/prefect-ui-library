<template>
  <p-form class="schema-form">
    <template v-if="schema.properties">
      <SchemaFormProperties v-model:values="values" :parent="schema" :properties="schema.properties" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { provide, computed } from 'vue'
  import SchemaFormProperties from '@/schemas/components/SchemaFormProperties.vue'
  import { schemaInjectionKey } from '@/schemas/compositions/useSchema'
  import { Schema } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues,
  }>()

  provide(schemaInjectionKey, props.schema)

  const emit = defineEmits<{
    'update:values': [SchemaValues],
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