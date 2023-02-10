<template>
  <p-tag v-if="lateFlowRunsCount" class="workers-late-indicator">
    {{ lateFlowRunsCount }} {{ toPluralString('Late run', lateFlowRunsCount) }}
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
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRunsFilter } from '@/models'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueueNames?: string[],
  }>()

  const api = useWorkspaceApi()

  const flowRunsFilter = computed<FlowRunsFilter>(() => ({
    workPools: {
      name: [props.workPoolName],
    },
    workPoolQueues: {
      name: props.workPoolQueueNames,
    },
    flowRuns: {
      state: {
        name: ['Late'],
      },
    },
  }))

  const flowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [flowRunsFilter], { interval: 30000 })
  const lateFlowRunsCount = computed(() => flowRunsCountSubscription.response ?? 0)
</script>

<style>
.workers-late-indicator { @apply
  bg-state-scheduled-100
  text-state-scheduled-700
}
</style>