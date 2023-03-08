<template>
  <p-icon-button-menu v-bind="$attrs">
    <DeploymentQuickRunOverflowMenuItem v-if="can.run.deployment && showAll" :deployment="deployment" :open-modal="openParametersModal" />

    <DeploymentCustomRunOverflowMenuItem v-if="can.run.deployment && showAll" :deployment-id="deployment.id" />

    <copy-overflow-menu-item label="Copy ID" :item="deployment.id" />

    <router-link v-if="!deployment.deprecated && can.update.deployment" :to="routes.deploymentEdit(deployment.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>

    <p-overflow-menu-item v-if="can.delete.deployment" label="Delete" @click="openConfirmDeleteModal" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showConfirmDeleteModal"
    label="Deployment"
    :name="deployment.name"
    @delete="deleteDeployment(deployment.id)"
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
  import { DeploymentQuickRunOverflowMenuItem, DeploymentCustomRunOverflowMenuItem, ConfirmDeleteModal, CopyOverflowMenuItem, QuickRunParametersModal } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes, useCan, useShowModal } from '@/compositions'
  import { Deployment } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    deployment: Deployment,
    showAll?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal: showConfirmDeleteModal, open: openConfirmDeleteModal, close: closeConfirmDeleteModal } = useShowModal()
  const { showModal: showParametersModal, open: openParametersModal } = useShowModal()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const deleteDeployment = async (id: string): Promise<void> => {
    closeConfirmDeleteModal()
    await deleteItem(id, api.deployments.deleteDeployment, 'Deployment')
    emits('delete', id)
  }
</script>