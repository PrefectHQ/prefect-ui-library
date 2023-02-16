<template>
  <p-card class="artifact-card">
    <p-markdown-renderer />
  </p-card>
</template>

<script lang="ts" setup>
  import { Artifact } from '@/models'

  defineProps<{
    artifact: Artifact,
  }>()
</script>

<style>
.artifact-card { @apply
  max-w-full
  overflow-auto
}
</style>