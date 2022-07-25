<template>
  <div class="code-snippet">
    <component :is="view" class="code-snippet__code" :value="snippet" />
    <PButton size="sm" class="code-snippet__button" @click="copy">
      Copy <p-icon icon="DuplicateIcon" />
    </PButton>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import CodeView from './CodeView.vue'
  import JsonView from './JsonView.vue'
  import PythonView from './PythonView.vue'
  import { copyToClipboard } from '@/utilities/copy'

  const props = defineProps<{
    snippet: string,
    language?: 'JSON' | 'python',
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
  bg-slate-700
  rounded
  gap-2
  max-w-full
  relative
  min-w-0
  overflow-auto
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