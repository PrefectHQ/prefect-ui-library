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
          :sub-node-labels="subFlowRunLabels"
          :selected-node-id="selectedNode?.id"
          :expanded-sub-nodes="expandedSubFlowRuns"
          @selection="selectNode"
          @sub-node-toggle="toggleSubFlowRun"
        />
      </div>
      <div
        class="flow-run-timeline__task-panel"
        :class="classes.panel"
      >
        <FlowRunTimelineSelectionPanel
          :selected-node="selectedNode"
          :floating="isFullscreen"
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
    GraphTimelineNode,
    TimelineNodesLayoutOptions,
    TimelineThemeOptions,
    ExpandedSubNodes,
    NodeSelectionEvent
  } from '@prefecthq/graphs'
  import { useColorTheme } from '@prefecthq/prefect-design'
  import { UseSubscription, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import { FlowRunTimelineSelectionPanel, FlowRunTimelineOptions } from '@/components'
  import { useFlowRuns, useFlows, useWorkspaceApi } from '@/compositions'
  import { FlowRun, isRunningStateType, isTerminalStateType } from '@/models'
  import { WorkspaceFlowRunsApi } from '@/services'
  import { prefectStateNames } from '@/types'
  import { formatTimeNumeric, formatTimeShortNumeric, formatDate } from '@/utilities'
  import { eventTargetIsInput } from '@/utilities/eventTarget'

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
  const selectedNode = ref<NodeSelectionEvent | null>(null)
  const expandedSubFlowRuns = ref<ExpandedSubNodes<{
    subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRunsTimeline']>,
  }>>(new Map())
  const formatDateFns: FormatDateFns = {
    timeBySeconds: formatTimeNumeric,
    timeByMinutes: formatTimeShortNumeric,
    date: formatDate,
  }
  const layout = ref<TimelineNodesLayoutOptions>('nearestParent')
  const hideEdges = ref(false)

  const documentStyles = getComputedStyle(document.documentElement)
  const bodyStyles = getComputedStyle(document.body)

  onMounted(() => {
    window.addEventListener('keydown', keyboardShortcutListener)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', keyboardShortcutListener)
  })

  function keyboardShortcutListener(event: KeyboardEvent): void {
    if (eventTargetIsInput(event.target) || event.metaKey) {
      return
    }

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

  const selectNode = (value: NodeSelectionEvent | null): void => {
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
  const interval = isRunningStateType(props.flowRun.stateType) ? { interval: 5000 } : undefined

  const graphSubscription = useSubscription(
    api.flowRuns.getFlowRunsTimeline,
    [props.flowRun.id],
    interval,
  )

  const graphData = computed(() => graphSubscription.response ?? [])

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

  const unwatchFlowRunStateType = watch(() => props.flowRun.stateType, async type => {
    if (!isTerminalStateType(type)) {
      return
    }

    if (!interval) {
      return
    }

    const updates: Promise<void>[] = []
    const subscriptions = Array.from(expandedSubFlowRuns.value.values()).map(({ subscription }) => subscription)

    updates.push(graphSubscription.refresh())

    subscriptions.forEach(subscription => {
      updates.push(subscription.refresh())
    })

    await Promise.all(updates)

    subscriptions.forEach(subscription => subscription.unsubscribe())
    graphSubscription.unsubscribe()

    unwatchFlowRunStateType()
  })

  function centerGraphViewport(): void {
    timelineGraph.value?.centerViewport()
  }

  function toggleSubFlowRun(id: string): void {
    const isValueVisible = expandedSubFlowRuns.value.has(id)

    if (isValueVisible) {
      const subFlowRun = expandedSubFlowRuns.value.get(id)
      subFlowRun?.subscription.unsubscribe()
      expandedSubFlowRuns.value.delete(id)
      return
    }

    const subscription = useSubscription(
      api.flowRuns.getFlowRunsTimeline,
      [id],
      interval,
    )

    const data = computed(() => subscription.response ?? [])

    expandedSubFlowRuns.value.set(id, {
      data,
      subscription,
    })
  }

  const getSubFlowRunIds = (data: GraphTimelineNode[]): string[] => {
    return data
      .map((node) => node.subFlowRunId)
      .filter((subFlowRunId): subFlowRunId is string => subFlowRunId !== undefined)
  }
  const rootSubFlowRunIds = computed<string[]>(() => {
    return getSubFlowRunIds(graphData.value)
  })
  const expandedSubFlowRunIds = computed<string[]>(() => {
    return getSubFlowRunIds(
      Array.from(expandedSubFlowRuns.value.values())
        .flatMap(subFlowRun => 'value' in subFlowRun.data ? subFlowRun.data.value : subFlowRun.data),
    )
  })

  const allSubFlowRunIds = computed<string[]>(() => [...rootSubFlowRunIds.value, ...expandedSubFlowRunIds.value])
  const { flowRuns: subFlowRuns } = useFlowRuns(allSubFlowRunIds)

  const allSubFlowRunFlowIds = computed<string[]>(() => {
    return subFlowRuns.value?.map((flowRun) => flowRun.flowId) ?? []
  })
  const { flows: subFlows } = useFlows(allSubFlowRunFlowIds)

  const subFlowRunLabels = computed(() => {
    return (subFlowRuns.value ?? [])
      .reduce((acc, curr) => {
        if (curr.name) {
          let subFlowRunName = ''

          if (subFlows.value) {
            const subFlow = subFlows.value.find((flow) => flow.id === curr.flowId)
            if (subFlow) {
              subFlowRunName = `${subFlow.name} / `
            }
          }

          subFlowRunName += curr.name

          acc.set(curr.id, subFlowRunName)
        }
        return acc
      }, new Map<string, string>())
  })

  function getStateColor(cssVariable: string): string {
    return bodyStyles.getPropertyValue(cssVariable).trim()
  }

  const stateColors = prefectStateNames.reduce((acc, stateName) => {
    const lowerCaseStateName = stateName.toLowerCase()
    acc[lowerCaseStateName] = {
      default: getStateColor(`--state-${lowerCaseStateName}-600`),
      hover: getStateColor(`--state-${lowerCaseStateName}-700`),
    }
    return acc
  }, {} as Record<string, Record<'default' | 'hover', string>>)

  const themeDefaultOverrides = computed<Partial<ThemeStyleOverrides>>(() => ({
    colorTextDefault: getHslColor('--foreground', '--white'),
    colorTextInverse: getHslColor('--white', '--background'),
    colorTextSubdued: getHslColor('--foreground-300', '--foreground-200'),
    colorNodeSelection: getHslColor('--primary-default-400'),
    colorButtonBg: getHslColor('--background', '--background-100'),
    colorButtonBgHover: getHslColor('--background-400', '--background-100'),
    colorButtonBorder: colorThemeValue.value === 'dark' ? null : getHslColor('--background-400'),
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
      node: (node: GraphTimelineNode) => {
        let inverseTextOnFill = colorThemeValue.value !== 'dark'
        if (node.state === 'scheduled') {
          inverseTextOnFill = colorThemeValue.value === 'dark'
        }
        return {
          fill: stateColors[node.state].default,
          onFillSubNodeToggleHoverBg: stateColors[node.state].hover,
          onFillSubNodeToggleHoverBgAlpha: 1,
          inverseTextOnFill,
        }
      },
      defaults: themeDefaultOverrides.value,
    }
  })
</script>

<style>
.flow-run-timeline { @apply
  h-[340px]
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
  bg-background
}

.flow-run-timeline__options { @apply
  inline-flex
  gap-1
  absolute
  bottom-1
  right-1
  z-10
}
.flow-run-timeline__options button { @apply
  bg-transparent
  shadow-none
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
  bg-background
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
