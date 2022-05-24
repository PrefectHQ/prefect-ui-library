<template>
  <p-table :data="flows" :columns="columns">
    <template #name="{ row }">
      <router-link :to="flowRoute(row.id)">
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
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PIconButtonMenu, POverflowMenuItem } from '@prefecthq/prefect-design'
  import { Flow } from '@/models'
  import { flowRouteKey } from '@/router'
  import { copyId } from '@/utilities/copy'
  import { inject } from '@/utilities/inject'

  const flowRoute = inject(flowRouteKey)

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
      width: '42px',
    },
  ]
</script>