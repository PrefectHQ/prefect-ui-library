<template>
  <div v-if="item && isTaskOrFlow" class="flow-run-graph-selection-panel">
    <div class="flex justify-end">
      <p-button small icon="XMarkIcon" flat @click="closePanel" />
    </div>
    <template v-if="item.kind === 'task-run'">
      <FlowRunTimelineTaskDetails :task-run-id="item.id" />
    </template>
    <template v-if="item.kind === 'flow-run'">
      <FlowRunTimelineSubFlowRunDetails :flow-run-id="item.id" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { GraphItemSelection } from '@prefecthq/graphs'
  import { computed } from 'vue'
  import { FlowRunTimelineTaskDetails, FlowRunTimelineSubFlowRunDetails } from '@/components'

  const props = defineProps<{
    item: GraphItemSelection | null,
  }>()

  const isTaskOrFlow = computed(() => {
    return props.item?.kind === 'task-run' || props.item?.kind === 'flow-run'
  })

  const emit = defineEmits<{
    'update:item': [null],
  }>()

  function closePanel(): void {
    emit('update:item', null)
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
