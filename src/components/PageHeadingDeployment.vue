<template>
  <page-heading class="page-heading-deployment" :crumbs="crumbs">
    <template #actions>
      <DeploymentToggle :deployment="deployment" @update="emit('update')" />

      <RunButton v-if="can.create.flow_run" :deployment="deployment" />

      <p-icon-button-menu>
        <copy-overflow-menu-item label="Copy ID" :item="deployment.id" />

        <router-link v-if="can.update.deployment" :to="editDeploymentRoute(deployment.id)">
          <p-overflow-menu-item label="Edit" />
        </router-link>

        <p-overflow-menu-item v-if="can.delete.deployment" label="Delete" @click="open" />
      </p-icon-button-menu>
      <ConfirmDeleteModal
        v-model:showModal="showModal"
        label="Deployment"
        :name="deployment.name"
        @delete="deleteDeployment(deployment.id)"
      />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import RunButton from './RunButton.vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Deployment } from '@/models'
  import { flowRouteKey, editDeploymentRouteKey } from '@/router'
  import { flowsApiKey } from '@/services'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types/permissions'
  import { deleteItem, inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)
  const flowsApi = inject(flowsApiKey)

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const { showModal, open } = useShowModal()

  const deploymentsApi = inject(deploymentsApiKey)
  const editDeploymentRoute = inject(editDeploymentRouteKey)

  const flowSubscription = useSubscription(flowsApi.getFlow, [props.deployment.flowId])
  const flowName = computed(() => flowSubscription.response?.name ?? '')

  const crumbs = computed(() => [{ text: flowName.value, to: flowRoute(props.deployment.flowId) }, { text: props.deployment.name }])

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const deleteDeployment = async (id: string): Promise<void> => {
    await deleteItem(id, deploymentsApi.deleteDeployment, 'Deployment')
    emit('delete')
  }

  const can = inject(canKey)
</script>

<style>
.page-heading-deployment__run-icon { @apply
  w-5
  h-5
}
</style>