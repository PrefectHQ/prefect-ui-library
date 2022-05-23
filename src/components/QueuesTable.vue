<template>
  <p-table :data="queues" :columns="columns">
    <template #action>
      No Actions
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable } from '@prefecthq/prefect-design'
  import { WorkQueue } from '@/models'

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
      width: '100px',
    },
  ]
</script>