<template>
  <div class="flow-run-graph-selection-panel">
    <div class="flex justify-end">
      <p-button small icon="XMarkIcon" flat @click="closePanel" />
    </div>
    <template v-if="selection.kind === 'task-run'">
      <FlowRunTimelineTaskDetails :task-run-id="selection.id" />
    </template>
    <template v-if="selection.kind === 'flow-run'">
      <FlowRunTimelineSubFlowRunDetails :flow-run-id="selection.id" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { NodeSelection } from '@prefecthq/graphs'
  import { FlowRunTimelineTaskDetails, FlowRunTimelineSubFlowRunDetails } from '@/components'

  defineProps<{
    selection: NodeSelection,
  }>()

  const emit = defineEmits<{
    'update:selection': [null],
  }>()

  function closePanel(): void {
    emit('update:selection', null)
  }
</script>

<style>
.flow-run-graph-selection-panel { @apply
  w-full
  h-full
  p-4
  rounded-default
  overflow-auto
}
</style>
