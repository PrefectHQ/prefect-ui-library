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
          <delete-overflow-menu-item :name="row.name" @remove="deleteWorkQueue(row.id)" />
        </template>
      </p-icon-button-menu>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, showToast } from '@prefecthq/prefect-design'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import { WorkQueue } from '@/models'
  import { workQueueRouteKey } from '@/router'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject } from '@/utilities/inject'

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

  const emit = defineEmits(['refresh'])

  const deleteWorkQueue = async (id: string): Promise<void> => {
    try {
      await workQueuesApi.deleteWorkQueue(id)
      showToast('Work queue deleted successfully!', 'success', undefined, 3000)
      emit('refresh')
    } catch (error) {
      showToast('Failed to delete work queue', 'error', undefined, 3000)
      console.error(error)
    }
  }
</script>