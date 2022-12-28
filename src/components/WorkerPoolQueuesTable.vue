<template>
  <div class="work-pool-queues-table">
    <p-layout-table>
      <template #header-start>
        <template v-if="selected">
          <ResultsCount v-if="selected.length == 0" label="queue" :count="workerPoolQueues.length" />
          <SelectedCount v-else :count="selected.length" />

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
          <WorkerPoolQueueMenu :worker-pool-name="workerPoolName" :worker-pool-queue="row" size="xs" @delete="handleDelete" />
        </template>
      </p-table>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount, WorkerPoolQueuesDeleteButton, WorkerPoolQueueMenu } from '@/components'
  import { useCan, useWorkspaceRoutes, useWorkspaceApi } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const search = ref('')

  const workerPoolQueuesSubscription = useSubscription(api.workerPoolQueues.getWorkerPoolQueues, [props.workerPoolName])
  const workerPoolQueues = computed(() => workerPoolQueuesSubscription.response ?? [])
  const filteredWorkerPoolQueues = computed(() => {
    if (search.value.length == 0) {
      return workerPoolQueues.value
    }

    return workerPoolQueues.value.filter(queue => {
      const values = Object.values(queue).map(value => value.toString().toLowerCase()).join('')
      return values.includes(search.value.toLowerCase())
    })
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

  const handleDelete = async (): Promise<void> => {
    await workerPoolQueuesSubscription.refresh()
    selected.value = selected.value?.filter(queue => workerPoolQueues.value.find(_queue => _queue.id === queue.id))
  }
</script>
