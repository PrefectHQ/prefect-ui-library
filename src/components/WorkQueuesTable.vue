<template>
  <div class="work-queues-table">
    <div class="work-queues-table__search">
      <ResultsCount :count="filteredWorkQueues.length" label="Work queue" />
      <SearchInput v-model="searchTerm" placeholder="Search work queues" label="Search work queues" />
    </div>

    <p-table :data="filteredWorkQueues" :columns="columns">
      <template #name="{ row }">
        <p-link :to="workQueueRoute(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #concurrency="{ row }">
        <span> {{ row.concurrencyLimit ?? 'Unlimited' }} </span>
      </template>

      <template #status="{ row }">
        <WorkQueueStatusBadge :work-queue="row" />
      </template>

      <template #last-polled="{ row }">
        <WorkQueueLastPolled :work-queue-id="row.id" />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="work-queues-table__actions">
          <WorkQueueLateIndicator :work-queue-id="row.id" />
          <WorkQueueToggle :work-queue="row" @update="emits('update')" />
          <WorkQueueMenu size="xs" :work-queue="row" @delete="(id:string) => emits('delete', id)" />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No work queues
          </template>
          <template #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { WorkQueueToggle, WorkQueueMenu, WorkQueueLateIndicator, SearchInput, ResultsCount, WorkQueueLastPolled, WorkQueueStatusBadge } from '@/components'
  import { WorkQueue } from '@/models'
  import { workQueueRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const workQueueRoute = inject(workQueueRouteKey)

  const props = defineProps<{
    workQueues: WorkQueue[],
  }>()

  const emits = defineEmits<{
    (event: 'update'): void,
    (event: 'delete', value: string): void,
  }>()

  const searchTerm = ref('')

  const columns = [
    {
      property: 'name',
      label: 'Name',
    },
    {
      label: 'Concurrency',
    },
    {
      label: 'Status',
    },
    {
      label: 'Last Polled',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const filteredWorkQueues = computed(() => {
    if (searchTerm.value.length === 0) {
      return props.workQueues
    }

    return props.workQueues.filter(filterWorkQueue)
  })

  function filterWorkQueue({ name, concurrencyLimit }: WorkQueue): boolean {
    return `${name} ${concurrencyLimit}`.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
.work-queues-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}

.work-queues-table__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>