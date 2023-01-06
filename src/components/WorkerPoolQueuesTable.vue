<template>
  <div class="worker-pool-queues-table">
    <p-layout-table>
      <template #header-start>
        <template v-if="selected">
          <div class="worker-pool-queues-table__controls--right">
            <ResultsCount v-if="selected.length == 0" label="Queue" :count="workerPoolQueues.length" />
            <SelectedCount v-else :count="selected.length" />

            <p-button v-if="can.create.worker_pool_queue && !selected.length" inset size="sm" icon="PlusIcon" :to="routes.workerPoolQueueCreate(workerPoolName)" />
          </div>

          <WorkerPoolQueuesDeleteButton :worker-pool-name="workerPoolName" :worker-pool-queues="selected" @delete="handleDelete" />
        </template>
      </template>

      <template #header-end>
        <SearchInput v-model="search" label="Search" placeholder="Search" />
      </template>

      <p-table v-model:selected="selected" :data="filteredWorkerPoolQueues" :columns="columns">
        <template #actions-heading>
          <span />
        </template>

        <template #name="{ row }">
          <p-link :to="routes.workerPoolQueue(workerPoolName, row.name)">
            <span>{{ row.name }}</span>
          </p-link>
        </template>

        <template #actions="{ row }">
          <div class="worker-pool-queues-table__actions">
            <WorkersLateIndicator :worker-pool-name="workerPoolName" :worker-queue-pool-names="[row.name]" />
            <WorkerPoolQueueToggle :worker-pool-queue="row" :worker-pool-name="workerPoolName" @update="refresh" />
            <WorkerPoolQueueMenu :worker-pool-name="workerPoolName" :worker-pool-queue="row" size="xs" @delete="handleDelete" />
          </div>
        </template>
      </p-table>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { TableData } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount, WorkerPoolQueuesDeleteButton, WorkerPoolQueueMenu, WorkersLateIndicator, WorkerPoolQueueToggle } from '@/components'
  import { useCan, useWorkspaceRoutes, useWorkspaceApi } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'
  import { hasString } from '@/utilities'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const search = ref('')

  const workerPoolSubscription = useSubscription(api.workerPools.getWorkerPoolByName, [props.workerPoolName])
  const workerPool = computed(() => {
    return workerPoolSubscription.response
  })
  const workerPoolQueuesSubscription = useSubscription(api.workerPoolQueues.getWorkerPoolQueues, [props.workerPoolName])
  const workerPoolQueues = computed(() => workerPoolQueuesSubscription.response ?? [])
  const workerPoolQueuesData = computed<TableData[]>(() => workerPoolQueues.value.map(queue => {
    return {
      ...queue,
      disabled: !workerPool.value || workerPool.value.defaultQueueId == queue.id,
    }
  }))

  const filteredWorkerPoolQueues = computed(() => {
    if (search.value.length == 0) {
      return workerPoolQueuesData.value
    }

    return workerPoolQueuesData.value.filter(queue => hasString(queue, search.value))
  })

  const selected = ref<WorkerPoolQueue[] | undefined>(can.update.worker_pool_queue ? [] : undefined)
  const columns = [
    {
      property: 'name',
      label: 'Name',
    },
    {
      property: 'concurrencyLimit',
      label: 'Concurrency Limit',
    },
    {
      property: 'priority',
      label: 'Priority',
    },
    {
      label: 'Actions',
      width: '42px',
    },
  ]

  function refresh(): void {
    workerPoolSubscription.refresh()
    workerPoolQueuesSubscription.refresh()
  }

  const handleDelete = async (): Promise<void> => {
    await workerPoolQueuesSubscription.refresh()
    selected.value = selected.value?.filter(queue => workerPoolQueues.value.find(({ id }) => id === queue.id))
  }
</script>

<style>
.worker-pool-queues-table__controls--right { @apply
  mr-auto
  flex
  gap-4
  items-center
}

.worker-pool-queues-table__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>