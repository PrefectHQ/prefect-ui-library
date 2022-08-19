<template>
  <p-label :label="property.title" :description="property.description" class="schema-form-properties">
    <template v-for="(prop, key) in property.properties" :key="key">
      <SchemaFormProperty :property="prop" :prop-key="`${propKey}.${key}`" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import SchemaFormProperty from './SchemaFormProperty.vue'
  import { SchemaProperty } from '@/types/schemas'

  defineProps<{
    propKey: string,
    property: SchemaProperty,
  }>()
</script>