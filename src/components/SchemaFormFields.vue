<template>
  <p-content class="schema-form-fields">
    <template v-for="[propertyKey, prop] in sortedSchemaProperties" :key="getPropertyKey(propertyKey)">
      <SchemaFormProperty :prop-key="getPropertyKey(propertyKey)" :property="prop!" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperty from '@/components/SchemaFormProperty.vue'
  import { Schema } from '@/types/schemas'

  const props = defineProps<{
    schema: Schema,
    property?: string,
  }>()

  function getPropertyKey(propertyKey: string): string {
    if (props.property) {
      return `${props.property}.${propertyKey}`
    }

    return propertyKey
  }

  const sortedSchemaProperties = computed(() => {
    const properties = Object.entries(props.schema.properties ?? {})
    return properties.sort(([, propA], [, propB]) => (propA?.position ?? 0) - (propB?.position ?? 0))
  })
</script>