<template>
  <div class="copyable-wrapper">
    <slot />
    <PButton
      flat
      size="sm"
      class="copyable-wrapper__button"
      title="copy"
      icon="DuplicateIcon"
      @click="copy"
    />
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

.copyable-wrapper__button { @apply
  absolute
  top-0
  right-0
}
</style>