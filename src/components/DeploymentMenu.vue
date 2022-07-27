<template>
  <p-icon-button-menu v-bind="$attrs">
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

<script lang="ts">
  import { PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DeploymentMenu',
    expose: [],
    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Deployment } from '@/models'
  import { editDeploymentRouteKey } from '@/router'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { canKey } from '@/types/permissions'
  import { inject, deleteItem } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { showModal, open, close } = useShowModal()

  const deploymentsApi = inject(deploymentsApiKey)
  const editDeploymentRoute = inject(editDeploymentRouteKey)

  const deleteDeployment = async (id: string): Promise<void> => {
    close()
    await deleteItem(id, deploymentsApi.deleteDeployment, 'Deployment')
    emits('delete', id)
  }

  const can = inject(canKey)
</script>