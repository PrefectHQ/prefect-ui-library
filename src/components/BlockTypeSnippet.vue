<template>
  <CodeSnippet :snippet="snippet" language="python" class="block-type-snippet" />
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import CodeSnippet from '@/components/CodeSnippet.vue'

  const props = withDefaults(defineProps<{
    snippet: string,
    name?: string,
  }>(), {
    name: '',
  })

  const snippet = computed(() => {
    const [, genericSnippet = ''] = props.snippet.match(/```python([\S\s]*)```/) ?? []
    const customSnippet = genericSnippet.replace('BLOCK_NAME', props.name)

    return customSnippet.trim()
  })
</script>