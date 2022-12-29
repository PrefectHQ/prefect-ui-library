<template>
  <p-tag v-if="lateRunsCount" class="worker-pool-late-indicator">
    {{ lateRunsCount }} {{ toPluralString('Late run', lateRunsCount) }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const api = useWorkspaceApi()
  const { workerPoolName } = toRefs(props)

  const workerPoolScheduledRunsSubscription = useSubscription(api.workerPools.getWorkerPoolScheduledRuns, [workerPoolName.value, {}], { interval: 30000 })
  const workerPoolScheduledRuns = computed(() => workerPoolScheduledRunsSubscription.response ?? [])

  const lateRunsCount = computed(() => workerPoolScheduledRuns.value.filter(run => run.flowRun.stateName === 'Late').length)
</script>

<style>
.work-queue-late-indicator { @apply
  text-xs
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>