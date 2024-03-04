<template>
  <FlowRunGraphPopover
    v-if="selection.position"
    :position="selection.position"
  >
    <div class="flow-run-graph-artifacts-popover">
      <h4 class="flow-run-graph-artifacts-popover__label">
        Artifacts
      </h4>
      <div class="flow-run-graph-artifacts-popover__content">
        <template v-for="artifactId in selection.ids" :key="artifactId">
          <FlowRunGraphArtifactCard :artifact-id="artifactId" />
        </template>
      </div>
    </div>
  </FlowRunGraphPopover>
</template>

<script lang="ts" setup>
  import { ArtifactsSelection } from '@prefecthq/graphs'
  import { FlowRunGraphPopover, FlowRunGraphArtifactCard } from '@/components'

  defineProps<{
    selection: ArtifactsSelection,
  }>()
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