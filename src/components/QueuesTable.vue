<template>
  <p-table :data="queues" :columns="columns">
    <template #name="{ row }">
      <router-link :to="workQueueRoute(row.id)">
        <span>{{ row.name }}</span>
      </router-link>
    </template>
    <template #action />
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
      label: '',
      width: '100px',
    },
  ]
</script>