<template>
  <PKeyValue :label="property.title" :value="value" class="block-document-property">
    <template #value>
      <template v-if="isJsonProperty(value)">
        <JsonView :value="JSON.stringify(value ?? '')" />
      </template>
      <template v-else>
        <span>{{ value }}</span>
      </template>
    </template>
  </PKeyValue>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import JsonView from './JsonView.vue'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'

  const props = defineProps<{
    property: BlockSchemaSimpleProperty,
    value: unknown,
  }>()

  function isJsonProperty(value: unknown): value is string {
    return props.property.type === undefined || props.property.type === 'object'
  }
</script>