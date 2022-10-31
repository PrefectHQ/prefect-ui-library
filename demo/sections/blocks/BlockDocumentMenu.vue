<template>
  <ComponentPage title="BlockDocumentMenu">
    <div class="h-64">
      <BlockDocumentMenu :block-document="blockDocument" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockDocumentMenu from '@/components/BlockDocumentMenu.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentMock } from '@/demo/compositions/useBlockDocumentMock'

  const blockDocument = useBlockDocumentMock()
</script>