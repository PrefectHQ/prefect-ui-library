<template>
  <FlowRunGraphPopover
    v-if="artifactsSelection"
    class="flow-run-graph-artifacts-popover"
    :position="artifactsSelection.position"
    @on-close="close"
  >
    <h4 class="flow-run-graph-artifacts-popover__label">
      Artifacts
    </h4>
    <div class="flow-run-graph-artifacts-popover__content">
      <template v-for="artifactId in artifactsSelection.ids" :key="artifactId">
        <FlowRunGraphArtifactCard :artifact-id="artifactId" />
      </template>
    </div>
  </FlowRunGraphPopover>
</template>

<script lang="ts" setup>
  import { GraphItemSelection, isArtifactsSelection } from '@prefecthq/graphs'
  import { computed } from 'vue'
  import { FlowRunGraphPopover, FlowRunGraphArtifactCard } from '@/components'

  const props = defineProps<{
    selection: GraphItemSelection | null,
  }>()

  const emit = defineEmits<{
    'update:selection': [null],
  }>()

  const artifactsSelection = computed(() => {
    if (props.selection && isArtifactsSelection(props.selection)) {
      return props.selection
    }

    return null
  })

  function close(): void {
    emit('update:selection', null)
  }
</script>

<style>
.flow-run-graph-artifacts-popover { @apply
  max-h-80
  overflow-auto
}

.flow-run-graph-artifacts-popover__label { @apply
  w-full
  text-xs
  text-subdued
  mb-1
}

.flow-run-graph-artifacts-popover__content { @apply
  inline-flex
  flex-col
  gap-1
}
</style>