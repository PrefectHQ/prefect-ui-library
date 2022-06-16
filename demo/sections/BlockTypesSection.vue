<template>
  <DemoSection heading="Block Types">
    <DemoSubSection heading="Type select">
      <BlockTypeSelect v-model:selected="blockType" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockTypeSelect from '@/components/BlockTypeSelect.vue'

  const blockType = ref(null)
</script>