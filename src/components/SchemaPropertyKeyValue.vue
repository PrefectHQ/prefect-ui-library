<template>
  <template v-if="isBlockDocumentProperty && typeof value === 'string'">
    <BlockDocumentKeyValue :block-document-id="value" />
  </template>
  <!-- todo: support displaying nested objects -->
  <template v-else>
    <p-key-value :label="property.title" :value="value" class="schema-property-key-value">
      <template v-if="isDefined && isJsonProperty" #value>
        <JsonView :value="jsonValue" />
      </template>
    </p-key-value>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { JsonView, JsonInput } from '.'
  import BlockDocumentKeyValue from '@/components/BlockDocumentKeyValue.vue'
  import { SchemaProperty, SchemaValue } from '@/types/schemas'
  import { stringifyUnknownJson } from '@/utilities/json'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
  }>()

  const isJsonProperty = computed(() => {
    return props.property.type === 'array' || props.property.meta?.component === JsonInput
  })

  const jsonValue = computed(() => stringifyUnknownJson(props.value))
  const isBlockDocumentProperty = computed(() => props.property.type === 'block')

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