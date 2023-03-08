<template>
  <ComponentPage title="BlockDocumentCombobox">
    <div class="h-64">
      <BlockDocumentCombobox v-model:selected="selected" :block-documents="blockDocuments" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import BlockDocumentCombobox from '@/components/BlockDocumentCombobox.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentsMock } from '@/demo/compositions/useBlockDocumentMock'

  const selected = ref(null)
  const blockDocuments = useBlockDocumentsMock(5)
</script>