<template>
  <div class="work-queues-table">
    <p-layout-table>
      <template #header-start>
        <ResultsCount v-if="selectedWorkQueues.length == 0" label="Work queue" :count="filteredWorkQueues.length" />
        <SelectedCount v-else :count="selectedWorkQueues.length" />

        <WorkQueuesDeleteButton v-if="can.delete.work_queue" :selected="selectedWorkQueues" @delete="deleteWorkQueues" />
      </template>

      <template #header-end>
        <SearchInput v-model="searchTerm" placeholder="Search work queues" label="Search work queues" />
      </template>

      <p-table :data="filteredWorkQueues" :columns="columns">
        <template #selection-heading>
          <p-checkbox v-model="model" @update:model-value="selectAllWorkQueues" />
        </template>

        <template #selection="{ row }">
          <p-checkbox v-model="selectedWorkQueues" :value="row.id" />
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

        <template #action-heading>
          <span />
        </template>

        <template #action="{ row }">
          <div class="work-queues-table__actions">
            <WorkQueueLateIndicator :work-queue-id="row.id" />
            <WorkQueueToggle :work-queue="row" @update="emit('update')" />
            <WorkQueueMenu size="xs" :work-queue="row" @delete="emit('delete')" />
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
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults, PLink, CheckboxModel } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { WorkQueueToggle, WorkQueueMenu, WorkQueueLateIndicator, SearchInput, ResultsCount, WorkQueueLastPolled, WorkQueueStatusBadge, SelectedCount, WorkQueuesDeleteButton } from '@/components'
  import { useCan, useWorkspaceRoutes } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueues: WorkQueue[],
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const searchTerm = ref('')

  const columns = [
    {
      label: 'selection',
      width: '20px',
      visible: can.delete.work_queue,
    },
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

  const selectedWorkQueues = ref<string[]>([])
  const selectAllWorkQueues = (allWorkQueuesSelected: CheckboxModel): string[] => {
    if (allWorkQueuesSelected) {
      return selectedWorkQueues.value = [...filteredWorkQueues.value.map(workQueue => workQueue.id)]
    }
    return selectedWorkQueues.value = []
  }
  const model = computed({
    get() {
      return selectedWorkQueues.value.length === filteredWorkQueues.value.length
    },
    set(value: boolean) {
      selectAllWorkQueues(value)
    },
  })

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

  const deleteWorkQueues = (): void => {
    selectedWorkQueues.value = []
    emit('delete')
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