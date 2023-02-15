<template>
  <template v-if="isBlockDocumentValue(value)">
    <SchemaPropertyBlockKeyValue v-bind="{ property, value }" />
  </template>
  <!-- todo: support displaying nested objects -->
  <template v-else>
    <p-key-value :label="property.title" :value="value" class="schema-property-key-value">
      <template v-if="isDefined && isJsonProperty" #value>
        <CodeSnippet language="json" :snippet="jsonValue ?? ''" />
      </template>
    </p-key-value>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import CodeSnippet from '@/components/CodeSnippet.vue'
  import JsonInput from '@/components/JsonInput.vue'
  import SchemaPropertyBlockKeyValue from '@/components/SchemaPropertyBlockKeyValue.vue'
  import { isBlockDocumentValue } from '@/models'
  import { SchemaProperty, SchemaValue } from '@/types/schemas'
  import { stringifyUnknownJson } from '@/utilities/json'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
  }>()

  const isJsonProperty = computed(() => {
    return props.property.type === 'array' || props.property.meta?.component === JsonInput
  })

  const jsonValue = computed(() => stringifyUnknownJson(props.value) ?? undefined)

  // todo: copied from PKeyValue. Hoping to update PKeyValue to eliminate the need for this
  const isDefined = computed((): boolean => {
    if (typeof props.value === 'object' && props.value !== null) {
      if (Array.isArray(props.value)) {
        return props.value.length > 0
      }

      return Object.keys(props.value).length > 0
    }

    return typeof props.value !== 'undefined' && props.value !== null && props.value !== ''
  })
</script>

<style>
.schema-property-key-value { @apply
  max-w-full
  min-w-0
}
</style>