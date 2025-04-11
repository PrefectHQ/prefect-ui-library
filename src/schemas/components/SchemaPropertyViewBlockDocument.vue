<template>
  <div>
    <!-- Placeholder for block document view -->
    {{ property }}: {{ value }}
  </div>
</template>

<script lang="ts" setup>
  import { SchemaProperty } from '@/schemas/types/schema'
  import { BlockDocumentReferenceValue } from '@/schemas/types/schemaValues'
  import { Require } from '@/types/utilities'

  const { property, value } = defineProps<{
    property: Require<SchemaProperty, 'blockTypeSlug'>,
    value: BlockDocumentReferenceValue | undefined,
  }>()
</script>