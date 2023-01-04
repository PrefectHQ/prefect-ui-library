<template>
  <div class="worker-pools">
    <div class="worker-pools__filters">
      <ResultsCount label="Worker pool" :count="filteredWorkerPools.length" class="worker-pools__results" />

      <SearchInput v-model="searchValue" class="worker-pools__search" placeholder="Search worker pools" />
    </div>

    <div class="worker-pools__list">
      <WorkerPoolList :worker-pools="filteredWorkerPools" @update="refresh" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ResultsCount, SearchInput, WorkerPoolList } from '@/components'
  import { useWorkspaceApi } from '@/compositions'

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const workerPoolsSubscription = useSubscription(api.workerPools.getWorkerPools, [], subscriptionOptions)
  const workerPools = computed(() => workerPoolsSubscription.response ?? [])

  const searchValue = ref<string>('')

  const filteredWorkerPools = computed(() => {
    if (!searchValue.value) {
      return workerPools.value
    }

    return workerPools.value.filter(key => key.name.toLowerCase().includes(searchValue.value.toLowerCase()),
    )
  })

  function refresh(): void {
    workerPoolsSubscription.refresh()
    emit('update')
  }
</script>

<style>
.worker-pools { @apply
  grid
  gap-4
}

.worker-pools__filters { @apply
  grid
  md:flex
  gap-2
  justify-between
  items-center
}
</style>