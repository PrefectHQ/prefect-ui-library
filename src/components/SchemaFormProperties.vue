<template>
  <p-label :label="label" :description="property.description" class="schema-form-properties">
    <p-content class="schema-form-properties__fields">
      <template v-for="(prop, key) in property.properties" :key="key">
        <SchemaFormProperty :property="prop!" :prop-key="`${propKey}.${key}`" />
      </template>
    </p-content>
  </p-label>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperty from './SchemaFormProperty.vue'
  import { SchemaProperty } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaProperty,
  }>()

  const label = computed(() => props.property.required ? props.property.title : `${props.property.title} (Optional)`)
</script>

<style>
.schema-form-properties__fields { @apply
  border-gray-300
  border-[1px]
  p-4
  rounded
}
</style>