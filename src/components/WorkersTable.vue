<template>
  <div class="workers-table">
    <div class="workers-table__filters">
      <ResultsCount label="Worker Pool" :count="filteredWorkers.length" class="worker-pools__results" />

      <SearchInput v-model="searchValue" class="worker-pools__search" placeholder="Search worker pools" />
    </div>

    <p-table :data="filteredWorkers" :columns="columns">
      <template #name="{ row }">
        <span>{{ row.name }}</span>
      </template>

      <template #last-polled="{ row }">
        <span>{{ row.lastHeartbeatTime }}</span>
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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ResultsCount, SearchInput, CopyOverflowMenuItem } from '@/components'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const workerPoolNameRef = computed(() => props.workerPoolName)

  const workerPoolWorkersSubscription = useSubscription(api.workerPoolWorkers.getWorkers, [workerPoolNameRef.value, {}], subscriptionOptions)
  const workerPoolWorkers = computed(() => workerPoolWorkersSubscription.response ?? [])

  const searchValue = ref<string>('')

  const filteredWorkers = computed(() => {
    if (!searchValue.value) {
      return workerPoolWorkers.value
    }

    return workerPoolWorkers.value.filter(key => key.name.toLowerCase().includes(searchValue.value.toLowerCase()),
    )
  })

  const hasFilters = computed(() => {
    return !!searchValue.value
  })

  const columns = [
    {
      property: 'name',
      label: 'Name',
    },
    {
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