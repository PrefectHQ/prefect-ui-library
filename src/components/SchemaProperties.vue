<template>
  <PContent class="schema-properties">
    <template v-for="(property, key) in schema.properties" :key="key">
      <SchemaProperty v-if="property" :property="property" :value="getPropertyValue(key)" />
    </template>
  </PContent>
</template>

<script lang="ts" setup>
  import { PContent } from '@prefecthq/prefect-design'
  import SchemaProperty from './SchemaProperty.vue'
  import { Schema, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues,
  }>()

  function getPropertyValue(blockSchemaPropertyKey: string): unknown {
    return props.values[blockSchemaPropertyKey]
  }
</script>