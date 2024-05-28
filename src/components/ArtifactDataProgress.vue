<template>
  <div class="artifact-data-progress">
    Progress: {{ Math.trunc(artifact.data) }}%
  </div>
</template>

<script lang="ts" setup>
  import { ProgressArtifact } from '@/models'

  defineProps<{
    artifact: ProgressArtifact,
  }>()
</script>

<style>
.artifact-data-progress { @apply
  max-w-full
}
</style>
