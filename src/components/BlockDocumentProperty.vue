<template>
  <PKeyValue :label="property.title" :value="value" class="block-document-property">
    <template v-if="value && isJsonProperty" #value>
      <JsonView :value="stringify(value)" />
    </template>
  </PKeyValue>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import JsonView from './JsonView.vue'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'

  const props = defineProps<{
    property: BlockSchemaSimpleProperty,
    value: unknown,
  }>()

  const isJsonProperty = computed(() => props.property.type === 'object')

  function stringify(value: unknown): string {
    if (typeof value === 'string') {
      return value
    }

    return JSON.stringify(value, undefined, 2)
  }
</script>