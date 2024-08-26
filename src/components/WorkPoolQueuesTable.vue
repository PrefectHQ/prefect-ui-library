<template>
  <p-content class="work-pool-queues-table">
    <p-list-header sticky>
      <ResultsCount v-if="selected.length == 0" label="Work Queue" :count="filteredWorkPoolQueues.length" />
      <SelectedCount v-else :count="selected.length" />

      <template v-if="workPool?.can.create && !selected.length">
        <p-button size="sm" icon="PlusIcon" :to="routes.workPoolQueueCreate(workPoolName)" />
      </template>

      <template v-if="workPool?.can.delete">
        <WorkPoolQueuesDeleteButton :work-pool-name="workPoolName" :work-pool-queues="selected" @delete="handleDelete" />
      </template>

      <template #controls>
        <SearchInput v-model="search" label="Search" placeholder="Search" />
      </template>
    </p-list-header>

    <p-table :selected="workPool?.can.delete ? selected : undefined" :data="filteredWorkPoolQueues" :columns="columns" @update:selected="selected = $event">
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
        <WorkPoolQueueStatusBadge v-if="workPool" :work-queue="row" />
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
  import { ref, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount, WorkPoolQueuesDeleteButton, WorkPoolQueuePriorityLabel, WorkersLateIndicator, WorkPoolQueueToggle, WorkPoolQueueStatusBadge } from '@/components'
  import { useWorkspaceRoutes, useComponent, useWorkPool } from '@/compositions'
  import { useWorkPoolQueues } from '@/compositions/useWorkPoolQueues'
  import { WorkPoolQueue, WorkPoolQueueTableData } from '@/models'
  import { hasString, isRecord } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const routes = useWorkspaceRoutes()
  const { WorkPoolQueueMenu } = useComponent()

  const search = ref('')

  const { workPool, subscription: workPoolSubscription } = useWorkPool(() => props.workPoolName)
  const { workQueues, subscription: workPoolQueuesSubscription } = useWorkPoolQueues(() => props.workPoolName)

  const workPoolQueuesData = computed(() => workQueues.value.map(queue => new WorkPoolQueueTableData({
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