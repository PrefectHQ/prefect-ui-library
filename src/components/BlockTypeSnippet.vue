<template>
  <CodeSnippet :snippet="snippet" language="python" class="block-type-snippet" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import CodeSnippet from '@/components/CodeSnippet.vue'

  const props = defineProps<{
    snippet: string,
    name?: string,
  }>()

  const snippet = computed(() => {
    const [, genericSnippet = ''] = props.snippet.match(/```python([\S\s]*)```/) ?? []

    if (props.name) {
      const customSnippet = genericSnippet.replace('BLOCK_NAME', props.name)

      return customSnippet.trim()
    }

    return genericSnippet.trim()
  })
</script>