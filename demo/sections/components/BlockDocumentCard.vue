<template>
  <ComponentPage title="Block Document Card" :demos="[{ title: 'Block Document Card' }]">
    <template #description>
      This is where we add a short description of <p-code>p-block-document-card</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <BlockDocumentCard :block-document="blockDocument" />

    <template #block-document-card>
      <BlockDocumentCard :block-document="blockDocument" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentCard from '@/components/BlockDocumentCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocument'

  const blockDocument = useBlockDocumentMock()
</script>