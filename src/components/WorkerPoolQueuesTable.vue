<template>
  <div class="work-pool-queues-table">
    <p-layout-table>
      <template #controls-header__start>
        <template v-if="selected">
          <ResultsCount v-if="selected.length == 0" label="queue" :count="workerPoolQueues.length" />
          <SelectedCount v-else :count="selected.length" />

          <WorkerPoolQueuesDeleteButton :worker-pool-name="workerPoolName" :worker-pool-queues="selected" />
        </template>
      </template>

      <template #controls-header__end />


      <p-table v-model:selected="selected" :data="workerPoolQueues" :columns="columns">
        <template #actions-heading>
          <span />
        </template>

        <template #name="{ row }">
          <p-link :to="routes.workerPoolQueue(workerPoolName, row.name)">
            <span>{{ row.name }}</span>
          </p-link>
        </template>

        <template #actions="{ row }">
          <WorkerPoolQueueMenu :worker-pool-name="workerPoolName" :worker-pool-queue="row" size="xs" />
        </template>
      </p-table>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { ResultsCount, SelectedCount, WorkerPoolQueuesDeleteButton, WorkerPoolQueueMenu } from '@/components'
  import { useCan, useWorkspaceRoutes, useWorkspaceApi } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const workerPoolQueuesSubscription = useSubscription(api.workerPoolQueues.getWorkerPoolQueues, [props.workerPoolName])
  const workerPoolQueues = computed(() => workerPoolQueuesSubscription.response ?? [])

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
</script>
