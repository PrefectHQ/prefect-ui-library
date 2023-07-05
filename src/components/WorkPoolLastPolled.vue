<template>
  <span class="work-pool-last-polled">
    <template v-if="lastPolled">
      {{ lastPolled }}
    </template>
    <template v-else>
      <span class="work-pool-last-polled__no-poll">N/A</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useInterval, useWorkPoolLastPolled } from '@/compositions'
  import { WorkPool } from '@/models'
  import { mapper } from '@/services'
  import { WorkspaceDashboardFilter } from '@/types'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: WorkspaceDashboardFilter,
  }>()

  const workPoolName = computed(() => props.workPool.name)
  const workPoolWorkersFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'WorkPoolWorkersFilter'))

  const options = useInterval()
  const { lastPolled } = useWorkPoolLastPolled(workPoolName, workPoolWorkersFilter, options)
</script>

<style>
.work-pool-last-polled__no-poll { @apply
  text-slate-500
}
</style>