<template>
  <PContent class="block-document-properties">
    <template v-for="(property, key) in blockSchema.fields.properties" :key="property.title">
      <template v-if="isBlockSchemaReferenceProperty(property)">
        <BlockDocumentKeyValue :block-document-id="getReferenceValue(key)!" />
      </template>
      <template v-else>
        <BlockDocumentProperty :property="property" :value="getPropertyValue(key)" />
      </template>
    </template>
  </PContent>
</template>

<script lang="ts" setup>
  import { PContent } from '@prefecthq/prefect-design'
  import BlockDocumentKeyValue from './BlockDocumentKeyValue.vue'
  import BlockDocumentProperty from './BlockDocumentProperty.vue'
  import { BlockDocumentData, BlockSchema } from '@/models'
  import { isBlockDocumentDataReference, isBlockSchemaReferenceProperty } from '@/utilities/blocks'

  const props = defineProps<{
    blockSchema: BlockSchema,
    data: BlockDocumentData,
  }>()

  function getPropertyValue(blockSchemaPropertyKey: string): unknown {
    return props.data[blockSchemaPropertyKey]
  }

  function getReferenceValue(blockSchemaPropertyKey: string): string | null {
    const value = getPropertyValue(blockSchemaPropertyKey)

    if (!isBlockDocumentDataReference(value)) {
      return null
    }

    return value.$ref.blockDocumentId
  }
</script>