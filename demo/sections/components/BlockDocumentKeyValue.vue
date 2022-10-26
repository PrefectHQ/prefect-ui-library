<template>
  <ComponentPage
    title="BlockDocumentKeyValue"
    :demos="[{ title: 'Basic' }]"
  >
    <template #description>
      This is where we add a short description of <p-code>BlockDocumentKeyValue</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <BlockDocumentKeyValue :block-document-id="document.id" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentKeyValue from '@/components/BlockDocumentKeyValue.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkspaceApiMock } from '@/demo/utilities/api'
  import { mocker } from '@/services'

  const document = mocker.create('blockDocumentResponse')

  useWorkspaceApiMock({
    blockDocuments: [document],
  })
</script>
