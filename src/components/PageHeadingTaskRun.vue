<template>
  <page-heading class="page-heading-task-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="taskRun.state" />
    </template>
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
  </page-heading>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { StateBadge, PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { TaskRun } from '@/models'
  import { flowRunRouteKey } from '@/router'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    taskRun: TaskRun,
  }>()
  const { showModal, open } = useShowModal()

  const can = useCan()
  const api = useWorkspaceApi()
  const flowRunRoute = inject(flowRunRouteKey)

  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [props.taskRun.flowRunId])
  const flowRunName = computed(() => flowRunSubscription.response?.name)

  const crumbs = computed(() => [
    { text: flowRunName.value ?? '', to: flowRunRoute(props.taskRun.flowRunId) },
    { text: props.taskRun.name ?? '' },
  ])

  const emit = defineEmits(['delete'])

  const deleteTaskRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.taskRuns.deleteTaskRun, 'Task run')
    emit('delete', id)
  }
</script>