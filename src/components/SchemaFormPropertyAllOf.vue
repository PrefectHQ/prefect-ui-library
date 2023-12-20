<template>
  <p-label :label="property.title" :description="property.description" class="schema-form-property-all-of">
    <template v-for="(prop, key) in property.allOf" :key="key">
      <SchemaFormProperty :prop-key="propKey" :property="prop" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import SchemaFormProperty from '@/components/SchemaFormProperty.vue'
  import { SchemaPropertyAllOf } from '@/types/schemas'

  defineProps<{
    propKey: string,
    property: SchemaPropertyAllOf,
  }>()
</script>
