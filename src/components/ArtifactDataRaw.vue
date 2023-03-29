<template>
  <section class="artifact-data-view">
    <p-code-highlight v-bind="{ lang, text }" />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Artifact } from '@/models'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const text = computed(() => props.artifact.serializedData ?? '')

  const lang = computed(() => {
    switch (props.artifact.type) {
      case 'markdown':
        return 'gh-markdown'
      case 'table':
      case 'result':
      case 'unknown':
      default:
        return 'json'
    }
  })
</script>
