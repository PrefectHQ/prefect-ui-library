<template>
  <section class="artifact-data-view">
    <component :is="component" :artifact="artifact" />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ArtifactDataMarkdown from '@/components/ArtifactDataMarkdown.vue'
  import ArtifactDataResult from '@/components/ArtifactDataResult.vue'
  import ArtifactDataTable from '@/components/ArtifactDataTable.vue'
  import ArtifactDataUnknown from '@/components/ArtifactDataUnknown.vue'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  // fixes a typescript error when trying to pass the artifact to the dynamic component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const artifact = computed<any>(() => props.artifact)

  const component = computed(() => {
    switch (props.artifact.type) {
      case 'result':
        return ArtifactDataResult
      case 'markdown':
        return ArtifactDataMarkdown
      case 'table':
        return ArtifactDataTable
      case 'unknown':
      default:
        return ArtifactDataUnknown
    }
  })
</script>
