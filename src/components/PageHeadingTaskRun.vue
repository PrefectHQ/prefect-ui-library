<template>
  <page-heading v-if="taskRun" class="page-heading-task-run" :crumbs="crumbs">
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
        @delete="deleteTaskRun(taskRunId)"
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
  import { StateUpdateDetails, terminalStateType } from '@/models'
  import { flowRunRouteKey } from '@/router'
  import { deleteItem, inject } from '@/utilities'

  const props = defineProps<{
    taskRunId: string,
    flowRunId: string,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const flowRunRoute = inject(flowRunRouteKey)
  const taskRunSubscription =  useSubscription(api.taskRuns.getTaskRun, [props.taskRunId])
  const taskRun = computed(() => taskRunSubscription.response)

  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [props.flowRunId])
  const flowRunName = computed(() => flowRunSubscription.response?.name)


  const crumbs = computed(() => [
    { text: flowRunName.value ?? '', to: flowRunRoute(props.flowRunId) },
    { text: taskRun.value?.name ?? '' },
  ])

  const showChangeStateMenuItemButton = computed(() => {
    if (can.update.task_run && taskRun.value?.stateType && terminalStateType.includes(taskRun.value.stateType)) {
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
      await api.taskRuns.setTaskRunState(props.taskRunId, { state: values })
      taskRunSubscription.refresh()
      showToast(localization.success.changeTaskRunState, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.changeTaskRunState, 'error')
    }
  }
</script>