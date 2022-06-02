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
      <QueueMenu :queue="row" @delete="id => emits('delete', id)" />
    </template>

    <template #empty-state>
      <PEmptyResults>
        <template #actions>
          <p-button size="sm" secondary @click="emits('clear')">
            Clear Filters
          </p-button>
        </template>
      </PEmptyResults>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import QueueMenu from '@/components/QueueMenu.vue'
  import { WorkQueue } from '@/models'
  import { workQueueRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const workQueueRoute = inject(workQueueRouteKey)

  defineProps<{
    queues: WorkQueue[],
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
    (event: 'clear'): void,
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
</script>