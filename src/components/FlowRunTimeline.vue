<template>
  <div
    v-if="graphData.length > 0"
    class="flow-run-timeline"
    :class="classes.root"
    tabindex="0"
    aria-label="Flow run timeline graph"
  >
    <div class="flow-run-timeline__wrapper">
      <p-button
        v-if="isFullscreen"
        class="flow-run-timeline__fullscreen-exit"
        icon="XIcon"
        flat
        size="lg"
        @click="toggleFullscreen"
      />
      <div class="flow-run-timeline__options">
        <p-button
          title="Recenter Timeline (c)"
          icon="Target"
          flat
          @click="centerGraphViewport"
        />
        <p-button
          title="View Timeline in Fullscreen (f)"
          icon="ArrowsExpandIcon"
          flat
          @click="toggleFullscreen"
        />
        <FlowRunTimelineOptions
          :layout="layout"
          :hide-edges="hideEdges"
          @update:layout="updateLayout"
          @update:hide-edges="updateHideEdges"
        />
      </div>
      <div
        ref="timelineGraphContainer"
        class="flow-run-timeline__graph-wrapper"
      >
        <h1>{{ graphData.length }} YOOOO</h1>
        <FlowRunTimeline
          ref="timelineGraph"
          class="flow-run-timeline__graph"
          :class="classes.graph"
          :graph-data="graphData"
          :layout="layout"
          :hide-edges="hideEdges"
          :is-running="isRunning"
          :format-date-fns="formatDateFns"
          :theme="theme"
          :selected-node-id="selectedNode"
          @click="selectNode"
        />
      </div>
      <div
        class="flow-run-timeline__task-panel"
        :class="classes.panel"
      >
        <TaskRunPanel
          :task-run-id="selectedNode"
          @dismiss="closePanel"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    FlowRunTimeline,
    FormatDateFns,
    HSL,
    ThemeStyleOverrides,
    TimelineNodeData,
    TimelineNodesLayoutOptions,
    TimelineThemeOptions
  } from '@prefecthq/graphs'
  import { useColorTheme } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
  import { TaskRunPanel, FlowRunTimelineOptions } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun, isValidTimelineNodeData } from '@/models'
  import { formatTimeNumeric, formatTimeShortNumeric, formatDate } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { value: colorThemeValue } = useColorTheme()

  const defaultOptionThresholds = {
    nearestParentLayout: 100,
    hideEdges: 40,
  }

  const classes = computed(() => {
    return {
      root: {
        'flow-run-timeline--fullscreen': isFullscreen.value,
      },
      graph: {
        'flow-run-timeline__graph--panel-open': showTaskRunPanel.value,
      },
      panel: {
        'flow-run-timeline__task-panel--panel-open': showTaskRunPanel.value,
      },
    }
  })

  const timelineGraphContainer = ref<HTMLElement | null>(null)
  const timelineGraph = ref<InstanceType<typeof FlowRunTimeline> | null>(null)
  const isFullscreen = ref(false)
  const showTaskRunPanel = ref(false)
  const selectedNode: Ref<string | null> = ref(null)
  const formatDateFns: FormatDateFns = {
    timeBySeconds: formatTimeNumeric,
    timeByMinutes: formatTimeShortNumeric,
    date: formatDate,
  }
  const layout: Ref<TimelineNodesLayoutOptions> = ref('nearestParent')
  const hideEdges = ref(false)

  onMounted(() => {
    window.addEventListener('keydown', keyboardShortcutListener)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', keyboardShortcutListener)
  })

  function keyboardShortcutListener(event: KeyboardEvent): void {
    switch (event.key) {
      case 'c':
        centerGraphViewport()
        break
      case 'f':
        toggleFullscreen()
        break
      case 'Escape':
        if (isFullscreen.value) {
          toggleFullscreen()
        }
        break
      default:
        break
    }
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

  function closePanel(): void {
    showTaskRunPanel.value = false
  }

  function updateLayout(value: TimelineNodesLayoutOptions): void {
    layout.value = value
  }

  function updateHideEdges(value: boolean): void {
    hideEdges.value = value
  }

  function toggleFullscreen(): void {
    const originalWidth = timelineGraphContainer.value?.clientWidth ?? 0
    const originalHeight = timelineGraphContainer.value?.clientHeight ?? 0

    isFullscreen.value = !isFullscreen.value

    setTimeout(() => {
      const newWidth = timelineGraphContainer.value?.clientWidth ?? 0
      const newHeight = timelineGraphContainer.value?.clientHeight ?? 0

      const xOffset = (newWidth - originalWidth) / 2
      const yOffset = (newHeight - originalHeight) / 2

      timelineGraph.value?.moveViewportCenter({
        xOffset,
        yOffset,
      })
    }, 0)
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

  const unwatchInitialData = watch(graphData, (value) => {
    if (value.length > 0) {
      if (value.length > defaultOptionThresholds.nearestParentLayout) {
        layout.value = 'waterfall'
      }

      if (value.length > defaultOptionThresholds.hideEdges) {
        hideEdges.value = true
      }

      unwatchInitialData()
    }
  })

  function centerGraphViewport(): void {
    timelineGraph.value?.centerViewport()
  }

  /*
  * Theme overrides
  */
  const documentStyles = getComputedStyle(document.documentElement)
  const bodyStyles = getComputedStyle(document.body)

  function getStateColor(cssVariable: string): string {
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

  function getHslColor(defaultCssVariable: string, darkCssVariable?: string): HSL {
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
  h-[320px]
  outline-none
}

.flow-run-timeline__wrapper { @apply
  h-full
  w-full
  relative
  overflow-hidden
}

.flow-run-timeline--fullscreen .flow-run-timeline__wrapper { @apply
  h-screen
  w-full
  absolute
  top-0
  left-0
  z-20
  bg-background-600
  dark:bg-background
}

.flow-run-timeline__options { @apply
  inline-flex
  gap-1
  absolute
  bottom-1
  right-1
  z-10
}

.flow-run-timeline__fullscreen-exit { @apply
  absolute
  top-1
  right-1
  z-10
}

.flow-run-timeline__graph-wrapper { @apply
  h-full
  w-full
  relative
  overflow-hidden
}

.flow-run-timeline__graph { @apply
  bg-background-600
  dark:bg-background
  rounded-lg;
}

.flow-run-timeline__graph canvas {
  animation: fadeGraphIn 200ms ease-in-out;
}

.flow-run-timeline--fullscreen .flow-run-timeline__graph  canvas {
  animation: none;
}

.flow-run-timeline--fullscreen .flow-run-timeline__graph {
  animation: scaleGraphIn 0.5s ease;
}

@media (min-width: 640px) {
  .flow-run-timeline__graph--panel-open {
    width: calc(100% - 320px);
  }
  .flow-run-timeline--fullscreen .flow-run-timeline__graph--panel-open { @apply
    w-full
  }
}

.flow-run-timeline__task-panel { @apply
  absolute
  top-0
  right-0
  bottom-0
  z-10
  w-[320px]
  max-w-full
  pl-4
  translate-x-full
  transition-transform
  duration-300
}

.flow-run-timeline--fullscreen .flow-run-timeline__task-panel { @apply
  h-auto
  top-4
  right-4
  bottom-auto
}

.flow-run-timeline__task-panel--panel-open { @apply
  translate-x-0
  duration-500
}

@keyframes fadeGraphIn {
  0% {
    transform: scale(1.1);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scaleGraphIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
