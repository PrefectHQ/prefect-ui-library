<template>
  <div class="schema-form-property-all-of">
    <h3 class="schema-form-property-all-of__heading">
      {{ property.title }}
    </h3>
    <template v-for="(prop, key) in property.allOf" :key="key">
      <SchemaFormProperty :prop-key="propKey" :property="prop" :level="level" />
    </template>
  </div>
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

<style>
.schema-form-property-all-of__heading { @apply
  font-medium
}
</style>