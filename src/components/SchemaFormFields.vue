<template>
  <p-content class="schema-form-fields">
    <template v-for="(property, propertyKey) in properties" :key="propertyKey">
      <PydanticFormProperty :prop-key="getPropertyKey(propertyKey)" :property="property" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { PydanticTypeDefinition } from '@/types/Pydantic'
  import { resolvePydanticTypeDefinitionFromSchema } from '@/utilities/pydantic'

  const props = defineProps<{
    schema: PydanticTypeDefinition,
    key?: string,
  }>()

  const properties = computed(() => resolvePydanticTypeDefinitionFromSchema(props.schema))

  function getPropertyKey(propertyKey: string): string {
    if(props.key) {
      return `${props.key}.${propertyKey}`
    }

    return propertyKey
  }
</script>