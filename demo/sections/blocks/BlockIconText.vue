<template>
  <ComponentPage title="BlockIconText">
    <BlockIconText :block-document-id="blockDocument.id" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockIconText from '@/components/BlockIconText.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocumentMock'

  const blockDocument = useBlockDocumentMock()
</script>
