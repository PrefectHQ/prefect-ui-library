<template>
  <section class="artifact-data-raw">
    <p-code-highlight v-bind="{ lang, text }" class="artifact-data-raw__code" />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Artifact } from '@/models'
  import { stringifyUnknownJson } from '@/utilities/stringifyUnknownJson'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const text = computed(() => stringifyUnknownJson(props.artifact.data) ?? '')

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
  h-[45rem]
  overflow-auto
}
</style>