<template>
  <div class="code-snippet">
    <p-code-highlight class="code-snippet__code" :text="snippet" :lang="language" :show-line-numbers="showLineNumbers" />
    <PButton size="sm" class="code-snippet__button" @click="copy">
      Copy <p-icon icon="DuplicateIcon" />
    </PButton>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { copyToClipboard } from '@/utilities/copy'

  const props = withDefaults(defineProps<{
    snippet: string,
    language?: 'json' | 'python',
    showLineNumbers?: boolean,
  }>(), {
    language: 'json',
  })

  function copy(): void {
    copyToClipboard(props.snippet)
  }
</script>

<style>
.code-snippet { @apply
  rounded
  gap-2
  max-w-full
  relative
  min-w-0
  overflow-auto
  p-4
  text-slate-50
  bg-slate-700
}

.code-snippet:hover .code-snippet__button { @apply
  opacity-100
}

.code-snippet__code { @apply
  min-w-0
}

.code-snippet__button { @apply
  absolute
  right-3
  top-3
  opacity-0
  transition-opacity
}

@media (pointer: coarse) {
  .code-snippet__button { @apply
    opacity-100
  }
}
</style>