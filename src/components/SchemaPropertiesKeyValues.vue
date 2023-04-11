<template>
  <p-content class="schema-properties-key-values">
    <template v-for="[key, property] in sortedSchemaProperties" :key="key">
      <SchemaProperty v-if="property" :value="getPropertyValue(key)" v-bind="{ property, alternate }" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaProperty from '@/components/SchemaPropertyKeyValue.vue'
  import { Schema, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues,
    alternate?: boolean,
  }>()

  function getPropertyValue(blockSchemaPropertyKey: string): unknown {
    return props.values[blockSchemaPropertyKey]
  }

  const sortedSchemaProperties = computed(() => {
    const properties = Object.entries(props.schema.properties ?? {})
    return properties.sort(([, propA], [, propB]) => (propA?.position ?? 0) - (propB?.position ?? 0))
  })
</script>