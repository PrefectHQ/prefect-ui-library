<template>
  <code class="python-view" :class="classes">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <pre class="python-view__lines"><template v-for="(line, index) in lines" :key="index"><span class="python-view__line" v-html="line" /></template></pre>
  </code>
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'
  import { definition } from '@/utilities/languageDefinitions/python'

  languages.python = definition

  const props = defineProps<{
    value?: string,
    showLineNumbers?: boolean,
  }>()

  const lines = computed(() => {
    return highlight(props.value ?? '', languages.python, 'python').split('\n')
  })

  const classes = computed(() => ({
    'python-view--with-line-numbers': props.showLineNumbers,
  }))
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
  text-left;
}

.python-view__lines { @apply
  py-1;
  counter-reset: line;
}

.python-view__line { @apply
  h-5
  w-full
  block
}

.python-view--with-line-numbers .python-view__line:before { @apply
  inline-block
  px-3
  mr-5
  border-r-[1px]
  border-slate-200
  text-slate-400;
  counter-increment: line;
  content: counter(line);
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