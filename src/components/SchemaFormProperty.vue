<template>
  <div class="schema-form-property">
    <component :is="is" v-bind="{ property, propKey }" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, defineAsyncComponent } from 'vue'
  import SchemaFormInput from './SchemaFormInput.vue'
  import { SchemaProperty, schemaHas } from '@/types/schemas'

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // importing as async and defining as `any` breaks types but fixes recursive type issue
  const SchemaFormProperties: any = defineAsyncComponent(() => import('./SchemaFormProperties.vue'))
  const SchemaFormPropertyAnyOf: any = defineAsyncComponent(() => import('./SchemaFormPropertyAnyOf.vue'))
  const SchemaFormPropertyAllOf: any = defineAsyncComponent(() => import('./SchemaFormPropertyAllOf.vue'))
  /* eslint-enable @typescript-eslint/no-explicit-any */

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