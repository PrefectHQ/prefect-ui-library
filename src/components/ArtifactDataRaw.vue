<template>
  <section class="artifact-data-raw">
    <CopyableWrapper :text-to-copy="text" class="artifact-data-raw__copyable-wrapper">
      <p-code-highlight show-line-numbers v-bind="{ lang, text }" class="artifact-data-raw__code" />
    </CopyableWrapper>
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { CopyableWrapper } from '@/components'
  import { Artifact } from '@/models'
  import { parseUnknownJson } from '@/utilities/parseUnknownJson'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const text = computed(() => {
    const parsed = parseUnknownJson(props.artifact.data ?? '')
    return JSON.stringify(parsed, null, 2)
  })

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
.artifact-data-raw { @apply
  h-[45rem]
}

.artifact-data-raw__code { @apply
  min-h-12
}

.artifact-data-raw__copyable-wrapper { @apply
  h-full
  w-full
  overflow-auto
}
</style>