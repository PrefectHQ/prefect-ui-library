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
          <p-overflow-menu-item label="Copy ID" @click="copyId(row.id); close()" />
          <p-overflow-menu-item label="Run" class="deployments-table__hide-on-desktop" />
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models'
  import { deploymentRouteKey } from '@/router'
  import { copyId } from '@/utilities/copy'
  import { inject } from '@/utilities/inject'

  const deploymentRoute = inject(deploymentRouteKey)

  defineProps<{
    deployments: Deployment[],
  }>()

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
</script>

<style>
.deployments-table__hide-on-desktop {
  @apply
  sm:hidden
}
</style>