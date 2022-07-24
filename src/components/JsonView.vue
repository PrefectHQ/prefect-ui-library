<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <pre class="json-view"><code multiline v-html="innerHtml" /></pre>
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'
  import { definition } from '@/utilities/languageDefinitions/json'

  languages.json = definition

  const props = defineProps<{
    value?: string,
  }>()

  const innerHtml = computed(() => {
    return highlight(props.value ?? '', languages.json, 'json')
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
  rounded
  text-left
  p-4
  text-slate-50
  bg-slate-700
}

.json-view .token.comment,
.json-view .token.block-comment,
.json-view .token.prolog,
.json-view .token.doctype,
.json-view .token.cdata {
  @apply
  text-slate-400
}

.json-view .token.punctuation {
  @apply
  text-slate-50
}

.json-view .token.tag,
.json-view .token.attr-name,
.json-view .token.namespace,
.json-view .token.deleted {
  @apply
  text-rose-400
}

.json-view .token.function-name {
  @apply
  text-blue-400
}

.json-view .token.boolean,
.json-view .token.number,
.json-view .token.function {
  @apply
  text-orange-400
}

.json-view .token.property,
.json-view .token.class-name,
.json-view .token.constant,
.json-view .token.symbol {
  @apply
  text-yellow-400
}

.json-view .token.selector,
.json-view .token.important,
.json-view .token.atrule,
.json-view .token.keyword,
.json-view .token.builtin {
  @apply
  text-rose-300
}

.json-view .token.string,
.json-view .token.char,
.json-view .token.attr-value,
.json-view .token.regex,
.json-view .token.variable {
  @apply
  text-emerald-400
}

.json-view .token.operator,
.json-view .token.entity,
.json-view .token.url {
  @apply
  text-blue-400
}

.json-view .token.important,
.json-view .token.bold {
  @apply
  font-medium
}

.json-view .token.italic {
  /* Can't use the apply style here due to circular imports */
  font-style: italic;
}

.json-view .token.entity {
  @apply
  cursor-help
}

.json-view .token.inserted {
  @apply
  text-emerald-600
}
</style>