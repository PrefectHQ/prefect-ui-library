<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <pre><code multiline class="json-view" v-html="innerHtml" /></pre>
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import JsonGrammar from 'prismjs/components/prism-json'
  import { computed } from 'vue'

  languages.extend('json', JsonGrammar)

  const props = defineProps<{
    value: string,
  }>()

  const innerHtml = computed(() => {
    return highlight(props.value, languages.json, 'json')
  })
</script>

<style>
.json-view__key {
  @apply
  text-rose-400
}

.json-view__string-value {
  @apply
  text-emerald-400
}

.json-view__number-value, .json-view__bigint-value {
  @apply
  text-blue-400
}

.json-view__boolean-value {
  @apply
  text-red-500
}

.json-view__null-value, .json-view__object-value {
  @apply
  text-slate-400
  italic
}
</style>