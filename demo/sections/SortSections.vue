<template>
  <DemoSection heading="Sorts">
    <DemoSubSection heading="Flow Runs Sort">
      <FlowRunsSort v-model="selectedFlowRunSortOption" />
    </DemoSubSection>
    <DemoSubSection heading="Flow Runs Sort">
      <TaskRunsSort v-model="selectedTaskRunSortOption" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { FlowRunsSort, TaskRunsSort } from '@/components'
  import { FlowRunSortValues, TaskRunSortValues } from '@/types'

  const selectedFlowRunSortOption = ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')
  const selectedTaskRunSortOption = ref<TaskRunSortValues>('EXPECTED_START_TIME_DESC')
</script>