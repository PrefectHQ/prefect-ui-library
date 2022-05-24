<template>
  <p-table :data="queues" :columns="columns">
    <template #name="{ row }">
      <router-link :to="workQueueRoute(row.id)">
        <span>{{ row.name }}</span>
      </router-link>
    </template>

    <template #action-heading>
      <span />
    </template>
    <template #action>
      <p-icon-button-menu size="xs">
        <template #default>
          <p-overflow-menu-item label="Copy ID" />
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable } from '@prefecthq/prefect-design'
  import { WorkQueue } from '@/models'
  import { workQueueRouteKey } from '@/router'
  import { inject } from '@/utilities/inject'

  const workQueueRoute = inject(workQueueRouteKey)

  defineProps<{
    queues: WorkQueue[],
  }>()

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '150px',
    },
    {
      property: 'concurrencyLimit',
      label: 'Concurrency',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]
</script>