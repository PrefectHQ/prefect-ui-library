<template>
  <div v-if="node" class="flow-run-graph-selection-panel">
    <div class="flex justify-end">
      <p-button small icon="XMarkIcon" flat @click="closePanel" />
    </div>
    <template v-if="node.kind === 'task-run'">
      <FlowRunTimelineTaskDetails :task-run-id="node.id" />
    </template>
    <template v-if="node.kind === 'flow-run'">
      <FlowRunTimelineSubFlowRunDetails :flow-run-id="node.id" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { NodeSelection } from '@prefecthq/graphs'
  import { FlowRunTimelineTaskDetails, FlowRunTimelineSubFlowRunDetails } from '@/components'

  defineProps<{
    node: NodeSelection | null,
  }>()

  const emit = defineEmits<{
    'update:node': [null],
  }>()

  function closePanel(): void {
    emit('update:node', null)
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
