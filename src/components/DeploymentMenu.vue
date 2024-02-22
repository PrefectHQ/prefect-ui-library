<template>
  <p-icon-button-menu v-bind="$attrs">
    <DeploymentQuickRunOverflowMenuItem v-if="deployment.can.run && showAll" :deployment="deployment" :open-modal="openParametersModal" />

    <DeploymentCustomRunOverflowMenuItem v-if="deployment.can.run && showAll" :deployment="deployment" />

    <copy-overflow-menu-item label="Copy ID" :item="deployment.id" />

    <router-link v-if="!deployment.deprecated && deployment.can.update" :to="routes.deploymentEdit(deployment.id)">
      <p-overflow-menu-item label="Edit" />
    </router-link>

    <p-overflow-menu-item v-if="deployment.can.delete" label="Delete" @click="openConfirmDeleteModal" />

    <slot v-bind="{ deployment }" />
  </p-icon-button-menu>

  <ConfirmDeleteModal
    v-model:showModal="showConfirmDeleteModal"
    label="Deployment"
    :name="deployment.name"
    @delete="deleteDeployment(deployment.id)"
  />

  <QuickRunParametersModal v-model:showModal="showParametersModalV1" :deployment="deployment" />
  <QuickRunParametersModalV2 v-model:showModal="showParametersModalV2" :deployment="deployment" />
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
  import QuickRunParametersModalV2 from '@/components/QuickRunParametersModalV2.vue'
  import { useWorkspaceApi, useWorkspaceRoutes, useShowModal, useCan } from '@/compositions'
  import { Deployment } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    deployment: Deployment,
    showAll?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { showModal: showConfirmDeleteModal, open: openConfirmDeleteModal, close: closeConfirmDeleteModal } = useShowModal()
  const { showModal: showParametersModalV1, open: openParametersModalV1 } = useShowModal()
  const { showModal: showParametersModalV2, open: openParametersModalV2 } = useShowModal()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const can = useCan()

  function openParametersModal(): void {
    if (can.access.schemasV2) {
      openParametersModalV2()
      return
    }

    openParametersModalV1()
  }

  const deleteDeployment = async (id: string): Promise<void> => {
    closeConfirmDeleteModal()
    await deleteItem(id, api.deployments.deleteDeployment, 'Deployment')
    emits('delete', id)
  }
</script>