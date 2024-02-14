<template>
  <p-icon-button-menu v-bind="$attrs">
    <DeploymentQuickRunOverflowMenuItem v-if="deployment.can.run && showAll" :deployment="deployment" :open-modal="openParametersModal" />

    <copy-overflow-menu-item label="Copy ID" :item="schedule.id" />

    <router-link v-if="!deployment.deprecated && deployment.can.update" :to="routes.deploymentEdit(deployment.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>

    <p-overflow-menu-item v-if="deployment.can.delete" label="Delete" @click="openConfirmDeleteModal" />

    <slot v-bind="{ deployment }" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showConfirmDeleteModal"
    label="Schedule"
    :name="`${schedule.schedule.toString({ verbose: false }) } schedule`"
    @delete="deleteSchedule(deployment.id, schedule.id)"
  />

  <QuickRunParametersModal v-model:showModal="showParametersModal" :deployment="deployment" />
</template>

<script lang="ts">
  export default {
    name: 'DeploymentMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { DeploymentQuickRunOverflowMenuItem, ConfirmDeleteModal, CopyOverflowMenuItem, QuickRunParametersModal } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes, useShowModal } from '@/compositions'
  import { Deployment, DeploymentSchedule } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    deployment: Deployment,
    schedule: DeploymentSchedule,
    showAll?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { showModal: showConfirmDeleteModal, open: openConfirmDeleteModal, close: closeConfirmDeleteModal } = useShowModal()
  const { showModal: showParametersModal, open: openParametersModal } = useShowModal()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const deleteSchedule = async (deploymentId: string, scheduleId: string): Promise<void> => {
    closeConfirmDeleteModal()
    await deleteItem([deploymentId, scheduleId], api.deploymentSchedules.deleteDeploymentSchedule, 'Schedule')
    emits('delete', scheduleId)
  }
</script>