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
    workPoolName: string,
    workPoolQueueNames?: string[],
  }>()

  const workPoolQueueNames = computed(() => props.workPoolQueueNames ?? [])

  const api = useWorkspaceApi()
  const { workPoolName } = toRefs(props)

  const workPoolScheduledRunsSubscription = useSubscription(api.workPools.getWorkPoolScheduledRuns, [workPoolName.value, { workPoolQueueNames: workPoolQueueNames.value }], { interval: 30000 })
  const workPoolScheduledRuns = computed(() => workPoolScheduledRunsSubscription.response ?? [])

  const lateRunsCount = computed(() => workPoolScheduledRuns.value.filter(run => run.flowRun.stateName === 'Late').length)
</script>

<style>
.workers-late-indicator { @apply
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>