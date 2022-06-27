<template>
  <PKeyValue :label="property.title" :value="value" class="block-document-property" />
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'

  defineProps<{
    property: BlockSchemaSimpleProperty,
    value: unknown,
  }>()
</script>