<template>
  <template v-if="isBlockDocumentProperty && typeof value === 'string'">
    <BlockDocumentKeyValue :block-document-id="value" />
  </template>
  <!-- todo: support displaying nested objects -->
  <template v-else>
    <PKeyValue :label="property.title" :value="value" class="schema-property">
      <template v-if="isJsonProperty" #value>
        <JsonView :value="jsonValue" />
      </template>
    </PKeyValue>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockDocumentKeyValue from './BlockDocumentKeyValue.vue'
  import { JsonView, JsonInput } from '.'
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
</script>