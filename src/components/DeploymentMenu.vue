<template>
  <RunMenu v-if="can.run.deployment && media.sm" :disabled="deployment.deprecated">
    <template #buttons>
      <DeploymentQuickRunOverflowMenuItem :deployment="deployment" :open-modal="openParametersModal" @run="quickRunDeployment" />
      <DeploymentCustomRunOverflowMenuItem :deployment-id="deployment.id" />
    </template>
  </RunMenu>

  <p-icon-button-menu v-bind="$attrs">
    <DeploymentQuickRunOverflowMenuItem v-if="!deployment.deprecated && can.run.deployment && !media.sm" :deployment="deployment" :open-modal="openParametersModal" @run="quickRunDeployment" />
    <DeploymentCustomRunOverflowMenuItem v-if="!deployment.deprecated && can.run.deployment && !media.sm" :deployment-id="deployment.id" />

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

  <QuickRunParametersModal v-model:showModal="showParametersModal" :deployment="deployment" @run="quickRunDeployment" />
</template>

<script lang="ts">
  export default {
    name: 'DeploymentMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { media, showToast } from '@prefecthq/prefect-design'
  import { h } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    DeploymentQuickRunOverflowMenuItem,
    DeploymentCustomRunOverflowMenuItem,
    ConfirmDeleteModal,
    CopyOverflowMenuItem,
    ToastFlowRunCreate
  } from '@/components'
  import QuickRunParametersModal from '@/components/QuickRunParametersModal.vue'
  import RunMenu from '@/components/RunMenu.vue'
  import { useWorkspaceApi, useWorkspaceRoutes, useCan, useShowModal } from '@/compositions'
  import { Deployment, DeploymentFlowRunCreate } from '@/models'
  import { deleteItem } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const can = useCan()

  const { showModal: showConfirmDeleteModal, open: openConfirmDeleteModal, close: closeConfirmDeleteModal } = useShowModal()
  const { showModal: showParametersModal, open: openParametersModal, close: closeParametersModal } = useShowModal()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const router = useRouter()

  const deleteDeployment = async (id: string): Promise<void> => {
    closeConfirmDeleteModal()
    await deleteItem(id, api.deployments.deleteDeployment, 'Deployment')
    emits('delete', id)
  }

  const quickRunDeployment = async (id: string, value: DeploymentFlowRunCreate): Promise<void> => {
    closeParametersModal()
    const flowRun = await api.deployments.createDeploymentFlowRun(id, value)

    const toastMessage = h(ToastFlowRunCreate, { flowRun, flowRunRoute: routes.flowRun, router, immediate: true })
    showToast(toastMessage, 'success')
  }
</script>