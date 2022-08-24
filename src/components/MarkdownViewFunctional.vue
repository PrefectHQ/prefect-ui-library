
<template>
  <RenderRoot />
</template>

<script lang="ts" setup>
  import { PCode, PDivider, PLink } from '@prefecthq/prefect-design'
  import { marked } from 'marked'
  import sanitizeHtml, { defaults, IOptions, simpleTransform } from 'sanitize-html'
  import { computed, h, createTextVNode as t, VNode } from 'vue'
  import { JsonView, MarkdownView, PythonView } from '@/components'

  type Token = ReturnType<typeof marked.lexer>[number]

  const sanitizeOptions: IOptions = {
    allowedTags: [...defaults.allowedTags, 'img'],
    allowedAttributes: {
      '*': ['style'],
      'a': ['href', 'name', 'target', 'align', 'style'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'style'],
    },
    allowedClasses: {
      'a': ['p-link'],
    },
    transformTags: {
      'a': simpleTransform('a', { class: 'p-link' }),
    },
  }

  const baseClass = 'markdown-view'
  // const componentMap = {
  //   blockquote: 'blockquote',
  //   br: PDivider,
  //   code: PCode,
  //   codespan: 'blockquote',
  //   def: 'blockquote',
  //   del: 'blockquote',
  //   em: 'blockquote',
  //   escape: 'blockquote',
  //   heading: 'blockquote',
  //   hr: 'blockquote',
  //   html: 'blockquote',
  //   image: 'blockquote',
  //   link: 'blockquote',
  //   list: 'blockquote',
  //   list_item: 'blockquote',
  //   paragraph: 'blockquote',
  //   space: 'blockquote',
  //   strong: 'blockquote',
  //   table: 'blockquote',
  //   text: 'blockquote',
  // }

  const headingClass = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm']

  const props = defineProps<{
    value?: string,
  }>()

  const sanitizedValue = computed(() => {
    return sanitizeHtml(props.value ?? '', sanitizeOptions)
  })

  const getRenderer = (token: Token & { tokens?: Token[] }): VNode => {
    let base = 'div'
    const children = token.tokens?.map(_t => getRenderer(_t)) ?? undefined
    const props: Record<string, unknown> = { class: [`${baseClass}__token`] }

    // switch (token.type) {
    //   case 'blockquote':
    //     base = 'blockquote'
    //     break
    //   case 'br':
    //     base = PDivider
    //     break
    //   case 'code':
    //     return getCodeRenderer(token)
    //   case 'codespan':
    //     base = PCode
    //     break
    //   case 'def':
    //   case 'del':
    //   case 'em':
    //   case 'escape':
    //   case 'heading':
    //     return h(`h${token.depth}`, { class: classList }, token.tokens.map(_t => getRenderer(_t)))
    //   case 'hr':
    //   case 'html':
    //   case 'image':
    //   case 'link':
    //   case 'list':
    //   case 'list_item':
    //   case 'paragraph':
    //   case 'space':
    //   case 'strong':
    //   case 'table':
    //   case 'text':
    //     return t(token.text)
    //   default:
    //     break
    // }

    if (token.text?.includes('res')) {
      console.log({ token })
    }

    if (token.type == 'text') {

      return t(token.text)
    }

    if (token.type == 'image') {
      console.log('hello!')
    }

    if (token.type == 'html') {
      return h('p', { align: 'center', dir: 'auto', class: [`${baseClass}__html`], innerHTML: token.text })
    }

    if (token.type == 'code') {
      return getCodeRenderer(token)
    }

    if (token.type == 'codespan') {
      return h(PCode, {}, { default: () => token.text })
    }

    if (token.type == 'table') {
      return getTableRenderer(token)
    }

    if (token.type == 'blockquote') {
      return h('blockquote', {}, children)
    }

    if (token.type == 'heading') {
      const classList = [headingClass[token.depth], 'font-semibold']
      return h(`h${token.depth}`, { class: classList }, children)
    }

    if (token.type == 'link') {
      return h(PLink, { to: token.href }, { default: () => token.text })
    }

    return h(base, props, children)
  }

  const getTableRenderer = (token: Token & { type: 'table' }): VNode => {
    return h('table', {}, [token.raw])
  }

  const getCodeRenderer = (token: Token & { type: 'code' }): VNode => {
    switch (token.lang) {
      case 'py':
      case 'python':
        return h(PythonView, { value: token.text })
      case 'md':
      case 'markdown':
        return h(MarkdownView, { value: token.text })
      case 'json':
        return h(JsonView, { value: token.text })
      default:
        return h(PCode, { multiline: true }, { default: () => token.text })
    }
  }

  const RenderRoot = computed(() => {
    const tokens = marked.lexer(sanitizedValue.value)
    const children: VNode[] = tokens.map(getRenderer)

    const root = h('article', { class: [baseClass] }, children)
    return root
  })
</script>

<style>
.markdown-view { @apply
  text-base
  block
  relative
  overflow-auto
}

.markdown-view > * { @apply
  mb-4
}

.markdown-view__html { @apply
  block
}

.markdown-view__html img { @apply
  inline
  max-w-full
}

.markdown-view__html,
.markdown-view__token { @apply
  mb-4
}
</style>