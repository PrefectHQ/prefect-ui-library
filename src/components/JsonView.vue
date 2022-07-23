<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <pre class="json-view"><code multiline v-html="innerHtml" /></pre>
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'
  const JsonGrammar = await import('prismjs/components/prism-json')

  languages.extend('json', JsonGrammar.default)

  const props = defineProps<{
    value: string,
  }>()

  const innerHtml = computed(() => {
    return highlight(props.value, languages.json, 'json')
  })
</script>

<style>
.json-view {
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
  text-left
  p-4
  text-slate-50
  bg-slate-700
}

/* Code blocks */
pre[class*="language-"] {
  @apply
  p-4
  my-2
  mx-0
  overflow-auto
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  @apply
  bg-slate-700
}

/* Inline */
:not(pre) > code[class*="language-"] {
  @apply
  p-1
  whitespace-normal
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  @apply
  text-slate-400
}

.token.punctuation {
  @apply
  text-slate-50
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  @apply
  text-rose-400
}

.token.function-name {
  @apply
  text-blue-400
}

.token.boolean,
.token.number,
.token.function {
  @apply
  text-orange-400
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  @apply
  text-yellow-400
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  @apply
  text-rose-300
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  @apply
  text-emerald-400
}

.token.operator,
.token.entity,
.token.url {
  @apply
  text-blue-400
}

.token.important,
.token.bold {
  @apply
  font-medium
}

.token.italic {
  /* Can't use the apply style here due to circular imports */
  font-style: italic;
}

.token.entity {
  @apply
  cursor-help
}

.token.inserted {
  @apply
  text-emerald-600
}
</style>