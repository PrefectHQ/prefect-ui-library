<template>
  <section class="artifact-data">
    <component :is="component" :artifact="artifact" />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ArtifactDataMarkdown from '@/components/ArtifactDataMarkdown.vue'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const component = computed(() => {
    switch (props.artifact.type) {
      case 'result':
      case 'markdown':
      case 'table':
      case 'unknown':
      default:
        return ArtifactDataMarkdown
    }
  })
</script>
