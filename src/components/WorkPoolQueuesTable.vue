<template>
  <p-content class="work-pool-queues-table">
    <p-list-header sticky>
      <ResultsCount v-if="selected.length == 0" label="Work Queue" :count="filteredWorkPoolQueues.length" />
      <SelectedCount v-else :count="selected.length" />
      <p-button v-if="can.create.work_queue && !selected.length" small icon="PlusIcon" :to="routes.workPoolQueueCreate(workPoolName)" />

      <WorkPoolQueuesDeleteButton v-if="can.delete.work_queue" :work-pool-name="workPoolName" :work-pool-queues="selected" @delete="handleDelete" />

      <template #controls>
        <SearchInput v-model="search" label="Search" placeholder="Search" />
      </template>
    </p-list-header>

    <p-table :selected="can.delete.work_queue ? selected : undefined" :data="filteredWorkPoolQueues" :columns="columns" @update:selected="selected = $event">
      <template #priority-heading>
        <WorkPoolQueuePriorityLabel />
      </template>

      <template #actions-heading>
        <span />
      </template>

      <template #name="{ row }">
        <p-link :to="routes.workPoolQueue(workPoolName, row.name)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #status="{ row }">
        <WorkPoolQueueStatusBadge v-if="workPool" :work-queue="row" :work-pool="workPool" />
      </template>

      <template #actions="{ row }">
        <div class="worker-pool-queues-table__actions">
          <WorkersLateIndicator :work-pool-name="workPoolName" :work-pool-queue-names="[row.name]" />
          <WorkPoolQueueToggle :work-pool-queue="row" :work-pool-name="workPoolName" @update="refresh" />
          <WorkPoolQueueMenu :work-pool-name="workPoolName" :work-pool-queue="row" size="xs" @delete="handleDelete" />
        </div>
      </template>
    </p-table>
  </p-content>
</template>

<script lang="ts" setup>
  import { TableColumn } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount, WorkPoolQueuesDeleteButton, WorkPoolQueuePriorityLabel, WorkersLateIndicator, WorkPoolQueueToggle, WorkPoolQueueStatusBadge } from '@/components'
  import { useCan, useWorkspaceRoutes, useWorkspaceApi, useComponent } from '@/compositions'
  import { WorkPoolQueue, WorkPoolQueueTableData } from '@/models'
  import { hasString, isRecord } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()
  const { WorkPoolQueueMenu } = useComponent()

  const search = ref('')

  const workPoolSubscription = useSubscription(api.workPools.getWorkPoolByName, [props.workPoolName])
  const workPool = computed(() => {
    return workPoolSubscription.response
  })
  const workPoolQueuesSubscription = useSubscription(api.workPoolQueues.getWorkPoolQueues, [props.workPoolName])
  const workPoolQueues = computed(() => workPoolQueuesSubscription.response ?? [])


  const workPoolQueuesData = computed(() => workPoolQueues.value.map(queue => new WorkPoolQueueTableData({
    ...queue,
    disabled: !workPool.value || workPool.value.defaultQueueId == queue.id,
  })))

  const filteredWorkPoolQueues = computed(() => {
    if (search.value.length == 0) {
      return workPoolQueuesData.value
    }

    return workPoolQueuesData.value.filter(queue => isRecord(queue) && hasString(queue, search.value))
  })

  const selected = ref<WorkPoolQueue[]>([])
  const columns: TableColumn<WorkPoolQueue>[] = [
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
      label: 'Status',
    },
    {
      label: 'Actions',
      width: '42px',
    },
  ]

  const handleDelete = async (): Promise<void> => {
    await workPoolQueuesSubscription.refresh()
    selected.value = []
  }

  function refresh(): void {
    workPoolSubscription.refresh()
    workPoolQueuesSubscription.refresh()
  }
</script>

<style>
.worker-pool-queues-table__actions { @apply
  justify-end
  items-center
  flex
  gap-2
}
</style>