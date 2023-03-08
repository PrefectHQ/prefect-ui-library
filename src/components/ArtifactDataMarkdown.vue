<template>
  <p-markdown-renderer class="artifact-data-markdown" :text="data" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { MarkdownArtifact } from '@/models'

  const props = defineProps<{
    artifact: MarkdownArtifact,
  }>()

  const data = computed<string>(() => props.artifact.data)
</script>

<style>
.artifact-data-markdown { @apply
  max-w-full
  overflow-auto
}
</style>