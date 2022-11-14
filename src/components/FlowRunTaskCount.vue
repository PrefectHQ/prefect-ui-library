<template>
  <template v-if="tasksCount">
    <div class="flow-run-task-count">
      <p-icon-text icon="Task">
        <slot v-bind="{ tasksCount }">
          {{ tasksCount }}
        </slot>
      </p-icon-text>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useTaskRunsCount } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const flowRunId = computed(()=>props.flowRun.id)
  const tasksCount = useTaskRunsCount(flowRunId)
</script>