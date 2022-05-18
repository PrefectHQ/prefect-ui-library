<template>
  <VirtualScroller :items="taskRuns" class="task-run-list">
    <template #default="{ item: taskRun }">
      <TaskRunListItem v-model:selected="model" v-bind="{ taskRun, disabled }" class="task-run-list__item" />
    </template>
  </VirtualScroller>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import TaskRunListItem from './TaskRunListItem.vue'
  import VirtualScroller from './VirtualScroller.vue'
  import { TaskRun } from '@/models/TaskRun'

  const props = defineProps<{
    selected: string[] | null,
    taskRuns: TaskRun[],
    disabled?: boolean,
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