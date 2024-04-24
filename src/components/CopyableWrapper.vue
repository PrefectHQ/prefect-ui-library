<template>
  <div class="copyable-wrapper">
    <slot />
    <p-button
      size="sm"
      variant="ghost"
      class="copyable-wrapper__button"
      title="copy"
      icon="DocumentDuplicateIcon"
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
}

.copyable-wrapper__button { @apply
  absolute
  top-2
  right-2
}
</style>