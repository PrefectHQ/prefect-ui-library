<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <section class="markdown-view" v-html="innerHtml" />
</template>

<script lang="ts" setup>
  import { marked } from 'marked'
  import sanitizeHtml from 'sanitize-html'
  import { computed } from 'vue'

  marked.setOptions({
    gfm: true,
    highlight: function(code, lang, callback) {
      console.log(code, lang, callback)
      return code
    },
  })

  marked.use({
    renderer: {
      paragraph(text: string): string {
        return `<section class="markdown-view__section">${text}</section>`
      },
      link(href: string, title: string, text: string): string {
        return `<a href="${href}" class="p-link" target="_blank">${text}</a>`
      },
      // If we use this block it seems that the highlight method never runs
      // code(text: string): string {
      //   return `<pre class="p-code-container p-code-container--block"><code>${text}</code></pre>`
      // },
    },
  })


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
.markdown-view { @apply
  text-base
}

.markdown-view__section,
.markdown-view section,
.markdown-view p { @apply
  my-4
}

.markdown-view hr { @apply
  my-10
}

.markdown-view a { @apply
  inline-block
}

.markdown-view h1,
.markdown-view h2,
.markdown-view h3,
.markdown-view h4,
.markdown-view h5,
.markdown-view h6 { @apply
  font-semibold
}

.markdown-view h1 { @apply
  text-3xl
}

.markdown-view h2 { @apply
  text-2xl
}

.markdown-view h3 { @apply
  text-xl
}

.markdown-view h4 { @apply
  text-lg
}

.markdown-view h5 { @apply
  text-base
}

.markdown-view h6 { @apply
  text-sm
}
</style>