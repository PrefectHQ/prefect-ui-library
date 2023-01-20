<template>
  <code class="code-highlighting" :class="classes">
    <CodeLines :code="code" :show-line-numbers="showLineNumbers" />
  </code>
</template>

<script lang="ts" setup>
  import { highlight } from 'prismjs'
  import { computed } from 'vue'
  import CodeLines from '@/components/CodeLines.vue'
  import { definition as json } from '@/utilities/languageDefinitions/json'
  import { definition as python } from '@/utilities/languageDefinitions/python'

  const props = defineProps<{
    value?: string,
    language?: 'json' | 'python',
    showLineNumbers?: boolean,
  }>()

  const grammar = computed(() => {
    switch (props.language) {
      case 'json':
        return json
      case 'python':
        return python
      default:
        return undefined
    }
  })

  const code = computed(() => {
    if (props.language && grammar.value) {
      return highlight(props.value ?? '', grammar.value, props.language)
    }

    return props.value ?? ''
  })

  const classes = computed(() => `code-highlighting--${props.language ?? 'none'}`)
</script>

<style>
.code-highlighting {
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  @apply
  font-mono
  whitespace-pre
  break-normal
  rounded
  text-left;
}
</style>