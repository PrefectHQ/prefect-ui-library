<template>
  <p-tag v-if="lateRunsCount" class="workers-late-indicator">
    {{ lateRunsCount }} {{ toPluralString('Late run', lateRunsCount) }}
  </p-tag>
</template>

<script lang="ts">
  export default {
    name: 'WorkersLateIndicator',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueueNames?: string[],
  }>()

  const workerPoolQueueNames = computed(() => props.workerPoolQueueNames ?? [])

  const api = useWorkspaceApi()
  const { workerPoolName } = toRefs(props)

  const workerPoolScheduledRunsSubscription = useSubscription(api.workerPools.getWorkerPoolScheduledRuns, [workerPoolName.value, { workerPoolQueueNames: workerPoolQueueNames.value }], { interval: 30000 })
  const workerPoolScheduledRuns = computed(() => workerPoolScheduledRunsSubscription.response ?? [])

  const lateRunsCount = computed(() => workerPoolScheduledRuns.value.filter(run => run.flowRun.stateName === 'Late').length)
</script>

<style>
.workers-late-indicator { @apply
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>