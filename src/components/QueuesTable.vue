<template>
  <p-table :data="queues" :columns="columns">
    <template #action>
      <slot name="table-action" />
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