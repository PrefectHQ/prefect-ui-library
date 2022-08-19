<template>
  <div class="schema-form-property">
    <template v-if="hasSubProperties">
      <p-label :label="property.title" :description="property.description">
        <SchemaFormFields :schema="property" :property="propKey" />
      </p-label>
    </template>

    <template v-else>
      <component
        :is="formComponent"
        class="schema-form-property__component"
        :prop-key="propKey"
        :property="property"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, defineAsyncComponent } from 'vue'
  import SchemaFormInput from './SchemaFormInput.vue'
  import { SchemaProperty } from '@/types/schemas'

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // importing as async and defining as `any` breaks types but fixes recursive type issue
  const SchemaFormFields: any = defineAsyncComponent(() => import('./SchemaFormFields.vue'))
  const SchemaFormPropertyAnyOf: any = defineAsyncComponent(() => import('./SchemaFormPropertyAnyOf.vue'))
  const SchemaFormPropertyAllOf: any = defineAsyncComponent(() => import('./SchemaFormPropertyAllOf.vue'))
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const props = defineProps<{
    propKey: string,
    property: SchemaProperty,
  }>()

  const hasSubProperties = computed(() => !!props.property.properties)

  const formComponent = computed(() => {
    if (props.property.anyOf) {
      return SchemaFormPropertyAnyOf
    }

    if (props.property.allOf) {
      return SchemaFormPropertyAllOf
    }

    return SchemaFormInput
  })
</script>

<style>
.schema-form-property__component { @apply
  pl-2
}
</style>