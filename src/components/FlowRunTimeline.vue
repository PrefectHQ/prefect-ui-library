<template>
  <div class="flow-run-timeline">
    <div v-if="graphData.length > 0" class="flow-run-timeline__container">
      <FlowRunTimeline
        class="flow-run-timeline__timeline"
        :class="{ 'flow-run-timeline__timeline--panel-open': showTaskRunPanel }"
        :graph-data="graphData"
        :is-running="isRunning"
        :format-date-fns="formatDateFns"
        :selected-node-id="selectedNode"
        :theme="theme"
        layout="nearestParent"
        @click="selectNode"
      />
    </div>
    <div
      class="flow-run-timeline__task-panel"
      :class="{ 'flow-run-timeline__task-panel--panel-open': showTaskRunPanel }"
    >
      <TaskRunPanel
        :task-run-id="selectedNode"
        @dismiss="closePanel"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FlowRunTimeline, FormatDateFns, HSL, ThemeStyleOverrides, TimelineNodeData, TimelineThemeOptions } from '@prefecthq/graphs'
  import { useColorTheme } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, Ref, ref } from 'vue'
  import { TaskRunPanel } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun, isValidTimelineNodeData } from '@/models'
  import { formatTimeNumeric, formatTimeShortNumeric, formatDate } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { value: colorThemeValue } = useColorTheme()

  const showTaskRunPanel = ref(false)
  const selectedNode: Ref<string | null> = ref(null)
  const formatDateFns: FormatDateFns = {
    timeBySeconds: formatTimeNumeric,
    timeByMinutes: formatTimeShortNumeric,
    date: formatDate,
  }

  const selectNode = (value: string | null): void => {
    if (!value || value === selectedNode.value) {
      selectedNode.value = null
      showTaskRunPanel.value = false
      return
    }

    selectedNode.value = value
    showTaskRunPanel.value = true
  }

  const closePanel = (): void => {
    showTaskRunPanel.value = false
  }

  const isRunning = computed(() => {
    return props.flowRun.state?.name.toLowerCase() === 'running'
  })

  const api = useWorkspaceApi()

  const graphSubscription = useSubscription(
    api.flowRuns.getFlowRunsTimeline,
    [props.flowRun.id],
    { interval: 5000 },
  )

  const graphData = computed(() => {
    const items: TimelineNodeData[] = (graphSubscription.response ?? [])
      .filter((node): node is TimelineNodeData => isValidTimelineNodeData(node))
      .sort((nodeA, nodeB) => {
        return nodeA.start.getTime() - nodeB.start.getTime()
      })

    return items
  })

  const documentStyles = getComputedStyle(document.documentElement)
  const bodyStyles = getComputedStyle(document.body)

  const getStateColor = (cssVariable: string): string => {
    return bodyStyles.getPropertyValue(cssVariable).trim()
  }

  const stateColors: Record<string, string> = {
    completed: getStateColor('--state-completed-600'),
    running: getStateColor('--state-running-600'),
    scheduled: getStateColor('--state-scheduled-600'),
    pending: getStateColor('--state-pending-600'),
    failed: getStateColor('--state-failed-600'),
    cancelled: getStateColor('--state-cancelled-600'),
    crashed: getStateColor('--state-crashed-600'),
    paused: getStateColor('--state-paused-600'),
  }

  const themeDefaultOverrides = computed<Partial<ThemeStyleOverrides>>(() => ({
    colorTextDefault: getHslColor('--foreground', '--white'),
    colorTextInverse: getHslColor('--white', '--background'),
    colorTextSubdued: getHslColor('--foreground-300', '--foreground-200'),
    colorNodeSelection: getHslColor('--primary-default-400'),
    colorEdge: getHslColor('--foreground-200', '--foreground-300'),
    colorGuideLine: getHslColor('--foreground-50'),
    colorPlayheadBg: getHslColor('--primary-default-400'),
    textFontFamilyDefault: 'InterVariable',
    alphaNodeDimmed: 0.2,
  }))

  const getHslColor = (defaultCssVariable: string, darkCssVariable?: string): HSL => {
    const propertyValue = darkCssVariable && colorThemeValue.value === 'dark'
      ? darkCssVariable
      : defaultCssVariable
    const [hue, saturation, lightness] = documentStyles.getPropertyValue(propertyValue).trim().split(' ')
    return `hsl(${hue}, ${saturation}, ${lightness})`
  }

  const theme = computed<TimelineThemeOptions>(() => {
    return {
      node: (node: TimelineNodeData) => {
        let inverseTextOnFill = colorThemeValue.value !== 'dark'
        if (node.state === 'scheduled') {
          inverseTextOnFill = colorThemeValue.value === 'dark'
        }
        return {
          fill: stateColors[node.state],
          inverseTextOnFill,
        }
      },
      defaults: themeDefaultOverrides.value,
    }
  })
</script>

<style>
.flow-run-timeline { @apply
  flex
  overflow-hidden
}

.flow-run-timeline__container { @apply
  h-[320px]
  w-full
  relative
  overflow-hidden
}

.flow-run-timeline__timeline { @apply
  bg-background-600
  dark:bg-background
  rounded-lg
}
.flow-run-timeline__timeline--panel-open {
  width: calc(100% - 320px);
}

.flow-run-timeline__task-panel { @apply
  absolute
  top-0
  right-0
  bottom-0
  z-10
  w-[320px]
  pl-4
  translate-x-full
  transition-transform
  duration-300
}

.flow-run-timeline__task-panel--panel-open { @apply
  translate-x-0
  duration-500
}
</style>
