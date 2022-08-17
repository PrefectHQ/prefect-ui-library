<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <section class="markdown-preview">
    {{ innerHtml }}
  </section>
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'
  // import { definition } from '@/utilities/languageDefinitions/md'

  // languages.md = definition

  const props = defineProps<{
    value?: string,
  }>()

  const innerHtml = computed(() => {
    // return highlight(props.value ?? '', languages.md, 'md')
    return props.value
  })
</script>

<style>
.markdown-preview {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;

  @apply
  whitespace-pre
  break-normal
}
</style>