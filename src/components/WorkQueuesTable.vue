<template>
  <div class="work-queues-table">
    <div class="work-queues-table__search">
      <ResultsCount :count="sortedFilteredWorkQueuesWithStatus.length" label="Work queue" />
      <SearchInput v-model="searchTerm" placeholder="Search work queues" label="Search work queues" />
    </div>

    <p-table :data="sortedFilteredWorkQueuesWithStatus" :columns="columns">
      <template #name="{ row }">
        <p-link :to="workQueueRoute(row.workQueue.id)">
          <span>{{ row.workQueue.name }}</span>
        </p-link>
      </template>

      <template #concurrency="{ row }">
        <span> {{ row.workQueue.concurrencyLimit ?? 'Unlimited' }} </span>
      </template>

      <template #status="{ row }">
        <span> {{ row.status.healthy ? 'Healthy' : 'Unhealthy' }} </span>
      </template>

      <template #last-polled="{ row }">
        <span> {{ row.status.lastPolled ? formatDateTimeNumeric(row.status.lastPolled) : null }} </span>
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="work-queues-table__actions">
          <WorkQueueLateIndicator :late-runs-count="row.status.lateRunsCount" />
          <WorkQueueToggle :work-queue="row.workQueue" @update="emits('update')" />
          <WorkQueueMenu size="xs" :work-queue="row.workQueue" @delete="(id:string) => emits('delete', id)" />
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
  import WorkQueueLateIndicator from '@/components/WorkQueueLateIndicator.vue'
  import WorkQueueMenu from '@/components/WorkQueueMenu.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkQueue, WorkQueueStatus } from '@/models'
  import { workQueueRouteKey } from '@/router'
  import { formatDateTimeNumeric, inject } from '@/utilities'

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
  const api = useWorkspaceApi()

  type WorkQueueWithStatus = { workQueue: WorkQueue, status: WorkQueueStatus }

  const workQueuesWithStatus = await Promise.all(props.workQueues.map(getWorkQueueWithStatus))

  function getWorkQueueWithStatus(workQueue: WorkQueue): Promise<WorkQueueWithStatus> {
    return api.workQueues.getWorkQueueStatus(workQueue.id).then((status)=>({ workQueue, status }))
  }

  const filteredWorkQueuesWithStatus = computed(() => {
    if (searchTerm.value.length === 0) {
      return workQueuesWithStatus
    }

    return workQueuesWithStatus.filter(filterWorkQueue)
  })

  function filterWorkQueue({ workQueue: { name, concurrencyLimit } }: WorkQueueWithStatus): boolean {
    return `${name} ${concurrencyLimit}`.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  const sortedFilteredWorkQueuesWithStatus = computed(()=>[...filteredWorkQueuesWithStatus.value].sort((alpha, beta)=>Number(alpha.status.healthy) - Number(beta.status.healthy)))

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