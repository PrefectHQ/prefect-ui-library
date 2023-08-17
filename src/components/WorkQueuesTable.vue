<template>
  <div class="work-queues-table">
    <p-layout-table>
      <template #header-start>
        <template v-if="selected">
          <ResultsCount v-if="selected.length == 0" label="Work queue" :count="filteredWorkQueues.length" />
          <SelectedCount v-else :count="selected.length" />

          <WorkQueuesDeleteButton v-if="can.delete.work_queue" :selected="selected" @delete="handleDelete" />
        </template>
      </template>

      <template #header-end>
        <SearchInput v-model="search" placeholder="Search work queues" label="Search work queues" />
      </template>

      <p-table v-model:selected="selected" :data="filteredWorkQueues" :columns="columns">
        <template #action-heading>
          <span />
        </template>

        <template #name="{ row }">
          <p-link :to="routes.workQueue(row.id)">
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

        <template #action="{ row }">
          <div class="work-queues-table__actions">
            <WorkQueueLateIndicator :work-queue-id="row.id" />
            <WorkQueueToggle :work-queue="row" @update="emit('update')" />
            <WorkQueueMenu size="xs" :work-queue="row" @delete="handleDelete" />
          </div>
        </template>

        <template #empty-state>
          <PEmptyResults>
            <template #message>
              No work queues
            </template>
            <template #actions>
              <p-button small @click="clear">
                Clear Filters
              </p-button>
            </template>
          </PEmptyResults>
        </template>
      </p-table>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, PLink, TableColumn } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs } from 'vue'
  import { WorkQueueToggle, WorkQueueLateIndicator, SearchInput, ResultsCount, WorkQueueLastPolled, WorkQueueStatusBadge, SelectedCount, WorkQueuesDeleteButton, WorkQueueMenu } from '@/components'
  import { useCan, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkQueue, WorkQueueTableData } from '@/models'
  import { hasString, isRecord } from '@/utilities'

  const props = defineProps<{
    workQueues: WorkQueue[],
  }>()

  const { workQueues } = toRefs(props)

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const search = ref('')
  const selected = ref<WorkQueue[] | undefined>(can.delete.work_queue ? [] : undefined)

  const columns: TableColumn<WorkQueue>[] = [
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

  const subscriptionOptions = {
    interval: 30000,
  }

  const workPoolsSubscription = useSubscription(api.workPools.getWorkPools, [], subscriptionOptions)
  const workPools = computed(() => workPoolsSubscription.response ?? [])

  const workQueuesData = computed(() => workQueues.value.map(queue => new WorkQueueTableData({
    ...queue,
    disabled: workPools.value.some(pool => pool.defaultQueueId == queue.id),
  })))

  const filteredWorkQueues = computed(() => {
    if (search.value.length === 0) {
      return workQueuesData.value
    }

    return workQueuesData.value.filter(queue => isRecord(queue) && hasString(queue, search.value))
  })

  const handleDelete = (): void => {
    emit('delete')
    selected.value = []
    selected.value = selected.value.filter(queue => workQueues.value.find(({ id }) => id === queue.id))
  }

  function clear(): void {
    search.value = ''
  }
</script>

<style>
.work-queues-table__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>