<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="schedule.id" />
    <p-overflow-menu-item v-if="deployment.can.update" label="Edit" @click="openEditModal" />
    <p-overflow-menu-item v-if="deployment.can.delete" label="Delete" @click="openConfirmDeleteModal" />
  </p-icon-button-menu>

  <ScheduleFormModal
    ref="scheduleFormModalRef"
    v-bind="schedule"
    :slug="schedule.slug"
    :deployment-parameters="deployment.parameters"
    :schedule-parameters="schedule.parameters"
    :parameter-open-api-schema="deployment.parameterOpenApiSchema"
    :deployment="deployment"
    :deployment-schedule-id="schedule.id"
    @submit="updateSchedule"
  />

  <ConfirmDeleteModal
    v-model:showModal="showConfirmDeleteModal"
    label="Schedule"
    :name="`${schedule.schedule.toString({ verbose: false }) } schedule`"
    @delete="deleteSchedule(deployment.id, schedule.id)"
  />
</template>

<script lang="ts" setup>
  import { ConfirmDeleteModal, CopyOverflowMenuItem, ScheduleFormModal } from '@/components'
  import { ScheduleFormModalMethods } from '@/components/ScheduleFormModal.vue'
  import { useShowModal, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentSchedule, DeploymentScheduleCompatible } from '@/models'
  import { deleteItem } from '@/utilities'
  import { showToast } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    deployment: Deployment,
    schedule: DeploymentSchedule,
  }>()

  const emit = defineEmits<{
    (event: 'update', value: DeploymentScheduleCompatible): void,
    (event: 'delete', value: string): void,
  }>()

  const api = useWorkspaceApi()

  const { showModal: showConfirmDeleteModal, open: openConfirmDeleteModal, close: closeConfirmDeleteModal } = useShowModal()

  const scheduleFormModalRef = ref<ScheduleFormModalMethods | null>(null)

  const openEditModal = (): void => {
    scheduleFormModalRef.value?.publicOpen?.()
  }

  const deleteSchedule = async (deploymentId: string, scheduleId: string): Promise<void> => {
    closeConfirmDeleteModal()
    await deleteItem([deploymentId, scheduleId], api.deploymentSchedules.deleteDeploymentSchedule, 'Schedule')
    emit('delete', scheduleId)
  }

  const updateSchedule = async (updatedSchedule: DeploymentScheduleCompatible): Promise<void> => {
    if (updatedSchedule.active === null || !updatedSchedule.schedule) {
      showToast('Unable to update schedule.', 'error')
      return
    }

    try {
      await api.deploymentSchedules.updateDeploymentSchedule(
        props.deployment.id,
        props.schedule.id,
        {
          active: updatedSchedule.active,
          schedule: updatedSchedule.schedule,
          jobVariables: updatedSchedule.jobVariables,
          parameters: updatedSchedule.parameters,
          slug: updatedSchedule.slug,
        },
      )
      showToast(localization.success.updateDeploymentSchedule, 'success')
      emit('update', updatedSchedule)
    } catch (error) {
      showToast(localization.error.updateDeploymentSchedule, 'error')
    }
  }
</script>