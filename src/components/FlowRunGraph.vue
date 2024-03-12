<template>
  <div class="flow-run-graph" :class="classes.root">
    <template v-if="load">
      <RunGraph
        v-model:viewport="viewport"
        v-model:selected="selected"
        v-model:fullscreen="fullscreen"
        :config="config"
        class="flow-run-graph__graph p-background"
      />
      <p v-if="!hasGraphNodes" class="flow-run-graph__no-nodes-message">
        {{ emptyMessage }}
      </p>
    </template>
    <template v-else>
      <FlowRunGraphConfirmation @confirm="confirm" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { GraphItemSelection, RunGraph, RunGraphConfig, ViewportDateRange, RunGraphFetchEvents } from '@prefecthq/graphs'
  import { useColorTheme } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import FlowRunGraphConfirmation from '@/components/FlowRunGraphConfirmation.vue'
  import { useTaskRunsCount } from '@/compositions/useTaskRunsCount'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRun } from '@/models/FlowRun'
  import { ServerStateType, isTerminalStateType } from '@/models/StateType'

  const NODE_COUNT_TO_REQUIRED_OPT_IN = 2000

  const props = defineProps<{
    flowRun: FlowRun,
    fullscreen: boolean,
    selected: GraphItemSelection | null,
    viewport?: ViewportDateRange,
    fetchEvents?: RunGraphFetchEvents,
  }>()

  const emit = defineEmits<{
    'update:viewport': [ViewportDateRange | undefined],
    'update:fullscreen': [boolean],
    'update:selected': [GraphItemSelection | null],
  }>()

  const api = useWorkspaceApi()
  const { value: colorThemeValue } = useColorTheme()
  const load = ref(true)

  const viewport = computed({
    get() {
      return props.viewport
    },
    set(value) {
      emit('update:viewport', value)
    },
  })

  const fullscreen = computed({
    get() {
      return props.fullscreen
    },
    set(value) {
      emit('update:fullscreen', value)
    },
  })

  const selected = computed({
    get() {
      return props.selected
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const emptyMessage = computed(() => {
    if (isTerminalStateType(props.flowRun.state?.type)) {
      return 'This flow run did not generate any task or subflow runs'
    }

    return 'This flow run has not yet generated any task or subflow runs'
  })


  // these will be replaced with brandon's styles
  const stateTypeColors = {
    COMPLETED: '#219D4B',
    RUNNING: '#09439B',
    SCHEDULED: '#E08504',
    PENDING: '#554B58',
    FAILED: '#DE0529',
    CANCELLED: '#333333',
    CANCELLING: '#333333',
    CRASHED: '#EA580C',
    PAUSED: '#554B58',
  } satisfies Record<ServerStateType, string>

  const documentStyles = getComputedStyle(document.documentElement)

  function getColorToken(cssVariable: string): string {
    return documentStyles.getPropertyValue(cssVariable).trim()
  }

  const config = computed<RunGraphConfig>(() => ({
    runId: props.flowRun.id,
    fetch: api.flowRuns.getFlowRunsGraph,
    fetchEvents: props.fetchEvents,
    styles: {
      colorMode: colorThemeValue.value,
      textDefault: getColorToken('--p-color-text-default'),
      textInverse: getColorToken('--p-color-text-inverse'),
      nodeToggleBorderColor: getColorToken('--p-color-button-default-border'),
      selectedBorderColor: getColorToken('--p-color-flow-run-graph-node-selected-border'),
      edgeColor: getColorToken('--p-color-flow-run-graph-edge'),
      guideLineColor: getColorToken('--p-color-divider'),
      guideTextColor: getColorToken('--p-color-text-subdued'),
      node: node => ({
        background: stateTypeColors[node.state_type],
      }),
      state: state => ({
        background: stateTypeColors[state.type],
      }),
    },
  }))

  const taskRunCountOptions = computed(() => ({
    interval: isTerminalStateType(props.flowRun.state?.type) ? undefined : 1000,
  }))
  const { count, subscription } = useTaskRunsCount(() => ({
    flowRuns: {
      id: [props.flowRun.id],
    },
    taskRuns: {
      subFlowRunsExist: undefined,
    },
  }), taskRunCountOptions)

  const hasGraphNodes = computed(() => count.value && count.value > 0)

  await subscription.promise()

  if (count.value! > NODE_COUNT_TO_REQUIRED_OPT_IN) {
    load.value = false
  }

  const classes = computed(() => ({
    root: {
      'flow-run-graph--no-nodes': !hasGraphNodes.value,
    },
  }))

  function confirm(): void {
    load.value = true
  }
</script>

<style>
:root {
  --p-color-flow-run-graph-node-selected-border: var(--p-color-text-selected);
  --p-color-flow-run-graph-edge: var(--p-color-text-subdued);
}

.flow-run-graph { @apply
  w-full
  h-96
  relative
}

.flow-run-graph--no-nodes { @apply
  h-40
}

.flow-run-graph__graph {
  width: 100%;
  height: 100%;
}

.flow-run-graph__no-nodes-message { @apply
  text-center
  text-subdued
  max-w-full
  px-3
  absolute
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  pointer-events-none
}
</style>