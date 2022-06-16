<template>
  <DemoSection heading="Block Documents">
    <DemoSubSection heading="Table">
      <BlockDocumentsTable :block-documents="blockDocuments" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockDocumentsTable from '@/components/BlockDocumentsTable.vue'
  import { mocker } from '@/services/Mocker'

  const blockDocuments = mocker.createMany('blockDocument', 5)
</script>