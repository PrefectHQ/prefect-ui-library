<template>
  <div class="flow-run-graph">
    <template v-if="load">
      <RunGraph
        v-model:viewport="viewport"
        v-model:selected="selected"
        v-model:fullscreen="fullscreen"
        :config="config"
        class="flow-run-graph__graph p-background"
      />
    </template>
    <template v-else>
      <FlowRunGraphConfirmation @confirm="confirm" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { NodeSelection, RunGraph, RunGraphConfig, ViewportDateRange } from '@prefecthq/graphs'
  import { useColorTheme } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import FlowRunGraphConfirmation from '@/components/FlowRunGraphConfirmation.vue'
  import { useTaskRunsCount } from '@/compositions/useTaskRunsCount'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRun } from '@/models/FlowRun'
  import { ServerStateType } from '@/models/StateType'

  const OPT_IN_THRESHOLD = 2000

  const props = defineProps<{
    flowRun: FlowRun,
    viewport: ViewportDateRange,
    fullscreen: boolean,
    selected: NodeSelection | null,
  }>()

  const emit = defineEmits<{
    'update:viewport': [ViewportDateRange | undefined],
    'update:fullscreen': [boolean],
    'update:selected': [NodeSelection | null],
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
    styles: {
      colorMode: colorThemeValue.value,
      textDefault: getColorToken('--p-color-text-default'),
      textInverse: getColorToken('--p-color-text-inverse'),
      nodeToggleBorderColor: getColorToken('--p-color-button-default-border'),
      nodeSelectedBorderColor: getColorToken('--p-color-flow-run-graph-node-selected-border'),
      edgeColor: getColorToken('--p-color-flow-run-graph-edge'),
      guideLineColor: getColorToken('--p-color-divider'),
      guideTextColor: getColorToken('--p-color-text-subdued'),
      node: node => ({
        background: stateTypeColors[node.state_type],
      }),
    },
  }))

  const { count, subscription } = useTaskRunsCount(() => ({
    flowRuns: {
      id: [props.flowRun.id],
    },
    taskRuns: {
      subFlowRunsExist: undefined,
    },
  }))

  await subscription.promise()

  if (count.value! > OPT_IN_THRESHOLD) {
    load.value = false
  }

  function confirm(): void {
    load.value = true
  }
</script>

<style>
:root {
  --p-color-flow-run-graph-node-selected-border: var(--p-color-text-selected);
  --p-color-flow-run-graph-edge: var(--p-color-text-subdued);
}

.flow-run-graph__graph {
  width: 100%;
  height: 340px;
}
</style>