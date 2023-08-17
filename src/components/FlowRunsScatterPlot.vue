<template>
  <div class="flow-runs-scatter-plot-plot">
    <ScatterPlot :items="items" :start-date="startDate" :end-date="endDate" :dot-diameter="16">
      <template #default="{ item }">
        <FlowRunPopOver :flow-run-id="item.id" />
      </template>
    </ScatterPlot>
  </div>
</template>

<script lang="ts" setup>
  import { ScatterPlot } from '@prefecthq/vue-charts'
  import { computed } from 'vue'
  import FlowRunPopOver from '@/components/FlowRunPopOver.vue'
  import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
  import { mapper } from '@/services/Mapper'

  const props = defineProps<{
    history: UiFlowRunHistory[],
    startDate?: Date,
    endDate?: Date,
  }>()

  const items = computed(() => mapper.map('UiFlowRunHistory', props.history, 'ScatterPlotItem'))
</script>

<style>
.flow-runs-scatter-plot-plot { @apply
  p-1
}

.flow-runs-scatter-plot-plot {
  --dot-opacity-high: 1;
  --dot-opacity-medium: 0.5;
  --dot-opacity-low: 0.1;
  position: relative;
}

.scatter-plot-item { @apply
  border
  border-divider
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
  border-color: var(--state-running-600);
}

.scatter-plot-item--scheduled {
  background-color: var(--state-scheduled-500);
  border-color: var(--state-scheduled-600);
}

.scatter-plot-item--pending {
  background-color: var(--state-pending-500);
  border-color: var(--state-pending-600);
}

.scatter-plot-item--paused {
  background-color: var(--state-paused-500);
  border-color: var(--state-paused-600);
}

.scatter-plot-item--cancelled {
  background-color: var(--state-cancelled-500);
  border-color: var(--state-cancelled-600);
}

.scatter-plot-item--completed {
  background-color: var(--state-completed-500);
  border-color: var(--state-completed-600);
}

.scatter-plot-item--failed {
  background-color: var(--state-failed-500);
  border-color: var(--state-failed-600);
}

.scatter-plot-item--crashed {
  background-color: var(--state-crashed-500);
  border-color: var(--state-crashed-600);
}
</style>