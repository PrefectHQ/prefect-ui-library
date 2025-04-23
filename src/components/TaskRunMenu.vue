<template>
  <p-icon-button-menu class="task-run-menu" v-bind="$attrs">
    <template #default>
      <copy-overflow-menu-item label="Copy ID" :item="taskRun.id" />
      <p-overflow-menu-item v-if="showChangeStateMenuItemButton" label="Change state" @click="openStateChangeModal" />
      <p-overflow-menu-item v-if="can.delete.task_run" label="Delete" @click="openDeleteModal" />
    </template>
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showDeleteModal"
    label="Task Run"
    :name="taskRun.name!"
    @delete="() => deleteTaskRun()"
  />

  <ConfirmStateChangeModal
    v-model:showModal="showStateChangeModal"
    :run="taskRun"
    label="Task Run"
    @change="changeTaskRunState"
  />
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { CopyOverflowMenuItem, ConfirmDeleteModal, ConfirmStateChangeModal } from '@/components'
  import { useCan, useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { isTerminalStateType, StateUpdateDetails, TaskRun } from '@/models'
  import { getApiErrorMessage } from '@/utilities'
  import { deleteItem } from '@/utilities/delete'

  defineOptions({
    inheritAttrs: false,
  })

  const { taskRun } = defineProps<{
    taskRun: TaskRun,
  }>()

  const emit = defineEmits(['delete', 'update'])

  const can = useCan()
  const api = useWorkspaceApi()

  const showChangeStateMenuItemButton = computed(() => {
    if (can.update.task_run && taskRun.stateType && isTerminalStateType(taskRun.stateType)) {
      return true
    }

    return false
  })

  const { showModal: showStateChangeModal, open: openStateChangeModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  const deleteTaskRun = async (): Promise<void> => {
    await deleteItem(taskRun.id, api.taskRuns.deleteTaskRun, 'Task run')

    emit('delete', taskRun.id)
  }

  const changeTaskRunState = async (values: StateUpdateDetails): Promise<void> => {
    try {
      await api.taskRuns.setTaskRunState(taskRun.id, { state: values })

      emit('update')

      showToast(localization.success.changeTaskRunState, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.changeTaskRunState)

      showToast(message, 'error')
    }
  }
</script>