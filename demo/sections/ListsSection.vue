<template>
  <Section heading="Lists">
    <!--
      <SubSection heading="Flow List">
      <div class="grid gap-2">
      <template v-for="flow in flows" :key="flow.id">
      <FlowListItemInput v-model:selected="selected" :flow="flow" />
      </template>
      </div>
      </SubSection>
    -->

    <SubSection heading="Flow Run List" class="mt-auto">
      <div class="grid gap-2">
        <template v-for="flowRun in flowRuns" :key="flowRun.id">
          <FlowRunListItemInput v-model:selected="selectedFlowRuns" :value="flowRun.id" :flow-run="flowRun" />
        </template>
      </div>
      {{ selectedFlowRuns }}
    </SubSection>

    <SubSection heading="Task Run List" class="mt-auto">
      <div class="grid gap-2">
        <template v-for="taskRun in taskRuns" :key="taskRun.id">
          <TaskRunListItemInput v-model:selected="selectedTaskRuns" :value="taskRun.id" :task-run="taskRun" />
        </template>
      </div>
      {{ selectedTaskRuns }}
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity'
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import FlowListItemInput from '@/components/FlowListItemInput.vue'
  import FlowRunListItemInput from '@/components/FlowRunListItemInput.vue'
  import TaskRunListItemInput from '@/components/TaskRunListItemInput.vue'
  import { mocker } from '@/services'

  const flows = mocker.createMany('flow', 3)
  const flowRuns = mocker.createMany('flowRun', 4)
  const taskRuns = mocker.createMany('taskRun', 4)
  const selectedFlowRuns = ref<string[]>([])
  const selectedTaskRuns = ref<string[]>([])
</script>