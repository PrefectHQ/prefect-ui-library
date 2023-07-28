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
  import merge from 'lodash.merge'
  import { StyleValue, computed, ref, toValue } from 'vue'
  import FlowRunPopoverContent from '@/components/FlowRunPopOverContent.vue'
  import { useFlowRuns } from '@/compositions/useFlowRuns'
  import { useInterval } from '@/compositions/useInterval'
  import { FlowRunsFilter } from '@/models/Filters'
  import { FlowRun } from '@/models/FlowRun'
  import { Getter, MaybeGetter } from '@/types/reactivity'

  const props = defineProps<{
    filter: MaybeGetter<FlowRunsFilter>,
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

  const filter: Getter<FlowRunsFilter | null> = () => {
    if (isNaN(barsDebounced.value)) {
      return null
    }

    const base = toValue(props.filter)
    const filter: FlowRunsFilter = {
      limit: barsDebounced.value,
      sort: 'START_TIME_DESC',
    }

    return merge({}, base, filter)
  }

  const options = useInterval()
  const { flowRuns } = useFlowRuns(filter, 1, options)

  const barFlowRuns = computed(() => organizeFlowRunsWithGaps(flowRuns.value))

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

  function getBarClasses(flowRun: FlowRun | null): ClassValue {
    if (!flowRun) {
      return undefined
    }

    return [
      `bg-state-${flowRun.stateType}-500`,
      'flow-runs-bar-chart__bar-flow-run',
    ]
  }

  function getBarStyles(flowRun: FlowRun | null): StyleValue {
    if (!flowRun) {
      return ''
    }

    return {
      height: toPixels(yScale.value(flowRun.duration)),
    }
  }

  function getKey(flowRun: FlowRun | null, index: number): string {
    if (!flowRun) {
      return `${index}`
    }

    return flowRun.id
  }

  function organizeFlowRunsWithGaps(flowRuns: FlowRun[]): (FlowRun | null)[] {
    const { expectedStartTimeAfter, expectedStartTimeBefore } = toValue(props.filter).flowRuns ?? {}

    if (!expectedStartTimeBefore || !expectedStartTimeAfter) {
      return []
    }

    const totalTime = expectedStartTimeBefore.getTime() - expectedStartTimeAfter.getTime()
    const bucketSize = totalTime / bars.value
    const buckets: (FlowRun | null)[] = new Array(bars.value).fill(null)

    function getEmptyBucket(index: number): number | null {
      if (index < 0) {
        return null
      }

      if (buckets[index]) {
        return getEmptyBucket(index - 1)
      }

      return index
    }

    flowRuns.forEach((flowRun) => {
      const startTime = flowRun.startTime ?? flowRun.expectedStartTime

      if (!startTime) {
        return
      }

      const bucketIndex = Math.floor((startTime.getTime() - expectedStartTimeAfter.getTime()) / bucketSize)
      const emptyBucketIndex = getEmptyBucket(bucketIndex)

      if (emptyBucketIndex === null) {
        return
      }

      buckets[emptyBucketIndex] = flowRun
    })

    return buckets
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