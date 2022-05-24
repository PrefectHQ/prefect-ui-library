<template>
  <div class="flow-run-scatter-plot">
    <div class="flow-run-scatter-plot__duration">
      Duration
    </div>
    <ScatterPlot :items="items" :dot-diameter="16">
      <template #default="scope">
        <slot v-bind="scope" />
      </template>
    </ScatterPlot>
  </div>
</template>

<script lang="ts" setup>
  import { ScatterPlot } from '@prefecthq/vue-charts'
  import { computed } from 'vue'
  import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
  import { mapper } from '@/services/Mapper'

  const props = defineProps<{
    history: UiFlowRunHistory[],
  }>()

  const items = computed(() => mapper.map('UiFlowRunHistory', props.history, 'ScatterPlotItem'))
</script>

<style>
.flow-run-scatter-plot { @apply
  border-gray-300
  border-2
  rounded
  p-1
}

.flow-run-scatter-plot {
  --dot-opacity-high: 1;
  --dot-opacity-medium: 0.5;
  --dot-opacity-low: 0.1;
  position: relative;
}

.flow-run-scatter-plot__duration { @apply
  text-sm
  text-gray-500
}

.flow-run-scatter-plot__duration {
  position: absolute;
  transform: rotate(-90deg) translate(0, -50%);
  transform-origin: 50% 50%;
  top: 50%;
  left: 0;
}

.scatter-plot-item { @apply
  border-2
  border-white
}

.scatter-plot-item {
  opacity: var(--dot-opacity-medium);
}

.scatter-plot-item:hover {
  opacity: var(--dot-opacity-high);
  z-index: 1000;
}

.scatter-plot-item--running {
  background-color: var(--state-running-500);
}

.scatter-plot-item--scheduled {
  background-color: var(--state-scheduled-500);
}

.scatter-plot-item--pending {
  background-color: var(--state-pending-500);
}

.scatter-plot-item--cancelled {
  background-color: var(--state-cancelled-500);
}

.scatter-plot-item--completed {
  background-color: var(--state-completed-500);
}

.scatter-plot-item--failed {
  background-color: var(--state-failed-500);
}
</style>