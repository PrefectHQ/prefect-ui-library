<template>
  <ComponentPage title="BlockDocumentsTable">
    <div class="h-96">
      <BlockDocumentsTable :block-documents="blockDocuments" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentsTable from '@/components/BlockDocumentsTable.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentsMock } from '@/demo/compositions/useBlockDocumentMock'

  const blockDocuments = useBlockDocumentsMock(10)
</script>
