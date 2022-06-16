<template>
  <DemoSection heading="Block Documents">
    <DemoSubSection heading="Table">
      <BlockDocumentsTable :block-documents="blockDocuments" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { provide } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockDocumentsTable from '@/components/BlockDocumentsTable.vue'
  import { blockTypesApiKey } from '@/services'
  import { mocker } from '@/services/Mocker'

  const blockDocuments = mocker.createMany('blockDocument', 5)
  const blockTypes = blockDocuments.map(({ blockType }) => blockType)

  provide(blockTypesApiKey, mocker.create('blockTypesApi', [
    {
      blockTypes,
    },
  ]))
</script>