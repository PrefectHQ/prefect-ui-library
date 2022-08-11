<template>
  <p-content class="schema-form-fields">
    <template v-for="(prop, propertyKey) in schema.properties" :key="propertyKey">
      <PydanticFormProperty :prop-key="getPropertyKey(propertyKey)" :property="prop" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { Schema } from '@/types/schemas'
  import { resolvePydanticTypeDefinitionFromSchema } from '@/utilities/pydantic'

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