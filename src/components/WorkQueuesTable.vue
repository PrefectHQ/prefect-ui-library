<template>
  <div class="work-queues-table">
    <div class="work-queues-table__search">
      <ResultsCount :count="filtered.length" label="Queue" />
      <SearchInput v-model="searchTerm" placeholder="Search work queues" label="Search work queues" />
    </div>

    <p-table :data="filtered" :columns="columns">
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
        <div class="work-queues-table__actions">
          <WorkQueueToggle :work-queue="row" @update="emits('update')" />
          <WorkQueueMenu :queue="row" @delete="id => emits('delete', id)" />
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
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import WorkQueueMenu from '@/components/WorkQueueMenu.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
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

  const filtered = computed(() => {
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
  flex
  gap-2
}
</style>