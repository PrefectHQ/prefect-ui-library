<template>
  <section class="artifact-data-raw">
    <p-code-highlight v-bind="{ lang, text }" show-line-numbers class="artifact-data-raw__code" />
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

<style>
.artifact-data-raw__code { @apply
  w-full
  h-full
  min-h-[20rem]
  max-h-screen
  overflow-auto
}
</style>