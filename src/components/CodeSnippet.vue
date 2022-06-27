<template>
  <div class="code-snippet">
    <PCode class="code-snippet__code" multiline>
      {{ snippet }}
    </PCode>
    <PButton size="sm" class="code-snippet__button" @click="copy">
      Copy <p-icon icon="DuplicateIcon" />
    </PButton>
  </div>
</template>

<script lang="ts" setup>
  import { PButton, PCode } from '@prefecthq/prefect-design'
  import { copyToClipboard } from '@/utilities/copy'

  const props = defineProps<{
    snippet: string,
  }>()

  function copy(): void {
    copyToClipboard(props.snippet)
  }
</script>

<style>
.code-snippet { @apply
  bg-slate-700
  rounded
  gap-2
  p-2
  max-w-full
  relative
  min-w-0
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