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
  import { computed, toRefs } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { UnionFilters } from '@/types'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueueNames?: string[],
  }>()


  const api = useWorkspaceApi()

  const { workPoolName } = toRefs(props)
  const workPoolQueueNames = computed(() => props.workPoolQueueNames ?? [])


  const flowRunFilter = computed<UnionFilters>(() => {

    const flowRunFilter: UnionFilters = {
      'work_pools': { name: { any_: [workPoolName.value] } },
      'flow_runs': {
        state: { name: { any_: ['Late'] } },
      },
      sort: 'START_TIME_ASC',
    }

    if (props.workPoolQueueNames) {
      flowRunFilter.work_pool_queues = { name: { any_: workPoolQueueNames.value } }
    }

    return flowRunFilter
  },
  )

  const flowRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [flowRunFilter], { interval: 30000 })
  const lateFlowRunsCount = computed(() => flowRunsCountSubscription.response ?? 0)
</script>

<style>
.workers-late-indicator { @apply
  bg-state-scheduled-100
  text-state-scheduled-700
}
</style>