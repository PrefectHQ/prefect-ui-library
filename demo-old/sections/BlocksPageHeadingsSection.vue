<template>
  <DemoSection heading="Page Headings">
    <PageHeadingBlocks />
    <PageHeadingBlocksCatalog />
    <PageHeadingBlocksCatalogCreate :block-type="blockType" />
    <PageHeadingBlock :block-document="blockDocument" />
    <PageHeadingBlockEdit :block-document="blockDocument" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import PageHeadingBlock from '@/components/PageHeadingBlock.vue'
  import PageHeadingBlockEdit from '@/components/PageHeadingBlockEdit.vue'
  import PageHeadingBlocks from '@/components/PageHeadingBlocks.vue'
  import PageHeadingBlocksCatalog from '@/components/PageHeadingBlocksCatalog.vue'
  import PageHeadingBlocksCatalogCreate from '@/components/PageHeadingBlocksCatalogCreate.vue'
  import { mocker } from '@/services/Mocker'

  const blockType = mocker.create('blockType')
  const blockDocument = mocker.create('blockDocument')
</script>