<template>
  <p-label :label="property.title" :description="property.description" class="schema-form-property-all-of">
    <template v-for="(prop, key) in property.allOf" :key="key">
      <SchemaFormProperty :prop-key="propKey" :property="prop" :level="level" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import SchemaFormProperty from './SchemaFormProperty.vue'
  import { SchemaPropertyAllOf } from '@/types/schemas'

  withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: SchemaPropertyAllOf,
  }>(), {
    level: 0,
  })
</script>