<template>
  <page-heading class="page-heading-task-run" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default>
          <copy-overflow-menu-item label="Copy ID" :item="taskRun.id" />
          <p-overflow-menu-item v-if="can.delete.task_run" label="Delete" @click="open" />
        </template>
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        label="Task Run"
        :name="taskRun.name!"
        @delete="deleteTaskRun(taskRun.id)"
      />
    </template>
    <slot>
      <div class="page-heading-task-run__header-meta">
        <StateBadge :state="taskRun.state" />
        <DurationIconText :duration="taskRun.duration" />
        <FlowRunIconText :flow-run-id="taskRun.flowRunId" />
      </div>
    </slot>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { StateBadge, PageHeading, DurationIconText, FlowRunIconText, CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useShowModal } from '@/compositions/useShowModal'
  import { TaskRun } from '@/models'
  import { flowRunRouteKey } from '@/router'
  import { taskRunsApiKey } from '@/services'
  import { canKey } from '@/types'
  import { deleteItem, inject } from '@/utilities'


  const props = defineProps<{
    taskRun: TaskRun,
  }>()
  const { showModal, open } = useShowModal()

  const taskRunsApi = inject(taskRunsApiKey)
  const flowRunRoute = inject(flowRunRouteKey)
  const can = inject(canKey)


  const crumbs = computed(() => [
    { text: 'Task Runs', to: flowRunRoute(props.taskRun.flowRunId) },
    { text: props.taskRun.name ?? '' },
  ])

  const emit = defineEmits(['delete'])

  const deleteTaskRun = async (id: string): Promise<void> => {
    await deleteItem(id, taskRunsApi.deleteTaskRun, 'Task run')
    emit('delete', id)
  }
</script>

<style>
.page-heading-task-run__header-meta {
  @apply
  flex
  gap-2
  items-center
  xl:hidden
}
</style>