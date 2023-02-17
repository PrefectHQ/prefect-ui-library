<template>
  <p-card class="artifact-description">
    <p-markdown-renderer :text="artifact.metadata.description" />
  </p-card>
</template>

<script lang="ts" setup>
  import { Artifact } from '@/models'

  defineProps<{
    artifact: Artifact,
  }>()
</script>

<style>
.artifact-description { @apply
  max-w-full
  overflow-auto
}
</style>