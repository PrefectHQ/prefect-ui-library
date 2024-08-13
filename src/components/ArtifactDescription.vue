<template>
  <section class="artifact-description">
    <p-markdown-renderer :text="description" />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Artifact, ArtifactCollection } from '@/models'
  const props = defineProps<{
    artifact: Artifact | ArtifactCollection,
  }>()

  const description = computed(() => props.artifact.description ?? '')
</script>

<style>
.artifact-description { @apply
  max-w-full
  overflow-auto
}
</style>