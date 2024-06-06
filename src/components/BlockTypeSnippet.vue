<template>
  <CopyableWrapper :text-to-copy="snippet" class="block-type-snippet">
    <p-code-highlight lang="python" :text="snippet" class="block-type-snippet__code" />
  </CopyableWrapper>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import CopyableWrapper from '@/components/CopyableWrapper.vue'

  const props = defineProps<{
    snippet: string,
    name?: string,
  }>()

  const snippet = computed(() => {
    const [, genericSnippet = ''] = props.snippet.match(/```python([\S\s]*?)```/) ?? []
    const customSnippet = genericSnippet.replace('BLOCK_NAME', props.name ?? 'block-name')

    return customSnippet.trim()
  })
</script>

<style>
.block-type-snippet__code { @apply
  p-4
}
</style>