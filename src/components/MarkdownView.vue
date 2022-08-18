<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <section class="markdown-view" v-html="innerHtml" />
</template>

<script lang="ts" setup>
  import { marked } from 'marked'
  import sanitizeHtml from 'sanitize-html'
  import { computed } from 'vue'

  const props = defineProps<{
    value?: string,
  }>()

  const innerHtml = computed(() => {
    return marked.parse(sanitizeHtml(props.value ?? '', {
      allowedTags: [
        'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4',
        'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div',
        'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre',
        'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn',
        'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp',
        'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'caption',
        'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'img',
      ],
      disallowedTagsMode: 'recursiveEscape',
      allowedAttributes: {
        'a': ['href', 'name', 'target', 'align'],
        'img': ['src', 'alt', 'title', 'width', 'height'],
      },
    }))
  })
</script>

<style>
/* .markdown-view { @apply


} */
</style>