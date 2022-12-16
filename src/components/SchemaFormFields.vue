<template>
  <p-content class="schema-form-fields">
    <template v-for="(prop, propertyKey) in schema.properties" :key="getPropertyKey(propertyKey)">
      <SchemaFormProperty :prop-key="getPropertyKey(propertyKey)" :property="prop!" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
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
</script>