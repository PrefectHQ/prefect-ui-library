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

      <template #last-polled="{ value }">
        <span>{{ formatDateTimeNumeric(value) }}</span>
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="workers-table__actions">
          <p-icon-button-menu>
            <CopyOverflowMenuItem label="Copy ID" :item="row.id" />
          </p-icon-button-menu>
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No workers
          </template>
          <template v-if="hasFilters" #actions>
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
  import { TableColumn } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs } from 'vue'
  import { WorkPoolWorker } from '..'
  import { ResultsCount, SearchInput, CopyOverflowMenuItem } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

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
      label: 'Last Polled',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  function clear(): void {
    searchValue.value = ''
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