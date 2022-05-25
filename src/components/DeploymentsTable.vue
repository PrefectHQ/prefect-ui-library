<template>
  <p-table :data="deployments" :columns="columns" class="deployments-table">
    <template #name="{ row }">
      <router-link :to="deploymentRoute(row.id)">
        <span>{{ row.name }}</span>
      </router-link>
    </template>
    <template #tags="{ row }">
      <p-tag-wrapper :tags="row.tags" justify="left" />
    </template>

    <template #action-heading>
      <span />
    </template>
    <template #action="{ row }">
      <p-icon-button-menu size="xs">
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :item="row.id" @click="close" />
          <p-overflow-menu-item label="Run" class="deployments-table__hide-on-desktop" />
          <delete-overflow-menu-item :id="row.id" :name="row.name" @remove="deleteDeployment(row.id)" />
        </template>
      </p-icon-button-menu>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PIconButtonMenu, POverflowMenuItem, showToast } from '@prefecthq/prefect-design'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import { Deployment } from '@/models'
  import { deploymentRouteKey } from '@/router'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { inject } from '@/utilities/inject'

  const deploymentRoute = inject(deploymentRouteKey)

  defineProps<{
    deployments: Deployment[],
  }>()

  const deploymentsApi = inject(deploymentsApiKey)

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '150px',
    },
    {
      property: 'schedule',
      label: 'Schedule',
      width: '200px',
    },
    {
      property: 'tags',
      label: 'Tags',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const emit = defineEmits(['refresh'])

  const deleteDeployment = async (id: string): Promise<void> => {
    try {
      await deploymentsApi.deleteDeployment(id)
      showToast('Flow deleted successfully!', 'success', undefined, 3000)
      emit('refresh')
    } catch (error) {
      showToast('Failed to delete flow!', 'error', undefined, 3000)
      console.error(error)
    }
  }
</script>

<style>
.deployments-table__hide-on-desktop {
  @apply
  sm:hidden
}
</style>