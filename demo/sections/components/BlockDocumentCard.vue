<template>
  <ComponentPage title="Block Document Card" :demos="[{ title: 'Block Document Card' }]">
    <template #description>
      This is where we add a short description of <p-code>p-block-document-card</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #block-document-card>
      <BlockDocumentCard :block-document="blockDocument" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentCard from '@/components/BlockDocumentCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkspaceApiMock } from '@/demo/utilities/api'
  import { mapper, mocker } from '@/services'

  const blockDocumentResponse = mocker.create('blockDocumentResponse')
  const blockDocument = mapper.map('BlockDocumentResponse', blockDocumentResponse, 'BlockDocument')
  const { block_schema } = blockDocumentResponse

  useWorkspaceApiMock({
    blockDocuments: [blockDocumentResponse],
    blockSchemas: [block_schema],
  })
</script>