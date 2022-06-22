<template>
  <DemoSection heading="Block Types">
    <DemoSubSection heading="Type select">
      <BlockTypeSelect v-model:selected="selectedBlockType" />
    </DemoSubSection>
    <DemoSubSection heading="Card">
      <BlockTypeCard :block-type="blockType" />
    </DemoSubSection>
    <DemoSubSection heading="List">
      <BlockTypeList :block-types="blockTypes" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockTypeCard from '@/components/BlockTypeCard.vue'
  import BlockTypeList from '@/components/BlockTypeList.vue'
  import BlockTypeSelect from '@/components/BlockTypeSelect.vue'
  import { mocker } from '@/services'

  const selectedBlockType = ref(null)
  const blockType = mocker.create('blockType')
  const blockTypes = mocker.createMany('blockType', 8)
</script>