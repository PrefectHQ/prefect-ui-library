<template>
  <code class="code-highlighting" :class="`code-highlighting--${language ?? 'none'}`">
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
</script>

<style>
.code-highlighting {
  -moz-tab-size: 4;
  -o-tab-size: 4;
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