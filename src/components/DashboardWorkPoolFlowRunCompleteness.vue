<template>
  <span v-if="completePercent" class="dashboard-work-pool-flow-runs-completeness">
    <span>{{ completePercent }}%</span>
    <template v-if="percentChange">
      <p-tooltip :text="localization.info.percentChangeOverTimePeriod(`${percentChange.direction}${percentChange.change}`)">
        <span class="dashboard-work-pool-flow-runs-completeness__difference" :class="percentChangeClasses">
          {{ percentChange.direction }}
          {{ percentChange.change }}
        </span>
      </p-tooltip>
    </template>
  </span>
  <span v-else class="dashboard-work-pool-flow-runs-completeness__none">
    N/A
  </span>
</template>

<script lang="ts" setup>
  import { differenceInSeconds, subSeconds } from 'date-fns'
  import merge from 'lodash.merge'
  import { computed, toValue } from 'vue'
  import { useInterval } from '@/compositions'
  import { useFlowRunCompleteness } from '@/compositions/useFlowRunCompleteness'
  import { localization } from '@/localization'
  import { WorkPool, FlowRunsFilter } from '@/models'
  import { MaybeGetter } from '@/types'

  const props = defineProps<{
    workPool: WorkPool,
    filter?: MaybeGetter<FlowRunsFilter>,
  }>()

  const options = useInterval()

  const workQueueFilter = computed<FlowRunsFilter>(() => {
    const base = toValue(props.filter)
    const filter: FlowRunsFilter = {
      workPools: {
        id: [props.workPool.id],
      },
    }

    return merge({}, base, filter)
  })

  const previousWorkQueueFilter = computed<FlowRunsFilter | null>(() => {
    const base = toValue(props.filter)
    const rootStartTimeBefore = base?.flowRuns?.startTimeBefore
    const rootStartTimeAfter = base?.flowRuns?.startTimeAfter

    if (!rootStartTimeBefore || !rootStartTimeAfter) {
      return null
    }

    const timeSpanInSeconds = differenceInSeconds(rootStartTimeBefore, rootStartTimeAfter)
    const startTimeBefore = subSeconds(rootStartTimeBefore.getTime(), timeSpanInSeconds)
    const startTimeAfter = subSeconds(rootStartTimeAfter.getTime(), timeSpanInSeconds)

    const filter: FlowRunsFilter = {
      flowRuns: {
        startTimeBefore,
        startTimeAfter,
      },
    }

    return merge({}, base, filter)
  })

  const { completeness: completePercent } = useFlowRunCompleteness(workQueueFilter, options)
  const { completeness: previousCompletePercent } = useFlowRunCompleteness(previousWorkQueueFilter, options)

  const percentChange = computed(() => {
    if (!previousCompletePercent.value || !completePercent.value || previousCompletePercent.value === completePercent.value) {
      return undefined
    }

    // don't subtract floats in js
    const previousCompletePercentInt = previousCompletePercent.value * 100
    const completePercentInt = completePercent.value * 100
    const changeInt = previousCompletePercentInt - completePercentInt
    const changePercent = changeInt / 100

    return {
      change: Math.abs(changePercent).toFixed(1),
      direction: previousCompletePercent.value > completePercent.value ? '-' : '+',
    }
  })

  const percentChangeClasses = computed(() => ({
    'dashboard-work-pool-flow-runs-completeness__difference--negative': percentChange.value?.direction === '-',
    'dashboard-work-pool-flow-runs-completeness__difference--positive': percentChange.value?.direction === '+',
  }))
</script>

<style>
.dashboard-work-pool-flow-runs-completeness { @apply
  inline-flex
  gap-1
  items-center
}

.dashboard-work-pool-flow-runs-completeness__difference { @apply
  cursor-help
  text-xs
  whitespace-nowrap
}

.dashboard-work-pool-flow-runs-completeness__difference--negative { @apply
  text-red-500
}
.dashboard-work-pool-flow-runs-completeness__difference--positive { @apply
  text-green-500
}

.dashboard-work-pool-flow-runs-completeness__none { @apply
  text-slate-500
}
</style>
