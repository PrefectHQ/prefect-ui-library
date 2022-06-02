<template>
  <p-table :data="queues" :columns="columns">
    <template #name="{ row }">
      <p-link :to="workQueueRoute(row.id)">
        <span>{{ row.name }}</span>
      </p-link>
    </template>

    <template #concurrency="{ row }">
      <span> {{ row.concurrencyLimit ?? 'Unlimited' }} </span>
    </template>

    <template #action-heading>
      <span />
    </template>

    <template #action="{ row }">
      <p-icon-button-menu size="xs">
        <template #default="{ close }">
          <copy-overflow-menu-item label="Copy ID" :item="row.id" @click="close" />
          <router-link :to="editQueueRoute(row.id)">
            <p-overflow-menu-item label="Edit" />
          </router-link>
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
  import { PTable, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import { WorkQueue } from '@/models'
  import { editQueueRouteKey, workQueueRouteKey } from '@/router'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject, deleteItem } from '@/utilities'

  const workQueueRoute = inject(workQueueRouteKey)
  const workQueuesApi = inject(workQueuesApiKey)
  const editQueueRoute = inject(editQueueRouteKey)

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