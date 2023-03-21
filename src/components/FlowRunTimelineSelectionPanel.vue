<template>
  <div :class="classes">
    <FlowRunTimelineTaskDetails
      v-if="selectedNode && selectedNode.type === 'task'"
      :id="selectedNode.id"
    >
      <p-button size="xs" icon="XIcon" flat @click="closePanel" />
    </FlowRunTimelineTaskDetails>
    <FlowRunTimelineSubFlowRunDetails
      v-if="selectedNode && selectedNode.type === 'subFlowRun'"
      :id="selectedNode.id"
    >
      <p-button size="xs" icon="XIcon" flat @click="closePanel" />
    </FlowRunTimelineSubFlowRunDetails>
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
    floating?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'dismiss'): void,
  }>()

  const { selectedNode, floating } = toRefs(props)

  const classes = computed(() => {
    return {
      'timeline-selection-panel': true,
      'timeline-selection-panel--floating': floating?.value,
    }
  })

  function closePanel(): void {
    emit('dismiss')
  }
</script>

<style>
.timeline-selection-panel { @apply
  border
  bg-background
  dark:border-background-600
  w-full
  h-full
  p-4
  rounded-lg
  overflow-auto
}

.timeline-selection-panel--floating { @apply
  bg-opacity-80
  backdrop-blur
}
</style>
