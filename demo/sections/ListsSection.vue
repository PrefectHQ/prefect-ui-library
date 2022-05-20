<template>
  <DemoSection heading="Lists">
    <DemoSubSection heading="Flow Run List" class="mt-auto">
      <FlowRunList v-model:selected="selectedFlowRuns" :flow-runs="flowRuns" />
      {{ selectedFlowRuns }}
    </DemoSubSection>

    <DemoSubSection heading="Task Run List" class="mt-auto">
      <TaskRunList v-model:selected="selectedTaskRuns" :task-runs="taskRuns" />
      {{ selectedTaskRuns }}
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import TaskRunList from '@/components/TaskRunList.vue'
  import { mocker } from '@/services'

  const flowRuns = mocker.createMany('flowRun', 4)
  const taskRuns = mocker.createMany('taskRun', 4)
  const selectedFlowRuns = ref<string[]>([])
  const selectedTaskRuns = ref<string[]>([])
</script>