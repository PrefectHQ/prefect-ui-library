<template>
  <div :class="classes">
    <div class="flex justify-end">
      <p-button small icon="XMarkIcon" flat @click="closePanel" />
    </div>
    <FlowRunTimelineTaskDetails
      v-if="selectedNode && selectedNode.type === 'task'"
      :task-run-id="selectedNode.id"
    />
    <FlowRunTimelineSubFlowRunDetails
      v-if="selectedNode && selectedNode.type === 'subFlowRun'"
      :flow-run-id="selectedNode.id"
    />
  </div>
</template>

<script lang="ts" setup>
  import { NodeSelectionEvent } from '@prefecthq/graphs'
  import { computed, toRefs } from 'vue'
  import {
    FlowRunTimelineTaskDetails,
    FlowRunTimelineSubFlowRunDetails
  } from '@/components'

  const props = defineProps<{
    /** selectedNode and all inner content is optional for the sake of outgoing animations */
    selectedNode: NodeSelectionEvent | null,
    floating: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'dismiss'): void,
  }>()

  const { selectedNode, floating } = toRefs(props)

  const classes = computed(() => {
    return {
      'timeline-selection-panel': true,
      'timeline-selection-panel--floating': floating.value,
    }
  })

  function closePanel(): void {
    emit('dismiss')
  }
</script>

<style>
.timeline-selection-panel { @apply
  border
  bg-floating
  shadow-lg
  w-full
  h-full
  p-4
  rounded-default
  overflow-auto
}
</style>
