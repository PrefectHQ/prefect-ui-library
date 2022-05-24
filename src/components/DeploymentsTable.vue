<template>
  <p-table :data="deployments" :columns="columns">
    <template #name="{ row }">
      <router-link :to="deploymentRoute(row.id)">
        <span>{{ row.name }}</span>
      </router-link>
    </template>
    <template #tags="{ row }">
      <p-tag-wrapper :tags="row.tags" justify="left" />
    </template>
    <template #action />
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models'
  import { deploymentRouteKey } from '@/router'
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
      label: '',
      width: '100px',
    },
  ]
</script>