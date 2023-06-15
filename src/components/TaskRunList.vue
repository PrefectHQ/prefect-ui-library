<template>
  <p-virtual-scroller :items="taskRuns" class="task-run-list">
    <template #default="{ item: taskRun }">
      <TaskRunListItem v-model:selected="model" v-bind="{ taskRun, selectable }" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import TaskRunListItem from '@/components/TaskRunListItem.vue'
  import { TaskRun } from '@/models/TaskRun'

  const props = defineProps<{
    selectable?: boolean,
    selected?: string[] | null,
    taskRuns: TaskRun[],
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string[]): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? []
    },
    set(value: string[]) {
      emit('update:selected', value)
    },
  })
</script>

<style>
.task-run-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}
</style>