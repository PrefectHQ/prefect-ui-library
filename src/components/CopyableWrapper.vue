<template>
  <div class="copyable-wrapper">
    <slot />
    <PButton size="sm" class="copyable-wrapper__button" @click="copy">
      Copy <p-icon icon="DuplicateIcon" />
    </PButton>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { copyToClipboard } from '@/utilities/copy'

  const props = defineProps<{
    textToCopy: string,
  }>()

  function copy(): void {
    copyToClipboard(props.textToCopy)
  }
</script>

<style>
.copyable-wrapper { @apply
  relative
  min-h-[32px]
}

.copyable-wrapper:hover .copyable-wrapper__button { @apply
  opacity-100
}

.copyable-wrapper__button { @apply
  absolute
  top-0
  right-0
  opacity-0
  transition-opacity
}

@media (pointer: coarse) {
  .copyable-wrapper__button { @apply
    opacity-100
  }
}
</style>