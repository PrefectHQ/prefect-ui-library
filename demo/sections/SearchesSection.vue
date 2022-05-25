<template>
  <DemoSection heading="Searches">
    <DemoSubSection heading="Flow Runs Search">
      <FlowRunsSearch v-model="flowRunSearchInput" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { FlowRunsSearch } from '@/components'

  const flowRunSearchInput = ref<string | null | undefined>(null)
</script>