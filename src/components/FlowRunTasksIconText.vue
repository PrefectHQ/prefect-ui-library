<template>
  <p-icon-text icon="Task" class="flow-run-tasks-icon-text">
    <template v-if="hasTasks">
      <span class="flow-run-parameters-icon-text__button">
        {{ tasksCount }} {{ toPluralString('Task run', tasksCount) }}
      </span>
    </template>
    <template v-else>
      <span class="flow-run-tasks-icon-text__none">0 Task runs</span>
    </template>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useTaskRunsCount } from '@/compositions/useTaskRunsCount'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { count: taskRunsCount } = useTaskRunsCount(() => ({
    flowRuns: {
      id: [props.flowRun.id],
    },
  }))

  const tasksCount = computed(() => taskRunsCount.value ?? 0)
  const hasTasks = computed(() => tasksCount.value > 0)
</script>

<style>
.flow-run-tasks-icon-text__none { @apply
  text-subdued
}
</style>