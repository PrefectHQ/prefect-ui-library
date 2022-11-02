<template>
  <ComponentPage title="BlockDocumentCard">
    <BlockDocumentCard :block-document="blockDocument" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentCard from '@/components/BlockDocumentCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocumentMock'

  const blockDocument = useBlockDocumentMock()
</script>