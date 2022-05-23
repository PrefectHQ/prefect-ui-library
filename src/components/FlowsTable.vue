<template>
  <p-table :data="flows" :columns="columns">
    <template #tags="{ row }">
      <p-tag-wrapper :tags="row.tags" justify="left" />
    </template>
    <template #action>
      No Actions
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper } from '@prefecthq/prefect-design'
  import { Flow } from '@/models'

  defineProps<{
    flows: Flow[],
  }>()

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '150px',
    },
    {
      property: 'activity',
      label: 'Activity',
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