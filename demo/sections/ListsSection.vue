<template>
  <Section heading="Lists">
    <SubSection heading="Flow Run List" class="mt-auto">
      <FlowRunList v-model:selected="selectedFlowRuns" :flow-runs="flowRuns" />
      {{ selectedFlowRuns }}
    </SubSection>

    <SubSection heading="Task Run List" class="mt-auto">
      <TaskRunList v-model:selected="selectedTaskRuns" :task-runs="taskRuns" />
      {{ selectedTaskRuns }}
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import TaskRunList from '@/components/TaskRunList.vue'
  import { mocker } from '@/services'

  const flowRuns = mocker.createMany('flowRun', 4)
  const taskRuns = mocker.createMany('taskRun', 4)
  const selectedFlowRuns = ref<string[]>([])
  const selectedTaskRuns = ref<string[]>([])
</script>