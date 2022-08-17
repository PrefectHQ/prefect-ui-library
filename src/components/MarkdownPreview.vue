<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <section class="markdown-view" v-html="innerHtml" />
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
.markdown-view {
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  @apply
  whitespace-pre
  break-normal
}

.markdown-view .token.comment,
.markdown-view .token.block-comment,
.markdown-view .token.prolog,
.markdown-view .token.doctype,
.markdown-view .token.cdata {
  @apply
  text-slate-400
}

.markdown-view .token.punctuation {
  @apply
  text-slate-50
}

.markdown-view .token.tag,
.markdown-view .token.attr-name,
.markdown-view .token.namespace,
.markdown-view .token.deleted {
  @apply
  text-rose-400
}

.markdown-view .token.function-name {
  @apply
  text-blue-400
}

.markdown-view .token.boolean,
.markdown-view .token.number,
.markdown-view .token.function {
  @apply
  text-orange-400
}

.markdown-view .token.property,
.markdown-view .token.class-name,
.markdown-view .token.constant,
.markdown-view .token.symbol {
  @apply
  text-yellow-400
}

.markdown-view .token.selector,
.markdown-view .token.important,
.markdown-view .token.atrule,
.markdown-view .token.keyword,
.markdown-view .token.builtin {
  @apply
  text-rose-300
}

.markdown-view .token.string,
.markdown-view .token.char,
.markdown-view .token.attr-value,
.markdown-view .token.regex,
.markdown-view .token.variable {
  @apply
  text-emerald-400
}

.markdown-view .token.operator,
.markdown-view .token.entity,
.markdown-view .token.url {
  @apply
  text-blue-400
}

.markdown-view .token.important,
.markdown-view .token.bold {
  @apply
  font-medium
}

.markdown-view .token.italic {
  /* Can't use the apply style here due to circular imports */
  font-style: italic;
}

.markdown-view .token.entity {
  @apply
  cursor-help
}

.markdown-view .token.inserted {
  @apply
  text-emerald-600
}
</style>