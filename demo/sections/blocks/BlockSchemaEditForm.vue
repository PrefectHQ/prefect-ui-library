<template>
  <ComponentPage title="BlockSchemaEditForm">
    <BlockSchemaEditForm v-bind="{ blockSchema, data, name }" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockSchemaEditForm from '@/components/BlockSchemaEditForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocumentMock'
  import { useBlockSchemaMock } from '@/demo/compositions/useBlockSchemaMock'

  const blockSchema = useBlockSchemaMock()
  const { data, name } = useBlockDocumentMock({
    blockSchema,
    blockSchemaId: blockSchema.id,
    blockType: blockSchema.blockType,
    blockTypeId: blockSchema.blockType.id,
  })
</script>