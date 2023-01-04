<template>
  <div class="work-pool-queues-table">
    <p-layout-table>
      <template #header-start>
        <template v-if="selected">
          <div class="work-pool-queues-table__controls--right">
            <ResultsCount v-if="selected.length == 0" label="Queue" :count="workPoolQueues.length" />
            <SelectedCount v-else :count="selected.length" />

            <p-button v-if="can.create.work_pool_queue && !selected.length" inset :to="routes.workPoolQueueCreate(workPoolName)" size="sm">
              Add Queue
            </p-button>
          </div>

          <WorkPoolQueuesDeleteButton :work-pool-name="workPoolName" :work-pool-queues="selected" @delete="handleDelete" />
        </template>
      </template>

      <template #header-end>
        <SearchInput v-model="search" label="Search" placeholder="Search" />
      </template>

      <p-table v-model:selected="selected" :data="filteredWorkPoolQueues" :columns="columns">
        <template #actions-heading>
          <span />
        </template>

        <template #name="{ row }">
          <p-link :to="routes.workPoolQueue(workPoolName, row.name)">
            <span>{{ row.name }}</span>
          </p-link>
        </template>

        <template #actions="{ row }">
          <WorkPoolQueueMenu :work-pool-name="workPoolName" :work-pool-queue="row" size="xs" @delete="handleDelete" />
        </template>
      </p-table>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { TableData } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { SearchInput, ResultsCount, SelectedCount, WorkPoolQueuesDeleteButton, WorkPoolQueueMenu } from '@/components'
  import { useCan, useWorkspaceRoutes, useWorkspaceApi } from '@/compositions'
  import { WorkPoolQueue } from '@/models'
  import { hasString } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
  const routes = useWorkspaceRoutes()

  const search = ref('')

  const workPoolSubscription = useSubscription(api.workPools.getWorkPoolByName, [props.workPoolName])
  const workPool = computed(() => {
    return workPoolSubscription.response
  })
  const workPoolQueuesSubscription = useSubscription(api.workPoolQueues.getWorkPoolQueues, [props.workPoolName])
  const workPoolQueues = computed(() => workPoolQueuesSubscription.response ?? [])
  const workPoolQueuesData = computed<TableData[]>(() => workPoolQueues.value.map(queue => {
    return {
      ...queue,
      disabled: !workPool.value || workPool.value.defaultQueueId == queue.id,
    }
  }))

  const filteredWorkPoolQueues = computed(() => {
    if (search.value.length == 0) {
      return workPoolQueuesData.value
    }

    return workPoolQueuesData.value.filter(queue => hasString(queue, search.value))
  })

  const selected = ref<WorkPoolQueue[] | undefined>(can.update.work_pool_queue ? [] : undefined)
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
    await workPoolQueuesSubscription.refresh()
    selected.value = selected.value?.filter(queue => workPoolQueues.value.find(({ id }) => id === queue.id))
  }
</script>

<style>
.work-pool-queues-table__controls--right { @apply
  mr-auto
  flex
  gap-4
  items-center
}
</style>