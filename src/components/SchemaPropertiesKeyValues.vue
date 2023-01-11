<template>
  <PContent class="schema-properties-key-values">
    <template v-for="[key, property] in sortedSchemaProperties" :key="key">
      <SchemaProperty v-if="property" :property="property" :value="getPropertyValue(key)" />
    </template>
  </PContent>
</template>

<script lang="ts" setup>
  import { PContent } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaProperty from '@/components/SchemaPropertyKeyValue.vue'
  import { Schema, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues,
  }>()

  function getPropertyValue(blockSchemaPropertyKey: string): unknown {
    return props.values[blockSchemaPropertyKey]
  }

  const sortedSchemaProperties = computed(() => {
    const properties = Object.entries(props.schema.properties ?? {})
    return properties.sort(([, propA], [, propB]) => (propA?.position ?? 0) - (propB?.position ?? 0))
  })
</script>