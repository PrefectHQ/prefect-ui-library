<template>
  <page-heading class="page-heading-task-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="taskRun.state" />
    </template>
    <template #actions>
      <p-icon-button-menu>
        <template #default>
          <p-overflow-menu-item v-if="showChangeStateMenuItemButton" label="Change state" @click="openChangeStateModal" />
          <copy-overflow-menu-item label="Copy ID" :item="taskRun.id" />
          <p-overflow-menu-item v-if="can.delete.task_run" label="Delete" @click="openDeleteModal" />
        </template>
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showDeleteModal"
        label="Task Run"
        :name="taskRun.name!"
        @delete="deleteTaskRun(taskRun.id)"
      />

      <ConfirmStateChangeModal
        v-model:showModal="showStateChangeModal"
        :run="taskRun"
        label="Task Run"
        @change="changeTaskRunState"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { StateBadge, PageHeading, CopyOverflowMenuItem, ConfirmDeleteModal, ConfirmStateChangeModal } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'
  import { StateUpdateDetails, TaskRun, terminalStateType } from '@/models'
  import { flowRunRouteKey } from '@/router'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    taskRun: TaskRun,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const flowRunRoute = inject(flowRunRouteKey)

  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [props.taskRun.flowRunId])
  const flowRunName = computed(() => flowRunSubscription.response?.name)

  const crumbs = computed(() => [
    { text: flowRunName.value ?? '', to: flowRunRoute(props.taskRun.flowRunId) },
    { text: props.taskRun.name ?? '' },
  ])

  const showChangeStateMenuItemButton = computed(() => {
    if (can.update.task_run && props.taskRun.stateType && terminalStateType.includes(props.taskRun.stateType)) {
      return true
    }

    return false
  })

  const showStateChangeModal = ref(false)
  const openChangeStateModal = (): void => {
    showStateChangeModal.value = true
  }

  const showDeleteModal = ref(false)
  const openDeleteModal = (): void => {
    showDeleteModal.value = true
  }

  const emit = defineEmits(['delete'])

  const deleteTaskRun = async (id: string): Promise<void> => {
    await deleteItem(id, api.taskRuns.deleteTaskRun, 'Task run')
    emit('delete', id)
  }

  const changeTaskRunState = async (values: StateUpdateDetails): Promise<void> => {
    try {
      await api.taskRuns.setTaskRunState(props.taskRun.id, { state: values })
      showToast(localization.success.changeTaskRunState, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.changeTaskRunState, 'error')
    }
  }
</script>