<template>
  <p-icon-button-menu v-bind="$attrs">
    <DeploymentQuickRunOverflowMenuItem v-if="deployment.can.run && showAll" :deployment="deployment" :open-modal="openParametersModal" />

    <DeploymentCustomRunOverflowMenuItem v-if="deployment.can.run && showAll" :deployment="deployment" />

    <copy-overflow-menu-item label="Copy ID" :item="deployment.id" />

    <router-link v-if="!deployment.deprecated && deployment.can.update" :to="routes.deploymentEdit(deployment.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>

    <p-overflow-menu-item v-if="deployment.can.delete" label="Delete" @click="openConfirmDeleteModal" />

    <p-overflow-menu-item v-if="allowDuplicate" label="Duplicate" :to="routes.deploymentDuplicate(deployment.id)" />

    <slot v-bind="{ deployment }" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showConfirmDeleteModal"
    label="Deployment"
    :name="deployment.name"
    @delete="deleteDeployment(deployment.id)"
  />

  <QuickRunParametersModal v-model:showModal="showParametersModal" :deployment="deployment" />
</template>

<script lang="ts" setup>
  import { DeploymentQuickRunOverflowMenuItem, DeploymentCustomRunOverflowMenuItem, ConfirmDeleteModal, CopyOverflowMenuItem } from '@/components'
  import QuickRunParametersModal from '@/components/QuickRunParametersModal.vue'
  import { useWorkspaceApi, useWorkspaceRoutes, useShowModal } from '@/compositions'
  import { Deployment } from '@/models'
  import { deleteItem } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

  defineProps<{
    deployment: Deployment,
    showAll?: boolean,
    allowDuplicate?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

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