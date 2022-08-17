<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <section class="markdown-preview" v-html="innerHtml" />
</template>

<script lang="ts" setup>
  import { highlight, languages } from 'prismjs'
  import { computed } from 'vue'
  import { definition } from '@/utilities/languageDefinitions/markdown'

  languages.md = definition

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
  font-style: italic;

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
</style>