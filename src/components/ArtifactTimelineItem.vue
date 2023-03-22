<template>
  <div class="artifact-timeline-item">
    {{ artifact.key }}
    {{ artifact.description }}
  </div>
</template>

<script lang="ts" setup>
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()
</script>

<style>
.artifact-timeline-item { @apply
  max-h-28
  overflow-hidden
}
</style>