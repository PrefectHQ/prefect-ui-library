<template>
  <div class="work-pools">
    <div class="work-pools__filters">
      <ResultsCount label="Work pool" :count="filteredWorkPools.length" class="work-pools__results" />

      <SearchInput v-model="searchValue" class="work-pools__search" placeholder="Search work pools" />
    </div>

    <div class="work-pools__list">
      <WorkPoolList :work-pools="filteredWorkPools" @update="refresh" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { ResultsCount, SearchInput, WorkPoolList } from '@/components'
  import { useWorkspaceApi } from '@/compositions'

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const workPoolsSubscription = useSubscription(api.workPools.getWorkPools, [], subscriptionOptions)
  const workPools = computed(() => workPoolsSubscription.response ?? [])

  const searchValue = ref<string>('')

  const filteredWorkPools = computed(() => {
    if (!searchValue.value) {
      return workPools.value
    }

    return workPools.value.filter(key => key.name.toLowerCase().includes(searchValue.value.toLowerCase()),
    )
  })

  function refresh(): void {
    workPoolsSubscription.refresh()
    emit('update')
  }
</script>

<style>
.work-pools { @apply
  grid
  gap-4
}

.work-pools__filters { @apply
  grid
  md:flex
  gap-2
  justify-between
  items-center
}
</style>