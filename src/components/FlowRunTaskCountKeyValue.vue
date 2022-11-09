<template>
  <p-key-value label="Task Runs" :alternate="alternate" class="flow-run-task-count-key-value">
    <template v-if="tasksCount" #value>
      <FlowRunTaskCount :flow-run="flowRun" />
    </template>
  </p-key-value>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import FlowRunTaskCount from './FlowRunTaskCount.vue'
  import { useTaskRunsCount } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    flowRun: FlowRun,
    alternate?: boolean,
  }>()

  const flowRunId = computed(()=>props.flowRun.id)
  const tasksCount = useTaskRunsCount(flowRunId)
</script>
