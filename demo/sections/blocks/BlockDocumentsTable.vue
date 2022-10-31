<template>
  <ComponentPage title="BlockDocumentsTable">
    <!-- eslint-disable-next-line vue/no-static-inline-styles -->
    <div style="min-height: 600px">
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
