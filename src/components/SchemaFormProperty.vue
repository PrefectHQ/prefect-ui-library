<template>
  <div class="schema-form-property">
    <component :is="is" v-bind="{ property, propKey }" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormInput from '@/components/SchemaFormInput.vue'
  import SchemaFormProperties from '@/components/SchemaFormProperties.vue'
  import SchemaFormPropertyAllOf from '@/components/SchemaFormPropertyAllOf.vue'
  import SchemaFormPropertyAnyOf from '@/components/SchemaFormPropertyAnyOf.vue'
  import { SchemaProperty, schemaHas } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaProperty,
  }>()

  const is = computed(() => {
    if (props.property.type === 'block') {
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

    return SchemaFormInput
  })
</script>

<style>
.schema-form-property__component { @apply
  pl-2
}
</style>