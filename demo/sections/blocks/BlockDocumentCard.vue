<template>
  <ComponentPage title="Block Document Card">
    <BlockDocumentCard :block-document="blockDocument" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentCard from '@/components/BlockDocumentCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocument'

  const blockDocument = useBlockDocumentMock()
</script>