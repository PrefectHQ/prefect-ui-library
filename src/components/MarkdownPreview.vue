<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <section class="markdown-preview" v-html="innerHtml" />
</template>

<script lang="ts" setup>
  import { highlight, languages, hooks } from 'prismjs'
  import { computed } from 'vue'
  import { definition as markdownDefinition, wrapHook as markdownWrapHook, afterTokenizeHook } from '@/utilities/languageDefinitions/markdown'
  import { definition as markupDefinition, wrapHook as markupWrapHook } from '@/utilities/languageDefinitions/markup'
  import { definition as yamlDefinition } from '@/utilities/languageDefinitions/yaml'

  languages.yml = languages.yaml
  languages.markup = markupDefinition
  languages.yaml = yamlDefinition
  languages.html = markupDefinition
  languages.svg = markupDefinition

  languages.markdown = languages.extend('markup', {})
  languages.insertBefore('markdown', 'prolog', markdownDefinition)
  languages.md = languages.markdown

  hooks.add('after-tokenize', afterTokenizeHook)
  hooks.add('wrap', markdownWrapHook)
  hooks.add('wrap', markupWrapHook)

  const props = defineProps<{
    value?: string,
  }>()

  const innerHtml = computed(() => {
    return highlight(props.value ?? '', languages.md, 'md')
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

.markdown-preview .title { @apply
  font-black
}

.markdown-preview .bold, .markdown-preview .important { @apply
  font-semibold
}

.markdown-preview .italic {
  font-style: italic;
}

.markdown-preview .blockquote { @apply
  text-blue-600
}

.markdown-preview .hr { @apply
  text-slate-500
}

.markdown-preview .list { @apply
  font-black
}

.markdown-preview .strike {
  font-style: italic;

  @apply
  line-through
  decoration-slate-400
  decoration-wavy
  decoration-1
}

.markdown-preview .code {
  @apply
  text-blue-600
}

.markdown-preview .url > .content { @apply
  text-slate-900
}

.markdown-preview .url { @apply
  text-purple-500
}

.markdown-preview .url > .url { @apply
  text-blue-600
  underline
}

.markdown-preview .table .punctuation { @apply
  text-slate-400
}

.markdown-preview .table > .header { @apply
  font-bold
}

.markdown-preview .token.comment,
.markdown-preview .token.block-comment,
.markdown-preview .token.prolog,
.markdown-preview .token.doctype,
.markdown-preview .token.cdata {
  @apply
  text-slate-700
}

.markdown-preview .token.punctuation {
  @apply
  text-slate-700
}

.markdown-preview .token.tag,
.markdown-preview .token.namespace,
.markdown-preview .token.deleted {
  @apply
  text-rose-500
}

.markdown-preview .token.function-name {
  @apply
  text-blue-500
}

.markdown-preview .token.attr-name,
.markdown-preview .token.boolean,
.markdown-preview .token.number,
.markdown-preview .token.function {
  @apply
  text-orange-500
}

.markdown-preview .token.property,
.markdown-preview .token.class-name,
.markdown-preview .token.constant,
.markdown-preview .token.symbol {
  @apply
  text-yellow-500
}

.markdown-preview .token.selector,
.markdown-preview .token.atrule,
.markdown-preview .token.keyword,
.markdown-preview .token.builtin {
  @apply
  text-rose-500
}

.markdown-preview .token.string,
.markdown-preview .token.char,
.markdown-preview .token.attr-value,
.markdown-preview .token.regex,
.markdown-preview .token.variable {
  @apply
  text-emerald-600
}

.markdown-preview .token.operator,
.markdown-preview .token.entity {
  @apply
  text-blue-500
}

.markdown-preview .token.entity {
  @apply
  cursor-help
}

.markdown-preview .token.inserted {
  @apply
  text-emerald-600
}
</style>