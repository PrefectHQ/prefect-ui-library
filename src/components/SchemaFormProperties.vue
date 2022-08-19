<template>
  <p-label :label="property.title" :description="property.description" class="schema-form-properties">
    <p-content class="schema-form-properties__fields">
      <template v-for="(prop, key) in property.properties" :key="key">
        <SchemaFormProperty :property="prop" :prop-key="`${propKey}.${key}`" />
      </template>
    </p-content>
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

<style>
.schema-form-properties__fields { @apply
  border-gray-300
  border-[1px]
  p-4
  rounded
}
</style>