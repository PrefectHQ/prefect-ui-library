<template>
  <div ref="chart" class="flow-runs-bar-chart" :class="classes.root" :style="styles.root" @mouseleave="close">
    <template v-for="bar in bars" :key="bar">
      <p-pop-over class="flow-runs-bar-chart__bar-container" :to="chart" :placement="placement" :group="group" auto-close>
        <template #target="{ open }">
          <div class="flow-runs-bar-chart__bar" :class="getBarClasses(bar)" :style="getBarStyles(bar)" @mouseover="open" />
        </template>

        <template v-if="getBarFlowRun(bar)">
          <div class="flow-runs-bar-chart__pop-over">
            <FlowRunPopoverContent :flow-run-id="getBarFlowRun(bar)!.id" />
          </div>
        </template>
      </p-pop-over>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ClassValue, toPixels, positions, usePopOverGroup } from '@prefecthq/prefect-design'
  import { useElementRect } from '@prefecthq/vue-compositions'
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
  const styles = computed(() => ({
    root: `grid-template-columns: repeat(${bars.value}, 1fr)`,
  }))

  const classes = computed(() => ({
    root: {
      'flow-runs-bar-chart--mini': props.mini,
    },
  }))

  const filter = computed<FlowRunsFilter | null>(() => {
    if (isNaN(bars.value)) {
      return null
    }

    const filter: FlowRunsFilter = {
      ...props.filter,
      limit: bars.value,
    }

    return filter
  })
  const { flowRuns } = useFlowRuns(filter)

  const barFlowRuns = computed(() => {
    const difference = bars.value - flowRuns.value.length
    const emptyValues: undefined[] = new Array(difference)

    return [...emptyValues, ...flowRuns.value]
  })

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

  function getBarFlowRun(bar: number): FlowRun | undefined {
    return barFlowRuns.value.at(bar - 1)
  }

  function getBarClasses(bar: number): ClassValue {
    const flowRun = getBarFlowRun(bar)

    if (!flowRun) {
      return ''
    }

    return [
      `bg-state-${flowRun.stateType}-500`,
      'flow-runs-bar-chart__bar-flow-run',
    ]
  }

  function getBarStyles(bar: number): StyleValue {
    const flowRun = getBarFlowRun(bar)

    if (!flowRun) {
      return ''
    }

    return {
      height: toPixels(yScale.value(flowRun.duration)),
    }
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