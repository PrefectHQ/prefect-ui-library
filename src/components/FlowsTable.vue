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
          <copy-overflow-menu-item label="Copy ID" :item="row.id" @click="close" />
          <delete-overflow-menu-item :name="row.name" @delete="deleteFlow(row.id, close)" />
        </template>
      </p-icon-button-menu>
    </template>

    <template #empty-state>
      <PEmptyResults>
        <template #actions>
          <p-button size="sm" secondary @click="emit('clear')">
            Clear Filters
          </p-button>
        </template>
      </PEmptyResults>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PIconButtonMenu, PEmptyResults } from '@prefecthq/prefect-design'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import { Flow } from '@/models'
  import { flowRouteKey } from '@/router'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject, deleteItem } from '@/utilities'

  const flowRoute = inject(flowRouteKey)
  const flowsApi = inject(flowsApiKey)

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

  const emit = defineEmits(['delete', 'clear'])

  const deleteFlow = async (id: string, close: () => void): Promise<void> => {
    close()
    await deleteItem(id, flowsApi.deleteFlow, 'Flow')
    emit('delete', id)
  }
</script>