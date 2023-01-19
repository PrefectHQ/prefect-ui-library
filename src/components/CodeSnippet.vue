<template>
  <div class="code-snippet">
    <component :is="view" class="code-snippet__code" :value="snippet" :show-line-numbers="showLineNumbers" />
    <PButton size="sm" class="code-snippet__button" @click="copy">
      Copy <p-icon icon="DuplicateIcon" />
    </PButton>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CodeView from '@/components/CodeView.vue'
  import JsonView from '@/components/JsonView.vue'
  import PythonView from '@/components/PythonView.vue'
  import { copyToClipboard } from '@/utilities/copy'

  const props = defineProps<{
    snippet: string,
    language?: 'JSON' | 'python',
    showLineNumbers?: boolean,
  }>()

  const view = computed(() => {
    switch (props.language) {
      case 'JSON':
        return JsonView
      case 'python':
        return PythonView
      default:
        return CodeView
    }
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