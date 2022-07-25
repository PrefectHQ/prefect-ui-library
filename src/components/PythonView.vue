<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <pre class="python-view"><code multiline v-html="innerHtml" /></pre>
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'
  import { definition } from '@/utilities/languageDefinitions/python'

  languages.python['string-interpolation'].inside.interpolation.inside.rest = definition
  languages.python = definition

  const props = defineProps<{
    value?: string,
  }>()

  const innerHtml = computed(() => {
    return highlight(props.value ?? '', languages.python, 'python')
  })
</script>

<style>
.python-view {
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
  text-left
  p-4
  text-slate-50
  bg-slate-700
}

.python-view .token.comment,
.python-view .token.block-comment,
.python-view .token.prolog,
.python-view .token.doctype,
.python-view .token.cdata {
  @apply
  text-slate-400
}

.python-view .token.punctuation {
  @apply
  text-slate-50
}

.python-view .token.tag,
.python-view .token.attr-name,
.python-view .token.namespace,
.python-view .token.deleted {
  @apply
  text-rose-400
}

.python-view .token.function-name {
  @apply
  text-blue-400
}

.python-view .token.boolean,
.python-view .token.number,
.python-view .token.function {
  @apply
  text-orange-400
}

.python-view .token.property,
.python-view .token.class-name,
.python-view .token.constant,
.python-view .token.symbol {
  @apply
  text-yellow-400
}

.python-view .token.selector,
.python-view .token.important,
.python-view .token.atrule,
.python-view .token.keyword,
.python-view .token.builtin {
  @apply
  text-rose-300
}

.python-view .token.string,
.python-view .token.char,
.python-view .token.attr-value,
.python-view .token.regex,
.python-view .token.variable {
  @apply
  text-emerald-400
}

.python-view .token.operator,
.python-view .token.entity,
.python-view .token.url {
  @apply
  text-blue-400
}

.python-view .token.important,
.python-view .token.bold {
  @apply
  font-medium
}

.python-view .token.italic {
  /* Can't use the apply style here due to circular imports */
  font-style: italic;
}

.python-view .token.entity {
  @apply
  cursor-help
}

.python-view .token.inserted {
  @apply
  text-emerald-600
}
</style>