<template>
  <span v-if="completePercent" class="work-pool-flow-run-complete-percentage">
    <span>{{ completePercent }}%</span>
    <span v-if="percentChange" class="work-pool-flow-run-complete-percentage__difference" :class="percentChangeClasses">
      {{ percentChange.direction }}
      {{ percentChange.change }}
    </span>
  </span>
  <span v-else class="work-pool-flow-run-complete-percentage__none">
    N/A
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { subSeconds } from 'date-fns'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool, FlowRunsFilter } from '@/models'
  import { mapper } from '@/services'
  import { WorkspaceDashboardFilter } from '@/types'
  import { toPercent } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: WorkspaceDashboardFilter,
  }>()

  const subscriptionOptions = {
    interval: 30000,
  }

  const api = useWorkspaceApi()

  const baseFilter = computed<FlowRunsFilter>(() => ({
    workPools: {
      name: [props.workPool.name],
    },
  }))

  const flowRunsFilter = computed(() => mapper.map('WorkspaceDashboardFilter', props.filter, 'FlowRunsFilter'))

  const allRunsCountFilter = computed<FlowRunsFilter>(() => ({
    ...baseFilter.value,
    flowRuns: {
      ...flowRunsFilter.value?.flowRuns,
      state: {
        type: ['COMPLETED', 'FAILED', 'CRASHED'],
      },
    },
  }))
  const allRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [allRunsCountFilter], subscriptionOptions)
  const allRunsCount = computed(() => allRunsCountSubscription.response)

  const completeRunsCountFilter = computed<FlowRunsFilter>(() => ({
    ...baseFilter.value,
    flowRuns: {
      ...flowRunsFilter.value?.flowRuns,
      state: {
        type: ['COMPLETED'],
      },
    },
  }))
  const completeRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [completeRunsCountFilter], subscriptionOptions)
  const completeRunsCount = computed(() => completeRunsCountSubscription.response)

  const completePercent = computed(() => {
    if (!completeRunsCount.value || !allRunsCount.value) {
      return null
    }

    return toPercent(completeRunsCount.value, allRunsCount.value)
  })

  const prevFlowRunFilter = computed(() => {
    const rootStartTimeBefore = flowRunsFilter.value?.flowRuns?.startTimeBefore
    const rootStartTimeAfter = flowRunsFilter.value?.flowRuns?.startTimeAfter

    if (!rootStartTimeBefore || !rootStartTimeAfter || !props.filter?.timeSpanInSeconds) {
      return null
    }

    const startTimeBefore = subSeconds(rootStartTimeBefore.getTime(), props.filter.timeSpanInSeconds)
    const startTimeAfter = subSeconds(rootStartTimeAfter.getTime(), props.filter.timeSpanInSeconds)

    return {
      ...flowRunsFilter.value.flowRuns,
      startTimeBefore,
      startTimeAfter,
    }
  })

  const prevAllRunsCountFilter = computed<FlowRunsFilter>(() => ({
    ...baseFilter.value,
    flowRuns: {
      ...prevFlowRunFilter.value,
      state: {
        type: ['COMPLETED', 'FAILED', 'CRASHED'],
      },
    },
  }))
  const prevAllRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [prevAllRunsCountFilter], subscriptionOptions)
  const prevAllRunsCount = computed(() => prevAllRunsCountSubscription.response)

  const prevCompleteRunsCountFilter = computed<FlowRunsFilter>(() => ({
    ...baseFilter.value,
    flowRuns: {
      ...prevFlowRunFilter.value,
      state: {
        type: ['COMPLETED'],
      },
    },
  }))
  const prevCompleteRunsCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [prevCompleteRunsCountFilter], subscriptionOptions)
  const prevCompleteRunsCount = computed(() => prevCompleteRunsCountSubscription.response)

  const prevCompletePercent = computed(() => {
    if (!prevCompleteRunsCount.value || !prevAllRunsCount.value) {
      return null
    }

    return toPercent(prevCompleteRunsCount.value, prevAllRunsCount.value)
  })

  const percentChange = computed(() => {
    if (!prevCompletePercent.value || !completePercent.value || prevCompletePercent.value === completePercent.value) {
      return undefined
    }

    // don't subtract floats in js
    const prevCompletePercentInt = prevCompletePercent.value * 100
    const completePercentInt = completePercent.value * 100
    const changeInt = prevCompletePercentInt - completePercentInt
    const changePercent = changeInt / 100

    return {
      change: Math.abs(changePercent),
      direction: prevCompletePercent.value > completePercent.value ? '-' : '+',
    }
  })

  const percentChangeClasses = computed(() => ({
    'work-pool-flow-run-complete-percentage__difference--negative': percentChange.value?.direction === '-',
    'work-pool-flow-run-complete-percentage__difference--positive': percentChange.value?.direction === '+',
  }))
</script>

<style>
.work-pool-flow-run-complete-percentage { @apply
  inline-flex
  gap-1
  items-center
}

.work-pool-flow-run-complete-percentage__difference { @apply
  text-xs
}

.work-pool-flow-run-complete-percentage__difference--negative { @apply
  text-red-500
}
.work-pool-flow-run-complete-percentage__difference--positive { @apply
  text-green-500
}

.work-pool-flow-run-complete-percentage__none { @apply
  text-slate-500
}
</style>
