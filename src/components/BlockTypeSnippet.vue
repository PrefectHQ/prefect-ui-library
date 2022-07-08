<template>
  <CodeSnippet :snippet="snippet" class="block-type-snippet" />
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

  const snippet = computed(() => props.snippet.replace('BLOCK_NAME', props.name).replace(/^```python/, '').replace(/```$/, '').trim())
</script>