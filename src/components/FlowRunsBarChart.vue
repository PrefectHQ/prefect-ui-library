<template>
  <div ref="chart" class="flow-runs-bar-chart" :class="classes.root" :style="styles.root" @mouseleave="close">
    <template v-for="(flowRun, index) in barFlowRuns" :key="getKey(flowRun, index)">
      <p-pop-over class="flow-runs-bar-chart__bar-container" :to="chart" :placement="placement" :group="group" auto-close>
        <template #target="{ open }">
          <div class="flow-runs-bar-chart__bar" :class="getBarClasses(flowRun)" :style="getBarStyles(flowRun)" @mouseover="open" />
        </template>

        <template v-if="flowRun">
          <div class="flow-runs-bar-chart__pop-over">
            <FlowRunPopoverContent :flow-run-id="flowRun.id" />
          </div>
        </template>
      </p-pop-over>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ClassValue, toPixels, positions, usePopOverGroup } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useElementRect } from '@prefecthq/vue-compositions'
  import { scaleSymlog } from 'd3'
  import { StyleValue, computed, ref } from 'vue'
  import FlowRunPopoverContent from '@/components/FlowRunPopOverContent.vue'
  import { useFlowRuns } from '@/compositions/useFlowRuns'
  import { FlowRunsFilter } from '@/models/Filters'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    filter: FlowRunsFilter,
    mini?: boolean,
  }>()

  const desiredBarWidth = computed(() => props.mini ? 6 : 12)
  const placement = [positions.bottom, positions.right, positions.left, positions.top]
  const group = 'flow-runs-bar-chart-pop-over'
  const { close } = usePopOverGroup(group)

  const chart = ref<HTMLDivElement>()
  const { width, height } = useElementRect(chart)
  const bars = computed(() => Math.floor(width.value / desiredBarWidth.value))
  const barsDebounced = useDebouncedRef(bars, 1000)
  const styles = computed(() => ({
    root: `grid-template-columns: repeat(${bars.value}, 1fr)`,
  }))

  const classes = computed(() => ({
    root: {
      'flow-runs-bar-chart--mini': props.mini,
    },
  }))

  const filter = computed<FlowRunsFilter | null>(() => {
    if (isNaN(barsDebounced.value)) {
      return null
    }

    const filter: FlowRunsFilter = {
      ...props.filter,
      limit: barsDebounced.value,
      sort: 'START_TIME_DESC',
    }

    return filter
  })
  const { flowRuns } = useFlowRuns(filter)

  const barFlowRuns = computed(() => {
    const difference = bars.value - flowRuns.value.length
    const emptyValuesLength = Math.max(difference, 0)

    if (emptyValuesLength > 0) {
      return organizeFlowRunsWithGaps(flowRuns.value)
    }

    const flowRunsReversed = flowRuns.value.slice(0, bars.value).reverse()

    return [...flowRunsReversed]
  })

  const organizeFlowRunsWithGaps = (flowRuns: FlowRun[]): (FlowRun | undefined)[] => {
    const { expectedStartTimeAfter, expectedStartTimeBefore } = props.filter.flowRuns ?? {}

    if (!expectedStartTimeBefore || !expectedStartTimeAfter) {
      return []
    }

    const totalTime = expectedStartTimeBefore.getTime() - expectedStartTimeAfter.getTime()
    const bucketSize = totalTime / bars.value
    const buckets: ((undefined | FlowRun)[])[] = [...Array(bars.value)].map(() => [])

    // sort flowRuns into buckets.
    flowRuns.forEach((flowRun) => {
      const { expectedStartTime } = flowRun

      if (!expectedStartTime) {
        return
      }

      const bucketIndex = Math.floor((expectedStartTime.getTime() - expectedStartTimeAfter.getTime()) / bucketSize)

      buckets[bucketIndex].push(flowRun)
    })

    // shift flows into previous bucket when multiple flows are in the same one.
    for (let i = buckets.length - 1; i >= 0; i--) {
      const bucket = buckets[i]

      if (bucket.length === 0) {
        continue
      }

      const flows = bucket.sort((flowRunA, flowRunB) => {
        if (!flowRunA?.expectedStartTime || !flowRunB?.expectedStartTime) {
          return 0
        }
        return flowRunA.expectedStartTime.getTime() - flowRunB.expectedStartTime.getTime()
      })

      const lastFlow = flows.pop()

      buckets[i] = [lastFlow]

      if (flows.length > 0 && buckets[i - 1]) {
        buckets[i - 1] = buckets[i - 1].concat(flows)
      }
    }

    // flatten buckets into a single array.
    return buckets.map((bucket) => bucket[0])
  }

  const maxDuration = computed(() => flowRuns.value.reduce((max, flowRun) => {
    if (flowRun.duration > max) {
      return flowRun.duration
    }

    return max
  }, 0))

  const yScale = computed(() => {
    const scale = scaleSymlog()

    scale.domain([0, maxDuration.value])
    scale.range([0, height.value])

    return scale
  })

  function getBarClasses(flowRun: FlowRun | undefined): ClassValue {
    if (!flowRun) {
      return undefined
    }

    return [
      `bg-state-${flowRun.stateType}-500`,
      'flow-runs-bar-chart__bar-flow-run',
    ]
  }

  function getBarStyles(flowRun: FlowRun | undefined): StyleValue {
    if (!flowRun) {
      return ''
    }

    return {
      height: toPixels(yScale.value(flowRun.duration)),
    }
  }

  function getKey(flowRun: FlowRun | undefined, index: number): string {
    if (!flowRun) {
      return `${index}`
    }

    return flowRun.id
  }
</script>

<style>
.flow-runs-bar-chart { @apply
  relative
  grid
  items-end
  grid-rows-1;
  --bar-padding: 3px;
  --bar-min-height: 6px;
}

.flow-runs-bar-chart--mini {
  --bar-padding: 1px;
  --bar-min-height: 4px;
}

.flow-runs-bar-chart__bar-container { @apply
  w-full
  px-[--bar-padding]
}

.flow-runs-bar-chart__bar { @apply
  w-full
  rounded-full
  min-h-[--bar-min-height]
  bg-slate-500
}

.flow-runs-bar-chart__bar-flow-run {
  min-height: calc(var(--bar-min-height) * 2);
}

.flow-runs-bar-chart__pop-over { @apply
  p-2
}
</style>