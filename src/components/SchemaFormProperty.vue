<template>
  <div class="schema-form-property">
    <component :is="is" v-bind="{ property, propKey }" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormInput from './SchemaFormInput.vue'
  import SchemaFormProperties from './SchemaFormProperties.vue'
  import SchemaFormPropertyAllOf from './SchemaFormPropertyAllOf.vue'
  import SchemaFormPropertyAnyOf from './SchemaFormPropertyAnyOf.vue'
  import { SchemaProperty, schemaHas } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaProperty,
  }>()

  const is = computed(() => {
    if (schemaHas(props.property, 'meta')) {
      return SchemaFormInput
    }

    if (schemaHas(props.property, 'properties')) {
      return SchemaFormProperties
    }

    if (schemaHas(props.property, 'allOf')) {
      return SchemaFormPropertyAllOf
    }

    if (schemaHas(props.property, 'anyOf')) {
      return SchemaFormPropertyAnyOf
    }

    return null
  })
</script>

<style>
.schema-form-property__component { @apply
  pl-2
}
</style>