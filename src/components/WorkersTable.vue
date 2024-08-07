<template>
  <div class="workers-table">
    <div class="workers-table__filters">
      <ResultsCount label="Worker" :count="filteredWorkers.length" class="workers-table__results" />

      <SearchInput v-model="searchValue" class="workers-table__search" placeholder="Search workers" />
    </div>

    <p-table :data="filteredWorkers" :columns="columns">
      <template #name="{ row }">
        <span>{{ row.name }}</span>
      </template>

      <template #last-seen="{ value }">
        <FormattedDate :date="value" format="relative" />
      </template>

      <template #status="{ row }">
        <WorkerStatusBadge :worker="row" />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="workers-table__actions">
          <p-icon-button-menu>
            <CopyOverflowMenuItem label="Copy ID" :item="row.id" />
            <p-overflow-menu-item label="Delete" @click="open" />
          </p-icon-button-menu>
        </div>
        <ConfirmDeleteModal
          v-model:showModal="showModal"
          label="Worker"
          :name="row.name"
          @delete="deleteWorker(row.name)"
        />
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No workers
          </template>
          <template v-if="hasFilters" #actions>
            <p-button size="sm" @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { TableColumn } from '@prefecthq/prefect-design'
  import { useNow, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs } from 'vue'
  import { ResultsCount, SearchInput, CopyOverflowMenuItem, WorkerStatusBadge, ConfirmDeleteModal } from '@/components'
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useWorkspaceApi, useShowModal } from '@/compositions'
  import { WorkPoolWorker } from '@/models'
  import { deleteItem } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }
  const { now } = useNow({ interval: 1000 })

  const { workPoolName } = toRefs(props)

  const workPoolWorkersSubscription = useSubscription(api.workPoolWorkers.getWorkers, [workPoolName.value], subscriptionOptions)
  const workPoolWorkers = computed(() => workPoolWorkersSubscription.response ?? [])

  const searchValue = ref<string>('')

  const filteredWorkers = computed(() => {
    if (!searchValue.value) {
      return workPoolWorkers.value
    }

    return workPoolWorkers.value.filter(key => key.name.toLowerCase().includes(searchValue.value.toLowerCase()),
    )
  })

  const hasFilters = computed(() => {
    return !!searchValue.value
  })

  const columns: TableColumn<WorkPoolWorker>[] = [
    {
      property: 'name',
      label: 'Name',
    },
    {
      property: 'lastHeartbeatTime',
      label: 'Last Seen',
    },
    {
      property: 'status',
      label: 'Status',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  function clear(): void {
    searchValue.value = ''
  }

  const { showModal, open, close } = useShowModal()
  async function deleteWorker(workerName: string): Promise<void> {
    close()
    await deleteItem({ 'workPoolName': workPoolName.value, 'workerName': workerName }, api.workPoolWorkers.deleteWorker, 'Worker')
    emit('delete')
  }
</script>

<style>
.workers-table { @apply
  grid
  gap-4
}

.workers-table__filters { @apply
  grid
  md:flex
  gap-2
  justify-between
  items-center
}

.workers-table__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>