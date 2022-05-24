<template>
  <p-table :data="deployments" :columns="columns">
    <template #tags="{ row }">
      <p-tag-wrapper :tags="row.tags" justify="left" />
    </template>
    <template #action>
      <slot name="table-action" />
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper } from '@prefecthq/prefect-design'
  import { Deployment } from '@/models'

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
      width: '100px',
    },
  ]
</script>