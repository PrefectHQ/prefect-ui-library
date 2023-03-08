<template>
  <section class="artifact-data-view">
    <component :is="component" :artifact="artifact" />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ArtifactDataMarkdown from '@/components/ArtifactDataMarkdown.vue'
  import ArtifactDataResult from '@/components/ArtifactDataResult.vue'
  import ArtifactDataUnknown from '@/components/ArtifactDataUnknown.vue'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const component = computed(() => {
    switch (props.artifact.type) {
      case 'result':
        return ArtifactDataResult
      case 'markdown':
        return ArtifactDataMarkdown
      case 'table':
      case 'unknown':
      default:
        return ArtifactDataUnknown
    }
  })
</script>
