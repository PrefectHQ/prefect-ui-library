<template>
  <p-card class="artifact-description">
    <p-markdown-renderer :text="description" />
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const description = computed(() => props.artifact.metadata?.description ?? '')
</script>

<style>
.artifact-description { @apply
  max-w-full
  overflow-auto
}
</style>