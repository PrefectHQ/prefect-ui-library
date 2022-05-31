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

    <template #action="{ row }">
      <p-icon-button-menu size="xs">
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :item="row.id" @click="close" />
          <delete-overflow-menu-item :name="row.name" @delete="deleteWorkQueue(row.id, close)" />
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
  import { PTable, PEmptyResults } from '@prefecthq/prefect-design'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import { WorkQueue } from '@/models'
  import { workQueueRouteKey } from '@/router'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject, deleteItem } from '@/utilities'

  const workQueueRoute = inject(workQueueRouteKey)
  const workQueuesApi = inject(workQueuesApiKey)

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

  const emit = defineEmits(['delete', 'clear'])

  const deleteWorkQueue = async (id: string, close: () => void): Promise<void> => {
    close()
    await deleteItem(id, workQueuesApi.deleteWorkQueue, 'Work queue')
    emit('delete', id)
  }
</script>