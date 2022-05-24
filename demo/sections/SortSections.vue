<template>
  <DemoSection heading="Sorts">
    <DemoSubSection heading="Flow Runs Sort">
      <FlowRunsSort v-model="selectedSortOption" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { FlowRunsSort } from '@/components'
  import { FlowRunSortValues } from '@/types'

  const selectedSortOption = ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')
</script>