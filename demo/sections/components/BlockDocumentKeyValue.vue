<template>
  <ComponentPage title="BlockDocumentKeyValue">
    <BlockDocumentKeyValue :block-document-id="blockDocument.id" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentKeyValue from '@/components/BlockDocumentKeyValue.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocument'

  const blockDocument = useBlockDocumentMock()
</script>
