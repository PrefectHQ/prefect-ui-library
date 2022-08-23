<template>
  <div class="task-run-details">
    <p-key-value label="Task Run ID" :value="taskRun.id" :alternate="alternate" />

    <p-key-value label="Flow Run ID" :value="taskRun.id" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(taskRun.created)" :alternate="alternate" />

    <p-key-value label="Updated" :value="formatDateTimeNumeric(taskRun.updated)" :alternate="alternate" />

    <p-key-value label="Task Version" :value="taskRun.taskVersion" :alternate="alternate" />

    <p-key-value label="Run Count" :value="taskRun.runCount ?? 0" :alternate="alternate" />

    <p-key-value label="Tags" :alternate="alternate">
      <template v-if="taskRun.tags?.length" #value>
        <p-tags :tags="taskRun.tags!" />
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTags, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { TaskRun } from '@/models/TaskRun'

  defineProps<{
    taskRun: TaskRun,
    alternate?: boolean,
  }>()
</script>

<style>
  .task-run-details {
    @apply
    flex
    flex-col
    gap-2
    items-start
  }

  .task-run-details__tags {
    @apply
    mb-1
    mr-1
  }
</style>